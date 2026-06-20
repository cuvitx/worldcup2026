import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { HeartPulse, AlertTriangle, Clock, ArrowRight, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Verletzungen WM 2026 — Verletzte, unsichere und ausgefallene Spieler",
  description:
    "Verletzungsübersicht vor der WM 2026: spielfähige, unsichere oder ausgefallene Spieler pro Mannschaft. Regelmäßig aktualisierte Tabelle.",
  alternates: { canonical: "https://www.wm2026guide.de/verletzungen" },
  openGraph: {
    title: "Verletzungen WM 2026 — Spieler-Übersicht",
    description: "Wer wird bei der WM 2026 spielfähig sein? Verletzungsübersicht pro Mannschaft.",
    url: "https://www.wm2026guide.de/verletzungen",
  },
};

type Status = "Spielfähig" | "Unsicher" | "Ausfall";

interface PlayerInjury {
  player: string;
  team: string;
  position: string;
  injury: string;
  status: Status;
  returnDate: string;
}

const injuries: PlayerInjury[] = [
  { player: "Thibaut Courtois", team: "Belgien", position: "Torwart", injury: "Knie (Kreuzband)", status: "Unsicher", returnDate: "April 2026" },
  { player: "Neymar Jr", team: "Brasilien", position: "Stürmer", injury: "Knie (Kreuzband)", status: "Unsicher", returnDate: "März 2026" },
  { player: "Gavi", team: "Spanien", position: "Mittelfeldspieler", injury: "Knie (Kreuzband)", status: "Unsicher", returnDate: "Schrittweise Rückkehr" },
  { player: "Diogo Jota", team: "Portugal", position: "Stürmer", injury: "Knie", status: "Spielfähig", returnDate: "Genesen" },
  { player: "Lucas Hernandez", team: "Frankreich", position: "Verteidiger", injury: "Knie (Kreuzband)", status: "Unsicher", returnDate: "Mai 2026" },
  { player: "Presnel Kimpembe", team: "Frankreich", position: "Verteidiger", injury: "Achillessehne", status: "Ausfall", returnDate: "Unbestimmt" },
  { player: "N'Golo Kanté", team: "Frankreich", position: "Mittelfeldspieler", injury: "Oberschenkel", status: "Spielfähig", returnDate: "Genesen" },
  { player: "Leroy Sané", team: "Deutschland", position: "Flügelspieler", injury: "Knie", status: "Unsicher", returnDate: "Februar 2026" },
  { player: "Sergio Ramos", team: "Spanien", position: "Verteidiger", injury: "Nicht nominiert", status: "Ausfall", returnDate: "N/A" },
  { player: "Giorgio Chiellini", team: "Italien", position: "Verteidiger", injury: "Rücktritt Nationalmannschaft", status: "Ausfall", returnDate: "N/A" },
];

const statusConfig: Record<Status, { bg: string; text: string; icon: typeof ShieldCheck }> = {
  Spielfähig: { bg: "bg-green-100", text: "text-green-700", icon: ShieldCheck },
  Unsicher: { bg: "bg-yellow-100", text: "text-yellow-700", icon: Clock },
  Ausfall: { bg: "bg-red-100", text: "text-red-700", icon: AlertTriangle },
};

export default function VerletzungenPage() {
  const faqItems = [
    {
      question: "Wann wurden die offiziellen Listen der 26 Spieler veröffentlicht?",
      answer: "Die Trainer haben ihre Liste mit 26 Spielern im Mai 2026 bei der FIFA eingereicht, einige Wochen vor Turnierbeginn am 11. Juni 2026.",
    },
    {
      question: "Kann ein verletzter Spieler nach Bekanntgabe der Liste ersetzt werden?",
      answer: "Ja, die FIFA erlaubt den Ersatz eines verletzten Spielers bis 24 Stunden vor dem ersten Spiel der Mannschaft, ohne Positionsbeschränkung. Nach Turnierbeginn gelten strengere Regeln für Ersatzspielernominierungen.",
    },
    {
      question: "Sind diese Informationen aktuell?",
      answer: "Diese Seite wird regelmäßig anhand der verfügbaren Informationen aktualisiert. Die Status werden während des Turniers anhand offizieller Informationen aktualisiert.",
    },
  ];

  const fit = injuries.filter((p) => p.status === "Spielfähig");
  const unsicher = injuries.filter((p) => p.status === "Unsicher");
  const ausfaelle = injuries.filter((p) => p.status === "Ausfall");

  return (
    <>

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-2">
            Medizinische Übersicht
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Verletzungen WM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Übersicht der verletzten, unsicheren und ausgefallenen Spieler für die WM 2026.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-14">
        {/* Schnellübersicht */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {[
            { label: "Spielfähig", count: fit.length, color: "text-green-600" },
            { label: "Unsicher", count: unsicher.length, color: "text-yellow-600" },
            { label: "Ausfälle", count: ausfaelle.length, color: "text-red-600" },
          ].map((s) => (
            <div key={s.label} className="text-center rounded-xl border border-gray-200 p-3 sm:p-4">
              <span className={`block text-2xl sm:text-3xl font-black ${s.color}`}>{s.count}</span>
              <span className="text-xs sm:text-sm text-gray-500">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Tabelle */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <HeartPulse className="h-7 w-7 text-accent" />
            <h2 className="text-2xl font-bold text-primary">
              Verletzungstabelle pro Spieler
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="py-3 px-4 text-left rounded-tl-lg">Spieler</th>
                  <th className="py-3 px-4 text-left">Mannschaft</th>
                  <th className="py-3 px-4 text-left">Position</th>
                  <th className="py-3 px-4 text-left">Verletzung</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-left rounded-tr-lg">Geschätzte Rückkehr</th>
                </tr>
              </thead>
              <tbody>
                {injuries.map((p, i) => {
                  const cfg = statusConfig[p.status];
                  const Icon = cfg.icon;
                  return (
                    <tr
                      key={p.player}
                      className={i % 2 === 0 ? "bg-gray-50" : "bg-whitegray-900"}
                    >
                      <td className="py-3 px-4 font-medium">{p.player}</td>
                      <td className="py-3 px-4">{p.team}</td>
                      <td className="py-3 px-4">{p.position}</td>
                      <td className="py-3 px-4">{p.injury}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
                          <Icon className="h-3 w-3" /> {p.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{p.returnDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex items-start gap-3 rounded-xl bg-blue-50 border border-blue-200 p-4">
            <Clock className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
            <p className="text-sm text-blue-800">
              Letztes Update: Juni 2026. Die Status werden während des Turniers aktualisiert.
            </p>
          </div>
        </section>

        <div className="text-center">
          <Link
            href="/kader"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity"
          >
            Listen der 26 anzeigen <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <FAQSection items={faqItems} />
      </div>
    </>
  );
}
