import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path' // 需導入 path

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),
  tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // 設定 @ 為 src 目錄
    }
  }
})
