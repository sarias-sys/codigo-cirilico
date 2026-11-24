import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// En GitHub Pages la app vive en /<repositorio>/; el flujo de despliegue pasa BASE_PATH.
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      pwaAssets: { image: "public/icon.svg", preset: "minimal-2023", overrideManifestIcons: true, includeHtmlHeadLinks: true },
      manifest: {
        name: "Código Cirílico",
        short_name: "Cirílico",
        description: "Aprende ruso desde el alfabeto con una historia épica de supervivencia y misterio.",
        lang: "es",
        theme_color: "#0e1014",
        background_color: "#0e1014",
        display: "standalone",
        orientation: "portrait",
      },
      workbox: {
        // Los audios también se guardan para que la voz funcione sin internet.
        globPatterns: ["**/*.{js,css,html,svg,png,ico,mp3}"],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === "https://fonts.googleapis.com" || url.origin === "https://fonts.gstatic.com",
            handler: "CacheFirst",
            options: { cacheName: "fuentes", expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 } },
          },
        ],
      },
    }),
  ],
});
