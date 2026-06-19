import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { Trophy, Calendar, MapPin, TrendingUp, History, Star, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Finale WM 2026 - MetLife Stadium, 19 juillet | CDM 2026",
  description:
    "La finale de la CDM 2026 au MetLife Stadium (New York) le 19 juillet 2026. Historique des finales, pronostics, cotes, et tout ce qu'il faut savoir sur le match ultime.",
  openGraph: {
    title: "Finale CDM 2026 - MetLife Stadium, New York",
    description:
      "Tout sur la finale de la WM 2026 : date, stade, historique, pronostics et cotes.",
    url: "https://www.wm2026guide.de/finale",
  },
  alternates: { canonical: "https://www.wm2026guide.de/finale" },
};

const finalesHistorique = [
  { annee: "2022", lieu: "Lusail (Qatar)", affiche: "Argentine 3-3 France (4-2 t.a.b.)", vainqueur: "🇦🇷 Argentine" },
  { annee: "2018", lieu: "Moscou (Russie)", affiche: "France 4-2 Croatie", vainqueur: "🇫🇷 France" },
  { annee: "2014", lieu: "Rio de Janeiro (Brésil)", affiche: "Allemagne 1-0 Argentine (a.p.)", vainqueur: "🇩🇪 Allemagne" },
  { annee: "2010", lieu: "Johannesburg (Afrique du Sud)", affiche: "Espagne 1-0 Pays-Bas (a.p.)", vainqueur: "🇪🇸 Espagne" },
  { annee: "2006", lieu: "Berlin (Allemagne)", affiche: "Italie 1-1 France (5-3 t.a.b.)", vainqueur: "🇮🇹 Italie" },
  { annee: "2002", lieu: "Yokohama (Japon)", affiche: "Brésil 2-0 Allemagne", vainqueur: "🇧🇷 Brésil" },
  { annee: "1998", lieu: "Saint-Denis (France)", affiche: "France 3-0 Brésil", vainqueur: "🇫🇷 France" },
  { annee: "1994", lieu: "Pasadena (États-Unis)", affiche: "Brésil 0-0 Italie (3-2 t.a.b.)", vainqueur: "🇧🇷 Brésil" },
];

