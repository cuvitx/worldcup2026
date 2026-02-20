import type { Metadata } from "next";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { LeaderboardClient } from "./LeaderboardClient";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";

export const metadata: Metadata = {
  title: "Classement Pronostics Coupe du Monde 2026",
  description:
    "Découvrez le classement des pronostiqueurs de la Coupe du Monde 2026. 3 points pour un résultat exact, 1 point pour le bon vainqueur. Qui sera le meilleur oracle ?",
  alternates: {
    canonical: "https://cdm2026.fr/pronostics/leaderboard",
  },
  openGraph: {
    title: "Classement Pronostics CDM 2026",
    description:
      "Le classement des meilleurs pronostiqueurs de la Coupe du Monde 2026.",
    url: "https://cdm2026.fr/pronostics/leaderboard",
    siteName: "CDM 2026",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Classement Pronostics CDM 2026",
    description: "Classement des pronostiqueurs CDM 2026.",
  },
};

export default function LeaderboardPage() {
  return (
    <>
      <BreadcrumbSchema items={[{"name":"Accueil","url":"/"},{"name":"Pronostics","url":"/pronostic"},{"name":"Classement","url":"/pronostics/leaderboard"}]} baseUrl={domains.fr} />
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Pronostics", href: "/pronostic" },
          { label: "Classement" },
        ]}
      />
      <LeaderboardClient />
    </>
  );
}
