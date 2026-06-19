import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "WM 2026 - Weltmeisterschaft",
    short_name: "WM 2026",
    description:
      "Prognosen, Statistiken und kompletter Ratgeber zur WM 2026",
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