const faqItems = [
  {
    question: "Quand et où se joue la finale de la CDM 2026 ?",
    answer:
      "La finale de la WM 2026 se jouera le 19 juillet 2026 au MetLife Stadium d'East Rutherford, New Jersey (région de New York). Le coup d'envoi est prévu à 16h00 heure locale (22h00 heure de Paris).",
  },
  {
    question: "Combien de places compte le MetLife Stadium ?",
    answer:
      "Le MetLife Stadium a une capacité de 82 500 places en configuration football. Pour la finale de la CDM 2026, la FIFA pourrait ajuster la configuration pour atteindre environ 80 000 places avec les installations médias et VIP.",
  },
  {
    question: "Combien coûtent les billets pour la finale ?",
    answer:
      "Les prix des billets pour la finale CDM 2026 ne sont pas encore officiellement annoncés. Pour référence, les billets de la finale 2022 au Qatar allaient de 604$ (catégorie 3) à 1 607$ (catégorie 1). On peut s'attendre à des tarifs similaires ou supérieurs pour 2026.",
  },
  {
    question: "Quelle est la dernière finale de WM jouée aux États-Unis ?",
    answer:
      "La dernière finale aux États-Unis remonte à 1994, au Rose Bowl de Pasadena (Californie). Le Brésil avait battu l'Italie aux tirs au but (3-2 après un 0-0). En 2026, la finale se déroulera cette fois sur la côte Est, au MetLife Stadium.",
  },
  {
    question: "Quels sont les favoris pour la finale 2026 ?",
    answer:
      "Les principaux favoris selon les bookmakers sont le Brésil (cote ~5.50), l'Argentine (cote ~6.00), la France (cote ~6.50), l'Angleterre (cote ~7.00), l'Espagne (cote ~8.00) et l'Allemagne (cote ~10.00). Les cotes évoluent au fil du tournoi.",
  },
  {
    question: "Comment regarder la finale en France ?",
    answer:
      "La finale sera diffusée en clair sur M6 et en streaming sur M6+. beIN Sports propose également la retransmission pour ses abonnés. Le coup d'envoi à 22h heure de Paris est un créneau idéal pour le public français.",
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
              Le match ultime
            </span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-5xl lg:text-6xl mb-4">
            <span className="text-accent">La Finale</span> de la WM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto mb-6">
            MetLife Stadium, New York — 19 juillet 2026.
            Le plus grand match du football mondial.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { val: "19 juillet", label: "Date" },
              { val: "82 500", label: "Places" },
              { val: "22h00", label: "Heure de Paris" },
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
        {/* Le MetLife Stadium */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-gray-900">
              Le MetLife Stadium : l&apos;écrin de la finale
            </h2>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4 text-gray-700 leading-relaxed">
            <p>
              Situé à East Rutherford, dans le New Jersey, à quelques kilomètres de Manhattan,
              le MetLife Stadium est l&apos;un des plus grands stades des États-Unis. Inauguré en
              2010, il accueille habituellement les New York Giants et les New York Jets de la NFL.
            </p>
            <p>
              Avec ses 82 500 places, c&apos;est le stade le plus capacitaire de la NFL.
              Pour la WM 2026, il accueillera plusieurs matchs de phase de groupes,
              un huitième de finale, une demi-finale et bien sûr la grande finale le 19 juillet.
            </p>
            <p>
              Le stade est facilement accessible depuis Manhattan via le NJ Transit (gare de
              Secaucus Junction puis navette). Des services de transport spéciaux seront mis en
              place par la FIFA les jours de match. La proximité avec New York offre un cadre
              exceptionnel pour l&apos;événement le plus regardé au monde.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              {[
                { val: "82 500", label: "Capacité" },
                { val: "2010", label: "Inauguration" },
                { val: "1,7 Md$", label: "Coût construction" },
                { val: "Ouvert", label: "Toit" },
              ].map((s) => (
                <div key={s.label} className="rounded-lg bg-gray-50 p-3 text-center">
                  <p className="text-lg font-bold text-primary">{s.val}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Retour aux USA */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Star className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-gray-900">
              La finale revient aux États-Unis après 32 ans
            </h2>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4 text-gray-700 leading-relaxed">
            <p>
              La dernière fois qu&apos;une finale de WM s&apos;est jouée sur le sol
              américain, c&apos;était le 17 juillet 1994 au Rose Bowl de Pasadena. Ce jour-là,
              le Brésil de Romário battait l&apos;Italie de Roberto Baggio aux tirs au but
              après un match sans but — le premier 0-0 en finale de l&apos;histoire.
            </p>
            <p>
              En 2026, le contexte est radicalement différent. Le football (soccer) a explosé
              aux États-Unis avec la MLS, l&apos;arrivée de stars internationales comme Messi
              à l&apos;Inter Miami, et une équipe nationale ambitieuse. L&apos;engouement pour
              cette WM devrait être sans précédent dans le pays.
            </p>
            <p>
              Le choix de New York (métropole mondiale par excellence) pour la finale est un
              symbole fort. Avec un coup d&apos;envoi à 16h00 heure locale, le match sera
              diffusé en prime time en Europe (22h00 à Paris, 21h00 à Londres) — un choix
              stratégique pour maximiser l&apos;audience mondiale.
            </p>
          </div>
        </section>

        {/* Historique des finales */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <History className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-gray-900">
              Historique des finales de WM
            </h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Année</th>
                  <th className="px-4 py-3 text-left">Lieu</th>
                  <th className="px-4 py-3 text-left">Affiche</th>
                  <th className="px-4 py-3 text-left">Vainqueur</th>
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
            Le Brésil détient le record avec 5 titres (1958, 1962, 1970, 1994, 2002),
            suivi de l&apos;Allemagne et l&apos;Italie (4 chacun), puis l&apos;Argentine (3)
            et la France (2).
          </p>
        </section>

        {/* Prognoses */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-gray-900">
              Prognoses et cotes pour la finale
            </h2>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4 text-gray-700 leading-relaxed">
            <p>
              Il est encore tôt pour prédire les finalistes, mais les bookmakers ont déjà
              leurs favoris pour le titre. L&apos;Argentine de Messi (si le capitaine est
              présent pour sa dernière danse) et le Brésil, en quête de rachat après 2022,
              sont en tête des cotes sur la plupart des plateformes.
            </p>
            <p>
              La France, double championne du monde (1998, 2018) et finaliste en 2022,
              fait partie des sérieux prétendants. L&apos;Angleterre de Bellingham et Saka,
              l&apos;Espagne de Yamal et Pedri, et l&apos;Allemagne à domicile (en tant que
              co-favoris avec le soutien du public nord-américain) complètent le tableau des
              candidats crédibles.
            </p>

            <div className="overflow-x-auto rounded-lg border border-gray-200 mt-4">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-600">Équipe</th>
                    <th className="px-4 py-2 text-left text-gray-600">Cote indicative</th>
                    <th className="px-4 py-2 text-left text-gray-600">Probabilité implicite</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {[
                    { equipe: "🇧🇷 Brésil", cote: "5.50", prob: "~18%" },
                    { equipe: "🇦🇷 Argentine", cote: "6.00", prob: "~17%" },
                    { equipe: "🇫🇷 France", cote: "6.50", prob: "~15%" },
                    { equipe: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Angleterre", cote: "7.00", prob: "~14%" },
                    { equipe: "🇪🇸 Espagne", cote: "8.00", prob: "~13%" },
                    { equipe: "🇩🇪 Allemagne", cote: "10.00", prob: "~10%" },
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
              Cotes indicatives à titre informatif. Les paris sportifs comportent des risques.
              Jouez de manière responsable. 18+.
              {" "}
              <Link href="/verantwortungsvolles-spielen" className="underline hover:text-primary">
                En savoir plus
              </Link>
            </p>
          </div>
        </section>

        {/* Moments légendaires */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-gray-900">
              Les finales légendaires
            </h2>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4 text-gray-700 leading-relaxed">
            <p>
              <strong>2022 : Argentine 3-3 France (4-2 t.a.b.)</strong> — Considérée par beaucoup
              comme la plus grande finale de l&apos;histoire. Messi ouvre le score sur penalty,
              Di María double la mise. Mbappé réalise l&apos;impossible avec un doublé en 97 secondes
              pour égaliser à 2-2. Messi marque en prolongation, Mbappé répond encore sur penalty
              pour le hat-trick. L&apos;Argentine l&apos;emporte aux tirs au but. Le sacre de Messi.
            </p>
            <p>
              <strong>1998 : France 3-0 Brésil</strong> — Au Stade de France, les Bleus de Zidane
              écrasent le Brésil de Ronaldo dans une finale marquée par le mystère autour du malaise
              du Fenomeno avant le match. Zidane inscrit un doublé de la tête, Petit clôt le festival
              dans les arrêts de jeu. La France remporte sa première étoile.
            </p>
            <p>
              <strong>1970 : Brésil 4-1 Italie</strong> — Le Brésil de Pelé, Jairzinho, Tostão et
              Carlos Alberto signe peut-être la performance collective la plus aboutie de l&apos;histoire
              du football. Le but de Carlos Alberto en fin de match, au bout d&apos;une action
              collective parfaite, reste l&apos;un des plus beaux gestes du jeu.
            </p>
            <p>
              La finale 2026 écrira-t-elle un nouveau chapitre dans cette histoire glorieuse ?
              Avec le nouveau format à 48 équipes et un tournoi plus long, les finalistes arriveront
              au MetLife Stadium après 7 matchs intenses. La fatigue, la pression et la magie
              du moment feront le reste.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="rounded-xl bg-primary p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-white mb-3">
              Qui soulèvera le trophée le 19 juillet ?
            </h2>
            <p className="text-gray-300 max-w-xl mx-auto mb-6">
              Simulez l&apos;intégralité du tournoi et découvrez votre finaliste
              avec notre simulateur interactif.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/simulateur"
                className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-accent/90 transition-colors"
              >
                Simuler le tournoi
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/prognose/vainqueur"
                className="inline-flex items-center gap-2 bg-white/10 text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-white/20 transition-colors"
              >
                Voir les pronostics
              </Link>
            </div>
          </div>
        </section>

        <FAQSection items={faqItems} />
      </div>
    </>
  );
}
