import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Proxy setup so frontend calls `/api/...` and gets backend worker responses
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8787', // local wrangler dev
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // /api/songs → /songs
      },
    },
  },
})
