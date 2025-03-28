import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://directus.icaerusdronemonitoringnoumena.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    allowedHosts: [".ngrok-free.app"], // Allows all subdomains of ngrok-free.app
  },
  plugins: [react()],
})
