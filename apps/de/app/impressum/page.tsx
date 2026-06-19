import type { Metadata } from "next";
import Link from "next/link";
import { getStaticAlternates } from "@repo/data/route-mapping";
export const metadata: Metadata = {
  title: "Impressum | WM 2026",
  description:
    "Impressum der Website WM 2026: Herausgeber, Hosting, Datenschutz, Cookie-Richtlinien und Nutzungsbedingungen.",
  alternates: getStaticAlternates("legal", "de"),
  openGraph: {
    title: "Impressum - WM 2026",
    description: "Rechtliche Informationen der Website WM 2026.",
  },
};

export default function MentionsLegalesPage() {
  return (
    <>

      <section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">Rechtliche Informationen</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">Impressum</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Rechtliche Informationen zur Website wm2026guide.de
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              1. Herausgeber der Website
            </h2>
            <p>
              Die Website <strong>wm2026guide.de</strong> (nachfolgend &bdquo;die
              Website&ldquo;) wird privat im Rahmen eines
              Sportinformationsprojekts betrieben.
            </p>
            <ul className="mt-3 space-y-1 text-sm">
              <li>
                <strong>Verantwortlich für den Inhalt:</strong> Der Herausgeber
                der Website
              </li>
              <li>
                <strong>Kontakt:</strong>{" "}
                <a
                  href="mailto:contact@wm2026guide.de"
                  className="text-primary hover:underline"
                >
                  contact@wm2026guide.de
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              2. Hosting
            </h2>
            <p>Die Website wird gehostet von:</p>
            <ul className="mt-3 space-y-1 text-sm">
              <li>
                <strong>Vercel Inc.</strong>
              </li>
              <li>440 N Barranca Ave #4133, Covina, CA 91723, USA</li>
              <li>
                Website:{" "}
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  vercel.com
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              3. Geistiges Eigentum
            </h2>
            <p>
              Diese Website ist weder mit der FIFA noch mit einer offiziellen
              WM-Organisation verbunden. Die genannten Mannschaftsnamen, Logos und
              Marken gehören ihren jeweiligen Eigentümern.
            </p>
            <p className="mt-2">
              Sämtliche Inhalte (Texte, Analysen, Prognosen, Layout)
              sind urheberrechtlich geschützt. Jede Vervielfältigung,
              auch auszugsweise, ist ohne vorherige Genehmigung untersagt.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              4. Datenschutz (DSGVO)
            </h2>
            <p>
              Gemäß der Datenschutz-Grundverordnung (DSGVO) haben
              Sie das Recht auf Auskunft, Berichtigung, Löschung
              und Widerspruch bezüglich Ihrer personenbezogenen Daten.
            </p>
            <p className="mt-2">
              Die Website erhebt keine personenbezogenen Daten direkt. Es werden
              keine Registrierungs- oder Zahlungsformulare angeboten.
              Die einzigen möglicherweise erhobenen Daten stammen von
              Drittanbieter-Cookies (siehe Abschnitt unten).
            </p>
            <p className="mt-2">
              Um Ihre Rechte auszuüben, kontaktieren Sie uns unter:{" "}
              <a
                href="mailto:contact@wm2026guide.de"
                className="text-primary hover:underline"
              >
                contact@wm2026guide.de
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              5. Cookies
            </h2>
            <p>
              Die Website verwendet Cookies, um das Nutzererlebnis zu verbessern
              und die Besucherzahlen zu messen. Folgende Cookies werden verwendet:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-6 text-sm">
              <li>
                <strong>Essenzielle Cookies:</strong> notwendig für den
                Betrieb der Website (Einstellungen, Cookie-Zustimmung)
              </li>
              <li>
                <strong>Analytische Cookies:</strong> anonymisierte
                Besuchermessung zur Verbesserung unserer Inhalte
              </li>
              <li>
                <strong>Drittanbieter-Cookies:</strong> unsere Werbe- und
                Affiliate-Partner können Cookies setzen
              </li>
            </ul>
            <p className="mt-3">
              Sie können Ihren Browser so konfigurieren, dass Cookies abgelehnt werden,
              oder Ihre Einstellungen über das Cookie-Banner bei Ihrem ersten Besuch verwalten.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              6. Affiliate-Links
            </h2>
            <p>
              Diese Website kann Affiliate-Links zu lizenzierten
              Sportwettenanbietern enthalten. Wir können eine Provision erhalten,
              wenn Sie sich über diese Links registrieren. Dies hat keine
              Auswirkungen auf die Kosten für Sie und beeinflusst nicht unsere
              Analysen oder Prognosen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              7. Haftungsausschluss — Sportwetten
            </h2>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              8. Haftungsbeschränkung
            </h2>
            <p>
              Der Herausgeber bemüht sich, zuverlässige und aktuelle
              Informationen bereitzustellen, übernimmt jedoch keine Gewähr für die
              Richtigkeit, Vollständigkeit oder Aktualität der veröffentlichten
              Inhalte. Die Nutzung der Website erfolgt auf eigene Gefahr.
            </p>
            <p className="mt-2">
              Der Herausgeber haftet nicht für direkte oder indirekte Schäden,
              die aus dem Zugriff auf die Website oder der Nutzung der darin
              enthaltenen Informationen entstehen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              9. Anwendbares Recht
            </h2>
            <p>
              Dieses Impressum unterliegt deutschem Recht.
              Für alle Streitigkeiten im Zusammenhang mit der Nutzung der Website
              sind die zuständigen deutschen Gerichte zuständig.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Kontakt</h2>
            <p>
              Bei Fragen zu diesem Impressum:{" "}
              <a
                href="mailto:contact@wm2026guide.de"
                className="text-primary hover:underline"
              >
                contact@wm2026guide.de
              </a>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
