import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'loginApp', 
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx',
        './store': './src/store/index.ts',
      },
      shared: ['react', 'react-dom', 'zustand']
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});