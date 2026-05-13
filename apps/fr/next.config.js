import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui", "@repo/data", "@repo/api", "@repo/ai"],
  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    remotePatterns: [{ protocol: "https", hostname: "flagcdn.com" }],
  },
  async redirects() {
    return [
      { source: "/equipe-de-france", destination: "/equipe/france", permanent: true },
      { source: "/portrait/:slug", destination: "/joueur/:slug", permanent: true },
      // Redirects for resolved playoff teams (March 2026)
      { source: '/equipe/barrage-uefa-d', destination: '/equipe/tchequie', permanent: true },
      { source: '/equipe/barrage-uefa-a', destination: '/equipe/bosnie-herzegovine', permanent: true },
      { source: '/equipe/barrage-uefa-b', destination: '/equipe/suede', permanent: true },
      { source: '/equipe/barrage-uefa-c', destination: '/equipe/turquie', permanent: true },
      { source: '/equipe/barrage-interconf-1', destination: '/equipe/rd-congo', permanent: true },
      { source: '/equipe/barrage-interconf-2', destination: '/equipe/irak', permanent: true },
      { source: '/effectif/barrage-uefa-d', destination: '/effectif/tchequie', permanent: true },
      { source: '/effectif/barrage-uefa-a', destination: '/effectif/bosnie-herzegovine', permanent: true },
      { source: '/effectif/barrage-uefa-b', destination: '/effectif/suede', permanent: true },
      { source: '/effectif/barrage-uefa-c', destination: '/effectif/turquie', permanent: true },
      { source: '/effectif/barrage-interconf-1', destination: '/effectif/rd-congo', permanent: true },
      { source: '/effectif/barrage-interconf-2', destination: '/effectif/irak', permanent: true },
      { source: '/parier/barrage-uefa-d', destination: '/parier/tchequie', permanent: true },
      { source: '/parier/barrage-uefa-a', destination: '/parier/bosnie-herzegovine', permanent: true },
      { source: '/parier/barrage-uefa-b', destination: '/parier/suede', permanent: true },
      { source: '/parier/barrage-uefa-c', destination: '/parier/turquie', permanent: true },
      { source: '/parier/barrage-interconf-1', destination: '/parier/rd-congo', permanent: true },
      { source: '/parier/barrage-interconf-2', destination: '/parier/irak', permanent: true },
      { source: '/pronostic/barrage-uefa-d', destination: '/pronostic/tchequie', permanent: true },
      { source: '/pronostic/barrage-uefa-a', destination: '/pronostic/bosnie-herzegovine', permanent: true },
      { source: '/pronostic/barrage-uefa-b', destination: '/pronostic/suede', permanent: true },
      { source: '/pronostic/barrage-uefa-c', destination: '/pronostic/turquie', permanent: true },
      { source: '/pronostic/barrage-interconf-1', destination: '/pronostic/rd-congo', permanent: true },
      { source: '/pronostic/barrage-interconf-2', destination: '/pronostic/irak', permanent: true },
      { source: '/cote-champion/barrage-uefa-d', destination: '/cote-champion/tchequie', permanent: true },
      { source: '/cote-champion/barrage-uefa-a', destination: '/cote-champion/bosnie-herzegovine', permanent: true },
      { source: '/cote-champion/barrage-uefa-b', destination: '/cote-champion/suede', permanent: true },
      { source: '/cote-champion/barrage-uefa-c', destination: '/cote-champion/turquie', permanent: true },
      { source: '/cote-champion/barrage-interconf-1', destination: '/cote-champion/rd-congo', permanent: true },
      { source: '/cote-champion/barrage-interconf-2', destination: '/cote-champion/irak', permanent: true },
      { source: '/scenarios-qualification-equipe/barrage-uefa-d', destination: '/scenarios-qualification-equipe/tchequie', permanent: true },
      { source: '/scenarios-qualification-equipe/barrage-uefa-a', destination: '/scenarios-qualification-equipe/bosnie-herzegovine', permanent: true },
      { source: '/scenarios-qualification-equipe/barrage-uefa-b', destination: '/scenarios-qualification-equipe/suede', permanent: true },
      { source: '/scenarios-qualification-equipe/barrage-uefa-c', destination: '/scenarios-qualification-equipe/turquie', permanent: true },
      { source: '/scenarios-qualification-equipe/barrage-interconf-1', destination: '/scenarios-qualification-equipe/rd-congo', permanent: true },
      { source: '/scenarios-qualification-equipe/barrage-interconf-2', destination: '/scenarios-qualification-equipe/irak', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://*.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://flagcdn.com https://*.googleapis.com https://*.gstatic.com; font-src 'self' data:; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com; frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self';",
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
