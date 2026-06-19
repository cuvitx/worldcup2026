import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { Trophy, Calendar, MapPin, TrendingUp, History, Star, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Finale WM 2026 - MetLife Stadium, 19. Juli | WM 2026",
  description:
    "Das Finale der WM 2026 im MetLife Stadium (New York) am 19. Juli 2026. Finalhistorie, Prognosen, Quoten und alles Wissenswerte über das ultimative Spiel.",
  openGraph: {
    title: "Finale WM 2026 - MetLife Stadium, New York",
    description:
      "Alles über das Finale der WM 2026: Datum, Stadion, Historie, Prognosen und Quoten.",
    url: "https://www.wm2026guide.de/finale",
  },
  alternates: { canonical: "https://www.wm2026guide.de/finale" },
};

const finalesHistorique = [
  { annee: "2022", lieu: "Lusail (Katar)", affiche: "Argentinien 3-3 Frankreich (4-2 i.E.)", vainqueur: "🇦🇷 Argentinien" },
  { annee: "2018", lieu: "Moskau (Russland)", affiche: "Frankreich 4-2 Kroatien", vainqueur: "🇫🇷 Frankreich" },
  { annee: "2014", lieu: "Rio de Janeiro (Brasilien)", affiche: "Deutschland 1-0 Argentinien (n.V.)", vainqueur: "🇩🇪 Deutschland" },
  { annee: "2010", lieu: "Johannesburg (Südafrika)", affiche: "Spanien 1-0 Niederlande (n.V.)", vainqueur: "🇪🇸 Spanien" },
  { annee: "2006", lieu: "Berlin (Deutschland)", affiche: "Italien 1-1 Frankreich (5-3 i.E.)", vainqueur: "🇮🇹 Italien" },
  { annee: "2002", lieu: "Yokohama (Japan)", affiche: "Brasilien 2-0 Deutschland", vainqueur: "🇧🇷 Brasilien" },
  { annee: "1998", lieu: "Saint-Denis (Frankreich)", affiche: "Frankreich 3-0 Brasilien", vainqueur: "🇫🇷 Frankreich" },
  { annee: "1994", lieu: "Pasadena (USA)", affiche: "Brasilien 0-0 Italien (3-2 i.E.)", vainqueur: "🇧🇷 Brasilien" },
];

const faqItems = [
  {
    question: "Wann und wo findet das Finale der WM 2026 statt?",
    answer:
      "Das Finale der WM 2026 findet am 19. Juli 2026 im MetLife Stadium in East Rutherford, New Jersey (Region New York) statt. Der Anstoß ist für 16:00 Uhr Ortszeit (22:00 Uhr MEZ) geplant.",
  },
  {
    question: "Wie viele Plätze hat das MetLife Stadium?",
    answer:
      "Das MetLife Stadium hat in der Fußballkonfiguration eine Kapazität von 82.500 Plätzen. Für das WM-Finale 2026 könnte die FIFA die Konfiguration auf etwa 80.000 Plätze anpassen, einschließlich der Medien- und VIP-Einrichtungen.",
  },
  {
    question: "Wie viel kosten die Tickets für das Finale?",
    answer:
      "Die Ticketpreise für das WM-Finale 2026 sind noch nicht offiziell bekannt gegeben. Zur Orientierung: Tickets für das Finale 2022 in Katar lagen zwischen 604$ (Kategorie 3) und 1.607$ (Kategorie 1). Ähnliche oder höhere Preise sind für 2026 zu erwarten.",
  },
  {
    question: "Wann fand das letzte WM-Finale in den USA statt?",
    answer:
      "Das letzte Finale in den USA fand 1994 im Rose Bowl in Pasadena (Kalifornien) statt. Brasilien besiegte Italien im Elfmeterschießen (3-2 nach einem 0-0). 2026 wird das Finale diesmal an der Ostküste im MetLife Stadium stattfinden.",
  },
  {
    question: "Wer sind die Favoriten für das Finale 2026?",
    answer:
      "Die Hauptfavoriten laut Buchmachern sind Brasilien (Quote ~5,50), Argentinien (Quote ~6,00), Frankreich (Quote ~6,50), England (Quote ~7,00), Spanien (Quote ~8,00) und Deutschland (Quote ~10,00). Die Quoten entwickeln sich im Laufe des Turniers.",
  },
  {
    question: "Wie kann man das Finale in Deutschland sehen?",
    answer:
      "Das Finale wird voraussichtlich im Free-TV auf ARD oder ZDF und im Streaming auf den jeweiligen Mediatheken übertragen. Der Anstoß um 22:00 Uhr MEZ ist ein idealer Zeitpunkt für das deutsche Publikum.",
  },
];

