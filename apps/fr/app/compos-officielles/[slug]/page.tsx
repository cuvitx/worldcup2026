import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { matches, matchesBySlug } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { stadiumsById } from "@repo/data/stadiums";
import { stageLabels } from "@repo/data/constants";
import { notFound } from "next/navigation";
import { Users, ArrowRight, ShieldAlert, UserX, ClipboardList } from "lucide-react";

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
    title: `Compo officielle ${homeName} - ${awayName} | ${stage} CDM 2026`,
    description: `Composition officielle de ${homeName} vs ${awayName}, ${stage} de la Coupe du Monde 2026. Titulaires, remplaçants et absents.`,
    openGraph: {
      title: `Compo ${homeName} vs ${awayName} - CDM 2026`,
      description: `Les 11 titulaires, remplaçants et absents pour ${homeName} - ${awayName}.`,
    },
    alternates: {
      canonical: `https://www.cdm2026.fr/compos-officielles/${slug}`,
    },
  };
}

function FormationPitch({ teamName, flag, formation }: { teamName: string; flag?: string; formation: string }) {
  const rows = formation.split("-").map(Number);
  // 4-3-3 default display
  const positionLabels = [
    ["Gardien"],
    ["Latéral D", "Défenseur C", "Défenseur C", "Latéral G"],
    ["Milieu", "Milieu", "Milieu"],
    ["Ailier D", "Attaquant", "Ailier G"],
  ];

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden">
      <div className="bg-[#022149] text-white px-4 py-3 font-bold flex items-center gap-2">
        {flag && <span>{flag}</span>}
        {teamName} — {formation}
      </div>
      <div className="bg-gradient-to-b from-green-800 to-green-700 p-4 min-h-[320px] flex flex-col justify-between gap-3">
        {positionLabels.map((row, rowIdx) => (
          <div key={rowIdx} className="flex justify-center gap-2">
            {row.map((pos, posIdx) => (
              <div
                key={posIdx}
                className="bg-white/20 backdrop-blur rounded-lg px-2 py-2 text-center min-w-[70px]"
              >
                <div className="w-8 h-8 rounded-full bg-white/30 mx-auto mb-1 flex items-center justify-center text-white text-xs font-bold">
                  ?
                </div>
                <p className="text-white text-[10px] leading-tight">À confirmer</p>
                <p className="text-white/60 text-[9px]">{pos}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="bg-gray-50 px-4 py-2 text-center text-xs text-gray-500">
        Composition à confirmer 1h avant le coup d&apos;envoi
      </div>
    </div>
  );
}

export default async function ComposOfficiellesPage({ params }: PageProps) {
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
      question: `Quand sera connue la compo de ${homeName} vs ${awayName} ?`,
      answer: `Les compositions officielles sont généralement annoncées 1 heure avant le coup d'envoi. Nous mettrons à jour cette page dès leur publication par la FIFA.`,
    },
    {
      question: "Combien de remplaçants sont autorisés en CDM 2026 ?",
      answer:
        "La FIFA autorise 26 joueurs dans chaque effectif, avec 15 remplaçants sur la feuille de match. Chaque équipe peut effectuer 5 remplacements (en 3 fenêtres + la mi-temps).",
    },
    {
      question: `Quel est le système de jeu habituel de ${homeName} ?`,
      answer: `Le système tactique sera confirmé avec la composition officielle. En attendant, nous affichons un 4-3-3 par défaut, l'une des formations les plus courantes en Coupe du Monde.`,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${homeName} vs ${awayName} - ${stage} CDM 2026`,
    startDate: `${match.date}T${match.time}:00Z`,
    location: {
      "@type": "Place",
      name: stadium?.name ?? "Stade à confirmer",
    },
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    description: `Composition officielle pour ${homeName} vs ${awayName}, ${stage} de la Coupe du Monde 2026.`,
  };

  return (
    <>
<script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-sm text-white/60 mb-2">{stage} — {dateStr}</p>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            Compo officielle :{" "}
            <span className="text-accent">
              {homeName} vs {awayName}
            </span>
          </h1>
          <p className="text-white/80">
            {stadium?.name ?? "Stade à confirmer"} — {match.time} UTC
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-12 space-y-12">
        {/* Formations */}
        <section>
          <h2 className="text-2xl font-bold text-[#022149] mb-6 flex items-center gap-2">
            <Users className="h-6 w-6 text-[#00B865]" />
            Compositions probables (4-3-3)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormationPitch teamName={homeName} flag={home?.flag} formation="4-3-3" />
            <FormationPitch teamName={awayName} flag={away?.flag} formation="4-3-3" />
          </div>
        </section>

        {/* Remplaçants */}
        <section>
          <h2 className="text-2xl font-bold text-[#022149] mb-4 flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-[#00B865]" />
            Remplaçants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: homeName, flag: home?.flag },
              { name: awayName, flag: away?.flag },
            ].map((team) => (
              <div key={team.name} className="rounded-xl border border-gray-200 p-4">
                <h3 className="font-bold text-[#022149] mb-3">
                  {team.flag && <span className="mr-1">{team.flag}</span>}
                  {team.name}
                </h3>
                <div className="space-y-2">
                  {Array.from({ length: 7 }, (_, i) => (
                    <div key={i} className="flex items-center gap-3 py-1.5 border-b border-gray-100 last:border-0">
                      <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500 font-bold">
                        ?
                      </span>
                      <span className="text-sm text-gray-400">Remplaçant {i + 1} — à confirmer</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Absents / Blessés */}
        <section>
          <h2 className="text-2xl font-bold text-[#022149] mb-4 flex items-center gap-2">
            <UserX className="h-6 w-6 text-red-500" />
            Absents et blessés
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[homeName, awayName].map((teamName) => (
              <div key={teamName} className="rounded-xl border border-gray-200 p-4">
                <h3 className="font-bold text-[#022149] mb-3">{teamName}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-400 py-4">
                  <ShieldAlert className="h-5 w-5" />
                  Aucun absent confirmé pour le moment
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lien vers match */}
        <section className="text-center py-8">
          <Link
            href={`/match/${slug}`}
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-8 font-bold text-lg hover:opacity-90 transition"
          >
            Voir la page du match
            <ArrowRight className="h-5 w-5" />
          </Link>
        </section>

        <FAQSection title="Questions sur la composition" items={faqItems} />

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
