import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { Trophy, Map, TrendingUp, ArrowRight } from "lucide-react";
import { pmuTrackingUrl } from "@repo/data/affiliates";

export const metadata: Metadata = {
  title: "Pronostic Finalistes CDM 2026 — Qui sera en finale ?",
  description:
    "Qui sera en finale de la Coupe du Monde 2026 ? Cotes finalistes, analyse des tableaux possibles et parcours des favoris.",
  alternates: { canonical: "https://www.cdm2026.fr/pronostic/finalistes" },
  openGraph: {
    title: "Pronostic Finalistes CDM 2026",
    description: "Cotes finalistes, tableaux possibles et analyse du parcours vers la finale.",
    url: "https://www.cdm2026.fr/pronostic/finalistes",
  },
};

const finalists = [
  { team: "🇦🇷 Argentine", coteFinale: 2.8, coteTitre: 5.5, chance: "38%", argument: "Championne en titre, effectif complet, Messi pour sa dernière." },
  { team: "🇫🇷 France", coteFinale: 3.0, coteTitre: 6.0, chance: "35%", argument: "Finaliste 2022, génération dorée avec Mbappé au sommet." },
  { team: "🇪🇸 Espagne", coteFinale: 3.5, coteTitre: 7.0, chance: "30%", argument: "Championne d'Europe 2024, jeu collectif redoutable." },
  { team: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Angleterre", coteFinale: 4.0, coteTitre: 8.0, chance: "26%", argument: "Finaliste Euro 2020 et 2024, l'expérience des grandes finales." },
  { team: "🇧🇷 Brésil", coteFinale: 4.5, coteTitre: 9.0, chance: "24%", argument: "Le talent est là (Vinicius, Rodrygo), manque de régularité récente." },
  { team: "🇩🇪 Allemagne", coteFinale: 5.0, coteTitre: 10.0, chance: "22%", argument: "Renaissance sous Nagelsmann, talent offensif (Wirtz, Musiala)." },
  { team: "🇵🇹 Portugal", coteFinale: 5.5, coteTitre: 12.0, chance: "20%", argument: "Profondeur de banc exceptionnelle, gardien solide." },
  { team: "🇳🇱 Pays-Bas", coteFinale: 7.0, coteTitre: 15.0, chance: "15%", argument: "Équipe expérimentée, capable de créer la surprise en phase finale." },
];

const bracketScenarios = [
  { title: "Scénario 1 : France vs Argentine", prob: "12%", desc: "Remake de la finale 2022. Si les deux équipes terminent premières de leur groupe respectif, le tableau les sépare jusqu'en finale. Le scénario rêvé pour les fans." },
  { title: "Scénario 2 : Espagne vs Brésil", prob: "8%", desc: "Le choc du football offensif. L'Espagne de Yamal contre le Brésil de Vinicius. Possible si l'Espagne domine son côté de tableau et le Brésil élimine l'Argentine en demi." },
  { title: "Scénario 3 : France vs Angleterre", prob: "7%", desc: "Le derby transmanche en finale mondiale. Possible si l'Angleterre survit à un quart piégeux et que la France évite l'Espagne en demi." },
  { title: "Scénario 4 : Argentine vs Allemagne", prob: "6%", desc: "Remake de 2014. L'Allemagne en outsider capable de battre n'importe qui sur un match. Le format 48 équipes pourrait les favoriser." },
];

const faqItems = [
  { question: "Quand peut-on parier sur les finalistes ?", answer: "Les paris sur les finalistes sont disponibles dès maintenant en ante-post chez tous les grands bookmakers. Les cotes évolueront au fur et à mesure de la compétition. Parier tôt offre généralement de meilleures cotes mais implique plus d'incertitude." },
  { question: "Quelle est la différence entre parier sur le vainqueur et sur un finaliste ?", answer: "Parier sur un finaliste est un pari 'à atteindre la finale' : votre pari est gagnant si l'équipe joue la finale, qu'elle la gagne ou non. Les cotes sont donc plus basses que pour le titre. C'est un pari moins risqué mais moins rémunérateur." },
  { question: "Le format 48 équipes change-t-il les chances d'atteindre la finale ?", answer: "Oui. Avec plus de matchs et plus d'adversaires potentiels, les favoris devront jouer davantage de rencontres pour atteindre la finale. Cela augmente légèrement le risque d'élimination précoce mais les grandes nations restent largement favorisées." },
];

export default function PronosticFinalistesPage() {
  return (
    <>

      <section className="hero-animated text-center py-16 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-accent mb-4">Qui sera en finale ? — CDM 2026</h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Analysez les cotes, les tableaux possibles et le parcours des favoris vers la finale de la Coupe du Monde 2026.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Cotes finalistes CDM 2026</h2>
        </div>
        <p className="text-gray-700 mb-6">
          Atteindre la finale est un exploit en soi. Depuis 1998, seules 10 nations différentes ont joué une finale de Coupe du Monde. Le club est fermé : France, Brésil, Allemagne, Italie, Espagne, Argentine, Pays-Bas, Croatie, Angleterre. Les mêmes reviennent.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left p-3">Équipe</th>
                <th className="text-center p-3">Cote finale</th>
                <th className="text-center p-3">Cote titre</th>
                <th className="text-center p-3">% chances finale</th>
                <th className="text-left p-3">Argument</th>
              </tr>
            </thead>
            <tbody>
              {finalists.map((f, i) => (
                <tr key={f.team} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="p-3 font-semibold">{f.team}</td>
                  <td className="text-center p-3 text-accent font-bold">{f.coteFinale}</td>
                  <td className="text-center p-3 text-accent font-bold">{f.coteTitre}</td>
                  <td className="text-center p-3">{f.chance}</td>
                  <td className="p-3 text-sm text-gray-600">{f.argument}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">Cotes indicatives. Les chances sont estimées via notre modèle de simulation. 18+</p>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Map className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Scénarios de finale possibles</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {bracketScenarios.map((s) => (
            <div key={s.title} className="border border-gray-200 rounded-xl p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-primary">{s.title}</h3>
                <span className="bg-accent/10 text-accent font-bold px-2 py-1 rounded text-xs">{s.prob}</span>
              </div>
              <p className="text-sm text-gray-700">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Le parcours type d&apos;un finaliste</h2>
        </div>
        <div className="bg-primary/5 rounded-xl p-6">
          <p className="text-gray-700 leading-relaxed mb-4">
            Pour atteindre la finale en format 48 équipes, une nation devra remporter au minimum 5 matchs à élimination directe (16èmes, 8èmes, quarts, demi-finale, puis la finale elle-même). C&apos;est un marathon de 7 matchs au total avec la phase de groupes.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Les équipes avec le banc le plus profond seront avantagées. La gestion de la fatigue, les rotations intelligentes et la solidité mentale feront la différence. C&apos;est pourquoi les nations avec 2-3 joueurs de classe mondiale à chaque poste (France, Angleterre, Espagne) sont favorisées.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <a href={pmuTrackingUrl("prono-special")} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-block bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity">
          100€ offerts — Parier sur les finalistes CDM 2026 sur PMU Sport <ArrowRight className="inline w-4 h-4 ml-1" />
        </a>
        <p className="text-xs text-gray-400 mt-3">18+ | Offre soumise à conditions</p>
      </section>

      <FAQSection title="Questions fréquentes — Finalistes CDM 2026" items={faqItems} />

    </>
  );
}
