import type { Metadata } from "next";
import Link from "next/link";
import { getStaticAlternates } from "@repo/data/route-mapping";
export const metadata: Metadata = {
  title: "Kontakt — Kontaktieren Sie das Team WM 2026",
  description:
    "Kontaktieren Sie das Team WM 2026 bei Fragen, Vorschlägen oder Partnerschaftsanfragen. FAQ und nützliche Informationen.",
  alternates: getStaticAlternates("contact", "de"),
  openGraph: {
    title: "Kontakt - WM 2026",
    description: "Kontaktieren Sie das Team WM 2026 bei Fragen oder Partnerschaftsanfragen.",
  },
};

const faqs = [
  {
    question: "Sind Ihre Prognosen kostenlos?",
    answer:
      "Ja, alle unsere Prognosen und Analysen sind vollständig kostenlos. Wir finanzieren uns über Affiliate-Links zu lizenzierten Wettanbietern.",
  },
  {
    question: "Sind Sie mit der FIFA verbunden?",
    answer:
      "Nein, WM 2026 ist eine unabhängige Informationswebsite. Wir sind weder mit der FIFA noch mit einem Fußballverband verbunden.",
  },
  {
    question: "Wie werden Ihre Prognosen berechnet?",
    answer:
      "Unsere Prognosen basieren auf statistischen Modellen, die ELO-Ranking, aktuelle Form, Direktvergleiche und Wettquoten kombinieren. Besuchen Sie unsere Methodik-Seite für weitere Informationen.",
  },
  {
    question: "Darf ich Ihre Inhalte auf meiner Website verwenden?",
    answer:
      "Unsere Inhalte sind urheberrechtlich geschützt. Für Reproduktionsanfragen oder redaktionelle Partnerschaften kontaktieren Sie uns bitte per E-Mail.",
  },
];

export default function ContactPage() {
  return (
    <>

      <section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">Kontakt aufnehmen</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">Kontakt</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Eine Frage, ein Vorschlag oder eine Partnerschaftsanfrage?
            Zögern Sie nicht, uns zu kontaktieren.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-12 text-gray-700 leading-relaxed">
          {/* Contact form-like section */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Schreiben Sie uns
            </h2>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
              <p className="mb-4">
                Bei Fragen zur Website, zu unseren Inhalten, unseren
                Analysen oder für Partnerschaftsanfragen senden Sie uns eine E-Mail:
              </p>
              <a
                href="mailto:contact@wm2026guide.de?subject=Kontakt%20WM%202026"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary/90"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                contact@wm2026guide.de
              </a>
              <p className="mt-4 text-sm text-gray-500">
                Wir bemühen uns, innerhalb von 48 Stunden zu antworten.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Häufig gestellte Fragen
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-lg border border-gray-200 bg-white"
                >
                  <summary className="cursor-pointer px-5 py-4 font-semibold text-gray-900 transition-colors hover:text-primary">
                    {faq.question}
                  </summary>
                  <p className="px-5 pb-4 text-gray-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Über uns */}
          <section>
            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Über die Website
            </h2>
            <p>
              WM 2026 ist eine unabhängige Informationswebsite zur
              FIFA WM 2026. Wir bieten Prognosen,
              statistische Analysen, Quotenvergleiche und praktische
              Ratgeber für Fußballfans.
            </p>
            <p className="mt-2">
              Diese Website ist weder mit der FIFA noch mit einem
              Sportwettenanbieter verbunden. Unsere Inhalte dienen ausschließlich
              der Information und stellen keine Wettberatung dar.
            </p>
          </section>

          {/* Verantwortungsvolles Spielen */}
          <section className="rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Verantwortungsvolles Spielen
            </h2>
            <p>
              Wenn Sie wetten, tun Sie dies verantwortungsvoll. Glücksspiel
              birgt Risiken finanzieller Verluste und Suchtgefahr.
            </p>
            <p className="mt-3">
              <Link
                href="/verantwortungsvolles-spielen"
                className="font-medium text-primary hover:underline"
              >
                Unsere Seite zum verantwortungsvollen Spielen ansehen →
              </Link>
            </p>
          </section>

          {/* Nützliche Links */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Nützliche Links
            </h2>
            <ul className="space-y-2">
              <li>
                <Link href="/ueber-uns" className="text-primary hover:underline">
                  Über uns
                </Link>
              </li>
              <li>
                <Link href="/impressum" className="text-primary hover:underline">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/ueber-uns" className="text-primary hover:underline">
                  Methodik
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-primary hover:underline">
                  Vollständige FAQ
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
