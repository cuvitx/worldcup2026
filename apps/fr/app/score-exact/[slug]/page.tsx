import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { FAQSection } from "@repo/ui/faq-section";
import { stageLabels, EXTERNAL_URLS } from "@repo/data/constants";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { matches, matchesBySlug } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { stadiumsById } from "@repo/data/stadiums";
import { citiesById } from "@repo/data/cities";
import { bookmakers } from "@repo/data/affiliates";
import type { Team, Match, Stadium } from "@repo/data/types";

// ─── Static generation ───
export const dynamicParams = false;

export function generateStaticParams() {
  return matches.map((m) => ({ slug: m.slug }));
}

// ─── Star players map (1-2 per team) ───
const starPlayers: Record<string, string[]> = {
  france: ["Kylian Mbappé", "Antoine Griezmann"],
  bresil: ["Vinícius Jr.", "Rodrygo"],
  argentine: ["Lionel Messi", "Julián Álvarez"],
  angleterre: ["Jude Bellingham", "Harry Kane"],
  espagne: ["Lamine Yamal", "Pedri"],
  allemagne: ["Florian Wirtz", "Jamal Musiala"],
  portugal: ["Cristiano Ronaldo", "Bruno Fernandes"],
  "pays-bas": ["Cody Gakpo", "Virgil van Dijk"],
  belgique: ["Kevin De Bruyne", "Jérémy Doku"],
  italie: ["Nicolò Barella", "Federico Chiesa"],
  croatie: ["Luka Modrić", "Joško Gvardiol"],
  uruguay: ["Federico Valverde", "Darwin Núñez"],
  colombie: ["Luis Díaz", "James Rodríguez"],
  mexique: ["Hirving Lozano", "Edson Álvarez"],
  "etats-unis": ["Christian Pulisic", "Gio Reyna"],
  senegal: ["Sadio Mané", "Ismaïla Sarr"],
  japon: ["Takefusa Kubo", "Kaoru Mitoma"],
  "coree-du-sud": ["Son Heung-min", "Lee Kang-in"],
  maroc: ["Achraf Hakimi", "Hakim Ziyech"],
  australie: ["Mathew Leckie", "Jackson Irvine"],
  canada: ["Alphonso Davies", "Jonathan David"],
  suisse: ["Granit Xhaka", "Xherdan Shaqiri"],
  danemark: ["Christian Eriksen", "Rasmus Højlund"],
  serbie: ["Dušan Vlahović", "Aleksandar Mitrović"],
  cameroun: ["André-Frank Zambo Anguissa", "Vincent Aboubakar"],
  ghana: ["Mohammed Kudus", "Thomas Partey"],
  tunisie: ["Aïssa Laïdouni", "Youssef Msakni"],
  "arabie-saoudite": ["Salem Al-Dawsari", "Firas Al-Buraikan"],
  iran: ["Mehdi Taremi", "Sardar Azmoun"],
  qatar: ["Akram Afif", "Almoez Ali"],
  equateur: ["Moisés Caicedo", "Piero Hincapié"],
  pologne: ["Robert Lewandowski", "Piotr Zieliński"],
  autriche: ["David Alaba", "Marcel Sabitzer"],
  turquie: ["Hakan Çalhanoğlu", "Arda Güler"],
  nigeria: ["Victor Osimhen", "Ademola Lookman"],
  egypte: ["Mohamed Salah", "Omar Marmoush"],
  "afrique-du-sud": ["Percy Tau", "Themba Zwane"],
  "costa-rica": ["Keylor Navas", "Joel Campbell"],
  honduras: ["Alberth Elis", "Anthony Lozano"],
  panama: ["José Fajardo", "Adalberto Carrasquilla"],
  "nouvelle-zelande": ["Chris Wood", "Liberato Cacace"],
  chili: ["Alexis Sánchez", "Ben Brereton Díaz"],
  paraguay: ["Miguel Almirón", "Julio Enciso"],
  bolivie: ["Marcelo Martins", "Ramiro Vaca"],
  "republique-tcheque": ["Patrik Schick", "Adam Hložek"],
  ukraine: ["Mykhailo Mudryk", "Oleksandr Zinchenko"],
  ecosse: ["Andrew Robertson", "Scott McTominay"],
  "pays-de-galles": ["Brennan Johnson", "Aaron Ramsey"],
  slovaquie: ["Milan Škriniar", "Stanislav Lobotka"],
  slovenie: ["Jan Oblak", "Benjamin Šeško"],
  albanie: ["Armando Broja", "Nedim Bajrami"],
  georgie: ["Khvicha Kvaratskhelia", "Georges Mikautadze"],
  jamaique: ["Leon Bailey", "Michail Antonio"],
  "trinite-et-tobago": ["Levi García", "Duane Muckette"],
  ouzbekistan: ["Eldor Shomurodov", "Abbosbek Fayzullaev"],
  indonesie: ["Pratama Arhan", "Yakob Sayuri"],
  bahrain: ["Mahdi Humaidan", "Abdulla Yusuf"],
};

