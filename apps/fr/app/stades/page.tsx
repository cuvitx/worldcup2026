import { HeroSection } from "@repo/ui/hero-section";
import { SectionHeading } from "@repo/ui/section-heading";
import { FAQSection } from "@repo/ui/faq-section";
import { StadiumImage } from "../components/StadiumImage";
import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { stadiums } from "@repo/data/stadiums";
import { cities } from "@repo/data/cities";
import { Breadcrumb } from "@repo/ui/breadcrumb";
export const metadata: Metadata = {
  title: "Les 16 stades de la Coupe du Monde 2026 | Capacité, Ville & Matchs",
  description:
    "Guide complet des 16 stades de la Coupe du Monde 2026. Capacité, ville, pays, matchs programmés et informations pratiques.",
  alternates: getStaticAlternates("stadiums", "fr"),
  openGraph: {
    title: "Les 16 stades de la Coupe du Monde 2026",
    description: "Guide des 16 stades de la CDM 2026 : capacité, ville et matchs.",
  },
};

export default function StadiumsPage() {
  const sorted = [...stadiums].sort((a, b) => b.capacity - a.capacity);
  const countries = ["USA", "Canada", "Mexico"] as const;
  const countryLabels: Record<string, string> = {
    USA: "🇺🇸 États-Unis",
    Canada: "🇨🇦 Canada",
    Mexico: "🇲🇽 Mexique",
  };

  const faqItems = [
    {
      question: "Combien de stades accueilleront la Coupe du Monde 2026 ?",
      answer: "La Coupe du Monde 2026 se déroulera dans 16 stades répartis sur 3 pays : 11 stades aux États-Unis, 3 au Mexique et 2 au Canada. C'est la première fois qu'une Coupe du Monde est organisée sur 3 pays différents. Les 104 matchs du tournoi (contre 64 pour les éditions précédentes) seront répartis entre ces 16 enceintes."
    },
    {
      question: "Quel est le plus grand stade de la CDM 2026 ?",
      answer: "Le MetLife Stadium de New York/New Jersey est le plus grand stade de la CDM 2026 avec une capacité de 82 500 places. Il accueillera la finale du tournoi le 19 juillet 2026. Ce stade ultramoderne, domicile des Giants et des Jets (NFL), dispose d'un toit rétractable et de technologies de pointe. C'est l'un des stades les plus emblématiques des États-Unis."
    },
    {
      question: "Où se jouera la finale de la Coupe du Monde 2026 ?",
      answer: "La finale de la Coupe du Monde 2026 aura lieu au MetLife Stadium de East Rutherford, dans l'État du New Jersey (région de New York), le dimanche 19 juillet 2026. Ce stade de 82 500 places a été choisi pour son emplacement stratégique (proche de New York), sa capacité exceptionnelle et ses infrastructures modernes. Les demi-finales se joueront également dans deux grandes enceintes américaines."
    },
    {
      question: "Combien de stades ont un toit rétractable ?",
      answer: "6 stades de la CDM 2026 disposent d'un toit rétractable : MetLife Stadium (New York), AT&T Stadium (Dallas), NRG Stadium (Houston), State Farm Stadium (Arizona), Mercedes-Benz Stadium (Atlanta) et BC Place (Vancouver). Ces toits permettent de jouer par tous les temps et de réguler la température, ce qui est essentiel pour les matchs en été dans certaines régions comme le Texas ou l'Arizona."
    },
    {
      question: "Quels stades mexicains accueilleront la CDM 2026 ?",
      answer: "Le Mexique accueillera des matchs dans 3 stades iconiques : l'Estadio Azteca (Mexico, 87 000 places), l'Estadio BBVA (Monterrey, 53 500 places) et l'Estadio Akron (Guadalajara, 46 000 places). L'Estadio Azteca est particulièrement mythique : c'est le seul stade au monde à avoir accueilli deux finales de Coupe du Monde (1970 et 1986). Il accueillera le match d'ouverture de la CDM 2026."
    },
    {
      question: "Comment acheter des billets pour les matchs dans les stades ?",
      answer: "La vente des billets pour la Coupe du Monde 2026 s'effectue exclusivement via le site officiel de la FIFA (FIFA.com/tickets). Les premières phases de vente ouvriront début 2026 par tirage au sort, suivies de ventes en premier arrivé, premier servi. Les prix varient selon le stade, la catégorie de match et l'emplacement des sièges. Il est fortement recommandé de s'inscrire à l'avance sur le portail FIFA pour être informé des ouvertures de vente."
    }
  ];

  return (
    <>
<Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Stades" },
        ]}
      />
<HeroSection
        badge="Infrastructures"
        title="Les 16 stades de la CDM 2026"
        subtitle="11 stades aux États-Unis, 3 au Mexique et 2 au Canada accueilleront les 104 matchs."
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
        {countries.map((country) => {
          const countryStadiums = sorted.filter((s) => s.country === country);
          return (
            <section key={country}>
              <SectionHeading title={`${countryLabels[country]} (${countryStadiums.length} stades)`} />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {countryStadiums.map((stadium) => {
                  const city = cities.find((c) => c.id === stadium.cityId);
                  return (
                    <Link
                      key={stadium.id}
                      href={`/stade/${stadium.slug}`}
                      className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <div className="overflow-hidden">
                        <StadiumImage
                          slug={stadium.slug}
                          name={stadium.name}
                          city={stadium.city}
                          containerClassName="w-full h-44"
                          className="transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <p className="font-bold text-gray-900 dark:text-white">{stadium.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                           {city?.name ?? stadium.city}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm font-semibold text-accent">
                             {stadium.capacity.toLocaleString("fr-FR")} places
                          </span>
                          <span className="rounded-full bg-gray-100 dark:bg-slate-700 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                            {stadium.roofType === "retractable" ? "Toit rétractable" : stadium.roofType === "fixed" ? "Toit fixe" : "Ciel ouvert"}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <FAQSection title="❓ Questions sur les stades de la CDM 2026" items={faqItems} />
    </>
  );
}
