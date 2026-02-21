import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { Calendar, ArrowRight, Ticket, Building2 } from "lucide-react";
import { stadiums, stadiumsBySlug } from "@repo/data/stadiums";
import { matchesByStadium } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { stageLabels } from "@repo/data/constants";
export const dynamicParams = false;

export async function generateStaticParams() {
  return stadiums.map((s) => ({ slug: s.slug }));
}

interface PageProps { params: Promise<{ slug: string }>; }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const stadium = stadiumsBySlug[slug];
  if (!stadium) return {};
  const matchCount = (matchesByStadium[stadium.id] ?? []).length;
  return {
    title: `Tous les matchs au ${stadium.name} — CDM 2026`,
    description: `${matchCount} matchs programmés au ${stadium.name} (${stadium.city}) pour la Coupe du Monde 2026. Calendrier complet, horaires et équipes.`,
    alternates: { canonical: `https://www.cdm2026.fr/matchs-au-stade/${slug}` },
  };
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00Z");
  return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export default async function MatchsAuStadePage({ params }: PageProps) {
  const { slug } = await params;
  const stadium = stadiumsBySlug[slug];
  if (!stadium) notFound();

  const stadiumMatches = matchesByStadium[stadium.id] ?? [];
  const breadcrumbItems = [
    { name: "Accueil", url: "/" },
    { name: "Stades", url: "/stades" },
    { name: `Matchs au ${stadium.name}`, url: `/matchs-au-stade/${slug}` },
  ];

  const faqItems = [
    { question: `Combien de matchs sont prévus au ${stadium.name} ?`, answer: `${stadiumMatches.length} matchs de la Coupe du Monde 2026 se joueront au ${stadium.name} à ${stadium.city}.` },
    { question: `Quelle est la capacité du ${stadium.name} ?`, answer: `Le ${stadium.name} peut accueillir ${stadium.capacity.toLocaleString("fr-FR")} spectateurs en configuration Coupe du Monde.` },
    { question: "Comment acheter des billets ?", answer: "Les billets sont disponibles exclusivement sur le site officiel FIFA.com/tickets. Méfiez-vous des revendeurs non autorisés." },
  ];

  return (
    <>
{/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <Breadcrumb transparent items={[{ label: "Accueil", href: "/" }, { label: "Stades", href: "/stades" }, { label: `Matchs au ${stadium.name}` }]} />
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-4">
            <Calendar className="inline w-8 h-8 mr-2" />
            Tous les matchs au {stadium.name} — CDM 2026
          </h1>
          <p className="text-accent mt-3 text-lg">
            {stadium.city}, {stadium.country} • {stadiumMatches.length} matchs programmés
          </p>
        </div>
      </section>

      {/* Infos stade */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <Building2 className="w-6 h-6 text-accent mx-auto mb-2" />
            <div className="text-2xl font-extrabold text-primary">{stadium.capacity.toLocaleString("fr-FR")}</div>
            <div className="text-sm text-accent">Capacité</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <Calendar className="w-6 h-6 text-accent mx-auto mb-2" />
            <div className="text-2xl font-extrabold text-primary">{stadium.yearBuilt}</div>
            <div className="text-sm text-accent">Année de construction</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <Ticket className="w-6 h-6 text-accent mx-auto mb-2" />
            <div className="text-2xl font-extrabold text-primary">{stadiumMatches.length}</div>
            <div className="text-sm text-accent">Matchs CDM 2026</div>
          </div>
        </div>

        {/* Tableau des matchs */}
        <h2 className="text-2xl font-bold text-primary mb-4">Programme des matchs</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-xl border border-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold">Date</th>
                <th className="text-center p-3 font-semibold">Heure (UTC)</th>
                <th className="text-center p-3 font-semibold">Match</th>
                <th className="text-center p-3 font-semibold">Phase</th>
                <th className="text-center p-3 font-semibold">Lien</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stadiumMatches.map((match) => {
                const home = teamsById[match.homeTeamId];
                const away = teamsById[match.awayTeamId];
                return (
                  <tr key={match.id}>
                    <td className="p-3 whitespace-nowrap">{formatDate(match.date)}</td>
                    <td className="text-center p-3">{match.time}</td>
                    <td className="text-center p-3 font-semibold">
                      {home?.name ?? match.homeTeamId} vs {away?.name ?? match.awayTeamId}
                    </td>
                    <td className="text-center p-3">
                      <span className="bg-gray-100 text-primary text-xs font-medium px-2 py-1 rounded-full">
                        {stageLabels[match.stage] ?? match.stage}{match.group ? ` (${match.group})` : ""}
                      </span>
                    </td>
                    <td className="text-center p-3">
                      <Link href={`/match/${match.slug}`} className="text-primary hover:underline font-medium">
                        Voir →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {stadiumMatches.length === 0 && (
          <p className="text-accent text-center py-8">Le programme des matchs pour ce stade sera annoncé prochainement.</p>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-primary mb-4">Acheter vos billets</h3>
          <p className="text-gray-600 mb-6">
            Réservez vos places pour les matchs au {stadium.name} sur le site officiel FIFA.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/billets" className="bg-accent text-white rounded-xl py-3.5 px-6 font-semibold inline-flex items-center justify-center gap-2">
              <Ticket className="w-4 h-4" /> Infos billets
            </Link>
            <Link href={`/stade/${slug}`} className="bg-primary text-white rounded-xl py-3.5 px-6 font-semibold inline-flex items-center justify-center gap-2">
              <Building2 className="w-4 h-4" /> Guide du stade
            </Link>
          </div>
        </div>
      </section>

      <FAQSection title={`Questions fréquentes — Matchs au ${stadium.name}`} items={faqItems} />
    </>
  );
}
