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
      // Match slugs: resolved playoff team names (June 2026)
      { source: '/match/coree-du-sud-vs-barrage-uefa-d', destination: '/match/coree-du-sud-vs-tchequie', permanent: true },
      { source: '/match/canada-vs-barrage-uefa-a', destination: '/match/canada-vs-bosnie-herzegovine', permanent: true },
      { source: '/match/australie-vs-barrage-uefa-c', destination: '/match/australie-vs-turquie', permanent: true },
      { source: '/match/tunisie-vs-barrage-uefa-b', destination: '/match/tunisie-vs-suede', permanent: true },
      { source: '/match/barrage-interconf-2-vs-norvege', destination: '/match/irak-vs-norvege', permanent: true },
      { source: '/match/portugal-vs-barrage-interconf-1', destination: '/match/portugal-vs-rd-congo', permanent: true },
      { source: '/match/barrage-uefa-d-vs-afrique-du-sud', destination: '/match/tchequie-vs-afrique-du-sud', permanent: true },
      { source: '/match/suisse-vs-barrage-uefa-a', destination: '/match/suisse-vs-bosnie-herzegovine', permanent: true },
      { source: '/match/barrage-uefa-c-vs-paraguay', destination: '/match/turquie-vs-paraguay', permanent: true },
      { source: '/match/pays-bas-vs-barrage-uefa-b', destination: '/match/pays-bas-vs-suede', permanent: true },
      { source: '/match/france-vs-barrage-interconf-2', destination: '/match/france-vs-irak', permanent: true },
      { source: '/match/colombie-vs-barrage-interconf-1', destination: '/match/colombie-vs-rd-congo', permanent: true },
      { source: '/match/barrage-uefa-d-vs-mexique', destination: '/match/tchequie-vs-mexique', permanent: true },
      { source: '/match/barrage-uefa-a-vs-qatar', destination: '/match/bosnie-herzegovine-vs-qatar', permanent: true },
      { source: '/match/barrage-uefa-c-vs-etats-unis', destination: '/match/turquie-vs-etats-unis', permanent: true },
      { source: '/match/japon-vs-barrage-uefa-b', destination: '/match/japon-vs-suede', permanent: true },
      { source: '/match/senegal-vs-barrage-interconf-2', destination: '/match/senegal-vs-irak', permanent: true },
      { source: '/match/barrage-interconf-1-vs-ouzbekistan', destination: '/match/rd-congo-vs-ouzbekistan', permanent: true },
      // Old player slugs → effectif page (squad changes June 2026)
      { source: '/joueur/lucas-chevalier', destination: '/effectif/france', permanent: true },
      { source: '/joueur/pierre-kalulu', destination: '/effectif/france', permanent: true },
      { source: '/joueur/camavinga', destination: '/effectif/france', permanent: true },
      { source: '/joueur/hugo-ekitike', destination: '/effectif/france', permanent: true },
      { source: '/joueur/randal-muani', destination: '/effectif/france', permanent: true },
      // Old bookmaker bonus pages → bonus hub
      { source: '/bonus/winamax', destination: '/bonus', permanent: true },
      { source: '/bonus/betclic', destination: '/bonus', permanent: true },
      { source: '/bonus/unibet', destination: '/bonus', permanent: true },
      { source: '/bonus/parionssport', destination: '/bonus', permanent: true },
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
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://*.google-analytics.com https://pagead2.googlesyndication.com https://*.googleadservices.com https://adservice.google.com https://www.google.com https://tpc.googlesyndication.com https://www.gambling-affiliation.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://flagcdn.com https://media.api-sports.io https://*.googleapis.com https://*.gstatic.com https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://*.googleadservices.com https://www.gambling-affiliation.com https://*.gambling-affiliation.com; font-src 'self' data:; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://pagead2.googlesyndication.com https://*.googlesyndication.com; frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://*.googlesyndication.com https://www.google.com https://www.gambling-affiliation.com https://*.gambling-affiliation.com; object-src 'none'; base-uri 'self'; form-action 'self';",
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
