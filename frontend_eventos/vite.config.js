import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // *** AÑADE ESTA SECCIÓN PARA PERMITIR EL HOST DE RENDER ***
  preview: {
    allowedHosts: [
      'eventos-reserv.onrender.com',
      // Es buena práctica mantener también el localhost por si lo usas localmente
      'localhost', 
    ],
  },
  // ********************************************************
});