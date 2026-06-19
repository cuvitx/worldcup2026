import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import type { CdmEdition } from "./EditionCard";
import { Timeline } from "./Timeline";
import { Section2026 } from "./Section2026";
import { TableOfContents } from "@repo/ui";
import { RelatedLinks } from "../components/RelatedLinks";

export const metadata: Metadata = {
  title: "Geschichte der WM - Timeline 1930 bis 2026 | WM 2026",
  description:
    "Komplette Timeline der Geschichte der FIFA-WM von 1930 bis 2026. Gastgeberländer, Sieger, beste Torschützen und Höhepunkte jeder Ausgabe.",
  openGraph: {
    title: "Geschichte der WM - Timeline 1930 bis 2026",
    description:
      "Erleben Sie alle Weltmeisterschaften seit 1930 neu: Gastgeberländer, Champions, Rekorde und historische Anekdoten.",
    url: "https://www.wm2026guide.de/geschichte",
  },
  alternates: {
    canonical: "https://www.wm2026guide.de/geschichte",
  },
};

// ── Daten ────────────────────────────────────────────────────────────────

const editions: CdmEdition[] = [
  { year: 1930, host: "Uruguay", hostFlag: "🇺🇾", winner: "Uruguay", winnerFlag: "🇺🇾", runnerUp: "Argentinien", runnerUpFlag: "🇦🇷", score: "4–2", topScorer: "Guillermo Stábile", topScorerGoals: 8, teams: 13, totalGoals: 70, highlight: "Die Geburt der WM", highlightDetail: "Die erste WM findet in Uruguay zum hundertjährigen Jubiläum des Landes statt. Nur 13 Mannschaften nehmen teil, kein bedeutendes europäisches Team macht die Schiffsreise.", color: "from-amber-500 to-amber-700" },
  { year: 1934, host: "Italien", hostFlag: "🇮🇹", winner: "Italien", winnerFlag: "🇮🇹", runnerUp: "Tschechoslowakei", runnerUpFlag: "🇨🇿", score: "2–1 n.V.", topScorer: "Oldřich Nejedly", topScorerGoals: 5, teams: 16, totalGoals: 70, highlight: "Mussolini und die Propaganda", highlightDetail: "Italien gewinnt die WM im eigenen Land inmitten politischer Spannungen. Das faschistische Regime nutzt den Sieg zu Propagandazwecken.", color: "from-accent to-accent/70" },
  { year: 1938, host: "Frankreich", hostFlag: "🇫🇷", winner: "Italien", winnerFlag: "🇮🇹", runnerUp: "Ungarn", runnerUpFlag: "🇭🇺", score: "4–2", topScorer: "Leônidas", topScorerGoals: 7, teams: 15, totalGoals: 84, highlight: "Doppelter Weltmeister!", highlightDetail: "Italien wird die erste Mannschaft, die zwei aufeinanderfolgende Weltmeisterschaften gewinnt. Der Brasilianer Leônidas, genannt 'der Schwarze Diamant', begeistert das Pariser Publikum.", color: "from-blue-600 to-blue-800" },
  { year: 1950, host: "Brasilien", hostFlag: "🇧🇷", winner: "Uruguay", winnerFlag: "🇺🇾", runnerUp: "Brasilien", runnerUpFlag: "🇧🇷", score: "2–1 (Finalrunde)", topScorer: "Ademir", topScorerGoals: 9, teams: 13, totalGoals: 88, highlight: "Das Maracanazo", highlightDetail: "Vor 200.000 Zuschauern im Maracanã besiegt Uruguay Brasilien 2:1 im entscheidenden Spiel. Ein nationales Trauma, das Brasilien jahrzehntelang prägen wird.", color: "from-yellow-500 to-yellow-700" },
  { year: 1954, host: "Schweiz", hostFlag: "🇨🇭", winner: "Deutschland", winnerFlag: "🇩🇪", runnerUp: "Ungarn", runnerUpFlag: "🇭🇺", score: "3–2", topScorer: "Sándor Kocsis", topScorerGoals: 11, teams: 16, totalGoals: 140, highlight: "Das Wunder von Bern", highlightDetail: "Ungarn mit Puskás — die sogenannten 'Magischen Magyaren', seit 4 Jahren ungeschlagen — wird von Deutschland im Finale besiegt (3:2). Die grösste Überraschung in der WM-Geschichte. Noch gültiger Rekord: 5,38 Tore/Spiel.", color: "from-red-600 to-red-800" },
  { year: 1958, host: "Schweden", hostFlag: "🇸🇪", winner: "Brasilien", winnerFlag: "🇧🇷", runnerUp: "Schweden", runnerUpFlag: "🇸🇪", score: "5–2", topScorer: "Just Fontaine", topScorerGoals: 13, teams: 16, totalGoals: 126, highlight: "Pelé & Fontaine, zwei Legenden entstehen", highlightDetail: "Pelé, 17 Jahre alt, verzaubert die Welt und gewinnt seinen ersten Titel. Der Franzose Just Fontaine erzielt 13 Tore in 6 Spielen — ein absoluter Rekord, 66 Jahre später immer noch ungebrochen.", color: "from-accent to-accent/70" },
  { year: 1962, host: "Chile", hostFlag: "🇨🇱", winner: "Brasilien", winnerFlag: "🇧🇷", runnerUp: "Tschechoslowakei", runnerUpFlag: "🇨🇿", score: "3–1", topScorer: "Garrincha, Vavá, Sánchez, Jerkovic…", topScorerGoals: 4, teams: 16, totalGoals: 89, highlight: "Garrincha übernimmt die Führung", highlightDetail: "Pelé verletzt sich bereits im 2. Spiel. Garrincha, der 'singende Vogel', übernimmt das Kommando und führt Brasilien zum 2. WM-Titel in Folge.", color: "from-accent to-accent/70" },
  { year: 1966, host: "England", hostFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", winner: "England", winnerFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", runnerUp: "Deutschland", runnerUpFlag: "🇩🇪", score: "4–2 n.V.", topScorer: "Eusébio", topScorerGoals: 9, teams: 16, totalGoals: 89, highlight: "Das Wembley-Tor", highlightDetail: "England 4:2 Deutschland (n.V.): Hat Hursts 3. Tor die Linie überquert oder nicht? Bis heute umstritten. England gewinnt seine einzige WM. Eusébio verzaubert das Turnier.", color: "from-indigo-600 to-indigo-800" },
  { year: 1970, host: "Mexiko", hostFlag: "🇲🇽", winner: "Brasilien", winnerFlag: "🇧🇷", runnerUp: "Italien", runnerUpFlag: "🇮🇹", score: "4–1", topScorer: "Gerd Müller", topScorerGoals: 10, teams: 16, totalGoals: 95, highlight: "Die schönste Mannschaft der Geschichte", highlightDetail: "Pelé, Jairzinho, Tostão, Rivelino: Brasiliens Team von 1970 gilt als die schönste Mannschaft aller Zeiten. 4:1-Sieg im Finale und endgültiger Gewinn des Jules-Rimet-Pokals.", color: "from-yellow-400 to-accent" },
  { year: 1974, host: "Deutschland", hostFlag: "🇩🇪", winner: "Deutschland", winnerFlag: "🇩🇪", runnerUp: "Niederlande", runnerUpFlag: "🇳🇱", score: "2–1", topScorer: "Grzegorz Lato", topScorerGoals: 7, teams: 16, totalGoals: 97, highlight: "Totaler Fussball vs. deutsche Effizienz", highlightDetail: "Die Niederlande von Johan Cruyff erfinden den 'Totalen Fussball', unterliegen aber im Finale 2:1 einem realistischen und organisierten Deutschland. Ein legendäres Finale.", color: "from-orange-500 to-red-600" },
  { year: 1978, host: "Argentinien", hostFlag: "🇦🇷", winner: "Argentinien", winnerFlag: "🇦🇷", runnerUp: "Niederlande", runnerUpFlag: "🇳🇱", score: "3–1 n.V.", topScorer: "Mario Kempes", topScorerGoals: 6, teams: 16, totalGoals: 102, highlight: "Mario Kempes und das argentinische Volk", highlightDetail: "Vor dem Hintergrund der Militärdiktatur gewinnt Argentinien mit Kempes seinen ersten WM-Titel. Die Konfettiflut von Buenos Aires bleibt in der Geschichte unvergessen.", color: "from-sky-400 to-sky-600" },
  { year: 1982, host: "Spanien", hostFlag: "🇪🇸", winner: "Italien", winnerFlag: "🇮🇹", runnerUp: "Deutschland", runnerUpFlag: "🇩🇪", score: "3–1", topScorer: "Paolo Rossi", topScorerGoals: 6, teams: 24, totalGoals: 146, highlight: "Paolo Rossi kehrt zurück!", highlightDetail: "Nach 2 Jahren Sperre wegen Spielmanipulation kehrt Paolo Rossi zurück und erzielt 6 Tore in der Endrunde, darunter ein Hattrick gegen Brasilien. Italien gewinnt seinen 3. Titel. Erstmals 24 Mannschaften.", color: "from-blue-500 to-indigo-700" },
  { year: 1986, host: "Mexiko", hostFlag: "🇲🇽", winner: "Argentinien", winnerFlag: "🇦🇷", runnerUp: "Deutschland", runnerUpFlag: "🇩🇪", score: "3–2", topScorer: "Gary Lineker", topScorerGoals: 6, teams: 24, totalGoals: 132, highlight: "Maradona, die Hand Gottes", highlightDetail: "Diego Maradona erzielt gegen England zwei unvergessliche Tore: die 'Hand Gottes' (Tor mit der Hand) und das 'Tor des Jahrhunderts' (60 Meter). Zwei Tore, zwei Geschichten, eine Legende.", color: "from-sky-300 to-blue-500" },
  { year: 1990, host: "Italien", hostFlag: "🇮🇹", winner: "Deutschland", winnerFlag: "🇩🇪", runnerUp: "Argentinien", runnerUpFlag: "🇦🇷", score: "1–0", topScorer: "Salvatore Schillaci", topScorerGoals: 6, teams: 24, totalGoals: 115, highlight: "Magische Nächte & defensive Ausgabe", highlightDetail: "Die WM 1990 ist die torschwächste (2,21 Tore/Spiel). 'Notti Magiche' erfüllt Italien. Schillaci, vor dem Turnier unbekannt, wird zum Helden. Deutschland besiegt Argentinien im Finale (1:0 per Elfmeter).", color: "from-accent to-accent/70" },
  { year: 1994, host: "USA", hostFlag: "🇺🇸", winner: "Brasilien", winnerFlag: "🇧🇷", runnerUp: "Italien", runnerUpFlag: "🇮🇹", score: "0–0 n.V. (3–2 i.E.)", topScorer: "Hristo Stoitchkov & Oleg Salenko", topScorerGoals: 6, teams: 24, totalGoals: 141, highlight: "Baggio verschiesst den entscheidenden Elfmeter", highlightDetail: "Roberto Baggio, der das Turnier dominiert hat, verschiesst den entscheidenden Elfmeter im Finale gegen Brasilien. Das Bild seiner zum Himmel gerichteten Augen bleibt für immer in der Fussballgeschichte verewigt.", color: "from-red-500 to-red-700" },
  { year: 1998, host: "Frankreich", hostFlag: "🇫🇷", winner: "Frankreich", winnerFlag: "🇫🇷", runnerUp: "Brasilien", runnerUpFlag: "🇧🇷", score: "3–0", topScorer: "Davor Šuker", topScorerGoals: 6, teams: 32, totalGoals: 171, highlight: "Zidane und Les Bleus krönen Frankreich", highlightDetail: "Zinédine Zidane erzielt per Doppelkopfball (43., 69.) im Finale. Frankreich unter Didier Deschamps siegt 3:0 gegen ein geschwächtes Brasilien (Ronaldo erlitt am Vorabend einen Epilepsieanfall). Erstmals 32 Mannschaften.", color: "from-blue-700 to-red-600" },
  { year: 2002, host: "Südkorea & Japan", hostFlag: "🇰🇷🇯🇵", winner: "Brasilien", winnerFlag: "🇧🇷", runnerUp: "Deutschland", runnerUpFlag: "🇩🇪", score: "2–0", topScorer: "Ronaldo", topScorerGoals: 8, teams: 32, totalGoals: 161, highlight: "Ronaldo, die Revanche des Phänomens", highlightDetail: "Ronaldo, traumatisiert von 1998, erzielt 8 Tore, darunter einen Doppelpack im Finale, und gewinnt den Ballon d'Or. Brasilien gewinnt seinen 5. Titel. Südkorea schafft die Sensation und erreicht die Top 4.", color: "from-yellow-400 to-accent" },
  { year: 2006, host: "Deutschland", hostFlag: "🇩🇪", winner: "Italien", winnerFlag: "🇮🇹", runnerUp: "Frankreich", runnerUpFlag: "🇫🇷", score: "1–1 n.V. (5–3 i.E.)", topScorer: "Miroslav Klose", topScorerGoals: 5, teams: 32, totalGoals: 147, highlight: "Zidanes Kopfstoss", highlightDetail: "Im Finale (Frankreich-Italien) gibt Zidane Materazzi nach einer verbalen Provokation einen Kopfstoss und wird vom Platz gestellt. Italien gewinnt im Elfmeterschiessen. Das letzte Bild von Zizou als Profi.", color: "from-gray-600 to-gray-800" },
  { year: 2010, host: "Südafrika", hostFlag: "🇿🇦", winner: "Spanien", winnerFlag: "🇪🇸", runnerUp: "Niederlande", runnerUpFlag: "🇳🇱", score: "1–0 n.V.", topScorer: "Thomas Müller, David Villa, Wesley Sneijder, Diego Forlán", topScorerGoals: 5, teams: 32, totalGoals: 145, highlight: "Die Vuvuzela und Krake Paul", highlightDetail: "Erste WM in Afrika! Vuvuzelas erfüllen die Stadien. Krake Paul sagt alle Ergebnisse Deutschlands voraus. Spanien gewinnt seinen 1. Titel dank Iniesta (116.). Waka Waka.", color: "from-yellow-500 to-accent" },
  { year: 2014, host: "Brasilien", hostFlag: "🇧🇷", winner: "Deutschland", winnerFlag: "🇩🇪", runnerUp: "Argentinien", runnerUpFlag: "🇦🇷", score: "1–0 n.V.", topScorer: "James Rodríguez", topScorerGoals: 6, teams: 32, totalGoals: 171, highlight: "Das 7:1 - das Mineirazo", highlightDetail: "Brasilien 1:7 Deutschland im Halbfinale: die grösste Schmach in der Geschichte des brasilianischen Fussballs. Neymar verletzungsbedingt abwesend, Brasilien bricht zusammen. Deutschland gewinnt seinen 4. Titel. James Rodríguez, die Entdeckung des Turniers.", color: "from-yellow-400 to-red-500" },
  { year: 2018, host: "Russland", hostFlag: "🇷🇺", winner: "Frankreich", winnerFlag: "🇫🇷", runnerUp: "Kroatien", runnerUpFlag: "🇭🇷", score: "4–2", topScorer: "Harry Kane", topScorerGoals: 6, teams: 32, totalGoals: 169, highlight: "Les Bleus werden Weltmeister!", highlightDetail: "Frankreich unter Deschamps mit Mbappé (19 Jahre!), Griezmann und Pogba dominiert und gewinnt seinen 2. WM-Titel. Kroatien, eine kleine Nation mit 4 Mio. Einwohnern, erreicht erstmals das Finale. Kane wird Torschützenkönig.", color: "from-blue-600 to-red-500" },
  { year: 2022, host: "Katar", hostFlag: "🇶🇦", winner: "Argentinien", winnerFlag: "🇦🇷", runnerUp: "Frankreich", runnerUpFlag: "🇫🇷", score: "3–3 n.V. (4–2 i.E.)", topScorer: "Kylian Mbappé", topScorerGoals: 8, teams: 32, totalGoals: 172, highlight: "Messi endlich Weltmeister", highlightDetail: "Das grösste Finale der Geschichte: Argentinien 3:3 Frankreich nach Verlängerung. Mbappé erzielt einen historischen Hattrick, verliert aber im Elfmeterschiessen (4:2). Lionel Messi, 35 Jahre alt, hebt endlich den WM-Pokal. Ein märchenhaftes Ende.", color: "from-sky-400 to-purple-600" },
];

