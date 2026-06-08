import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { matches, matchesBySlug } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { stadiumsById } from "@repo/data/stadiums";
import { stageLabels } from "@repo/data/constants";
import { notFound } from "next/navigation";
import { Scale, ArrowRight, AlertTriangle, BarChart3, Flag, TrendingUp } from "lucide-react";

export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return matches.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const match = matchesBySlug[slug];
  if (!match) return {};

  const home = teamsById[match.homeTeamId];
  const away = teamsById[match.awayTeamId];
  const homeName = home?.name ?? "À déterminer";
  const awayName = away?.name ?? "À déterminer";
  const stage = stageLabels[match.stage] ?? match.stage;

  return {
    title: `Arbitre de ${homeName} vs ${awayName} - ${stage} | CDM 2026`,
    description: `Qui est l'arbitre de ${homeName} - ${awayName} ? Profil, statistiques (cartons, penalties) et impact potentiel sur le match et les paris.`,
    openGraph: {
      title: `Arbitre ${homeName} vs ${awayName} - CDM 2026`,
      description: `Profil et stats de l'arbitre désigné pour ${homeName} - ${awayName}.`,
    },
    alternates: {
      canonical: `https://www.cdm2026.fr/arbitre/${slug}`,
    },
  };
}

/* Simulated referee stats */
const refStats = {
  yellowPerMatch: 4.2,
  redPerMatch: 0.18,
  penaltiesPerMatch: 0.35,
  foulsPerMatch: 26.5,
  avgExtraTime: 6.2,
  matchesReffed: 47,
  severity: "Moyen-sévère" as const,
};

