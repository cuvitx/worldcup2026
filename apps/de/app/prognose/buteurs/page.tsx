import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { pmuTrackingUrl } from "@repo/data/affiliates";
import { Target, TrendingUp, Star, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Prognose Meilleur Buteur CDM 2026 — Top 15 Favoris & Cotes PMU Sport",
  description:
    "Qui sera le meilleur buteur de la WM 2026 ? Mbappé, Haaland, Vinicius Jr : cotes PMU Sport + stats et dark horses.",
  alternates: { canonical: "https://www.wm2026guide.de/prognose/torschuetzen" },
  openGraph: {
    title: "Prognose Meilleur Buteur CDM 2026",
    description: "Top 15 favoris, cotes PMU Sport et dark horses pour le Soulier d'Or 2026.",
    url: "https://www.wm2026guide.de/prognose/torschuetzen",
  },
};

const topScorers = [
  { name: "Kylian Mbappé", team: "🇫🇷 France", pmusport: 6.5, selGoals: 48, wcGoals: 4 },
  { name: "Erling Haaland", team: "🇳🇴 Norvège", pmusport: 7.0, selGoals: 35, wcGoals: 0 },
  { name: "Vinicius Jr", team: "🇧🇷 Brésil", pmusport: 9.0, selGoals: 6, wcGoals: 0 },
  { name: "Harry Kane", team: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Angleterre", pmusport: 8.0, selGoals: 68, wcGoals: 6 },
  { name: "Lamine Yamal", team: "🇪🇸 Espagne", pmusport: 12.0, selGoals: 5, wcGoals: 0 },
  { name: "Lionel Messi", team: "🇦🇷 Argentine", pmusport: 15.0, selGoals: 109, wcGoals: 13 },
  { name: "Robert Lewandowski", team: "🇵🇱 Pologne", pmusport: 17.0, selGoals: 84, wcGoals: 2 },
  { name: "Jude Bellingham", team: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Angleterre", pmusport: 15.0, selGoals: 6, wcGoals: 0 },
  { name: "Mohamed Salah", team: "🇪🇬 Égypte", pmusport: 25.0, selGoals: 55, wcGoals: 2 },
  { name: "Victor Osimhen", team: "🇳🇬 Nigeria", pmusport: 20.0, selGoals: 22, wcGoals: 0 },
  { name: "Alexander Isak", team: "🇸🇪 Suède", pmusport: 22.0, selGoals: 14, wcGoals: 0 },
  { name: "Julián Álvarez", team: "🇦🇷 Argentine", pmusport: 18.0, selGoals: 9, wcGoals: 1 },
  { name: "Bukayo Saka", team: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Angleterre", pmusport: 20.0, selGoals: 12, wcGoals: 0 },
  { name: "Álvaro Morata", team: "🇪🇸 Espagne", pmusport: 25.0, selGoals: 36, wcGoals: 3 },
  { name: "Richarlison", team: "🇧🇷 Brésil", pmusport: 25.0, selGoals: 20, wcGoals: 3 },
];

const darkHorses = [
  { name: "Dusan Vlahovic", team: "🇷🇸 Serbie", cote: 40.0, reason: "Buteur prolifique en Serie A, la Serbie est dans un groupe jouable." },
  { name: "Cody Gakpo", team: "🇳🇱 Pays-Bas", cote: 30.0, reason: "3 buts en CDM 2022, profil de tournoi. Forme montante avec Liverpool." },
  { name: "Marcus Thuram", team: "🇫🇷 France", cote: 35.0, reason: "Saison exceptionnelle avec l'Inter, option offensive n°2 des Bleus." },
  { name: "Lautaro Martínez", team: "🇦🇷 Argentine", cote: 20.0, reason: "Meilleur buteur de la Copa América 2024, soutenu par le système argentin." },
];

const youngScorers = [
  { name: "Lamine Yamal", team: "🇪🇸 Espagne", age: 18, cote: 11.0 },
  { name: "Endrick", team: "🇧🇷 Brésil", age: 19, cote: 30.0 },
  { name: "Mathys Tel", team: "🇫🇷 France", age: 20, cote: 50.0 },
  { name: "Alejandro Garnacho", team: "🇦🇷 Argentine", age: 21, cote: 45.0 },
];

const faqItems = [
  { question: "Qui est le favori pour le Soulier d'Or CDM 2026 ?", answer: "Kylian Mbappé et Erling Haaland se partagent le statut de favori avec des cotes entre 6.0 et 7.5 selon les bookmakers. Mbappé a l'avantage de l'expérience en WM (4 buts en 2022, 1 en 2018)." },
  { question: "Combien de buts marque en moyenne le meilleur buteur d'une CDM ?", answer: "Depuis 1998, le meilleur buteur d'une WM inscrit en moyenne 6 buts. Le record est de 6 buts partagé par plusieurs joueurs. Avec le format 48 équipes et plus de matchs, ce nombre pourrait augmenter en 2026." },
  { question: "Le meilleur buteur vient-il toujours d'une grande nation ?", answer: "Pas nécessairement. James Rodríguez (Colombie) a été Soulier d'Or en 2014. En 2022, Mbappé (France) a terminé meilleur buteur alors que la France a perdu la finale. L'équipe finaliste fournit souvent le meilleur buteur." },
  { question: "Comment parier sur le meilleur buteur CDM 2026 ?", answer: "Les paris sur le meilleur buteur sont disponibles en ante-post chez PMU Sport, bookmaker agréé ANJ. Vous pouvez parier dès maintenant à des cotes avantageuses. Vérifiez les cotes sur PMU Sport avant de placer votre mise." },
];

export default function PrognoseTorschützenPage() {
  return (
    <>

      {/* Hero */}
      <section className="hero-animated text-center py-16 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-accent mb-4">
          Prognose Meilleur Buteur CDM 2026
        </h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Qui remportera le Soulier d&apos;Or ? Comparez les cotes des 15 favoris et identifiez les value bets pour le titre de meilleur buteur de la WM 2026.
        </p>
      </section>

      {/* Introduction */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Le Soulier d&apos;Or en jeu</h2>
        </div>
        <p className="text-gray-700 leading-relaxed mb-4">
          Le titre de meilleur buteur de la WM est l&apos;un des paris les plus populaires du tournoi. Avec le passage à 48 équipes et davantage de matchs, les attaquants auront plus d&apos;opportunités de briller. Le format élargi augmente le nombre de rencontres, ce qui pourrait favoriser les buteurs des grandes nations qualifiées loin en phase finale.
        </p>
        <p className="text-gray-700 leading-relaxed">
          En 2022, Kylian Mbappé avait terminé meilleur buteur avec 8 buts, dont un triplé historique en finale. L&apos;histoire montre que le Soulier d&apos;Or revient souvent à un joueur dont l&apos;équipe atteint au minimum les demi-finales.
        </p>
      </section>

      {/* Top 15 Table */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Top 15 des favoris — Cotes PMU Sport</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left p-3">#</th>
                <th className="text-left p-3">Spieler</th>
                <th className="text-left p-3">Équipe</th>
                <th className="text-center p-3">PMU Sport</th>
                <th className="text-center p-3">Buts sélection</th>
                <th className="text-center p-3">Buts CDM</th>
              </tr>
            </thead>
            <tbody>
              {topScorers.map((p, i) => (
                <tr key={p.name} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="p-3 font-bold text-accent">{i + 1}</td>
                  <td className="p-3 font-semibold">{p.name}</td>
                  <td className="p-3">{p.team}</td>
                  <td className="text-center p-3">{p.pmusport.toFixed(1)}</td>
                  <td className="text-center p-3">{p.selGoals}</td>
                  <td className="text-center p-3">{p.wcGoals}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">Cotes indicatives, susceptibles d&apos;évoluer. Vérifiez sur le site du bookmaker avant de parier. 18+</p>
      </section>

      {/* Dark Horses */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Star className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Dark Horses Torschützen</h2>
        </div>
        <p className="text-gray-700 mb-6">
          Ces joueurs ne sont pas les favoris des bookmakers, mais leur profil et leur situation pourraient créer la surprise. Des cotes élevées pour une value potentielle intéressante.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {darkHorses.map((p) => (
            <div key={p.name} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-primary">{p.name}</h3>
                  <span className="text-sm text-gray-600">{p.team}</span>
                </div>
                <span className="bg-accent/10 text-accent font-bold px-3 py-1 rounded-lg text-sm">
                  {p.cote.toFixed(1)}
                </span>
              </div>
              <p className="text-sm text-gray-700">{p.reason}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Young Scorers */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-6">Meilleur jeune buteur — La relève</h2>
        <p className="text-gray-700 mb-6">
          La WM est souvent le théâtre de l&apos;éclosion de jeunes talents. Pelé avait 17 ans lors de son premier Mondial. Qui sera la révélation offensive de 2026 ?
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {youngScorers.map((p) => (
            <div key={p.name} className="bg-primary/5 rounded-xl p-5 text-center">
              <h3 className="font-bold text-primary">{p.name}</h3>
              <p className="text-sm text-gray-600">{p.team}</p>
              <p className="text-xs text-gray-500 mt-1">{p.age} ans en 2026</p>
              <p className="text-accent font-bold mt-2">Cote : {p.cote.toFixed(1)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <a
          href={pmuTrackingUrl("prono-buteurs")}
          target="_blank"
          rel="noopener noreferrer sponsored nofollow"
          className="inline-block bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity"
        >
          100€ offerts — Parier sur le meilleur buteur CDM 2026 <ArrowRight className="inline w-4 h-4 ml-1" />
        </a>
        <p className="text-xs text-gray-400 mt-3">18+ | Offre soumise à conditions</p>
      </section>

      {/* FAQ */}
      <FAQSection title="Questions fréquentes — Meilleur buteur CDM 2026" items={faqItems} />

      {/* ANJ */}
    </>
  );
}
