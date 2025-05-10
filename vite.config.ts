import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/sopadeletras/',
  plugins: [
    react(),  // Añade el plugin de React que faltaba
    tailwindcss()
  ],
  server: {
    port: 5173,
    host: true,  // Permite acceso desde otros dispositivos en la red local
    open: true   // Abre el navegador automáticamente
  },
  preview: {
    port: 5173,
    host: true
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true  // Útil para debugging
  }
})