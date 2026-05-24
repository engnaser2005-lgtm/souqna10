import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'سوقنا - Souqna',
        short_name: 'Souqna',
        description: 'سوق إلكتروني متعدد البائعين',
        theme_color: '#041C3A',
        background_color: '#041C3A',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512x512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ],
  base: '/souqna10/',  // ← أضف هذا السطر
  server: { port: 3000, host: true }
})
