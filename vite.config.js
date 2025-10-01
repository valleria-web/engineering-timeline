import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configuración crucial para el proxy
  server: {
    proxy: {
      // Redirige todas las solicitudes que comienzan con '/api'
      '/api': {
        // Al puerto donde corre tu servidor Express
        target: 'http://localhost:3001',
        // Opcional: Reemplaza la cabecera 'Host' con la URL del target
        changeOrigin: true,
        // Opcional: Reescribe la ruta si fuera necesario, pero aquí no lo es
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});