import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { domains, getHomeAlternates } from "@repo/data/route-mapping";
import { OrganizationSchema } from "@repo/ui/organization-schema";
import { LiveScoreBarWrapper } from "./components/LiveScoreBarWrapper";
import { CookieConsent } from "@repo/ui/cookie-consent";
import { BackToTop } from "@repo/ui/back-to-top";
import { StickyCTA } from "./components/StickyCTA";
import { BadgeSystem } from "./components/BadgeSystem";
import { BottomNav } from "./components/BottomNav";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1a1a2e",
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
  // TODO: Switch to index: true, follow: true when site is ready for launch
  robots: {
    index: false,
    follow: false,
  },
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
    <html lang="fr" className={inter.variable}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* next/font/google self-hosts Inter → pas besoin de dns-prefetch CDN Google Fonts */}
        {/* Le preload de la font (.woff2) est injecté automatiquement par next/font */}
        {/* max-image-preview:large → autorise Google Discover à afficher des grandes images */}
        <meta name="robots" content="max-image-preview:large" />
        <link rel="alternate" type="application/rss+xml" title="CDM 2026 - Actualités Coupe du Monde" href="/feed.xml" />
        {/* GA4: G-XXXXXXXXXX — décommenter et remplacer l'ID pour activer Google Analytics 4 */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" /> */}
        {/* <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-XXXXXXXXXX',{anonymize_ip:true})` }} /> */}
      </head>
      <body className={`${inter.className} flex min-h-screen flex-col bg-gray-50 text-gray-900 dark:bg-slate-900 dark:text-gray-100 antialiased`} suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme:dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})()`,
          }}
        />
        <OrganizationSchema url={domains.fr} name="CDM 2026 - Coupe du Monde" />
        <BadgeSystem>
        <Header />
        <LiveScoreBarWrapper />
        <main id="main-content" className="flex-1 pb-16 sm:pb-0">{children}</main>
        <Footer />
        <BackToTop />
        <StickyCTA />
        <CookieConsent lang="fr" />
        <BottomNav />
        </BadgeSystem>
      </body>
    </html>
  );
}
