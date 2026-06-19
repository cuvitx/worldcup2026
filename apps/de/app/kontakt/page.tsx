import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Kontakt -- WM 2026",
  description:
    "Kontaktieren Sie das Team von wm2026guide.de. Fragen, Anregungen und Partnerschaften zur Fussball-WM 2026.",
  alternates: getStaticAlternates("contact", "de"),
};

export default function KontaktPage() {
  return (
    <>
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">Kontakt</h1>
          <p className="mt-2 text-gray-300">
            Wir freuen uns ueber Ihre Nachricht
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:py-12">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-6">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              So erreichen Sie uns
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Haben Sie Fragen zur WM 2026, Verbesserungsvorschlaege oder
              moechten Sie eine Partnerschaft besprechen? Kontaktieren Sie uns
              gerne per E-Mail.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              E-Mail
            </h2>
            <p className="text-primary font-medium">kontakt@wm2026guide.de</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Redaktion
            </h2>
            <p className="text-gray-700">
              Fuer redaktionelle Anfragen, Pressemitteilungen oder
              Gastbeitraege wenden Sie sich bitte an:{" "}
              <span className="text-primary font-medium">
                redaktion@wm2026guide.de
              </span>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Partnerschaften
            </h2>
            <p className="text-gray-700">
              Fuer Kooperationsanfragen und Werbepartnerschaften kontaktieren
              Sie uns unter:{" "}
              <span className="text-primary font-medium">
                partner@wm2026guide.de
              </span>
            </p>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-primary font-semibold hover:underline"
          >
            &larr; Zurueck zur Startseite
          </Link>
        </div>
      </div>
    </>
  );
}
