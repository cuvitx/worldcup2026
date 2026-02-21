import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { RelatedLinks } from "../components/RelatedLinks";
import { TableOfContents } from "@repo/ui";
import { MapPin, Plane, Clock, FileText, Globe, DollarSign } from "lucide-react";

export const metadata: Metadata = {
  title: "Pays Hôtes CDM 2026 : USA, Canada, Mexique - Visa, Transport, Infos Pratiques",
  description:
    "Les 3 pays hôtes de la Coupe du Monde 2026 : États-Unis, Canada et Mexique. Visas, décalage horaire, transport et villes hôtes.",
  openGraph: {
    title: "Pays Hôtes CDM 2026 : USA, Canada, Mexique",
    description:
      "Guide complet des pays hôtes : visas, transport, décalage horaire et toutes les infos pratiques pour suivre la CDM 2026.",
    url: "https://www.cdm2026.fr/pays-hotes",
  },
  alternates: {
    canonical: "https://www.cdm2026.fr/pays-hotes",
  },
};

const faqItems = [
  {
    question: "Ai-je besoin d'un visa pour assister à la Coupe du Monde 2026 ?",
    answer: "Cela dépend de votre nationalité et du pays hôte. Les citoyens français peuvent voyager aux États-Unis avec un ESTA (autorisation électronique), au Canada avec une AVE (autorisation de voyage électronique) et au Mexique sans visa pour un séjour touristique de moins de 180 jours. L'ESTA coûte $21 et l'AVE canadienne $7 CAD. Vérifiez les conditions spécifiques à votre nationalité."
  },
  {
    question: "Quel est le décalage horaire avec les pays hôtes ?",
    answer: "Les États-Unis, le Canada et le Mexique couvrent plusieurs fuseaux horaires. Par rapport à la France (UTC+1 hiver, UTC+2 été) : New York (UTC-5) = -6h, Los Angeles (UTC-8) = -9h, Toronto (UTC-5) = -6h, Vancouver (UTC-8) = -9h, Mexico City (UTC-6) = -7h. Les matchs seront souvent retransmis tard le soir ou la nuit en Europe."
  },
  {
    question: "Combien de villes organisent la Coupe du Monde 2026 ?",
    answer: "16 villes organisent la Coupe du Monde 2026 : 11 aux États-Unis (Atlanta, Boston, Dallas, Houston, Kansas City, Los Angeles, Miami, New York/New Jersey, Philadelphie, San Francisco, Seattle), 3 au Mexique (Guadalajara, Mexico City, Monterrey) et 2 au Canada (Toronto, Vancouver)."
  },
  {
    question: "Quelle est la monnaie dans les pays hôtes ?",
    answer: "Chaque pays utilise sa propre monnaie : le Dollar américain (USD, $) aux États-Unis, le Dollar canadien (CAD, $) au Canada et le Peso mexicain (MXN, $) au Mexique. Prévoyez un budget d'environ 100-150 USD par jour (hors logement et billets) pour les repas et transports locaux."
  },
  {
    question: "Comment se déplacer entre les villes hôtes ?",
    answer: "Les distances entre villes sont importantes (ex: New York-Los Angeles = 4 500 km). L'avion est le moyen le plus rapide pour les longues distances (vols intérieurs avec Delta, United, American Airlines). Le train Amtrak existe aux États-Unis mais est lent. La voiture de location est une option pour explorer les régions. Entre pays, l'avion est indispensable."
  },
  {
    question: "Quand faut-il réserver son voyage pour la CDM 2026 ?",
    answer: "Il est recommandé de réserver dès que possible (idéalement 6-12 mois avant le tournoi). Les prix des vols et hôtels augmentent considérablement à mesure que la date approche. Les packages officiels FIFA incluent billets de match + hébergement et sont mis en vente environ 1 an avant le tournoi."
  }
];

