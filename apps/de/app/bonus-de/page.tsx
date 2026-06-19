import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { pmuTrackingUrl } from "@repo/data/affiliates";
import { Gift, ArrowRight, Star, Clock, CheckCircle, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Sportwetten Bonus WM 2026 | Aktionscode & Betano Angebot",
  description:
    "Bonus und Aktionscode Betano für die WM 2026. Bis zu Willkommensbonus auf Ihre erste Wette. Lizenzierter Buchmacher.",
  openGraph: {
    title: "Sportwetten Bonus WM 2026 | Aktionscodes & Angebote",
    description:
      "Vergleich der Willkommensboni und Aktionscodes für Wetten auf die WM 2026.",
    url: "https://www.wm2026guide.de/bonus",
  },
  alternates: { canonical: "https://www.wm2026guide.de/bonus" },
};

interface BonusOffer {
  name: string;
  slug: string;
  bonus: string;
  bonusDetail: string;
  codePromo: string;
  conditions: string;
  note: number;
  url: string;
  highlights: string[];
}

const offers: BonusOffer[] = [
  {
    name: "Betano",
    slug: "pmu-sport",
    bonus: "Willkommensbonus",
    bonusDetail: "in Freebets ohne Bedingung",
    codePromo: "Kein Code erforderlich",
    conditions: "1. verlorene Wette erstattet, min. 1€",
    note: 8.7,
    url: pmuTrackingUrl("bonus"),
    highlights: ["Erstattung bei verlorener Wette", "Vertrauenswürdige Marke", "Detaillierte Statistiken"],
  },
];

