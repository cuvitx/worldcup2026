import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { guides, guidesByCategory } from "@repo/data/guides";
import { bookmakerReviews } from "@repo/data/bookmaker-reviews";
export const metadata: Metadata = {
  title: "Sportwetten-Ratgeber WM 2026 | Strategien & Tipps",
  description:
    "Alle unsere Sportwetten-Ratgeber für die WM 2026. Strategien, Tipps, Einsteiger-Ratgeber und Wettanbieter-Analysen.",
  alternates: getStaticAlternates("guides", "de"),
  openGraph: {
    title: "Sportwetten-Ratgeber - WM 2026",
    description: "Umfassende Ratgeber für Wetten auf die WM 2026.",
  },
};

const guidesJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Sportwetten-Ratgeber WM 2026",
  description: "Alle unsere Sportwetten-Ratgeber für die WM 2026.",
  url: "https://www.wm2026guide.de/guides",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: guides.map((guide, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://www.wm2026guide.de/guide/${guide.slug}`,
      name: guide.title,
    })),
  },
};

const categoryEmojis: Record<string, string> = {
  cdm2026: "",
  stratégie: "",
  bookmaker: "",
  debutant: "",
};

export default function GuidesPage() {
  const categoryLabels: Record<string, string> = {
    cdm2026: "WM 2026",
    stratégie: "Wettstrategien",
    bookmaker: "Wettanbieter & Vergleiche",
    debutant: "Einsteiger-Ratgeber",
  };
  const categoryDescriptions: Record<string, string> = {
    cdm2026: "Alles Wissenswerte für Wetten auf die WM 2026.",
    stratégie: "Fortgeschrittene Strategien zur Gewinnmaximierung.",
    bookmaker: "Vergleiche und Analysen der besten Wettanbieter.",
    debutant: "Die Grundlagen der Sportwetten für einen guten Einstieg.",
  };

  const categories = ["cdm2026", "stratégie", "bookmaker", "debutant"] as const;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guidesJsonLd) }}
      />
<section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">Sportwetten</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">Sportwetten-Ratgeber WM 2026</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {guides.length} umfassende Ratgeber für Wetten auf die WM 2026. Strategien, Einsteiger-Tipps und Wettanbieter-Analysen.
          </p>
        </div>
      </section>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
        {categories.map((cat) => {
          const catGuides = guidesByCategory[cat];
          if (!catGuides || catGuides.length === 0) return null;
          const emoji = categoryEmojis[cat] || "";
          return (
            <section key={cat} className="rounded-xl bg-white p-4 sm:p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                <span className="text-2xl">{emoji}</span> {categoryLabels[cat]}
              </h2>
              <p className="mb-5 text-sm text-gray-500">{categoryDescriptions[cat]}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {catGuides.map((guide) => (
                  <Link
                    key={guide.id}
                    href={`/guide/${guide.slug}`}
                    className="group rounded-xl border border-gray-200 p-5 transition-all hover:border-primary/30 hover:bg-primary/5 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className="text-3xl mb-3">{emoji}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 transition-colors">{guide.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">{guide.intro}</p>
                    <p className="text-sm font-bold text-primary">Lesen →</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* Bookmaker reviews */}
        <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <span className="text-2xl"></span> Wettanbieter-Bewertungen
          </h2>
          <p className="mb-4 text-sm text-gray-500">
            Ausführliche Tests und Bewertungen der besten lizenzierten Wettanbieter.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {bookmakerReviews.map((bk) => (
              <Link
                key={bk.id}
                href={`/wettanbieter/${bk.slug}`}
                className="flex items-center justify-between rounded-xl border border-gray-200 p-4 transition-all hover:border-primary/30 hover:bg-primary/5 hover:shadow-md"
              >
                <div>
                  <p className="font-bold text-gray-900">{bk.name}</p>
                  <p className="text-xs text-gray-500">{bk.tagline}</p>
                </div>
                <p className="font-bold text-field">{bk.bonus}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Praktische Ratgeber */}
        <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Praktische Ratgeber</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { href: "/voyage/esta-visa-usa", icon: "🛂", title: "ESTA für die USA", description: "Ihre Reisegenehmigung für die USA erhalten" },
              { href: "/voyage/visa-mexique", icon: "🇲🇽", title: "Visum Mexiko", description: "Einreiseformalitäten für Mexiko" },
              { href: "/voyage/formalites-canada", icon: "🇨🇦", title: "Formalitäten Kanada", description: "eTA und Dokumente für Kanada" },
              { href: "/voyage/decalage-horaire", icon: "🕐", title: "Zeitverschiebung", description: "Spielzeiten aus deutscher Sicht" },
              { href: "/vols", icon: "✈️", title: "Flüge", description: "Die besten Flüge in die USA/Kanada/Mexiko finden" },
              { href: "/budget", icon: "💵", title: "Reisebudget WM", description: "Ihr Budget für die WM 2026 berechnen" },
              { href: "/voyage/assurance", icon: "🛡️", title: "Reiseversicherung", description: "Welche Versicherung für die USA wählen" },
              { href: "/voyage/carte-sim", icon: "📱", title: "SIM-Karte USA", description: "In den USA verbunden bleiben" },
              { href: "/voyage/valise", icon: "🧳", title: "Was in den Koffer packen", description: "Checkliste, damit nichts vergessen wird" },
              { href: "/voyage/pourboires", icon: "💵", title: "Trinkgeld in den USA", description: "Trinkgeld-Ratgeber für die USA" },
              { href: "/voyage/supporter-francais", icon: "🇩🇪", title: "Deutsche Fans in den USA", description: "Tipps für deutsche Fans" },
              { href: "/voyage/wifi-Stadien", icon: "📶", title: "WLAN in den Stadien", description: "Internetverbindung in den WM-Stadien" },
              { href: "/voyage/alcool-Stadien", icon: "🍺", title: "Alkohol in den Stadien", description: "Alkoholregelungen in den Stadien" },
              { href: "/securite", icon: "🔒", title: "Sicherheit", description: "Sicherheitstipps für Ihre Reise" },
              { href: "/hebergement", icon: "🏨", title: "Unterkunft", description: "Wo übernachten während der WM 2026" },
              { href: "/Tickets", icon: "🎟️", title: "Tickets", description: "So kaufen Sie Ihre WM-Tickets" },
              { href: "/wo-schauen", icon: "📺", title: "Wo die Spiele schauen", description: "TV, Streaming und Bars für die WM" },
              { href: "/regarder-cdm-au-travail", icon: "💼", title: "Bei der Arbeit schauen", description: "Spiele vom Büro aus verfolgen" },
              { href: "/guide/glossaire", icon: "📖", title: "Fußball-Glossar", description: "Alle Fußballbegriffe erklärt" },
              { href: "/voyage/vols-budget", icon: "🧮", title: "Budgetrechner", description: "Berechnen Sie Ihr persönliches WM-Budget" },
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
        </section>

        {/* Cross-links */}
        <section className="rounded-xl bg-primary/5 p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Siehe auch</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/sportwetten" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Sportwetten WM 2026
            </Link>
            <Link href="/torschuetzen" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Torschützen-Quoten
            </Link>
            <Link href="/prognose/france" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Prognose Frankreich
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
