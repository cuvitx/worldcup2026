import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterCTA } from "../components/NewsletterCTA";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";
import { teamsById } from "@repo/data/teams";
import { playersByTeamId } from "@repo/data/players";
import { matches } from "@repo/data/matches";
import { stadiumsById } from "@repo/data/stadiums";
import { predictionsByTeamId } from "@repo/data/predictions";
import { bookmakers, estimatedMatchOdds, estimatedOutrightOdds } from "@repo/data/affiliates";
import { matchPredictionByPair } from "@repo/data/predictions";

export const metadata: Metadata = {
  title: "Équipe de France CDM 2026 — Effectif, Calendrier & Pronostics",
  description:
    "Équipe de France CDM 2026 : effectif Bleus, calendrier Groupe I, pronostics vainqueur. Double championne (1998, 2018). La 3e étoile est possible !",
  openGraph: {
    title: "🇫🇷 Équipe de France CDM 2026 — Bleus, Effectif & Pronostics",
    description:
      "Les Bleus à la CDM 2026 : effectif complet des joueurs, calendrier Groupe I, cotes vainqueur, analyse forces/faiblesses. Double champion du monde.",
    url: "https://cdm2026.fr/equipe-de-france",
  },
};

// Position labels
const positionLabels: Record<string, string> = {
  GK: "Gardiens",
  DF: "Défenseurs",
  MF: "Milieux",
  FW: "Attaquants",
};

const positionOrder = ["GK", "DF", "MF", "FW"];

// CDM history
const wcHistory = [
  { year: 1930, result: "Non participante", flag: "—", note: "Voyage trop long vers l'Uruguay" },
  { year: 1934, result: "1/8 de finale", flag: "🟡", note: "Éliminée par l'Autriche" },
  { year: 1938, result: "Quart de finale", flag: "🟢", note: "Battue par l'Italie (future championne)" },
  { year: 1950, result: "Phase de groupes", flag: "🔴", note: "Retrait lors du tournoi" },
  { year: 1954, result: "Quart de finale", flag: "🟢", note: "Battue par l'Allemagne" },
  { year: 1958, result: "3e place 🥉", flag: "🏅", note: "Just Fontaine : record 13 buts en 1 CDM" },
  { year: 1962, result: "Phase de groupes", flag: "🔴", note: "" },
  { year: 1966, result: "Phase de groupes", flag: "🔴", note: "" },
  { year: 1970, result: "Non qualifiée", flag: "—", note: "" },
  { year: 1974, result: "Phase de groupes", flag: "🔴", note: "" },
  { year: 1978, result: "Phase de groupes", flag: "🔴", note: "" },
  { year: 1982, result: "4e place", flag: "🟡", note: "Tragédie de Séville — Schumacher/Battiston" },
  { year: 1986, result: "3e place 🥉", flag: "🏅", note: "Platini au sommet, battue par l'Allemagne" },
  { year: 1990, result: "Non qualifiée", flag: "—", note: "" },
  { year: 1994, result: "Non qualifiée", flag: "—", note: "Défaite contre la Bulgarie (Kostadinov)" },
  { year: 1998, result: "🏆 CHAMPIONNE", flag: "⭐⭐", note: "Zidane ×2, 3-0 vs Brésil en finale. À domicile !" },
  { year: 2002, result: "Phase de groupes", flag: "🔴", note: "Tenant sortant éliminé sans marquer" },
  { year: 2006, result: "Finaliste 🥈", flag: "🥈", note: "Zidane coup de tête sur Materazzi, bat. aux tirs au but" },
  { year: 2010, result: "Phase de groupes", flag: "🔴", note: "Grève historique des joueurs" },
  { year: 2014, result: "Quart de finale", flag: "🟢", note: "Battue par l'Allemagne (1-0)" },
  { year: 2018, result: "🏆 CHAMPIONNE", flag: "⭐⭐", note: "4-2 vs Croatie en finale. 2e étoile !" },
  { year: 2022, result: "Finaliste 🥈", flag: "🥈", note: "Mbappé ×3 en finale, but bat. aux t.a.b. vs Argentine" },
];

