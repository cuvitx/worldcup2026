import { getStaticAlternates } from "@repo/data/route-mapping";
import { FAQSection } from "@repo/ui/faq-section";
import type { Metadata } from "next";
import Link from "next/link";
import { scorerOdds, topScorerRanking, scorersByTeam } from "@repo/data/scorers";
import { players, playersById } from "../../lib/localized-data";
import { teams, teamsById } from "../../lib/localized-data";
import { pmuTrackingUrl } from "@repo/data/affiliates";
import { topScorerCandidates } from "@repo/data/predictions-2026";
import { DISPLAY_LIMITS } from "@repo/data/constants";
import { RelatedContent } from "../components/RelatedContent";
// ─── Top 20 beste Torschützen der WM-Geschichte ───────────────
const historicalScorers = [
  { rank: 1,  name: "Miroslav Klose",    country: "🇩🇪", countryName: "Deutschland",   goals: 16, editions: "2002, 2006, 2010, 2014" },
  { rank: 2,  name: "Ronaldo (R9)",      country: "🇧🇷", countryName: "Brasilien",      goals: 15, editions: "1994, 1998, 2002, 2006" },
  { rank: 3,  name: "Gerd Müller",       country: "🇩🇪", countryName: "Deutschland",   goals: 14, editions: "1970, 1974" },
  { rank: 4,  name: "Just Fontaine",     country: "🇫🇷", countryName: "Frankreich",      goals: 13, editions: "1958" },
  { rank: 4,  name: "Lionel Messi",      country: "🇦🇷", countryName: "Argentinien",   goals: 13, editions: "2006, 2010, 2014, 2018, 2022" },
  { rank: 6,  name: "Pelé",              country: "🇧🇷", countryName: "Brasilien",      goals: 12, editions: "1958, 1962, 1966, 1970" },
  { rank: 7,  name: "Kylian Mbappé",     country: "🇫🇷", countryName: "Frankreich",      goals: 12, editions: "2018, 2022" },
  { rank: 8,  name: "Sándor Kocsis",     country: "🇭🇺", countryName: "Ungarn",     goals: 11, editions: "1954" },
  { rank: 8,  name: "Jürgen Klinsmann",  country: "🇩🇪", countryName: "Deutschland",   goals: 11, editions: "1990, 1994, 1998" },
  { rank: 10, name: "Gabriel Batistuta", country: "🇦🇷", countryName: "Argentinien",   goals: 10, editions: "1994, 1998, 2002" },
  { rank: 10, name: "Gary Lineker",      country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", countryName: "England", goals: 10, editions: "1986, 1990" },
  { rank: 10, name: "Teófilo Cubillas",  country: "🇵🇪", countryName: "Peru",       goals: 10, editions: "1970, 1978" },
  { rank: 10, name: "Grzegorz Lato",     country: "🇵🇱", countryName: "Polen",     goals: 10, editions: "1974, 1978, 1982" },
  { rank: 10, name: "Thomas Müller",     country: "🇩🇪", countryName: "Deutschland",   goals: 10, editions: "2010, 2014, 2018" },
  { rank: 10, name: "Ronaldo (CR7)",     country: "🇵🇹", countryName: "Portugal",    goals: 8,  editions: "2006, 2010, 2014, 2018, 2022" },
  { rank: 16, name: "Helmut Rahn",       country: "🇩🇪", countryName: "Deutschland",   goals: 10, editions: "1954, 1958" },
  { rank: 17, name: "Eusébio",           country: "🇵🇹", countryName: "Portugal",    goals: 9,  editions: "1966" },
  { rank: 17, name: "David Villa",       country: "🇪🇸", countryName: "Spanien",     goals: 9,  editions: "2006, 2010" },
  { rank: 19, name: "Uwe Seeler",        country: "🇩🇪", countryName: "Deutschland",   goals: 9,  editions: "1958, 1962, 1966, 1970" },
  { rank: 20, name: "Neymar",            country: "🇧🇷", countryName: "Brasilien",      goals: 8,  editions: "2014, 2018, 2022" },
] as const;

export const metadata: Metadata = {
  title: "Torschützen WM 2026 | Top 20 historisch (Klose 16, Messi 13, Mbappé 12) + Quoten 2026",
  description:
    "Beste Torschützen der WM: Klose 16, Ronaldo 15, Müller 14. Historische Rangliste 1930-2022 und Quoten Goldener Schuh WM 2026.",
  alternates: getStaticAlternates("scorers", "de"),
  openGraph: {
    title: "Top 20 historische Torschützen WM + Quoten 2026",
    description:
      "Klose 16 Tore, Ronaldo R9 15, Müller 14, Fontaine 13, Messi 13, Mbappé 12... Die vollständige Rangliste + Torschützen-Quoten für 2026.",
  },
};

export default function TorschützenPage() {
  const top30 = topScorerRanking.slice(0, 30);

  const faqItems = [
    {
      question: "Wer ist der Torschützenkönig in der Geschichte der WM?",
      answer: "Miroslav Klose (Deutschland) hält den Rekord mit 16 WM-Toren, verteilt auf 4 Turniere (2002, 2006, 2010, 2014). Er liegt vor Ronaldo Nazário (Brasilien, 15 Tore) und Gerd Müller (Deutschland, 14 Tore). Klose wurde 2014 Weltmeister und war stets bemerkenswert konstant bei großen Turnieren."
    },
    {
      question: "Wer gewinnt den Goldenen Schuh der WM 2026?",
      answer: "Die großen Favoriten für den Goldenen Schuh 2026 sind Kylian Mbappé (Frankreich, bereits 12 WM-Tore), Erling Haaland (Norwegen), Harry Kane (England) und Lautaro Martínez (Argentinien). Mbappé hat die besten Quoten bei Betano (~6.50) dank seines jungen Alters, seines hervorragenden Tore/Spiel-Verhältnisses und der Qualität der französischen Nationalmannschaft. Mit 27 Jahren im Jahr 2026 wird er auf dem Höhepunkt seiner Form sein."
    },
    {
      question: "Was ist der Torrekord bei einer einzelnen WM?",
      answer: "Just Fontaine (Frankreich) hält den absoluten Rekord mit 13 Toren bei der WM 1958 in Schweden, in nur 6 Spielen. Dieser Rekord ist auch 66 Jahre später noch ungebrochen. Fontaine hatte von einer Verletzung von René Bliard profitiert, um Stammspieler zu werden, und verließ die Startelf nie mehr. Eine Leistung, die im modernen, defensiveren Fußball wohl nicht mehr zu wiederholen ist."
    },
    {
      question: "Wie werden die erwarteten Tore für die WM 2026 berechnet?",
      answer: "Die erwarteten Tore (Expected Goals) werden über ein statistisches Modell berechnet, das die ELO-Rangliste der Mannschaft, das Tore/Länderspiele-Verhältnis des Spielers, die erwartete Anzahl an Spielen basierend auf Qualifikationswahrscheinlichkeiten und die aktuelle Form kombiniert. Zum Beispiel wird ein Stürmer einer favorisierten Mannschaft mit einem guten Verhältnis in der Nationalmannschaft eine höhere Anzahl erwarteter Tore haben, da seine Mannschaft voraussichtlich weit im Turnier kommen wird."
    },
    {
      question: "Kann Mbappé Kloses Rekord brechen?",
      answer: "Ja, es ist mathematisch möglich. Kylian Mbappé hat mit 25 Jahren bereits 12 WM-Tore erzielt (8 in 2022, 4 in 2018). Wenn er 2026 fünf oder mehr Tore erzielt, wird er Klose einholen oder übertreffen. Mit einer erwarteten sportlichen Laufbahn bis 2030 (nächste WM) könnte er sogar 20+ Karriere-Tore anstreben, wenn er an der Spitze bleibt. Seine Schnelligkeit, seine Effizienz und die Qualität der französischen Nationalmannschaft machen ihn zu einem glaubwürdigen Kandidaten."
    },
    {
      question: "Wo kann man auf die Torschützen der WM 2026 wetten?",
      answer: "Der beste Wettanbieter für Torschützen-Wetten ist Betano (großzügiger Bonus). Die verfügbaren Märkte umfassen den Goldenen Schuh (Torschützenkönig des Turniers), Torschütze eines Spiels (Anytime Scorer), erster Torschütze und Anzahl der Tore eines Spielers. 18+, bitte verantwortungsvoll spielen."
    }
  ];

  return (
    <>
<section className="hero-animated text-white py-12 sm:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">Torschützen-Quoten WM 2026</h1>
          <p className="mt-2 text-gray-300">
            {scorerOdds.length} Stürmer und offensive Mittelfeldspieler analysiert. Torschützen-Quoten, erwartete Tore und Wahrscheinlichkeiten für jeden Spieler.
          </p>
        </div>
      </section>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">

        {/* ── TOP 20 BESTE TORSCHÜTZEN DER GESCHICHTE ── */}
        <section className="rounded-xl bg-white shadow-sm overflow-hidden">
          <div className="px-6 pt-6 pb-5 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block shrink-0"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/></svg>
              <h2 className="text-2xl font-bold text-gray-900">
                Top 20 beste Torschützen der WM-Geschichte
              </h2>
            </div>
            <p className="text-sm text-gray-500">
              Historische Rangliste aller Turniere (1930-2022) -- Rekord: Klose mit 16 Toren
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            {historicalScorers.map((scorer, idx) => {
              const maxGoals = 16; // Klose
              const barPct = Math.round((scorer.goals / maxGoals) * 100);
              const medal = idx === 0 ? "" : idx === 1 ? "" : idx === 2 ? "" : null;
              const barColor =
                idx === 0 ? "bg-gradient-to-r from-accent to-accent/70" :
                idx === 1 ? "bg-gradient-to-r from-slate-400 to-gray-300" :
                idx === 2 ? "bg-gradient-to-r from-accent/80 to-accent/60" :
                "bg-gradient-to-r from-blue-500 to-blue-400";

              return (
                <div
                  key={`${scorer.name}-${idx}`}
                  className={`px-4 py-3 sm:px-6 ${idx === 0 ? "bg-accent/5" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    {/* Rang */}
                    <div className="shrink-0 w-8 text-center">
                      {medal ? (
                        <span className="text-xl">{medal}</span>
                      ) : (
                        <span className="text-sm font-bold text-gray-500">{scorer.rank}</span>
                      )}
                    </div>

                    {/* Flagge + Name + Turniere */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-lg shrink-0" role="img" aria-label={scorer.countryName}>
                          {scorer.country}
                        </span>
                        <span className="font-semibold text-gray-900 text-sm sm:text-base break-words">
                          {scorer.name}
                        </span>
                        <span className="hidden sm:inline text-xs text-gray-500">
                          {scorer.editions}
                        </span>
                      </div>
                      {/* Visueller Balken */}
                      <div className="mt-1.5 flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${barColor}`}
                            style={{ width: `${barPct}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Anzahl Tore */}
                    <div className="shrink-0 text-right">
                      <span className={`text-xl font-extrabold ${idx === 0 ? "text-accent" : idx < 3 ? "text-gray-600" : "text-accent"}`}>
                        {scorer.goals}
                      </span>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wide">Tore</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="px-6 py-3 bg-gray-50/80 border-t border-gray-100">
            <p className="text-[11px] text-gray-400">
              Quellen: FIFA. Statistiken bis zur WM 2022. Mbappé (12 Tore) ist aktiv und kann Klose 2026 übertreffen
            </p>
          </div>
        </section>

        {/* ── TOP 5 KANDIDATEN (Prognosen-2026) ── */}
        <section className="rounded-xl bg-white shadow-sm overflow-hidden">
          <div className="px-6 pt-6 pb-5 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl"></span>
              <h2 className="text-2xl font-bold text-gray-900">
                Top 5 Kandidaten für den Goldenen Schuh
              </h2>
            </div>
            <p className="text-sm text-gray-500">
              Betano-Quoten · Erwartete Tore (ELO-Modell) · Feb. 2026
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            {topScorerCandidates.map((candidate, idx) => {
              const team = teamsById[candidate.teamId];
              const medal = idx === 0 ? "" : idx === 1 ? "" : idx === 2 ? "" : `${idx + 1}.`;
              const podiumBg =
                idx === 0 ? "bg-gradient-to-r from-secondary/5 to-accent/5" :
                idx === 1 ? "bg-gradient-to-r from-gray-50 to-slate-50/50" :
                idx === 2 ? "bg-gradient-to-r from-accent/5 to-accent/5" :
                "bg-white";
              const impliedPct = Math.round(candidate.impliedProbability * 100 * 10) / 10;
              const bestBookmakerOdds = candidate.avgOdds;

              return (
                <div key={candidate.playerId} className={`p-6 ${podiumBg}`}>
                  <div className="flex flex-wrap items-start gap-4">
                    {/* Medal + rank */}
                    <div className="shrink-0 text-3xl w-10 text-center">{medal}</div>

                    {/* Player info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {candidate.name}
                        </h3>
                        {team && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-xl">{team.flag}</span>
                            <Link href={`/mannschaft/${team.slug}`} className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors">
                              {team.name}
                            </Link>
                          </div>
                        )}
                        <span className="inline-block rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-xs font-bold text-primary">
                          {impliedPct}% Chancen
                        </span>
                      </div>

                      {/* Torstatistiken */}
                      <div className="flex flex-wrap gap-4 mb-3">
                        <div className="text-center">
                          <p className="text-2xl font-extrabold text-primary">{candidate.expectedGoals}</p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-wide">Erwartete Tore</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-extrabold text-accent">{candidate.internationalGoals}</p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-wide">Tore Länderspiele</p>
                        </div>
                        {/* Bar */}
                        <div className="flex-1 flex flex-col justify-center min-w-[100px]">
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-accent rounded-full"
                              style={{ width: `${Math.min(impliedPct * 6, 100)}%` }}
                            />
                          </div>
                          <p className="text-[10px] text-gray-500 mt-1">Implizite Wahrscheinlichkeit</p>
                        </div>
                      </div>

                      {/* Strengths */}
                      <ul className="space-y-0.5">
                        {candidate.strengths.map((s, si) => (
                          <li key={si} className="flex items-start gap-1.5 text-xs text-gray-600">
                            <svg className="w-4 h-4 shrink-0 mt-0.5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bookmaker odds column */}
                    <div className="shrink-0 flex flex-col gap-2 min-w-[130px]">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold mb-1">
                        Quote Torschützenkönig
                      </p>
                      <div className="flex items-center justify-between rounded-lg px-3 py-2 border bg-accent/10 border-accent/30">
                        <span className="text-xs font-semibold text-primary">Betano</span>
                        <span className="text-sm font-bold text-accent">
                          {candidate.avgOdds.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="px-6 py-3 bg-gray-50/80 border-t border-gray-100">
            <p className="text-[11px] text-gray-400">
              Erwartete Tore: ELO-Modell x Tore/Länderspiele-Verhältnis x erwartete Spiele.
              Quelle: Betano. Juni 2026. 18+.
            </p>
          </div>
        </section>

        {/* Top Scorer Ranking */}
        <section className="rounded-xl bg-white p-4 sm:p-6 sm:p-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Favoriten für den Goldenen Schuh</h2>
          <p className="mb-6 text-sm text-gray-600">
            Die 30 Spieler mit den besten Chancen, Torschützenkönig der WM 2026 zu werden.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="pb-3 font-medium text-gray-500">#</th>
                  <th className="pb-3 font-medium text-gray-500">Spieler</th>
                  <th className="pb-3 font-medium text-gray-500">Mannschaft</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">Erwartete Tore</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">Quote Torschütze</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">Quote Torschützenkönig</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {top30.map((so, i) => {
                  const player = playersById[so.playerId];
                  const team = player ? teamsById[player.teamId] : undefined;
                  return (
                    <tr key={so.playerId} className="hover:bg-gray-50 border-b border-gray-100 transition-colors">
                      <td className="py-3 text-gray-500 font-medium">{i + 1}</td>
                      <td className="py-3">
                        {player && (
                          <Link href={`/torschuetze/${player.slug}`} className="font-medium hover:text-primary">
                            {player.name}
                          </Link>
                        )}
                      </td>
                      <td className="py-3">
                        {team && (
                          <Link href={`/mannschaft/${team.slug}`} className="flex items-center gap-1 hover:text-primary">
                            <span role="img" aria-label={`Flagge von ${team.name}`}>{team.flag}</span>
                            <span className="text-gray-600">{team.name}</span>
                          </Link>
                        )}
                      </td>
                      <td className="py-3 text-right font-bold text-primary">{so.expectedGoals}</td>
                      <td className="py-3 text-right font-medium text-field">{so.anytimeScorerOdds}</td>
                      <td className="py-3 text-right font-bold text-accent">{so.topScorerOdds}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* All scorers by expected goals */}
        <section className="rounded-xl bg-white p-4 sm:p-6 sm:p-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Alle potenziellen Torschützen</h2>
          <p className="mb-6 text-sm text-gray-600">
            Alle Stürmer und offensive Mittelfeldspieler mit ihren geschätzten Torschützen-Quoten.
          </p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {scorerOdds.slice(0, 90).map((so) => {
              const player = playersById[so.playerId];
              const team = player ? teamsById[player.teamId] : undefined;
              if (!player) return null;
              return (
                <Link
                  key={so.playerId}
                  href={`/torschuetze/${player.slug}`}
                  className="flex items-center justify-between rounded-lg border border-gray-200 p-3 transition-colors hover:border-primary/30 hover:bg-primary/5"
                >
                  <div>
                    <p className="font-semibold">{player.name}</p>
                    <p className="text-xs text-gray-500">
                      <span role="img" aria-label={`Flagge von ${team?.name ?? "Unbekannt"}`}>{team?.flag}</span> {team?.name} &middot; {player.position}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">{so.expectedGoals} erw. Tore</p>
                    <p className="text-xs text-gray-500">Quote {so.anytimeScorerOdds}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* By Team */}
        <section className="rounded-xl bg-white p-4 sm:p-6 sm:p-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Torschützen nach Mannschaft</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {teams
              .sort((a, b) => a.fifaRanking - b.fifaRanking)
              .map((team) => {
                const teamScorers = scorersByTeam[team.id];
                if (!teamScorers || teamScorers.length === 0) return null;
                return (
                  <div key={team.id} className="rounded-xl border border-gray-200 p-4">
                    <Link href={`/mannschaft/${team.slug}`} className="flex items-center gap-2 mb-3 hover:text-primary">
                      <span className="text-xl" role="img" aria-label={`Flagge von ${team.name}`}>{team.flag}</span>
                      <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
                    </Link>
                    <ul className="space-y-1">
                      {teamScorers.slice(0, DISPLAY_LIMITS.TEAM_SCORERS_PREVIEW).map((so) => {
                        const player = playersById[so.playerId];
                        if (!player) return null;
                        return (
                          <li key={so.playerId}>
                            <Link
                              href={`/torschuetze/${player.slug}`}
                              className="flex items-center justify-between text-sm hover:text-primary"
                            >
                              <span>{player.name}</span>
                              <span className="font-medium text-primary">{so.expectedGoals} Tore</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg bg-primary/5 border border-primary/20 p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Wetten auf die Torschützen WM 2026</h2>
          <p className="mb-4 text-sm text-gray-600">
            Vergleichen Sie die Torschützen-Quoten bei den besten lizenzierten Sportwetten-Anbietern.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={pmuTrackingUrl("Torschützen")}
              target="_blank"
              rel="noopener noreferrer sponsored nofollow"
              className="inline-block rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-white hover:bg-accent/80 transition-colors"
            >
              Willkommensbonus bei Betano
            </a>
          </div>
          <p className="mt-4 text-xs text-gray-500">
            18+. Glücksspiel birgt Risiken. Bitte spielen Sie verantwortungsvoll.
          </p>
        </section>

        <RelatedContent
          items={[
            { href: '/prognose/sieger', emoji: '', title: 'Prognose Sieger WM 2026', description: 'Wer holt die Trophäe?' },
            { href: '/gruppen', emoji: '', title: 'Alle Gruppen', description: 'Die 12 Gruppen und Ranglisten' },
            { href: '/turnierbaum', emoji: '', title: 'Turnierbaum-Simulator', description: 'Erstellen Sie Ihren kompletten Turnierbaum' },
            { href: '/quotenvergleich', emoji: '', title: 'Quotenvergleich', description: 'Beste Quoten der Wettanbieter' },
          ]}
        />
      </div>

      <FAQSection title="Fragen zu den Torschützen der WM" items={faqItems} />
</>
  );
}
