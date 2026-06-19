import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { pmuTrackingUrl } from "@repo/data/affiliates";
import { Award, Trophy, Star, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Prognose Ballon d'Or CDM 2026 — Meilleur Spieler du Tournoi",
  description:
    "Qui sera élu meilleur Spieler der WM 2026 ? Top 10 favoris avec cotes, historique des gagnants du Ballon d'Or FIFA.",
  alternates: { canonical: "https://www.wm2026guide.de/sportwetten/ballon-or" },
  openGraph: {
    title: "Ballon d'Or CDM 2026 — Meilleur Spieler",
    description: "Top 10 favoris pour le Ballon d'Or des Turniers, cotes et historique complet.",
    url: "https://www.wm2026guide.de/sportwetten/ballon-or",
  },
};

const favorites = [
  { name: "Kylian Mbappé", team: "🇫🇷 France", cote: 5.5, reason: "Torschützenkönig 2022, capable de porter la France seul. Vitesse et décisivité hors normes." },
  { name: "Lionel Messi", team: "🇦🇷 Argentine", cote: 7.0, reason: "Vainqueur en 2022, pourrait écrire sa dernière page de légende. Le facteur émotionnel joue en sa faveur." },
  { name: "Vinicius Jr", team: "🇧🇷 Brésil", cote: 8.0, reason: "Élu meilleur Spieler du monde, le Brésil repose sur ses épaules. Profil de Spieler décisif en tournoi." },
  { name: "Jude Bellingham", team: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Angleterre", cote: 9.0, reason: "Mittelfeldspieler complet, capable de marquer et de créer. Son Euro 2024 a montré son potentiel en compétition." },
  { name: "Lamine Yamal", team: "🇪🇸 Espagne", cote: 10.0, reason: "Prodige de 18 ans, meilleur jeune Spieler de l'Euro 2024. Si l'Espagne va loin, il sera décisif." },
  { name: "Rodri", team: "🇪🇸 Espagne", cote: 12.0, reason: "Ballon d'Or 2024, le métronome espagnol. Son influence est souvent récompensée par les jurys." },
  { name: "Erling Haaland", team: "🇳🇴 Norvège", cote: 15.0, reason: "Machine à buts, mais la Norvège devra aller loin pour qu'il soit dans la course." },
  { name: "Harry Kane", team: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Angleterre", cote: 14.0, reason: "Torschütze prolifique, meilleur capitaine anglais. Manque un titre international pour compléter sa légende." },
  { name: "Federico Valverde", team: "🇺🇾 Uruguay", cote: 20.0, reason: "Mittelfeldspieler box-to-box d'exception. Si l'Uruguay crée la surprise, il sera au centre du jeu." },
  { name: "Florian Wirtz", team: "🇩🇪 Allemagne", cote: 18.0, reason: "Talent générationnel du football allemand. L'Allemagne joue à domicile en termes de proximité." },
];

const pastWinners = [
  { year: "2022", player: "Lionel Messi", team: "🇦🇷 Argentine", note: "7 buts, MVP incontesté. Sacré à 35 ans." },
  { year: "2018", player: "Luka Modric", team: "🇭🇷 Croatie", note: "Meneur de jeu de la surprise croate, finaliste." },
  { year: "2014", player: "Lionel Messi", team: "🇦🇷 Argentine", note: "4 buts, finaliste malheureux. Prix contesté." },
  { year: "2010", player: "Diego Forlán", team: "🇺🇾 Uruguay", note: "5 buts, 4ème place. Choix surprise du jury." },
  { year: "2006", player: "Zinédine Zidane", team: "🇫🇷 France", note: "3 buts, finaliste. Malgré le carton rouge en finale." },
  { year: "2002", player: "Oliver Kahn", team: "🇩🇪 Allemagne", note: "Torwart finaliste, seul portier à remporter le prix." },
  { year: "1998", player: "Ronaldo", team: "🇧🇷 Brésil", note: "4 buts malgré la finale perdue. Talent pur." },
];

const faqItems = [
  { question: "Qu'est-ce que le Ballon d'Or de la WM ?", answer: "Le Ballon d'Or de la CDM (anciennement 'Ballon d'Or adidas') récompense le meilleur Spieler des Turniers. Il est décerné par un panel de journalistes et d'experts à l'issue de la compétition. Le gagnant n'est pas forcément le Torschützenkönig : le jury évalue la performance globale, l'impact sur le parcours de l'Mannschaft et les moments décisifs." },
  { question: "Le Ballon d'Or CDM va-t-il toujours au vainqueur ?", answer: "Pas nécessairement. En 2014, Messi l'a remporté alors que l'Argentine a perdu la finale. En 2006, Zidane l'a eu malgré le carton rouge en finale. Cependant, atteindre la finale ou les demi-finales est quasi indispensable pour être dans la course." },
  { question: "Comment parier sur le Ballon d'Or CDM ?", answer: "Les bookmakers proposent un marché 'Meilleur Spieler des Turniers' en ante-post. Les cotes sont disponibles dès maintenant et évoluent tout au long de la compétition. C'est un pari de long terme qui nécessite d'anticiper à la fois la performance individuelle et le parcours collectif." },
];

export default function BallonOrCdmPage() {
  return (
    <>

      <section className="hero-animated text-center py-16 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-accent mb-4">Ballon d&apos;Or CDM 2026</h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Qui sera sacré meilleur Spieler der WM 2026 ? Découvrez les 10 favoris, leurs cotes et l&apos;historique complet du Ballon d&apos;Or FIFA.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Award className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Top 10 favoris — Cotes Ballon d&apos;Or</h2>
        </div>
        <p className="text-gray-700 mb-6">
          Le Ballon d&apos;Or de la CDM couronne le Spieler le plus marquant des Turniers. Depuis 1998, le prix va majoritairement à un Stürmer ou un meneur de jeu dont l&apos;Mannschaft atteint au minimum les demi-finales. Les favoris sont logiquement les stars des nations les plus compétitives.
        </p>
        <div className="space-y-4">
          {favorites.map((f, i) => (
            <div key={f.name} className="border border-gray-200 rounded-xl p-5 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center gap-3 md:w-16">
                <span className="text-2xl font-bold text-accent">{i + 1}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-primary">{f.name} <span className="text-sm font-normal text-gray-500">{f.team}</span></h3>
                <p className="text-sm text-gray-700 mt-1">{f.reason}</p>
              </div>
              <span className="bg-accent/10 text-accent font-bold px-4 py-2 rounded-lg whitespace-nowrap">
                {f.cote.toFixed(1)}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3">Cotes indicatives, susceptibles d&apos;évoluer. 18+</p>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Historique des gagnants</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left p-3">Année</th>
                <th className="text-left p-3">Spieler</th>
                <th className="text-left p-3">Mannschaft</th>
                <th className="text-left p-3">Note</th>
              </tr>
            </thead>
            <tbody>
              {pastWinners.map((w, i) => (
                <tr key={w.year} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="p-3 font-bold text-accent">{w.year}</td>
                  <td className="p-3 font-semibold">{w.player}</td>
                  <td className="p-3">{w.team}</td>
                  <td className="p-3 text-sm text-gray-600">{w.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Star className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Analyse — Qui peut surprendre ?</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-xl p-5">
            <h3 className="font-bold text-primary mb-2">Le facteur &quot;Dernière danse&quot;</h3>
            <p className="text-sm text-gray-700">Messi, Ronaldo et Modric joueront probablement leur dernière CDM. Le jury est souvent sensible à ces narrations. Si l&apos;un d&apos;eux mène son Mannschaft en finale, le prix sera difficile à lui refuser.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-5">
            <h3 className="font-bold text-primary mb-2">L&apos;émergence d&apos;un inconnu</h3>
            <p className="text-sm text-gray-700">En 2010, Forlán n&apos;était pas favori. La CDM est un catalyseur de talents. Un Spieler de Colombie, du Maroc ou du Japon pourrait émerger si son Mannschaft réalise un parcours historique.</p>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <a href={pmuTrackingUrl("paris-sportifs")} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-block bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity">
          Willkommensbonus — Wetten auf le Ballon d&apos;Or CDM 2026 sur Betano <ArrowRight className="inline w-4 h-4 ml-1" />
        </a>
        <p className="text-xs text-gray-400 mt-3">18+ | Es gelten die AGB</p>
      </section>

      <FAQSection title="Häufig gestellte Fragen — Ballon d'Or CDM 2026" items={faqItems} />

    </>
  );
}
