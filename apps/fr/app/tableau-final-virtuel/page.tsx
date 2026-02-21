import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { Trophy, ArrowRight, Swords, Crown } from "lucide-react";

export const metadata: Metadata = {
  title: "Tableau final virtuel - Bracket 16èmes → Finale | CDM 2026",
  description:
    "Visualisez le bracket complet de la Coupe du Monde 2026 : des 16èmes de finale jusqu'à la grande finale. Pronostics, favoris et parcours probables.",
  openGraph: {
    title: "Tableau final virtuel - CDM 2026",
    description: "Bracket interactif des phases éliminatoires de la CDM 2026.",
    url: "https://cdm2026.fr/tableau-final-virtuel",
  },
  alternates: {
    canonical: "https://cdm2026.fr/tableau-final-virtuel",
  },
};

interface BracketMatch {
  id: string;
  round: string;
  home: string;
  away: string;
  homeProb: number;
}

const r16: BracketMatch[] = [
  { id: "r16-1", round: "16èmes", home: "1er Grp A", away: "2ème Grp D", homeProb: 55 },
  { id: "r16-2", round: "16èmes", home: "1er Grp B", away: "2ème Grp C", homeProb: 50 },
  { id: "r16-3", round: "16èmes", home: "1er Grp C", away: "3ème Grp A/B/F", homeProb: 60 },
  { id: "r16-4", round: "16èmes", home: "1er Grp D", away: "2ème Grp F", homeProb: 55 },
  { id: "r16-5", round: "16èmes", home: "1er Grp E", away: "2ème Grp H", homeProb: 55 },
  { id: "r16-6", round: "16èmes", home: "1er Grp F", away: "2ème Grp E", homeProb: 50 },
  { id: "r16-7", round: "16èmes", home: "1er Grp G", away: "3ème Grp C/D/E", homeProb: 60 },
  { id: "r16-8", round: "16èmes", home: "1er Grp H", away: "2ème Grp G", homeProb: 55 },
  { id: "r16-9", round: "16èmes", home: "1er Grp I", away: "2ème Grp L", homeProb: 55 },
  { id: "r16-10", round: "16èmes", home: "1er Grp J", away: "2ème Grp K", homeProb: 55 },
  { id: "r16-11", round: "16èmes", home: "1er Grp K", away: "3ème Grp G/H/I", homeProb: 60 },
  { id: "r16-12", round: "16èmes", home: "1er Grp L", away: "2ème Grp I", homeProb: 50 },
  { id: "r16-13", round: "16èmes", home: "2ème Grp A", away: "2ème Grp B", homeProb: 50 },
  { id: "r16-14", round: "16èmes", home: "2ème Grp J", away: "2ème Grp L", homeProb: 50 },
  { id: "r16-15", round: "16èmes", home: "3ème Grp J/K/L", away: "3ème Grp D/E/F", homeProb: 50 },
  { id: "r16-16", round: "16èmes", home: "3ème Grp G/H/I", away: "3ème Grp A/B/C", homeProb: 50 },
];

const faqItems = [
  {
    question: "Comment fonctionne le bracket de la CDM 2026 ?",
    answer:
      "Les 32 équipes qualifiées (12 premiers, 12 deuxièmes et 8 meilleurs troisièmes) sont réparties dans un bracket fixe de 16 matchs de 16èmes de finale. Les vainqueurs avancent en quarts, puis demi-finales, puis finale.",
  },
  {
    question: "Le tableau est-il déjà fixé ?",
    answer:
      "La structure du bracket est fixe, mais les positions exactes des meilleurs troisièmes dépendent de quels groupes ils proviennent. La FIFA a publié un tableau de correspondance prédéfini.",
  },
  {
    question: "Peut-on avoir deux équipes du même groupe en finale ?",
    answer:
      "Non, le bracket est conçu pour éviter que deux équipes du même groupe se retrouvent avant les quarts de finale au plus tôt.",
  },
];

function MatchCard({ match }: { match: BracketMatch }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 text-xs hover:shadow-md transition w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="font-medium text-[#022149] truncate flex-1">{match.home}</span>
        <span className="text-[#00B865] font-mono font-bold ml-2">{match.homeProb}%</span>
      </div>
      <div className="border-t border-dashed border-gray-200 my-1" />
      <div className="flex items-center justify-between">
        <span className="font-medium text-[#022149] truncate flex-1">{match.away}</span>
        <span className="text-gray-500 font-mono ml-2">{100 - match.homeProb}%</span>
      </div>
    </div>
  );
}

