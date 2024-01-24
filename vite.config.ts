import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
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
        swSrc: './src/sw.ts',
        swDest: './dist/sw.js'
      },
      srcDir: 'src',
      filename: 'sw.ts',
      manifest: {
        name: "Modlitwa wstawiennicza MOST",
        short_name: "Modlitwa wstawiennicza",
        description: "Aplikacja podprzęsła modlitwy wstawienniczej w duszpasterstwie MOST",
        theme_color: "#e8f1fe",
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
