import type { MetadataRoute } from "next";

const isLaunched = process.env.IS_LAUNCHED === "true";

export default function robots(): MetadataRoute.Robots {
  if (isLaunched) {
    return {
      rules: [
        {
          userAgent: "*",
          allow: "/",
        },
      ],
      sitemap: "https://cdm2026.fr/sitemap.xml",
    };
  }

  // Site not launched yet — block all crawlers
  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/",
      },
    ],
    // Sitemap hidden until launch
  };
}
