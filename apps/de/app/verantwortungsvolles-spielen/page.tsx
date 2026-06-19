import type { Metadata } from "next";
import Link from "next/link";
import { getStaticAlternates } from "@repo/data/route-mapping";
import { Globe, Timer } from "lucide-react"
export const metadata: Metadata = {
  title: "Verantwortungsvolles Spielen — Sportwetten und Prävention",
  description:
    "Informationen zum verantwortungsvollen Spielen: Anzeichen problematischen Spielverhaltens, Hilfe-Hotline (0800 1 37 27 00), Ressourcen der BZgA und Spielersperre.",
  alternates: getStaticAlternates("responsibleGambling", "de"),
};

const anzeichenProblematisch = [
  "Sie wetten mehr, als Sie sich leisten können zu verlieren",
  "Sie leihen sich Geld zum Wetten oder zur Tilgung von Spielschulden",
  "Sie belügen Ihre Angehörigen über Ihre Spielgewohnheiten oder die Höhe Ihrer Verluste",
  "Sie wetten, um persönlichen Problemen, Stress oder Langeweile zu entfliehen",
  "Sie werden ängstlich, gereizt oder unruhig, wenn Sie nicht wetten können",
  "Sie vernachlässigen Ihre Arbeit, Ihr Studium oder Ihre Beziehungen wegen der Wetten",
  "Sie versuchen, Verluste durch höhere Einsätze wieder auszugleichen",
  "Sie spüren ein wachsendes Bedürfnis, immer höhere Beträge zu setzen",
  "Sie haben bereits versucht, aufzuhören oder weniger zu spielen, ohne Erfolg",
];

const tipps = [
  {
    title: "Setzen Sie ein festes Budget",
    text: "Legen Sie im Voraus den Höchstbetrag fest, den Sie bereit sind zu verlieren. Überschreiten Sie dieses Limit niemals, auch nicht bei einer Gewinnserie.",
  },
  {
    title: "Jagen Sie nicht Ihren Verlusten nach",
    text: "Wenn Sie verlieren, akzeptieren Sie den Verlust. Mehr zu setzen, um Verluste auszugleichen, führt in einen Teufelskreis.",
  },
  {
    title: "Setzen Sie Zeitlimits",
    text: "Wetten sollten nicht Ihren Alltag beeinträchtigen. Legen Sie eine maximale Spielzeit pro Woche fest.",
  },
  {
    title: "Wetten Sie nicht unter Einfluss",
    text: "Vermeiden Sie es, unter Alkohol-, Medikamenteneinfluss oder in emotional belastenden Situationen zu wetten.",
  },
  {
    title: "Verstehen Sie die Wahrscheinlichkeiten",
    text: "Quoten spiegeln eine Wahrscheinlichkeit wider. Eine Prognose ist niemals eine Gewissheit. Langfristig hat der Wettanbieter immer einen Vorteil.",
  },
  {
    title: "Holen Sie sich Hilfe",
    text: "Wenn Sie das Gefühl haben, die Kontrolle zu verlieren, sprechen Sie mit einer Vertrauensperson oder kontaktieren Sie eine spezialisierte Hilfseinrichtung.",
  },
];

const ressourcen = [
  {
    name: "BZgA (Bundeszentrale für gesundheitliche Aufklärung)",
    phone: "0800 1 37 27 00",
    hours: "Kostenlos und anonym, Mo–Do 10–22 Uhr, Fr–So 10–18 Uhr",
    url: "https://www.bzga.de",
    description:
      "Bundesweites Beratungstelefon zur Glücksspielsucht. Kostenlose und anonyme Beratung für Betroffene und Angehörige.",
  },
  {
    name: "Spielsucht Therapie",
    phone: "0800 0 776 778",
    url: "https://www.spielsucht-therapie.de",
    description:
      "Hilfsangebote für spielsüchtige Personen. Individuelle Begleitung, Selbsthilfegruppen und therapeutische Nachsorge.",
  },
  {
    name: "BZgA – Check dein Spiel",
    url: "https://www.check-dein-spiel.de",
    description:
      "Informationsportal der BZgA zum Thema Glücksspiel. Selbsttest, Beratung und Hilfsangebote.",
  },
  {
    name: "Anonyme Spieler",
    url: "https://www.anonyme-spieler.org",
    description:
      "Selbsthilfegruppen für Menschen mit Spielproblemen nach dem 12-Schritte-Programm.",
  },
];

