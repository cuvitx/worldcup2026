import { FAQSection } from "@repo/ui/faq-section";
import { domains } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { teams, teamsBySlug, teamsById, playersByTeamId, matches } from "../../../lib/localized-data";
import { bookmakers, featuredBookmaker } from "@repo/data/affiliates";
import { ClipboardList, ExternalLink, ShieldAlert, Star, UserX, Users } from "lucide-react";
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
    title: `Kader ${team.name} — Liste der 26 Spieler WM 2026`,
    description: `Vollständiger Kader von ${team.name} für die WM 2026: Liste der 26 Spieler, Positionen, Vereine und Aufgebot nach Position.`,
    openGraph: {
      title: `${team.flag} Kader ${team.name} — WM 2026`,
      description: `Liste der 26 Spieler von ${team.name} für die WM 2026.`,
      url: `${domains.de}/kader/${team.slug}`,
      },
    alternates: { canonical: `https://www.wm2026guide.de/kader/${team.slug}` },
  };
}
const positionLabels: Record<string, string> = {
  GK: "Torwart",
  DF: "Verteidiger",
  MF: "Mittelfeldspieler",
  FW: "Stürmer",
};
const positionOrder: Record<string, number> = { GK: 0, DF: 1, MF: 2, FW: 3 };
export default async function KaderPage({ params }: PageProps) {
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
      question: `Wie viele Spieler darf ${team.name} zur WM 2026 mitnehmen?`,
      answer: "Jedes Team darf 26 Spieler für die WM 2026 nominieren, darunter 3 Torhüter.",
    },
    {
      question: `Wann wurde der endgültige Kader von ${team.name} bekanntgegeben?`,
      answer: `Der endgültige Kader mit 26 Spielern von ${team.name} wurde vom Trainer im Mai 2026 bekanntgegeben, vor dem Turnierstart am 11. Juni 2026.`,
    },
    {
      question: `Wer sind die Starspieler von ${team.name}?`,
      answer: stars.length > 0
        ? `Die erfahrensten Spieler von ${team.name} sind: ${stars.map((s) => `${s.name} (${s.caps} Eins.)`).join(", ")}.`
        : `Die Spielerliste von ${team.name} ist der für die WM 2026 nominierte Kader.`,
    },
    {
      question: `Kann ein verletzter Spieler ersetzt werden?`,
      answer: "Ja, die FIFA erlaubt den Ersatz verletzter Spieler bis 24 Stunden vor dem ersten Spiel der Mannschaft, vorbehaltlich einer ärztlichen Bestätigung.",
    },
  ];
  return (
    <>
{/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="text-5xl sm:text-7xl" role="img" aria-label={`Flagge von ${team.name}`}>
              {team.flag}
            </span>
            <div>
              <h1 className="text-2xl font-extrabold sm:text-4xl">
                Kader {team.name} — Liste der 26 Spieler WM 2026
              </h1>
              <p className="mt-2 text-lg text-gray-300">
                Gruppe {team.group} · FIFA #{team.fifaRanking} · {allPlayers.length} Spieler gelistet
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Disclaimer */}
        <div className="rounded-lg bg-accent/10 border border-accent/30 p-4 mb-8">
          <p className="text-sm text-gray-700 font-medium">
            <ClipboardList className="h-5 w-5 inline-block" /> <strong>Offizielle Liste</strong> — die 26 nominierten Spieler für die WM 2026.
          </p>
        </div>
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            {/* Stars */}
            {stars.length > 0 && (
              <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
                <h2 className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                  <Star className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                  Starspieler
                </h2>
                <div className="grid gap-3 sm:grid-cols-3">
                  {stars.map((player) => (
                    <Link
                      key={player.id}
                      href={`/spieler/${player.slug}`}
                      className="rounded-lg border-2 border-accent/30 bg-accent/5 p-4 hover:border-accent transition-colors text-center"
                    >
                      <p className="text-lg font-bold text-gray-900">{player.name}</p>
                      <p className="text-sm text-accent font-semibold">{positionLabels[player.position] ?? player.position}</p>
                      <p className="text-sm text-gray-500 mt-1">{player.club}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {player.caps} Eins. · {player.goals} Tore · {player.age} Jahre
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
            {/* CTA Banner */}
            <PmuCTA tracking="Kader" />
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
                          <th className="py-3 pr-3 font-semibold text-gray-700">Name</th>
                          <th className="py-3 pr-3 font-semibold text-gray-700">Verein</th>
                          <th className="py-3 pr-3 font-semibold text-gray-700">Alter</th>
                          <th className="py-3 font-semibold text-gray-700">Eins.</th>
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
                                <Link href={`/spieler/${player.slug}`} className="font-medium text-primary hover:underline">
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
                  Die Spielerliste von {team.name} ist noch nicht verfügbar.
                </p>
              </section>
            )}
            {/* CTA Affilié multi-bookmakers */}
            <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Wetten auf {team.name}
              </h2>
              <p className="mb-5 text-sm text-gray-600">
                Vergleichen Sie die besten lizenzierten Wettanbieter, um auf {team.name} bei der WM 2026 zu wetten.
              </p>
              <div className="space-y-4">
                {bookmakers.map((bk) => {
                  const isFeatured = bk.id === featuredBookmaker.id;
                  return (
                    <div
                      key={bk.id}
                      className={`relative flex flex-col sm:flex-row items-center gap-4 rounded-xl border-2 p-4 transition-shadow hover:shadow-md ${
                        isFeatured ? "border-accent bg-accent/5" : "border-gray-200 bg-white"
                      }`}
                    >
                      {isFeatured && (
                        <span className="absolute -top-3 left-4 rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-black">
                          Empfohlen
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
                          href={bk.url}
                          target="_blank"
                          rel="noopener noreferrer sponsored nofollow"
                          className={`inline-block rounded-lg px-6 py-3 text-sm font-bold text-white transition-colors ${
                            isFeatured ? "bg-accent hover:bg-accent/80" : "bg-primary hover:bg-primary/90"
                          }`}
                        >
                          Wetten auf {team.name}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-4 text-center text-[10px] leading-snug text-gray-400">
                Glücksspiel ist für Minderjährige verboten. Spielen birgt Risiken: Verschuldung, Abhängigkeit...{" "}
                <a href="tel:08001372700" className="underline hover:text-gray-500">
                  Rufen Sie an: 0800 1 37 27 00
                </a>{" "}
                (kostenlos).
              </p>
            </section>
            {/* Nächstes Spiel */}
            {nextMatch && (() => {
              const home = teamsById[nextMatch.homeTeamId];
              const away = teamsById[nextMatch.awayTeamId];
              return (
                <section className="rounded-xl bg-primary/5 border border-primary/20 p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                    Nächstes Spiel {team.name}
                  </h2>
                  <Link
                    href={`/prognose-spiel/${nextMatch.slug}`}
                    className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between rounded-lg bg-white p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <span className="text-xl sm:text-2xl shrink-0">{home?.flag}</span>
                      <span className="font-bold text-gray-900 text-sm sm:text-base truncate">{home?.name} vs {away?.name}</span>
                      <span className="text-xl sm:text-2xl shrink-0">{away?.flag}</span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500 shrink-0">
                      {new Date(nextMatch.date).toLocaleDateString("de-DE", { day: "numeric", month: "long" })}
                    </span>
                  </Link>
                  <div className="mt-4">
                    <PmuCTA tracking="Kader" />
                  </div>
                </section>
              );
            })()}
            {/* Absents notables */}
            <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-lg sm:text-xl font-bold text-gray-900 mb-4">
                <UserX className="h-5 w-5 text-red-500" />
                Namhafte Ausfälle / Verletzte
              </h2>
              <p className="text-sm text-gray-500 italic">
                Dieser Abschnitt wird im Turnierverlauf aktualisiert, basierend auf offiziellen Verletzungen und Ersatzspielern.
              </p>
              <div className="mt-4 rounded-lg bg-gray-50/30 p-4">
                <p className="text-sm text-gray-400">Derzeit keine bestätigten namhaften Ausfälle.</p>
              </div>
            </section>
          </div>
          {/* Sidebar */}
          <aside className="space-y-4 sm:space-y-6">
            <div className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">Kader-Übersicht</h3>
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
              <h3 className="font-bold text-gray-900 mb-3">Wetten auf {team.name}</h3>
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
              <p className="mt-3 text-[10px] text-gray-400 text-center leading-snug">
                18+ | Spielen birgt Risiken.{" "}
                <a href="tel:08001372700" className="underline hover:text-gray-500">0800 1 37 27 00</a>
              </p>
            </div>
            <div className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">Nützliche Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href={`/mannschaft/${team.slug}`} className="text-primary hover:underline">
                    Vollständiges Profil {team.name}
                  </Link>
                </li>
                <li>
                  <Link href={`/sportwetten/${team.slug}`} className="text-primary hover:underline">
                    Wetten auf {team.name}
                  </Link>
                </li>
                <li>
                  <Link href={`/meister-wetten/${team.slug}`} className="text-primary hover:underline">
                    Quote {team.name} Weltmeister
                  </Link>
                </li>
                <li>
                  <Link href={`/prognose/${team.slug}`} className="text-primary hover:underline">
                    Prognose {team.name}
                  </Link>
                </li>
                <li>
                  <Link href={`/gruppe/${team.group.toLowerCase()}`} className="text-primary hover:underline">
                    Gruppe {team.group}
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
        {/* FAQ — full width, centered */}
        <FAQSection items={faqItems} title={`Häufige Fragen — Kader ${team.name}`} />
      </div>
    </>
  );
}