export default function FinalePage() {
  return (
    <>

      {/* Hero */}
      <section className="hero-animated text-white py-16 sm:py-20 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <Trophy className="h-4 w-4 text-accent" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">
              Das ultimative Spiel
            </span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-5xl lg:text-6xl mb-4">
            <span className="text-accent">Das Finale</span> der WM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto mb-6">
            MetLife Stadium, New York — 19. Juli 2026.
            Das größte Spiel des Weltfußballs.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { val: "19. Juli", label: "Datum" },
              { val: "82.500", label: "Plätze" },
              { val: "22:00", label: "Uhrzeit MEZ" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-black text-accent">{s.val}</p>
                <p className="text-xs text-gray-300 uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 space-y-14">
        {/* Das MetLife Stadium */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-gray-900">
              Das MetLife Stadium: Austragungsort des Finales
            </h2>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4 text-gray-700 leading-relaxed">
            <p>
              Das MetLife Stadium liegt in East Rutherford, New Jersey, nur wenige Kilometer von Manhattan entfernt,
              und ist eines der größten Stadien der USA. Es wurde 2010 eröffnet und ist normalerweise
              die Heimstätte der New York Giants und der New York Jets aus der NFL.
            </p>
            <p>
              Mit seinen 82.500 Plätzen ist es das größte Stadion der NFL.
              Für die WM 2026 wird es mehrere Gruppenspiele, ein Achtelfinale,
              ein Halbfinale und natürlich das große Finale am 19. Juli beherbergen.
            </p>
            <p>
              Das Stadion ist von Manhattan aus bequem mit dem NJ Transit erreichbar (Bahnhof
              Secaucus Junction und dann Shuttle). An Spieltagen wird die FIFA spezielle Transportdienste
              einrichten. Die Nähe zu New York bietet einen außergewöhnlichen Rahmen für das
              meistgesehene Sportereignis der Welt.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              {[
                { val: "82 500", label: "Kapazität" },
                { val: "2010", label: "Eröffnung" },
                { val: "1,7 Mrd. $", label: "Baukosten" },
                { val: "Offen", label: "Dach" },
              ].map((s) => (
                <div key={s.label} className="rounded-lg bg-gray-50 p-3 text-center">
                  <p className="text-lg font-bold text-primary">{s.val}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rückkehr in die USA */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Star className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-gray-900">
              Das Finale kehrt nach 32 Jahren in die USA zurück
            </h2>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4 text-gray-700 leading-relaxed">
            <p>
              Das letzte Mal, als ein WM-Finale auf amerikanischem Boden ausgetragen wurde,
              war am 17. Juli 1994 im Rose Bowl in Pasadena. An jenem Tag besiegte
              Brasiliens Romário Italiens Roberto Baggio im Elfmeterschießen
              nach einem torlosen Spiel — dem ersten 0:0 in einem Finale der Geschichte.
            </p>
            <p>
              2026 ist die Ausgangslage grundlegend anders. Fußball (Soccer) hat in den USA
              mit der MLS, der Ankunft internationaler Stars wie Messi bei Inter Miami
              und einer ambitionierten Nationalmannschaft einen Boom erlebt. Die Begeisterung
              für diese WM dürfte im Land beispiellos sein.
            </p>
            <p>
              Die Wahl von New York (die Weltmetropole schlechthin) für das Finale ist ein
              starkes Symbol. Mit einem Anstoß um 16:00 Uhr Ortszeit wird das Spiel
              zur Primetime in Europa übertragen (22:00 Uhr MEZ, 21:00 Uhr in London) — eine
              strategische Entscheidung, um das weltweite Publikum zu maximieren.
            </p>
          </div>
        </section>

        {/* Historie der Endspiele */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <History className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-gray-900">
              Historie der WM-Endspiele
            </h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Jahr</th>
                  <th className="px-4 py-3 text-left">Ort</th>
                  <th className="px-4 py-3 text-left">Begegnung</th>
                  <th className="px-4 py-3 text-left">Sieger</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {finalesHistorique.map((f) => (
                  <tr key={f.annee} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{f.annee}</td>
                    <td className="px-4 py-3 text-gray-600">{f.lieu}</td>
                    <td className="px-4 py-3 text-gray-600">{f.affiche}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{f.vainqueur}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Brasilien hält den Rekord mit 5 Titeln (1958, 1962, 1970, 1994, 2002),
            gefolgt von Deutschland und Italien (je 4), dann Argentinien (3)
            und Frankreich (2).
          </p>
        </section>

        {/* Prognosen */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-gray-900">
              Prognosen und Quoten für das Finale
            </h2>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4 text-gray-700 leading-relaxed">
            <p>
              Es ist noch früh, um die Finalisten vorherzusagen, aber die Buchmacher haben bereits
              ihre Favoriten für den Titel. Argentinien mit Messi (falls der Kapitän für seinen
              letzten Tanz dabei ist) und Brasilien, das nach 2022 Wiedergutmachung sucht,
              liegen bei den meisten Plattformen vorne in den Quoten.
            </p>
            <p>
              Frankreich, zweifacher Weltmeister (1998, 2018) und Finalist 2022,
              gehört zu den ernsthaften Anwärtern. Englands Bellingham und Saka,
              Spaniens Yamal und Pedri sowie Deutschland (als
              Mitfavorit mit der Unterstützung des nordamerikanischen Publikums) vervollständigen die
              Liste der glaubwürdigen Kandidaten.
            </p>

            <div className="overflow-x-auto rounded-lg border border-gray-200 mt-4">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-600">Mannschaft</th>
                    <th className="px-4 py-2 text-left text-gray-600">Richtquote</th>
                    <th className="px-4 py-2 text-left text-gray-600">Implizite Wahrscheinlichkeit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {[
                    { equipe: "🇧🇷 Brasilien", cote: "5.50", prob: "~18%" },
                    { equipe: "🇦🇷 Argentinien", cote: "6.00", prob: "~17%" },
                    { equipe: "🇫🇷 Frankreich", cote: "6.50", prob: "~15%" },
                    { equipe: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England", cote: "7.00", prob: "~14%" },
                    { equipe: "🇪🇸 Spanien", cote: "8.00", prob: "~13%" },
                    { equipe: "🇩🇪 Deutschland", cote: "10.00", prob: "~10%" },
                  ].map((e) => (
                    <tr key={e.equipe} className="hover:bg-gray-50">
                      <td className="px-4 py-2 font-medium text-gray-900">{e.equipe}</td>
                      <td className="px-4 py-2 text-accent font-bold">{e.cote}</td>
                      <td className="px-4 py-2 text-gray-600">{e.prob}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Richtquoten nur zu Informationszwecken. Sportwetten bergen Risiken.
              Spielen Sie verantwortungsbewusst. 18+.
              {" "}
              <Link href="/verantwortungsvolles-spielen" className="underline hover:text-primary">
                Mehr erfahren
              </Link>
            </p>
          </div>
        </section>

        {/* Legendäre Momente */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-gray-900">
              Legendäre Endspiele
            </h2>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4 text-gray-700 leading-relaxed">
            <p>
              <strong>2022: Argentinien 3:3 Frankreich (4:2 i.E.)</strong> — Von vielen als das
              größte Finale der Geschichte angesehen. Messi eröffnet per Elfmeter,
              Di María erhöht. Mbappé schafft das Unmögliche mit einem Doppelpack in 97 Sekunden
              zum 2:2-Ausgleich. Messi trifft in der Verlängerung, Mbappé antwortet erneut per Elfmeter
              zum Hattrick. Argentinien gewinnt im Elfmeterschießen. Messis Krönung.
            </p>
            <p>
              <strong>1998: Frankreich 3:0 Brasilien</strong> — Im Stade de France dominieren Zidanes
              Bleus Ronaldos Brasilien in einem Finale, das vom Mysterium um den Schwächeanfall
              des Fenomeno vor dem Spiel geprägt ist. Zidane erzielt einen Doppelpack per Kopf, Petit
              macht in der Nachspielzeit den Deckel drauf. Frankreich holt seinen ersten Stern.
            </p>
            <p>
              <strong>1970: Brasilien 4:1 Italien</strong> — Brasiliens Pelé, Jairzinho, Tostão und
              Carlos Alberto liefern vielleicht die vollkommenste Mannschaftsleistung in der Geschichte
              des Fußballs. Carlos Albertos Tor gegen Ende des Spiels, am Ende einer
              perfekten Kombination, bleibt einer der schönsten Momente des Sports.
            </p>
            <p>
              Wird das Finale 2026 ein neues Kapitel in dieser ruhmreichen Geschichte schreiben?
              Mit dem neuen Format mit 48 Mannschaften und einem längeren Turnier werden die Finalisten
              nach 7 intensiven Spielen im MetLife Stadium ankommen. Erschöpfung, Druck und die Magie
              des Augenblicks werden den Rest erledigen.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="rounded-xl bg-primary p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-white mb-3">
              Wer hebt den Pokal am 19. Juli?
            </h2>
            <p className="text-gray-300 max-w-xl mx-auto mb-6">
              Simulieren Sie das gesamte Turnier und entdecken Sie Ihren Finalisten
              mit unserem interaktiven Simulator.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/simulateur"
                className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-accent/90 transition-colors"
              >
                Turnier simulieren
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/prognose/sieger"
                className="inline-flex items-center gap-2 bg-white/10 text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-white/20 transition-colors"
              >
                Prognosen anzeigen
              </Link>
            </div>
          </div>
        </section>

        <FAQSection items={faqItems} />
      </div>
    </>
  );
}
