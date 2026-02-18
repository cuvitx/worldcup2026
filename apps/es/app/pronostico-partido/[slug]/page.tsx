import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { AiExpertInsight } from "@repo/ui/ai-expert-insight";
import { generateFullMatchPreview } from "@repo/ai/generators";
import { domains } from "@repo/data/route-mapping";
import { getAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { teamsById } from "@repo/data/teams";
import { matches } from "@repo/data/matches";
import { matchPredictionByPair, predictionsByTeamId } from "@repo/data/predictions";
import { h2hByPair } from "@repo/data/h2h";
import { stadiumsById } from "@repo/data/stadiums";
import { citiesById } from "@repo/data/cities";
import {
  bookmakers,
  featuredBookmaker,
  estimatedMatchOdds,
} from "@repo/data/affiliates";
import Link from "next/link";
import {
  MatchHero,
  PredictionOutcomes,
  PredictedScore,
  OddsTable,
  BettingCta,
  MatchAnalysis,
  H2HSection,
  MatchInfo,
  PredictionSidebar,
} from "./components";

export const revalidate = 300;

interface PageProps {
  params: Promise<{ slug: string }>;
}

const stageLabels: Record<string, string> = {
  group: "Fase de grupos",
  "round-of-32": "Dieciseisavos",
  "round-of-16": "Octavos de final",
  "quarter-final": "Cuartos de final",
  "semi-final": "Semifinal",
  "third-place": "Tercer puesto",
  final: "Final",
};

export async function generateStaticParams() {
  return matches.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const match = matches.find((m) => m.slug === slug);
  if (!match) return {};

  const home = teamsById[match.homeTeamId];
  const away = teamsById[match.awayTeamId];

  const homeName = home?.name ?? "Por determinar";
  const awayName = away?.name ?? "Por determinar";

  return {
    title: `Pronostico ${homeName} vs ${awayName} | Cuotas & Prediccion Mundial 2026`,
    description: `Pronostico ${homeName} vs ${awayName} Copa del Mundo 2026: cuotas estimadas, resultado predicho, analisis del partido e historial de enfrentamientos. Apuesta por ${homeName} - ${awayName} Mundial 2026.`,
    openGraph: {
      title: `${home?.flag ?? ""} Pronostico ${homeName} vs ${awayName} ${away?.flag ?? ""} | Mundial 2026`,
      description: `Cuotas, prediccion y analisis del partido ${homeName} - ${awayName}. Copa del Mundo 2026.`,
    },
    alternates: getAlternates("predictionMatch", slug, "es"),
  };
}

export default async function PronosticMatchPage({ params }: PageProps) {
  const { slug } = await params;
  const match = matches.find((m) => m.slug === slug);
  if (!match) notFound();

  const home = teamsById[match.homeTeamId];
  const away = teamsById[match.awayTeamId];
  const stadium = stadiumsById[match.stadiumId];
  const city = stadium ? citiesById[stadium.cityId] : null;
  const stage = stageLabels[match.stage] ?? match.stage;

  // Predictions
  const prediction =
    home && away
      ? matchPredictionByPair[`${home.id}:${away.id}`]
      : undefined;
  const predHome = home ? predictionsByTeamId[home.id] : undefined;
  const predAway = away ? predictionsByTeamId[away.id] : undefined;

  // Estimated odds
  const odds = prediction
    ? estimatedMatchOdds(
        prediction.team1WinProb,
        prediction.drawProb,
        prediction.team2WinProb
      )
    : null;

  // H2H
  const h2h =
    home && away ? h2hByPair[`${home.id}:${away.id}`] : undefined;

  // AI-enriched data
  let enriched: Awaited<ReturnType<typeof generateFullMatchPreview>> | null = null;
  try {
    enriched = await generateFullMatchPreview(slug, "es", {
      includeExpert: true,
    });
  } catch {
    // AI generation failed — page renders with static data only
  }

  // Date formatting
  const dateFormatted = new Date(match.date).toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const homeName = home?.name ?? "Por determinar";
  const awayName = away?.name ?? "Por determinar";

  // Find the most likely outcome
  const outcomes = prediction
    ? [
        { key: "1", label: `Victoria ${homeName}`, prob: prediction.team1WinProb },
        { key: "X", label: "Empate", prob: prediction.drawProb },
        { key: "2", label: `Victoria ${awayName}`, prob: prediction.team2WinProb },
      ]
    : [];
  const maxProb = Math.max(...outcomes.map((o) => o.prob));

  // Related matches (same matchday or group)
  const relatedMatches = matches.filter(
    (m) =>
      m.id !== match.id &&
      ((match.group && m.group === match.group) ||
        (match.matchday && m.matchday === match.matchday && m.stage === "group"))
  ).slice(0, 6);

  return (
    <>
      <BreadcrumbSchema items={[{name:"Inicio",url:"/"}, {name:"Calendario",url:"/match/calendario"}, {name:"Pronostico",url:`/pronostico-partido/${match.slug}`}]} baseUrl={domains.es} />
      {/* Breadcrumb */}
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-primary">
                Inicio
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/match/calendario" className="hover:text-primary">
                Calendario
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">
              Pronostico {homeName} vs {awayName}
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <MatchHero
        home={home}
        away={away}
        match={match}
        stadium={stadium}
        city={city ?? null}
        stage={stage}
        homeName={homeName}
        awayName={awayName}
        dateFormatted={dateFormatted}
      />

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">
            {/* 1X2 Prediction */}
            {prediction && (
              <PredictionOutcomes
                outcomes={outcomes}
                maxProb={maxProb}
                homeName={homeName}
                awayName={awayName}
              />
            )}

            {/* Resultado exacto predicho */}
            {prediction && (
              <PredictedScore
                prediction={prediction}
                home={home}
                away={away}
                homeName={homeName}
                awayName={awayName}
              />
            )}

            {/* Cuotas estimadas */}
            {odds && (
              <OddsTable
                odds={odds}
                homeName={homeName}
                awayName={awayName}
                bookmakers={bookmakers}
              />
            )}

            {/* Affiliate CTA Block */}
            <BettingCta
              featuredBookmaker={featuredBookmaker}
              bookmakers={bookmakers}
            />

            {/* Analisis del partido */}
            {home && away && prediction && (
              <MatchAnalysis
                match={match}
                home={home}
                away={away}
                prediction={prediction}
                predHome={predHome}
                predAway={predAway}
                h2h={h2h}
                stage={stage}
                homeName={homeName}
                awayName={awayName}
                dateFormatted={dateFormatted}
                stadium={stadium}
              />
            )}

            {/* Expert AI Analysis */}
            {enriched?.expert && (
              <AiExpertInsight
                valueBets={enriched.expert.valueBets}
                matchAnalysis={enriched.expert.matchAnalysis}
                scorePrediction={enriched.expert.scorePrediction}
                keyInsight={enriched.expert.keyInsight}
                locale="es"
              />
            )}

            {/* Historial H2H */}
            {home && away && (
              <H2HSection
                home={home}
                away={away}
                h2h={h2h}
                homeName={homeName}
                awayName={awayName}
              />
            )}

            {/* Info del partido */}
            <MatchInfo
              match={match}
              stadium={stadium}
              city={city ?? null}
              stage={stage}
              dateFormatted={dateFormatted}
            />
          </div>

          {/* Sidebar */}
          <PredictionSidebar
            prediction={prediction}
            odds={odds}
            home={home}
            away={away}
            match={match}
            stadium={stadium}
            city={city ?? null}
            homeName={homeName}
            awayName={awayName}
            enriched={enriched}
            featuredBookmaker={featuredBookmaker}
            relatedMatches={relatedMatches}
          />
        </div>
      </div>

      {/* JSON-LD SportsEvent */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsEvent",
            name: `${homeName} vs ${awayName} - Copa del Mundo 2026`,
            eventStatus: "https://schema.org/EventScheduled",
            startDate: `${match.date}T${match.time}:00Z`,
            location: stadium
              ? {
                  "@type": "StadiumOrArena",
                  name: stadium.name,
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: stadium.city,
                    addressCountry: stadium.country,
                  },
                }
              : undefined,
            homeTeam: home
              ? { "@type": "SportsTeam", name: home.name }
              : undefined,
            awayTeam: away
              ? { "@type": "SportsTeam", name: away.name }
              : undefined,
            sport: "Football",
            description: `Pronostico y cuotas para ${homeName} vs ${awayName}, ${stage} de la Copa del Mundo 2026.`,
            url: `https://mundial2026.es/pronostico-partido/${match.slug}`,
          }),
        }}
      />
    </>
  );
}
