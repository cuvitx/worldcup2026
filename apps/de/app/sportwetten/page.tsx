import Image from "next/image";
import { getStaticAlternates } from "@repo/data/route-mapping";
import { FAQSection } from "@repo/ui/faq-section";
import type { Metadata } from "next";
import Link from "next/link";
import { bookmakerReviews } from "@repo/data/bookmaker-reviews";
import { guides, guidesByCategory } from "@repo/data/guides";
import { TableOfContents } from "@repo/ui";
import { PmuCTA } from "../components/PmuCTA";

export const metadata: Metadata = {
  title: "Sportwetten WM 2026 | Beste Wettanbieter & Ratgeber",
  description:
    "Vergleich der besten Sportwetten-Anbieter für die WM 2026. Bewertungen, Bonus, Quoten und strategische Ratgeber für Wetten auf die WM 2026.",
  alternates: getStaticAlternates("betting", "de"),
  openGraph: {
    title: "Sportwetten - WM 2026",
    description:
      "Beste Wettanbieter, Ratgeber und Strategien für Wetten auf die WM 2026.",
  },
};

export default function ParisSportifsPage() {
  const faqItems = [
    {
      question: "Welcher ist der beste Sportwetten-Anbieter für die WM 2026?",
      answer: "Der beste Wettanbieter für die WM 2026 ist Betano: ein vertrauenswürdiger Anbieter mit umfassender mobiler App, integrierten Statistiken und einem Willkommensbonus auf die erste Wette. Vergleichen Sie immer die Quoten vor dem Wetten."
    },
    {
      question: "Wie wettet man auf die WM 2026?",
      answer: "So wetten Sie auf die WM 2026: 1) Registrieren Sie sich bei Betano, 2) Verifizieren Sie Ihr Konto mit einem Ausweisdokument, 3) Zahlen Sie Geld per Kreditkarte oder Überweisung ein, 4) Wählen Sie ein Spiel und einen Markt (Sieger, genaues Ergebnis, Torschütze...), 5) Setzen Sie Ihren Einsatz und bestätigen Sie. Spielen Sie verantwortungsvoll, setzen Sie sich Einzahlungslimits und setzen Sie nie mehr, als Sie verlieren können. 18+."
    },
    {
      question: "Welche Wettarten sind für die WM 2026 verfügbar?",
      answer: "Die wichtigsten Wettmärkte sind: Turniersieger, Spielsieger (1X2), Asiatisches Handicap, genaues Ergebnis, Anzahl der Tore (Über/Unter), Halbzeit/Endstand, Torschütze (erster, letzter, jederzeit), Ecken, Karten, Qualifikation einer Mannschaft, Torschützenkönig des Turniers und Kombiwetten. Die Wettanbieter bieten auch Live-Wetten während der Spiele mit Echtzeit-Quoten an."
    },
    {
      question: "Kann man während der WM 2026 live wetten?",
      answer: "Ja, Betano bietet Live-Wetten auf WM-Spiele an. Die Quoten entwickeln sich in Echtzeit je nach Spielereignissen (Tore, Karten, Chancen...). Der Cashout ist ebenfalls bei Betano verfügbar, um eine Wette vor Spielende zu schließen."
    },
    {
      question: "Wer sind die Favoriten der Wettanbieter für die WM 2026?",
      answer: "Laut den Wettquoten (Februar 2026) sind die Favoriten für den Gewinn der WM 2026: Frankreich (~5.50), Brasilien (~6.00), England (~7.00), Argentinien (~8.00) und Spanien (~9.00). Frankreich ist Favorit dank seines außergewöhnlichen Kaders (Mbappé, Griezmann, Tchouaméni) und seiner Beständigkeit bei großen Turnieren. Die Quoten ändern sich ständig je nach Teamform, Verletzungen und Vorbereitungsergebnissen."
    },
    {
      question: "Sind Sportwetten auf die WM 2026 in Deutschland legal?",
      answer: "Ja, Sportwetten sind in Deutschland mit dem Glücksspielstaatsvertrag 2021 legal reguliert. Nur Anbieter mit deutscher Lizenz dürfen Online-Wetten anbieten. Betano gehört zu den lizenzierten Wettanbietern. Wetten bei nicht lizenzierten Anbietern ist illegal und birgt Risiken (kein rechtlicher Schutz, möglicher Betrug)."
    }
  ];

  const categoryLabels: Record<string, string> = {
    cdm2026: "WM 2026",
    stratégie: "Wettstrategien",
    bookmaker: "Wettanbieter",
    debutant: "Einsteiger",
  };

  const categories = ["cdm2026", "stratégie", "bookmaker", "debutant"] as const;

  return (
    <>
<section className="hero-animated text-white py-12 sm:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">Sportwetten WM 2026</h1>
          <p className="mt-2 text-gray-300">
            Vergleich der besten Wettanbieter, Wettratgeber und Strategien für die WM 2026.
          </p>
        </div>
      </section>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:grid lg:grid-cols-[1fr_220px] lg:gap-8">
        <div className="space-y-10">
        {/* Bookmaker Reviews */}
        <section className="rounded-xl bg-white p-4 sm:p-6 sm:p-8 shadow-sm border border-gray-200">
          <h2 id="bookmakers" className="text-2xl font-bold text-gray-900 mb-2">Beste Sportwetten-Anbieter 2026</h2>
          <p className="mb-6 text-sm text-gray-600">
            Unsere ausführlichen Bewertungen der {bookmakerReviews.length} besten Wettanbieter für Wetten auf die WM 2026.
          </p>
          <div className="space-y-4">
            {bookmakerReviews.map((bk, i) => {
              const avgRating = Object.values(bk.ratings).reduce((a, b) => a + b, 0) / 6;
              return (
                <Link
                  key={bk.id}
                  href={`/wettanbieter/${bk.slug}`}
                  className={`relative flex flex-col sm:flex-row items-center gap-4 rounded-xl border-2 p-5 transition-all hover:shadow-md ${
                    i === 0 ? "border-accent bg-accent/5" : "border-gray-200 hover:border-primary/30"
                  }`}
                >
                  {i === 0 && (
                    <span className="absolute -top-3 left-4 rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-white">
                      #1 Empfehlung
                    </span>
                  )}
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-3">
                      {bk.logo && <Image src={bk.logo} alt={`Logo ${bk.name}`} width={40} height={40} className="h-10 w-10 rounded-lg object-contain" />}
                      <p className="text-xl font-bold">{bk.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{bk.tagline}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-sm text-accent">{"★".repeat(Math.round(avgRating))}</span>
                      <span className="text-xs text-gray-500">{avgRating.toFixed(1)}/5</span>
                    </div>
                  </div>
                  <div className="flex-1 text-center">
                    <p className="text-2xl font-extrabold text-field">{bk.bonus}</p>
                    <p className="text-xs text-gray-500">{bk.bonusDetail}</p>
                  </div>
                  <div className="flex gap-4 text-center">
                    <div>
                      <p className="text-xs text-gray-500">Quoten</p>
                      <p className="font-bold text-primary">{bk.ratings.odds}/5</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">App</p>
                      <p className="font-bold text-primary">{bk.ratings.app}/5</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Live</p>
                      <p className="font-bold text-primary">{bk.ratings.live}/5</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-block rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-white">
                      Bewertung ansehen &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* PMU CTA */}
        <section className="py-6 sm:py-8">
          <PmuCTA tracking="paris-sportifs" />
        </section>

        {/* Guides by category */}
        {categories.map((cat) => {
          const catGuides = guidesByCategory[cat];
          if (!catGuides || catGuides.length === 0) return null;
          return (
            <section key={cat} className="rounded-xl bg-white p-4 sm:p-6 sm:p-8 shadow-sm border border-gray-200">
              <h2 id={`guide-${cat}`} className="text-2xl font-bold text-gray-900 mb-4">{categoryLabels[cat]}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {catGuides.map((guide) => (
                  <Link
                    key={guide.id}
                    href={`/guide/${guide.slug}`}
                    className="block rounded-xl border border-gray-200 p-4 sm:p-5 transition-colors hover:border-primary/30 hover:bg-primary/5"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{guide.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{guide.metaDescription}</p>
                    <p className="mt-2 text-xs font-medium text-primary">Ratgeber lesen &rarr;</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* Cross-links */}
        <section className="rounded-xl bg-primary/5 border border-primary/10 p-6 sm:p-8">
          <h2 id="voir-aussi" className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Siehe auch</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/torschuetzen" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Torschützen-Quoten WM 2026
            </Link>
            <Link href="/prognose/france" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Prognose Frankreich
            </Link>
            <Link href="/spiel/spielplan" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Spielplan
            </Link>
            <Link href="/mannschaft" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Alle Mannschaften
            </Link>
          </div>
        </section>
        </div>
        <TableOfContents items={[
          { id: "bookmakers", label: "Beste Wettanbieter", level: 2 },
          { id: "guide-cdm2026", label: "WM 2026", level: 2 },
          { id: "guide-stratégie", label: "Strategien", level: 2 },
          { id: "guide-bookmaker", label: "Wettanbieter", level: 2 },
          { id: "guide-debutant", label: "Einsteiger", level: 2 },
          { id: "voir-aussi", label: "Siehe auch", level: 2 },
        ]} />
      </div>

      <section className="py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PmuCTA tracking="paris-sportifs" />
        </div>
      </section>

      {/* Alle Wettratgeber */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Alle Wettratgeber</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { href: "/sportwetten/corners", icon: "🚩", title: "Eckball-Wetten", description: "Strategien und Tipps für Wetten auf Ecken" },
              { href: "/sportwetten/handicap", icon: "⚖️", title: "Handicap-Wetten", description: "Handicap-Wetten verstehen und meistern" },
              { href: "/sportwetten/live", icon: "⚡", title: "Live-Wetten", description: "Techniken für Live-Wetten während der Spiele" },
              { href: "/sportwetten/halbzeit", icon: "⏸️", title: "Halbzeit-Wetten", description: "Chancen zur Halbzeit nutzen" },
              { href: "/sportwetten/kombiwetten", icon: "🔗", title: "Kombiwetten", description: "Gewinne mit Kombiwetten maximieren" },
              { href: "/prognose/btts", icon: "⚽", title: "BTTS (Beide treffen)", description: "Prognosen zu beiden Teams treffen" },
              { href: "/prognose/over-under", icon: "📊", title: "Over/Under", description: "Auf die Anzahl der Tore in einem Spiel wetten" },
              { href: "/sportwetten/value-bets", icon: "💎", title: "Value Bets", description: "Unterbewertete Quoten der Wettanbieter erkennen" },
              { href: "/sportwetten/cashout", icon: "💰", title: "Cashout-Ratgeber", description: "Wann und wie man den Cashout nutzt" },
              { href: "/sportwetten/bankroll", icon: "🏦", title: "Bankroll-Management", description: "Ihr Wettbudget für die WM 2026 verwalten" },
              { href: "/sportwetten/strategie", icon: "🎯", title: "Gruppenphase-Strategie", description: "Spezifische Strategien für die Gruppenphase" },
              { href: "/sportwetten/guide", icon: "📖", title: "Kompletter Wettratgeber", description: "Der ultimative Ratgeber für Fußballwetten" },
              { href: "/sportwetten/glossar", icon: "📚", title: "Wett-Glossar", description: "Alle Sportwetten-Begriffe erklärt" },
              { href: "/sportwetten/wetter", icon: "🌦️", title: "Wetter-Einfluss auf Wetten", description: "Wie das Wetter die Ergebnisse beeinflusst" },
              { href: "/methodes-paiement", icon: "💳", title: "Zahlungsmethoden", description: "Ein- und Auszahlungen bei Wettanbietern" },
              { href: "/meilleurs-bookmakers", icon: "🏆", title: "Beste Wettanbieter", description: "Vergleich der besten Sportwetten-Anbieter" },
              { href: "/comparateur-cotes", icon: "📈", title: "Quotenvergleich", description: "Quoten der Wettanbieter in Echtzeit vergleichen" },
              { href: "/bonus", icon: "🎁", title: "Wettanbieter-Bonus", description: "Alle Boni und Willkommensangebote" },
            ].map(item => (
              <Link key={item.href} href={item.href} className="group rounded-xl border border-gray-200 bg-white p-5 hover:shadow-md hover:border-primary/30 transition-all">
                <div className="flex items-start gap-3">
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQSection title="Fragen zu Sportwetten WM 2026" items={faqItems} />
</>
  );
}
