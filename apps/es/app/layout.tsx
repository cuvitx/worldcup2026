import type { Metadata } from "next";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { domains, getHomeAlternates } from "@repo/data/route-mapping";
import { OrganizationSchema } from "@repo/ui/organization-schema";
import { LiveScoreBarWrapper } from "./components/LiveScoreBarWrapper";
import "./globals.css";

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
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="flex min-h-screen flex-col bg-gray-50 text-gray-900 antialiased">
        <OrganizationSchema url={domains.es} name="Mundial 2026 - Copa del Mundo" />
        <Header />
        <LiveScoreBarWrapper />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
