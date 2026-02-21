import type { Metadata } from "next";
import { FAQSection } from "@repo/ui/faq-section";
import { Clock, Globe, Moon, Sun } from "lucide-react";

export const metadata: Metadata = {
  title: "Décalage horaire CDM 2026 - Horaires des matchs en heure française",
  description:
    "Tous les fuseaux horaires des villes hôtes de la CDM 2026. Tableau de conversion heure locale → heure de Paris. Conseils pour suivre les matchs tardifs.",
  openGraph: {
    title: "Décalage horaire CDM 2026 - Heures des matchs en France",
    description: "Convertissez les horaires des matchs CDM 2026 en heure française.",
    url: "https://www.cdm2026.fr/voyage/decalage-horaire",
  },
  alternates: { canonical: "https://www.cdm2026.fr/voyage/decalage-horaire" },
};

const villes = [
  { ville: "New York / East Rutherford", pays: "🇺🇸", fuseau: "UTC-4 (EDT)", diff: "-6h", ex13: "19h00", ex16: "22h00", ex19: "01h00+1" },
  { ville: "Miami", pays: "🇺🇸", fuseau: "UTC-4 (EDT)", diff: "-6h", ex13: "19h00", ex16: "22h00", ex19: "01h00+1" },
  { ville: "Atlanta", pays: "🇺🇸", fuseau: "UTC-4 (EDT)", diff: "-6h", ex13: "19h00", ex16: "22h00", ex19: "01h00+1" },
  { ville: "Philadelphie", pays: "🇺🇸", fuseau: "UTC-4 (EDT)", diff: "-6h", ex13: "19h00", ex16: "22h00", ex19: "01h00+1" },
  { ville: "Boston / Foxborough", pays: "🇺🇸", fuseau: "UTC-4 (EDT)", diff: "-6h", ex13: "19h00", ex16: "22h00", ex19: "01h00+1" },
  { ville: "Toronto", pays: "🇨🇦", fuseau: "UTC-4 (EDT)", diff: "-6h", ex13: "19h00", ex16: "22h00", ex19: "01h00+1" },
  { ville: "Houston", pays: "🇺🇸", fuseau: "UTC-5 (CDT)", diff: "-7h", ex13: "20h00", ex16: "23h00", ex19: "02h00+1" },
  { ville: "Dallas", pays: "🇺🇸", fuseau: "UTC-5 (CDT)", diff: "-7h", ex13: "20h00", ex16: "23h00", ex19: "02h00+1" },
  { ville: "Kansas City", pays: "🇺🇸", fuseau: "UTC-5 (CDT)", diff: "-7h", ex13: "20h00", ex16: "23h00", ex19: "02h00+1" },
  { ville: "Mexico", pays: "🇲🇽", fuseau: "UTC-6 (CST)", diff: "-7h", ex13: "20h00", ex16: "23h00", ex19: "02h00+1" },
  { ville: "Guadalajara", pays: "🇲🇽", fuseau: "UTC-6 (CST)", diff: "-7h", ex13: "20h00", ex16: "23h00", ex19: "02h00+1" },
  { ville: "Monterrey", pays: "🇲🇽", fuseau: "UTC-6 (CST)", diff: "-7h", ex13: "20h00", ex16: "23h00", ex19: "02h00+1" },
  { ville: "Denver", pays: "🇺🇸", fuseau: "UTC-6 (MDT)", diff: "-8h", ex13: "21h00", ex16: "00h00+1", ex19: "03h00+1" },
  { ville: "San Francisco", pays: "🇺🇸", fuseau: "UTC-7 (PDT)", diff: "-9h", ex13: "22h00", ex16: "01h00+1", ex19: "04h00+1" },
  { ville: "Los Angeles", pays: "🇺🇸", fuseau: "UTC-7 (PDT)", diff: "-9h", ex13: "22h00", ex16: "01h00+1", ex19: "04h00+1" },
  { ville: "Seattle", pays: "🇺🇸", fuseau: "UTC-7 (PDT)", diff: "-9h", ex13: "22h00", ex16: "01h00+1", ex19: "04h00+1" },
  { ville: "Vancouver", pays: "🇨🇦", fuseau: "UTC-7 (PDT)", diff: "-9h", ex13: "22h00", ex16: "01h00+1", ex19: "04h00+1" },
];

