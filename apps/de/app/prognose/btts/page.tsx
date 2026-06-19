import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { Users, BarChart3, Target, ArrowRight } from "lucide-react";
import { pmuTrackingUrl } from "@repo/data/affiliates";

export const metadata: Metadata = {
  title: "Prognose BTTS CDM 2026 — Les Deux Mannschaften Marquent",
  description:
    "Guide BTTS (Both Teams To Score) pour la CDM 2026. Stats par Mannschaft, top matchs où les deux marquent, analyse par groupe.",
  alternates: { canonical: "https://www.wm2026guide.de/prognose/btts" },
  openGraph: {
    title: "BTTS CDM 2026 — Les Deux Mannschaften Marquent",
    description: "Stats BTTS par Mannschaft, top matchs et analyse groupes pour vos paris CDM 2026.",
    url: "https://www.wm2026guide.de/prognose/btts",
  },
};

const bttsTeams = [
  { team: "🇩🇪 Allemagne", bttsYes: "62%", bttsNo: "38%", avgGoals: 2.8 },
  { team: "🇫🇷 France", bttsYes: "55%", bttsNo: "45%", avgGoals: 2.5 },
  { team: "🇧🇷 Brésil", bttsYes: "58%", bttsNo: "42%", avgGoals: 2.7 },
  { team: "🇪🇸 Espagne", bttsYes: "60%", bttsNo: "40%", avgGoals: 2.6 },
  { team: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Angleterre", bttsYes: "52%", bttsNo: "48%", avgGoals: 2.3 },
  { team: "🇦🇷 Argentine", bttsYes: "50%", bttsNo: "50%", avgGoals: 2.4 },
  { team: "🇵🇹 Portugal", bttsYes: "54%", bttsNo: "46%", avgGoals: 2.5 },
  { team: "🇳🇱 Pays-Bas", bttsYes: "57%", bttsNo: "43%", avgGoals: 2.6 },
  { team: "🇮🇹 Italie", bttsYes: "42%", bttsNo: "58%", avgGoals: 1.9 },
  { team: "🇭🇷 Croatie", bttsYes: "48%", bttsNo: "52%", avgGoals: 2.1 },
];

const topBttsMatches = [
  { match: "🇫🇷 France vs 🇩🇪 Allemagne", cote: 1.65, reason: "Les deux attaques sont prolifiques. 5 confrontations récentes : BTTS 4 fois sur 5." },
  { match: "🇧🇷 Brésil vs 🇪🇸 Espagne", cote: 1.70, reason: "Deux Mannschafts portées vers l'attaque, style offensif garanti." },
  { match: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Angleterre vs 🇳🇱 Pays-Bas", cote: 1.75, reason: "Matchs historiquement ouverts avec des défenses prenable." },
  { match: "🇦🇷 Argentine vs 🇩🇪 Allemagne", cote: 1.70, reason: "Rivalité historique : finale 2014 (1-0), mais souvent BTTS en poules." },
  { match: "🇵🇹 Portugal vs 🇧🇷 Brésil", cote: 1.72, reason: "Attaques stars des deux côtés, rare que les deux ne marquent pas." },
];

const groupBtts = [
  { group: "Gruppe A", bttsRate: "55%", tendency: "BTTS Oui favori", reason: "Matchs déséquilibrés mais les petites Mannschafts marquent sur leur chance." },
  { group: "Gruppe E", bttsRate: "60%", tendency: "BTTS Oui favori", reason: "Gruppe offensif, toutes les Mannschafts capables de marquer." },
  { group: "Gruppe G", bttsRate: "35%", tendency: "BTTS Non favori", reason: "Défenses compactes, matchs tactiques attendus." },
  { group: "Gruppe I", bttsRate: "58%", tendency: "BTTS Oui favori", reason: "Allemagne offensive, adversaires capables de répondre." },
];

const faqItems = [
  { question: "Que signifie BTTS dans les paris sportifs ?", answer: "BTTS signifie 'Both Teams To Score' (les deux Mannschafts marquent). Vous pariez sur le fait que chaque Mannschaft inscrira au moins un but pendant le match. Peu importe le score final, tant que les deux Mannschafts ont marqué (BTTS Oui) ou qu'au moins une Mannschaft n'a pas marqué (BTTS Non)." },
  { question: "Quel est le taux de BTTS en WM ?", answer: "En moyenne, environ 48-52% des matchs de WM se terminent avec les deux Mannschafts qui marquent. Ce taux est légèrement inférieur à celui des championnats nationaux (55-58%) car le football international est généralement plus défensif." },
  { question: "BTTS est-il plus fréquent en phase de groupes ?", answer: "Oui, les matchs de phase de groupes ont un taux BTTS supérieur (environ 52%) à celui des matchs à élimination directe (environ 44%). Les Mannschafts prennent moins de risques en phase finale, ce qui réduit les occasions de but." },
  { question: "Comment combiner BTTS avec d'autres marchés ?", answer: "Les combinaisons populaires incluent BTTS + Over 2.5 (cotes autour de 2.0-2.5) et BTTS + résultat (cotes plus élevées). Ces combos offrent un bon rapport risque/gain pour les matchs entre Mannschafts offensives." },
];

export default function PrognoseBttsPage() {
  return (
    <>

      <section className="hero-animated text-center py-16 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-accent mb-4">Les Deux Mannschaften Marquent — CDM 2026</h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Vollständige Analyse du marché BTTS für die WM 2026. Identifiez les matchs où les deux Mannschafts vont marquer.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Stats BTTS par Mannschaft</h2>
        </div>
        <p className="text-gray-700 mb-6">
          Le taux BTTS d&apos;une Mannschaft reflète à la fois sa capacité offensive et ses faiblesses défensives. Une Mannschaft avec un taux BTTS élevé marque souvent mais encaisse aussi. Voici les stats des principales nations sur leurs 20 derniers matchs internationaux.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left p-3">Mannschaft</th>
                <th className="text-center p-3">BTTS Oui</th>
                <th className="text-center p-3">BTTS Non</th>
                <th className="text-center p-3">Moy. buts/match</th>
              </tr>
            </thead>
            <tbody>
              {bttsTeams.map((t, i) => (
                <tr key={t.team} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="p-3 font-semibold">{t.team}</td>
                  <td className="text-center p-3 text-accent font-bold">{t.bttsYes}</td>
                  <td className="text-center p-3">{t.bttsNo}</td>
                  <td className="text-center p-3">{t.avgGoals}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Top matchs BTTS Oui</h2>
        </div>
        <div className="space-y-4">
          {topBttsMatches.map((m) => (
            <div key={m.match} className="border border-gray-200 rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h3 className="font-bold text-primary">{m.match}</h3>
                <p className="text-sm text-gray-600">{m.reason}</p>
              </div>
              <span className="bg-accent/10 text-accent font-bold px-4 py-2 rounded-lg whitespace-nowrap">
                BTTS Oui : {m.cote}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Analyse BTTS par groupe</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {groupBtts.map((g) => (
            <div key={g.group} className="border border-gray-200 rounded-xl p-5">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-primary">{g.group}</h3>
                <span className="text-sm font-semibold text-accent">{g.bttsRate} BTTS</span>
              </div>
              <p className="text-sm text-gray-700 mb-1">{g.reason}</p>
              <p className="text-xs font-bold text-accent">{g.tendency}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <a href={pmuTrackingUrl("prono-special")} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-block bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity">
          Willkommensbonus — Parier BTTS CDM 2026 sur Betano <ArrowRight className="inline w-4 h-4 ml-1" />
        </a>
        <p className="text-xs text-gray-400 mt-3">18+ | Es gelten die AGB</p>
      </section>

      <FAQSection title="Häufig gestellte Fragen — BTTS CDM 2026" items={faqItems} />

    </>
  );
}
