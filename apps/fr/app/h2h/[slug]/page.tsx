import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { teams, teamsBySlug } from "@repo/data/teams";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate all possible team vs team combinations
export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const t1 = teams[i];
      const t2 = teams[j];
      if (t1 && t2) {
        params.push({ slug: `${t1.slug}-vs-${t2.slug}` });
      }
    }
  }
  return params;
}

function parseSlug(slug: string) {
  const parts = slug.split("-vs-");
  if (parts.length !== 2) return null;
  const slug1 = parts[0] as string;
  const slug2 = parts[1] as string;
  const team1 = teamsBySlug[slug1];
  const team2 = teamsBySlug[slug2];
  if (!team1 || !team2) return null;
  return { team1, team2 };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { team1, team2 } = parsed;
  return {
    title: `${team1.name} vs ${team2.name} - Historique, Stats & Pronostic CDM 2026`,
    description: `${team1.name} contre ${team2.name} : historique des confrontations, statistiques comparees, pronostic et cotes pour la Coupe du Monde 2026.`,
    openGraph: {
      title: `${team1.flag} ${team1.name} vs ${team2.name} ${team2.flag}`,
      description: `Analyse complete ${team1.name} - ${team2.name}. Historique, stats et pronostic CDM 2026.`,
    },
  };
}

export default async function H2HPage({ params }: PageProps) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { team1, team2 } = parsed;
  const sameGroup = team1.group === team2.group;

  return (
    <>
      {/* Breadcrumbs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary">Accueil</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{team1.name} vs {team2.name}</li>
          </ol>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-center md:gap-8">
            <div className="flex flex-col items-center">
              <span className="text-6xl">{team1.flag}</span>
              <Link href={`/equipe/${team1.slug}`} className="mt-2 text-2xl font-extrabold hover:text-gold">
                {team1.name}
              </Link>
              <p className="text-sm text-gray-400">#{team1.fifaRanking} FIFA</p>
            </div>
            <span className="text-3xl font-bold text-gold">VS</span>
            <div className="flex flex-col items-center">
              <span className="text-6xl">{team2.flag}</span>
              <Link href={`/equipe/${team2.slug}`} className="mt-2 text-2xl font-extrabold hover:text-gold">
                {team2.name}
              </Link>
              <p className="text-sm text-gray-400">#{team2.fifaRanking} FIFA</p>
            </div>
          </div>
          {sameGroup && (
            <p className="mt-4 text-center text-gold">
              Ces deux equipes sont dans le{" "}
              <Link href={`/groupe/${team1.group.toLowerCase()}`} className="underline">
                Groupe {team1.group}
              </Link>
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {/* Comparison Table */}
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Comparaison</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="pb-3 text-left font-medium text-accent">{team1.name}</th>
                      <th className="pb-3 text-center font-medium text-gray-500">Critere</th>
                      <th className="pb-3 text-right font-medium text-accent">{team2.name}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { label: "Classement FIFA", v1: `#${team1.fifaRanking}`, v2: `#${team2.fifaRanking}` },
                      { label: "Confederation", v1: team1.confederation, v2: team2.confederation },
                      { label: "Groupe CDM 2026", v1: team1.group, v2: team2.group },
                      { label: "Participations CDM", v1: String(team1.wcAppearances), v2: String(team2.wcAppearances) },
                      { label: "Meilleur resultat", v1: team1.bestResult, v2: team2.bestResult },
                    ].map((row) => (
                      <tr key={row.label}>
                        <td className="py-3 text-left font-medium">{row.v1}</td>
                        <td className="py-3 text-center text-gray-500">{row.label}</td>
                        <td className="py-3 text-right font-medium">{row.v2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Historical H2H (placeholder) */}
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Historique des confrontations</h2>
              <p className="text-gray-600">
                L&apos;historique complet des confrontations entre {team1.name} et{" "}
                {team2.name} sera disponible prochainement avec les donnees
                detaillees de chaque match.
              </p>
            </section>

            {/* Prediction */}
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Pronostic</h2>
              <p className="text-gray-600">
                Notre algorithme de prediction base sur les classements ELO et
                les statistiques avancees analysera les chances de chaque equipe.
                Les pronostics seront disponibles prochainement.
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Team Links */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">Fiches equipes</h3>
              <div className="space-y-3">
                <Link
                  href={`/equipe/${team1.slug}`}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent"
                >
                  <span className="text-xl">{team1.flag}</span>
                  <span className="font-medium">{team1.name}</span>
                </Link>
                <Link
                  href={`/equipe/${team2.slug}`}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent"
                >
                  <span className="text-xl">{team2.flag}</span>
                  <span className="font-medium">{team2.name}</span>
                </Link>
              </div>
            </div>

            {/* Betting CTA */}
            <div className="rounded-lg bg-accent/5 border border-accent/20 p-6">
              <h3 className="mb-2 text-lg font-bold text-accent">
                Cotes {team1.name} vs {team2.name}
              </h3>
              <p className="text-sm text-gray-600">
                Comparez les cotes des bookmakers pour ce match.
              </p>
            </div>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsEvent",
            name: `${team1.name} vs ${team2.name} - Coupe du Monde 2026`,
            sport: "Football",
            homeTeam: { "@type": "SportsTeam", name: team1.name },
            awayTeam: { "@type": "SportsTeam", name: team2.name },
          }),
        }}
      />
    </>
  );
}
