import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 1387,  // پورت دلخواه شما
    host: true   // برای دسترسی از سایر دستگاه‌ها در شبکه
  }
})