export default function PaysHotesPage() {
  return (
    <>
{/* Hero */}
      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-secondary uppercase tracking-widest mb-2">
            Coupe du Monde 2026
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            États-Unis, Canada & Mexique
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto mb-6">
            Trois nations, 16 villes, un tournoi historique. Découvrez tout ce qu'il faut savoir
            sur les pays hôtes de la première Coupe du Monde à 48 équipes.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { val: "3", label: "Pays hôtes" },
              { val: "16", label: "Villes" },
              { val: "104", label: "Matchs" },
              { val: "450M", label: "Population totale" },
            ].map(({ val, label }) => (
              <div key={label} className="rounded-xl bg-white/10 px-6 py-3 min-w-[110px]">
                <div className="text-3xl font-extrabold text-white">{val}</div>
                <div className="text-xs text-gray-200 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:grid lg:grid-cols-[1fr_220px] lg:gap-8">
        <div>
          {/* Intro */}
          <div className="mb-12">
            <h2 id="introduction" className="text-2xl font-bold text-gray-900 mb-4">
              Une organisation continentale historique
            </h2>
            <p className="text-gray-700 mb-3 leading-relaxed">
              La Coupe du Monde 2026 sera la première édition organisée conjointement par trois pays :
              les <strong>États-Unis</strong>, le <strong>Canada</strong> et le <strong>Mexique</strong>.
              C'est également la première fois qu'un Mondial se déroule avec 48 équipes et 104 matchs,
              faisant de cette édition la plus grande de l'histoire.
            </p>
            <p className="text-gray-700 mb-3 leading-relaxed">
              Les États-Unis accueilleront la majorité des rencontres (60 matchs, dont tous les quarts de finale et au-delà),
              tandis que le Canada et le Mexique organiseront chacun 10 matchs de phases de groupes et huitièmes de finale.
              La <strong>finale</strong> se jouera au mythique <strong>MetLife Stadium</strong> de New York/New Jersey le <strong>19 juillet 2026</strong>.
            </p>
          </div>

          {/* Les 3 pays hôtes */}
          <div className="mb-12">
            <h2 id="pays-hotes" className="text-2xl font-bold text-gray-900 mb-6">
              Les trois pays hôtes
            </h2>

            <div className="space-y-6">
              {/* États-Unis */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-5xl">🇺🇸</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      États-Unis
                    </h3>
                    <p className="text-sm text-gray-600">
                      Hôte principal · 60 matchs · Quarts, demi-finales et finale
                    </p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase">Population</span>
                    <p className="text-sm text-gray-900 font-medium">335 millions d'habitants</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase">Monnaie</span>
                    <p className="text-sm text-gray-900 font-medium">Dollar américain (USD, $)</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase">Villes hôtes</span>
                    <p className="text-sm text-gray-900 font-medium">11 villes</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase">Visa</span>
                    <p className="text-sm text-gray-900 font-medium">ESTA ($21, en ligne)</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Les États-Unis accueillent la Coupe du Monde pour la deuxième fois après 1994 (finale au Rose Bowl de Pasadena).
                  Le pays dispose des infrastructures les plus développées avec des stades NFL ultramodernes pouvant accueillir
                  plus de 70 000 spectateurs. Les villes américaines incluent New York/New Jersey (finale), Los Angeles, Miami,
                  Dallas, Atlanta, Seattle, San Francisco, Boston, Philadelphie, Houston et Kansas City.
                </p>
              </div>

              {/* Canada */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-5xl">🇨🇦</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      Canada
                    </h3>
                    <p className="text-sm text-gray-600">
                      Co-organisateur · 10 matchs · Phase de groupes et huitièmes
                    </p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase">Population</span>
                    <p className="text-sm text-gray-900 font-medium">39 millions d'habitants</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase">Monnaie</span>
                    <p className="text-sm text-gray-900 font-medium">Dollar canadien (CAD, $)</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase">Villes hôtes</span>
                    <p className="text-sm text-gray-900 font-medium">2 villes (Toronto, Vancouver)</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase">Visa</span>
                    <p className="text-sm text-gray-900 font-medium">AVE ($7 CAD, en ligne)</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Le Canada organise la Coupe du Monde pour la première fois de son histoire. Les deux villes hôtes,
                  Toronto (BMO Field) et Vancouver (BC Place), offrent une expérience cosmopolite unique avec des infrastructures
                  de qualité. Le Canada est également qualifié pour le tournoi, une première depuis 1986.
                </p>
              </div>

              {/* Mexique */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-5xl">🇲🇽</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      Mexique
                    </h3>
                    <p className="text-sm text-gray-600">
                      Co-organisateur · 10 matchs · Phase de groupes et huitièmes · Match d'ouverture
                    </p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase">Population</span>
                    <p className="text-sm text-gray-900 font-medium">128 millions d'habitants</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase">Monnaie</span>
                    <p className="text-sm text-gray-900 font-medium">Peso mexicain (MXN, $)</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase">Villes hôtes</span>
                    <p className="text-sm text-gray-900 font-medium">3 villes</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase">Visa</span>
                    <p className="text-sm text-gray-900 font-medium">Pas de visa (séjour &lt; 180 jours)</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Le Mexique devient le premier pays à organiser trois Coupes du Monde (1970, 1986, 2026).
                  Le mythique <strong>Estadio Azteca</strong> de Mexico City, qui a vu les sacres de Pelé (1970) et Maradona (1986),
                  accueillera le <strong>match d'ouverture</strong> le 11 juin 2026. Les deux autres villes sont Guadalajara et Monterrey.
                  L'altitude (2 240 m à Mexico) est un avantage considérable pour l'équipe mexicaine.
                </p>
              </div>
            </div>
          </div>

          {/* Infos pratiques */}
          <div className="mb-12">
            <h2 id="infos-pratiques" className="text-2xl font-bold text-gray-900 mb-6">
              Infos pratiques pour voyager
            </h2>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="w-6 h-6 text-accent" />
                  <h3 className="font-bold text-gray-900">Visa & Documents</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span><strong>USA :</strong> ESTA obligatoire ($21, valable 2 ans) — demande en ligne sur <a href="https://esta.cbp.dhs.gov" target="_blank" rel="noopener" className="text-accent hover:underline">esta.cbp.dhs.gov</a></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span><strong>Canada :</strong> AVE obligatoire ($7 CAD, valable 5 ans) — demande sur <a href="https://www.canada.ca/ave" target="_blank" rel="noopener" className="text-accent hover:underline">canada.ca/ave</a></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span><strong>Mexique :</strong> Pas de visa pour les Français (séjour &lt; 180 jours)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Passeport valide au moins 6 mois après la date de retour</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-6 h-6 text-accent" />
                  <h3 className="font-bold text-gray-900">Décalage horaire</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span><strong>New York / Toronto :</strong> -6h (France 18h = 12h local)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span><strong>Mexico City :</strong> -7h (France 18h = 11h local)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span><strong>Los Angeles / Vancouver :</strong> -9h (France 18h = 9h local)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Matchs souvent retransmis tard le soir ou la nuit en Europe</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Plane className="w-6 h-6 text-accent" />
                  <h3 className="font-bold text-gray-900">Transport</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span><strong>Avion :</strong> Paris → New York (~8h), Paris → Los Angeles (~11h)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span><strong>Entre villes :</strong> Vols intérieurs indispensables (grandes distances)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span><strong>Sur place :</strong> Métro (New York, Toronto), Uber/Lyft, location de voiture</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Réservez tôt : prix explosent à l'approche du tournoi</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <DollarSign className="w-6 h-6 text-accent" />
                  <h3 className="font-bold text-gray-900">Budget & Monnaie</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span><strong>Budget jour :</strong> ~100-150 USD (repas + transport local)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span><strong>Hébergement :</strong> 150-400 USD/nuit selon ville et standing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span><strong>Billets match :</strong> 200-2000 USD selon catégorie et phase</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Carte bancaire internationale acceptée partout</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Les 16 villes hôtes */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-7 h-7 text-accent" />
              <h2 id="villes-hotes" className="text-2xl font-bold text-gray-900">
                Les 16 villes hôtes
              </h2>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Ville
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Pays
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Stade
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Matchs
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { ville: "New York/New Jersey", pays: "🇺🇸 USA", stade: "MetLife Stadium", matchs: "Finale + 7 autres" },
                      { ville: "Los Angeles", pays: "🇺🇸 USA", stade: "SoFi Stadium", matchs: "8 matchs" },
                      { ville: "Miami", pays: "🇺🇸 USA", stade: "Hard Rock Stadium", matchs: "7 matchs" },
                      { ville: "Dallas", pays: "🇺🇸 USA", stade: "AT&T Stadium", matchs: "9 matchs" },
                      { ville: "Atlanta", pays: "🇺🇸 USA", stade: "Mercedes-Benz Stadium", matchs: "8 matchs" },
                      { ville: "Seattle", pays: "🇺🇸 USA", stade: "Lumen Field", matchs: "6 matchs" },
                      { ville: "San Francisco", pays: "🇺🇸 USA", stade: "Levi's Stadium", matchs: "6 matchs" },
                      { ville: "Boston", pays: "🇺🇸 USA", stade: "Gillette Stadium", matchs: "7 matchs" },
                      { ville: "Philadelphie", pays: "🇺🇸 USA", stade: "Lincoln Financial Field", matchs: "6 matchs" },
                      { ville: "Houston", pays: "🇺🇸 USA", stade: "NRG Stadium", matchs: "7 matchs" },
                      { ville: "Kansas City", pays: "🇺🇸 USA", stade: "Arrowhead Stadium", matchs: "6 matchs" },
                      { ville: "Mexico City", pays: "🇲🇽 Mexique", stade: "Estadio Azteca", matchs: "Ouverture + 4 autres" },
                      { ville: "Guadalajara", pays: "🇲🇽 Mexique", stade: "Estadio Akron", matchs: "4 matchs" },
                      { ville: "Monterrey", pays: "🇲🇽 Mexique", stade: "Estadio BBVA", matchs: "4 matchs" },
                      { ville: "Toronto", pays: "🇨🇦 Canada", stade: "BMO Field", matchs: "6 matchs" },
                      { ville: "Vancouver", pays: "🇨🇦 Canada", stade: "BC Place", matchs: "7 matchs" },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">
                          {row.ville}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {row.pays}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                          {row.stade}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {row.matchs}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 grid sm:grid-cols-3 gap-4">
            {[
              { href: "/stades", label: "Tous les stades", desc: "16 stades organisateurs" },
              { href: "/villes", label: "Guide des villes", desc: "Découvrir les villes hôtes" },
              { href: "/guide/guide-visa-esta", label: "Guide ESTA & Visa", desc: "Démarches administratives" },
            ].map(({ href, label, desc }) => (
              <Link
                key={href}
                href={href}
                className="flex flex-col gap-2 bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:border-accent/30 hover:shadow-md transition-all group text-center"
              >
                <div className="font-bold text-gray-900 group-hover:text-accent transition-colors">
                  {label}
                </div>
                <div className="text-xs text-gray-600">{desc}</div>
              </Link>
            ))}
          </div>
        </div>

        <TableOfContents items={[
          { id: "introduction", label: "Introduction", level: 2 },
          { id: "pays-hotes", label: "Les 3 pays hôtes", level: 2 },
          { id: "infos-pratiques", label: "Infos pratiques", level: 2 },
          { id: "villes-hotes", label: "16 villes hôtes", level: 2 },
        ]} />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><RelatedLinks variant="compact" title="Pages liées" links={[
          { href: "/villes", title: "Villes hôtes", description: "Guide des 16 villes de la CDM 2026", icon: "" },
          { href: "/stades", title: "Les 16 stades", description: "Stades, capacités et matchs", icon: "" },
          { href: "/format", title: "Format du tournoi", description: "48 équipes, 12 groupes, 104 matchs", icon: "" },
          { href: "/billets", title: "Billets", description: "Acheter ses billets CDM 2026", icon: "" },
          { href: "/guide/guide-visa-esta", title: "Guide Visa/ESTA", description: "Formalités pour voyager aux USA", icon: "" },
        ]} /></div>
      <FAQSection title="Questions sur les pays hôtes" items={faqItems} />

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Pays Hôtes CDM 2026 : USA, Canada, Mexique",
            description: "Guide complet des 3 pays hôtes de la Coupe du Monde 2026 : infos pratiques, visas, transport et villes organisatrices.",
            url: "https://www.cdm2026.fr/pays-hotes",
          }),
        }}
      />
    </>
  );
}
