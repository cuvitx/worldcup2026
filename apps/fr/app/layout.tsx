import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { domains, getHomeAlternates } from "@repo/data/route-mapping";
import { OrganizationSchema } from "@repo/ui/organization-schema";
import { LiveScoreBarWrapper } from "./components/LiveScoreBarWrapper";
import { LiveTicker } from "./components/LiveTicker";
import { CookieConsent } from "@repo/ui/cookie-consent";
import { BackToTop } from "@repo/ui/back-to-top";
import { StickyCTA } from "./components/StickyCTA";
import { BadgeSystem } from "@repo/ui/badge-system";
import { BottomNav } from "./components/BottomNav";
import { NewsletterPopup } from "@repo/ui/newsletter-popup";
import "./globals.css";

/* ── Inter — tous les poids brand book (400, 500, 600, 700, 800) ── */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
});

/* ── Space Grotesk — titres (h1, h2, h3) Direction A Continental ── */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
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
  // Controlled by IS_LAUNCHED env variable — set to "true" to enable indexing at launch
  robots: process.env.IS_LAUNCHED === "true"
    ? { index: true, follow: true }
    : { index: false, follow: false },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
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
    <html lang="fr" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        {/* next/font/google self-hosts Inter → pas besoin de CDN externe */}
        {/* Le preload des fonts (.woff2) est injecté automatiquement par next/font */}
        {/* max-image-preview:large → autorise Google Discover à afficher des grandes images */}
        <meta name="robots" content="max-image-preview:large" />
        <link rel="alternate" type="application/rss+xml" title="CDM 2026 - Actualités Coupe du Monde" href="/feed.xml" />
        {/* TODO: Activer GA4 — remplacer G-XXXXXXXXXX par l'ID réel puis décommenter les scripts gtag */}
      </head>
      {/*
        Body — Brand Book CDM2026 :
        - Light mode  : bg #F7F7F8 (Blanc Pelouse), text #1A1A2E (Texte sur clair)
        - Dark mode   : bg #0F1923 (Nuit de Match), text #E8ECF1 (Texte sur sombre)
        CSS vars --color-bg / --color-text sont surchargés par .dark via globals.css
      */}
      <body
        className={`${inter.className} flex min-h-screen flex-col antialiased`}
        style={{ background: "var(--color-bg)", color: "var(--color-text)" } as React.CSSProperties}
        suppressHydrationWarning
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme:dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})()`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `if("serviceWorker"in navigator){window.addEventListener("load",function(){navigator.serviceWorker.register("/sw.js")})}`,
          }}
        />
        <OrganizationSchema url={domains.fr} name="CDM 2026 - Coupe du Monde" />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white focus:shadow-lg focus:ring-2 focus:ring-white">Aller au contenu</a>
        <BadgeSystem>
        <Header />
        <LiveScoreBarWrapper />
        <LiveTicker />
        <main id="main-content" className="flex-1 pb-32 sm:pb-0">{children}</main>
        <Footer />
        <BackToTop />
        <StickyCTA />
        <CookieConsent lang="fr" />
        <NewsletterPopup />
        <BottomNav />
        </BadgeSystem>
      </body>
    </html>
  );
}
