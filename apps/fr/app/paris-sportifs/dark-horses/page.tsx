import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { Flame, TrendingUp, Star, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Dark Horses CDM 2026 — Équipes Surprises & Outsiders",
  description:
    "Quelles équipes peuvent créer la surprise à la CDM 2026 ? Analyse du Maroc, Japon, USA, Colombie, Nigeria et Suisse. Cotes value et arguments.",
  alternates: { canonical: "https://www.cdm2026.fr/paris-sportifs/dark-horses" },
  openGraph: {
    title: "Dark Horses CDM 2026 — Équipes Surprises",
    description: "Maroc, Japon, USA, Colombie, Nigeria, Suisse : les outsiders de la CDM 2026.",
    url: "https://www.cdm2026.fr/paris-sportifs/dark-horses",
  },
};

const outsiders = [
  {
    team: "🇲🇦 Maroc", cote: 30.0, ranking: 14,
    strengths: ["Demi-finaliste 2022 — expérience des grands matchs", "Défense exceptionnelle (1 seul but concédé en 5 matchs en 2022)", "Génération dorée : Hakimi, Amrabat, En-Nesyri, Ziyech", "Soutien populaire massif"],
    weakness: "Profondeur de banc limitée, dépendance à quelques joueurs clés.",
    valueArg: "Cote à 30.0 pour un demi-finaliste récent. Value claire si le tirage est favorable."
  },
  {
    team: "🇯🇵 Japon", cote: 50.0, ranking: 18,
    strengths: ["A battu l'Allemagne et l'Espagne en 2022", "Joueurs en top clubs européens (Kubo, Mitoma, Kamada)", "Discipline tactique impeccable", "Progression constante depuis 20 ans"],
    weakness: "Manque de buteur de classe mondiale. Difficultés en phase à élimination directe.",
    valueArg: "Capable de battre n'importe qui sur un match. Les huitièmes sont accessibles, les quarts un objectif réaliste."
  },
  {
    team: "🇺🇸 États-Unis", cote: 40.0, ranking: 16,
    strengths: ["Pays hôte — avantage terrain considérable", "Génération talentueuse : Pulisic, McKennie, Reyna, Musah", "Public passionné, stades de 80 000+ places", "Investissements massifs dans le football US"],
    weakness: "Expérience limitée au plus haut niveau. Pression de jouer à domicile.",
    valueArg: "L'avantage du pays hôte en CDM est historiquement fort (3 victoires sur 21 éditions). Les USA visent les quarts minimum."
  },
  {
    team: "🇨🇴 Colombie", cote: 45.0, ranking: 15,
    strengths: ["Finaliste Copa América 2024", "James Rodríguez toujours magique en sélection", "Luis Díaz en forme étincelante", "Style de jeu séduisant et offensif"],
    weakness: "Irrégularité historique en CDM. Dépendance aux individualités.",
    valueArg: "La Colombie en confiance est l'une des équipes les plus dangereuses du monde. Finaliste Copa 2024, elle arrive en forme."
  },
  {
    team: "🇳🇬 Nigeria", cote: 80.0, ranking: 28,
    strengths: ["Vivier de talents inépuisable", "Joueurs physiques et rapides", "Osimhen capable de porter l'attaque seul", "Tradition de performances en CDM (8èmes en 2014)"],
    weakness: "Organisation fédérale chaotique. Préparation parfois insuffisante.",
    valueArg: "À 80.0, la moindre surprise rapporte gros. Le talent individuel est là, notamment avec Osimhen."
  },
  {
    team: "🇨🇭 Suisse", cote: 60.0, ranking: 19,
    strengths: ["Régularité impressionnante (8èmes ou mieux aux 4 derniers grands tournois)", "A éliminé la France à l'Euro 2020", "Équipe bien structurée, aucun complexe contre les grands", "Xhaka, Akanji, Ndoye : colonne vertébrale solide"],
    weakness: "Plafond de verre aux quarts de finale. Renouvellement générationnel en cours.",
    valueArg: "La Suisse est le dark horse par excellence. Toujours compétitive, jamais favorite, et capable de créer la surprise."
  },
  {
    team: "🇹🇷 Turquie", cote: 80.0, ranking: 26,
    strengths: ["Demi-finaliste Euro 2024, renouveau turc", "Arda Güler, prodige du Real Madrid", "Hakan Çalhanoglu en patron du milieu", "Mentalité de guerrier, public bouillant"],
    weakness: "Manque de régularité. Peut s'effondrer comme briller sur un même tournoi.",
    valueArg: "La Turquie à l'Euro 2024 a montré qu'elle pouvait battre n'importe qui. Si le momentum est là, elle peut aller loin."
  },
];

