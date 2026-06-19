import Link from "next/link";
import { Card } from "@repo/ui/card";
import { SectionHeading } from "@repo/ui/section-heading";

export function MethodologySection() {
  return (
    <section className="bg-white py-12 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Card hover padding="md">
          <SectionHeading emoji="" title="Methodik" />
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            Unsere Prognosen werden mit einem an den internationalen Fußball angepassten
            ELO-Modell berechnet, kombiniert mit Monte-Carlo-Simulationen des Turniers
            (100.000 Iterationen). Die Buchmacher-Quoten werden als zusätzliches Signal
            zur Kalibrierung der Wahrscheinlichkeiten integriert.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            {[
              {
                icon: "",
                title: "ELO-Modell",
                desc: "Basierend auf den Ergebnissen der letzten 10 Jahre, gewichtet nach Bedeutung des Spiels",
              },
              {
                icon: "",
                title: "Monte Carlo",
                desc: "100.000 Simulationen des gesamten Turniers für robuste Wahrscheinlichkeiten",
              },
              {
                icon: "",
                title: "Marktquoten",
                desc: "Integriertes Buchmacher-Signal zur Kalibrierung der Wahrscheinlichkeiten an reale Bedingungen",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg bg-white p-4 border border-gray-200"
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
            href="/ueber-uns"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Unsere vollständige Methodik lesen →
          </Link>
        </Card>
      </div>
    </section>
  );
}
