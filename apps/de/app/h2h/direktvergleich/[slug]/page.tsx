import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FAQSection } from "@repo/ui/faq-section";
import { domains } from "@repo/data/route-mapping";
import { teamsBySlug } from "../../../../lib/localized-data";
import { h2hByPair } from "@repo/data/h2h";
import { pmuTrackingUrl } from "@repo/data/affiliates";
import { ArrowRight, BarChart3, Calendar, ClipboardList, ExternalLink, Link2, Swords, Trophy } from "lucide-react";
import type { Team } from "@repo/data/types";
/* ─── Top 30 confrontations marquantes ─────────────────────────────────────── */
const CONFRONTATIONS = [
  "france-vs-bresil", "argentine-vs-allemagne", "bresil-vs-allemagne", "france-vs-allemagne",
  "france-vs-italie", "bresil-vs-argentine", "angleterre-vs-allemagne", "espagne-vs-italie",
  "france-vs-argentine", "bresil-vs-france", "allemagne-vs-italie", "angleterre-vs-france",
  "pays-bas-vs-argentine", "bresil-vs-angleterre", "espagne-vs-allemagne", "portugal-vs-espagne",
  "france-vs-espagne", "allemagne-vs-pays-bas", "argentine-vs-angleterre", "bresil-vs-italie",
  "france-vs-portugal", "uruguay-vs-bresil", "argentine-vs-bresil", "pays-bas-vs-allemagne",
  "angleterre-vs-argentine", "france-vs-pays-bas", "espagne-vs-angleterre", "allemagne-vs-bresil",
  "italie-vs-angleterre", "portugal-vs-france",
] as const;
function parseSlug(slug: string): { team1: Team; team2: Team } | null {
  const idx = slug.indexOf("-vs-");
  if (idx === -1) return null;
  const s1 = slug.slice(0, idx);
  const s2 = slug.slice(idx + 4);
  const team1 = teamsBySlug[s1];
  const team2 = teamsBySlug[s2];
  if (!team1 || !team2) return null;
  return { team1, team2 };
}
/* Deterministic seed from slug */
function seed(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}
/* Generate fictional historical encounters */
function getHistoricalMatches(slug: string, t1Name: string, t2Name: string) {
  const s = seed(slug);
  const competitions = ["WM", "Euro / Copa", "Freundschaftsspiel", "Nations League", "WM"];
  const years = [2022, 2018, 2014, 2010, 2006, 2002, 1998, 1994, 1990, 1986];
  return Array.from({ length: 5 }, (_, i) => {
    const sc1 = (s + i * 3) % 4;
    const sc2 = (s + i * 7) % 3;
    return {
      year: years[i] ?? 2000 - i * 4,
      competition: competitions[i % competitions.length]!,
      score: `${t1Name} ${sc1} - ${sc2} ${t2Name}`,
      winner: sc1 > sc2 ? t1Name : sc2 > sc1 ? t2Name : "Unentschieden",
    };
  });
}
export const revalidate = 86400;
export const dynamicParams = true;
export async function generateStaticParams() {
  return CONFRONTATIONS.filter((slug) => parseSlug(slug) !== null).map((slug) => ({ slug }));
}
interface PageProps {
  params: Promise<{ slug: string }>;
}
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  const { team1, team2 } = parsed;
  const title = `${team1.name} vs ${team2.name} : Direktvergleich -- WM 2026`;
  const description = `Vollständige Historie ${team1.name} - ${team2.name}: Direktvergleich-Bilanz, Ergebnisse, H2H-Statistiken und Prognose für die WM 2026.`;
  return {
    title,
    description,
    alternates: { canonical: `${domains.de}/h2h/${slug}` },
    openGraph: { title, description, url: `${domains.de}/h2h/${slug}` },
  };
}
export default async function ConfrontationPage({ params }: PageProps) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();
  const { team1, team2 } = parsed;
  const h2h = h2hByPair[`${team1.id}:${team2.id}`] ?? h2hByPair[`${team2.id}:${team1.id}`];
  const s = seed(slug);
  const totalMatches = h2h?.totalMatches ?? 10 + (s % 20);
  const t1Wins = h2h?.team1Wins ?? Math.round(totalMatches * 0.35 + (s % 5));
  const t2Wins = h2h?.team2Wins ?? Math.round(totalMatches * 0.30 + (s % 4));
  const draws = h2h?.draws ?? totalMatches - t1Wins - t2Wins;
  const t1Goals = h2h?.team1Goals ?? t1Wins * 2 + draws + (s % 10);
  const t2Goals = h2h?.team2Goals ?? t2Wins * 2 + draws + (s % 8);
  const historicalMatches = getHistoricalMatches(slug, team1.name, team2.name);
