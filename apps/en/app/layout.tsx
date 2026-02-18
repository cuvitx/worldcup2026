import type { Metadata, Viewport } from "next";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { domains, getHomeAlternates } from "@repo/data/route-mapping";
import { OrganizationSchema } from "@repo/ui/organization-schema";
import { LiveScoreBarWrapper } from "./components/LiveScoreBarWrapper";
import { CookieConsent } from "@repo/ui/cookie-consent";
import { BackToTop } from "@repo/ui/back-to-top";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1a1a2e",
};

export const metadata: Metadata = {
  metadataBase: new URL(domains.en),
  title: {
    default: "World Cup 2026 - Predictions, Stats & Complete Guide",
    template: "%s | WC 2026",
  },
  description:
    "Predictions, statistics, odds and complete guide for the 2026 World Cup. Analysis of 48 teams, schedule of 104 matches, bookmaker odds comparison.",
  alternates: getHomeAlternates(),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "WC 2026",
  },
  twitter: {
    card: "summary_large_image",
    site: "@worldcup2026guide",
  },
  robots: {
    index: true,
    follow: true,
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
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-gray-50 text-gray-900 dark:bg-slate-900 dark:text-gray-100 antialiased" suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme:dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})()`,
          }}
        />
        <OrganizationSchema url={domains.en} name="WC 2026 - World Cup Guide" />
        <Header />
        <LiveScoreBarWrapper />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
        <CookieConsent lang="en" />
      </body>
    </html>
  );
}
