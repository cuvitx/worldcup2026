import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { domains } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { teams, teamsBySlug } from "@repo/data/teams";
import { playersByTeamId } from "@repo/data/players";
import { ClipboardList, ShieldAlert, Star, UserX, Users } from "lucide-react";

export const revalidate = 3600;
export const dynamicParams = false;

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
    title: `Effectif ${team.name} — Liste des 26 joueurs CDM 2026`,
    description: `Effectif complet de ${team.name} pour la Coupe du Monde 2026 : liste des 26 joueurs, postes, clubs et sélections par poste.`,
    openGraph: {
      title: `${team.flag} Effectif ${team.name} — CDM 2026`,
      description: `Liste des 26 joueurs de ${team.name} pour la Coupe du Monde 2026.`,
      url: `${domains.fr}/effectif/${team.slug}`,
      },
    alternates: { canonical: `https://www.cdm2026.fr/effectif/${team.slug}` },
  };
}

const positionLabels: Record<string, string> = {
  GK: "Gardien",
  DF: "Défenseur",
  MF: "Milieu",
  FW: "Attaquant",
};

const positionOrder: Record<string, number> = { GK: 0, DF: 1, MF: 2, FW: 3 };

export default async function EffectifPage({ params }: PageProps) {
  const { slug } = await params;
  const team = teamsBySlug[slug];
  if (!team) notFound();

  const allPlayers = playersByTeamId[team.id] ?? [];

  // Group by position
  const grouped: Record<string, typeof allPlayers> = {};
  for (const p of allPlayers) {
    const pos = p.position;
    if (!grouped[pos]) grouped[pos] = [];
    grouped[pos].push(p);
  }

  // Sort positions: GK, DF, MF, FW
  const sortedPositions = Object.keys(grouped).sort(
    (a, b) => (positionOrder[a] ?? 9) - (positionOrder[b] ?? 9)
  );

  // Stars: top 3 by caps
  const stars = [...allPlayers].sort((a, b) => b.caps - a.caps).slice(0, 3);

  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Équipes", href: "/equipes" },
    { label: team.name, href: `/equipe/${team.slug}` },
    { label: "Effectif" },
  ];

  const faqItems = [
    {
      question: `Combien de joueurs ${team.name} peut-elle emmener à la CDM 2026 ?`,
      answer: "Chaque sélection peut convoquer 26 joueurs pour la Coupe du Monde 2026, dont 3 gardiens obligatoires.",
    },
    {
      question: `Quand sera annoncée la liste définitive de ${team.name} ?`,
      answer: `La liste définitive des 26 joueurs de ${team.name} sera annoncée par le sélectionneur en mai 2026, quelques semaines avant le début du tournoi (11 juin 2026).`,
    },
    {
      question: `Qui sont les joueurs stars de ${team.name} ?`,
      answer: stars.length > 0
        ? `Les joueurs les plus expérimentés de ${team.name} sont : ${stars.map((s) => `${s.name} (${s.caps} sél.)`).join(", ")}.`
        : `La liste des joueurs de ${team.name} sera complétée à l'approche du tournoi.`,
    },
    {
      question: `Un joueur blessé peut-il être remplacé ?`,
      answer: "Oui, la FIFA autorise le remplacement de joueurs blessés jusqu'à 24h avant le premier match de l'équipe, sous réserve de validation médicale.",
    },
  ];

  return (
    <>
{/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb transparent items={breadcrumbItems} />
          <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="text-5xl sm:text-7xl" role="img" aria-label={`Drapeau de ${team.name}`}>
              {team.flag}
            </span>
            <div>
              <h1 className="text-2xl font-extrabold sm:text-4xl">
                Effectif {team.name} — Liste des 26 joueurs CDM 2026
              </h1>
              <p className="mt-2 text-lg text-gray-300">
                Groupe {team.group} · FIFA #{team.fifaRanking} · {allPlayers.length} joueurs répertoriés
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Disclaimer */}
        <div className="rounded-lg bg-secondary/10 border border-secondary/30 p-4 mb-8">
          <p className="text-sm text-gray-700 font-medium">
            <ClipboardList className="h-5 w-5 inline-block" /> <strong>Liste provisoire</strong> — sera confirmée par le sélectionneur en mai 2026. Les joueurs listés ci-dessous sont les plus probables selon les dernières convocations.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            {/* Stars */}
            {stars.length > 0 && (
              <section className="rounded-xl bg-white p-6 shadow-sm">
                <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-4">
                  <Star className="h-6 w-6 text-secondary" />
                  Joueurs stars
                </h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  {stars.map((player) => (
                    <Link
                      key={player.id}
                      href={`/joueur/${player.slug}`}
                      className="rounded-lg border-2 border-secondary/30 bg-secondary/5 p-4 hover:border-secondary transition-colors text-center"
                    >
                      <p className="text-lg font-bold text-gray-900">{player.name}</p>
                      <p className="text-sm text-secondary font-semibold">{positionLabels[player.position] ?? player.position}</p>
                      <p className="text-sm text-gray-500 mt-1">{player.club}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {player.caps} sél. · {player.goals} buts · {player.age} ans
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Players by position */}
            {sortedPositions.map((pos) => {
              const posPlayers = grouped[pos]!.sort((a, b) => (a.number ?? 99) - (b.number ?? 99));
              const sectionIcons: Record<string, typeof Users> = { GK: ShieldAlert, DF: Users, MF: Users, FW: Users };
              const Icon = sectionIcons[pos] ?? Users;

              return (
                <section key={pos} className="rounded-xl bg-white p-6 shadow-sm">
                  <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-4">
                    <Icon className="h-5 w-5 text-secondary" />
                    {positionLabels[pos] ?? pos}s ({posPlayers.length})
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="py-3 pr-4 font-semibold text-gray-700">Poste</th>
                          <th className="py-3 pr-4 font-semibold text-gray-700">Nom</th>
                          <th className="py-3 pr-4 font-semibold text-gray-700">Club</th>
                          <th className="py-3 pr-4 font-semibold text-gray-700">Âge</th>
                          <th className="py-3 font-semibold text-gray-700">Sélections</th>
                        </tr>
                      </thead>
                      <tbody>
                        {posPlayers.map((player) => {
                          const isStar = stars.some((s) => s.id === player.id);
                          return (
                            <tr
                              key={player.id}
                              className={`border-b border-gray-100 ${isStar ? "bg-secondary/5" : ""}`}
                            >
                              <td className="py-3 pr-4 text-gray-500">{positionLabels[player.position] ?? player.position}</td>
                              <td className="py-3 pr-4">
                                <Link href={`/joueur/${player.slug}`} className="font-medium text-accent hover:underline">
                                  {player.name}
                                  {isStar && <span className="ml-1 text-secondary"><Star className="h-5 w-5 inline-block" /></span>}
                                </Link>
                              </td>
                              <td className="py-3 pr-4 text-gray-600">{player.club}</td>
                              <td className="py-3 pr-4 text-gray-600">{player.age} ans</td>
                              <td className="py-3 text-gray-600">{player.caps}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </section>
              );
            })}

            {allPlayers.length === 0 && (
              <section className="rounded-xl bg-white p-6 shadow-sm text-center">
                <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  La liste des joueurs de {team.name} sera disponible prochainement.
                </p>
              </section>
            )}

            {/* Absents notables */}
            <section className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-4">
                <UserX className="h-5 w-5 text-red-500" />
                Absents notables / Blessés
              </h2>
              <p className="text-sm text-gray-500 italic">
                Cette section sera mise à jour à l&apos;approche du tournoi, lorsque les listes définitives seront connues et que les blessures pré-tournoi seront confirmées.
              </p>
              <div className="mt-4 rounded-lg bg-gray-50/30 p-4">
                <p className="text-sm text-gray-400">Aucun absent notable confirmé pour le moment.</p>
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">Résumé effectif</h3>
              <div className="space-y-2 text-sm">
                {sortedPositions.map((pos) => (
                  <div key={pos} className="flex justify-between">
                    <span className="text-gray-500">{positionLabels[pos] ?? pos}s</span>
                    <span className="font-bold text-gray-900">{grouped[pos]!.length}</span>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-2 flex justify-between">
                  <span className="text-gray-700 font-semibold">Total</span>
                  <span className="font-bold text-primary">{allPlayers.length}</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">Liens utiles</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href={`/equipe/${team.slug}`} className="text-accent hover:underline">
                    Fiche complète {team.name}
                  </Link>
                </li>
                <li>
                  <Link href={`/parier/${team.slug}`} className="text-accent hover:underline">
                    Parier sur {team.name}
                  </Link>
                </li>
                <li>
                  <Link href={`/cote-champion/${team.slug}`} className="text-accent hover:underline">
                    Cote {team.name} championne
                  </Link>
                </li>
                <li>
                  <Link href={`/pronostic/${team.slug}`} className="text-accent hover:underline">
                    Pronostic {team.name}
                  </Link>
                </li>
                <li>
                  <Link href={`/groupe/${team.group.toLowerCase()}`} className="text-accent hover:underline">
                    Groupe {team.group}
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>

        {/* FAQ — full width, centered */}
        <FAQSection items={faqItems} title={`Questions fréquentes — Effectif ${team.name}`} />
      </div>
    </>
  );
}
