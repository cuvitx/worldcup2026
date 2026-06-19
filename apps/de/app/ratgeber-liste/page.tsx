import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { guides, guidesByCategory } from "@repo/data/guides";
import { bookmakerReviews } from "@repo/data/bookmaker-reviews";
export const metadata: Metadata = {
  title: "Guides paris sportifs CDM 2026 | Strategies & conseils",
  description:
    "Tous nos guides de paris sportifs pour la WM 2026. Strategies, conseils, guides debutants et analyses de bookmakers.",
  alternates: getStaticAlternates("guides", "de"),
  openGraph: {
    title: "Guides paris sportifs - CDM 2026",
    description: "Guides complets pour parier sur la WM 2026.",
  },
};

const guidesJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Guides paris sportifs CDM 2026",
  description: "Tous nos guides de paris sportifs pour la WM 2026.",
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
    stratégie: "Strategies de paris",
    bookmaker: "Bookmakers & comparatifs",
    debutant: "Guides debutant",
  };
  const categoryDescriptions: Record<string, string> = {
    cdm2026: "Tout ce qu'il faut savoir pour parier sur la CDM 2026.",
    stratégie: "Strategies avancées pour maximiser vos gains.",
    bookmaker: "Comparatifs et analyses des meilleurs bookmakers.",
    debutant: "Les bases des paris sportifs pour bien debuter.",
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
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">Paris sportifs</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">Guides paris sportifs CDM 2026</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {guides.length} guides complets pour parier sur la WM 2026. Strategies, conseils debutants et analyses de bookmakers.
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
                    <p className="text-sm font-bold text-primary">Lire →</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* Bookmaker reviews */}
        <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <span className="text-2xl"></span> Avis bookmakers
          </h2>
          <p className="mb-4 text-sm text-gray-500">
            Tests et avis détaillés des meilleurs bookmakers agréés en France.
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

        {/* Guides pratiques */}
        <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Guides pratiques</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { href: "/voyage/esta-visa-usa", icon: "🛂", title: "ESTA pour les USA", description: "Obtenir votre autorisation de voyage pour les États-Unis" },
              { href: "/voyage/visa-mexique", icon: "🇲🇽", title: "Visa Mexique", description: "Formalités pour entrer au Mexique" },
              { href: "/voyage/formalites-canada", icon: "🇨🇦", title: "Formalités Canada", description: "AVE et documents pour le Canada" },
              { href: "/voyage/decalage-horaire", icon: "🕐", title: "Décalage horaire", description: "Horaires des matchs depuis la France" },
              { href: "/vols", icon: "✈️", title: "Vols", description: "Trouver les meilleurs vols vers les USA/Canada/Mexique" },
              { href: "/budget", icon: "💵", title: "Budget voyage CDM", description: "Estimer votre budget pour la CDM 2026" },
              { href: "/voyage/assurance", icon: "🛡️", title: "Assurance voyage", description: "Quelle assurance choisir pour les USA" },
              { href: "/voyage/carte-sim", icon: "📱", title: "Carte SIM USA", description: "Rester connecté aux États-Unis" },
              { href: "/voyage/valise", icon: "🧳", title: "Que mettre dans sa valise", description: "Checklist pour ne rien oublier" },
              { href: "/voyage/pourboires", icon: "💵", title: "Pourboires aux USA", description: "Guide des pourboires aux États-Unis" },
              { href: "/voyage/supporter-francais", icon: "🇫🇷", title: "Supporter français aux USA", description: "Conseils pour les supporters français" },
              { href: "/voyage/wifi-stades", icon: "📶", title: "WiFi dans les stades", description: "Connexion internet dans les stades CDM" },
              { href: "/voyage/alcool-stades", icon: "🍺", title: "Alcool dans les stades", description: "Réglementation sur l'alcool dans les stades" },
              { href: "/securite", icon: "🔒", title: "Sécurité", description: "Conseils de sécurité pour votre voyage" },
              { href: "/hebergement", icon: "🏨", title: "Hébergement", description: "Où dormir pendant la CDM 2026" },
              { href: "/Tickets", icon: "🎟️", title: "Tickets", description: "Comment acheter vos Tickets pour la CDM" },
              { href: "/ou-regarder", icon: "📺", title: "Où regarder les matchs", description: "TV, streaming et bars pour suivre la CDM" },
              { href: "/regarder-cdm-au-travail", icon: "💼", title: "Regarder au travail", description: "Suivre les matchs depuis le bureau" },
              { href: "/guide/glossaire", icon: "📖", title: "Glossaire football", description: "Tous les termes du football expliqués" },
              { href: "/voyage/vols-budget", icon: "🧮", title: "Calculateur de budget", description: "Calculez votre budget CDM personnalisé" },
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
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Voir aussi</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/sportwetten" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Paris sportifs CDM 2026
            </Link>
            <Link href="/torschuetzen" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Cotes buteurs
            </Link>
            <Link href="/prognose/france" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Prognose France
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
