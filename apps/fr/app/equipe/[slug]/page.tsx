import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { teams, teamsBySlug } from "@repo/data/teams";
import { groupsByLetter } from "@repo/data/groups";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return teams.map((team) => ({ slug: team.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const team = teamsBySlug[slug];
  if (!team) return {};

  return {
    title: `${team.name} - Coupe du Monde 2026 | Effectif, Stats & Pronostics`,
    description: `Tout sur ${team.name} a la Coupe du Monde 2026 : effectif, statistiques, historique, groupe ${team.group}, cotes et pronostics. ${team.description}`,
    openGraph: {
      title: `${team.flag} ${team.name} - CDM 2026`,
      description: `Fiche complete de ${team.name} pour la Coupe du Monde 2026. Groupe ${team.group}, classement FIFA #${team.fifaRanking}.`,
    },
  };
}

export default async function TeamPage({ params }: PageProps) {
  const { slug } = await params;
  const team = teamsBySlug[slug];
  if (!team) notFound();

  const group = groupsByLetter[team.group];
  const groupTeams = group
    ? group.teams
        .map((id) => teams.find((t) => t.id === id))
        .filter((t): t is NonNullable<typeof t> => t != null && t.id !== team.id)
    : [];

  return (
    <>
      {/* Breadcrumbs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary">Accueil</Link></li>
            <li>/</li>
            <li><Link href={`/groupe/${team.group.toLowerCase()}`} className="hover:text-primary">Groupe {team.group}</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{team.name}</li>
          </ol>
        </div>
      </nav>

      {/* Team Header */}
      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-6">
            <span className="text-7xl">{team.flag}</span>
            <div>
              <h1 className="text-4xl font-extrabold">{team.name}</h1>
              <p className="mt-2 text-gray-300">
                {team.confederation} &middot; Classement FIFA #{team.fifaRanking} &middot; Groupe {team.group}
              </p>
              {team.isHost && (
                <span className="mt-2 inline-block rounded-full bg-gold/20 px-3 py-1 text-sm font-medium text-gold">
                  Pays hote
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Presentation</h2>
              <p className="text-gray-700 leading-relaxed">{team.description}</p>
            </section>

            {/* World Cup History */}
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Historique en Coupe du Monde</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-3xl font-bold text-primary">{team.wcAppearances}</p>
                  <p className="text-sm text-gray-500">Participations</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-lg font-bold text-primary">{team.bestResult}</p>
                  <p className="text-sm text-gray-500">Meilleur resultat</p>
                </div>
              </div>
            </section>

            {/* Group Stage */}
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">
                <Link href={`/groupe/${team.group.toLowerCase()}`} className="hover:text-accent">
                  Groupe {team.group}
                </Link>
              </h2>
              <p className="mb-4 text-gray-600">
                Adversaires de {team.name} en phase de groupes :
              </p>
              <div className="space-y-3">
                {groupTeams.map((opponent) => (
                  <Link
                    key={opponent.id}
                    href={`/equipe/${opponent.slug}`}
                    className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50"
                  >
                    <span className="text-2xl">{opponent.flag}</span>
                    <div>
                      <p className="font-semibold">{opponent.name}</p>
                      <p className="text-sm text-gray-500">
                        {opponent.confederation} &middot; #{opponent.fifaRanking} FIFA
                      </p>
                    </div>
                    <span className="ml-auto text-sm text-accent font-medium">
                      Voir H2H &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">Fiche technique</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Code FIFA</dt>
                  <dd className="font-medium">{team.code}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Confederation</dt>
                  <dd className="font-medium">{team.confederation}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Classement FIFA</dt>
                  <dd className="font-medium">#{team.fifaRanking}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Groupe</dt>
                  <dd className="font-medium">{team.group}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Participations CDM</dt>
                  <dd className="font-medium">{team.wcAppearances}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Meilleur resultat</dt>
                  <dd className="font-medium">{team.bestResult}</dd>
                </div>
              </dl>
            </div>

            {/* CTA Betting */}
            <div className="rounded-lg bg-accent/5 border border-accent/20 p-6">
              <h3 className="mb-2 text-lg font-bold text-accent">Cotes {team.name}</h3>
              <p className="mb-4 text-sm text-gray-600">
                Comparez les cotes pour {team.name} a la Coupe du Monde 2026.
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-gray-500">
                  Les cotes seront disponibles prochainement.
                </p>
              </div>
            </div>

            {/* Related Teams */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">Equipes du groupe {team.group}</h3>
              <ul className="space-y-2">
                {groupTeams.map((t) => (
                  <li key={t.id}>
                    <Link
                      href={`/equipe/${t.slug}`}
                      className="flex items-center gap-2 text-sm hover:text-accent"
                    >
                      <span>{t.flag}</span>
                      <span>{t.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsTeam",
            name: team.name,
            sport: "Football",
            memberOf: {
              "@type": "SportsOrganization",
              name: "FIFA World Cup 2026",
            },
          }),
        }}
      />
    </>
  );
}