export default function BonusHubPage() {
  return (
    <>

      {/* Hero */}
      <section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-accent">
            Bonus & Aktionscodes WM 2026
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Nutzen Sie die besten Willkommensangebote lizenzierter Buchmacher für Wetten auf die WM 2026. Bis zu Willkommensbonus auf jeder Seite.
          </p>
        </div>
      </section>


      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Introduction */}
        <section className="prose  max-w-none mb-12">
          <p className="text-lg text-gray-700  leading-relaxed">
            Die WM 2026 ist die perfekte Gelegenheit, den Willkommensbonus von Betano zu nutzen. Bis zu <strong>100€ in Freebets</strong> auf Ihre erste verlorene Wette. Ein verifiziertes Angebot eines lizenzierten Buchmachers.
          </p>
        </section>

        {/* Bonus banner */}
        <div className="rounded-2xl bg-accent/10 border border-accent/20 p-6 mb-10 text-center">
          <p className="text-sm text-gray-600  mb-1">Bonus verfügbar bei Betano</p>
          <p className="text-4xl font-extrabold text-accent">Bis zu 100€</p>
          <p className="text-sm text-gray-500 mt-1">in Freebets auf Ihre erste verlorene Wette</p>
        </div>

        {/* Offers grid */}
        <section className="grid gap-6 sm:grid-cols-2 mb-14">
          {offers.map((offer, i) => (
            <div
              key={offer.slug}
              className={`rounded-2xl border-2 bg-white  p-6 sm:p-8 relative ${
                i === 0 ? "border-accent" : "border-gray-200 "
              }`}
            >
              {i === 0 && (
                <span className="absolute -top-3 left-4 rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-white">
                  Bestes Angebot
                </span>
              )}
              <div className="flex items-center gap-3 mb-4">
                <Gift className="w-8 h-8 text-accent" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900 ">{offer.name}</h2>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-secondary text-accent" />
                    <span className="text-xs text-gray-500">{offer.note}/10</span>
                  </div>
                </div>
              </div>

              <p className="text-3xl font-extrabold text-accent mb-1">{offer.bonus}</p>
              <p className="text-sm text-gray-600  mb-4">{offer.bonusDetail}</p>

              <div className="space-y-2 mb-6 text-sm">
                <div className="flex items-center gap-2 text-gray-600 ">
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  <span>Aktionscode: <strong>{offer.codePromo}</strong></span>
                </div>
                <div className="flex items-start gap-2 text-gray-600 ">
                  <AlertTriangle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>Bedingungen: {offer.conditions}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {offer.highlights.map((h) => (
                  <span key={h} className="inline-flex items-center gap-1 text-xs bg-accent/10 text-accent px-2.5 py-1 rounded-full font-medium">
                    <CheckCircle className="w-3 h-3" />
                    {h}
                  </span>
                ))}
              </div>

              <a
                href={offer.url}
                target="_blank"
                rel="noopener noreferrer sponsored nofollow"
                className="inline-flex items-center justify-center gap-2 bg-accent text-white rounded-xl py-3.5 px-6 font-bold text-sm hover:bg-accent/90 transition-colors w-full"
              >
                Willkommensbonus bei Betano sichern <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </section>

        {/* Tipps */}
        <section className="rounded-2xl bg-primary/5 border border-primary/10 p-6 sm:p-8 mb-14">
          <h2 className="text-2xl font-bold text-gray-900  mb-4">Tipps zur optimalen Nutzung Ihrer Boni</h2>
          <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-700 ">
            <div>
              <h3 className="font-bold text-gray-900  mb-2">Nutzen Sie den Betano-Bonus</h3>
              <p>Registrieren Sie sich bei Betano und erhalten Sie 100€ in Freebets auf Ihre erste verlorene Wette. Betano ist einer der zuverlässigsten Anbieter auf dem Markt.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900  mb-2">Lesen Sie die Bedingungen</h3>
              <p>Jeder Bonus hat seine Bedingungen: Gültigkeitsdauer der Freebets, zulässige Wettarten, Mindestquote. Nehmen Sie sich die Zeit, diese zu lesen, um unangenehme Überraschungen zu vermeiden.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900  mb-2">Setzen Sie Ihre Freebets klug ein</h3>
              <p>Freebets eignen sich ideal zum Testen von Wetten mit hohen Quoten (Torschütze, exaktes Ergebnis), da Sie kein eigenes Geld riskieren. Nutzen Sie sie für die Spiele der WM 2026.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900  mb-2">Setzen Sie sich Grenzen</h3>
              <p>Bleiben Sie auch mit Boni verantwortungsbewusst. Legen Sie ein maximales Budget fest und nutzen Sie die Tools für verantwortungsvolles Spielen (Einzahlungslimits, Selbstausschluss), die jeder Buchmacher anbietet.</p>
            </div>
          </div>
        </section>

        {/* Cross-links */}
        <section className="rounded-2xl bg-white  border border-gray-200  p-6 sm:p-8 mb-10">
          <h2 className="text-xl font-bold text-gray-900  mb-4">Verwandte Seiten</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/sportwetten" className="rounded-lg bg-primary/5 px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Beste Buchmacher
            </Link>
            <Link href="/sportwetten/guide" className="rounded-lg bg-primary/5 px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Wett-Ratgeber
            </Link>
            <Link href="/methodes-paiement" className="rounded-lg bg-primary/5 px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Zahlungsmethoden
            </Link>
          </div>
        </section>
      </div>

      <FAQSection
        title="Fragen zum WM 2026 Bonus"
        items={[
          {
            question: "Wie funktioniert der Betano-Bonus?",
            answer: "Der Betano-Bonus erstattet Ihre erste verlorene Wette in Freebets, bis zu 100€. Er wird automatisch bei der Registrierung aktiviert. Es ist kein Aktionscode erforderlich.",
          },
          {
            question: "Gilt der Betano-Bonus für die WM 2026?",
            answer: "Ja, der Willkommensbonus von Betano ist auf alle Sportereignisse anwendbar, einschließlich der WM 2026. Betano wird während des Turniers auch spezielle Angebote bereitstellen.",
          },
          {
            question: "Benötige ich einen Aktionscode für den Betano-Bonus?",
            answer: "Nein, es ist kein Aktionscode erforderlich. Der Bonus wird automatisch bei der Registrierung und Ihrer ersten Wette aktiviert.",
          },
          {
            question: "Wie lange habe ich Zeit, meine Betano-Freebets zu nutzen?",
            answer: "Die Betano-Freebets sind 14 Tage nach Gutschrift gültig. Weitere Details finden Sie in den Angebotsbedingungen auf der Betano-Website.",
          },
          {
            question: "Was passiert, wenn meine erste Wette gewinnt?",
            answer: "Wenn Ihre erste Wette gewinnt, erhalten Sie Ihre Gewinne ganz normal. Die Erstattung in Freebets wird nur aktiviert, wenn Ihre erste Wette verloren geht. Es ist also ein risikoloses Sicherheitsnetz.",
          },
        ]}
      />
    </>
  );
}
