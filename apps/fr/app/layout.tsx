import type { Metadata } from "next";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Coupe du Monde 2026 - Pronostics, Stats & Guide Complet",
    template: "%s | CDM 2026",
  },
  description:
    "Pronostics, statistiques, cotes et guide complet de la Coupe du Monde 2026. Analyses des 48 equipes, calendrier des 104 matchs, comparaison des cotes des bookmakers.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "CDM 2026",
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
    <html lang="fr">
      <body className="flex min-h-screen flex-col bg-gray-50 text-gray-900 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
