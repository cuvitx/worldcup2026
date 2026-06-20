import { domains } from "@repo/data/route-mapping";
import { getAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 86400;
export const dynamicParams = true;

interface BookmakerReview {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  bonus: string;
  bonusDetail: string;
  license: string;
  foundedYear: number;
  url: string;
  logo: null;
  description: string;
  pros: string[];
  cons: string[];
  ratings: { bonus: number; odds: number; app: number; live: number; support: number; withdrawal: number };
  sections: { title: string; content: string }[];
  paymentMethods: string[];
  minDeposit: string;
  withdrawalTime: string;
  customerSupport: string[];
  appAvailable: boolean;
  liveStreaming: boolean;
  cashOut: boolean;
}

const germanBookmakerReviews: BookmakerReview[] = [
  {
    id: "betano",
    slug: "betano",
    name: "Betano",
    tagline: "Einer der beliebtesten Sportwetten-Anbieter Deutschlands",
    bonus: "100% Willkommensbonus",
    bonusDetail: "bis zu 80€ auf die erste Einzahlung",
    license: "GGL (Deutschland)",
    foundedYear: 2016,
    url: "#",
    logo: null,
    description:
      "Betano ist einer der beliebtesten Sportwetten-Anbieter in Deutschland mit Millionen von Kunden europaweit. Die Plattform überzeugt durch eine intuitive Benutzeroberfläche, wettbewerbsfähige Quoten und eine preisgekrönte mobile App. Für die WM 2026 bietet Betano eine umfassende Abdeckung mit speziellen Märkten für jedes Spiel.",
    pros: [
      "Wettbewerbsfähige Quoten auf dem deutschen Markt",
      "Ausgezeichnete mobile App (iOS und Android)",
      "Intuitive Benutzeroberfläche",
      "Große Auswahl an Wettmärkten",
      "Cashout bei den meisten Wetten verfügbar",
      "Live-Wetten mit Statistiken",
    ],
    cons: ["Kein Live-Streaming für alle Spiele", "Auszahlungsdauer von 24-48h"],
    ratings: { bonus: 5, odds: 4, app: 5, live: 5, support: 4, withdrawal: 4 },
    sections: [
      {
        title: "Betano für die WM 2026",
        content:
          "Betano wird einer der aktivsten Wettanbieter für die WM 2026 sein. Erwarten Sie gebooste Quoten auf Spiele der Favoriten, Spezialwetten und tägliche Promotions während des gesamten Turniers.",
      },
    ],
    paymentMethods: ["Kreditkarte", "PayPal", "Sofortüberweisung", "Paysafecard"],
    minDeposit: "10€",
    withdrawalTime: "24-48h",
    customerSupport: ["Live-Chat", "E-Mail", "FAQ"],
    appAvailable: true,
    liveStreaming: true,
    cashOut: true,
  },
  {
    id: "tipico",
    slug: "tipico",
    name: "Tipico",
    tagline: "Deutschlands bekanntester Wettanbieter",
    bonus: "100% bis 100€",
    bonusDetail: "Willkommensbonus auf die erste Einzahlung",
    license: "GGL (Deutschland)",
    foundedYear: 2004,
    url: "#",
    logo: null,
    description:
      "Tipico ist der bekannteste Sportwetten-Anbieter in Deutschland mit einem dichten Netz an Wettshops und einer starken Online-Präsenz. Bekannt für Zuverlässigkeit und einfache Bedienung.",
    pros: [
      "Bekanntester Anbieter in Deutschland",
      "Wettshops in vielen deutschen Städten",
      "Sehr einfache Bedienung",
      "Schnelle Auszahlungen",
      "Guter Kundenservice",
    ],
    cons: ["Quoten nicht immer die besten", "Limitierungen bei Vielwettern"],
    ratings: { bonus: 4, odds: 4, app: 5, live: 4, support: 5, withdrawal: 5 },
    sections: [],
    paymentMethods: ["Kreditkarte", "PayPal", "Sofortüberweisung", "Paysafecard"],
    minDeposit: "10€",
    withdrawalTime: "24-48h",
    customerSupport: ["Live-Chat", "E-Mail", "FAQ"],
    appAvailable: true,
    liveStreaming: false,
    cashOut: true,
  },
  {
    id: "bwin",
    slug: "bwin",
    name: "Bwin",
    tagline: "Internationaler Wettanbieter mit deutscher Lizenz",
    bonus: "100€ Joker-Wette",
    bonusDetail: "Erste Wette ohne Risiko bis 100€",
    license: "GGL (Deutschland)",
    foundedYear: 1997,
    url: "#",
    logo: null,
    description:
      "Bwin gehört zu den größten Sportwetten-Anbietern weltweit und ist seit Jahren auf dem deutschen Markt etabliert. Bekannt für exzellente Quoten und ein breites Live-Wetten-Angebot.",
    pros: [
      "Exzellente Quoten",
      "Breites Live-Wetten-Angebot",
      "Internationale Erfahrung",
      "Gute Statistik-Integration",
    ],
    cons: ["App manchmal langsam", "Bonusbedingungen komplex"],
    ratings: { bonus: 4, odds: 5, app: 4, live: 5, support: 4, withdrawal: 4 },
    sections: [],
    paymentMethods: ["Kreditkarte", "PayPal", "Sofortüberweisung", "Paysafecard"],
    minDeposit: "10€",
    withdrawalTime: "24-48h",
    customerSupport: ["Live-Chat", "E-Mail", "FAQ"],
    appAvailable: true,
    liveStreaming: false,
    cashOut: true,
  },
  {
    id: "bet-at-home",
    slug: "bet-at-home",
    name: "Bet-at-Home",
    tagline: "Der österreichisch-deutsche Wettanbieter",
    bonus: "100% Einzahlungsbonus",
    bonusDetail: "bis zu 100€ für Neukunden",
    license: "GGL (Deutschland)",
    foundedYear: 1999,
    url: "#",
    logo: null,
    description:
      "Bet-at-Home ist ein börsennotierter Wettanbieter aus dem DACH-Raum mit über 20 Jahren Erfahrung. Solide Plattform mit gutem Kundenservice und fairen Bonusbedingungen.",
    pros: [
      "Aus dem DACH-Raum",
      "Über 20 Jahre Erfahrung",
      "Faire Bonusbedingungen",
      "Deutschsprachiger Support",
    ],
    cons: ["App könnte moderner sein", "Quoten im Mittelfeld"],
    ratings: { bonus: 4, odds: 4, app: 4, live: 4, support: 4, withdrawal: 4 },
    sections: [],
    paymentMethods: ["Kreditkarte", "PayPal", "Sofortüberweisung", "Paysafecard"],
    minDeposit: "10€",
    withdrawalTime: "24-48h",
    customerSupport: ["Live-Chat", "E-Mail", "FAQ"],
    appAvailable: true,
    liveStreaming: false,
    cashOut: true,
  },
];

const germanBookmakerReviewsBySlug: Record<string, BookmakerReview> = Object.fromEntries(
  germanBookmakerReviews.map((bk) => [bk.slug, bk])
);

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return germanBookmakerReviews.map((bk) => ({ slug: bk.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const bk = germanBookmakerReviewsBySlug[slug];
  if (!bk) return {};

  return {
    title: `Bewertung ${bk.name} 2026 | Bonus, Quoten & vollständiger Test`,
    description: `Bewertung ${bk.name} für die WM 2026. ${bk.bonus} ${bk.bonusDetail}. Vollständiger Test: Quoten, App, Live-Wetten, Auszahlung und Kundenservice.`,
    alternates: getAlternates("bookmaker", slug, "de"),
    openGraph: {
      title: `Bewertung ${bk.name} - Sportwetten WM 2026`,
      description: `Test und vollständige Bewertung von ${bk.name}. ${bk.bonus} Bonus für die WM 2026.`,
    },
  };
}

export default async function BookmakerPage({ params }: PageProps) {
  const { slug } = await params;
  const bk = germanBookmakerReviewsBySlug[slug];
  if (!bk) notFound();

  const avgRating = Object.values(bk.ratings).reduce((a, b) => a + b, 0) / 6;
  const ratingLabels: Record<string, string> = {
    bonus: "Bonus",
    odds: "Quoten",
    app: "App",
    live: "Live-Wetten",
    support: "Kundenservice",
    withdrawal: "Auszahlung",
  };

  const otherBookmakers = germanBookmakerReviews.filter((b) => b.id !== bk.id);

  return (
    <>
{/* Breadcrumbs */}
{/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="flex-1">
              <h1 className="text-2xl font-extrabold sm:text-4xl">Bewertung {bk.name} 2026</h1>
              <p className="mt-2 text-xl text-gray-300">{bk.tagline}</p>
              <p className="mt-1 text-gray-500">
                Gegründet {bk.foundedYear} &middot; Lizenz {bk.license}
              </p>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-2xl text-accent">{"★".repeat(Math.round(avgRating))}</span>
                <span className="text-lg font-bold">{avgRating.toFixed(1)}/5</span>
              </div>
            </div>
            <div className="rounded-lg bg-white/10 p-6 text-center">
              <p className="text-3xl font-extrabold text-accent">{bk.bonus}</p>
              <p className="text-sm text-gray-300">{bk.bonusDetail}</p>
              <a
                href={bk.url}
                target="_blank"
                rel="noopener noreferrer sponsored nofollow"
                className="mt-3 inline-block rounded-lg bg-accent px-6 py-3 text-sm font-bold text-white hover:bg-accent/90 transition-colors"
              >
                Konto eröffnen
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Beschreibung */}
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Vorstellung von {bk.name}</h2>
              <p className="text-gray-700">{bk.description}</p>
            </section>

            {/* Bewertungen */}
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Detaillierte Bewertungen</h2>
              <div className="space-y-3">
                {Object.entries(bk.ratings).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{ratingLabels[key] ?? key}</span>
                      <span className="text-sm font-bold text-primary">{value}/5</span>
                    </div>
                    <div className="relative h-3 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full bg-primary"
                        style={{ width: `${(value / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-lg bg-accent/10 border border-accent/30 p-4 text-center">
                <p className="text-sm text-gray-500">Gesamtbewertung</p>
                <p className="text-2xl font-extrabold text-accent sm:text-4xl">{avgRating.toFixed(1)}/5</p>
              </div>
            </section>

            {/* Vor- & Nachteile */}
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Vorteile und Nachteile</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-field/5 border border-field/20 p-4">
                  <h3 className="text-lg font-semibold text-gray-900 text-field mb-3">Vorteile</h3>
                  <ul className="space-y-2">
                    {bk.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-field mt-0.5">+</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                  <h3 className="text-lg font-semibold text-gray-900 text-red-600 mb-3">Nachteile</h3>
                  <ul className="space-y-2">
                    {bk.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-red-500 mt-0.5">-</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Content Sections */}
            {bk.sections.map((section, i) => (
              <section key={i} className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                <p className="text-gray-700">{section.content}</p>
              </section>
            ))}

            {/* CTA */}
            <section className="rounded-lg bg-accent/5 border-2 border-accent p-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 text-accent">{bk.bonus}</h2>
              <p className="mb-4 text-gray-600">{bk.bonusDetail} bei {bk.name}</p>
              <a
                href={bk.url}
                target="_blank"
                rel="noopener noreferrer sponsored nofollow"
                className="inline-block rounded-xl bg-accent px-8 py-3.5 text-lg font-bold text-white hover:bg-accent/90 transition-colors"
              >
                Bei {bk.name} registrieren
              </a>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info Card */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Infos {bk.name}</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Bonus</dt>
                  <dd className="font-bold text-field">{bk.bonus}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Mindesteinzahlung</dt>
                  <dd className="font-medium">{bk.minDeposit}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Auszahlungsdauer</dt>
                  <dd className="font-medium text-right max-w-[60%]">{bk.withdrawalTime}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">App</dt>
                  <dd className="font-medium">{bk.appAvailable ? "iOS & Android" : "Nein"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Live-Streaming</dt>
                  <dd className="font-medium">{bk.liveStreaming ? "Ja" : "Nein"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Cash-out</dt>
                  <dd className="font-medium">{bk.cashOut ? "Ja" : "Nein"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Lizenz</dt>
                  <dd className="font-medium">{bk.license}</dd>
                </div>
              </dl>
            </div>

            {/* Zahlungsmethoden */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Zahlungsmethoden</h3>
              <div className="flex flex-wrap gap-2">
                {bk.paymentMethods.map((method) => (
                  <span key={method} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                    {method}
                  </span>
                ))}
              </div>
            </div>

            {/* Weitere Wettanbieter */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Weitere Wettanbieter</h3>
              <ul className="space-y-2">
                {otherBookmakers.map((other) => (
                  <li key={other.id}>
                    <Link
                      href={`/wettanbieter/${other.slug}`}
                      className="flex items-center justify-between text-sm hover:text-primary transition-colors"
                    >
                      <span className="font-medium">{other.name}</span>
                      <span className="text-field">{other.bonus}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Review",
            itemReviewed: {
              "@type": "Organization",
              name: bk.name,
            },
            author: {
              "@type": "Organization",
              name: "WM 2026",
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: avgRating.toFixed(1),
              bestRating: 5,
              worstRating: 1,
            },
            description: `Bewertung ${bk.name} für die WM 2026. ${bk.bonus} Bonus.`,
            url: `${domains.de}/wettanbieter/${bk.slug}`,
          }),
        }}
      />
    </>
  );
}
