import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ЗАМЕНИ 'fashionWeb' на точное название твоего репозитория на GitHub, если оно другое
  base: '/fashionWeb/', 
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});