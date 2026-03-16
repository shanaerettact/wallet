import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DESIGN_SOURCE_DIR = path.resolve(__dirname, '../design_source');
const TARGET_DIR = path.resolve(__dirname, 'src/assets/images');

// Ensure target directory exists
if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
}

// Function to find all HTML files
function getHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getHtmlFiles(file));
        } else if (file.endsWith('.html')) {
            results.push(file);
        }
    });
    return results;
}

// Map to store URL -> New Filename to avoid duplicates
const urlMap = new Map();

// Helper to determine semantic name
function getSemanticName(url, context, index) {
    let name = '';
    // Provide basic category based on folder name (context)
    const category = context.split(path.sep).pop().replace(/[^\w]/g, '_');

    if (url.includes('googleusercontent') || url.includes('placeholder')) {
        // It's likely a user avatar or banner
        name = `${category}_img_${index}`;
    } else {
        // Try to extract from original filename if possible, else generic
        const basename = path.basename(url).split('?')[0];
        if (basename && basename.length < 20) {
            name = `${category}_${basename}`;
        } else {
            name = `${category}_asset_${index}`;
        }
    }

    // Clean name
    name = name.toLowerCase().replace(/[^a-z0-9_]/g, '_');

    // Extension
    let ext = path.extname(url.split('?')[0]);
    if (!ext || ext.length > 5) ext = '.png'; // Default to png if unknown

    return `${name}${ext}`;
}

async function downloadImage(url, modifyName) {
    if (urlMap.has(url)) return urlMap.get(url);

    const filename = modifyName;
    const filePath = path.join(TARGET_DIR, filename);

    try {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream'
        });

        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', () => {
                urlMap.set(url, filename);
                console.log(`Downloaded: ${filename}`);
                resolve(filename);
            });
            writer.on('error', reject);
        });
    } catch (error) {
        console.error(`Failed to download ${url}: ${error.message}`);
        return null;
    }
}

async function processFiles() {
    const files = getHtmlFiles(DESIGN_SOURCE_DIR);
    let globalIndex = 0;

    for (const file of files) {
        console.log(`Processing ${file}...`);
        const content = fs.readFileSync(file, 'utf-8');
        const folderName = path.dirname(file).split(path.sep).pop();

        // Regex to find images (src="..." or url("..."))
        const regex = /(?:src="|url\("?)(https?:\/\/[^"')\s>]+)(?:"|"?\))/g;
        let match;
        let localIndex = 0;

        // We scan purely to download first. 
        // The user wants us to "Update Components" later, but for now we just download.
        // However, knowing which file it came from helps with naming.

        while ((match = regex.exec(content)) !== null) {
            const url = match[1];
            if (!urlMap.has(url)) {
                localIndex++;
                const newName = getSemanticName(url, path.dirname(file), localIndex);
                await downloadImage(url, newName);
            }
        }
    }

    console.log('Download complete.');
    console.log('Mapping:', Object.fromEntries(urlMap));
}

processFiles();
