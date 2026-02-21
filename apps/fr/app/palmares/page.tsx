import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import type { Metadata } from "next";

import { editions, countryRecords, records } from "./_components/palmares-data";
import { PalmaresHero } from "./_components/PalmaresHero";
import { PalmaresByCountry } from "./_components/PalmaresByCountry";
import { PalmaresTimeline } from "./_components/PalmaresTimeline";
import { FinalesTable } from "./_components/FinalesTable";
import { RecordsSection } from "./_components/RecordsSection";
import { PalmaresSection2026 } from "./_components/PalmaresSection2026";
import { RelatedLinks } from "../components/RelatedLinks";
export const metadata: Metadata = {
 title: "Palmarès Coupe du Monde FIFA | Historique 1930–2022",
 description:
 "Palmarès complet de la Coupe du Monde FIFA de 1930 à 2022 : vainqueurs, finalistes, scores et records. Qui a le plus de titres ?",
 alternates: {
 canonical: "https://cdm2026.fr/palmares",
 },
 openGraph: {
 title: "Palmarès CDM FIFA 1930–2022",
 description:
 "Tous les champions du Monde depuis 1930 : Brésil 5 titres, Allemagne 4, Italie 4, Argentine 3…",
 url: "https://cdm2026.fr/palmares",
 },
};

export default function PalmaresPage() {
 const faqItems = [
 {
 question: "Qui a gagné le plus de Coupes du Monde ?",
 answer: "Le Brésil est le pays le plus titré de l'histoire de la Coupe du Monde avec 5 victoires (1958, 1962, 1970, 1994, 2002). La Seleção est également la seule équipe à avoir participé à toutes les éditions depuis 1930 sans exception. L'Allemagne et l'Italie suivent avec 4 titres chacune, puis l'Argentine avec 3 titres (1978, 1986, 2022), et enfin la France et l'Uruguay avec 2 titres chacun."
 },
 {
 question: "Quel pays a accueilli le plus de Coupes du Monde ?",
 answer: "5 pays ont accueilli la Coupe du Monde 2 fois : le Mexique (1970, 1986), l'Italie (1934, 1990), la France (1938, 1998), l'Allemagne (1974, 2006) et le Brésil (1950, 2014). En 2026, le Mexique deviendra le premier pays à accueillir 3 Coupes du Monde, en co-organisation avec les États-Unis et le Canada. Cette édition 2026 sera également la première organisée par 3 pays simultanément."
 },
 {
 question: "Quelle est la finale la plus disputée de l'histoire ?",
 answer: "La finale Argentine-France 2022 (3-3 a.p., 4-2 tab) est considérée comme la plus spectaculaire et équilibrée de l'histoire. Kylian Mbappé inscrit un triplé historique (le premier en finale depuis 1966), mais Lionel Messi et l'Argentine remportent le titre aux tirs au but. D'autres finales légendaires incluent Brésil-Italie 1970 (4-1), Allemagne-Hongrie 1954 (3-2, 'Miracle de Berne') et Uruguay-Brésil 1950 (2-1, 'Maracanazo')."
 },
 {
 question: "Combien de pays ont atteint la finale sans jamais gagner ?",
 answer: "4 pays ont atteint la finale de la Coupe du Monde sans jamais la remporter : les Pays-Bas (finaliste en 1974, 1978 et 2010, record de 3 finales perdues), la Hongrie (finaliste en 1938 et 1954), la Tchécoslovaquie (finaliste en 1934 et 1962) et la Croatie (finaliste en 2018). Les Pays-Bas détiennent le triste record du pays le plus malchanceux, perdant toutes ses finales malgré un football de grande qualité."
 },
 {
 question: "Quel est le score le plus lourd en finale de Coupe du Monde ?",
 answer: "Le score le plus lourd en finale de Coupe du Monde est Brésil 5-2 Suède lors de l'édition 1958 en Suède. Cette victoire marque le premier titre du Brésil et l'émergence de Pelé, alors gé de seulement 17 ans. D'autres finales avec de larges écarts incluent Italie 4-1 Hongrie (1938), Brésil 4-1 Italie (1970) et Allemagne 3-0 République Tchèque (1954 a.p.)."
 },
 {
 question: "Un pays hôte a-t-il déjà remporté la Coupe du Monde ?",
 answer: "Oui, 6 pays hôtes ont remporté leur propre Coupe du Monde : Uruguay (1930), Italie (1934), Angleterre (1966), Allemagne (1974), Argentine (1978) et France (1998). C'est un avantage considérable grce au soutien du public, l'absence de déplacement et la familiarité avec les conditions locales. Cependant, le Brésil (1950) et la Suède (1958) ont échoué en finale à domicile, subissant deux traumatismes nationaux."
 }
 ];

 return (
 <>
<Breadcrumb
 items={[
 { label: "Accueil", href: "/" },
 { label: "Palmarès" },
 ]}
 />

 <PalmaresHero />

 <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-12">
 <PalmaresByCountry countryRecords={countryRecords} />
 <PalmaresTimeline editions={editions} />
 <FinalesTable editions={editions} />
 <RecordsSection records={records} />
 <PalmaresSection2026 />
 </div>

 <RelatedLinks
 links={[
 {
 href: "/histoire",
 title: "📜 Histoire de la CDM",
 description: "Timeline complète des 22 éditions depuis 1930 avec faits marquants et anecdotes.",
 icon: "📜"
 },
 {
 href: "/statistiques",
 title: "📊 Statistiques détaillées",
 description: "Records, performances et analyses statistiques de toutes les Coupes du Monde.",
 icon: "📊"
 },
 {
 href: "/pronostic-vainqueur",
 title: "Pronostic CDM 2026",
 description: "Qui va remporter la prochaine Coupe du Monde ? Nos prédictions et cotes.",
 icon: ""
 }
 ]}
 />

 <FAQSection title="Questions sur le palmarès de la CDM" items={faqItems} />

 {/* Schema.org */}
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 "@context": "https://schema.org",
 "@type": "ItemList",
 name: "Palmarès Coupe du Monde FIFA 1930–2022",
 description: "Liste complète des vainqueurs de la Coupe du Monde FIFA",
 numberOfItems: editions.length,
 itemListElement: editions.map((ed, idx) => ({
 "@type": "ListItem",
 position: idx + 1,
 name: `CDM ${ed.year} — ${ed.winner} champion`,
 })),
 }),
 }}
 />
 </>
 );
}
