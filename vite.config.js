import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  publicDir: 'public',
  build: {
    outDir: 'dist',
  },
  // Serve data files from src/data
  assetsInclude: ['**/*.json'],
})
