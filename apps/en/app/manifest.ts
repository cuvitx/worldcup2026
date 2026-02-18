import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "WC 2026 - World Cup Guide",
    short_name: "WC 2026",
    description:
      "Predictions, statistics and complete guide for the 2026 World Cup",
    start_url: "/",
    display: "standalone",
    background_color: "#1a1a2e",
    theme_color: "#1a1a2e",
    scope: "/",
    orientation: "portrait",
    categories: ["sports", "news"],
    lang: "en",
    icons: [
      { src: "/api/pwa-icon-192", sizes: "192x192", type: "image/png" },
      { src: "/api/pwa-icon-512", sizes: "512x512", type: "image/png" },
    ],
  };
}
