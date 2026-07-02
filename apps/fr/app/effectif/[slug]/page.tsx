import { FAQSection } from "@repo/ui/faq-section";
import { domains } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { teams, teamsBySlug, teamsById } from "@repo/data/teams";
import { playersByTeamId } from "@repo/data/players";
import { matches } from "@repo/data/matches";
import { affiliateLinkAttributes, bookmakers, featuredBookmaker, pmuTrackingUrl } from "@repo/data/affiliates";
import { CalendarDays, ClipboardList, ExternalLink, ShieldAlert, Star, Trophy, UserX, Users } from "lucide-react";
import { PmuCTA } from "../../components/PmuCTA";
import { BetOfTheDay } from "../../components/BetOfTheDay";
export const revalidate = 3600;
export const dynamicParams = true;
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
    title: `Joueurs ${team.name} Coupe du Monde 2026 : effectif et composition`,
    description: `Joueurs de l'équipe ${team.name} pour la Coupe du Monde 2026 : effectif, liste des joueurs, clubs, postes, composition probable, groupe ${team.group} et parcours.`,
    openGraph: {
      title: `${team.flag} Joueurs ${team.name} Coupe du Monde 2026`,
      description: `Effectif, liste des joueurs, composition et groupe de ${team.name} pour la CDM 2026.`,
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
  const positionCounts = sortedPositions
    .map((pos) => `${grouped[pos]!.length} ${positionLabels[pos]?.toLowerCase() ?? pos}`)
    .join(", ");
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
                Joueurs {team.name} Coupe du Monde 2026 : effectif et composition
              </h1>
              <p className="mt-2 text-lg text-gray-300">
                Groupe {team.group} · FIFA #{team.fifaRanking} · {allPlayers.length} joueurs répertoriés
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-300">
                Liste des joueurs de l'équipe {team.name}, postes, clubs,
                cadres de la selection, composition probable et liens vers le
                groupe, les matchs et les cotes du Mondial 2026.
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
        <section className="mb-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-primary">
                Effectif et composition
              </p>
              <h2 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                Liste des joueurs de l'équipe {team.name}
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                L'effectif de {team.name} pour la Coupe du Monde 2026 regroupe
                {allPlayers.length > 0 ? ` ${allPlayers.length} joueurs répertoriés (${positionCounts}).` : " les joueurs répertoriés dès confirmation officielle."}
                Cette page permet de lire rapidement la composition de la selection,
                les joueurs stars, le prochain match et les pages utiles pour
                suivre le parcours dans le groupe {team.group}.
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              <Link
                href={`/joueurs/equipe/${team.slug}`}
                className="rounded-lg border border-gray-200 p-3 text-sm font-semibold text-gray-900 transition-colors hover:border-primary/40 hover:bg-primary/5"
              >
                Tous les joueurs {team.name}
              </Link>
              <Link
                href={`/groupe/${team.group.toLowerCase()}`}
                className="rounded-lg border border-gray-200 p-3 text-sm font-semibold text-gray-900 transition-colors hover:border-primary/40 hover:bg-primary/5"
              >
                Groupe {team.group} et classement
              </Link>
              <Link
                href={`/equipe/${team.slug}`}
                className="rounded-lg border border-gray-200 p-3 text-sm font-semibold text-gray-900 transition-colors hover:border-primary/40 hover:bg-primary/5"
              >
                Calendrier de {team.name}
              </Link>
            </div>
          </div>
        </section>
        <section className="mb-8 grid gap-3 sm:grid-cols-3">
          <Link
            href={`/cote-champion/${team.slug}`}
            className="rounded-xl border border-accent/30 bg-accent/5 p-4 transition-all hover:border-accent hover:shadow-md"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-accent">Cote vainqueur</p>
            <p className="mt-1 text-sm font-bold text-gray-900">{team.name} championne du monde</p>
            <p className="mt-1 text-xs text-gray-500">Analyse value bet et chances de titre</p>
          </Link>
          <Link
            href={`/pronostic/${team.slug}`}
            className="rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-primary/30 hover:shadow-md"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-primary">Pronostic équipe</p>
            <p className="mt-1 text-sm font-bold text-gray-900">Parcours probable de {team.name}</p>
            <p className="mt-1 text-xs text-gray-500">Groupe, qualification et phases finales</p>
          </Link>
          <Link
            href={`/parier/${team.slug}`}
            className="rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-primary/30 hover:shadow-md"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-primary">Guide pari</p>
            <p className="mt-1 text-sm font-bold text-gray-900">Comment parier sur {team.name}</p>
            <p className="mt-1 text-xs text-gray-500">Marchés utiles et pièges à éviter</p>
          </Link>
        </section>
        <section className="mb-8 grid gap-3 sm:grid-cols-3">
          <Link
            href="/joueurs"
            className="rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-primary/30 hover:shadow-md"
          >
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
              <Users className="h-4 w-4" />
              Tous les joueurs
            </p>
            <p className="mt-1 text-sm font-bold text-gray-900">Joueurs Coupe du Monde 2026</p>
            <p className="mt-1 text-xs text-gray-500">Comparer les effectifs des 48 selections</p>
          </Link>
          <Link
            href="/pronostic/vainqueur"
            className="rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-primary/30 hover:shadow-md"
          >
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
              <Trophy className="h-4 w-4" />
              Vainqueur
            </p>
            <p className="mt-1 text-sm font-bold text-gray-900">Favoris Coupe du Monde</p>
            <p className="mt-1 text-xs text-gray-500">Situer {team.name} dans la course au titre</p>
          </Link>
          <Link
            href="/match/calendrier"
            className="rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-primary/30 hover:shadow-md"
          >
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
              <CalendarDays className="h-4 w-4" />
              Calendrier
            </p>
            <p className="mt-1 text-sm font-bold text-gray-900">Tous les matchs CDM 2026</p>
            <p className="mt-1 text-xs text-gray-500">Dates, horaires et adversaires à venir</p>
          </Link>
        </section>
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
            <PmuCTA tracking={{ pageType: "effectif", slug: team.slug, placement: "players-cta" }} />
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
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="py-3 pr-3 font-semibold text-gray-700">Nom</th>
                          <th className="py-3 pr-3 font-semibold text-gray-700">Club</th>
                          <th className="py-3 pr-3 font-semibold text-gray-700">Âge</th>
                          <th className="py-3 font-semibold text-gray-700">Sél.</th>
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
                              <td className="py-3 pr-3">
                                <Link href={`/joueur/${player.slug}`} className="font-medium text-primary hover:underline">
                                  {player.name}
                                  {isStar && <span className="ml-1 text-accent"><Star className="h-5 w-5 inline-block" /></span>}
                                </Link>
                              </td>
                              <td className="py-3 pr-3 text-gray-600">{player.club}</td>
                              <td className="py-3 pr-3 text-gray-600 tabular-nums">{player.age}</td>
                              <td className="py-3 text-gray-600 tabular-nums">{player.caps}</td>
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
                  La liste des joueurs de {team.name} n&apos;est pas encore disponible.
                </p>
              </section>
            )}
            {/* CTA Affilié multi-bookmakers */}
            <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Parier sur {team.name}
              </h2>
              <p className="mb-5 text-sm text-gray-600">
                Comparez les meilleurs sites de paris sportifs agréés en France pour parier sur {team.name} à la Coupe du Monde 2026.
              </p>
              <div className="space-y-4">
                {bookmakers.map((bk) => {
                  const isFeatured = bk.id === featuredBookmaker.id;
                  const tracking = { pageType: "effectif", slug: team.slug, placement: `bookmaker-${bk.slug}` };
                  return (
                    <div
                      key={bk.id}
                      className={`relative flex flex-col sm:flex-row items-center gap-4 rounded-xl border-2 p-4 transition-shadow hover:shadow-md ${
                        isFeatured ? "border-accent bg-accent/5" : "border-gray-200 bg-white"
                      }`}
                    >
                      {isFeatured && (
                        <span className="absolute -top-3 left-4 rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-black">
                          Recommandé
                        </span>
                      )}
                      <div className="flex-1 text-center sm:text-left">
                        <p className="text-lg font-bold">{bk.name}</p>
                        <p className="text-sm text-gray-500">{"★".repeat(bk.rating)}{"☆".repeat(5 - bk.rating)}</p>
                      </div>
                      <div className="flex-1 text-center">
                        <p className="text-lg font-extrabold text-field">{bk.bonus}</p>
                        <p className="text-xs text-gray-500">{bk.bonusDetail}</p>
                      </div>
                      <div className="shrink-0">
                        <a
                          href={pmuTrackingUrl(tracking)}
                          target="_blank"
                          rel="noopener noreferrer sponsored nofollow"
                          {...affiliateLinkAttributes(tracking)}
                          className={`inline-block rounded-lg px-6 py-3 text-sm font-bold text-white transition-colors ${
                            isFeatured ? "bg-accent hover:bg-accent/80" : "bg-primary hover:bg-primary/90"
                          }`}
                        >
                          Parier sur {team.name}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-4 text-center text-[10px] leading-snug text-gray-400">
                Les jeux d&apos;argent et de hasard sont interdits aux mineurs. Jouer comporte des risques : endettement, dépendance...{" "}
                <a href="tel:0974751313" className="underline hover:text-gray-500">
                  Appelez le 09 74 75 13 13
                </a>{" "}
                (appel non surtaxé).
              </p>
            </section>
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
                    <PmuCTA tracking={{ pageType: "effectif", slug: team.slug, placement: "next-match" }} />
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
                {bookmakers.slice(0, 3).map((bk) => {
                  const tracking = { pageType: "effectif", slug: team.slug, placement: `sidebar-${bk.slug}` };
                  return (
                    <a
                      key={bk.id}
                      href={pmuTrackingUrl(tracking)}
                      target="_blank"
                      rel="noopener noreferrer sponsored nofollow"
                      {...affiliateLinkAttributes(tracking)}
                      className="flex items-center justify-between rounded-lg border border-gray-200 p-3 hover:border-primary/40 hover:shadow-sm transition-all"
                    >
                      <div>
                        <p className="text-sm font-bold text-gray-900">{bk.name}</p>
                        <p className="text-xs text-accent font-semibold">{bk.bonus}</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </a>
                  );
                })}
              </div>
              <p className="mt-3 text-[10px] text-gray-400 text-center leading-snug">
                18+ | Jouer comporte des risques.{" "}
                <a href="tel:0974751313" className="underline hover:text-gray-500">09 74 75 13 13</a>
              </p>
            </div>
            <div className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">Liens utiles</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href={`/joueurs/equipe/${team.slug}`} className="text-primary hover:underline">
                    Joueurs {team.name}
                  </Link>
                </li>
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
