import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { pmuTrackingUrl } from "@repo/data/affiliates";
import { Zap, Smartphone, TrendingUp, Shield, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Live-Wetten WM 2026 -- Kompletter Guide zum Live Betting",
  description:
    "Kompletter Guide zum Live Betting für die WM 2026. Wie man live wettet, beste Apps, Live-Strategien und Cashout.",
  alternates: { canonical: "https://www.wm2026guide.de/sportwetten/live" },
  openGraph: {
    title: "Live-Wetten WM 2026 -- Kompletter Guide",
    description: "Live-Betting-Strategien, beste Apps und Cashout für die WM 2026.",
    url: "https://www.wm2026guide.de/sportwetten/live",
  },
};

const apps = [
  { name: "Betano", note: "4.6/5", points: "Live-Statistiken, Teil-Cashout verfügbar, übersichtliche Oberfläche. Vertrauenswürdiger lizenzierter Wettanbieter.", url: pmuTrackingUrl("paris-sportifs") },
];

const strategies = [
  { title: "Die Wette auf das nächste Tor", icon: "goal", desc: "Nach einem frühen Tor passen sich die Quoten an. Wenn der Favorit 1:0 führt, wetten Sie auf 'nächstes Tor' für den Außenseiter zu einer interessanten Quote -- zurückliegende Mannschaften gehen mehr Risiko ein." },
  { title: "Over 0.5 Tore 2. Halbzeit", icon: "half", desc: "Wenn es zwischen zwei guten Mannschaften zur Pause 0:0 steht, bietet Over 0.5 Tore in der 2. Halbzeit oft eine sehr sichere Quote von 1.30-1.50. Die Trainer passen ihre Taktik an." },
  { title: "Lay des Favoriten nach 1:0", icon: "lay", desc: "Wenn der Favorit 1:0 führt, fallen seine Quoten. Wenn Sie vor dem Spiel auf ihn gewettet haben, ist dies der ideale Moment für einen Cashout oder eine Hedge-Position." },
  { title: "Wetten auf Karten in der 2. Halbzeit", icon: "card", desc: "70 % der Karten werden in der 2. Halbzeit verteilt. Warten Sie die Pause ab, um die Spannung des Spiels zu bewerten, bevor Sie auf Over Karten wetten." },
  { title: "Die späte Ecke", icon: "corner", desc: "Die letzten 15 Minuten konzentrieren einen Höhepunkt an Ecken. Bei einem engen Spiel wetten Sie auf 'nächste Ecke innerhalb von 5 Min.' zu vorteilhaften Quoten." },
];

const cashoutTips = [
  "Cashout bei 70-80 % des potenziellen Gewinns, wenn Ihre Mannschaft führt, aber unter Druck steht.",
  "Niemals einen sicheren Einsatz mit über 90 % Erfolgswahrscheinlichkeit cashouten -- laufen lassen.",
  "Nutzen Sie den Teil-Cashout, um einen Teil Ihrer Gewinne zu sichern und gleichzeitig im Spiel zu bleiben.",
  "Vermeiden Sie emotionalen Cashout nach einem Gegentor: Warten Sie 5 Minuten, bis sich die Quoten stabilisiert haben.",
];

const faqItems = [
  { question: "Was ist Live Betting?", answer: "Live Betting (oder Live-Wetten) ermöglicht es, während eines laufenden Spiels zu wetten. Die Quoten entwickeln sich in Echtzeit je nach Spielstand, Ballbesitz, Chancen und verbleibender Zeit. Es ist die beliebteste Wettform für große Ereignisse wie die WM." },
  { question: "Welche ist die beste App für Live-Wetten bei der WM 2026?", answer: "Betano ist unsere Empfehlung für Live Betting bei der WM 2026. Die App bietet Live-Statistiken, Teil-Cashout und eine übersichtliche Oberfläche. Betano ist ein lizenzierter Wettanbieter." },
  { question: "Was ist Cashout?", answer: "Cashout ermöglicht es, eine Wette vor Spielende zu schließen, um einen Gewinn zu sichern (wenn Ihre Wette auf gutem Weg ist) oder einen Verlust zu begrenzen (wenn das Spiel kippt). Der angebotene Betrag hängt von den Echtzeit-Quoten ab. Alle großen Wettanbieter bieten diese Option an." },
  { question: "Sind Live-Wetten profitabler als Vor-Spiel-Wetten?", answer: "Live-Wetten bieten mehr Möglichkeiten, erfordern aber ein gutes Spielverständnis. Der Vorteil: Sie sehen das Spiel laufen und können Trends erkennen, die die Quoten noch nicht eingepreist haben. Der Nachteil: Live-Quoten enthalten eine höhere Marge des Wettanbieters." },
];

