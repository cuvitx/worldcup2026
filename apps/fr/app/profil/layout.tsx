import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mon profil CDM 2026",
  description:
    "Suivez vos stats personnelles, débloquez des badges et consultez votre streak sur la Coupe du Monde 2026. Tout est local, sans inscription.",
  openGraph: {
    title: "Mon profil CDM 2026",
    description:
      "Vos stats, badges et streak CDM 2026 — sans compte, tout est stocké en local.",
    url: "https://www.cdm2026.fr/profil",
    siteName: "CDM 2026",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Mon profil CDM 2026",
    description: "Vos stats, badges et streak CDM 2026 — sans compte.",
  },
  robots: {
    index: false, // page personnalisée → pas utile en SEO
    follow: false,
  },
  alternates: { canonical: "https://www.cdm2026.fr/profil" },
};

export default function ProfilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
