import { getStaticAlternates } from "@repo/data/route-mapping";
import { FAQSection } from "@repo/ui/faq-section";
import { RelatedLinks } from "../components/RelatedLinks";
import type { Metadata } from "next";
import Link from "next/link";
import { players } from "@repo/data/players";
import { teams, teamsById } from "@repo/data/teams";
export const metadata: Metadata = {
  title: "Joueurs de la Coupe du Monde 2026 : listes par équipe et effectifs",
  description:
    "Tous les joueurs de la Coupe du Monde 2026 : listes par équipe, effectifs, clubs, sélections, buts, favoris, cotes buteurs et joueurs clés à suivre.",
  alternates: getStaticAlternates("players", "fr"),
  openGraph: {
    title: "Joueurs de la Coupe du Monde 2026 : listes et effectifs",
    description: "Stats, clubs, sélections et joueurs clés des 48 équipes de la CDM 2026.",
  },
};

export default function PlayersPage() {
  const faqItems = [
    {
      question: "Combien de joueurs composent une équipe pour la Coupe du Monde ?",
      answer: "Chaque équipe peut convoquer 26 joueurs pour la Coupe du Monde 2026 (contre 23 auparavant). Cette règle a été adoptée par la FIFA en 2022 pour permettre plus de rotation et gérer les blessures. Parmi ces 26 joueurs, 3 doivent obligatoirement être gardiens de but. Le sélectionneur peut faire appel à tous les joueurs de la liste selon les besoins tactiques et la forme physique."
    },
    {
      question: "Qui sont les favoris pour le Ballon d'Or de la CDM 2026 ?",
      answer: "Les principaux candidats au Ballon d'Or de la Coupe du Monde 2026 sont Kylian Mbappé (France, déjà Ballon d'Or 2022), Erling Haaland (Norvège), Vinícius Júnior (Brésil), Jude Bellingham (Angleterre) et Lamine Yamal (Espagne). Mbappé est le grand favori grce à son statut de meilleur joueur du monde, ses 12 buts en CDM et la force de l'équipe de France. Le Ballon d'Or est attribué au meilleur joueur du tournoi, indépendamment du vainqueur final."
    },
    {
      question: "Quel joueur a marqué le plus de buts en sélection ?",
      answer: "Cristiano Ronaldo (Portugal) détient le record absolu avec 130 buts en sélection en 212 matchs. Il devance Lionel Messi (Argentine, 106 buts), Ali Daei (Iran, 109 buts) et Sunil Chhetri (Inde, 94 buts). En France, Olivier Giroud est le meilleur buteur de l'histoire avec 57 buts, devançant Thierry Henry (51 buts) et Antoine Griezmann (44 buts). Kylian Mbappé (48 buts à 25 ans) devrait devenir le meilleur buteur français d'ici 2026."
    },
    {
      question: "Quels sont les joueurs les plus chers de la CDM 2026 ?",
      answer: "Les joueurs les plus chers en valeur marchande pour la CDM 2026 sont : Kylian Mbappé (France, ~180M€), Erling Haaland (Norvège, ~175M€), Vinícius Júnior (Brésil, ~150M€), Jude Bellingham (Angleterre, ~150M€) et Jamal Musiala (Allemagne, ~130M€). Ces valorisations reflètent l'ge, le talent, les performances récentes et le potentiel commercial. Mbappé reste le joueur le plus bankable du monde."
    },
    {
      question: "Quel ge ont les joueurs de la CDM 2026 ?",
      answer: "L'ge moyen des joueurs en Coupe du Monde tourne généralement autour de 27-28 ans, soit le pic de performance physique et technique. Les plus jeunes ont 18-19 ans (comme Lamine Yamal, Espagne), tandis que les plus expérimentés peuvent aller jusqu'à 37-40 ans (comme Cristiano Ronaldo, s'il se qualifie). La FIFA n'impose aucune limite d'ge pour la CDM senior, contrairement aux JO qui ont une règle des -23 ans."
    },
    {
      question: "Combien de remplacements sont autorisés en Coupe du Monde ?",
      answer: "5 remplacements sont autorisés en Coupe du Monde 2026, sur un maximum de 3 fenêtres de remplacement (mi-temps non comptée). Cette règle, introduite pendant la COVID-19, a été maintenue par la FIFA pour préserver la santé des joueurs et permettre plus de rotation. En cas de prolongation, un 6e remplacement supplémentaire est autorisé. Les gardiens peuvent également être remplacés en cas de blessure, même si les 5 changements ont été effectués."
    },
    {
      question: "Quels joueurs suivre pour les paris buteur et tirs cadrés ?",
      answer: "Les profils les plus intéressants sont les attaquants titulaires, les tireurs de penalties, les joueurs qui frappent beaucoup et les leaders offensifs des favoris. Sur CDM2026, les fiches joueur renvoient vers les pages cote buteur, tirs cadrés, passes décisives et pronostics associés quand elles existent."
    },
    {
      question: "Comment utiliser cette page joueurs pour préparer un pronostic ?",
      answer: "Commencez par l'effectif de l'équipe, identifiez les joueurs clés, comparez leur expérience internationale, puis vérifiez le calendrier, les compositions probables et la cote champion de la sélection. Cette lecture évite de juger une cote uniquement sur le nom du pays."
    }
  ];

  const positionLabels: Record<string, string> = {
    GK: "Gardiens",
    DF: "Defenseurs",
    MF: "Milieux",
    FW: "Attaquants",
  };
  const positions = ["FW", "MF", "DF", "GK"] as const;
  const priorityTeams = [
    "espagne",
    "portugal",
    "bresil",
    "algerie",
    "france",
    "senegal",
    "maroc",
    "uruguay",
    "argentine",
    "colombie",
    "pays-bas",
    "allemagne",
  ]
    .flatMap((teamId) => {
      const team = teamsById[teamId];
      return team ? [team] : [];
    });
  const quickSearchLinks = [
    {
      href: "/effectif/espagne",
      label: "Joueurs Espagne",
      detail: "Effectif, clubs et cadres de la Roja",
    },
    {
      href: "/effectif/portugal",
      label: "Joueurs Portugal",
      detail: "Liste, composition probable et stars offensives",
    },
    {
      href: "/effectif/bresil",
      label: "Joueurs Brésil",
      detail: "Sélection, buteurs et profils à suivre",
    },
    {
      href: "/effectif/france",
      label: "Joueurs France",
      detail: "Cadres, jeunes et profondeur de banc",
    },
    {
      href: "/cote-buteur/mbappe",
      label: "Cotes buteurs",
      detail: "Marchés joueur et favoris pour marquer",
    },
    {
      href: "/tirs-cadres/mbappe",
      label: "Tirs cadrés",
      detail: "Profils qui frappent le plus au but",
    },
  ];
  const playersBySlug = Object.fromEntries(players.map((player) => [player.slug, player]));
  const featuredPlayerSlugs = [
    "mbappe",
    "haaland",
    "vinicius",
    "bellingham",
    "yamal",
    "messi",
    "kane",
    "jamal-musiala",
    "cristiano-ronaldo-dos-santos-aveiro",
  ];
  const featuredPlayers = featuredPlayerSlugs.flatMap((slug) => {
    const player = playersBySlug[slug];
    return player ? [player] : [];
  });
  const playerProfiles = [
    {
      title: "Buteurs naturels",
      description: "Attaquants, tireurs de penalties et joueurs avec volume de buts en sélection.",
      href: "/buteurs",
      players: [...players]
        .filter((player) => player.position === "FW")
        .sort((a, b) => b.goals - a.goals || b.caps - a.caps)
        .slice(0, 5),
    },
    {
      title: "Cadres expérimentés",
      description: "Joueurs avec beaucoup de sélections, utiles pour lire les matchs à pression.",
      href: "/comparateur-joueurs",
      players: [...players]
        .sort((a, b) => b.caps - a.caps || b.goals - a.goals)
        .slice(0, 5),
    },
    {
      title: "Jeunes à suivre",
      description: "Profils de moins de 23 ans pouvant faire bouger les cotes pendant le tournoi.",
      href: "/joueurs",
      players: [...players]
        .filter((player) => player.age <= 23)
        .sort((a, b) => b.goals - a.goals || b.caps - a.caps)
        .slice(0, 5),
    },
  ];

  return (
    <>
<section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">Effectifs</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">
            Joueurs Coupe du Monde 2026 : listes et effectifs
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {players.length} joueurs de la Coupe du Monde 2026 a suivre par equipe, poste, club, selections et buts.
            Comparez les effectifs avant les matchs et les pronostics du Mondial.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-8">
        <section className="rounded-xl border border-primary/15 bg-white p-5 shadow-sm sm:p-6">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                Recherches populaires
              </p>
              <h2 className="mt-1 text-2xl font-extrabold text-gray-900">
                Accès rapide aux joueurs les plus recherchés
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Les recherches autour des joueurs CDM 2026 portent surtout sur les
                listes par équipe, les compositions probables et les stars capables
                de peser sur les cotes. Commencez par l'effectif, puis ouvrez les
                marchés joueur ou la cote champion quand l'intention devient pari.
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-primary/5 p-3">
                  <p className="text-xl font-black text-primary">{players.length}</p>
                  <p className="text-[11px] font-semibold uppercase text-gray-500">joueurs</p>
                </div>
                <div className="rounded-lg bg-primary/5 p-3">
                  <p className="text-xl font-black text-primary">{teams.length}</p>
                  <p className="text-[11px] font-semibold uppercase text-gray-500">équipes</p>
                </div>
                <div className="rounded-lg bg-primary/5 p-3">
                  <p className="text-xl font-black text-primary">4</p>
                  <p className="text-[11px] font-semibold uppercase text-gray-500">postes</p>
                </div>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {quickSearchLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-4 transition-colors hover:border-primary/30 hover:bg-primary/5"
                >
                  <p className="font-bold text-gray-900">{item.label}</p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">{item.detail}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-3 rounded-lg border border-gray-200 bg-white p-5 shadow-sm sm:grid-cols-3 sm:p-6">
          <Link
            href="/effectif/france"
            className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-primary/30 hover:bg-primary/5"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-primary">Effectifs</p>
            <p className="mt-1 font-bold text-gray-900">Listes par selection</p>
            <p className="mt-1 text-sm text-gray-600">France, Portugal, Bresil, Espagne et toutes les equipes.</p>
          </Link>
          <Link
            href="/pronostic/vainqueur"
            className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-primary/30 hover:bg-primary/5"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-primary">Pronostic</p>
            <p className="mt-1 font-bold text-gray-900">Favoris du Mondial</p>
            <p className="mt-1 text-sm text-gray-600">Relier les joueurs cles aux chances de victoire finale.</p>
          </Link>
          <Link
            href="/cote-champion/france"
            className="rounded-lg border border-accent/30 bg-accent/5 p-4 transition-colors hover:border-accent"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-accent">Cotes</p>
            <p className="mt-1 font-bold text-gray-900">Cotes Coupe du Monde 2026</p>
            <p className="mt-1 text-sm text-gray-600">Comparer les favoris et les value bets avant de parier.</p>
          </Link>
        </section>

        <section className="rounded-lg border border-primary/20 bg-primary/5 p-5 sm:p-6 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-primary">
                Favoris et joueurs à suivre
              </p>
              <h2 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                Relier les stars aux chances de titre
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Les effectifs expliquent une grande partie des cotes du Mondial :
                profondeur du banc, buteurs, expérience et dynamique des cadres.
                Utilisez cette page comme point d'entree pour parcourir les listes
                de joueurs de la Coupe du Monde 2026, puis comparez les favoris
                et les cotes de vainqueur.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {[
                { href: "/cote-champion/france", label: "Cote France" },
                { href: "/cote-champion/portugal", label: "Cote Portugal" },
                { href: "/cote-champion/bresil", label: "Cote Brésil" },
                { href: "/cote-champion/espagne", label: "Cote Espagne" },
                { href: "/pronostic/vainqueur", label: "Pronostic vainqueur" },
                { href: "/tableau", label: "Tableau pronostic" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-primary/20 bg-white px-3 py-2 text-xs font-semibold text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 grid gap-4 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                Joueurs à suivre
              </p>
              <h2 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                Stars, buteurs et marchés joueur CDM 2026
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Les requêtes joueurs ne doivent pas rester de simples listes :
                elles doivent aider à trouver les profils qui peuvent peser sur
                un match, marquer, cadrer ou faire évoluer les cotes des favoris.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              <Link
                href="/cote-buteur/mbappe"
                className="rounded-full bg-accent px-3 py-2 text-xs font-bold text-black hover:brightness-95"
              >
                Cotes buteurs
              </Link>
              <Link
                href="/tirs-cadres/mbappe"
                className="rounded-full border border-primary/20 bg-white px-3 py-2 text-xs font-bold text-primary hover:border-primary"
              >
                Tirs cadrés
              </Link>
              <Link
                href="/comparateur-joueurs"
                className="rounded-full border border-primary/20 bg-white px-3 py-2 text-xs font-bold text-primary hover:border-primary"
              >
                Comparateur
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPlayers.map((player) => {
              const team = teamsById[player.teamId];
              return (
                <article key={player.id} className="rounded-lg border border-gray-200 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link href={`/joueur/${player.slug}`} className="font-bold text-gray-900 hover:text-primary">
                        {player.name}
                      </Link>
                      <p className="mt-1 text-xs text-gray-500">
                        <span role="img" aria-label={`Drapeau de ${team?.name ?? "Inconnu"}`}>{team?.flag}</span>{" "}
                        {team?.name} · {player.position} · {player.club}
                      </p>
                    </div>
                    <div className="shrink-0 rounded-lg bg-primary/5 px-2.5 py-1 text-right">
                      <p className="text-sm font-black text-primary">{player.goals}</p>
                      <p className="text-[10px] uppercase text-gray-500">buts</p>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px] font-semibold">
                    <Link href={`/joueur/${player.slug}`} className="rounded-md bg-gray-100 px-2 py-2 text-gray-700 hover:bg-primary hover:text-white">
                      Fiche
                    </Link>
                    <Link href={`/cote-buteur/${player.slug}`} className="rounded-md bg-accent/10 px-2 py-2 text-accent hover:bg-accent hover:text-black">
                      Buteur
                    </Link>
                    <Link href={`/tirs-cadres/${player.slug}`} className="rounded-md bg-gray-100 px-2 py-2 text-gray-700 hover:bg-primary hover:text-white">
                      Tirs
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          {playerProfiles.map((profile) => (
            <div key={profile.title} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{profile.title}</h2>
                  <p className="mt-1 text-sm leading-5 text-gray-600">{profile.description}</p>
                </div>
                <Link href={profile.href} className="shrink-0 text-sm font-bold text-primary hover:underline">
                  Voir →
                </Link>
              </div>
              <div className="mt-4 space-y-2">
                {profile.players.map((player) => {
                  const team = teamsById[player.teamId];
                  return (
                    <Link
                      key={`${profile.title}-${player.id}`}
                      href={`/joueur/${player.slug}`}
                      className="flex items-center justify-between gap-3 rounded-lg bg-gray-50 px-3 py-2 text-sm hover:bg-primary/5"
                    >
                      <span className="min-w-0 truncate font-semibold text-gray-900">
                        <span role="img" aria-label={`Drapeau de ${team?.name ?? "Inconnu"}`}>{team?.flag}</span>{" "}
                        {player.name}
                      </span>
                      <span className="shrink-0 text-xs text-gray-500">
                        {player.goals} buts · {player.caps} sel.
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
              Listes les plus consultées
            </p>
            <h2 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
              Effectifs Coupe du Monde 2026 à suivre en priorité
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Ces sélections concentrent les recherches autour des listes de joueurs,
              compositions probables et chances de titre. Accédez directement à
              l'effectif, puis comparez le pronostic et la cote vainqueur.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {priorityTeams.map((team) => (
              <div
                key={team.id}
                className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-primary/30 hover:bg-primary/5"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl" role="img" aria-label={`Drapeau de ${team.name}`}>
                    {team.flag}
                  </span>
                  <div className="min-w-0">
                    <Link
                      href={`/effectif/${team.slug}`}
                      className="font-bold text-gray-900 hover:text-primary"
                    >
                      Joueurs {team.name}
                    </Link>
                    <p className="text-xs text-gray-500">Groupe {team.group} · FIFA #{team.fifaRanking}</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                  <Link
                    href={`/effectif/${team.slug}`}
                    className="rounded-full bg-gray-100 px-3 py-1.5 text-gray-700 hover:bg-primary hover:text-white"
                  >
                    Effectif
                  </Link>
                  <Link
                    href={`/cote-champion/${team.slug}`}
                    className="rounded-full bg-accent/10 px-3 py-1.5 text-accent hover:bg-accent hover:text-black"
                  >
                    Cote champion
                  </Link>
                  <Link
                    href={`/pronostic/${team.slug}`}
                    className="rounded-full bg-gray-100 px-3 py-1.5 text-gray-700 hover:bg-primary hover:text-white"
                  >
                    Pronostic
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Annuaires */}
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Joueurs de la Coupe du Monde 2026 par equipe
          </h2>
          <p className="mb-4 max-w-3xl text-sm leading-6 text-gray-600">
            Retrouvez les joueurs selection par selection : cadres, buteurs,
            gardiens, clubs, experience internationale et liens vers les fiches
            equipes pour suivre le calendrier, le groupe et le parcours.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {teams.filter(t => players.some(p => p.teamId === t.id)).map((t) => (
              <Link key={t.slug} href={`/joueurs/equipe/${t.slug}`} className="flex items-center gap-2 p-2.5 rounded-lg border border-gray-200 hover:border-primary/30 hover:bg-primary/5 transition-colors text-sm font-medium text-gray-900">
                <span>{t.flag}</span> {t.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Top Scorers */}
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Meilleurs buteurs en sélection</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="pb-3 font-medium text-gray-500">Joueur</th>
                  <th className="pb-3 font-medium text-gray-500">Équipe</th>
                  <th className="pb-3 font-medium text-gray-500">Club</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">Buts</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">Sel.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[...players]
                  .sort((a, b) => b.goals - a.goals)
                  .slice(0, 20)
                  .map((player) => {
                    const team = teamsById[player.teamId];
                    return (
                      <tr key={player.id} className="hover:bg-gray-50">
                        <td className="py-3">
                          <Link href={`/joueur/${player.slug}`} className="font-medium hover:text-primary">
                            {player.name}
                          </Link>
                        </td>
                        <td className="py-3">
                          {team && (
                            <Link href={`/equipe/${team.slug}`} className="flex items-center gap-1 hover:text-primary">
                              <span role="img" aria-label={`Drapeau de ${team.name}`}>{team.flag}</span>
                              <span className="text-gray-600">{team.name}</span>
                            </Link>
                          )}
                        </td>
                        <td className="py-3 text-gray-500">{player.club}</td>
                        <td className="py-3 text-right font-bold text-primary">{player.goals}</td>
                        <td className="py-3 text-right text-gray-500">{player.caps}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </section>

        {/* By Position */}
        {positions.map((pos) => {
          const posPlayers = players
            .filter((p) => p.position === pos)
            .sort((a, b) => b.goals - a.goals || b.caps - a.caps);
          return (
            <section key={pos} className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{positionLabels[pos]} ({posPlayers.length})</h2>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {posPlayers.map((player) => {
                  const team = teamsById[player.teamId];
                  return (
                    <Link
                      key={player.id}
                      href={`/joueur/${player.slug}`}
                      className="flex items-center justify-between rounded-lg border border-gray-200 p-3 transition-colors hover:border-primary/30 hover:bg-primary/5"
                    >
                      <div>
                        <p className="font-semibold">{player.name}</p>
                        <p className="text-xs text-gray-500">
                          <span role="img" aria-label={`Drapeau de ${team?.name ?? "Inconnu"}`}>{team?.flag}</span> {team?.name} &middot; {player.club}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-primary">{player.goals} buts</p>
                        <p className="text-xs text-gray-500">{player.caps} sel.</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RelatedLinks variant="compact" title="Pages liées" links={[
          { href: "/buteurs", title: "Meilleurs buteurs", description: "Classement des buteurs de la CDM 2026", icon: "" },
          { href: "/comparateur-joueurs", title: "Comparateur de joueurs", description: "Comparez les stats de 2 joueurs", icon: "" },
          { href: "/equipe", title: "Les 48 équipes", description: "Effectifs complets par sélection", icon: "" },
          { href: "/classement-fifa", title: "Classement FIFA", description: "Ranking mondial des équipes", icon: "" },
        ]} />
      </div>

      <FAQSection title="Questions sur les joueurs de la CDM 2026" items={faqItems} />
    </>
  );
}
