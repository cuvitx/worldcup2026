import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { matches } from "@repo/data/matches";
import { teams } from "@repo/data/teams";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: "Plan du site - Matchs - Coupe du Monde 2026",
    description:
      "Liste complète des 104 matchs de la Coupe du Monde 2026 : liens vers pronostics, compositions, arbitres et corners pour chaque rencontre.",
    openGraph: {
      title: "Plan du site - Tous les matchs CDM 2026",
      description: "Les 104 matchs du Mondial 2026 : phase de groupes, eliminatoires et finale.",
      url: "https://cdm2026.fr/plan-du-site/matchs",
    },
    alternates: { canonical: "https://cdm2026.fr/plan-du-site/matchs" },
  };
}

const breadcrumbItems: { label: string; href?: string }[] = [
  { label: "Accueil", href: "/" },
  { label: "Plan du site", href: "/plan-du-site" },
  { label: "Matchs" },
];

const stageLabels: Record<string, string> = {
  group: "Phase de groupes",
  "round-of-32": "32es de finale",
  "round-of-16": "16es de finale",
  "quarter-final": "Quarts de finale",
  "semi-final": "Demi-finales",
  "third-place": "Match pour la 3e place",
  final: "Finale",
};

const stageOrder = ["group", "round-of-32", "round-of-16", "quarter-final", "semi-final", "third-place", "final"];

const teamsById = Object.fromEntries(teams.map((t) => [t.id, t]));

function getMatchLabel(m: { homeTeamId: string; awayTeamId: string }) {
  const home = teamsById[m.homeTeamId]?.name ?? m.homeTeamId;
  const away = teamsById[m.awayTeamId]?.name ?? m.awayTeamId;
  return `${home} - ${away}`;
}

export default function PlanDuSiteMatchsPage() {
  const matchesByStage = stageOrder
    .map((stage) => ({
      stage,
      label: stageLabels[stage] ?? stage,
      matches: matches.filter((m) => m.stage === stage),
    }))
    .filter((g) => g.matches.length > 0);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />
<h1 className="mt-6 text-3xl font-bold text-foreground">Plan du site — Matchs</h1>
      <p className="mt-2 text-gray-600">
        Les 104 matchs de la Coupe du Monde 2026 avec tous les liens associes.
      </p>

      {matchesByStage.map((group) => (
        <section key={group.stage} className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">{group.label}</h2>
          <div className="mt-4 space-y-4">
            {group.matches.map((m) => {
              const label = getMatchLabel(m);
              return (
                <div key={m.id} className="border-b border-gray-100 pb-3">
                  <h3 className="font-medium text-foreground">
                    <Link href={`/match/${m.slug}`} className="text-primary hover:text-accent transition-colors">
                      {label}
                    </Link>
                    {m.group && (
                      <span className="ml-2 text-sm text-gray-500">Groupe {m.group}</span>
                    )}
                  </h3>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    <Link href={`/pronostic-match/${m.slug}`} className="text-primary hover:text-accent transition-colors">
                      Pronostic
                    </Link>
                    <Link href={`/compos-officielles/${m.slug}`} className="text-primary hover:text-accent transition-colors">
                      Compositions
                    </Link>
                    <Link href={`/arbitre/${m.slug}`} className="text-primary hover:text-accent transition-colors">
                      Arbitre
                    </Link>
                    <Link href={`/corners/${m.slug}`} className="text-primary hover:text-accent transition-colors">
                      Corners
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
}
