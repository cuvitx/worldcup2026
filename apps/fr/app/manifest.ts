import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CDM 2026 - Coupe du Monde",
    short_name: "CDM 2026",
    description:
      "Pronostics, statistiques et guide complet de la Coupe du Monde 2026",
    start_url: "/",
    display: "standalone",
    background_color: "#022149",
    theme_color: "#022149",
    scope: "/",
    orientation: "portrait",
    categories: ["sports", "news"],
    lang: "fr",
    icons: [
      { src: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/favicon-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