const anecdotes = [
  {
    year: "1958",
    icon: "⚽",
    title: "Just Fontaine — Record éternel",
    desc: "Just Fontaine inscrit 13 buts en une seule édition de la Coupe du Monde, un record absolu qui tient depuis 66 ans et ne sera probablement jamais battu. La France finit 3e.",
  },
  {
    year: "1982",
    icon: "💔",
    title: "La tragédie de Séville",
    desc: "En demi-finale contre l'Allemagne, le gardien Schumacher assomme Battiston sans être sanctionné. La France, menée 3-1, remonte à 3-3 avant de perdre aux tirs au but. La plus grande injustice de l'histoire du football.",
  },
  {
    year: "1998",
    icon: "🏆",
    title: "1998 : L'été de tous les rêves",
    desc: "À domicile, les Bleus de Aimé Jacquet écrasent le Brésil 3-0 en finale. Zidane inscrit deux buts de la tête. Un pays tout entier sur les Champs-Élysées. La 1ère étoile.",
  },
  {
    year: "2006",
    icon: "🤯",
    title: "Zidane : Adieu en coup de tête",
    desc: "À 34 ans, Zizou sort de sa retraite internationale et mène la France jusqu'en finale. Un coup de tête sur Materazzi en finale le fait expulser. La France perd aux tirs au but contre l'Italie.",
  },
  {
    year: "2018",
    icon: "⭐",
    title: "2018 : La génération Mbappé",
    desc: "En Russie, les Bleus de Deschamps battent la Croatie 4-2. Mbappé (19 ans) marque et devient le 2e joueur après Pelé à inscrire un but en finale à son âge. La 2e étoile.",
  },
  {
    year: "2022",
    icon: "🎭",
    title: "2022 : La finale épique de tous les temps",
    desc: "Contre l'Argentine (2-0 à la 80e), la France remonte à 2-2 grâce à Mbappé (doublé) et force les prolongations. Mbappé égalise encore à 3-3 ! Finalement, l'Argentine gagne aux tirs au but. Mbappé : 8 buts en 1 CDM.",
  },
];

const faqItems = [
  {
    question: "Qui est le sélectionneur de l'équipe de France pour la CDM 2026 ?",
    answer:
      "Didier Deschamps reste sélectionneur de l'équipe de France pour la Coupe du Monde 2026. Il a prolongé son contrat après la finale de 2022 au Qatar. Avec deux finales (2018, 2022) et un titre mondial (2018), il est l'un des coaches les plus expérimentés de la compétition.",
  },
  {
    question: "Quels sont les joueurs clés de la France à la CDM 2026 ?",
    answer:
      "Les cadres incontournables des Bleus sont Kylian Mbappé (capitaine, attaquant du Real Madrid), Antoine Griezmann (meneur de jeu), Aurélien Tchouaméni (milieu défensif du Real Madrid), Mike Maignan (gardien, AC Milan) et Jules Koundé (défenseur, FC Barcelone). Mbappé reste la star mondiale du tournoi avec ses 8 buts en 2022.",
  },
  {
    question: "Dans quel groupe est l'équipe de France à la CDM 2026 ?",
    answer:
      "L'équipe de France est placée dans le Groupe I de la Coupe du Monde 2026. Elle affrontera notamment le Maroc, la Belgique et d'autres adversaires lors de la phase de groupes. Les matchs des Bleus se jouent dans des stades américains (New York, Philadelphie, Boston).",
  },
  {
    question: "Quel est le parcours historique de la France en Coupe du Monde ?",
    answer:
      "La France a remporté la Coupe du Monde à deux reprises : en 1998 à domicile (3-0 contre le Brésil) et en 2018 en Russie (4-2 contre la Croatie). Elle a également été finaliste en 2006 (défaite aux tirs au but contre l'Italie) et en 2022 (défaite aux tirs au but contre l'Argentine). Les Bleus visent une 3e étoile en 2026.",
  },
  {
    question: "Quelles sont les chances de la France de gagner la CDM 2026 ?",
    answer:
      "Selon notre modèle ELO et les cotes des bookmakers, la France affiche une probabilité de victoire d'environ 13%, ce qui en fait l'un des trois grands favoris avec l'Argentine (~15%) et l'Espagne (~12%). Les cotes vainqueur pour la France tournent autour de 7.00 à 8.00 selon les bookmakers.",
  },
  {
    question: "Quand joue la France à la CDM 2026 ?",
    answer:
      "L'équipe de France dispute ses matchs de Groupe I lors de la phase de groupes entre le 11 juin et le 27 juin 2026. Les Bleus jouent dans des stades américains : MetLife Stadium (New York/NJ), Lincoln Financial Field (Philadelphia) et Gillette Stadium (Boston). En cas de qualification, les matchs à élimination directe se poursuivent jusqu'à la finale du 19 juillet 2026 au MetLife Stadium.",
  },
];

