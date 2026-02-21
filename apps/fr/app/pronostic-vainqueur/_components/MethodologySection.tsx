import Link from "next/link";
import { Card } from "@repo/ui/card";
import { SectionHeading } from "@repo/ui/section-heading";

export function MethodologySection() {
  return (
    <section className="bg-whiteslate-900 py-12 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Card hover padding="md">
          <SectionHeading emoji="" title="Méthodologie" />
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            Nos pronostics sont calculés à partir d&apos;un modèle ELO adapté au
            football international, combiné à des simulations Monte Carlo du tournoi
            (100 000 itérations). Les cotes bookmakers sont intégrées comme signal
            supplémentaire pour calibrer les probabilités.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            {[
              {
                icon: "",
                title: "Modèle ELO",
                desc: "Basé sur les résultats des 10 dernières années, pondérés par l'importance du match",
              },
              {
                icon: "",
                title: "Monte Carlo",
                desc: "100 000 simulations du tournoi complet pour des probabilités robustes",
              },
              {
                icon: "",
                title: "Cotes marché",
                desc: "Signal bookmaker intégré pour calibrer les probabilités aux conditions réelles",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg bg-whiteslate-900 p-4 border border-gray-200"
              >
                <p className="text-2xl mb-2">{item.icon}</p>
                <p className="font-bold text-gray-900 text-sm mb-1">
                  {item.title}
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="/methodologie"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Lire notre méthodologie complète →
          </Link>
        </Card>
      </div>
    </section>
  );
}
