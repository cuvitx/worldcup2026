import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mundial 2026 - Copa del Mundo",
    short_name: "Mundial 2026",
    description:
      "Pronosticos, estadisticas y guia completa de la Copa del Mundo 2026",
    start_url: "/",
    display: "standalone",
    background_color: "#1a1a2e",
    theme_color: "#1a1a2e",
    scope: "/",
    orientation: "portrait",
    categories: ["sports", "news"],
    lang: "es",
    icons: [
      { src: "/api/pwa-icon-192", sizes: "192x192", type: "image/png" },
      { src: "/api/pwa-icon-512", sizes: "512x512", type: "image/png" },
    ],
  };
}