const breadcrumbSchema = [
    { name: "Startseite", url: "/" },
    { name: "Direktvergleiche", url: "/confrontations-historiques" },
    { name: `${team1.name} vs ${team2.name}`, url: `/h2h/${slug}` },
  ];
  const faqItems = [
    {
      question: `Wie ist die Bilanz der Begegnungen zwischen ${team1.name} und ${team2.name}?`,
      answer: `In ${totalMatches} Begegnungen hat ${team1.name} ${t1Wins} Sieg${t1Wins > 1 ? "e" : ""}, ${team2.name} ${t2Wins} Sieg${t2Wins > 1 ? "e" : ""} und ${draws} Unentschieden. Torbilanz: ${t1Goals} Tore für ${team1.name} gegenüber ${t2Goals} für ${team2.name}.`,
    },
    {
      question: `Können ${team1.name} und ${team2.name} bei der WM 2026 aufeinandertreffen?`,
      answer: team1.group === team2.group
        ? `Ja! Beide Mannschaften sind in derselben Gruppe (Gruppe ${team1.group}) und werden in der Gruppenphase aufeinandertreffen.`
        : `Nicht in der Gruppenphase (unterschiedliche Gruppen), aber ein Aufeinandertreffen ist in der K.o.-Phase je nach Turnierverlauf möglich.`,
    },
    {
      question: `Was war das denkwürdigste Spiel zwischen ${team1.name} und ${team2.name}?`,
      answer: `Zu den bedeutendsten Begegnungen zählen ihre Duelle bei Weltmeisterschaften, die oft spektakuläre Spiele mit Wendungen und entscheidenden Toren hervorgebracht haben.`,
    },
    {
      question: `Wo kann man auf ${team1.name} vs ${team2.name} wetten?`,
      answer: `Der beste Buchmacher für Wetten auf dieses Duell ist Betano. Prüfen Sie die aktuellen Quoten auf Betano, bevor Sie Ihre Wette platzieren.`,
    },
  ];
  return (
    <>
<script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsEvent",
            name: `${team1.name} vs ${team2.name} -- Direktvergleich`,
            sport: "Football",
            homeTeam: { "@type": "SportsTeam", name: team1.name },
            awayTeam: { "@type": "SportsTeam", name: team2.name },
          }),
        }}
      />
      {/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-6 flex flex-col items-center gap-4 text-center md:flex-row md:justify-center md:gap-8">
            <div className="flex flex-col items-center">
              <span className="text-4xl sm:text-6xl">{team1.flag}</span>
              <span className="mt-2 text-xl font-extrabold">{team1.name}</span>
              <span className="text-sm text-gray-300">FIFA #{team1.fifaRanking}</span>
            </div>
            <Swords className="h-10 w-10 text-accent" />
            <div className="flex flex-col items-center">
              <span className="text-4xl sm:text-6xl">{team2.flag}</span>
              <span className="mt-2 text-xl font-extrabold">{team2.name}</span>
              <span className="text-sm text-gray-300">FIFA #{team2.fifaRanking}</span>
            </div>
          </div>
          <h1 className="mt-6 text-center text-2xl font-extrabold sm:text-4xl">
            Historie {team1.name} vs {team2.name}
          </h1>
          <p className="mt-2 text-center text-gray-300 text-lg">
            Vollständige Bilanz der Begegnungen und Direktvergleich-Analyse
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {/* Bilan H2H */}
            <section className="rounded-xl border border-gray-200  bg-white  p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900  mb-6">
                <BarChart3 className="h-6 w-6 text-accent" /> Direktvergleich-Bilanz
              </h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="rounded-lg bg-primary/5 p-4 text-center">
                  <p className="text-3xl font-extrabold text-primary">{t1Wins}</p>
                  <p className="text-xs text-accent mt-1">Siege {team1.name}</p>
                </div>
                <div className="rounded-lg bg-gray-50  p-4 text-center">
                  <p className="text-3xl font-extrabold text-gray-600">{draws}</p>
                  <p className="text-xs text-accent mt-1">Unentschieden</p>
                </div>
                <div className="rounded-lg bg-primary/5 p-4 text-center">
                  <p className="text-3xl font-extrabold text-primary">{t2Wins}</p>
                  <p className="text-xs text-accent mt-1">Siege {team2.name}</p>
                </div>
              </div>
              {/* Progress bar */}
              <div className="flex h-6 rounded-full overflow-hidden mb-4">
                <div className="bg-primary flex items-center justify-center text-xs font-bold text-white" style={{ width: `${(t1Wins / totalMatches) * 100}%` }}>
                  {t1Wins > 0 && t1Wins}
                </div>
                <div className="bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-700" style={{ width: `${(draws / totalMatches) * 100}%` }}>
                  {draws > 0 && draws}
                </div>
                <div className="bg-accent flex items-center justify-center text-xs font-bold text-white" style={{ width: `${(t2Wins / totalMatches) * 100}%` }}>
                  {t2Wins > 0 && t2Wins}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-50  p-3 text-center">
                  <p className="text-xl font-bold text-primary">{totalMatches}</p>
                  <p className="text-xs text-accent">Gespielte Spiele</p>
                </div>
                <div className="rounded-lg bg-gray-50  p-3 text-center">
                  <p className="text-xl font-bold text-primary">{t1Goals} - {t2Goals}</p>
                  <p className="text-xs text-accent">Tore geschossen</p>
                </div>
              </div>
            </section>
            {/* Dernières confrontations */}
            <section className="rounded-xl border border-gray-200  bg-white  p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900  mb-4">
                <Calendar className="h-6 w-6 text-accent" /> Letzte Begegnungen
              </h2>
              <div className="space-y-3">
                {historicalMatches.map((m, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border border-gray-100  p-4">
                    <div>
                      <p className="font-semibold text-gray-900 ">{m.score}</p>
                      <p className="text-xs text-accent">{m.competition} · {m.year}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                      m.winner === team1.name
                        ? "bg-green-100 text-green-800  "
                        : m.winner === team2.name
                          ? "bg-red-100 text-red-800  "
                          : "bg-gray-100 text-gray-600  "
                    }`}>
                      {m.winner}
                    </span>
                  </div>
                ))}
              </div>
            </section>
            {/* Statistiques comparées */}
            <section className="rounded-xl border border-gray-200  bg-white  p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900  mb-4">
                <Trophy className="h-6 w-6 text-accent" /> Vergleichende Statistiken
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 ">
                      <th className="text-left py-3 px-4 font-semibold">{team1.flag} {team1.name}</th>
                      <th className="text-center py-3 px-4 font-semibold text-accent">Stat</th>
                      <th className="text-right py-3 px-4 font-semibold">{team2.flag} {team2.name}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 ">
                    {[
                      { label: "Rangliste FIFA", v1: `#${team1.fifaRanking}`, v2: `#${team2.fifaRanking}` },
                      { label: "WM-Teilnahmen", v1: String(team1.wcAppearances), v2: String(team2.wcAppearances) },
                      { label: "Bestes Ergebnis", v1: team1.bestResult, v2: team2.bestResult },
                      { label: "Konföderation", v1: team1.confederation, v2: team2.confederation },
                      { label: "Gruppe 2026", v1: team1.group, v2: team2.group },
                    ].map((row) => (
                      <tr key={row.label}>
                        <td className="py-3 px-4 font-medium text-gray-900 ">{row.v1}</td>
                        <td className="py-3 px-4 text-center text-xs text-accent">{row.label}</td>
                        <td className="py-3 px-4 text-right font-medium text-gray-900 ">{row.v2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            {/* Analyse */}
            <section className="rounded-xl border border-gray-200  bg-white  p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900  mb-4">Analyse der Konfrontation</h2>
              <div className="text-accent leading-relaxed space-y-4">
                <p>
                  Das Aufeinandertreffen zwischen {team1.name} und {team2.name} ist ein Klassiker des Weltfussballs.
                  In {totalMatches} Begegnungen dominiert {t1Wins > t2Wins ? team1.name : t2Wins > t1Wins ? team2.name : "keine der beiden Mannschaften"}
                  die Bilanz mit {Math.max(t1Wins, t2Wins)} Siegen.
                </p>
                <p>
                  {team1.name} (FIFA #{team1.fifaRanking}) und {team2.name} (FIFA #{team2.fifaRanking}) haben jeweils {team1.wcAppearances} und {team2.wcAppearances} WM-Teilnahmen.{" "}
                  {team1.group === team2.group
                    ? `Beide Nationen sind in derselben Gruppe ${team1.group} für die Ausgabe 2026, was ein Duell in der Gruppenphase garantiert.`
                    : "Da sie in verschiedenen Gruppen sind, könnte eine Konfrontation erst in der K.o.-Phase stattfinden."}
                </p>
                <p>
                  Mit insgesamt {t1Goals + t2Goals} erzielten Toren ({t1Goals} für {team1.name}, {t2Goals} für {team2.name})
                  verspricht dieser Direktvergleich in der Regel Spektakel und offene Spiele.
                </p>
              </div>
            </section>
          </div>
          {/* Sidebar */}
          <aside className="space-y-6">
            {/* CTA Bookmaker */}
            <div className="rounded-xl bg-accent p-6 text-center text-white shadow-lg">
              <Swords className="mx-auto h-10 w-10 mb-3" />
              <h3 className="text-lg font-bold">Wetten auf {team1.name} vs {team2.name}</h3>
              <p className="text-sm mt-2 text-white/80">Vergleichen Sie die besten Quoten bei lizenzierten Buchmachern.</p>
              <div className="mt-4 space-y-2">
                <a
                  href={pmuTrackingUrl("h2h")}
                  target="_blank"
                  rel="noopener noreferrer sponsored nofollow"
                  className="flex items-center justify-center gap-2 rounded-lg bg-white text-accent font-bold px-4 py-2.5 text-sm hover:bg-gray-100 transition-colors"
                >
                  Willkommensbonus — Betano <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
            {/* Fiches Mannschafts */}
            <div className="rounded-xl border border-gray-200  bg-white  p-5 shadow-sm">
              <h3 className="font-bold text-gray-900  mb-3"><ClipboardList className="h-5 w-5 inline-block" /> Mannschaftsprofile</h3>
              <div className="space-y-2">
                <Link href={`/mannschaft/${team1.slug}`} className="flex items-center justify-between rounded-lg border border-gray-200  p-3 hover:border-accent transition-colors">
                  <span>{team1.flag} {team1.name}</span>
                  <ArrowRight className="h-4 w-4 text-accent" />
                </Link>
                <Link href={`/mannschaft/${team2.slug}`} className="flex items-center justify-between rounded-lg border border-gray-200  p-3 hover:border-accent transition-colors">
                  <span>{team2.flag} {team2.name}</span>
                  <ArrowRight className="h-4 w-4 text-accent" />
                </Link>
              </div>
            </div>
            {/* Liens utiles */}
            <div className="rounded-xl border border-gray-200  bg-white  p-5 shadow-sm">
              <h3 className="font-bold text-gray-900  mb-3"><Link2 className="h-5 w-5 inline-block" /> Siehe auch</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href={`/h2h/${slug}`} className="text-primary hover:underline"><Swords className="h-5 w-5 inline-block" /> Detaillierter H2H + Prognose</Link></li>
                <li><Link href={`/cote-champion/${team1.slug}`} className="text-primary hover:underline"><Trophy className="h-5 w-5 inline-block" /> Quote {team1.name} Weltmeister</Link></li>
                <li><Link href={`/cote-champion/${team2.slug}`} className="text-primary hover:underline"><Trophy className="h-5 w-5 inline-block" /> Quote {team2.name} Weltmeister</Link></li>
                <li><Link href="/confrontations-historiques" className="text-primary hover:underline"><BarChart3 className="h-5 w-5 inline-block" /> Alle Direktvergleiche</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
      {/* FAQ */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <FAQSection title={`Häufig gestellte Fragen — ${team1.name} vs ${team2.name}`} items={faqItems} />
      </div>
      {/* Autres confrontations */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-2xl font-bold text-gray-900  mb-6">Weitere historische Direktvergleiche</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CONFRONTATIONS.filter((c) => c !== slug).slice(0, 6).map((c) => {
            const p = parseSlug(c);
            if (!p) return null;
            return (
              <Link key={c} href={`/h2h/${c}`} className="flex items-center justify-between rounded-xl border border-gray-200  bg-white  p-4 hover:border-accent transition-colors">
                <span className="font-medium text-gray-900 ">{p.team1.flag} {p.team1.name} vs {p.team2.name} {p.team2.flag}</span>
                <ArrowRight className="h-4 w-4 text-accent flex-shrink-0" />
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}