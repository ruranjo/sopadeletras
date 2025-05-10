import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/sopadeletras/',
  plugins: [
    react(),
    tailwindcss() // Ahora usará tu tailwind.config.js
  ],
  server: {
    port: 5173,
    host: true,
    open: '/sopadeletras/' // Abre directamente en la ruta base
  },
  preview: {
    port: 4173, // Cambiado al puerto por defecto de preview
    host: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets', // Directorio específico para assets
    emptyOutDir: true,
    sourcemap: true,
    manifest: true, // Genera manifest.json para tracking de assets
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]', // Estructura clara para assets
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  },
  css: {
    devSourcemap: true // Sourcemaps para CSS en desarrollo
  }
})