import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const downloadImage = (url, filename) => {
    const dest = path.join(__dirname, '../src/assets/images', filename);
    const file = fs.createWriteStream(dest);

    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${url}: Status ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(() => {
                    console.log(`Downloaded: ${filename}`);
                    resolve();
                });
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => { });
            reject(err);
        });
    });
};

const imageMap = {
    // Market View
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCmy-SS9ssCOHiQ51o8bkcSAGayWV_vaANEMEMbFL62MbO-jXdY91zwzkTkvjy5S3hDxlLY47L09aKE9DtFnDS1Cb_X8gleb7OoddtAA-1yAt_WACfoJ8jNd5KihC3wqIbRzbssHW83t1ernj00G2SrkTidvXQj7Q1Wm2r3SJjTVnix1KE1DFUoEFD33yctBYjppBz9F6bnZE1wlcH3fWkXuxpylNqe_oh_o9kSi22HKGayZdvwL1_F2cxzVfdrvkDSAORjo2l4GBk': 'merchant_chengxin.jpg',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDm8D5nmrN71S8KJoTgieo96BZJURLIAqJUh9bumIaV24tcekVSdDWmUXFM4DfbSlFCJ3q2WoMBli4j2IXuVyc0jgLP84YwPyHxbvd3zem4-TsGmjCnbjnOKA73S5tCMFEWhARxVD7KJ_Xl8eXXtzWRjdL6nDkXZynu8CNbQR9CAZDwgkvtQBhbqZ_VQJ9DWnMae50GdRUcE1LpqlzS9nI81Phor1sWgsH2ed2CvW2mXRUo7G1_mAezUPG9ARfF5mk3yYiKPy2udeI': 'merchant_global.jpg',

    // Order Detail
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBdjyp7T3rtcNdLE7ghmE5C_C1k5PYG6n8CLtZZ67yoE8gTF2OzbzNky0LF67NQx6XKhNY8llshogB_qCJFLYukrXGf_4nSv-upUfHJe7qNm6W7PEEGpTx1EFw4Vz_yQBqcWJ38c24WX8ydkHK7c6aXwn3gRVnWZ0dkFdaL80YVGGCaqIedngvAo03qg6avzHPZtKep4Q1lBxsHVDF_jXEbjjJN1TsM_1AdWvyOXIzHa3QecsmXEcRC0Rd5UGlEpNYuuze2R26pLRE': 'payment_qr_code.jpg',

    // Payment Confirm
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDMKOU37Sa_hwMY0NVCl0kO4-yuKzy6YfttDqNve6jWNqY9cQ-6SIUEuFI9qMoRI57w-pMYfGsv5X6RUF-YwLJQSJGyz0GWJysql_ifri6YIE5yrnd2c36lTD7f9CT9FwsANYk33wSSNQWRXXghuYOW6vZ7Vx-wS2nxC2HvMZqg1UXfA9pdEPcEYlpuyr0YYf2_qcrJoRnPnALbVO3kQRwZXobg34tXQJJ10pI145a4XFb_2UH6kxvBFsgwgrsmEdcxItVv4NjWhc0': 'user_portrait_zhang.jpg',

    // Task View
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAOOHVUGJZMSQvKynBuHhCZh568H8WVG6Yybep4vE5Tv1UBcKe0kGvQWCEi5jTcns8KcLD-kxFSvAEkijTT5hXcACV4k2zuv92FbHEnbsAXyryL6tUF2sbJEcbBI632XjWVU4amnY0uKjLqv-S6KzAix_McS9RN0duJCkLAnZZLcXFKMJck9sjgfx78YRAStgzJWoZjSYSaqVo27KCQFAfIMm7SJOmgGUR2MKXTHhwFgyVbg_-YNWQVexDxbh-fPlPSIfZ3xiDwvpc': 'task_thumb_p2p.jpg',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDrZ3P-GFRL1r17wBJ7FesKAz1G99CRlnJoNCrJcPIPrhPhvsUqpFFdaMMDpAFaqs5SA7UhNt37ncRmuuAZ0RhoJ3-DA4RHK9lHT7oJ7LFNDOHgzk_MFpKsnst2XcakC51R8BZ0q_BUif7S-sapz10_SlaIB0rc2Sd3YCxRL6DfDe_ZTXgpZ62mGyg7fjaz0ibqhRiFCnHW2dqpRHsgQ74ReP43KCZAZjwv0t00oSMIkpC9LADZA3v5fawl0R2lh8V6hgxIYinHZiE': 'task_thumb_c2c.jpg',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBR3Ho04HNh6xg3K5o2njZjwWHhiweD3zQfSDRlXc3hn6qQpjHZam8Aawyq1bjqnjtsmD5bzIfI445yPz_-izUc4B4Lx4nWPiNh04EICr9AaA62iNyoNXpoYxETZ0XHKD4RKkrJVXa0wF1qlzYgWXCD7EwX9PWQtbNd7qTEtgJX0o_jx7-0PtPY8LvTcuHcAYP7uKJmhpZDw4YvZIbDEmH59F1--R2AZ7zzSq_Q0czRAx6y3-d4fxtRbFimYR8b2JK3631KcF4EaG0': 'task_thumb_overseas.jpg',

    // Third Check
    'https://lh3.googleusercontent.com/aida-public/AB6AXuApfUsK0wmH6tjTe2YpqXHbooXzgkwWePRwMWlw4jI1aHXvhQcHDiehQcthnsviTkepxQ5103pK-AWB5728LPxs8fJh6vojyaRV1lMSVrpp5kbnNkryGlKProW9aF3Zi5lBA6wlnb56qKOes_m78l7OB-24oVOCXXdfW8sRHEeLO7jp0AL_dq8AukmONBlRG_MGXCd5PugvbLMGsHdEv-aU14mqFhmVfjTXT6Fx3ly8jUUYA-2ynCuDfX_dXkIex0nHiuU3fTHYJzg': 'merchant_logo_global.jpg',

    // Profile/My (Generic)
    'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg': 'default_avatar.jpg'
};

const main = async () => {
    console.log('Starting image downloads...');
    for (const [url, filename] of Object.entries(imageMap)) {
        try {
            await downloadImage(url, filename);
        } catch (error) {
            console.error(error.message);
        }
    }
    console.log('All downloads completed.');
};

main();
