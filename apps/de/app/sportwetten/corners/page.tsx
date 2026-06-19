import type { Metadata } from 'next';
import Link from 'next/link';
import { FAQSection } from '@repo/ui/faq-section';
import { pmuTrackingUrl } from '@repo/data/affiliates';
import { CornerDownRight, ArrowRight, AlertTriangle, TrendingUp, BarChart3, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Eckball-Wetten WM 2026 — Over/Under, Statistiken & Strategien',
  description:
    'Eckball-Wetten WM 2026: Over/Under 9.5, historische Statistiken, offensivste Mannschaften und Quotenvergleich. Ratgeber und Strategien.',
  openGraph: {
    title: 'Eckball-Wetten WM 2026 — Ratgeber & Strategien',
    description:
      'Over/Under Ecken, historische WM-Statistiken, Top 5 der eckenstärksten Mannschaften und beste Wettanbieter-Quoten.',
    url: 'https://www.wm2026guide.de/sportwetten/corners',
  },
  alternates: { canonical: 'https://www.wm2026guide.de/sportwetten/corners' },
};

/* ---------- data ---------- */

const statsHistoriques = [
  { edition: 'Russland 2018', matchs: 64, totalCorners: 628, moyenne: '9.8' },
  { edition: 'Katar 2022', matchs: 64, totalCorners: 672, moyenne: '10.5' },
  { edition: 'Brasilien 2014', matchs: 64, totalCorners: 604, moyenne: '9.4' },
  { edition: 'Südafrika 2010', matchs: 64, totalCorners: 587, moyenne: '9.2' },
  { edition: 'Deutschland 2006', matchs: 64, totalCorners: 614, moyenne: '9.6' },
];

const topEquipes = [
  { equipe: 'Brasilien', moyCorners: '6.8', style: 'Offensives Ballbesitzspiel, ständige Flügelvorstöße' },
  { equipe: 'Spanien', moyCorners: '6.5', style: 'Tiki-Taka, hohes Pressing, zahlreiche Flanken von den Außenbahnen' },
  { equipe: 'Deutschland', moyCorners: '6.2', style: 'Offensive Außenverteidiger (Kimmich), Ecken bei Standards' },
  { equipe: 'Frankreich', moyCorners: '5.9', style: 'Schnelle Angriffe, abgefälschte Schüsse, Pressing in der 2. Halbzeit' },
  { equipe: 'England', moyCorners: '5.7', style: 'Häufige Flanken, direktes Spiel, einstudierte Standards' },
];

const cotesCorners = [
  { marche: 'Over 9.5 Ecken', pmusport: '1.88' },
  { marche: 'Under 9.5 Ecken', pmusport: '1.92' },
  { marche: 'Over 11.5 Ecken', pmusport: '2.45' },
  { marche: 'Under 11.5 Ecken', pmusport: '1.52' },
  { marche: '1. Ecke — Mannschaft A', pmusport: '1.82' },
  { marche: 'Letzte Ecke — Mannschaft B', pmusport: '2.15' },
];

const bookmakers = [
  { nom: 'Betano', desc: 'Ecken live, Cash-out verfügbar, integrierte Statistiken in der App, lizenzierter Wettanbieter', url: pmuTrackingUrl('paris-sportifs') },
];

const strategies = [
  {
    titre: 'Hohes Pressing = mehr Ecken',
    contenu:
      'Mannschaften mit hohem Pressing zwingen den Gegner zu Klärungsaktionen ins Aus oder zur Ecke. Achten Sie auf Mannschaften mit niedrigem PPDA (Passes Per Defensive Action): Spanien, Deutschland, Argentinien. Diese Spiele überschreiten oft 10.5 Ecken.',
  },
  {
    titre: 'Defensive Mannschaften = Under Ecken',
    contenu:
      'Wenn zwei defensive Mannschaften aufeinandertreffen (tiefe Blocks, wenig Ballbesitz im letzten Drittel), bleibt die Eckenzahl oft unter 9.5. Typische Beispiele: Spiele mit Iran, Saudi-Arabien, Australien in der Gruppenphase.',
  },
  {
    titre: 'Wetter und Platzverhältnisse analysieren',
    contenu:
      "Die WM 2026 findet im Sommer in den USA, Kanada und Mexiko statt. Die Hitze ermüdet die Abwehrreihen in der 2. Halbzeit, was mehr Ecken in den letzten 30 Minuten verursacht. Zielen Sie auf den Markt 'Ecken 2. Halbzeit Over'.",
  },
  {
    titre: '1. Ecke: die dominierende Mannschaft',
    contenu:
      "In 68 % der WM-Spiele erhält der Favorit die 1. Ecke. Kombinieren Sie diese Wette mit 'Sieg 1. Halbzeit' für eine Mini-Kombiwette mit attraktiver Quote (~3.20).",
  },
];

