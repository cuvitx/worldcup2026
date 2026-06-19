import type { Metadata } from "next";
import Link from "next/link";
import { groups } from "@repo/data/groups";
import { teams, teamsById } from "../../lib/localized-data";
import { teamPredictions } from "@repo/data/predictions";
import { estimatedOutrightOdds } from "@repo/data/affiliates";
import { matches } from "@repo/data/matches";
import { FolderOpen } from "lucide-react"
export const metadata: Metadata = {
  title: "Prognosen WM 2026 — Zentrale Übersicht | Sieger, Gruppen & Spiele",
  description:
    "Alle Prognosen WM 2026: Sieger, Gruppen A bis L, Spiel-für-Spiel-Analysen und Quoten. ELO-Modell + 100K Simulationen.",
  alternates: {
    canonical: "https://www.wm2026guide.de/Prognose",
  },
  openGraph: {
    title: "Prognosen WM 2026 — Zentrale Übersicht",
    description:
      "Sieger-Prognose, Gruppen A-L, Topspiele, Quoten und Trends. Alles zur Vorbereitung Ihrer WM-2026-Wetten.",
    url: "https://www.wm2026guide.de/Prognose",
  },
};

// Top 5 par winnerProb
const teamsById2 = Object.fromEntries(teams.map((t) => [t.id, t]));
const top5 = [...teamPredictions]
  .sort((a, b) => b.winnerProb - a.winnerProb)
  .slice(0, 5)
  .map((pred) => ({ pred, team: teamsById2[pred.teamId] }))
  .filter((x) => x.team != null);

// Matchs "chauds" (à définir via une liste ou par winnerProb)
const HOT_SLUGS = [
  "france-vs-maroc",
  "bresil-vs-argentine",
  "espagne-vs-angleterre",
  "allemagne-vs-portugal",
  "france-vs-bresil",
  "angleterre-vs-argentine",
];
const hotMatches = matches
  .filter((m) => HOT_SLUGS.includes(m.slug))
  .slice(0, 6);
const fallbackMatches = matches.slice(0, 6);
const displayMatches = hotMatches.length >= 3 ? hotMatches : fallbackMatches;

// Stats globales
const totalTeams = teams.filter((t) => !t.id.startsWith("barrage")).length;
const totalMatches = matches.length;
const totalGroups = groups.length;

// Tendances / stats
const TRENDS = [
  {
    icon: "",
    title: "Argentinien Favorit",
    desc: "15% Titelwahrscheinlichkeit — amtierender Weltmeister",
    color: "from-blue-600/20 to-blue-800/10",
    border: "border-primary/20",
  },
  {
    icon: "",
    title: "Frankreich — Revanche 2022",
    desc: "Unglücklicher Finalist, 13% Titelchance 2026",
    color: "from-red-600/20 to-blue-800/10",
    border: "border-red-500/20",
  },
  {
    icon: "🇺🇸",
    title: "Heimvorteil USA",
    desc: "+7 geschätzte ELO-Punkte. Die USA peilen das Viertelfinale an",
    color: "from-indigo-600/20 to-red-800/10",
    border: "border-indigo-500/20",
  },
  {
    icon: "",
    title: "Marokko — Geheimfavorit",
    desc: "Halbfinalist 2022 · 3,2% Titelchance",
    color: "from-accent/20 to-accent/10",
    border: "border-accent/20",
  },
];

