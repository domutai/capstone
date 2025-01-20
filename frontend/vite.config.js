import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    eslint({
      lintOnStart: true,
      failOnError: mode === "production"
    })
  ],
  build: {
    outDir: 'dist',  // Ensure this outputs in the correct location
    emptyOutDir: true,  // Clears previous builds before generating a new one
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8000'
    },
  }
  // To automatically open the app in the browser whenever the server starts,
  // uncomment the following lines:
  // server: {
  //   open: true
  // }
}));
