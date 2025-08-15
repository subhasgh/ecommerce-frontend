

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Merged bulletproof config
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,           // Fixed port to avoid 5173 fallback
    strictPort: true,     // If 5174 is in use, fail instead of switching
    open: true,           // Auto-open in browser
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // Prevents large file warning spam
  },
  optimizeDeps: {
    force: true,          // Forces fresh dep optimization each run
  },
  cacheDir: '.vite_cache', // Keeps Vite cache local to project
});
