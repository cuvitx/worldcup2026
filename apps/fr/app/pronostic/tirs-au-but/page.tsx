import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { Clock, Target, TrendingUp, ArrowRight } from "lucide-react";
import { pmuTrackingUrl } from "@repo/data/affiliates";

export const metadata: Metadata = {
  title: "Pronostic Tirs au But CDM 2026 — Prolongation & Penalties",
  description:
    "Guide paris prolongation et tirs au but CDM 2026. Stats historiques, bilans par équipe et stratégies pour parier sur les penalties.",
  alternates: { canonical: "https://www.cdm2026.fr/pronostic/tirs-au-but" },
  openGraph: {
    title: "Tirs au But CDM 2026 — Stats & Paris",
    description: "Bilans historiques, équipes spécialistes et stratégies pour les paris penalties CDM 2026.",
    url: "https://www.cdm2026.fr/pronostic/tirs-au-but",
  },
};

const historicalStats = [
  { edition: "Qatar 2022", shootouts: 4, pctKO: "25%", notable: "Argentine bat France en finale (4-2 TAB)" },
  { edition: "Russie 2018", shootouts: 4, pctKO: "25%", notable: "Croatie qualifiée 2 fois aux TAB" },
  { edition: "Brésil 2014", shootouts: 4, pctKO: "25%", notable: "Argentine qualifiée 2 fois aux TAB" },
  { edition: "Afrique du Sud 2010", shootouts: 2, pctKO: "12.5%", notable: "Uruguay bat Ghana aux TAB (quart)" },
  { edition: "Allemagne 2006", shootouts: 4, pctKO: "25%", notable: "Italie bat France en finale (5-3 TAB)" },
];

