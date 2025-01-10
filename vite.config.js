import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/search': {
        target: 'https://serpapi.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