export default function PrognoseHubPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: "https://www.wm2026guide.de" },
      { "@type": "ListItem", position: 2, name: "Prognoses", item: "https://www.wm2026guide.de/Prognose" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
{/* Breadcrumb */}
{/* ===== HERO ===== */}
      <section className="hero-animated py-14 md:py-20 text-white">
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent backdrop-blur-sm">
            <span className="animate-pulse inline-block w-1.5 h-1.5 rounded-full bg-accent" />
            WM 2026 · Prognosen-Hub
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            Alle{" "}
            <span className="gradient-text">Prognosen WM 2026</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300/90 mb-6">
            Sieger, Gruppen A bis L, Topspiele — unser ELO-Modell + 100.000 Simulationen
            als Leitfaden für Ihre WM-2026-Prognosen.
          </p>

          {/* Stats rapides */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {[
              { value: `${totalTeams}`, label: "analysierte Mannschaften" },
              { value: `${totalMatches}`, label: "erfasste Spiele" },
              { value: `${totalGroups}`, label: "Gruppen" },
              { value: "100K", label: "Simulationen" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-extrabold text-accent">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <a href="#vainqueur" className="rounded-xl bg-accent px-5 py-2.5 font-semibold text-white hover:bg-accent/80 transition-all">
              Sieger-Prognose
            </a>
            <a href="#Gruppen" className="rounded-lg border border-accent/30 bg-accent/10 px-5 py-2.5 font-semibold text-accent hover:bg-accent/20 transition-all">
              <FolderOpen className="h-5 w-5 inline-block" /> Gruppen-Prognosen
            </a>
            <a href="#matchs" className="rounded-lg border border-white/15 bg-white/8 px-5 py-2.5 font-semibold text-white hover:bg-white/15 transition-all">
              Spiel-Prognosen
            </a>
          </div>
        </div>
      </section>

      {/* ===== TENDANCES ===== */}
      <section className="bg-white py-10 border-b border-gray-100">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
            Trends & Statistiken WM 2026
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {TRENDS.map((trend) => (
              <div
                key={trend.title}
                className={`rounded-xl border ${trend.border} bg-gradient-to-br ${trend.color} p-4`}
              >
                <span className="text-2xl block mb-2">{trend.icon}</span>
                <p className="font-bold text-gray-900 text-sm mb-1">{trend.title}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{trend.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRONOSTIC VAINQUEUR ===== */}
      <section id="vainqueur" className="bg-gray-50 py-12">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="section-header mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Sieger-Prognose WM 2026
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Top 5 Favoriten laut unserem ELO-Modell
              </p>
            </div>
            <Link href="/prognose/sieger" className="ml-auto text-sm font-semibold text-primary hover:underline shrink-0">
              Vollständige Analyse anzeigen →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
            {top5.map(({ pred, team }, index) => {
              if (!team) return null;
              const winPct = (pred.winnerProb * 100).toFixed(1);
              const odds = estimatedOutrightOdds(pred.winnerProb);
              return (
                <Link
                  key={team.id}
                  href={`/mannschaft/${team.slug}`}
                  className={`group relative rounded-xl border bg-white p-4 text-center hover:shadow-md hover:-translate-y-0.5 transition-all ${
                    index === 0 ? "border-accent/50" : "border-gray-200"
                  }`}
                >
                  {index === 0 && (
                    <span className="absolute top-2 right-2 text-[9px] bg-accent text-white px-1.5 py-0.5 rounded font-bold">
                      FAVORI
                    </span>
                  )}
                  <span className="text-3xl block mb-2">{team.flag}</span>
                  <p className="font-bold text-sm text-gray-900 group-hover:text-primary transition-colors">
                    {team.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">#{index + 1} weltweit</p>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-primary font-bold">{winPct}%</span>
                    <span className="text-accent font-bold">{odds}</span>
                  </div>
                  <div className="mt-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full"
                      style={{ width: `${Math.min(pred.winnerProb * 100 * 7, 100)}%` }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              href="/prognose/sieger"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3 font-bold text-white hover:-translate-y-0.5 transition-all"
            >
              Vollständige Sieger-Prognose anzeigen (Top 10 + Geheimfavoriten)
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PRONOSTICS PAR GROUPE ===== */}
      <section id="Gruppen" className="bg-white py-12 border-t border-gray-100">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="section-header mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                <FolderOpen className="h-5 w-5 inline-block" /> Prognosen nach Gruppe (A → L)
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Qualifizierte und Aussenseiter jeder WM-2026-Gruppe
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {groups.map((group) => {
              const groupTeams = group.teams
                .map((id) => teamsById2[id])
                .filter((t): t is NonNullable<typeof t> => t != null && !t.id.startsWith("barrage"))
                .sort((a, b) => {
                  const pa = teamPredictions.find((p) => p.teamId === a.id);
                  const pb = teamPredictions.find((p) => p.teamId === b.id);
                  return (pb?.winnerProb ?? 0) - (pa?.winnerProb ?? 0);
                });
              const top2 = groupTeams.slice(0, 2);
              const favorite = groupTeams[0];

              return (
                <Link
                  key={group.slug}
                  href={`/prognose-gruppe/${group.slug}`}
                  className="group rounded-xl border border-gray-200 bg-white overflow-hidden hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-primary text-white">
                    <span className="text-sm font-extrabold bg-accent/20 text-accent px-2 py-0.5 rounded">
                      Gruppe {group.letter}
                    </span>
                    <span className="text-xs text-gray-400 group-hover:text-accent transition-colors">
                      Prognose →
                    </span>
                  </div>

                  {/* Teams */}
                  <div className="p-3 space-y-2">
                    {groupTeams.slice(0, 4).map((team, i) => {
                      const pred = teamPredictions.find((p) => p.teamId === team.id);
                      const winPct = pred ? (pred.winnerProb * 100).toFixed(1) : "—";
                      return (
                        <div
                          key={team.id}
                          className={`flex items-center gap-2 text-xs ${
                            i < 2 ? "text-gray-900" : "text-gray-400"
                          }`}
                        >
                          <span className="w-4 text-center text-gray-300 font-bold">{i + 1}</span>
                          <span className="text-base shrink-0">{team.flag}</span>
                          <span className="flex-1 font-medium truncate">{team.name}</span>
                          {i < 2 && (
                            <span className="text-primary font-bold shrink-0">{winPct}%</span>
                          )}
                        </div>
                      );
                    })}
                    {/* Placeholders pour barrages */}
                    {group.teams.filter((id) => id.startsWith("barrage")).map((id) => (
                      <div key={id} className="flex items-center gap-2 text-xs text-gray-300">
                        <span className="w-4 text-center font-bold">?</span>
                        <span className="text-base shrink-0"></span>
                        <span className="flex-1 font-medium truncate">Barrage</span>
                      </div>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== PRONOSTICS MATCHS ===== */}
      <section id="matchs" className="bg-gray-50 py-12 border-t border-gray-100">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="section-header mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Prognosen der Topspiele
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Detaillierte Analysen der meisterwarteten Begegnungen
              </p>
            </div>
            <Link href="/Prognose" className="ml-auto text-sm font-semibold text-primary hover:underline shrink-0">
              Alle Spiele →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {displayMatches.map((match) => {
              const home = teamsById[match.homeTeamId];
              const away = teamsById[match.awayTeamId];
              if (!home || !away) return null;

              return (
                <Link
                  key={match.id}
                  href={`/prognose-spiel/${match.slug}`}
                  className="group rounded-xl border border-gray-200 bg-white p-4 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {match.group && (
                      <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">
                        Gruppe {match.group}
                      </span>
                    )}
                    {match.stage && match.stage !== "group" && (
                      <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-bold">
                        {match.stage.replace("-", " ").toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="text-2xl shrink-0">{home.flag}</span>
                      <span className="text-sm font-bold text-gray-900 truncate group-hover:text-primary transition-colors">
                        {home.name}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-gray-400 shrink-0 px-2">vs</span>
                    <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                      <span className="text-sm font-bold text-gray-900 truncate text-right">
                        {away.name}
                      </span>
                      <span className="text-2xl shrink-0">{away.flag}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(match.date + "T00:00:00+02:00").toLocaleDateString("de-DE", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      timeZone: "Europe/Paris",
                    })}
                    {match.time ? ` · ${match.time.slice(0, 5)}` : ""}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-primary font-semibold group-hover:underline">
                      Prognose anzeigen →
                    </span>
                    <span className="text-[10px] text-gray-400">Analyse IA + ELO</span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/Prognose"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-8 py-3 font-semibold text-gray-700 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block shrink-0"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg> Alle Spiel-Prognosen anzeigen
            </Link>
          </div>
        </div>
      </section>

      {/* ===== LIENS RAPIDES ===== */}
      <section className="bg-white py-12 border-t border-gray-100">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block shrink-0"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg> Ergänzende Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                href: "/prognose/sieger",
                icon: "",
                title: "Sieger-Prognose",
                desc: "Top 10 Favoriten mit Quoten und Geheimfavoriten",
                gradient: "from-red-600 to-red-800",
              },
              {
                href: "/comparateur-cotes",
                icon: "",
                title: "Quotenvergleich",
                desc: "Beste Betano-Quoten in Echtzeit",
                gradient: "from-accent to-accent/70",
              },
              {
                href: "/simulateur",
                icon: "",
                title: "Turnierbaum-Simulator",
                desc: "Erstellen Sie Ihren eigenen WM-Turnierbaum",
                gradient: "from-blue-600 to-blue-800",
              },
              {
                href: "/methodologie",
                icon: "",
                title: "Unsere Methodik",
                desc: "ELO, Monte Carlo, Quotenkalibrierung",
                gradient: "from-purple-600 to-purple-800",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative rounded-xl overflow-hidden border border-transparent shadow-sm hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`bg-gradient-to-br ${item.gradient} p-5 text-white h-full`}>
                  <span className="text-3xl mb-3 block transition-transform group-hover:scale-110 duration-200">
                    {item.icon}
                  </span>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-xs text-white/70">{item.desc}</p>
                  <p className="mt-3 text-xs font-bold text-white/80 group-hover:gap-2 transition-all">
                    Aufrufen →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TOUS NOS PRONOSTICS ===== */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Alle unsere Prognosen</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { href: "/prognose/sieger", icon: "🏆", title: "Sieger-Prognose WM 2026", description: "Wer gewinnt die WM 2026?" },
              { href: "/prognose/btts", icon: "⚽", title: "BTTS (Beide treffen)", description: "Prognosen, ob beide Mannschaften treffen" },
              { href: "/prognose/over-under", icon: "📊", title: "Over/Under", description: "Prognosen zur Anzahl der Tore" },
              { href: "/prognose/karten", icon: "🟨", title: "Karten-Prognose", description: "Vorhersagen zu Gelben und Roten Karten" },
              { href: "/prognose/clean-sheet", icon: "🧤", title: "Clean Sheet", description: "Welche Mannschaften zu Null spielen werden" },
              { href: "/prognose/finalisten", icon: "🥇", title: "Finalisten-Prognose", description: "Wer steht im Finale der WM 2026?" },
              { href: "/prognose/torschuetzen", icon: "👟", title: "Beste Torschützen", description: "Wer wird Torschützenkönig des Turniers?" },
              { href: "/prognose/genaue-ergebnisse", icon: "🎯", title: "Genaue Ergebnisse", description: "Exakte Ergebnisprognosen Spiel für Spiel" },
              { href: "/prognose/elfmeterschiessen", icon: "🥅", title: "Elfmeterschiessen", description: "Welche Spiele ins Elfmeterschiessen gehen" },
              { href: "/sportwetten/corners", icon: "🚩", title: "Ecken-Prognose", description: "Prognosen zur Anzahl der Eckbälle" },
              { href: "/Prognoses/grille", icon: "📋", title: "Prognose-Raster", description: "Füllen Sie Ihr WM-Prognose-Raster aus" },
              { href: "/Prognoses/leaderboard", icon: "🏅", title: "Rangliste der Prognostiker", description: "Die Rangliste der besten Prognostiker" },
              { href: "/simulateur", icon: "🎮", title: "Turnier-Simulator", description: "Simulieren Sie den WM-2026-Turnierbaum" },
              { href: "/comparateur-cotes", icon: "📈", title: "Quotenvergleich", description: "Vergleichen Sie die Quoten der Buchmacher" },
            ].map(item => (
              <Link key={item.href} href={item.href} className="group rounded-xl border border-gray-200 bg-white p-5 hover:shadow-md hover:border-primary/30 transition-all">
                <div className="flex items-start gap-3">
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DISCLAIMER ===== */}
      <section className="bg-gray-50 py-6 border-t border-gray-100">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-gray-400 text-center leading-relaxed max-w-3xl mx-auto">
            Unsere Prognosen werden über ein an den internationalen Fussball angepasstes ELO-Modell + Monte-Carlo-Simulationen (100.000 Iterationen) berechnet.
            Sie dienen nur zu Informationszwecken und stellen keine Wettberatung dar. Sportwetten bergen Risiken.{" "}
            <Link href="/verantwortungsvolles-spielen" className="underline hover:text-primary">Verantwortungsvolles Spielen — 18+</Link>
          </p>
        </div>
      </section>
</>
  );
}
