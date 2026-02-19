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
    images: [{ url: `${domains.fr}/images/og-default.png`, width: 1200, height: 630, alt: "Coupe du Monde 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@cdm2026",
    creator: "@cdm2026",
  },
  // TODO: Switch to index: true, follow: true when site is ready for launch
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
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
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
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
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
        <StickyCTA />
        <CookieConsent lang="fr" />
        </BadgeSystem>
      </body>
    </html>
  );
}