// ── Hauptseite ────────────────────────────────────────────────────────

export default function HistoirePage() {
  const faqItems = [
    {
      question: "Wann fand die erste WM statt?",
      answer: "Die erste Fußball-WM fand 1930 in Uruguay statt. Von der FIFA auf Initiative von Jules Rimet organisiert, vereinte sie 13 Mannschaften (davon nur 4 europäische wegen der Entfernung). Uruguay besiegte Argentinien im Finale 4-2 im Estadio Centenario in Montevideo vor 93.000 Zuschauern. Diese Ausgabe begründete das meistgesehene Turnier der Welt."
    },
    {
      question: "Welches Land hat die meisten Weltmeisterschaften gewonnen?",
      answer: "Brasilien ist mit 5 gewonnenen Weltmeisterschaften (1958, 1962, 1970, 1994, 2002) das erfolgreichste Land. Die Seleção ist auch die einzige Mannschaft, die seit 1930 an allen Ausgaben ohne Ausnahme teilgenommen hat. Deutschland und Italien folgen mit je 4 Titeln, dann Argentinien mit 3 (den letzten 2022 mit Messi)."
    },
    {
      question: "Was ist das legendärste Finale in der WM-Geschichte?",
      answer: "Mehrere Finals sind legendär: Argentinien-Frankreich 2022 (3-3 n.V., 4-2 i.E.) bleibt das spektakulärste mit Mbappés Hattrick und Messis Krönung. Brasilien-Italien 1970 (4-1) feiert die schönste Mannschaft der Geschichte. Deutschland-Ungarn 1954 (3-2, 'Wunder von Bern') sieht das unbesiegbare Ungarn unerwartet verlieren. Schließlich traumatisierte Uruguay-Brasilien 1950 (2-1, 'Maracanazo') Brasilien vor 200.000 Zuschauern."
    },
    {
      question: "Wer sind die größten Spieler in der WM-Geschichte?",
      answer: "Die absoluten Legenden sind Pelé (3 Titel, einziger Spieler mit 3 Siegen), Diego Maradona (1986, unerreichte Einzelleistungen), Zinédine Zidane (1998, 2006), Ronaldo Nazário (2 Titel, 15 Tore), Miroslav Klose (16 Tore, absoluter Rekord) und Lionel Messi (Weltmeister 2022 nach 5 Anläufen). Jeder hat mit seinem Talent, seinen Rekorden und unvergesslichen Momenten Geschichte geschrieben."
    },
    {
      question: "Bei welcher WM-Ausgabe fielen die meisten Tore?",
      answer: "Die Ausgabe 1954 in der Schweiz hält den Rekord mit 140 Toren in 26 Spielen, also 5,38 Tore pro Spiel. Dieser außergewöhnliche Durchschnitt erklärt sich durch einen noch sehr offensiven Fußball, weniger organisierte Abwehrreihen und das Fehlen moderner Defensivtaktiken. Das Finale Deutschland-Ungarn (3-2) und das Viertelfinale Österreich-Schweiz (7-5) veranschaulichen diese Ära des spektakulären Fußballs perfekt."
    },
    {
      question: "Wie oft wurde die WM abgesagt?",
      answer: "Die WM wurde in ihrer Geschichte 2 Mal abgesagt: 1942 und 1946 wegen des Zweiten Weltkriegs. Zwischen 1938 (Frankreich) und 1950 (Brasilien) fand keine Ausgabe statt. Seit 1950 findet das Turnier alle 4 Jahre ohne Unterbrechung statt. COVID-19 hat die WM 2022 nicht abgesagt, sie fand lediglich im Winter statt statt im Sommer."
    }
  ];

  return (
    <>
{/* Hero */}
      <section className="relative bg-primary text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 text-9xl"></div>
          <div className="absolute bottom-10 right-10 text-9xl"></div>
          <div className="absolute top-1/2 left-1/4 text-6xl rotate-12"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">
            WM FIFA
          </p>
          <h1 className="text-2xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
             Die Geschichte der WM
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-6">
            92 Jahre voller Emotionen, Legenden und unvergesslicher Momente.
            Von Uruguay 1930 bis Argentinien 2022 -- erleben Sie jede Epoche nach.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { val: "22", label: "Ausgaben" },
              { val: "8", label: "Verschiedene Champions" },
              { val: "1930", label: "Erste Ausgabe" },
              { val: "2026", label: "Nächste Ausgabe" },
            ].map(({ val, label }) => (
              <div key={label} className="rounded-xl bg-white/10 px-6 py-3 min-w-[110px]">
                <div className="text-3xl font-extrabold text-white">{val}</div>
                <div className="text-xs text-gray-300 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:grid lg:grid-cols-[1fr_220px] lg:gap-8">
        <div>
        {/* Intro */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 id="timeline" className="text-2xl font-bold text-gray-900 mb-3">
            Eine Timeline der Legenden
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Von Pelé bis Maradona, von Zidane bis Messi -- jede Ausgabe hat ihre eigenen Helden und mythischen Momente hervorgebracht.
            Entdecken Sie die komplette Geschichte des meistgesehenen Turniers der Welt.
          </p>
        </div>

        {/* Timeline */}
        <Timeline editions={editions} />

        {/* Spezialabschnitt 2026 */}
        <Section2026 />

        {/* Navigation am Seitenende */}
        <div className="mt-12 grid sm:grid-cols-3 gap-4">
          {[
            { href: "/palmares", icon: "", label: "Komplette Erfolge", desc: "Alle Sieger von 1930 bis 2022" },
            { href: "/statistiques", icon: "", label: "Statistiken", desc: "Rekorde, Torschützen, Tore pro Ausgabe" },
            { href: "/mannschaft", icon: "", label: "Die 48 Mannschaften 2026", desc: "Gruppen, Kader und Prognosen" },
          ].map(({ href, icon, label, desc }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:border-primary/30 hover:shadow-md transition-all group"
            >
              <span className="text-3xl flex-shrink-0">{icon}</span>
              <div>
                <div className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                  {label}
                </div>
                <div className="text-xs text-gray-500">{desc}</div>
              </div>
            </Link>
          ))}
        </div>
        </div>
        <TableOfContents items={[
          { id: "timeline", label: "Timeline der Ausgaben", level: 2 },
        ]} />
      </div>

      <RelatedLinks
        links={[
          {
            href: "/palmares",
            title: "Komplette Erfolge",
            description: "Alle Sieger, Finalisten und besten Torschützen jeder Ausgabe seit 1930.",
            icon: ""
          },
          {
            href: "/statistiques",
            title: " Erweiterte Statistiken",
            description: "Rekorde, historische Leistungen und statistische Analysen der WM.",
            icon: ""
          },
          {
            href: "/mannschaft",
            title: "Mannschaften WM 2026",
            description: "Entdecken Sie die 48 qualifizierten Mannschaften für die nächste WM.",
            icon: ""
          }
        ]}
      />

      <FAQSection title=" Fragen zur Geschichte der WM" items={faqItems} />

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Geschichte der WM - Timeline 1930 bis 2026",
            description: "Vollständige Timeline der Geschichte der FIFA-WM von 1930 bis 2026, mit Highlights und Rekorden.",
            url: "https://www.wm2026guide.de/geschichte",
            mainEntity: {
              "@type": "ItemList",
              name: "Ausgaben der FIFA-WM",
              numberOfItems: editions.length + 1,
              itemListElement: editions.map((ed, idx) => ({
                "@type": "ListItem",
                position: idx + 1,
                name: `WM ${ed.year} — ${ed.winner} Weltmeister`,
                description: ed.highlightDetail,
              })),
            },
          }),
        }}
      />
    </>
  );
}
