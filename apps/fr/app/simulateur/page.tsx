import type { Metadata } from "next";
import Link from "next/link";
import { BracketSimulator } from "./components/BracketSimulator";
import { SocialProof } from "../components/SocialProof";

export const metadata: Metadata = {
  title: "Simulateur Coupe du Monde 2026 | Créez votre bracket",
  description:
    "Simulateur CDM 2026 : construisez votre bracket, prédisez les 16 matchs et couronnez votre champion. 32 équipes, 100% interactif et gratuit !",
  openGraph: {
    title: "Simulateur CDM 2026 | Construisez votre bracket",
    description:
      "Construisez votre bracket CDM 2026 : 32 équipes, 16 matchs à prédire. Couronnez votre champion en 2 minutes — 100% gratuit !",
  },
};

export default function SimulateurPage() {
  return (
    <>
      {/* Breadcrumb */}
      <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 py-2.5">
          <ol className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-300 flex-wrap min-w-0">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Accueil
              </Link>
            </li>
            <li className="text-gray-300 dark:text-gray-600">/</li>
            <li className="text-gray-900 dark:text-gray-100 font-medium">
              Simulateur
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="relative overflow-hidden text-white py-12 sm:py-16"
        style={{
          background:
            "linear-gradient(160deg, #060D18 0%, #0F1923 50%, #091420 100%)",
        }}
      >
        {/* Top glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/15 border border-secondary/30 px-3 py-1 text-xs font-bold text-secondary mb-3">
                🏆 Outil interactif
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold">
                Construisez votre bracket CDM 2026
              </h1>
              <p className="mt-2 text-gray-200 text-sm md:text-base max-w-xl">
                Qui soulèvera la Coupe ? Jouez le tournoi complet : 32 équipes,
                16 matchs à prédire. Résultat en 2 minutes.
              </p>

              {/* Quick stats */}
              <div className="flex items-center gap-4 mt-4">
                {[
                  { icon: "⚔️", text: "32 équipes" },
                  { icon: "🎯", text: "16 matchs à prédire" },
                  { icon: "💾", text: "Sauvegarde auto" },
                ].map((item) => (
                  <span
                    key={item.text}
                    className="flex items-center gap-1.5 text-xs text-gray-300"
                  >
                    <span>{item.icon}</span>
                    {item.text}
                  </span>
                ))}
              </div>
            </div>

            {/* Share CTA */}
            <div className="shrink-0">
              <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow text-center">
                <p className="text-xs text-gray-400 mb-2">
                  Partagez votre bracket
                </p>
                <Link
                  href="/quiz"
                  className="inline-flex items-center gap-2 rounded-lg border border-secondary/30 bg-secondary/10 px-4 py-2.5 text-sm font-bold text-secondary hover:bg-secondary/20 transition-all"
                >
                  🧩 Aussi : Quiz CDM
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simulator */}
      <section className="bg-gray-50 dark:bg-slate-900/50 py-8 sm:py-12">
        <div className="mx-auto max-w-[1600px] px-2 lg:px-4">
          <BracketSimulator />
        </div>
      </section>

      <SocialProof />

      {/* JSON-LD Breadcrumb */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.cdm2026.fr" },
              { "@type": "ListItem", position: 2, name: "Simulateur", item: "https://www.cdm2026.fr/simulateur" },
            ],
          }),
        }}
      />
    </>
  );
}
