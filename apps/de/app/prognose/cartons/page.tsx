import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { AlertTriangle, BarChart3, User, ArrowRight } from "lucide-react";
import { pmuTrackingUrl } from "@repo/data/affiliates";

export const metadata: Metadata = {
  title: "Prognose Cartons CDM 2026 — Jaunes, Rouges & Paris Cartons",
  description:
    "Guide des paris cartons pour la CDM 2026. Stats par équipe, arbitres FIFA désignés, joueurs les plus avertis et meilleures cotes.",
  alternates: { canonical: "https://www.wm2026guide.de/prognose/cartons" },
  openGraph: {
    title: "Paris Cartons CDM 2026",
    description: "Stats cartons par équipe, arbitres FIFA et joueurs les plus avertis pour la CDM 2026.",
    url: "https://www.wm2026guide.de/prognose/cartons",
  },
};

const teamCards = [
  { team: "🇦🇷 Argentine", yellowAvg: 2.3, redRate: "12%", total2022: 16, style: "Agressif" },
  { team: "🇳🇱 Pays-Bas", yellowAvg: 2.1, redRate: "8%", total2022: 18, style: "Physique" },
  { team: "🇲🇦 Maroc", yellowAvg: 2.0, redRate: "6%", total2022: 11, style: "Combatif" },
  { team: "🇨🇲 Cameroun", yellowAvg: 2.4, redRate: "14%", total2022: 9, style: "Très physique" },
  { team: "🇺🇾 Uruguay", yellowAvg: 2.5, redRate: "10%", total2022: 10, style: "Rugueux" },
  { team: "🇨🇴 Colombie", yellowAvg: 2.2, redRate: "9%", total2022: 0, style: "Physique" },
  { team: "🇪🇨 Équateur", yellowAvg: 2.1, redRate: "8%", total2022: 8, style: "Engagé" },
  { team: "🇰🇷 Corée du Sud", yellowAvg: 1.8, redRate: "5%", total2022: 9, style: "Intensif" },
];

const referees = [
  { name: "Facundo Tello", country: "🇦🇷 Argentine", yellowAvg: 4.8, style: "Sévère, n'hésite pas à sortir le carton." },
  { name: "Ismail Elfath", country: "🇺🇸 États-Unis", yellowAvg: 3.5, style: "Modéré, préfère le dialogue." },
  { name: "Jesús Valenzuela", country: "🇻🇪 Venezuela", yellowAvg: 4.2, style: "Strict, applique la règle à la lettre." },
  { name: "Clément Turpin", country: "🇫🇷 France", yellowAvg: 4.0, style: "Expérimenté, référence européenne." },
  { name: "Slavko Vincic", country: "🇸🇮 Slovénie", yellowAvg: 3.8, style: "Constant, bon contrôle du match." },
];

const warningPlayers = [
  { name: "Sergio Ramos (retraité)", team: "🇪🇸", totalCards: 27, note: "Record CDM. Référence historique." },
  { name: "Nicolás Otamendi", team: "🇦🇷", totalCards: 8, note: "Défenseur engagé, souvent averti." },
  { name: "Casemiro", team: "🇧🇷", totalCards: 6, note: "Milieu récupérateur, spécialiste des fautes tactiques." },
  { name: "Bruno Fernandes", team: "🇵🇹", totalCards: 5, note: "Contestation fréquente, tempérament vif." },
  { name: "Rodri", team: "🇪🇸", totalCards: 4, note: "Fautes intelligentes mais coûteuses en cartons." },
];

