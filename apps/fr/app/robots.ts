import type { MetadataRoute } from "next";

// TODO: Remove Disallow: / and restore Allow: / when site is ready for launch
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/",
      },
    ],
    // Sitemap hidden until launch
    // sitemap: "https://cdm2026.fr/sitemap.xml",
  };
}
