import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { Wallet, ArrowRight, Calculator, Shield, TrendingUp, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Bankroll-Management WM 2026 — Budget, Staking-Plan und Kelly-Kriterium",
  description:
    "Wie Sie Ihre Bankroll während der WM 2026 verwalten: empfohlenes Budget, Staking-Plan, vereinfachtes Kelly-Kriterium, häufige Fehler.",
  alternates: { canonical: "https://www.wm2026guide.de/sportwetten/bankroll" },
  openGraph: {
    title: "Bankroll-Management — WM 2026",
    description: "Budget, Staking-Plan und Kelly-Kriterium für Ihre Wetten zur WM 2026.",
    url: "https://www.wm2026guide.de/sportwetten/bankroll",
  },
};

const stakingPlans = [
  {
    name: "Flat Staking (empfohlen)",
    desc: "Setzen Sie immer den gleichen Betrag: 1 bis 3 % Ihrer Bankroll pro Wette.",
    example: "Bankroll 200 EUR → fester Einsatz von 2 bis 6 EUR pro Wette.",
    risk: "Niedrig",
    riskColor: "text-green-600",
  },
  {
    name: "Proportionales Staking",
    desc: "Passen Sie Ihren Einsatz je nach Überzeugung an: 1 % (gering), 2 % (mittel), 3 % (hoch).",
    example: "Frankreich -1.5 (hohe Überzeugung) → 3 % = 6 EUR. Außenseiter Tag 1 (spekulativ) → 1 % = 2 EUR.",
    risk: "Mittel",
    riskColor: "text-yellow-600",
  },
  {
    name: "Vereinfachtes Kelly-Kriterium",
    desc: "Formel: Einsatz = (Quote × geschätzte Wahrscheinlichkeit - 1) / (Quote - 1) × Bankroll. Teilen Sie durch 4 (Viertel-Kelly), um die Varianz zu begrenzen.",
    example: "Quote 2.50, geschätzte Wahrscheinlichkeit 45 %. Kelly = (2.5×0.45 - 1)/(2.5-1) = 0.083 → Viertel-Kelly: 2,1 % der Bankroll.",
    risk: "Variabel",
    riskColor: "text-orange-600",
  },
];

const budgetTiers = [
  { level: "Einsteiger", budget: "50 – 100 EUR", mise: "1 – 2 EUR", paris: "~30 Wetten", desc: "Zum Entdecken der Sportwetten während der WM ohne Risiko." },
  { level: "Fortgeschritten", budget: "200 – 500 EUR", mise: "4 – 10 EUR", paris: "~50 Wetten", desc: "Zum regelmäßigen Wetten auf die Gruppenphase und die K.-o.-Runde." },
  { level: "Erfahren", budget: "500 – 1000 EUR", mise: "10 – 20 EUR", paris: "~60 Wetten", desc: "Für eine umfassende Turnierbegleitung mit Kombiwetten." },
];

const erreurs = [
  "Einsätze nach einer Verlustserie erhöhen (Chasing Losses)",
  "Mehr als 5 % der Bankroll auf eine einzelne Wette setzen",
  "Das gesamte Budget in der ersten Woche der Gruppenphase einsetzen",
  "Die Finalrunden ignorieren (oft die profitabelsten)",
  "Unter Einfluss von Alkohol oder Emotionen wetten",
  "Wetten nicht dokumentieren (kein Tracking = kein Lerneffekt)",
];

export default function BankrollCdmPage() {
  const faqItems = [
    {
      question: "Welches Budget sollte man für Wetten auf die WM 2026 einplanen?",
      answer: "Ein vernünftiges Budget liegt zwischen 100 und 500 EUR für das gesamte Turnier (1 Monat). Legen Sie diesen Betrag VOR Turnierbeginn fest und überschreiten Sie ihn nie. Es ist ein Freizeitbudget, keine Investition.",
    },
    {
      question: "Ist das Kelly-Kriterium für WM-Wetten geeignet?",
      answer: "Das Kelly-Kriterium ist wirkungsvoll, aber schwer anzuwenden, da es eine genaue Wahrscheinlichkeitsschätzung erfordert. Verwenden Sie das Viertel-Kelly (durch 4 teilen), um die Varianz zu begrenzen. Flat Staking mit 2 % bleibt die einfachste und zuverlässigste Methode.",
    },
    {
      question: "Sollte man alles auf die Gruppenphase setzen?",
      answer: "Nein! Behalten Sie mindestens 40 % Ihrer Bankroll für die K.-o.-Runde. Die Gruppenphase bietet mehr Spiele, aber die K.-o.-Runde bietet oft mehr Value, da die Quoten stärker von Druck und Emotionen als von der Realität geprägt sind.",
    },
  ];

  return (
    <>

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-2">
            Sportwetten-Ratgeber
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Bankroll-Management WM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Budget, Staking-Plan und Disziplin: die Grundlagen, um den Marathon
            von einem Monat WM zu überstehen, ohne Ihre Bankroll zu sprengen.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-14">
        {/* Empfohlenes Budget */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
            <Wallet className="h-7 w-7 text-accent" /> Empfohlenes Budget
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {budgetTiers.map((t) => (
              <div key={t.level} className="rounded-xl border border-gray-200 p-5 space-y-3">
                <h3 className="font-bold text-primary">{t.level}</h3>
                <p className="text-2xl font-black text-accent">{t.budget}</p>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>Einsatz/Wette: {t.mise}</p>
                  <p>Volumen: {t.paris}</p>
                </div>
                <p className="text-xs text-gray-400">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Staking-Pläne */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
            <Calculator className="h-7 w-7 text-accent" /> Staking-Pläne
          </h2>
          <div className="space-y-4">
            {stakingPlans.map((sp) => (
              <div key={sp.name} className="rounded-xl border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-primary">{sp.name}</h3>
                  <span className={`text-xs font-semibold ${sp.riskColor}`}>Risiko: {sp.risk}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{sp.desc}</p>
                <div className="bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-500">
                  <strong>Beispiel:</strong> {sp.example}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fehler */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
            <AlertTriangle className="h-7 w-7 text-red-500" /> Fehler, die Sie vermeiden sollten
          </h2>
          <ul className="space-y-2">
            {erreurs.map((e) => (
              <li key={e} className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                <span className="text-gray-700">{e}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="text-center">
          <Link href="/sportwetten/glossar" className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity">
            Sportwetten-Glossar <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <FAQSection items={faqItems} />

        <p className="text-xs text-gray-400 text-center">
          Sportwetten sind mit Risiken verbunden. Spielen Sie verantwortungsvoll. 18+ | Informationen und Hilfe auf bzga.de (BZgA).
        </p>
      </div>
    </>
  );
}
