import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { domains, getHomeAlternates } from "@repo/data/route-mapping";
import { OrganizationSchema } from "@repo/ui/organization-schema";
import { LiveScoreBarWrapper } from "./components/LiveScoreBarWrapper";
import { LiveTicker } from "./components/LiveTicker";
import { BackToTop } from "@repo/ui/back-to-top";
import { StickyCTA } from "./components/StickyCTA";
import { BadgeSystem } from "@repo/ui/badge-system";
import { BottomNav } from "./components/BottomNav";
import { AutoRelatedContent } from "./components/AutoRelatedContent";
import { SiloTabs } from "./components/SiloTabs";
import { AutoBreadcrumb } from "./components/AutoBreadcrumb";
import { AffiliateTracker } from "./components/AffiliateTracker";
import { PmuBanner } from "./components/PmuBanner";
import { LiveDataProvider } from "./providers/LiveDataProvider";
import "./globals.css";

/* ── Inter — tous les poids brand book (400, 500, 600, 700, 800) ── */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
});

/* ── Montserrat — titres (h1, h2, h3, h4) Bold & Modern ── */
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#060D18",
};

export const metadata: Metadata = {
  metadataBase: new URL(domains.fr),
  title: {
    default: "Coupe du Monde 2026 - Pronostics, Stats & Guide Complet",
    template: "%s | CDM 2026",
  },
  description:
    "Pronostics, statistiques, cotes et guide complet de la Coupe du Monde 2026. Analyses des 48 équipes, calendrier des 104 matchs, comparaison des cotes des bookmakers.",
  alternates: getHomeAlternates(),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "CDM 2026",
    url: domains.fr,
    images: [{ url: `${domains.fr}/og-default.jpg`, width: 1200, height: 630, alt: "Coupe du Monde 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@cdm2026",
    creator: "@cdm2026",
    images: [`${domains.fr}/og-default.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large" as const,
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "48x48" },
      { url: "/favicon-192x192.png?v=2", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512x512.png?v=2", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        {/* Google AdSense */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3976106012756215" crossOrigin="anonymous" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        {/* Preconnect to third-party origins for faster resource loading */}
        <link rel="preconnect" href="https://flagcdn.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://flagcdn.com" />
        {/* next/font/google self-hosts Inter → pas besoin de CDN externe */}
        {/* Le preload des fonts (.woff2) est injecté automatiquement par next/font */}
        {/* robots unifié : index + max-image-preview pour Google Discover */}
        <meta name="google-site-verification" content="FuzJBEoixXdM6UjwmDg2-gNx8dQX0Lf9w0mxk9O5GC4" />
        <meta name="ga-site-verification" content="Xps5DC1t_vdtwm-b8sqMm94P" />
        <link rel="alternate" type="application/rss+xml" title="CDM 2026 - Actualités Coupe du Monde" href="/feed.xml" />
        {/* Google Analytics 4 */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}',{anonymize_ip:true});`,
              }}
            />
          </>
        )}
      </head>
      <body
        className={`${inter.className} flex min-h-screen flex-col antialiased`}
        style={{ background: "var(--color-bg)", color: "var(--color-text)" } as React.CSSProperties}
        suppressHydrationWarning
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `if("serviceWorker"in navigator){window.addEventListener("load",function(){navigator.serviceWorker.register("/sw.js")})}`,
          }}
        />
        <OrganizationSchema url={domains.fr} name="CDM 2026 - Coupe du Monde" />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white focus:shadow-lg focus:ring-2 focus:ring-white">Aller au contenu</a>
        <LiveDataProvider>
        <BadgeSystem>
        <Header />
        <LiveScoreBarWrapper />
        <LiveTicker />
        <main id="main-content" className="flex-1 overflow-x-clip"><AutoBreadcrumb /><SiloTabs />{children}</main>
        <AutoRelatedContent />
        <div className="py-6 sm:py-8"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><PmuBanner tracking="global-footer" /></div></div>
        <Footer />
        <BackToTop />
        <StickyCTA />
        <AffiliateTracker />
        <BottomNav />
        </BadgeSystem>
        </LiveDataProvider>
      </body>
    </html>
  );
}
