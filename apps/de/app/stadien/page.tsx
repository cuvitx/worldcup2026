import { HeroSection } from "@repo/ui/hero-section";
import { SectionHeading } from "@repo/ui/section-heading";
import { FAQSection } from "@repo/ui/faq-section";
import { StadiumImage } from "../components/StadiumImage";
import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { stadiums } from "../../lib/localized-data";
import { cities } from "../../lib/localized-data";
import { PmuBanner } from "../components/PmuBanner";
export const metadata: Metadata = {
  title: "Die 16 Stadien der WM 2026 | Kapazität, Stadt & Spiele",
  description:
    "Kompletter Guide der 16 Stadien der WM 2026. Kapazität, Stadt, Land, geplante Spiele und praktische Informationen.",
  alternates: getStaticAlternates("stadiums", "de"),
  openGraph: {
    title: "Die 16 Stadien der WM 2026",
    description: "Guide der 16 Stadien der WM 2026: Kapazität, Stadt und Spiele.",
  },
};

export default function StadiumsPage() {
  const sorted = [...stadiums].sort((a, b) => b.capacity - a.capacity);
  const countries = ["USA", "Canada", "Mexico"] as const;
  const countryLabels: Record<string, string> = {
    USA: "🇺🇸 Vereinigte Staaten",
    Canada: "🇨🇦 Kanada",
    Mexico: "🇲🇽 Mexiko",
  };

  const faqItems = [
    {
      question: "Wie viele Stadien werden die WM 2026 ausrichten?",
      answer: "Die WM 2026 wird in 16 Stadien in 3 Ländern ausgetragen: 11 Stadien in den USA, 3 in Mexiko und 2 in Kanada. Es ist das erste Mal, dass eine WM in 3 verschiedenen Ländern organisiert wird. Die 104 Spiele des Turniers (statt 64 bei früheren Ausgaben) werden auf diese 16 Spielstätten verteilt."
    },
    {
      question: "Welches ist das größte Stadion der WM 2026?",
      answer: "Das MetLife Stadium in New York/New Jersey ist mit einer Kapazität von 82.500 Plätzen das größte Stadion der WM 2026. Es wird am 19. Juli 2026 das Finale des Turniers ausrichten. Dieses ultramoderne Stadion, Heimat der Giants und Jets (NFL), verfügt über modernste Technologien. Es ist eines der bekanntesten Stadien der Vereinigten Staaten."
    },
    {
      question: "Wo wird das Finale der WM 2026 ausgetragen?",
      answer: "Das Finale der WM 2026 findet am Sonntag, den 19. Juli 2026, im MetLife Stadium in East Rutherford, New Jersey (Region New York) statt. Dieses Stadion mit 82.500 Plätzen wurde wegen seiner strategischen Lage (nahe New York), seiner außergewöhnlichen Kapazität und seiner modernen Infrastruktur ausgewählt. Die Halbfinals werden ebenfalls in zwei großen amerikanischen Stadien ausgetragen."
    },
    {
      question: "Wie viele Stadien haben ein Schiebedach?",
      answer: "6 Stadien der WM 2026 verfügen über ein Schiebedach: MetLife Stadium (New York), AT&T Stadium (Dallas), NRG Stadium (Houston), State Farm Stadium (Arizona), Mercedes-Benz Stadium (Atlanta) und BC Place (Vancouver). Diese Dächer ermöglichen es, bei jedem Wetter zu spielen und die Temperatur zu regulieren, was für Sommerspiele in Regionen wie Texas oder Arizona unerlässlich ist."
    },
    {
      question: "Welche mexikanischen Stadien werden die WM 2026 ausrichten?",
      answer: "Mexiko wird Spiele in 3 ikonischen Stadien austragen: Estadio Azteca (Mexiko-Stadt, 87.000 Plätze), Estadio BBVA (Monterrey, 53.500 Plätze) und Estadio Akron (Guadalajara, 46.000 Plätze). Das Estadio Azteca ist besonders legendär: Es ist das einzige Stadion der Welt, das zwei WM-Finals ausgerichtet hat (1970 und 1986). Es wird das Eröffnungsspiel der WM 2026 ausrichten."
    },
    {
      question: "Wie kann man Tickets für die Spiele in den Stadien kaufen?",
      answer: "Der Ticketverkauf für die WM 2026 erfolgt ausschließlich über die offizielle FIFA-Website (FIFA.com/tickets). Die ersten Verkaufsphasen eröffnen Anfang 2026 per Losverfahren, gefolgt von Verkäufen nach dem Prinzip 'Wer zuerst kommt, mahlt zuerst'. Die Preise variieren je nach Stadion, Spielkategorie und Sitzplatzlage. Es wird dringend empfohlen, sich im Voraus auf dem FIFA-Portal zu registrieren, um über Verkaufsstarts informiert zu werden."
    }
  ];

  return (
    <>
<HeroSection
        badge="Infrastruktur"
        title="Die 16 Stadien der WM 2026"
        subtitle="11 Stadien in den USA, 3 in Mexiko und 2 in Kanada werden die 104 Spiele austragen."
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
        {countries.map((country) => {
          const countryStadiums = sorted.filter((s) => s.country === country);
          return (
            <section key={country}>
              <SectionHeading title={`${countryLabels[country]} (${countryStadiums.length} Stadien)`} />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {countryStadiums.map((stadium) => {
                  const city = cities.find((c) => c.id === stadium.cityId);
                  return (
                    <Link
                      key={stadium.id}
                      href={`/stadion/${stadium.slug}`}
                      className="group rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5"
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
                        <p className="font-bold text-gray-900">{stadium.name}</p>
                        <p className="text-sm text-gray-500 mt-1">
                           {city?.name ?? stadium.city}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm font-semibold text-accent">
                             {stadium.capacity.toLocaleString("de-DE")} Plätze
                          </span>
                          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                            {stadium.roofType === "retractable" ? "Schiebedach" : stadium.roofType === "fixed" ? "Festes Dach" : "Offenes Dach"}
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

      {/* PMU Banner */}
      <section className="py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PmuBanner tracking="Stadien" />
        </div>
      </section>

      <FAQSection title=" Fragen zu den Stadien der WM 2026" items={faqItems} />
    </>
  );
}
