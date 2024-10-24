import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html'
    }
  },
  resolve: {
    alias: {
      '@components': '/src/components',
    },
  },
  server: {
    host: '0.0.0.0', // Listen on all network interfaces
    port: 5173, 
    open:true     // Use the same port
  }
});
