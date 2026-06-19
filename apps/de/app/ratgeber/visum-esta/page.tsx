import type { Metadata } from "next";
import Link from "next/link";
import { TableOfContents } from "@repo/ui";
import { ShieldCheck, TrainFront } from "lucide-react"
export const metadata: Metadata = {
  title: "Visum ESTA für die USA — Alles Wissenswerte zur WM 2026",
  description:
    "Kompletter Ratgeber zum Visum ESTA für die WM 2026 in den USA. Verfahren, Fristen, Kosten, Tipps und FAQ.",
  alternates: {
    canonical: "https://www.wm2026guide.de/guide/guide-visa-esta",
  },
  openGraph: {
    title: "Visum ESTA für die USA — Ratgeber WM 2026",
    description: "Alles Wissenswerte zum ESTA für die Reise in die USA während der WM 2026.",
    type: "article",
    publishedTime: "2026-02-19",
  },
};

export default function GuideVisaEsta() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Visum ESTA für die USA: Alles Wissenswerte zur WM 2026",
    description: metadata.description,
    datePublished: "2026-02-19",
    dateModified: "2026-02-19",
    author: { "@type": "Organization", name: "WM 2026" },
    publisher: { "@type": "Organization", name: "WM 2026", url: "https://www.wm2026guide.de" },
    mainEntityOfPage: "https://www.wm2026guide.de/guide/guide-visa-esta",
    image: "https://www.wm2026guide.de/og-default.jpg",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Was ist das ESTA?",
        acceptedAnswer: { "@type": "Answer", text: "Das ESTA (Electronic System for Travel Authorization) ist eine elektronische Reisegenehmigung für Staatsangehörige der am Visa Waiver Program (VWP) teilnehmenden Länder. Es erlaubt einen Aufenthalt in den USA von bis zu 90 Tagen für Tourismus oder Geschäftsreisen." },
      },
      {
        "@type": "Question",
        name: "Wie viel kostet das ESTA 2026?",
        acceptedAnswer: { "@type": "Answer", text: "Das ESTA kostet 21 USD (ca. 19 EUR). Vorsicht vor Vermittlerseiten, die deutlich mehr berechnen. Nur die offizielle Website esta.cbp.dhs.gov ist empfohlen." },
      },
      {
        "@type": "Question",
        name: "Wie lange dauert es, das ESTA zu erhalten?",
        acceptedAnswer: { "@type": "Answer", text: "Die Antwort erfolgt in der Regel sofort oder innerhalb von 72 Stunden. In Zeiten hoher Nachfrage (wie vor der WM 2026) sollten Sie mindestens 2 Wochen Puffer einplanen." },
      },
      {
        "@type": "Question",
        name: "Gilt das ESTA auch für Mexiko und Kanada?",
        acceptedAnswer: { "@type": "Answer", text: "Nein, das ESTA gilt nur für die USA. Für Mexiko benötigen EU-Bürger kein Visum bei einem touristischen Aufenthalt von weniger als 180 Tagen. Für Kanada ist eine eTA (Electronic Travel Authorization) erforderlich." },
      },
      {
        "@type": "Question",
        name: "Kann ich mit einem einzigen Dokument Spiele in allen 3 Ländern besuchen?",
        acceptedAnswer: { "@type": "Answer", text: "Nein, Sie benötigen das ESTA für die USA, die eTA für Kanada, und Ihr Reisepass genügt für Mexiko (für EU-Bürger). Bereiten Sie alle drei Dokumente vor, wenn Sie zwischen den Ländern reisen möchten." },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="mx-auto max-w-5xl px-4 py-10 lg:grid lg:grid-cols-[1fr_220px] lg:gap-8">
        <div>
        <nav aria-label="Brotkrümelnavigation" className="mb-6 text-sm text-gray-500">
          <ol className="flex items-center gap-1 flex-wrap">
            <li><Link href="/" className="text-primary hover:underline">Startseite</Link></li>
            <li>/</li>
            <li><Link href="/guides" className="text-primary hover:underline">Ratgeber</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Visum ESTA</li>
          </ol>
        </nav>

        <article className="prose prose-lg max-w-none">
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Praktischer Ratgeber</span>
            <time className="text-sm text-gray-500" dateTime="2026-02-19">19. Februar 2026</time>
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl mb-6">
            <ShieldCheck className="h-5 w-5 inline-block" /> Visum ESTA für die USA: Alles Wissenswerte zur WM 2026
          </h1>

          <p className="text-lg text-gray-600 font-medium mb-8 not-prose">
            Die Mehrheit der WM-2026-Spiele wird in den USA ausgetragen. Für deutsche und europäische Staatsangehörige ist das ESTA das unverzichtbare Dokument. Hier erfahren Sie alles Wichtige.
          </p>

          <h2 id="esta-definition">Was ist das ESTA?</h2>
          <p>
            Das ESTA (Electronic System for Travel Authorization) ist eine <strong>elektronische Reisegenehmigung</strong>, die für die visumfreie Einreise in die USA erforderlich ist. Es betrifft Staatsangehörige der 41 am Visa Waiver Program teilnehmenden Länder, darunter Deutschland, Österreich, die Schweiz und die meisten europäischen Länder.
          </p>
          <p>
            Das ESTA erlaubt einen Aufenthalt von <strong>maximal 90 Tagen</strong> für Tourismus oder Geschäftsreisen. Es ist <strong>2 Jahre</strong> gültig oder bis zum Ablauf des Reisepasses (je nachdem, was zuerst eintritt).
          </p>

          <h2 id="demande-esta">Wie stellt man den ESTA-Antrag?</h2>
          <h3>Schritt 1: Dokumente vorbereiten</h3>
          <p>
            Sie benötigen Ihren <strong>biometrischen oder elektronischen Reisepass</strong> mit aktueller Gültigkeit, eine E-Mail-Adresse, eine Kreditkarte für die Zahlung und Ihre Unterkunftsadresse in den USA (Hotel oder Adresse eines Bekannten).
          </p>

          <h3>Schritt 2: Online-Formular ausfüllen</h3>
          <p>
            Besuchen Sie die <strong>offizielle Website</strong>: <a href="https://esta.cbp.dhs.gov" target="_blank" rel="noopener noreferrer">esta.cbp.dhs.gov</a>. Vorsicht vor Vermittlerseiten, die zusätzliche Gebühren berechnen! Das Formular dauert etwa 15 Minuten. Die Fragen betreffen Ihre Identität, Ihre Reise und Standard-Sicherheitsfragen.
          </p>

          <h3>Schritt 3: Bezahlen und auf die Antwort warten</h3>
          <p>
            Die Kosten betragen <strong>21 USD</strong> (ca. 19 EUR). Die Antwort erfolgt in der Regel <strong>sofort</strong>, kann aber bis zu 72 Stunden dauern. Drei mögliche Antworten: Genehmigung erteilt, Reise nicht genehmigt oder Genehmigung ausstehend.
          </p>

          <h2 id="delais">Fristen und empfohlener Zeitplan</h2>
          <p>
            Während der WM wird das Volumen der ESTA-Anträge stark ansteigen. Wir empfehlen, Ihren Antrag <strong>mindestens 3 Monate vor Ihrer Abreise</strong> zu stellen. Wenn Sie bereits ein gültiges ESTA haben, überprüfen Sie jetzt das Ablaufdatum.
          </p>

          <div className="not-prose my-8 rounded-xl bg-accent/10 border border-accent/30 p-6">
            <h3 className="text-lg font-semibold text-gray-900 text-accent mb-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block shrink-0"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg> Achtung vor Betrug</h3>
            <p className="text-sm text-accent">
              Zahlreiche betrügerische Websites bieten „ESTA Express" zu überhöhten Preisen (50-100 EUR) an. Die einzige offizielle Website ist <strong>esta.cbp.dhs.gov</strong>. Bezahlen Sie nie mehr als 21 USD.
            </p>
          </div>

          <h2 id="mexique-canada">Und für Mexiko und Kanada?</h2>
          <h3>Mexiko</h3>
          <p>
            Gute Nachricht für Deutsche: <strong>Kein Visum erforderlich</strong> für einen touristischen Aufenthalt von weniger als 180 Tagen in Mexiko. Ein gültiger Reisepass genügt. Sie erhalten bei Ankunft ein Migrationsformular (FMM). Die Spiele finden in Mexiko-Stadt (Estadio Azteca), Guadalajara und Monterrey statt.
          </p>

          <h3>Kanada</h3>
          <p>
            Für Kanada benötigen deutsche Staatsangehörige eine <strong>eTA (Electronic Travel Authorization)</strong>, das kanadische Äquivalent zum ESTA. Die Kosten betragen 7 CAD (ca. 5 EUR), und der Antrag wird online auf der offiziellen Website der kanadischen Regierung gestellt. Die kanadischen Spiele finden in Toronto und Vancouver statt.
          </p>

          <h2 id="conseils">Praktische Tipps für Fans</h2>
          <ul>
            <li><strong>Reisepass noch 6 Monate nach Rückkehrdatum gültig</strong>: Überprüfen Sie jetzt die Gültigkeit Ihres Reisepasses</li>
            <li><strong>Reiseversicherung</strong>: In den USA unverzichtbar, da die medizinischen Kosten extrem hoch sind. Budget 50-100 EUR für die Aufenthaltsdauer</li>
            <li><strong>Kopien</strong>: Bewahren Sie digitale Kopien aller Dokumente auf Ihrem Telefon und in Ihrer E-Mail auf</li>
            <li><strong>Zoll</strong>: Deklarieren Sie alles, was deklariert werden muss. Die Einreisekontrollen in den USA sind streng</li>
          </ul>

          <h2 id="faq">FAQ — Visum ESTA WM 2026</h2>

          <h3>Kann ich mit einem abgelaufenen Reisepass und einem gültigen ESTA in die USA einreisen?</h3>
          <p>Nein. Ihr Reisepass muss während Ihres gesamten Aufenthalts gültig sein, idealerweise noch 6 Monate nach Ihrem Rückkehrdatum.</p>

          <h3>Mein ESTA wurde abgelehnt, was tun?</h3>
          <p>Bei Ablehnung müssen Sie ein reguläres Visum (B1/B2) bei der US-Botschaft beantragen. Planen Sie 2-3 Monate für den Termin und die Bearbeitung ein.</p>

          <h3>Darf ich mit dem ESTA in den USA arbeiten?</h3>
          <p>Nein. Das ESTA ist ausschließlich für Tourismus und kurze Geschäftsreisen bestimmt. Jede bezahlte Tätigkeit erfordert ein Arbeitsvisum.</p>

          <h3>Kann ich mein ESTA nach der Genehmigung ändern?</h3>
          <p>Einige Informationen (Adresse in den USA, Flugnummer) können geändert werden. Bei Änderungen der Identitätsdaten ist ein neuer Antrag erforderlich.</p>
        </article>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Verwandte Ratgeber</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/guide/guide-hebergement" className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900">Wo übernachten während der WM 2026</h3>
              <p className="text-sm text-gray-500 mt-1">Unterkunfts-Ratgeber für die Gastgeberstädte</p>
            </Link>
            <Link href="/guide/guide-transport" className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900"><TrainFront className="h-5 w-5 inline-block" /> Fortbewegung zwischen den Stadien</h3>
              <p className="text-sm text-gray-500 mt-1">Transport zwischen den Städten und Logistik</p>
            </Link>
            <Link href="/guide/guide-budget" className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900"> Budget WM 2026</h3>
              <p className="text-sm text-gray-500 mt-1">Was kostet es? Vollständige Schätzung</p>
            </Link>
            <Link href="/stadien" className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900"> Die Stadien der WM 2026</h3>
              <p className="text-sm text-gray-500 mt-1">Alle Stadien der Weltmeisterschaft</p>
            </Link>
          </div>
        </div>
        </div>
        <TableOfContents items={[
          { id: "esta-definition", label: "Was ist das ESTA?", level: 2 },
          { id: "demande-esta", label: "Antrag stellen", level: 2 },
          { id: "delais", label: "Empfohlene Fristen", level: 2 },
          { id: "mexique-canada", label: "Mexiko & Kanada", level: 2 },
          { id: "conseils", label: "Praktische Tipps", level: 2 },
          { id: "faq", label: "FAQ", level: 2 },
        ]} />
      </div>
    </>
  );
}