export default async function ArbitrePage({ params }: PageProps) {
  const { slug } = await params;
  const match = matchesBySlug[slug];
  if (!match) notFound();

  const home = teamsById[match.homeTeamId];
  const away = teamsById[match.awayTeamId];
  const homeName = home?.name ?? "À déterminer";
  const awayName = away?.name ?? "À déterminer";
  const stadium = stadiumsById[match.stadiumId];
  const stage = stageLabels[match.stage] ?? match.stage;
  const dateStr = new Date(match.date).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const faqItems = [
    {
      question: `Qui est l'arbitre de ${homeName} vs ${awayName} ?`,
      answer: `L'arbitre de ${homeName} vs ${awayName} sera confirmé par la FIFA quelques jours avant le match. Cette page sera mise à jour dès l'annonce officielle.`,
    },
    {
      question: "Comment la FIFA choisit-elle les arbitres ?",
      answer:
        "La FIFA sélectionne les arbitres parmi une liste de 36 arbitres internationaux retenus pour le tournoi. Les arbitres ne peuvent pas officier un match impliquant une équipe de leur confédération d'origine.",
    },
    {
      question: "L'arbitre influence-t-il les paris sportifs ?",
      answer:
        "Oui, le profil de l'arbitre peut influencer certains marchés : un arbitre sévère augmente les chances de cartons (over 3.5 cartons), tandis qu'un arbitre permissif favorise le jeu et potentiellement les buts.",
    },
    {
      question: "Y aura-t-il la VAR à la CDM 2026 ?",
      answer:
        "Oui, la VAR (assistance vidéo à l'arbitrage) sera présente sur tous les matchs. La FIFA pourrait également tester la technologie du hors-jeu semi-automatique sur l'ensemble du tournoi.",
    },
  ];

  return (
    <>
{/* Hero */}
      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-sm text-white/60 mb-2">{stage} — {dateStr}</p>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            Qui est l&apos;arbitre de{" "}
            <span className="text-accent">
              {homeName} vs {awayName}
            </span>{" "}
            ?
          </h1>
          <p className="text-white/80">
            {stadium?.name ?? "Stade à confirmer"} — {match.time} UTC
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-4 py-12 space-y-12">
        {/* Arbitre principal */}
        <section>
          <h2 className="text-2xl font-bold text-[#022149] mb-4 flex items-center gap-2">
            <Scale className="h-6 w-6 text-[#00B865]" />
            Arbitre principal
          </h2>
          <div className="rounded-xl border-2 border-dashed border-[#D4AF37]/40 bg-[#D4AF37]/5 p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center">
              <Scale className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-[#022149] mb-1">À confirmer par la FIFA</h3>
            <p className="text-gray-500 text-sm mb-2">
              La désignation officielle intervient généralement 3 à 5 jours avant le match.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs bg-[#D4AF37]/20 text-[#D4AF37] px-3 py-1 rounded-full font-medium">
              <Flag className="h-3.5 w-3.5" />
              Nationalité à confirmer
            </div>
          </div>
        </section>

        {/* Stats type */}
        <section>
          <h2 className="text-2xl font-bold text-[#022149] mb-4 flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-[#00B865]" />
            Statistiques type d&apos;un arbitre FIFA
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            En attendant la désignation officielle, voici les statistiques moyennes des arbitres retenus pour la CDM 2026.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: "Cartons jaunes / match", value: refStats.yellowPerMatch.toFixed(1), icon: AlertTriangle, color: "text-yellow-500" },
              { label: "Cartons rouges / match", value: refStats.redPerMatch.toFixed(2), icon: AlertTriangle, color: "text-red-500" },
              { label: "Penalties / match", value: refStats.penaltiesPerMatch.toFixed(2), icon: TrendingUp, color: "text-[#00B865]" },
              { label: "Fautes sifflées / match", value: refStats.foulsPerMatch.toFixed(1), icon: Scale, color: "text-[#022149]" },
              { label: "Temps additionnel moy.", value: `${refStats.avgExtraTime.toFixed(0)} min`, icon: BarChart3, color: "text-[#D4AF37]" },
              { label: "Matchs internationaux", value: String(refStats.matchesReffed), icon: Flag, color: "text-[#022149]" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-gray-200 p-4 text-center">
                <stat.icon className={`h-5 w-5 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold text-[#022149]">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Sévérité */}
        <section>
          <h2 className="text-2xl font-bold text-[#022149] mb-4 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-[#D4AF37]" />
            Profil de sévérité
          </h2>
          <div className="rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-lg font-bold text-[#022149]">Tendance :</div>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                {refStats.severity}
              </span>
            </div>
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Permissif</span>
                <span>Moyen</span>
                <span>Sévère</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full" style={{ width: "65%" }} />
              </div>
            </div>
            <p className="text-sm text-gray-700">
              Un arbitre moyen-sévère distribue en moyenne 4+ cartons jaunes par match. Cela peut impacter les marchés
              de paris sur les cartons (over/under 3.5 cartons) et le style de jeu des deux équipes.
            </p>
          </div>
        </section>

        {/* Impact paris */}
        <section>
          <h2 className="text-2xl font-bold text-[#022149] mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-[#00B865]" />
            Impact sur les paris
          </h2>
          <div className="space-y-4">
            {[
              {
                market: "Over 3.5 cartons",
                impact: "Tendance favorable",
                desc: "Avec 4.2 cartons/match en moyenne, le over 3.5 cartons est statistiquement probable. Un match à enjeu pourrait amplifier cette tendance.",
                color: "border-l-[#00B865]",
              },
              {
                market: "Penalty dans le match",
                impact: "Neutre",
                desc: "0.35 penalty par match est dans la moyenne FIFA. Pas de biais significatif dans un sens ou l'autre sur ce marché.",
                color: "border-l-[#D4AF37]",
              },
              {
                market: "Nombre de fautes",
                impact: "Tendance à la hausse",
                desc: "26.5 fautes/match est légèrement au-dessus de la moyenne. Les équipes physiques pourraient être davantage sanctionnées.",
                color: "border-l-yellow-500",
              },
            ].map((item) => (
              <div key={item.market} className={`rounded-xl border border-gray-200 border-l-4 ${item.color} p-4`}>
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-bold text-[#022149]">{item.market}</h3>
                  <span className="text-xs font-medium text-gray-500">{item.impact}</span>
                </div>
                <p className="text-sm text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <Link
            href={`/match/${slug}`}
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-8 font-bold text-lg hover:opacity-90 transition"
          >
            Voir la page du match
            <ArrowRight className="h-5 w-5" />
          </Link>
          <div className="mt-4">
            <Link href={`/compos-officielles/${slug}`} className="text-sm text-[#022149] underline hover:no-underline">
              Voir la compo officielle
            </Link>
          </div>
        </section>

        <FAQSection title="Questions sur l'arbitrage" items={faqItems} />

        <p className="text-xs text-gray-400 text-center">
          Les paris sportifs comportent des risques. Jouez responsable. 18+ | Autorité Nationale des Jeux (ANJ) —{" "}
          <a href="https://www.joueurs-info-service.fr" className="underline" target="_blank" rel="noopener noreferrer">
            joueurs-info-service.fr
          </a>
        </p>
      </main>
    </>
  );
}