const faqItems = [
  { question: "Quels types de paris cartons existe-t-il ?", answer: "Les bookmakers proposent plusieurs marchés : nombre total de cartons jaunes (Over/Under), première équipe à recevoir un carton, joueur à recevoir un carton, carton rouge dans le match (Oui/Non). Les cotes varient de 1.5 à 15.0 selon le marché." },
  { question: "Quelles équipes reçoivent le plus de cartons en CDM ?", answer: "Les équipes sud-américaines et africaines ont historiquement les taux de cartons les plus élevés. L'Argentine, l'Uruguay et le Cameroun sont régulièrement parmi les équipes les plus sanctionnées, avec en moyenne plus de 2 cartons jaunes par match." },
  { question: "L'arbitre influence-t-il le nombre de cartons ?", answer: "Oui, considérablement. Certains arbitres distribuent en moyenne 3 cartons par match, d'autres plus de 5. Vérifiez l'identité de l'arbitre désigné avant de parier sur les cartons. Les arbitres sud-américains sont généralement plus sévères." },
  { question: "Les cartons sont-ils plus fréquents en phase finale ?", answer: "Oui, les matchs à élimination directe produisent en moyenne 15-20% de cartons en plus que les matchs de poules. L'enjeu accru pousse les joueurs à des fautes plus dures et les tensions sont plus vives." },
];

export default function PrognoseCartonsPage() {
  return (
    <>

      <section className="hero-animated text-center py-16 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-accent mb-4">Paris Cartons — CDM 2026</h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Cartons jaunes, cartons rouges : tout savoir pour parier sur les sanctions de la WM 2026. Stats, arbitres et joueurs à surveiller.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Stats cartons par équipe</h2>
        </div>
        <p className="text-gray-700 mb-6">
          Le style de jeu et la culture footballistique influencent fortement le nombre de cartons. Les équipes physiques et les confrontations sud-américaines produisent systématiquement plus de sanctions. Voici les stats des équipes les plus sanctionnées sur les 10 derniers matchs officiels.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left p-3">Équipe</th>
                <th className="text-center p-3">Jaunes/match</th>
                <th className="text-center p-3">% matchs avec rouge</th>
                <th className="text-center p-3">Total CDM 2022</th>
                <th className="text-left p-3">Style</th>
              </tr>
            </thead>
            <tbody>
              {teamCards.map((t, i) => (
                <tr key={t.team} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="p-3 font-semibold">{t.team}</td>
                  <td className="text-center p-3 font-bold text-accent">{t.yellowAvg}</td>
                  <td className="text-center p-3">{t.redRate}</td>
                  <td className="text-center p-3">{t.total2022}</td>
                  <td className="p-3 text-sm">{t.style}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Arbitres FIFA désignés</h2>
        </div>
        <p className="text-gray-700 mb-6">
          L&apos;arbitre est un facteur déterminant pour les paris cartons. Chaque officiel a ses tendances. Voici les arbitres pressentis pour la CDM 2026.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {referees.map((r) => (
            <div key={r.name} className="border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-primary">{r.name}</h3>
              <p className="text-sm text-gray-500">{r.country}</p>
              <p className="text-accent font-bold mt-2">{r.yellowAvg} jaunes/match</p>
              <p className="text-xs text-gray-600 mt-1">{r.style}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Spielers les plus avertis</h2>
        </div>
        <div className="space-y-3">
          {warningPlayers.map((p) => (
            <div key={p.name} className="flex items-center justify-between border border-gray-200 rounded-xl p-4">
              <div>
                <span className="font-semibold">{p.name}</span>
                <span className="text-sm text-gray-500 ml-2">{p.team}</span>
                <p className="text-xs text-gray-600">{p.note}</p>
              </div>
              <span className="bg-yellow-100 text-yellow-700 font-bold px-3 py-1 rounded-lg text-sm">
                {p.totalCards} cartons CDM
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <a href={pmuTrackingUrl("prono-special")} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-block bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity">
          100€ offerts — Parier sur les cartons CDM 2026 sur PMU Sport <ArrowRight className="inline w-4 h-4 ml-1" />
        </a>
        <p className="text-xs text-gray-400 mt-3">18+ | Offre soumise à conditions</p>
      </section>

      <FAQSection title="Questions fréquentes — Cartons CDM 2026" items={faqItems} />

    </>
  );
}
