// vite.config.ts
import { defineConfig } from "file:///C:/Users/atepl/modlitwa-wstawiennicza-app/node_modules/vite/dist/node/index.js";
import solid from "file:///C:/Users/atepl/modlitwa-wstawiennicza-app/node_modules/vite-plugin-solid/dist/esm/index.mjs";
import { VitePWA } from "file:///C:/Users/atepl/modlitwa-wstawiennicza-app/node_modules/vite-plugin-pwa/dist/index.js";
var vite_config_default = defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "solid-js": ["solid-js"],
          "solid-js/web": ["solid-js/web"],
          "solid-js/store": ["solid-js/store"],
          "firestore": ["firebase/firestore"]
        }
      }
    }
  },
  base: "./",
  plugins: [
    solid(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
        type: "module",
        navigateFallback: "index.html"
      },
      strategies: "injectManifest",
      injectManifest: {
        swSrc: "./src/firebase-messaging-sw.ts",
        swDest: "./dist/firebase-messaging-sw.js"
      },
      srcDir: "src",
      filename: "firebase-messaging-sw.ts",
      manifest: {
        name: "Modlitwa wstawiennicza MOST",
        short_name: "MW MOST",
        description: "Aplikacja podprz\u0119s\u0142a modlitwy wstawienniczej w duszpasterstwie MOST",
        theme_color: "#233876",
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
        orientation: "portrait"
      }
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhdGVwbFxcXFxtb2RsaXR3YS13c3Rhd2llbm5pY3phLWFwcFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYXRlcGxcXFxcbW9kbGl0d2Etd3N0YXdpZW5uaWN6YS1hcHBcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2F0ZXBsL21vZGxpdHdhLXdzdGF3aWVubmljemEtYXBwL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCBzb2xpZCBmcm9tICd2aXRlLXBsdWdpbi1zb2xpZCdcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgICdzb2xpZC1qcyc6IFsnc29saWQtanMnXSxcbiAgICAgICAgICAnc29saWQtanMvd2ViJzogWydzb2xpZC1qcy93ZWInXSxcbiAgICAgICAgICAnc29saWQtanMvc3RvcmUnOiBbJ3NvbGlkLWpzL3N0b3JlJ10sXG4gICAgICAgICAgJ2ZpcmVzdG9yZSc6IFsnZmlyZWJhc2UvZmlyZXN0b3JlJ10sXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGJhc2U6ICcuLycsXG4gIHBsdWdpbnM6IFtcbiAgICBzb2xpZCgpLFxuICAgIFZpdGVQV0Eoe1xuICAgICAgcmVnaXN0ZXJUeXBlOiAnYXV0b1VwZGF0ZScsXG4gICAgICBkZXZPcHRpb25zOiB7XG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgIHR5cGU6ICdtb2R1bGUnLFxuICAgICAgICBuYXZpZ2F0ZUZhbGxiYWNrOiAnaW5kZXguaHRtbCcsXG4gICAgICB9LFxuICAgICAgc3RyYXRlZ2llczogJ2luamVjdE1hbmlmZXN0JyxcbiAgICAgIGluamVjdE1hbmlmZXN0OiB7XG4gICAgICAgIHN3U3JjOiAnLi9zcmMvZmlyZWJhc2UtbWVzc2FnaW5nLXN3LnRzJyxcbiAgICAgICAgc3dEZXN0OiAnLi9kaXN0L2ZpcmViYXNlLW1lc3NhZ2luZy1zdy5qcydcbiAgICAgIH0sXG4gICAgICBzcmNEaXI6ICdzcmMnLFxuICAgICAgZmlsZW5hbWU6ICdmaXJlYmFzZS1tZXNzYWdpbmctc3cudHMnLFxuICAgICAgbWFuaWZlc3Q6IHtcbiAgICAgICAgbmFtZTogXCJNb2RsaXR3YSB3c3Rhd2llbm5pY3phIE1PU1RcIixcbiAgICAgICAgc2hvcnRfbmFtZTogXCJNVyBNT1NUXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkFwbGlrYWNqYSBwb2RwcnpcdTAxMTlzXHUwMTQyYSBtb2RsaXR3eSB3c3Rhd2llbm5pY3plaiB3IGR1c3pwYXN0ZXJzdHdpZSBNT1NUXCIsXG4gICAgICAgIHRoZW1lX2NvbG9yOiBcIiMyMzM4NzZcIixcbiAgICAgICAgaWNvbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBcInNyY1wiOiBcInB3YS02NHg2NC5wbmdcIixcbiAgICAgICAgICAgIFwic2l6ZXNcIjogXCI2NHg2NFwiLFxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvcG5nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwic3JjXCI6IFwicHdhLTE5MngxOTIucG5nXCIsXG4gICAgICAgICAgICBcInNpemVzXCI6IFwiMTkyeDE5MlwiLFxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvcG5nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwic3JjXCI6IFwicHdhLTUxMng1MTIucG5nXCIsXG4gICAgICAgICAgICBcInNpemVzXCI6IFwiNTEyeDUxMlwiLFxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvcG5nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwic3JjXCI6IFwibWFza2FibGUtaWNvbi01MTJ4NTEyLnBuZ1wiLFxuICAgICAgICAgICAgXCJzaXplc1wiOiBcIjUxMng1MTJcIixcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICAgICAgXCJwdXJwb3NlXCI6IFwibWFza2FibGVcIlxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgYmFja2dyb3VuZF9jb2xvcjogXCIjZmZmZmZmXCIsXG4gICAgICAgIGRpc3BsYXk6IFwic3RhbmRhbG9uZVwiLFxuICAgICAgICBzY29wZTogXCIvXCIsXG4gICAgICAgIHN0YXJ0X3VybDogXCIvdWN6ZXN0bmljeVwiLFxuICAgICAgICBsYW5nOiBcInBsXCIsXG4gICAgICAgIG9yaWVudGF0aW9uOiBcInBvcnRyYWl0XCIsXG4gICAgICB9XG4gICAgfSldLFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBcVQsU0FBUyxvQkFBb0I7QUFDbFYsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZUFBZTtBQUV4QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixjQUFjO0FBQUEsVUFDWixZQUFZLENBQUMsVUFBVTtBQUFBLFVBQ3ZCLGdCQUFnQixDQUFDLGNBQWM7QUFBQSxVQUMvQixrQkFBa0IsQ0FBQyxnQkFBZ0I7QUFBQSxVQUNuQyxhQUFhLENBQUMsb0JBQW9CO0FBQUEsUUFDcEM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQU07QUFBQSxFQUNOLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxNQUNOLGNBQWM7QUFBQSxNQUNkLFlBQVk7QUFBQSxRQUNWLFNBQVM7QUFBQSxRQUNULE1BQU07QUFBQSxRQUNOLGtCQUFrQjtBQUFBLE1BQ3BCO0FBQUEsTUFDQSxZQUFZO0FBQUEsTUFDWixnQkFBZ0I7QUFBQSxRQUNkLE9BQU87QUFBQSxRQUNQLFFBQVE7QUFBQSxNQUNWO0FBQUEsTUFDQSxRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsUUFDUixNQUFNO0FBQUEsUUFDTixZQUFZO0FBQUEsUUFDWixhQUFhO0FBQUEsUUFDYixhQUFhO0FBQUEsUUFDYixPQUFPO0FBQUEsVUFDTDtBQUFBLFlBQ0UsT0FBTztBQUFBLFlBQ1AsU0FBUztBQUFBLFlBQ1QsUUFBUTtBQUFBLFVBQ1Y7QUFBQSxVQUNBO0FBQUEsWUFDRSxPQUFPO0FBQUEsWUFDUCxTQUFTO0FBQUEsWUFDVCxRQUFRO0FBQUEsVUFDVjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE9BQU87QUFBQSxZQUNQLFNBQVM7QUFBQSxZQUNULFFBQVE7QUFBQSxVQUNWO0FBQUEsVUFDQTtBQUFBLFlBQ0UsT0FBTztBQUFBLFlBQ1AsU0FBUztBQUFBLFlBQ1QsUUFBUTtBQUFBLFlBQ1IsV0FBVztBQUFBLFVBQ2I7QUFBQSxRQUNGO0FBQUEsUUFDQSxrQkFBa0I7QUFBQSxRQUNsQixTQUFTO0FBQUEsUUFDVCxPQUFPO0FBQUEsUUFDUCxXQUFXO0FBQUEsUUFDWCxNQUFNO0FBQUEsUUFDTixhQUFhO0FBQUEsTUFDZjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQUM7QUFDTixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
