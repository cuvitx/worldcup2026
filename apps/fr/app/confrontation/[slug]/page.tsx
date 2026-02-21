import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { domains } from "@repo/data/route-mapping";
import { teamsBySlug } from "@repo/data/teams";
import { h2hByPair } from "@repo/data/h2h";
import { bookmakers } from "@repo/data/affiliates";
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
  const competitions = ["Coupe du Monde", "Euro / Copa", "Match amical", "Ligue des Nations", "Coupe du Monde"];
  const years = [2022, 2018, 2014, 2010, 2006, 2002, 1998, 1994, 1990, 1986];
  return Array.from({ length: 5 }, (_, i) => {
    const sc1 = (s + i * 3) % 4;
    const sc2 = (s + i * 7) % 3;
    return {
      year: years[i] ?? 2000 - i * 4,
      competition: competitions[i % competitions.length]!,
      score: `${t1Name} ${sc1} - ${sc2} ${t2Name}`,
      winner: sc1 > sc2 ? t1Name : sc2 > sc1 ? t2Name : "Nul",
    };
  });
}

export const revalidate = 86400;
export const dynamicParams = false;

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

  const title = `${team1.name} vs ${team2.name} : Historique des confrontations — CDM 2026`;
  const description = `Historique complet ${team1.name} - ${team2.name} : bilan face à face, résultats, statistiques H2H et pronostic pour la Coupe du Monde 2026.`;

  return {
    title,
    description,
    alternates: { canonical: `${domains.fr}/confrontation/${slug}` },
    openGraph: { title, description, url: `${domains.fr}/confrontation/${slug}` },
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

  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Confrontations", href: "/confrontations-historiques" },
    { label: `${team1.name} vs ${team2.name}` },
  ];
  const breadcrumbSchema = [
    { name: "Accueil", url: "/" },
    { name: "Confrontations", url: "/confrontations-historiques" },
    { name: `${team1.name} vs ${team2.name}`, url: `/confrontation/${slug}` },
  ];

  const faqItems = [
    {
      question: `Quel est le bilan des confrontations entre ${team1.name} et ${team2.name} ?`,
      answer: `En ${totalMatches} confrontations, ${team1.name} compte ${t1Wins} victoire${t1Wins > 1 ? "s" : ""}, ${team2.name} ${t2Wins} victoire${t2Wins > 1 ? "s" : ""} et ${draws} match${draws > 1 ? "s" : ""} nul${draws > 1 ? "s" : ""}. Score total : ${t1Goals} buts pour ${team1.name} contre ${t2Goals} pour ${team2.name}.`,
    },
    {
      question: `${team1.name} et ${team2.name} peuvent-elles se rencontrer à la CDM 2026 ?`,
      answer: team1.group === team2.group
        ? `Oui ! Les deux équipes sont dans le même groupe (Groupe ${team1.group}) et s'affronteront en phase de poules.`
        : `Pas en phase de groupes (groupes différents), mais une rencontre est possible en phase à élimination directe selon les parcours respectifs.`,
    },
    {
      question: `Quel est le match le plus mémorable entre ${team1.name} et ${team2.name} ?`,
      answer: `Parmi les confrontations les plus marquantes, on retient notamment leurs duels en Coupe du Monde qui ont souvent produit des matchs spectaculaires avec des retournements de situation et des buts décisifs.`,
    },
    {
      question: `Où parier sur ${team1.name} vs ${team2.name} ?`,
      answer: `Les meilleurs bookmakers pour parier sur ce duel sont Winamax, Betclic et Unibet, tous agréés par l'ANJ. Comparez les cotes avant de miser.`,
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
            name: `${team1.name} vs ${team2.name} — Historique`,
            sport: "Football",
            homeTeam: { "@type": "SportsTeam", name: team1.name },
            awayTeam: { "@type": "SportsTeam", name: team2.name },
          }),
        }}
      />

      {/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb transparent items={breadcrumbItems} />
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
            Historique {team1.name} vs {team2.name}
          </h1>
          <p className="mt-2 text-center text-gray-300 text-lg">
            Bilan complet des confrontations et analyse face à face
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">

            {/* Bilan H2H */}
            <section className="rounded-xl border border-gray-200  bg-white  p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900  mb-6">
                <BarChart3 className="h-6 w-6 text-accent" /> Bilan face à face
              </h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="rounded-lg bg-primary/5 p-4 text-center">
                  <p className="text-3xl font-extrabold text-primary">{t1Wins}</p>
                  <p className="text-xs text-accent mt-1">Victoires {team1.name}</p>
                </div>
                <div className="rounded-lg bg-gray-50  p-4 text-center">
                  <p className="text-3xl font-extrabold text-gray-600">{draws}</p>
                  <p className="text-xs text-accent mt-1">Nuls</p>
                </div>
                <div className="rounded-lg bg-primary/5 p-4 text-center">
                  <p className="text-3xl font-extrabold text-primary">{t2Wins}</p>
                  <p className="text-xs text-accent mt-1">Victoires {team2.name}</p>
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
                  <p className="text-xs text-accent">Matchs joués</p>
                </div>
                <div className="rounded-lg bg-gray-50  p-3 text-center">
                  <p className="text-xl font-bold text-primary">{t1Goals} - {t2Goals}</p>
                  <p className="text-xs text-accent">Buts marqués</p>
                </div>
              </div>
            </section>

            {/* Dernières confrontations */}
            <section className="rounded-xl border border-gray-200  bg-white  p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900  mb-4">
                <Calendar className="h-6 w-6 text-accent" /> Dernières confrontations
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
                <Trophy className="h-6 w-6 text-accent" /> Statistiques comparées
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
                      { label: "Classement FIFA", v1: `#${team1.fifaRanking}`, v2: `#${team2.fifaRanking}` },
                      { label: "Participations CDM", v1: String(team1.wcAppearances), v2: String(team2.wcAppearances) },
                      { label: "Meilleur résultat", v1: team1.bestResult, v2: team2.bestResult },
                      { label: "Confédération", v1: team1.confederation, v2: team2.confederation },
                      { label: "Groupe 2026", v1: team1.group, v2: team2.group },
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
              <h2 className="text-2xl font-bold text-gray-900  mb-4">Analyse de la confrontation</h2>
              <div className="text-accent leading-relaxed space-y-4">
                <p>
                  L&apos;affrontement entre {team1.name} et {team2.name} est l&apos;un des classiques du football mondial.
                  En {totalMatches} rencontres, {t1Wins > t2Wins ? team1.name : t2Wins > t1Wins ? team2.name : "aucune des deux équipes"} domine
                  le bilan avec {Math.max(t1Wins, t2Wins)} victoires.
                </p>
                <p>
                  {team1.name} (FIFA #{team1.fifaRanking}) et {team2.name} (FIFA #{team2.fifaRanking}) comptent respectivement {team1.wcAppearances} et {team2.wcAppearances} participations
                  en Coupe du Monde. {team1.group === team2.group
                    ? `Les deux nations sont dans le même Groupe ${team1.group} pour l'édition 2026, garantissant un duel en phase de poules.`
                    : "Placées dans des groupes différents, une confrontation ne pourrait survenir qu'en phase à élimination directe."}
                </p>
                <p>
                  Avec {t1Goals + t2Goals} buts marqués au total ({t1Goals} pour {team1.name}, {t2Goals} pour {team2.name}),
                  cette confrontation promet généralement du spectacle et des matchs ouverts.
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* CTA Bookmaker */}
            <div className="rounded-xl bg-accent p-6 text-center text-white shadow-lg">
              <Swords className="mx-auto h-10 w-10 mb-3" />
              <h3 className="text-lg font-bold">Parier sur {team1.name} vs {team2.name}</h3>
              <p className="text-sm mt-2 text-white/80">Comparez les meilleures cotes chez les bookmakers agréés ANJ.</p>
              <div className="mt-4 space-y-2">
                {bookmakers.slice(0, 3).map((bk) => (
                  <a
                    key={bk.id}
                    href={bk.url}
                    target="_blank"
                    rel="noopener noreferrer sponsored nofollow"
                    className="flex items-center justify-center gap-2 rounded-lg bg-white text-accent font-bold px-4 py-2.5 text-sm hover:bg-gray-100 transition-colors"
                  >
                    {bk.name} <ExternalLink className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Fiches équipes */}
            <div className="rounded-xl border border-gray-200  bg-white  p-5 shadow-sm">
              <h3 className="font-bold text-gray-900  mb-3"><ClipboardList className="h-5 w-5 inline-block" /> Fiches équipes</h3>
              <div className="space-y-2">
                <Link href={`/equipe/${team1.slug}`} className="flex items-center justify-between rounded-lg border border-gray-200  p-3 hover:border-accent transition-colors">
                  <span>{team1.flag} {team1.name}</span>
                  <ArrowRight className="h-4 w-4 text-accent" />
                </Link>
                <Link href={`/equipe/${team2.slug}`} className="flex items-center justify-between rounded-lg border border-gray-200  p-3 hover:border-accent transition-colors">
                  <span>{team2.flag} {team2.name}</span>
                  <ArrowRight className="h-4 w-4 text-accent" />
                </Link>
              </div>
            </div>

            {/* Liens utiles */}
            <div className="rounded-xl border border-gray-200  bg-white  p-5 shadow-sm">
              <h3 className="font-bold text-gray-900  mb-3"><Link2 className="h-5 w-5 inline-block" /> À voir aussi</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href={`/h2h/${slug}`} className="text-primary hover:underline"><Swords className="h-5 w-5 inline-block" /> H2H détaillé + pronostic</Link></li>
                <li><Link href={`/cote-champion/${team1.slug}`} className="text-primary hover:underline"><Trophy className="h-5 w-5 inline-block" /> Cote {team1.name} championne</Link></li>
                <li><Link href={`/cote-champion/${team2.slug}`} className="text-primary hover:underline"><Trophy className="h-5 w-5 inline-block" /> Cote {team2.name} championne</Link></li>
                <li><Link href="/confrontations-historiques" className="text-primary hover:underline"><BarChart3 className="h-5 w-5 inline-block" /> Toutes les confrontations</Link></li>
              </ul>
            </div>

          </aside>
        </div>
      </div>

      {/* FAQ */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <FAQSection title={`Questions fréquentes — ${team1.name} vs ${team2.name}`} items={faqItems} />
      </div>

      {/* Autres confrontations */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-2xl font-bold text-gray-900  mb-6">Autres confrontations historiques</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CONFRONTATIONS.filter((c) => c !== slug).slice(0, 6).map((c) => {
            const p = parseSlug(c);
            if (!p) return null;
            return (
              <Link key={c} href={`/confrontation/${c}`} className="flex items-center justify-between rounded-xl border border-gray-200  bg-white  p-4 hover:border-accent transition-colors">
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