const faqItems = [
  { question: "Qu'est-ce qu'un dark horse en football ?", answer: "Un dark horse (ou outsider) est une équipe qui n'est pas considérée comme favorite mais qui possède le potentiel pour créer la surprise. En CDM, c'est typiquement une nation classée entre la 10ème et la 30ème place mondiale, avec des joueurs de talent en clubs européens." },
  { question: "Les dark horses peuvent-ils vraiment gagner la CDM ?", answer: "C'est rare mais possible. La Croatie (finaliste 2018), le Maroc (demi-finaliste 2022) et la Turquie (3ème en 2002) ont prouvé que les outsiders pouvaient aller très loin. Gagner le titre reste extrêmement difficile : seuls 8 pays ont remporté la CDM en 92 ans." },
  { question: "Comment identifier un bon dark horse ?", answer: "Cherchez : 1) une équipe en progression récente (résultats en hausse), 2) des joueurs clés en forme dans de grands clubs, 3) un groupe de poules abordable, 4) un entraîneur expérimenté, 5) une cote qui ne reflète pas le vrai niveau de l'équipe." },
  { question: "Quel est le meilleur dark horse CDM 2026 ?", answer: "Le Maroc est le dark horse le plus crédible : demi-finaliste 2022, défense de classe mondiale, stars en Europe. Les USA bénéficient de l'avantage hôte. La Colombie arrive en forme après sa finale de Copa 2024. Chacun a un argument fort." },
];

export default function DarkHorsesPage() {
  return (
    <>

      <section className="hero-animated text-center py-16 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-accent mb-4">Dark Horses — CDM 2026</h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Quelles équipes peuvent bousculer la hiérarchie ? Analyse des 7 outsiders les plus dangereux de la Coupe du Monde 2026.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Flame className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Les outsiders à surveiller</h2>
        </div>
        <p className="text-gray-700 mb-8">
          La Coupe du Monde est le théâtre des surprises. En 2022, le Maroc a atteint les demi-finales, l&apos;Arabie Saoudite a battu l&apos;Argentine, le Japon a éliminé l&apos;Allemagne et l&apos;Espagne en poules. En 2026, avec 48 équipes, les possibilités de surprise se multiplient.
        </p>

        <div className="space-y-8">
          {outsiders.map((o) => (
            <div key={o.team} className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-primary/5 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold text-primary">{o.team}</h3>
                  <span className="text-sm text-gray-500">Classement FIFA : {o.ranking}ème</span>
                </div>
                <span className="bg-accent/10 text-accent font-bold px-4 py-2 rounded-lg">
                  Cote titre : {o.cote.toFixed(1)}
                </span>
              </div>
              <div className="p-5">
                <h4 className="font-semibold text-accent mb-2">Points forts</h4>
                <ul className="space-y-1 mb-4">
                  {o.strengths.map((s, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                      <Star className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      {s}
                    </li>
                  ))}
                </ul>
                <h4 className="font-semibold text-red-600 mb-1">Point faible</h4>
                <p className="text-sm text-gray-700 mb-3">{o.weakness}</p>
                <div className="bg-accent/5 rounded-lg p-3">
                  <h4 className="font-semibold text-accent text-sm mb-1">Argument value</h4>
                  <p className="text-sm text-gray-700">{o.valueArg}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <Link href="https://www.winamax.fr/paris-sportifs" target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-block bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity">
          Parier sur un dark horse CDM 2026 <ArrowRight className="inline w-4 h-4 ml-1" />
        </Link>
      </section>

      <FAQSection title="Questions fréquentes — Dark horses CDM 2026" items={faqItems} />

    </>
  );
}