const faqItems = [
  {
    question: "À quelle heure sont les matchs de la CDM 2026 en France ?",
    answer:
      "La plupart des matchs débuteront entre 19h00 et 02h00 heure de Paris. Les matchs sur la côte Est (New York, Miami) seront les plus accessibles (19h-01h), tandis que les matchs sur la côte Ouest (LA, San Francisco) pourront débuter à 22h ou plus tard.",
  },
  {
    question: "La finale sera-t-elle en prime time en France ?",
    answer:
      "Oui. La finale au MetLife Stadium (New York) est prévue à 16h00 heure locale, soit 22h00 heure de Paris — un créneau idéal pour le public européen.",
  },
  {
    question: "Les matchs au Mexique sont-ils à des heures raisonnables pour la France ?",
    answer:
      "Les matchs au Mexique (Mexico, Guadalajara, Monterrey) ont un décalage de -7h avec Paris. Un match à 13h locale sera à 20h à Paris, ce qui reste correct. En revanche, un match à 19h locale correspondra à 02h du matin en France.",
  },
];

export default function DecalageHorairePage() {
  return (
    <>

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <Clock className="h-4 w-4 text-accent" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">
              Guide pratique
            </span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            <span className="text-accent">Décalage horaire</span> CDM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Tous les fuseaux horaires des 16 villes hôtes et les horaires des matchs
            convertis en heure de Paris.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 space-y-12">
        {/* Info */}
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 flex gap-3">
          <Globe className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
          <p className="text-sm text-blue-800">
            Pendant la CDM 2026 (11 juin - 19 juillet), l&apos;Amérique du Nord est en heure d&apos;été.
            La France est en CEST (UTC+2). Les décalages ci-dessous tiennent compte de ces ajustements.
          </p>
        </div>

        {/* Table */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Tableau des fuseaux horaires par ville
          </h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-3 py-3 text-left">Ville</th>
                  <th className="px-3 py-3 text-left">Fuseau</th>
                  <th className="px-3 py-3 text-center">Diff. Paris</th>
                  <th className="px-3 py-3 text-center" title="Match à 13h locale">13h loc.</th>
                  <th className="px-3 py-3 text-center" title="Match à 16h locale">16h loc.</th>
                  <th className="px-3 py-3 text-center" title="Match à 19h locale">19h loc.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {villes.map((v) => (
                  <tr key={v.ville} className="hover:bg-gray-50">
                    <td className="px-3 py-2.5 font-medium text-gray-900 whitespace-nowrap">
                      {v.pays} {v.ville}
                    </td>
                    <td className="px-3 py-2.5 text-gray-500 text-xs">{v.fuseau}</td>
                    <td className="px-3 py-2.5 text-center font-semibold text-primary">{v.diff}</td>
                    <td className="px-3 py-2.5 text-center text-gray-700">{v.ex13}</td>
                    <td className="px-3 py-2.5 text-center text-gray-700">{v.ex16}</td>
                    <td className="px-3 py-2.5 text-center text-gray-700">{v.ex19}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            « +1 » indique le lendemain en heure de Paris. Horaires pendant l&apos;heure d&apos;été (CEST, UTC+2).
          </p>
        </section>

        {/* Conseils */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Conseils pour suivre les matchs tardifs
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center gap-2 mb-2">
                <Moon className="h-5 w-5 text-accent" />
                <h3 className="font-semibold text-gray-900">Matchs de nuit (23h-02h)</h3>
              </div>
              <p className="text-sm text-gray-600">
                Pour les matchs en soirée locale sur la côte Ouest ou au Mexique,
                prévoyez une sieste en fin d&apos;après-midi. Préparez café et en-cas.
                Les matchs les plus importants (phases finales) seront généralement
                programmés sur la côte Est pour le prime time européen.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center gap-2 mb-2">
                <Sun className="h-5 w-5 text-accent" />
                <h3 className="font-semibold text-gray-900">Matchs accessibles (19h-22h)</h3>
              </div>
              <p className="text-sm text-gray-600">
                Les matchs de 13h heure locale sur la côte Est (19h à Paris) sont
                idéaux. Les phases finales et la finale (22h à Paris) offrent un
                créneau parfait. Privilégiez les matchs de la côte Est si vous
                devez choisir.
              </p>
            </div>
          </div>
        </section>

        <FAQSection items={faqItems} />
      </div>
    </>
  );
}
