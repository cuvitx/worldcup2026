import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CDM 2026 - WM",
    short_name: "CDM 2026",
    description:
      "Prognoses, statistiques et guide complet der WM 2026",
    start_url: "/",
    display: "standalone",
    background_color: "#022149",
    theme_color: "#022149",
    scope: "/",
    orientation: "portrait",
    categories: ["sports", "news"],
    lang: "de",
    icons: [
      { src: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/favicon-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