export default function EquipeDeFrancePage() {
  const team = teamsById["france"];
  const francePlayers = playersByTeamId["france"] ?? [];
  const prediction = predictionsByTeamId["france"];

  // France group matches
  const franceMatches = matches.filter(
    (m) => m.homeTeamId === "france" || m.awayTeamId === "france"
  );

  // Group players by position
  const playersByPosition: Record<string, typeof francePlayers> = {};
  for (const pos of positionOrder) {
    playersByPosition[pos] = francePlayers.filter((p) => p.position === pos);
  }

  const winnerOdds = prediction ? estimatedOutrightOdds(prediction.winnerProb) : "—";
  const winPct = prediction ? Math.round(prediction.winnerProb * 100 * 10) / 10 : 0;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://cdm2026.fr" },
      { "@type": "ListItem", position: 2, name: "Équipes", item: "https://cdm2026.fr/equipes" },
      { "@type": "ListItem", position: 3, name: "Équipe de France", item: "https://cdm2026.fr/equipe-de-france" },
    ],
  };

  const sportsTeamJsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsTeam",
    name: "Équipe de France de Football",
    sport: "Football",
    memberOf: {
      "@type": "SportsOrganization",
      name: "FIFA Coupe du Monde 2026",
    },
    url: "https://cdm2026.fr/equipe-de-france",
    description: team?.description ?? "",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsTeamJsonLd) }}
      />

      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "/" },
          { name: "Équipes", url: "/equipes" },
          { name: "Équipe de France", url: "/equipe-de-france" },
        ]}
        baseUrl={domains.fr}
      />

      {/* Breadcrumb nav */}
      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 flex-wrap">
            <li><Link href="/" className="hover:text-primary">Accueil</Link></li>
            <li>/</li>
            <li><Link href="/equipes" className="hover:text-primary">Équipes</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">🇫🇷 Équipe de France</li>
          </ol>
        </div>
      </nav>

      {/* ===== HERO PATRIOTIQUE ===== */}
      <section
        className="relative py-16 md:py-24 text-white overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #002395 0%, #002395 33%, #FFFFFF 33%, #FFFFFF 66%, #ED2939 66%, #ED2939 100%)",
        }}
      >
        {/* Overlay sombre pour lisibilité */}
        <div className="absolute inset-0 bg-[#002395]/85" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Left: Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
                <span>⭐⭐ Double championne du monde</span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3">
                🇫🇷 Les Bleus à la conquête d&apos;une 3ᵉ étoile
              </h1>
              <p className="text-xl sm:text-2xl font-light text-white/70 mb-4">
                2ᵉ au classement FIFA · 13% de chances de titre · L&apos;effectif le plus complet du monde
              </p>
              <p className="text-gray-200 max-w-2xl leading-relaxed mb-6 text-sm md:text-base">
                Mbappé, Griezmann, Tchouaméni… La France débarque en 2026 avec une seule
                obsession : la 3ᵉ étoile. Groupe I · MetLife, Philadelphia, Boston.
              </p>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-3 mb-6 max-w-sm mx-auto md:mx-0">
                <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow text-center">
                  <p className="text-2xl font-extrabold text-secondary">{winnerOdds}</p>
                  <p className="text-xs text-white/60 mt-0.5">Cote titre</p>
                </div>
                <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow text-center">
                  <p className="text-2xl font-extrabold text-primary-light">{winPct}%</p>
                  <p className="text-xs text-white/60 mt-0.5">% de chance</p>
                </div>
                <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow text-center">
                  <p className="text-2xl font-extrabold text-white">#2</p>
                  <p className="text-xs text-white/60 mt-0.5">FIFA Ranking</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <a href="#calendrier" className="rounded-lg bg-white text-primary px-5 py-2.5 font-bold text-sm hover:bg-primary/5 transition-all hover:-translate-y-0.5">
                  📅 Voir les matchs des Bleus
                </a>
                <a href="#effectif" className="rounded-lg border border-white/30 bg-white/10 px-5 py-2.5 font-semibold text-sm hover:bg-white/20 transition-all">
                  👥 Découvrir l&apos;effectif
                </a>
                <Link
                  href="/pronostic-vainqueur"
                  className="rounded-lg border border-secondary/40 bg-secondary/15 px-5 py-2.5 font-semibold text-secondary text-sm hover:bg-secondary/25 transition-all"
                >
                  🏆 Pronostic vainqueur
                </Link>
              </div>
            </div>

            {/* Right: Blason / Stats bloc */}
            <div className="shrink-0">
              <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow text-center min-w-[200px]">
                <div className="text-7xl mb-3">🇫🇷</div>
                <p className="font-extrabold text-xl mb-1">France</p>
                <p className="text-secondary font-semibold text-sm mb-4">⭐⭐ Champion 1998 &amp; 2018</p>
                <div className="space-y-2 text-sm text-white/70">
                  <div className="flex justify-between gap-4">
                    <span>Confédération</span>
                    <span className="font-semibold text-white">UEFA</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Groupe</span>
                    <span className="font-semibold text-white">I</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Apparitions CDM</span>
                    <span className="font-semibold text-white">16</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>ELO Rating</span>
                    <span className="font-semibold text-secondary">2065</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BANDEAU PROBABILITES ===== */}
      {prediction && (
        <section className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-700">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-gray-500 dark:text-gray-300 font-medium">Probabilités France CDM 2026 :</span>
              {[
                { label: "Sortir des groupes", value: prediction.groupStageProb },
                { label: "Top 16", value: prediction.roundOf16Prob },
                { label: "Quarts", value: prediction.quarterFinalProb },
                { label: "Demi-finales", value: prediction.semiFinalProb },
                { label: "Finale", value: prediction.finalProb },
                { label: "Vainqueur 🏆", value: prediction.winnerProb },
              ].map((item) => (
                <span
                  key={item.label}
                  className="rounded-full px-3 py-1 bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary font-medium"
                >
                  {item.label} : <strong>{Math.round(item.value * 100)}%</strong>
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== CALENDRIER DES MATCHS ===== */}
      <section id="calendrier" className="bg-gray-50 dark:bg-slate-900/50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            📅 Calendrier des matchs de la France
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-300 mb-6">
            Groupe I · CDM 2026 · Heure UTC
          </p>

          <div className="space-y-3">
            {franceMatches.map((match) => {
              const homeTeam = teamsById[match.homeTeamId];
              const awayTeam = teamsById[match.awayTeamId];
              const stadium = stadiumsById[match.stadiumId];
              const isFranceHome = match.homeTeamId === "france";
              const opponent = isFranceHome ? awayTeam : homeTeam;

              const pred = matchPredictionByPair[`${match.homeTeamId}:${match.awayTeamId}`];
              const odds = pred
                ? estimatedMatchOdds(pred.team1WinProb, pred.drawProb, pred.team2WinProb)
                : undefined;

              const franceWinOdds = isFranceHome ? odds?.home : odds?.away;

              const dateObj = new Date(`${match.date}T${match.time ?? "00:00"}Z`);
              const dateStr = dateObj.toLocaleDateString("fr-FR", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              });
              const timeStr = dateObj.toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Europe/Paris",
              });

              return (
                <div
                  key={match.id}
                  className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all hover:border-secondary/30 dark:hover:border-secondary/40"
                >
                  <div className="flex items-center gap-4 px-5 py-4">
                    {/* Date/Stade */}
                    <div className="shrink-0 text-center hidden sm:block w-20">
                      <p className="text-xs text-gray-400 dark:text-gray-400 capitalize">
                        {dateObj.toLocaleDateString("fr-FR", { weekday: "short" })}
                      </p>
                      <p className="text-lg font-extrabold text-gray-900 dark:text-white">
                        {dateObj.getDate()}/{dateObj.getMonth() + 1}
                      </p>
                      <p className="text-xs text-primary">{timeStr} (FR)</p>
                    </div>

                    {/* Match */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{homeTeam?.flag ?? "🏳️"}</span>
                        <span className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">
                          {homeTeam?.name ?? match.homeTeamId}
                        </span>
                        <span className="text-gray-400 dark:text-gray-400 font-bold">vs</span>
                        <span className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">
                          {awayTeam?.name ?? match.awayTeamId}
                        </span>
                        <span className="text-xl">{awayTeam?.flag ?? "🏳️"}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {match.group && (
                          <span className="text-xs bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary px-2 py-0.5 rounded font-medium">
                            Groupe {match.group}
                          </span>
                        )}
                        {stadium && (
                          <span className="text-xs text-gray-500 dark:text-gray-300">
                            🏟️ {stadium.name}
                          </span>
                        )}
                        <span className="text-xs text-gray-400 dark:text-gray-400 sm:hidden">
                          {dateStr} · {timeStr}
                        </span>
                      </div>
                    </div>

                    {/* Cote France */}
                    <div className="shrink-0 text-right">
                      {franceWinOdds && franceWinOdds !== "—" && (
                        <div>
                          <p className="text-lg font-extrabold text-secondary">{franceWinOdds}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-300">victoire 🇫🇷</p>
                        </div>
                      )}
                      <Link
                        href={`/pronostic-match/${match.slug}`}
                        className="mt-1 inline-flex text-xs text-primary hover:underline font-medium"
                      >
                        Pronostic →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 text-center">
            <Link href="/match/calendrier" className="text-sm text-primary hover:underline font-medium">
              Voir le calendrier complet des 104 matchs →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== EFFECTIF ===== */}
      <section id="effectif" className="bg-white dark:bg-slate-900 py-12 border-t border-gray-100 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            👥 Effectif probable — {francePlayers.length} joueurs
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-300 mb-6">
            Sélection probable pour la CDM 2026 selon notre analyse. Mis à jour en février 2026.
          </p>

          <div className="space-y-6">
            {positionOrder.map((pos) => {
              const posPlayers = playersByPosition[pos] ?? [];
              if (posPlayers.length === 0) return null;

              return (
                <div key={pos}>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-sm text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-primary rounded-full inline-block" />
                    {positionLabels[pos]} ({posPlayers.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {posPlayers.map((player) => (
                      <Link
                        key={player.id}
                        href={`/joueur/${player.slug}`}
                        className="group flex items-center gap-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 hover:border-primary/30 hover:shadow-sm transition-all"
                      >
                        {/* Number badge */}
                        <div className="shrink-0 w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-extrabold text-sm">
                          {player.number ?? "—"}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-primary transition-colors truncate">
                            {player.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-300">{player.club}</p>
                        </div>

                        {/* Stats */}
                        <div className="shrink-0 text-right">
                          <p className="text-xs font-bold text-gray-700 dark:text-gray-300">{player.caps} sél.</p>
                          {player.goals > 0 && (
                            <p className="text-xs text-primary">{player.goals} buts</p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 text-center">
            <Link href="/equipe/france" className="text-sm text-primary hover:underline font-medium">
              Fiche complète de l&apos;équipe de France →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PRONOSTIC FRANCE ===== */}
      <section className="bg-gray-50 dark:bg-slate-900/50 py-12 border-t border-gray-100 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🏆 Pronostic France — Cotes & Analyse
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Cotes par bookmaker */}
            <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white dark: mb-4">
                📊 Cotes vainqueur CDM 2026 — France
              </h3>
              <div className="space-y-2">
                {bookmakers.map((bm) => {
                  const baseOdds = prediction ? prediction.winnerProb : null;
                  const variations = [0.95, 1.0, 1.05, 0.9, 1.02];
                  const idx = bookmakers.findIndex((b) => b.id === bm.id);
                  const displayOdds = baseOdds ? (baseOdds * variations[idx % variations.length]!).toFixed(2) : "—";

                  return (
                    <a
                      key={bm.id}
                      href={bm.url}
                      target="_blank"
                      rel="noopener noreferrer sponsored nofollow"
                      className="flex items-center gap-3 rounded-lg border border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-700 px-4 py-2.5 hover:border-primary/30 hover:bg-primary/5 transition-all group"
                    >
                      <span className="flex-1 font-medium text-sm text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors">
                        {bm.name}
                      </span>
                      <span className="text-xs text-green-600 dark:text-green-400 font-semibold">{bm.bonus}</span>
                      <span className="odds-badge text-base font-extrabold">{displayOdds}</span>
                    </a>
                  );
                })}
              </div>
              <p className="mt-3 text-xs text-gray-400 dark:text-gray-400">
                * Cotes indicatives. Vérifiez en temps réel sur chaque site. 18+ · Jeu responsable.
              </p>
            </div>

            {/* Analyse */}
            <div className="space-y-4">
              {/* Forces */}
              <div className="rounded-xl border border-green-200 dark:border-green-800/50 bg-green-50 dark:bg-green-900/15 p-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-green-800 dark:text-green-400 mb-3">
                  ✅ Forces des Bleus
                </h3>
                <ul className="space-y-1.5">
                  {[
                    "Effectif le plus profond du monde — qualité à chaque poste",
                    "Mbappé (27 ans) au sommet de son art au Real Madrid",
                    "Doublé 1998-2018 + finale 2022 — ADN du gagnant",
                    "Tchouaméni / Camavinga : milieu de classe mondiale",
                    "Saliba / Upamecano : défense jeune et solide",
                    "Faim de revanche après la défaite 2022 face à l'Argentine",
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-green-800 dark:text-green-300">
                      <span className="shrink-0 text-green-500 mt-0.5">✓</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Faiblesses */}
              <div className="rounded-xl border border-red-200 dark:border-red-800/50 bg-red-50 dark:bg-red-900/15 p-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-red-700 dark:text-red-400 mb-3">
                  ⚠️ Points de vigilance
                </h3>
                <ul className="space-y-1.5">
                  {[
                    "Griezmann à 35 ans — forme physique sur toute la durée",
                    "Pression médiatique écrasante sur Mbappé",
                    "Syndrome de la 3e CDM consécutive à haut niveau",
                    "Gestion de l'équilibre offensif/défensif selon Deschamps",
                    "Risque de blessures clés en toute fin de saison (juin)",
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-red-700 dark:text-red-300">
                      <span className="shrink-0 mt-0.5">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HISTORIQUE CDM ===== */}
      <section className="bg-white dark:bg-slate-900 py-12 border-t border-gray-100 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            📜 Historique en Coupe du Monde (1930–2022)
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-300 mb-6">
            16 participations, 2 titres, 2 finales perdues, 2 troisièmes places.
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="bg-gray-50 dark:bg-slate-700/50 text-xs uppercase text-gray-500text-gray-700 dark:text-gray-300">
                  <th className="text-left px-4 py-3 font-bold">Année</th>
                  <th className="text-left px-4 py-3 font-bold">Résultat</th>
                  <th className="text-left px-4 py-3 font-bold hidden sm:table-cell">Note</th>
                </tr>
              </thead>
              <tbody>
                {wcHistory.map((edition, i) => (
                  <tr
                    key={edition.year}
                    className={`border-t border-gray-100 dark:border-slate-700/50 ${
                      edition.result.includes("CHAMPION")
                        ? "bg-secondary/5 dark:bg-secondary/10"
                        : edition.result.includes("Finaliste")
                        ? "bg-gray-50/50 dark:bg-slate-800/50"
                        : i % 2 === 0
                        ? "bg-white dark:bg-slate-800/30"
                        : "bg-gray-50/30 dark:bg-slate-800/60"
                    }`}
                  >
                    <td className="px-4 py-2.5 font-bold text-gray-900 dark:text-white whitespace-nowrap">
                      {edition.year}
                    </td>
                    <td className="px-4 py-2.5">
                      <span className={`font-semibold ${
                        edition.result.includes("CHAMPION")
                          ? "text-secondary text-base"
                          : edition.result.includes("Finaliste")
                          ? "text-gray-600 dark:text-gray-200"
                          : edition.result === "Non participante" || edition.result === "Non qualifiée"
                          ? "text-gray-400 dark:text-gray-400"
                          : "text-gray-700 dark:text-gray-300"
                      }`}>
                        {edition.flag !== "—" && edition.flag !== "⭐⭐" && (
                          <span className="mr-1">{edition.flag}</span>
                        )}
                        {edition.flag === "⭐⭐" && <span className="mr-1 text-secondary">⭐⭐</span>}
                        {edition.result}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-xs text-gray-500 dark:text-gray-300 hidden sm:table-cell max-w-xs">
                      {edition.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== ANECDOTES MARQUANTES ===== */}
      <section className="bg-gray-50 dark:bg-slate-900/50 py-12 border-t border-gray-100 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            ✨ Les anecdotes marquantes de l&apos;histoire des Bleus
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {anecdotes.map((anecdote) => (
              <div
                key={anecdote.year}
                className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{anecdote.icon}</span>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {anecdote.year}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white dark: mb-2 text-sm">
                  {anecdote.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {anecdote.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LIENS PRONOSTICS MATCHS FRANCE ===== */}
      <section className="bg-white dark:bg-slate-900 py-12 border-t border-gray-100 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🔮 Pronostics des matchs de la France
          </h2>

          <div className="grid sm:grid-cols-3 gap-4">
            {franceMatches.map((match) => {
              const homeTeam = teamsById[match.homeTeamId];
              const awayTeam = teamsById[match.awayTeamId];

              return (
                <Link
                  key={match.id}
                  href={`/pronostic-match/${match.slug}`}
                  className="group rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-lg">{homeTeam?.flag ?? "🏳️"}</span>
                    <span className="text-xs font-bold text-gray-400 dark:text-gray-400">VS</span>
                    <span className="text-lg">{awayTeam?.flag ?? "🏳️"}</span>
                  </div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white text-center group-hover:text-primary transition-colors">
                    {homeTeam?.name ?? match.homeTeamId} vs {awayTeam?.name ?? match.awayTeamId}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-300 text-center mt-1">
                    📅 {new Date(match.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}
                  </p>
                  <p className="text-xs text-primary text-center mt-2 font-medium group-hover:underline">
                    Voir le pronostic →
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-gray-50 dark:bg-slate-900/50 py-12 border-t border-gray-100 dark:border-slate-700">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            ❓ Questions fréquentes — Équipe de France CDM 2026
          </h2>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden"
              >
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-gray-900 dark:text-white hover:text-primary transition-colors list-none">
                    {item.question}
                    <span className="ml-4 shrink-0 text-gray-400 dark:text-gray-400 group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-slate-700 pt-3">
                    {item.answer}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER CTA ===== */}
      <NewsletterCTA />

      {/* ===== CTA FINAL ===== */}
      <section className="py-10 border-t border-gray-100 dark:border-slate-700"
        style={{ background: "linear-gradient(135deg, #002395 0%, #1a237e 50%, #c62828 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            🇫🇷 Allez les Bleus !
          </h2>
          <p className="text-white/70 text-sm mb-6 max-w-lg mx-auto">
            La France vise la 3e étoile. Suivez tous les matchs, comparez les cotes
            et faites vos pronostics sur CDM2026.fr
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/comparateur-cotes" className="rounded-lg bg-white text-primary font-bold px-6 py-3 hover:bg-primary/5 transition-all hover:-translate-y-0.5">
              📊 Comparer les cotes
            </Link>
            <Link href="/pronostic-vainqueur" className="rounded-lg border border-secondary/40 bg-secondary/15 text-secondary font-bold px-6 py-3 hover:bg-secondary/25 transition-all">
              🏆 Pronostic vainqueur
            </Link>
            <Link href="/billets" className="rounded-lg border border-white/20 bg-white/10 text-white font-semibold px-6 py-3 hover:bg-white/20 transition-all">
              🎟️ Billets CDM 2026
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
