import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { Swords, Calendar, MapPin, ArrowRight, Globe, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Barrages Coupe du Monde 2026 — Matchs intercontinentaux, dates, équipes",
  description:
    "Tout sur les barrages de la CDM 2026 : format intercontinental, 6 places restantes, équipes en lice, dates (mars 2026), enjeux et pronostics.",
  alternates: { canonical: "https://www.cdm2026.fr/barrages" },
  openGraph: {
    title: "Barrages CDM 2026 — Les 6 dernières places",
    description:
      "Format intercontinental, calendrier et enjeux des matchs de barrage pour la Coupe du Monde 2026.",
    url: "https://www.cdm2026.fr/barrages",
  },
};

const barrageMatches = [
  {
    id: 1,
    team1: "4e AFC (Indonésie)",
    team2: "5e CAF (à déterminer)",
    conf1: "Asie",
    conf2: "Afrique",
    date: "Mars 2026",
    venue: "À confirmer",
    place: "1 place",
  },
  {
    id: 2,
    team1: "5e CONMEBOL (à déterminer)",
    team2: "5e AFC (à déterminer)",
    conf1: "Amérique du Sud",
    conf2: "Asie",
    date: "Mars 2026",
    venue: "À confirmer",
    place: "1 place",
  },
  {
    id: 3,
    team1: "6e CONCACAF (à déterminer)",
    team2: "1er OFC (Nouvelle-Zélande)",
    conf1: "Amérique du Nord",
    conf2: "Océanie",
    date: "Mars 2026",
    venue: "À confirmer",
    place: "1 place",
  },
  {
    id: 4,
    team1: "Vainqueur barrage 1",
    team2: "Vainqueur barrage 2",
    conf1: "Intercontinental",
    conf2: "Intercontinental",
    date: "Mars 2026",
    venue: "À confirmer",
    place: "1 place (tournoi final)",
  },
];

const placesParConfederation = [
  { conf: "UEFA (Europe)", places: 16, directes: 16, barrages: 0 },
  { conf: "CAF (Afrique)", places: "9 (+1)", directes: 9, barrages: 1 },
  { conf: "AFC (Asie)", places: "8 (+2)", directes: 8, barrages: 2 },
  { conf: "CONMEBOL (Amérique du Sud)", places: "6 (+1)", directes: 6, barrages: 1 },
  { conf: "CONCACAF (Amérique du Nord)", places: "6 (+1)", directes: 6, barrages: 1 },
  { conf: "OFC (Océanie)", places: "1 (+1)", directes: 1, barrages: 1 },
];

export default function BarragesPage() {
  const faqItems = [
    {
      question: "Combien de places sont attribuées via les barrages CDM 2026 ?",
      answer:
        "6 places sont en jeu lors des barrages intercontinentaux de mars 2026. Ces matchs opposent des équipes de confédérations différentes pour les derniers billets vers la Coupe du Monde à 48 équipes.",
    },
    {
      question: "Quel est le format des barrages intercontinentaux 2026 ?",
      answer:
        "Les barrages se jouent en matchs aller-retour ou en tournoi centralisé (format à confirmer par la FIFA). Les équipes issues de différentes confédérations s'affrontent pour décrocher les 6 dernières places qualificatives.",
    },
    {
      question: "Quand se jouent les barrages CDM 2026 ?",
      answer:
        "Les barrages intercontinentaux sont prévus en mars 2026, soit environ 3 mois avant le coup d'envoi de la Coupe du Monde le 11 juin 2026.",
    },
    {
      question: "Quelles équipes participent aux barrages ?",
      answer:
        "Les équipes participantes sont déterminées par les qualifications de chaque confédération. Généralement, il s'agit des derniers qualifiés de chaque zone : 4e et 5e d'Asie, 5e d'Afrique, 5e d'Amérique du Sud, 6e de la CONCACAF et le vainqueur de l'OFC.",
    },
  ];

  return (
    <>

      {/* Hero */}
      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-2">
            Qualifications CDM 2026
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Barrages Coupe du Monde 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto mb-6">
            6 places restantes, des matchs intercontinentaux palpitants et des rêves de Coupe du Monde
            en jeu. Tout savoir sur les barrages de mars 2026.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { val: "6", label: "Places en jeu" },
              { val: "4", label: "Matchs" },
              { val: "Mars", label: "2026" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <span className="block text-4xl font-black text-accent">{s.val}</span>
                <span className="text-xs uppercase tracking-wider text-gray-300">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-14">
        {/* Répartition des places */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Globe className="h-7 w-7 text-accent" />
            <h2 className="text-2xl font-bold text-primary">
              Répartition des 48 places par confédération
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="py-3 px-4 text-left rounded-tl-lg">Confédération</th>
                  <th className="py-3 px-4 text-center">Places directes</th>
                  <th className="py-3 px-4 text-center">Via barrages</th>
                  <th className="py-3 px-4 text-center rounded-tr-lg">Total</th>
                </tr>
              </thead>
              <tbody>
                {placesParConfederation.map((c, i) => (
                  <tr
                    key={c.conf}
                    className={i % 2 === 0 ? "bg-gray-50" : "bg-whitegray-900"}
                  >
                    <td className="py-3 px-4 font-medium">{c.conf}</td>
                    <td className="py-3 px-4 text-center">{c.directes}</td>
                    <td className="py-3 px-4 text-center">{c.barrages}</td>
                    <td className="py-3 px-4 text-center font-bold">{c.places}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Matchs de barrage */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Swords className="h-7 w-7 text-accent" />
            <h2 className="text-2xl font-bold text-primary">
              Matchs de barrage intercontinentaux
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {barrageMatches.map((m) => (
              <div
                key={m.id}
                className="rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    Barrage {m.id}
                  </span>
                  <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full font-medium">
                    {m.place}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm font-medium mb-2">
                  <span>{m.team1}</span>
                  <span className="text-gray-400 text-xs">VS</span>
                  <span className="text-right">{m.team2}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {m.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {m.venue}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-start gap-3 rounded-xl bg-yellow-50 border border-yellow-200 p-4">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 shrink-0" />
            <p className="text-sm text-yellow-800">
              Les équipes et lieux exacts seront confirmés à l&apos;issue des qualifications de chaque
              confédération. Cette page sera mise à jour dès les résultats connus.
            </p>
          </div>
        </section>

        {/* Enjeux */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Swords className="h-7 w-7 text-accent" />
            <h2 className="text-2xl font-bold text-primary">
              Enjeux et contexte
            </h2>
          </div>
          <div className="prose max-w-none">
            <p>
              Les barrages intercontinentaux représentent la dernière chance pour 6 équipes de
              participer à la Coupe du Monde 2026. Avec le passage à 48 équipes, le nombre de places
              en barrages a augmenté, offrant davantage d&apos;opportunités aux confédérations
              historiquement moins représentées.
            </p>
            <p>
              Le format intercontinental rend ces matchs particulièrement imprévisibles : les styles
              de jeu très différents entre confédérations créent des confrontations uniques et souvent
              spectaculaires. Pour certaines nations, il s&apos;agit d&apos;une première participation
              potentielle à la Coupe du Monde.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/equipe"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity"
          >
            Voir les 48 équipes qualifiées <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <FAQSection items={faqItems} />
      </div>
    </>
  );
}