export default function TableauFinalVirtuelPage() {
  return (
    <>
{/* Hero */}
      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            Tableau final virtuel :{" "}
            <span className="text-secondary">des 16èmes à la finale</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Visualisez le bracket complet de la phase éliminatoire de la CDM 2026.
            16 matchs de 16èmes, 8 quarts, 4 demis, 1 finale.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-12 space-y-14">
        {/* 16èmes de finale */}
        <section>
          <h2 className="text-2xl font-bold text-[#022149] mb-2 flex items-center gap-2">
            <Swords className="h-6 w-6 text-[#00B865]" />
            16èmes de finale (32 équipes)
          </h2>
          <p className="text-gray-600 mb-6">
            Les 12 premiers, 12 deuxièmes et 8 meilleurs troisièmes s&apos;affrontent dans 16 matchs à élimination directe.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {r16.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/16emes-de-finale" className="text-sm text-[#022149] underline hover:no-underline">
              Voir tous les 16èmes de finale en détail
            </Link>
          </div>
        </section>

        {/* Quarts */}
        <section>
          <h2 className="text-2xl font-bold text-[#022149] mb-2 flex items-center gap-2">
            <Trophy className="h-6 w-6 text-[#D4AF37]" />
            Quarts de finale (16 → 8)
          </h2>
          <p className="text-gray-600 mb-6">
            Les 16 vainqueurs des 16èmes s&apos;affrontent en 8 matchs. À ce stade, les favoris se retrouvent souvent face à face.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-center text-sm text-gray-400">
                <div className="font-medium mb-1">Quart {i + 1}</div>
                <div>Vainqueur 16è {i * 2 + 1}</div>
                <div className="text-xs my-1">vs</div>
                <div>Vainqueur 16è {i * 2 + 2}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/quarts-de-finale" className="text-sm text-[#022149] underline hover:no-underline">
              Voir les quarts de finale
            </Link>
          </div>
        </section>

        {/* Demis */}
        <section>
          <h2 className="text-2xl font-bold text-[#022149] mb-2 flex items-center gap-2">
            <Swords className="h-6 w-6 text-[#00B865]" />
            Demi-finales (8 → 4)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="rounded-lg border border-dashed border-[#D4AF37]/40 bg-[#D4AF37]/5 p-4 text-center text-sm text-gray-500">
                <div className="font-medium mb-1 text-[#D4AF37]">Demi-finale {i + 1}</div>
                <div>Vainqueur QF {i * 2 + 1}</div>
                <div className="text-xs my-1">vs</div>
                <div>Vainqueur QF {i * 2 + 2}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/demi-finales" className="text-sm text-[#022149] underline hover:no-underline">
              Voir les demi-finales
            </Link>
          </div>
        </section>

        {/* Finale */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-[#022149] mb-4 flex items-center justify-center gap-2">
            <Crown className="h-6 w-6 text-[#D4AF37]" />
            Grande Finale
          </h2>
          <div className="inline-block rounded-xl border-2 border-[#D4AF37] bg-[#D4AF37]/5 p-6 min-w-[280px]">
            <p className="text-sm text-gray-500 mb-2">19 juillet 2026 — MetLife Stadium, New York</p>
            <div className="text-lg font-bold text-[#022149]">Vainqueur DF 1</div>
            <div className="text-[#D4AF37] font-bold my-1">vs</div>
            <div className="text-lg font-bold text-[#022149]">Vainqueur DF 2</div>
          </div>
          <div className="mt-4">
            <Link href="/finale" className="text-sm text-[#022149] underline hover:no-underline">
              Voir la page de la finale
            </Link>
          </div>
        </section>

        {/* CTA Simulateur */}
        <section className="text-center py-8 bg-gray-50 rounded-2xl">
          <h2 className="text-xl font-bold text-[#022149] mb-3">
            Envie de créer votre propre tableau ?
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Utilisez notre simulateur pour prédire les résultats de chaque groupe et voir le bracket se remplir en temps réel.
          </p>
          <Link
            href="/simulateur"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-8 font-bold text-lg hover:opacity-90 transition"
          >
            <Trophy className="h-5 w-5" />
            Lancer le simulateur
            <ArrowRight className="h-5 w-5" />
          </Link>
        </section>

        <FAQSection title="Questions sur le tableau final" items={faqItems} />

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
