import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    open: '/demo/index.html',
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'IdxZillowLayout',
      fileName: 'idx-zillow-layout',
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        assetFileNames: 'idx-zillow-layout.[ext]',
      },
    },
    cssCodeSplit: false,
    outDir: 'dist',
    emptyOutDir: true,
  },
});