const teamRecords = [
  { team: "🇩🇪 Allemagne", played: 4, won: 4, lost: 0, pct: "100%", level: "Excellent" },
  { team: "🇦🇷 Argentine", played: 6, won: 4, lost: 2, pct: "67%", level: "Bon" },
  { team: "🇧🇷 Brésil", played: 4, won: 2, lost: 2, pct: "50%", level: "Moyen" },
  { team: "🇫🇷 France", played: 4, won: 2, lost: 2, pct: "50%", level: "Moyen" },
  { team: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Angleterre", played: 7, won: 2, lost: 5, pct: "29%", level: "Mauvais" },
  { team: "🇪🇸 Espagne", played: 4, won: 1, lost: 3, pct: "25%", level: "Mauvais" },
  { team: "🇮🇹 Italie", played: 5, won: 3, lost: 2, pct: "60%", level: "Bon" },
  { team: "🇭🇷 Croatie", played: 4, won: 3, lost: 1, pct: "75%", level: "Très bon" },
];

const faqItems = [
  { question: "À partir de quel tour peut-il y avoir des tirs au but en CDM 2026 ?", answer: "Les tirs au but ne sont possibles qu'à partir des 16èmes de finale (phase à élimination directe). En phase de groupes, les matchs peuvent se terminer sur un match nul. Dès les 16èmes, si le score est nul après 90 minutes, il y a 30 minutes de prolongation puis des tirs au but si nécessaire." },
  { question: "Comment parier sur les tirs au but ?", answer: "Les bookmakers proposent plusieurs marchés : 'Le match ira-t-il aux tirs au but ?' (Oui/Non, cotes 5.0-8.0), 'Vainqueur aux tirs au but' (équipe A ou B), et 'Score exact aux TAB'. Ces marchés ne sont disponibles que pour les matchs à élimination directe." },
  { question: "L'Angleterre est-elle vraiment mauvaise aux penalties ?", answer: "Historiquement oui, avec seulement 29% de victoires aux TAB en CDM. Mais la tendance s'améliore : victoire aux TAB contre la Colombie en 2018. Le travail psychologique des coachs anglais modernes pourrait inverser la malédiction en 2026." },
  { question: "Le gardien est-il décisif aux tirs au but ?", answer: "Absolument. Un gardien spécialiste des penalties comme Emiliano Martínez (Argentine) ou Diogo Costa (Portugal) peut transformer un match. Martínez a été décisif en finale 2022 et en Copa América 2024. Le facteur gardien est le critère n°1 pour les paris TAB." },
];

export default function PronosticTirsAuButPage() {
  return (
    <>

      <section className="hero-animated text-center py-16 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-accent mb-4">Prolongation & Tirs au But — CDM 2026</h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Les tirs au but, moment de tension ultime. Analysez les bilans historiques et identifiez les équipes les mieux (et les moins bien) préparées.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Historique des tirs au but en CDM</h2>
        </div>
        <p className="text-gray-700 mb-6">
          En moyenne, 25% des matchs à élimination directe se terminent aux tirs au but. C&apos;est un marché de niche mais très rentable quand on identifie les bons matchs. Les confrontations entre équipes de niveau similaire avec des défenses solides sont les candidates idéales.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left p-3">Édition</th>
                <th className="text-center p-3">Séances TAB</th>
                <th className="text-center p-3">% matchs KO</th>
                <th className="text-left p-3">Fait notable</th>
              </tr>
            </thead>
            <tbody>
              {historicalStats.map((s, i) => (
                <tr key={s.edition} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="p-3 font-semibold">{s.edition}</td>
                  <td className="text-center p-3 font-bold text-accent">{s.shootouts}</td>
                  <td className="text-center p-3">{s.pctKO}</td>
                  <td className="p-3 text-sm">{s.notable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Bilan par équipe aux tirs au but</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left p-3">Équipe</th>
                <th className="text-center p-3">Séances</th>
                <th className="text-center p-3">Victoires</th>
                <th className="text-center p-3">Défaites</th>
                <th className="text-center p-3">% victoire</th>
                <th className="text-left p-3">Niveau</th>
              </tr>
            </thead>
            <tbody>
              {teamRecords.map((t, i) => (
                <tr key={t.team} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="p-3 font-semibold">{t.team}</td>
                  <td className="text-center p-3">{t.played}</td>
                  <td className="text-center p-3 text-accent font-bold">{t.won}</td>
                  <td className="text-center p-3 text-red-500">{t.lost}</td>
                  <td className="text-center p-3 font-bold">{t.pct}</td>
                  <td className="p-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded ${t.level === "Excellent" || t.level === "Très bon" ? "bg-accent/10 text-accent" : t.level === "Bon" ? "bg-blue-100 text-blue-600" : t.level === "Moyen" ? "bg-gray-100 text-gray-600" : "bg-red-100 text-red-600"}`}>
                      {t.level}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Matchs à surveiller pour les TAB</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-xl p-5">
            <h3 className="font-bold text-primary mb-2">Quarts de finale potentiels</h3>
            <p className="text-sm text-gray-700">Les quarts de finale sont le tour avec le plus de TAB historiquement. Des matchs comme France vs Angleterre, Argentine vs Brésil ou Espagne vs Allemagne pourraient se jouer aux penalties.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-5">
            <h3 className="font-bold text-primary mb-2">Le facteur Emiliano Martínez</h3>
            <p className="text-sm text-gray-700">Le gardien argentin est le meilleur spécialiste des TAB au monde. Son bilan : 3 séances gagnées sur 3 (CDM 2022, Copa 2021 et 2024). Un avantage décisif pour l&apos;Argentine.</p>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <a href={pmuTrackingUrl("prono-special")} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-block bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity">
          100€ offerts — Parier sur les TAB CDM 2026 sur PMU Sport <ArrowRight className="inline w-4 h-4 ml-1" />
        </a>
        <p className="text-xs text-gray-400 mt-3">18+ | Offre soumise à conditions</p>
      </section>

      <FAQSection title="Questions fréquentes — Tirs au but CDM 2026" items={faqItems} />

    </>
  );
}
