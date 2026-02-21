import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { groups } from "@repo/data/groups";
import { teams } from "@repo/data/teams";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: "Plan du site - Equipes - Coupe du Monde 2026",
    description:
      "Les 48 equipes de la Coupe du Monde 2026 organisees par groupe avec liens vers pronostics et scenarios de qualification.",
    openGraph: {
      title: "Plan du site - Toutes les equipes CDM 2026",
      description: "48 equipes, 12 groupes : pronostics, scenarios et fiches equipe.",
      url: "https://cdm2026.fr/plan-du-site/equipes",
    },
  };
}

const breadcrumbItems: { label: string; href?: string }[] = [
  { label: "Accueil", href: "/" },
  { label: "Plan du site", href: "/plan-du-site" },
  { label: "Equipes" },
];

const teamsById = Object.fromEntries(teams.map((t) => [t.id, t]));

export default function PlanDuSiteEquipesPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />
<h1 className="mt-6 text-3xl font-bold text-foreground">Plan du site — Equipes</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Les 48 equipes qualifiees pour la Coupe du Monde 2026, organisees par groupe.
      </p>

      <div className="mt-8 space-y-10">
        {groups.map((group) => (
          <section key={group.letter}>
            <h2 className="text-xl font-semibold text-foreground">
              <Link href={`/groupe/${group.slug}`} className="text-primary hover:text-accent transition-colors">
                Groupe {group.letter}
              </Link>
            </h2>
            <div className="mt-4 space-y-3">
              {group.teams.map((teamId) => {
                const team = teamsById[teamId];
                if (!team) return null;
                return (
                  <div key={team.id} className="border-b border-gray-100 pb-2 dark:border-gray-800">
                    <h3 className="font-medium">
                      <Link href={`/equipe/${team.slug}`} className="text-primary hover:text-accent transition-colors">
                        {team.name}
                      </Link>
                    </h3>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                      <Link href={`/pronostic/${team.slug}`} className="text-primary hover:text-accent transition-colors">
                        Pronostic
                      </Link>
                      <Link href={`/scenarios-qualification-equipe/${team.slug}`} className="text-primary hover:text-accent transition-colors">
                        Scenarios de qualification
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
