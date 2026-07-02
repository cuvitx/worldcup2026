import type { Metadata } from "next";
import Link from "next/link";
import { BracketSimulator } from "./components/BracketSimulator";
import { SocialProof } from "@repo/ui/social-proof";
import { FAQSection } from "@repo/ui/faq-section";

export const metadata: Metadata = {
  title: "Simulateur Coupe du Monde 2026 | Créez votre bracket",
  description:
    "Simulateur CDM 2026 : construisez votre bracket officiel, jouez les 16es, les 8es, les quarts, les demi-finales et couronnez votre champion.",
  alternates: {
    canonical: "https://www.cdm2026.fr/simulateur",
  },
  openGraph: {
    title: "Simulateur CDM 2026 | Construisez votre bracket",
    description:
      "Construisez votre bracket CDM 2026 avec les vraies affiches de 16es de finale. Couronnez votre champion en 2 minutes.",
  },
};

export default function SimulateurPage() {
  const faqItems = [
    {
      question: "Comment fonctionne le simulateur de bracket CDM 2026 ?",
      answer: "Le simulateur vous permet de prédire le parcours de chaque équipe dans la phase à élimination directe. Sélectionnez le vainqueur de chaque match en cliquant sur l'équipe de votre choix. Le simulateur progresse automatiquement : votre choix en 16es alimente les 8es, puis les quarts, les demi-finales et enfin la finale. Vos choix sont sauvegardés automatiquement dans votre navigateur."
    },
    {
      question: "Puis-je partager mon bracket avec mes amis ?",
      answer: "Oui ! Une fois votre bracket complété, vous pouvez le partager via un lien unique généré automatiquement. Ce lien capture tous vos pronostics et permet à vos amis de visualiser vos choix. Vous pouvez également comparer vos brackets pour voir qui aura fait les meilleures prédictions une fois le tournoi terminé."
    },
    {
      question: "Mes prédictions sont-elles sauvegardées ?",
      answer: "Oui, toutes vos prédictions sont sauvegardées automatiquement dans le stockage local de votre navigateur (localStorage). Vous pouvez revenir sur la page à tout moment et retrouver votre bracket. Attention : si vous videz le cache de votre navigateur ou utilisez un autre appareil, vos prédictions ne seront pas synchronisées (sauf si vous utilisez le lien de partage)."
    },
    {
      question: "Combien de matchs dois-je prédire dans le simulateur ?",
      answer: "Vous pouvez faire 31 choix pour désigner votre champion : 16 matchs de 16es de finale, 8 matchs de 8es de finale, 4 quarts, 2 demi-finales et la finale. L'ensemble du processus prend environ 2 à 3 minutes."
    },
    {
      question: "Le simulateur utilise-t-il de vraies données ?",
      answer: "Oui, le simulateur est alimenté par les vraies équipes qualifiées, les classements FIFA, les statistiques ELO et les probabilités de victoire calculées par notre modèle de prédiction. Les équipes affichées sont celles qui ont réellement obtenu leur qualification pour la CDM 2026. Les pourcentages de victoire affichés sont basés sur des données statistiques réelles et sont mis à jour régulièrement."
    }
  ];

  return (
    <>


      {/* Hero */}
      <section
        className="relative overflow-hidden text-white py-12 sm:py-16"
        style={{
          background:
            "linear-gradient(160deg, var(--color-primary) 0%, var(--color-deep) 50%, var(--color-primary) 100%)",
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
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 border border-accent/30 px-3 py-1 text-xs font-bold text-accent mb-3">
                Outil interactif
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold">
                Construisez votre bracket CDM 2026
              </h1>
              <p className="mt-2 text-gray-200 text-sm md:text-base max-w-xl">
                Qui soulèvera la Coupe ? Jouez le tableau officiel : 32 équipes,
                des 16es jusqu'à la finale. Résultat en 2 minutes.
              </p>

              {/* Quick stats */}
              <div className="flex items-center gap-4 mt-4">
                {[
                  { icon: "", text: "32 équipes" },
                  { icon: "", text: "31 choix jusqu'au champion" },
                  { icon: "", text: "Sauvegarde auto" },
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

            {/* Share CTA removed */}
          </div>
        </div>
      </section>

      {/* Simulator */}
      <section className="bg-gray-50 py-8 sm:py-12">
        <div className="mx-auto max-w-[1600px] px-2 lg:px-4">
          <BracketSimulator />
        </div>
      </section>

      <SocialProof />

      <FAQSection title="Questions sur le simulateur" items={faqItems} />
    </>
  );
}
