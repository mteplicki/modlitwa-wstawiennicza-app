import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'solid-js': ['solid-js'],
          'solid-js/web': ['solid-js/web'],
          'solid-js/store': ['solid-js/store'],
          'firestore': ['firebase/firestore'],
        }
      }
    }
  },
  plugins: [
    solid(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: 'index.html',
      },
      strategies: 'injectManifest',
      injectManifest: {
        swSrc: './src/firebase-messaging-sw.ts',
        swDest: './dist/firebase-messaging-sw.js'
      },
      srcDir: 'src',
      filename: 'firebase-messaging-sw.ts',
      manifest: {
        name: "Modlitwa wstawiennicza MOST",
        short_name: "MW MOST",
        description: "Aplikacja podprzęsła modlitwy wstawienniczej w duszpasterstwie MOST",
        theme_color: "#1e3a8a",
        icons: [
          {
            "src": "pwa-64x64.png",
            "sizes": "64x64",
            "type": "image/png"
          },
          {
            "src": "pwa-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            "src": "maskable-icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ],
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/uczestnicy",
        lang: "pl",
        orientation: "portrait",
      }
    })],
})