const faqItems = [
  {
    question: 'Was ist eine Over/Under-Eckenwette?',
    answer:
      'Eine Over/Under-Eckenwette besteht darin, auf die Gesamtzahl der Ecken in einem Spiel zu wetten. Zum Beispiel bedeutet Over 9.5, dass Sie auf 10 Ecken oder mehr wetten. Under 9.5 bedeutet 9 Ecken oder weniger. Die gängigsten Linien bei der WM sind 9.5 und 11.5.',
  },
  {
    question: 'Wie hoch ist der Durchschnitt an Ecken pro Spiel bei einer WM?',
    answer:
      'Bei den letzten 5 Weltmeisterschaften lag der Durchschnitt zwischen 9.2 und 10.5 Ecken pro Spiel. Bei Katar 2022 lag der Durchschnitt bei 10.5, dem jüngsten Höchstwert. Für die WM 2026 rechnen Experten mit etwa 10.0 bis 10.8 Ecken pro Spiel.',
  },
  {
    question: 'Wie analysiert man die Ecken vor einem Spiel?',
    answer:
      'Prüfen Sie den Spielstil beider Mannschaften (hohes Pressing vs. tiefer Block), die Eckenstatistiken der Qualifikation, die aktuelle Form und das Wetter. Offensivstarke Mannschaften mit dynamischen Flügelspielern erzeugen naturgemäß mehr Ecken.',
  },
  {
    question: 'Kann man auf Ecken live wetten?',
    answer:
      'Ja, Betano bietet Ecken-Märkte live an. Das ist sogar eine beliebte Strategie: die ersten 15 Minuten beobachten, um das Spieltempo einzuschätzen, bevor man auf die Gesamtecken setzt.',
  },
];

/* ---------- page ---------- */