export default function ParisLivePage() {
  return (
    <>

      <section className="hero-animated text-center py-16 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-accent mb-4">Live-Wetten -- WM 2026</h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Kompletter Guide zum Live-Wetten während der Spiele der WM 2026. Strategien, Apps und Cashout.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">So wetten Sie live</h2>
        </div>
        <div className="bg-primary/5 rounded-xl p-6">
          <p className="text-gray-700 leading-relaxed mb-4">
            Live Betting verwandelt jedes Spiel in ein immersives Erlebnis. Im Gegensatz zu Vor-Spiel-Wetten verfügen Sie über Echtzeitinformationen: Form der Mannschaften, Verletzungen, Spieltempo, territoriale Dominanz. Diese Daten ermöglichen fundierte Entscheidungen.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Um zu beginnen, eröffnen Sie ein Konto bei einem lizenzierten Wettanbieter, zahlen Sie per Kreditkarte oder Überweisung ein und gehen Sie während eines Spiels in den Bereich &quot;Live&quot;. Verfügbare Märkte umfassen: nächstes Tor, Live-Exaktergebnis, angepasstes Over/Under, Ecken, Karten und vieles mehr.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Wichtiger Tipp: Wetten Sie nie in den ersten 5 Minuten oder direkt nach einem Tor. Warten Sie, bis sich die Quoten stabilisiert haben, um echten Value zu erkennen.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Smartphone className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Beste Apps für Live Betting</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {apps.map((a) => (
            <div key={a.name} className="border border-gray-200 rounded-xl p-5">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-primary text-lg">{a.name}</h3>
                <span className="bg-accent/10 text-accent font-bold px-3 py-1 rounded-lg text-sm">{a.note}</span>
              </div>
              <p className="text-sm text-gray-700 mb-3">{a.points}</p>
              <Link href={a.url} target="_blank" rel="noopener noreferrer sponsored nofollow" className="text-sm text-accent font-semibold hover:underline">
                Angebot ansehen <ArrowRight className="inline w-3 h-3 ml-1" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">5 Live-Strategien für die WM 2026</h2>
        </div>
        <div className="space-y-4">
          {strategies.map((s, i) => (
            <div key={s.title} className="border-l-4 border-accent pl-5 py-3">
              <h3 className="font-bold text-primary">{i + 1}. {s.title}</h3>
              <p className="text-sm text-gray-700 mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Cashout -- Gewinne sichern</h2>
        </div>
        <div className="bg-accent/5 rounded-xl p-6">
          <p className="text-gray-700 mb-4">
            Der Cashout ist Ihr bester Verbündeter beim Live Betting. Er ermöglicht es, eine laufende Wette in einen gesicherten Gewinn umzuwandeln (oder Verluste zu begrenzen). Hier die goldenen Regeln:
          </p>
          <ul className="space-y-3">
            {cashoutTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="bg-accent text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                <span className="text-sm text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <a href={pmuTrackingUrl("paris-sportifs")} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-block bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity">
          Willkommensbonus -- Live-Wetten WM 2026 bei Betano starten <ArrowRight className="inline w-4 h-4 ml-1" />
        </a>
        <p className="text-xs text-gray-400 mt-3">18+ | Es gelten die AGB</p>
      </section>

      <FAQSection title="Häufig gestellte Fragen -- Live-Wetten WM 2026" items={faqItems} />

    </>
  );
}
