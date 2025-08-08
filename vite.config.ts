import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt'],
      manifest: {
        name: 'Meu App PWA',
        short_name: 'MeuApp',
        description: 'Um app PWA feito com Vite',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'bebe.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'menino-menino.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })],
})
