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
  metadataBase: new URL(domains.es),
  title: {
    default: "Copa del Mundo 2026 - Pronosticos, Estadisticas & Guia Completa",
    template: "%s | Mundial 2026",
  },
  description:
    "Pronosticos, estadisticas, cuotas y guia completa de la Copa del Mundo 2026. Analisis de las 48 selecciones, calendario de los 104 partidos, comparacion de cuotas de casas de apuestas.",
  alternates: getHomeAlternates(),
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Mundial 2026",
  },
  twitter: {
    card: "summary_large_image",
    site: "@mundial2026es",
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
    <html lang="es">
      <body className="flex min-h-screen flex-col bg-gray-50 text-gray-900 dark:bg-slate-900 dark:text-gray-100 antialiased" suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme:dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})()`,
          }}
        />
        <OrganizationSchema url={domains.es} name="Mundial 2026 - Copa del Mundo" />
        <Header />
        <LiveScoreBarWrapper />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
        <CookieConsent lang="es" />
      </body>
    </html>
  );
}
