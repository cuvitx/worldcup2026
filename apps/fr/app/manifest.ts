import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CDM 2026 - Coupe du Monde",
    short_name: "CDM 2026",
    description:
      "Pronostics, statistiques et guide complet de la Coupe du Monde 2026",
    start_url: "/",
    display: "standalone",
    background_color: "#1a1a2e",
    theme_color: "#1a1a2e",
    scope: "/",
    orientation: "portrait",
    categories: ["sports", "news"],
    lang: "fr",
    icons: [
      { src: "/api/pwa-icon-192", sizes: "192x192", type: "image/png" },
      { src: "/api/pwa-icon-512", sizes: "512x512", type: "image/png" },
    ],
  };
}