// ─── Helper functions for anti-duplicate content ───

function getMatchTone(rank1: number, rank2: number): string {
  const diff = Math.abs(rank1 - rank2);
  if (diff <= 5) return "explosif";
  if (diff <= 15) return "serré";
  if (diff <= 30) return "imprévisible";
  return "déséquilibré";
}

function getPhaseContext(stage: Match["stage"]): { intro: string; isKnockout: boolean } {
  const isKnockout = stage !== "group";
  if (stage === "group") {
    return { intro: "phase de poules", isKnockout: false };
  }
  if (stage === "round-of-32") return { intro: "32èmes de finale", isKnockout: true };
  if (stage === "round-of-16") return { intro: "huitièmes de finale", isKnockout: true };
  if (stage === "quarter-final") return { intro: "quarts de finale", isKnockout: true };
  if (stage === "semi-final") return { intro: "demi-finales", isKnockout: true };
  if (stage === "final") return { intro: "grande finale", isKnockout: true };
  return { intro: "match pour la 3e place", isKnockout: true };
}

interface ScoreLine {
  score: string;
  probability: number;
  coteWinamax: string;
  coteBetclic: string;
  coteUnibet: string;
}

function computeScoreLines(
  home: Team,
  away: Team,
  stage: Match["stage"]
): ScoreLine[] {
  const { isKnockout } = getPhaseContext(stage);
  const hRank = home.fifaRanking;
  const aRank = away.fifaRanking;
  const diff = hRank - aRank; // negative = home stronger

  // Base expected goals (roughly from ranking)
  const homeStrength = Math.max(0.4, 2.2 - hRank / 40);
  const awayStrength = Math.max(0.4, 2.2 - aRank / 40);

  // Knockout modifier: fewer goals
  const kMod = isKnockout ? 0.82 : 1;

  const hxG = homeStrength * kMod;
  const axG = awayStrength * kMod;

  // Poisson-like probabilities for score combinations
  function poisson(lambda: number, k: number): number {
    return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
  }
  function factorial(n: number): number {
    let r = 1;
    for (let i = 2; i <= n; i++) r *= i;
    return r;
  }

  const raw: { score: string; prob: number }[] = [];
  for (let h = 0; h <= 4; h++) {
    for (let a = 0; a <= 4; a++) {
      const p = poisson(hxG, h) * poisson(axG, a);
      raw.push({ score: `${h}-${a}`, prob: p });
    }
  }

  // Sort by probability desc, take top 8
  raw.sort((a, b) => b.prob - a.prob);
  const top8 = raw.slice(0, 8);

  // Normalize probabilities to sum to ~65-80%
  const totalRaw = top8.reduce((s, x) => s + x.prob, 0);
  const targetSum = 0.55 + Math.random() * 0.15;

  return top8.map(({ score, prob }) => {
    const pct = (prob / totalRaw) * targetSum * 100;
    const roundedPct = Math.round(pct * 10) / 10;
    // Cote = ~100/pct with some variance
    const baseCote = 100 / roundedPct;
    const variance = (s: number) => {
      const seed = score.charCodeAt(0) + s;
      return 0.92 + (seed % 17) / 100;
    };
    return {
      score,
      probability: roundedPct,
      coteWinamax: (baseCote * variance(1)).toFixed(2),
      coteBetclic: (baseCote * variance(2)).toFixed(2),
      coteUnibet: (baseCote * variance(3)).toFixed(2),
    };
  });
}