export default function ParisCornersPage() {
return (
    <>

      {/* Hero */}
      <section className='hero-animated text-white py-16 overflow-hidden'>
        <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center'>
          <p className='text-sm font-medium text-accent uppercase tracking-widest mb-2'>
            Sportwetten — Ecken
          </p>
          <h1 className='text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4'>
            Ratgeber Eckball-Wetten WM 2026
          </h1>
          <p className='text-gray-200 text-lg max-w-3xl mx-auto'>
            Over/Under 9.5 &amp; 11.5, Gesamtecken, 1. Ecke, letzte Ecke: Nutzen Sie die
            historischen Statistiken und unsere Strategien für Eckball-Wetten bei der WM 2026.
          </p>
        </div>
      </section>

      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-14'>

        {/* Einführung */}
        <section>
          <h2 className='text-2xl font-bold text-primary mb-4 flex items-center gap-3'>
            <CornerDownRight className='h-7 w-7 text-accent' /> Eckball-Wetten verstehen
          </h2>
          <div className='rounded-xl border border-gray-200 bg-white p-6 space-y-3 text-gray-700 text-sm leading-relaxed'>
            <p>
              Eckball-Wetten sind ein stark wachsender Markt bei internationalen Wettbewerben.
              Im Gegensatz zu klassischen Wetten (1X2, Tore) bieten Ecken einen statistischen Ansatz,
              bei dem die Analyse der Spielstile wichtiger ist als die reine Form der Mannschaften. Bei der WM
              erzeugt jedes Spiel im Durchschnitt <strong>9 bis 11 Ecken</strong>, was die Linien
              Over/Under 9.5 und 11.5 besonders interessant macht.
            </p>
            <p>
              Die verfügbaren Märkte umfassen die <strong>Gesamtecken des Spiels</strong>, die Anzahl der
              Ecken pro Mannschaft, die <strong>1. Ecke</strong> (welche Mannschaft sie erhält), die <strong>letzte
              Ecke</strong> und die Ecken pro Halbzeit. Jeder dieser Märkte erfordert eine andere Analyse
              — und genau darin liegt der Wert für erfahrene Wetter.
            </p>
          </div>
        </section>

        {/* Historische Statistiken */}
        <section>
          <h2 className='text-2xl font-bold text-primary mb-6 flex items-center gap-3'>
            <BarChart3 className='h-7 w-7 text-accent' /> Eckenstatistiken pro WM
          </h2>
          <div className='overflow-x-auto'>
            <table className='w-full text-sm border-collapse'>
              <thead>
                <tr className='border-b-2 border-accent/30 text-left'>
                  <th className='py-3 px-4 text-primary font-semibold'>Ausgabe</th>
                  <th className='py-3 px-4 text-primary font-semibold'>Spiele</th>
                  <th className='py-3 px-4 text-primary font-semibold'>Ecken gesamt</th>
                  <th className='py-3 px-4 text-primary font-semibold'>Durchschnitt/Spiel</th>
                </tr>
              </thead>
              <tbody>
                {statsHistoriques.map((s) => (
                  <tr key={s.edition} className='border-b border-gray-100'>
                    <td className='py-2.5 px-4 font-medium text-gray-900'>{s.edition}</td>
                    <td className='py-2.5 px-4 text-gray-600'>{s.matchs}</td>
                    <td className='py-2.5 px-4 text-gray-600'>{s.totalCorners}</td>
                    <td className='py-2.5 px-4 text-accent font-bold'>{s.moyenne}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className='text-xs text-gray-400 mt-2 italic'>
            Trend: Der Eckendurchschnitt steigt mit jeder Ausgabe, getrieben durch offensiveres Spiel und intensiveres Pressing.
          </p>
        </section>

        {/* Top 5 Mannschaften */}
        <section>
          <h2 className='text-2xl font-bold text-primary mb-6 flex items-center gap-3'>
            <TrendingUp className='h-7 w-7 text-accent' /> Top 5 der eckenstärksten Mannschaften
          </h2>
          <p className='text-sm text-gray-600 mb-4'>
            Diese Mannschaften erzeugen die meisten Ecken pro Spiel bei jüngsten internationalen Wettbewerben.
            Setzen Sie auf deren Spiele für Ihre Over-Ecken-Wetten.
          </p>
          <div className='space-y-3'>
            {topEquipes.map((eq, i) => (
              <div
                key={eq.equipe}
                className='flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4'
              >
                <span className='flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 text-accent font-bold flex items-center justify-center text-sm'>
                  {i + 1}
                </span>
                <div className='flex-1'>
                  <div className='flex items-center gap-3'>
                    <h3 className='font-bold text-gray-900'>{eq.equipe}</h3>
                    <span className='text-xs bg-accent/10 text-accent font-semibold px-2 py-0.5 rounded-full'>
                      {eq.moyCorners} Ecken/Spiel
                    </span>
                  </div>
                  <p className='text-xs text-gray-500 mt-1'>{eq.style}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quotentabelle */}
        <section>
          <h2 className='text-2xl font-bold text-primary mb-6 flex items-center gap-3'>
            <BarChart3 className='h-7 w-7 text-accent' /> Over/Under-Ecken-Quoten — Vergleich
          </h2>
          <div className='overflow-x-auto'>
            <table className='w-full text-sm border-collapse'>
              <thead>
                <tr className='border-b-2 border-accent/30 text-left'>
                  <th className='py-3 px-4 text-primary font-semibold'>Markt</th>
                  <th className='py-3 px-4 text-primary font-semibold'>Betano</th>
                </tr>
              </thead>
              <tbody>
                {cotesCorners.map((c) => (
                  <tr key={c.marche} className='border-b border-gray-100'>
                    <td className='py-2.5 px-4 font-medium text-gray-900'>{c.marche}</td>
                    <td className='py-2.5 px-4 text-accent font-bold'>{c.pmusport}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className='text-xs text-gray-400 mt-2 italic'>
            Richtquoten für ein typisches Gruppenspiel der WM 2026. Vergleichen Sie immer vor dem Wetten.
          </p>
        </section>

        {/* Strategien */}
        <section>
          <h2 className='text-2xl font-bold text-primary mb-6 flex items-center gap-3'>
            <CornerDownRight className='h-7 w-7 text-accent' /> Strategien für Eckball-Wetten
          </h2>
          <div className='grid gap-4 sm:grid-cols-2'>
            {strategies.map((s) => (
              <div
                key={s.titre}
                className='rounded-xl border border-gray-200 bg-white p-5'
              >
                <h3 className='font-bold text-gray-900 text-base mb-2'>{s.titre}</h3>
                <p className='text-sm text-gray-600 leading-relaxed'>{s.contenu}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Prognosen Ecken pro Spiel */}
        <section className='rounded-xl border border-accent/20 bg-accent/5 p-6 text-center'>
          <h2 className='text-xl font-bold text-primary mb-2'>
            Ecken-Prognosen Spiel für Spiel
          </h2>
          <p className='text-sm text-gray-600 mb-4'>
            Entdecken Sie unsere detaillierten Ecken-Analysen für jedes Spiel der WM 2026:
            Over/Under, 1. Ecke, Ecken pro Halbzeit.
          </p>
          <Link
            href='/sportwetten/corners'
            className='inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-accent/90 transition-colors'
          >
            Ecken-Prognosen anzeigen <ArrowRight className='h-4 w-4' />
          </Link>
        </section>

        {/* Wettanbieter CTA */}
        <section>
          <h2 className='text-2xl font-bold text-primary mb-4 flex items-center gap-3'>
            <CornerDownRight className='h-7 w-7 text-accent' /> Beste Wettanbieter für Eckball-Wetten
          </h2>
          <div className='grid gap-4 sm:grid-cols-3'>
            {bookmakers.map((b) => (
              <a
                key={b.nom}
                href={b.url}
                target='_blank'
                rel='noopener noreferrer sponsored nofollow'
                className='rounded-xl border border-gray-200 bg-white p-5 hover:border-accent/50 hover:shadow-md transition-all block'
              >
                <h3 className='font-bold text-gray-900 flex items-center gap-2'>
                  {b.nom} <ExternalLink className='h-4 w-4 text-gray-400' />
                </h3>
                <p className='text-sm text-gray-600 mt-1'>{b.desc}</p>
                <span className='inline-block mt-3 bg-accent text-white rounded-xl py-3.5 px-4 text-sm font-semibold text-center w-full'>
                  Willkommensbonus bei {b.nom}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Sekundäre CTAs */}
        <div className='flex flex-wrap justify-center gap-4'>
          <Link
            href='/comparateur-cotes'
            className='inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-accent/90 transition-colors'
          >
            Quotenvergleich <ArrowRight className='h-4 w-4' />
          </Link>
          <Link
            href='/sportwetten/kombiwetten'
            className='inline-flex items-center gap-2 bg-primary text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-primary/90 transition-colors'
          >
            Kombiwetten WM 2026
          </Link>
        </div>

        {/* BZgA */}
        <p className='text-xs text-gray-400 text-center'>
          <AlertTriangle className='inline h-3 w-3 mr-1' />
          Sportwetten sind mit Risiken verbunden. Spielen Sie verantwortungsvoll. 18+ | Informationen und Hilfe auf{' '}
          <a href='https://www.bzga.de' target='_blank' rel='noopener noreferrer' className='underline'>
            bzga.de
          </a>{' '}
          (BZgA).
        </p>

        <FAQSection items={faqItems} />
      </div>
    </>
  );
}
