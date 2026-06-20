import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { domains, getHomeAlternates } from "@repo/data/route-mapping";
import { OrganizationSchema } from "@repo/ui/organization-schema";
import { WebSiteSchema } from "@repo/ui/website-schema";
import { BackToTop } from "@repo/ui/back-to-top";
import "@repo/data/translations/register-de";
import "./globals.css";

export const revalidate = 300;

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
});

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
  metadataBase: new URL(domains.de),
  title: {
    default: "WM 2026 — Prognosen, Quoten & Kompletter Guide",
    template: "%s | WM 2026",
  },
  description:
    "WM 2026: Prognosen, Quoten & Analysen aller 48 Mannschaften. Spielplan der 104 Spiele, Quotenvergleich der Wettanbieter.",
  alternates: getHomeAlternates("de"),
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "WM 2026",
    url: domains.de,
    images: [{ url: `${domains.de}/og-default.jpg`, width: 1200, height: 630, alt: "WM 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${domains.de}/og-default.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large" as const,
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "48x48" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <meta name="ga-site-verification" content="TfTGSZpdKEk9FazCuN1l3qSr" />
        <link rel="preconnect" href="https://flagcdn.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://flagcdn.com" />
        {process.env.NEXT_PUBLIC_GA_ID_DE && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID_DE}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID_DE}',{anonymize_ip:true});`,
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
        <OrganizationSchema lang="de" url={domains.de} name="WM 2026 — Fussball-Weltmeisterschaft" />
        <WebSiteSchema url={domains.de} name="WM 2026" description="Kompletter Guide zur Fussball-WM 2026: Prognosen, Quoten, Analysen aller 48 Mannschaften." />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white focus:shadow-lg focus:ring-2 focus:ring-white">Zum Inhalt springen</a>
        <Header />
        <main id="main-content" className="flex-1 overflow-hidden">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