export default function VerantwortungsvollesSpielenPage() {
  return (
    <>
<section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">Prävention & Hilfe</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">Verantwortungsvolles Spielen</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Sportwetten sollten Unterhaltung bleiben. Spielen Sie
            verantwortungsvoll.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-12 text-gray-700 leading-relaxed">
          {/* Unsere Verpflichtungen */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Unsere Verpflichtungen
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Wir richten uns nicht an Minderjährige. Sportwetten sind{" "}
                <strong>für Personen unter 18 Jahren verboten</strong>.
              </li>
              <li>
                Unsere Prognosen dienen nur zur Information und{" "}
                <strong>garantieren keinen Gewinn</strong>.
              </li>
              <li>
                Wir empfehlen ausschließlich{" "}
                <strong>lizenzierte Wettanbieter</strong>.
              </li>
              <li>
                Wir fördern einen maßvollen und verantwortungsvollen Umgang mit
                Sportwetten.
              </li>
              <li>
                Wir zeigen stets die vorgeschriebenen Präventionshinweise an.
              </li>
            </ul>
          </section>

          {/* Tipps */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Tipps für verantwortungsvolles Wetten
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {tipps.map((tipp) => (
                <div
                  key={tipp.title}
                  className="rounded-lg bg-gray-50 p-5"
                >
                  <h3 className="text-lg font-semibold text-gray-900">{tipp.title}</h3>
                  <p className="mt-2 text-sm">{tipp.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Anzeichen */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Anzeichen problematischen Spielverhaltens
            </h2>
            <p className="mb-4">
              Wenn Sie sich in einem oder mehreren der folgenden Anzeichen
              wiedererkennen, ist es wichtig, Hilfe zu suchen:
            </p>
            <ul className="space-y-2">
              {anzeichenProblematisch.map((anzeichen) => (
                <li key={anzeichen} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs text-red-600">
                    !
                  </span>
                  <span>{anzeichen}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Schnelltest */}
          <section className="rounded-xl bg-gray-50 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block shrink-0"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16.5h10"/></svg> Schnelle Selbsteinschätzung
            </h2>
            <p className="mb-3">
              Wenn Sie <strong>2 oder mehr Fragen</strong>{" "}
              mit „Ja" beantworten, wird empfohlen, professionelle Hilfe zu suchen:
            </p>
            <ol className="list-decimal space-y-2 pl-6 text-sm">
              <li>
                Haben Sie jemals mehr gesetzt, als Sie sich leisten konnten
                zu verlieren?
              </li>
              <li>
                Brauchen Sie immer höhere Einsätze, um
                Spannung zu empfinden?
              </li>
              <li>
                Haben Sie schon versucht, weniger zu spielen oder aufzuhören,
                ohne Erfolg?
              </li>
              <li>
                Haben Ihre Wetten Probleme in Ihren Beziehungen oder bei Ihrer
                Arbeit verursacht?
              </li>
            </ol>
          </section>

          {/* Hilfsressourcen */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Hilfsangebote
            </h2>
            <div className="space-y-4">
              {ressourcen.map((r) => (
                <div
                  key={r.name}
                  className="rounded-lg border border-gray-200 bg-white p-5"
                >
                  <h3 className="text-lg font-semibold text-gray-900">{r.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {r.description}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                    {r.phone && (
                      <a
                        href={`tel:${r.phone.replace(/\s/g, "")}`}
                        className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                      >
                        <svg className="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/></svg> {r.phone}
                      </a>
                    )}
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                    >
                      <Globe className="h-5 w-5 inline-block" /> {r.url.replace("https://www.", "")}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Selbstausschluss */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Selbstausschluss-Tools
            </h2>
            <p className="mb-4">
              Alle lizenzierten Wettanbieter bieten Tools
              an, die Ihnen helfen, die Kontrolle zu behalten:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="text-lg font-semibold text-gray-900"> Einzahlungslimits</h3>
                <p className="mt-1 text-sm">
                  Legen Sie ein tägliches, wöchentliches oder monatliches
                  Einzahlungslimit für Ihr Konto fest.
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="text-lg font-semibold text-gray-900"><Timer className="h-5 w-5 inline-block" />Zeitlimits</h3>
                <p className="mt-1 text-sm">
                  Legen Sie eine maximale Sitzungsdauer fest, um
                  zu lange Spielzeiten zu vermeiden.
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="text-lg font-semibold text-gray-900">Vorübergehender Selbstausschluss</h3>
                <p className="mt-1 text-sm">
                  Sperren Sie Ihr Konto für einen gewählten Zeitraum (24 Std., 1
                  Woche, 1 Monat...).
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="text-lg font-semibold text-gray-900"><svg className="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Spielsperre</h3>
                <p className="mt-1 text-sm">
                  Lassen Sie sich im OASIS-Sperrsystem registrieren für
                  mindestens 1 Jahr. Informationen unter{" "}
                  <a
                    href="https://www.bzga.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    bzga.de
                  </a>
                  .
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-primary/5 border border-primary/20 p-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Tools bei den wichtigsten Wettanbietern
              </h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>
                  <strong>Betano:</strong> Individuelle Limits, Selbsttest,
                  Kontosperre
                </li>
              </ul>
            </div>
          </section>

          {/* Abschließender Hinweis */}
          <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-6 text-center">
            <p className="text-lg font-bold text-gray-900">
              Glücksspiel ist für Minderjährige verboten.
            </p>
            <p className="mt-2 font-semibold">
              Spielen birgt Risiken: Verschuldung, Isolation, Abhängigkeit.
            </p>
            <p className="mt-3 text-xl font-bold text-primary">
              <a href="tel:0800137270" className="hover:underline">
                <svg className="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/></svg> 0800 1 37 27 00
              </a>
            </p>
            <p className="mt-1 text-sm text-gray-500">
              BZgA-Beratungstelefon — kostenlos und anonym
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
