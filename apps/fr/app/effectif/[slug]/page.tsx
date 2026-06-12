import { FAQSection } from "@repo/ui/faq-section";
import { domains } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { teams, teamsBySlug, teamsById } from "@repo/data/teams";
import { playersByTeamId } from "@repo/data/players";
import { matches } from "@repo/data/matches";
import { bookmakers } from "@repo/data/affiliates";
import { ClipboardList, ExternalLink, ShieldAlert, Star, UserX, Users } from "lucide-react";
import { BookmakerCTA } from "../../components/BookmakerCTA";
import { BetOfTheDay } from "../../components/BetOfTheDay";
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
  // Next match for this team
  const teamMatches = matches
    .filter((m) => m.homeTeamId === team.id || m.awayTeamId === team.id)
    .sort((a, b) => a.date.localeCompare(b.date));
  const today = new Date().toISOString().slice(0, 10);
  const nextMatch = teamMatches.find((m) => m.date >= today);
const faqItems = [
    {
      question: `Combien de joueurs ${team.name} peut-elle emmener à la CDM 2026 ?`,
      answer: "Chaque sélection peut convoquer 26 joueurs pour la Coupe du Monde 2026, dont 3 gardiens obligatoires.",
    },
    {
      question: `Quand a été annoncée la liste définitive de ${team.name} ?`,
      answer: `La liste définitive des 26 joueurs de ${team.name} a été annoncée par le sélectionneur en mai 2026, avant le début du tournoi le 11 juin 2026.`,
    },
    {
      question: `Qui sont les joueurs stars de ${team.name} ?`,
      answer: stars.length > 0
        ? `Les joueurs les plus expérimentés de ${team.name} sont : ${stars.map((s) => `${s.name} (${s.caps} sél.)`).join(", ")}.`
        : `La liste des joueurs de ${team.name} est celle retenue pour la Coupe du Monde 2026.`,
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
        <div className="rounded-lg bg-accent/10 border border-accent/30 p-4 mb-8">
          <p className="text-sm text-gray-700 font-medium">
            <ClipboardList className="h-5 w-5 inline-block" /> <strong>Liste officielle</strong> — les 26 joueurs sélectionnés pour la Coupe du Monde 2026.
          </p>
        </div>
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            {/* Stars */}
            {stars.length > 0 && (
              <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
                <h2 className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                  <Star className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                  Joueurs stars
                </h2>
                <div className="grid gap-3 sm:grid-cols-3">
                  {stars.map((player) => (
                    <Link
                      key={player.id}
                      href={`/joueur/${player.slug}`}
                      className="rounded-lg border-2 border-accent/30 bg-accent/5 p-4 hover:border-accent transition-colors text-center"
                    >
                      <p className="text-lg font-bold text-gray-900">{player.name}</p>
                      <p className="text-sm text-accent font-semibold">{positionLabels[player.position] ?? player.position}</p>
                      <p className="text-sm text-gray-500 mt-1">{player.club}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {player.caps} sél. · {player.goals} buts · {player.age} ans
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
            {/* CTA Banner */}
            <BookmakerCTA variant="banner" />
            {/* Players by position */}
            {sortedPositions.map((pos) => {
              const posPlayers = grouped[pos]!.sort((a, b) => (a.number ?? 99) - (b.number ?? 99));
              const sectionIcons: Record<string, typeof Users> = { GK: ShieldAlert, DF: Users, MF: Users, FW: Users };
              const Icon = sectionIcons[pos] ?? Users;
              return (
                <section key={pos} className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
                  <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-4">
                    <Icon className="h-5 w-5 text-accent" />
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
                              className={`border-b border-gray-100 ${isStar ? "bg-accent/5" : ""}`}
                            >
                              <td className="py-3 pr-4 text-gray-500">{positionLabels[player.position] ?? player.position}</td>
                              <td className="py-3 pr-4">
                                <Link href={`/joueur/${player.slug}`} className="font-medium text-primary hover:underline">
                                  {player.name}
                                  {isStar && <span className="ml-1 text-accent"><Star className="h-5 w-5 inline-block" /></span>}
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
              <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm text-center">
                <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  La liste des joueurs de {team.name} n'est pas encore disponible.
                </p>
              </section>
            )}
            {/* Prochain match */}
            {nextMatch && (() => {
              const home = teamsById[nextMatch.homeTeamId];
              const away = teamsById[nextMatch.awayTeamId];
              return (
                <section className="rounded-xl bg-primary/5 border border-primary/20 p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                    Prochain match {team.name}
                  </h2>
                  <Link
                    href={`/pronostic-match/${nextMatch.slug}`}
                    className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between rounded-lg bg-white p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <span className="text-xl sm:text-2xl shrink-0">{home?.flag}</span>
                      <span className="font-bold text-gray-900 text-sm sm:text-base truncate">{home?.name} vs {away?.name}</span>
                      <span className="text-xl sm:text-2xl shrink-0">{away?.flag}</span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500 shrink-0">
                      {new Date(nextMatch.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}
                    </span>
                  </Link>
                  <div className="mt-4">
                    <BookmakerCTA variant="inline" />
                  </div>
                </section>
              );
            })()}
            {/* Absents notables */}
            <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-lg sm:text-xl font-bold text-gray-900 mb-4">
                <UserX className="h-5 w-5 text-red-500" />
                Absents notables / Blessés
              </h2>
              <p className="text-sm text-gray-500 italic">
                Cette section est mise à jour au fil du tournoi, en fonction des blessures et remplacements officiels.
              </p>
              <div className="mt-4 rounded-lg bg-gray-50/30 p-4">
                <p className="text-sm text-gray-400">Aucun absent notable confirmé pour le moment.</p>
              </div>
            </section>
          </div>
          {/* Sidebar */}
          <aside className="space-y-4 sm:space-y-6">
            <div className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
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
            <BetOfTheDay compact />
            <div className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">Parier sur {team.name}</h3>
              <div className="space-y-3">
                {bookmakers.slice(0, 3).map((bk) => (
                  <a
                    key={bk.id}
                    href={bk.url}
                    target="_blank"
                    rel="noopener noreferrer sponsored nofollow"
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-3 hover:border-primary/40 hover:shadow-sm transition-all"
                  >
                    <div>
                      <p className="text-sm font-bold text-gray-900">{bk.name}</p>
                      <p className="text-xs text-accent font-semibold">{bk.bonus}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </a>
                ))}
              </div>
              <p className="mt-3 text-[10px] text-gray-400 text-center">18+ | Pariez responsablement</p>
            </div>
            <div className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">Liens utiles</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href={`/equipe/${team.slug}`} className="text-primary hover:underline">
                    Fiche complète {team.name}
                  </Link>
                </li>
                <li>
                  <Link href={`/parier/${team.slug}`} className="text-primary hover:underline">
                    Parier sur {team.name}
                  </Link>
                </li>
                <li>
                  <Link href={`/cote-champion/${team.slug}`} className="text-primary hover:underline">
                    Cote {team.name} championne
                  </Link>
                </li>
                <li>
                  <Link href={`/pronostic/${team.slug}`} className="text-primary hover:underline">
                    Pronostic {team.name}
                  </Link>
                </li>
                <li>
                  <Link href={`/groupe/${team.group.toLowerCase()}`} className="text-primary hover:underline">
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