import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist/app',
  },
  server: {
    port: 3000,
    cors: false,
  },
  plugins: [react()],
})
