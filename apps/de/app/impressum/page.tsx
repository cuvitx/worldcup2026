import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Impressum -- WM 2026",
  description:
    "Impressum und rechtliche Angaben der Website wm2026guide.de gemaess den deutschen gesetzlichen Anforderungen.",
  alternates: getStaticAlternates("legal", "de"),
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  return (
    <>
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">Impressum</h1>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:py-12">
        <div className="prose prose-sm max-w-none text-gray-700 space-y-6">
          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Angaben gemaess Telemediengesetz (TMG)
            </h2>
            <p>
              wm2026guide.de ist ein redaktionelles Informationsportal zur
              FIFA Fussball-Weltmeisterschaft 2026. Die Website dient
              ausschliesslich informativen Zwecken.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">Betreiber</h2>
            <p>
              wm2026guide.de
              <br />
              E-Mail: kontakt@wm2026guide.de
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Haftungsausschluss
            </h2>
            <h3 className="text-lg font-semibold text-gray-900">
              Haftung fuer Inhalte
            </h3>
            <p>
              Die Inhalte unserer Seiten wurden mit groesster Sorgfalt erstellt.
              Fuer die Richtigkeit, Vollstaendigkeit und Aktualitaet der Inhalte
              koennen wir jedoch keine Gewaehr uebernehmen. Als Diensteanbieter
              sind wir fuer eigene Inhalte auf diesen Seiten nach den
              allgemeinen Gesetzen verantwortlich.
            </p>
            <h3 className="text-lg font-semibold text-gray-900">
              Haftung fuer Links
            </h3>
            <p>
              Unser Angebot enthaelt Links zu externen Webseiten Dritter, auf
              deren Inhalte wir keinen Einfluss haben. Fuer die Inhalte der
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
              der Seiten verantwortlich.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem Urheberrecht. Beitraege Dritter sind
              als solche gekennzeichnet. Die Vervielfaeltigung, Bearbeitung,
              Verbreitung und jede Art der Verwertung ausserhalb der Grenzen des
              Urheberrechtes beduerfen der schriftlichen Zustimmung des jeweiligen
              Autors bzw. Erstellers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">Datenschutz</h2>
            <p>
              Wir weisen darauf hin, dass die Datenuebertragung im Internet
              Sicherheitsluecken aufweisen kann. Ein lueckenloser Schutz der
              Daten vor dem Zugriff durch Dritte ist nicht moeglich. Weitere
              Informationen finden Sie in unserer Datenschutzerklaerung.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Hinweis zu Sportwetten
            </h2>
            <p>
              Diese Website kann Verweise auf Sportwettenanbieter enthalten.
              Gluecksspiel kann suechtig machen. Spielen Sie verantwortungsbewusst.
              Hilfe bei Spielsucht: Bundeszentrale fuer gesundheitliche
              Aufklaerung (BZgA) -- Telefon: 0800 1 37 27 00 (kostenlos).
              Teilnahme ab 18 Jahren.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
