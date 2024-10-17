import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'hostApp',
      remotes: {
        todoApp: 'http://localhost:5001/assets/remoteEntry.js',
        ibankingApp: 'http://localhost:5002/assets/remoteEntry.js',
        loginApp: 'http://localhost:5003/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom']
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  server: {
    port: 3000,
    strictPort: true,
    cors: true
  },
  preview: {
    port: 3000,
    strictPort: true,
    cors: true
  }
})