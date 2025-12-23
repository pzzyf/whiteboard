import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [vue(), tailwindcss()],
  server: {
    host: true, // 或者使用 '0.0.0.0'
    port: 5173, // 可选：指定端口
    open: true, // 可选：自动打开浏览器
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '/api'),
      },
    },
  },
})
