import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// ✅ Automatically load environment files
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    open: true,
  },
  define: {
    'process.env': process.env
  },
  build: {
    outDir: 'dist',
  },
})