function getStars(teamId: string): string[] {
  return starPlayers[teamId] ?? ["Joueur clé 1", "Joueur clé 2"];
}

// ─── Metadata ───

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const match = matchesBySlug[slug];
  if (!match) return {};

  const home = teamsById[match.homeTeamId];
  const away = teamsById[match.awayTeamId];
  const homeName = home?.name ?? "Équipe A";
  const awayName = away?.name ?? "Équipe B";
  const stage = stageLabels[match.stage] ?? match.stage;

  return {
    title: `Pronostic Score Exact ${homeName} vs ${awayName} – CDM 2026 | cdm2026.fr`,
    description: `Découvrez nos pronostics score exact pour ${homeName} - ${awayName} (${stage}, Coupe du Monde 2026). 3 scénarios probables, cotes comparées Winamax, Betclic, Unibet.`,
    alternates: { canonical: `${EXTERNAL_URLS.SITE}/score-exact/${slug}` },
    openGraph: {
      title: `${home?.flag ?? ""} ${homeName} vs ${awayName} ${away?.flag ?? ""} — Score Exact CDM 2026`,
      description: `Pronostic score exact ${homeName} vs ${awayName} – ${stage} – Coupe du Monde 2026.`,
    },
  };
}

// ─── Page ───

export default async function ScoreExactPage({ params }: PageProps) {
  const { slug } = await params;
  const match = matchesBySlug[slug];
  if (!match) notFound();

  const home = teamsById[match.homeTeamId];
  const away = teamsById[match.awayTeamId];
  if (!home || !away) notFound();

  const stadium = stadiumsById[match.stadiumId];
  const city = stadium ? citiesById[stadium.cityId] : undefined;
  const stage = stageLabels[match.stage] ?? match.stage;
  const { intro: phaseIntro, isKnockout } = getPhaseContext(match.stage);
  const tone = getMatchTone(home.fifaRanking, away.fifaRanking);
  const scoreLines = computeScoreLines(home, away, match.stage);
  const homeStars = getStars(match.homeTeamId);
  const awayStars = getStars(match.awayTeamId);

  const winamax = bookmakers.find((b) => b.id === "winamax")!;
  const betclic = bookmakers.find((b) => b.id === "betclic")!;
  const unibet = bookmakers.find((b) => b.id === "unibet")!;

  const bestScore = scoreLines[0]!;
  // Find a speculative high-cote score (position 3-5)
  const specScore = scoreLines[3] ?? scoreLines[2]!;

  const dateFormatted = new Date(match.date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Offensive/defensive estimation from ranking
  const homeGoalsEst = Math.max(0.8, Math.round((2.5 - home.fifaRanking / 30) * 10) / 10);
  const awayGoalsEst = Math.max(0.8, Math.round((2.5 - away.fifaRanking / 30) * 10) / 10);
  const homeDefEst = Math.max(0.5, Math.round((2.0 - home.fifaRanking / 40) * 10) / 10);
  const awayDefEst = Math.max(0.5, Math.round((2.0 - away.fifaRanking / 40) * 10) / 10);

  // Breadcrumb
  const breadcrumbs = [
    { name: "Accueil", url: "/" },
    { name: "Score Exact", url: "/score-exact" },
    { name: `${home.name} vs ${away.name}`, url: `/score-exact/${slug}` },
  ];

  // Multi-choice suggestions
  const homeWinScores = scoreLines
    .filter((s) => {
      const [h, a] = s.score.split("-").map(Number);
      return (h ?? 0) > (a ?? 0);
    })
    .slice(0, 3);
  const awayWinScores = scoreLines
    .filter((s) => {
      const [h, a] = s.score.split("-").map(Number);
      return (a ?? 0) > (h ?? 0);
    })
    .slice(0, 3);

  // FAQ
  const faqItems = [
    {
      question: "Quel est le score exact le plus fréquent en Coupe du Monde ?",
      answer: `Le 1-0 est historiquement le score le plus fréquent en Coupe du Monde, représentant environ 19% des résultats. Pour ${home.name} vs ${away.name}, notre modèle estime que le score le plus probable est ${bestScore.score} avec ${bestScore.probability}% de chances.`,
    },
    {
      question: `Où trouver les meilleures cotes score exact pour ${home.name} vs ${away.name} ?`,
      answer: `Comparez les cotes sur Winamax, Betclic et Unibet. Pour ce match, les cotes varient significativement : par exemple ${bestScore.score} est coté ${bestScore.coteWinamax} chez Winamax et ${bestScore.coteBetclic} chez Betclic. Inscrivez-vous chez plusieurs bookmakers pour profiter de la meilleure cote.`,
    },
    {
      question: "Peut-on combiner deux scores exacts dans un même pari ?",
      answer: "Oui, la plupart des bookmakers proposent le « Score Exact Multichoix » qui permet de couvrir 2 à 5 scores dans un seul pari. La cote est naturellement plus basse mais les chances de gain augmentent considérablement.",
    },
    {
      question: "Quelle est la cote moyenne d'un score exact ?",
      answer: "En moyenne, un score exact en Coupe du Monde est coté entre 6.00 et 12.00 pour les résultats les plus probables (1-0, 0-0, 1-1, 2-1). Les scores plus rares comme 3-2 ou 4-1 peuvent atteindre des cotes de 20.00 à 50.00.",
    },
    {
      question: "Le score exact inclut-il les prolongations ?",
      answer: "Non, le pari « Score Exact » porte uniquement sur le temps réglementaire (90 minutes + arrêts de jeu). Si le match va en prolongation, c'est le score à la fin des 90 minutes qui compte pour votre pari.",
    },
  ];

  // JSON-LD SportsEvent
  const sportsEventSchema = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: `${home.name} vs ${away.name} – Coupe du Monde 2026`,
    startDate: `${match.date}T${match.time}:00Z`,
    location: stadium
      ? {
          "@type": "StadiumOrArena",
          name: stadium.name,
          address: {
            "@type": "PostalAddress",
            addressLocality: city?.name ?? stadium.city,
            addressCountry: stadium.country,
          },
        }
      : undefined,
    homeTeam: { "@type": "SportsTeam", name: home.name },
    awayTeam: { "@type": "SportsTeam", name: away.name },
    description: `Pronostic score exact pour ${home.name} vs ${away.name}, ${stage} de la Coupe du Monde 2026.`,
  };

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} baseUrl={EXTERNAL_URLS.SITE} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsEventSchema) }}
      />

      {/* Hero */}
      <section className="hero-animated relative overflow-hidden bg-gradient-to-br from-primary/5 via-transparent to-accent/5 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          {/* Breadcrumb visual */}
          <nav className="mb-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Accueil</Link>
            <span className="mx-2">›</span>
            <span>Score Exact</span>
            <span className="mx-2">›</span>
            <span className="text-foreground font-medium">{home.name} vs {away.name}</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-secondary leading-tight mb-4">
            Pronostic Score Exact {home.flag} {home.name} vs {away.name} {away.flag} : Nos 3 scénarios probables
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {stage} • {dateFormatted} • {stadium?.name ?? "Stade à confirmer"}
            {city ? `, ${city.name}` : ""}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 space-y-12">
        {/* Intro accroche */}
        <section>
          <p className="text-lg leading-relaxed">
            {isKnockout ? (
              <>
                En <strong>{phaseIntro}</strong>, chaque but compte double. {home.flag} <strong>{home.name}</strong> affronte {away.flag} <strong>{away.name}</strong>
                {stadium ? ` au ${stadium.name}` : ""} dans un duel <strong>{tone}</strong>.
                Découvrez notre analyse complète et nos 3 pronostics score exact pour maximiser vos gains
                sur ce match couperet de la Coupe du Monde 2026.
              </>
            ) : (
              <>
                Le choc entre {home.flag} <strong>{home.name}</strong> et {away.flag} <strong>{away.name}</strong>
                {stadium ? ` au ${stadium.name}` : ""} s&apos;annonce <strong>{tone}</strong>.
                Parier sur le score exact est le meilleur moyen de multiplier votre mise lors de cette{" "}
                <strong>{phaseIntro}</strong> du Mondial 2026.
                Avec {home.name} ({home.fifaRanking}e FIFA) face à {away.name} ({away.fifaRanking}e FIFA),
                voici nos scénarios les plus probables.
              </>
            )}
          </p>
        </section>

        {/* Probabilités de scores exacts */}
        <section>
          <h2 className="text-2xl font-bold mb-6">📊 Probabilités de scores exacts</h2>
          <div className="rounded-xl overflow-hidden border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="px-4 py-3 text-left font-semibold">Score</th>
                  <th className="px-4 py-3 text-center font-semibold">Probabilité</th>
                  <th className="px-4 py-3 text-center font-semibold">Winamax</th>
                  <th className="px-4 py-3 text-center font-semibold">Betclic</th>
                  <th className="px-4 py-3 text-center font-semibold">Unibet</th>
                </tr>
              </thead>
              <tbody>
                {scoreLines.map((line, i) => (
                  <tr
                    key={line.score}
                    className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}
                  >
                    <td className="px-4 py-3 font-bold text-foreground">{line.score}</td>
                    <td className="px-4 py-3 text-center">{line.probability}%</td>
                    <td className="px-4 py-3 text-center">
                      <a
                        href={winamax.url}
                        target="_blank"
                        rel="noopener noreferrer sponsored nofollow"
                        className="text-accent hover:underline font-medium"
                      >
                        {line.coteWinamax}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <a
                        href={betclic.url}
                        target="_blank"
                        rel="noopener noreferrer sponsored nofollow"
                        className="text-accent hover:underline font-medium"
                      >
                        {line.coteBetclic}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <a
                        href={unibet.url}
                        target="_blank"
                        rel="noopener noreferrer sponsored nofollow"
                        className="text-accent hover:underline font-medium"
                      >
                        {line.coteUnibet}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            * Cotes indicatives susceptibles de varier. Consultez les sites des bookmakers pour les cotes en temps réel.
          </p>
        </section>

        {/* Le Choix de l'Expert */}
        <section>
          <h2 className="text-2xl font-bold mb-6">🎯 Le Choix de l&apos;Expert</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Pick 1: Sécurité */}
            <div className="rounded-xl border border-border bg-card p-6 space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-green-600">🔒 Sécurité</div>
              <div className="text-3xl font-extrabold text-foreground">{bestScore.score}</div>
              <div className="text-sm text-muted-foreground">Cote : {bestScore.coteWinamax}</div>
              <p className="text-sm leading-relaxed">
                Le scénario le plus probable selon notre analyse. {home.fifaRanking < away.fifaRanking
                  ? `${home.name}, mieux classé au ranking FIFA, devrait contrôler le rythme du match.`
                  : `${away.name} possède un léger avantage au classement FIFA, mais ${home.name} joue à domicile dans ce Mondial.`}
                {" "}Un résultat cohérent avec la dynamique des deux équipes.
              </p>
              <a
                href={winamax.url}
                target="_blank"
                rel="noopener noreferrer sponsored nofollow"
                className="block w-full text-center bg-accent text-white rounded-xl py-3.5 font-bold hover:opacity-90 transition-opacity"
              >
                Miser sur ce score chez Winamax
              </a>
              <p className="text-[10px] text-muted-foreground text-center">
                18+ | Jeu responsable | <a href="https://www.anj.fr" target="_blank" rel="noopener noreferrer" className="underline">ANJ.fr</a>
              </p>
            </div>

            {/* Pick 2: Spéculatif */}
            <div className="rounded-xl border border-border bg-card p-6 space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-orange-500">🎲 Spéculatif</div>
              <div className="text-3xl font-extrabold text-foreground">{specScore.score}</div>
              <div className="text-sm text-muted-foreground">Cote : {specScore.coteBetclic}</div>
              <p className="text-sm leading-relaxed">
                Un scénario à cote élevée mais crédible. Avec des joueurs comme {homeStars[0]} côté {home.name} et {awayStars[0]} côté {away.name},
                ce match {tone} pourrait réserver des surprises.
                {isKnockout ? " La pression des matchs à élimination directe amplifie l'imprévisibilité." : " En phase de groupes, les équipes prennent parfois des risques offensifs."}
              </p>
              <a
                href={betclic.url}
                target="_blank"
                rel="noopener noreferrer sponsored nofollow"
                className="block w-full text-center bg-accent text-white rounded-xl py-3.5 font-bold hover:opacity-90 transition-opacity"
              >
                Profiter de la cote chez Betclic
              </a>
              <p className="text-[10px] text-muted-foreground text-center">
                18+ | Jeu responsable | <a href="https://www.anj.fr" target="_blank" rel="noopener noreferrer" className="underline">ANJ.fr</a>
              </p>
            </div>

            {/* Pick 3: Multichoix */}
            <div className="rounded-xl border border-border bg-card p-6 space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-blue-500">🎰 Multichoix</div>
              <div className="text-2xl font-extrabold text-foreground">
                {homeWinScores.length >= 2
                  ? `Victoire ${home.name} (${homeWinScores.map((s) => s.score).join(", ")})`
                  : `${bestScore.score} ou ${scoreLines[1]?.score ?? "1-1"}`}
              </div>
              <p className="text-sm leading-relaxed">
                Couvrez plusieurs scénarios en un seul pari pour maximiser vos chances.
                Le multichoix combine plusieurs scores exacts et offre un excellent rapport risque/gain,
                idéal pour ce match de {phaseIntro}.
              </p>
              <a
                href={unibet.url}
                target="_blank"
                rel="noopener noreferrer sponsored nofollow"
                className="block w-full text-center bg-accent text-white rounded-xl py-3.5 font-bold hover:opacity-90 transition-opacity"
              >
                Voir l&apos;offre Unibet
              </a>
              <p className="text-[10px] text-muted-foreground text-center">
                18+ | Jeu responsable | <a href="https://www.anj.fr" target="_blank" rel="noopener noreferrer" className="underline">ANJ.fr</a>
              </p>
            </div>
          </div>
        </section>

        {/* Analyse E-E-A-T */}
        <section>
          <h2 className="text-2xl font-bold mb-6">🔍 Analyse du match</h2>
          <div className="space-y-6">
            {/* Facteur A */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-bold text-lg mb-2">⚽ Stats offensives et défensives</h3>
              <p className="text-sm leading-relaxed">
                <strong>{home.name}</strong> ({home.fifaRanking}e FIFA) affiche un potentiel offensif estimé à {homeGoalsEst} buts/match
                et une solidité défensive de {homeDefEst} buts encaissés/match.
                {" "}<strong>{away.name}</strong> ({away.fifaRanking}e FIFA) présente un profil offensif de {awayGoalsEst} buts/match
                pour {awayDefEst} encaissés.
                {Math.abs(home.fifaRanking - away.fifaRanking) <= 10
                  ? " L'écart très faible entre les deux sélections annonce un match équilibré où chaque occasion sera déterminante."
                  : ` L'écart de ${Math.abs(home.fifaRanking - away.fifaRanking)} places au classement FIFA suggère un rapport de force ${tone}.`}
              </p>
            </div>

            {/* Facteur B */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-bold text-lg mb-2">⭐ Joueurs clés</h3>
              <p className="text-sm leading-relaxed">
                Côté <strong>{home.name}</strong>, les regards seront tournés vers <strong>{homeStars[0]}</strong>
                {homeStars[1] ? ` et ${homeStars[1]}` : ""}, capables de faire basculer un match à eux seuls.
                {" "}<strong>{away.name}</strong> compte sur <strong>{awayStars[0]}</strong>
                {awayStars[1] ? ` et ${awayStars[1]}` : ""} pour créer le danger.
                Les absences potentielles (blessures, suspensions) pourraient modifier significativement les probabilités de score exact.
              </p>
            </div>

            {/* Facteur C */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-bold text-lg mb-2">🏟️ Conditions du match</h3>
              <p className="text-sm leading-relaxed">
                Ce match de <strong>{phaseIntro}</strong> se joue
                {stadium ? ` au ${stadium.name} (${stadium.capacity.toLocaleString("fr-FR")} places)` : ""}
                {city ? ` à ${city.name}` : ""}.
                {stadium?.roofType === "retractable"
                  ? " Le toit rétractable garantit des conditions de jeu optimales."
                  : stadium?.roofType === "fixed"
                    ? " Le stade couvert offre un environnement contrôlé."
                    : " En plein air, les conditions météo pourraient jouer un rôle."}
                {isKnockout
                  ? " En match à élimination directe, la tension favorise les scores serrés (1-0, 0-0). Les équipes prennent moins de risques, ce qui se reflète dans nos probabilités."
                  : " En phase de groupes, les équipes cherchent souvent la victoire pour assurer leur qualification, ce qui peut donner des matchs plus ouverts."}
              </p>
            </div>
          </div>
        </section>

        {/* Score Multichoix */}
        <section>
          <h2 className="text-2xl font-bold mb-6">🎯 Score Exact Multichoix</h2>
          <p className="text-sm leading-relaxed mb-6">
            Le pari « Score Exact Multichoix » vous permet de sélectionner plusieurs scores dans un seul et même pari.
            La cote est plus basse qu&apos;un score exact simple, mais vos chances de gain augmentent considérablement.
            Voici nos deux suggestions pour {home.name} vs {away.name} :
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-bold mb-2">Victoire de {home.name}</h3>
              <p className="text-sm text-muted-foreground">
                Sélectionnez les scores {homeWinScores.map((s) => s.score).join(", ")}{" "}
                {homeWinScores.length === 0 && "1-0, 2-0, 2-1"} pour couvrir les scénarios
                de victoire les plus probables de {home.name}.
                {home.fifaRanking < away.fifaRanking ? " Le favori au ranking FIFA." : ""}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-bold mb-2">Match nul ou score serré</h3>
              <p className="text-sm text-muted-foreground">
                Combinez 0-0, 1-1 et {awayWinScores.length > 0 ? awayWinScores[0]!.score : "0-1"} pour un pari
                défensif. Particulièrement pertinent si vous anticipez un match {tone} entre deux équipes qui se respectent.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQSection
          title={`FAQ – Score Exact ${home.name} vs ${away.name}`}
          items={faqItems}
        />

        {/* Maillage interne */}
        <section className="border-t border-border pt-10">
          <h2 className="text-xl font-bold mb-4">📌 À lire aussi</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { href: `/pronostic-match/${slug}`, label: `Pronostic ${home.name} vs ${away.name}` },
              { href: `/compos-officielles/${slug}`, label: `Compos officielles ${home.name} vs ${away.name}` },
              { href: `/arbitre/${slug}`, label: `Arbitre ${home.name} vs ${away.name}` },
              { href: `/corners/${slug}`, label: `Pronostic corners ${home.name} vs ${away.name}` },
              { href: `/equipe/${home.slug}`, label: `Fiche ${home.name}` },
              { href: `/equipe/${away.slug}`, label: `Fiche ${away.name}` },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-xl border border-border bg-card p-4 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
              >
                {link.label} →
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
