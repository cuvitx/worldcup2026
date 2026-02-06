import type { Metadata } from "next";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "World Cup 2026 - Predictions, Stats & Complete Guide",
    template: "%s | WC 2026",
  },
  description:
    "Predictions, statistics, odds and complete guide for the 2026 World Cup. Analysis of 48 teams, schedule of 104 matches, bookmaker odds comparison.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "WC 2026",
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
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-gray-50 text-gray-900 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
