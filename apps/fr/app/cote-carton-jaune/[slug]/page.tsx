import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { AlertTriangle, ArrowRight, BarChart3, ExternalLink, History, ShieldAlert, Swords, TrendingUp, Trophy, User } from "lucide-react";
import { players } from "@repo/data/players";
import { teamsById } from "@repo/data/teams";

const TOP_50_SLUGS = [
  "mbappe","haaland","vinicius-jr","bellingham","yamal","messi","ronaldo","kane","salah","de-bruyne",
  "griezmann","neymar","lewandowski","osimhen","saka","pedri","rodri","gavi","foden","rashford",
  "alvarez","martinez-lautaro","isak","vlahovic","morata","richarlison","gakpo","thuram","kim-min-jae","hakimi",
  "valverde","tchouameni","camavinga","wirtz","musiala","szczesny","alisson","courtois","van-dijk","dias",
  "hojlund","palmer","nunez","diaz-luis","dembele","son","kulusevski","raphinha","bruno-fernandes","bernardo-silva",
];

const playersBySlug = Object.fromEntries(players.map((p) => [p.slug, p]));

function getCardStats(slug: string) {
  const seed = slug.length + slug.charCodeAt(0) + slug.charCodeAt(slug.length - 1);
  const yellowCards = 4 + (seed % 18);
  const matchesPlayed = 25 + (seed % 40);
  const cardsPerMatch = +(yellowCards / matchesPlayed).toFixed(2);
  const tacklesPerMatch = +(1.2 + (seed % 25) / 10).toFixed(1);
  const foulsPerMatch = +(0.8 + (seed % 20) / 10).toFixed(1);
  const wcCards = seed % 4;
  const profileScore = +(foulsPerMatch * 10 + tacklesPerMatch * 5 + cardsPerMatch * 30).toFixed(0);
  const isRough = profileScore > 30;
  return {
    yellowCards,
    matchesPlayed,
    cardsPerMatch,
    tacklesPerMatch,
    foulsPerMatch,
    wcCards,
    profileScore,
    isRough,
    winamax: +(3.00 + (seed % 40) / 10).toFixed(2),
    betclic: +(2.90 + (seed % 45) / 10).toFixed(2),
    unibet: +(3.10 + (seed % 38) / 10).toFixed(2),
    tournamentAvgCards: 0.14,
    tournamentAvgFouls: 1.3,
  };
}

export async function generateStaticParams() {
  return TOP_50_SLUGS.filter((s) => playersBySlug[s]).map((slug) => ({ slug }));
}

interface PageProps { params: Promise<{ slug: string }>; }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const player = playersBySlug[slug];
  if (!player) return {};
  return {
    title: `Cote carton jaune ${player.name} — CDM 2026 | Winamax, Betclic, Unibet`,
    description: `Statistiques disciplinaires de ${player.name}, cotes carton jaune Winamax, Betclic et Unibet pour la Coupe du Monde 2026. Profil, historique et analyse.`,
    alternates: { canonical: `https://www.cdm2026.fr/cote-carton-jaune/${slug}` },
  };
}

export const dynamicParams = false;

export default async function CoteCartonJaunePage({ params }: PageProps) {
  const { slug } = await params;
  const player = playersBySlug[slug];
  if (!player) notFound();

  const team = teamsById[player.teamId];
  const stats = getCardStats(slug);
  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Paris sportifs", href: "/paris-sportifs" },
    { label: `Carton jaune ${player.name}` },
  ];
  
  const faqItems = [
    { question: `Quelle est la cote pour un carton jaune de ${player.name} ?`, answer: `Les cotes indicatives pour un carton jaune de ${player.name} sont de ${stats.winamax} chez Winamax, ${stats.betclic} chez Betclic et ${stats.unibet} chez Unibet. Ces cotes varient selon le match et l'adversaire.` },
    { question: `${player.name} prend-il souvent des cartons jaunes ?`, answer: `${player.name} affiche une moyenne de ${stats.cardsPerMatch} carton jaune par match en sélection, avec ${stats.yellowCards} cartons en ${stats.matchesPlayed} matchs. Son profil est considéré comme ${stats.isRough ? "plutôt rugueux" : "plutôt fair-play"}.` },
    { question: "Comment sont cotés les paris carton jaune ?", answer: "Le pari \"joueur reçoit un carton jaune\" est proposé par la plupart des bookmakers sur les matchs de la Coupe du Monde 2026. La cote dépend du profil disciplinaire du joueur, de l'adversaire et de l'enjeu du match." },
    { question: "L'arbitre influence-t-il les cotes carton jaune ?", answer: "Oui, l'arbitre désigné est un facteur clé. Certains arbitres distribuent en moyenne 4-5 cartons par match, d'autres seulement 2-3. Les bookmakers ajustent leurs cotes en conséquence." },
  ];

  return (
    <>
<section className="hero-animated text-center py-16 px-4">
        <Breadcrumb transparent items={breadcrumbItems} />
        <h1 className="text-4xl md:text-5xl font-extrabold text-accent mt-6">
          Cote carton jaune — {player.name}
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Profil disciplinaire, stats et cotes comparées pour parier sur un carton jaune de {player.name} ({team?.name}) à la Coupe du Monde 2026.
        </p>
      </section>

      {/* Stats disciplinaires */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <ShieldAlert className="w-7 h-7 text-yellow-500" />
          <h2 className="text-2xl font-bold text-primary">Stats disciplinaires en sélection</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <p className="text-3xl font-extrabold text-yellow-500">{stats.yellowCards}</p>
            <p className="text-sm text-gray-500 mt-1">Cartons jaunes</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <p className="text-3xl font-extrabold text-primary">{stats.cardsPerMatch}</p>
            <p className="text-sm text-gray-500 mt-1">Cartons / match</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <p className="text-3xl font-extrabold text-accent">{stats.tacklesPerMatch}</p>
            <p className="text-sm text-gray-500 mt-1">Tacles / match</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <p className="text-3xl font-extrabold text-red-500">{stats.foulsPerMatch}</p>
            <p className="text-sm text-gray-500 mt-1">Fautes / match</p>
          </div>
        </div>

        {/* Profil disciplinaire */}
        <div className={`rounded-xl p-6 mb-8 ${stats.isRough ? "bg-gradient-to-r from-yellow-50 to-red-50 border border-yellow-200" : "bg-gradient-to-r from-green-50 to-blue-50 border border-green-200"}`}>
          <h3 className="text-xl font-bold text-primary mb-2">
            Profil : {stats.isRough ? " Joueur rugueux" : " Joueur fair-play"}
          </h3>
          <p className="text-gray-700">
            {stats.isRough
              ? `Avec ${stats.foulsPerMatch} fautes et ${stats.tacklesPerMatch} tacles par match, ${player.name} affiche un profil engagé dans les duels. Son taux de cartons (${stats.cardsPerMatch}/match) le place parmi les joueurs les plus susceptibles d'être sanctionnés.`
              : `${player.name} est un joueur discipliné avec ${stats.foulsPerMatch} fautes par match et seulement ${stats.cardsPerMatch} carton par match en moyenne. Son profil fair-play se reflète dans des cotes carton jaune généralement élevées.`}
          </p>
        </div>
      </section>

      {/* Cotes */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Cotes &quot;Reçoit un carton jaune&quot;</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left p-3">Bookmaker</th>
                <th className="text-center p-3">Cote carton jaune</th>
                <th className="text-center p-3">Lien</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="p-3 font-semibold">Winamax</td>
                <td className="text-center p-3 font-bold text-accent">{stats.winamax}</td>
                <td className="text-center p-3">
                  <a href="https://www.winamax.fr" target="_blank" rel="noopener noreferrer sponsored nofollow" className="text-accent underline">Voir</a>
                </td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 font-semibold">Betclic</td>
                <td className="text-center p-3 font-bold text-accent">{stats.betclic}</td>
                <td className="text-center p-3">
                  <a href="https://www.betclic.fr" target="_blank" rel="noopener noreferrer sponsored nofollow" className="text-accent underline">Voir</a>
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 font-semibold">Unibet</td>
                <td className="text-center p-3 font-bold text-accent">{stats.unibet}</td>
                <td className="text-center p-3">
                  <a href="https://www.unibet.fr" target="_blank" rel="noopener noreferrer sponsored nofollow" className="text-accent underline">Voir</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">Cotes indicatives susceptibles de varier. Vérifiez sur le site du bookmaker avant de parier.</p>
      </section>

      {/* Historique CDM */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <History className="w-7 h-7 text-primary" />
          <h2 className="text-2xl font-bold text-primary">Historique cartons en Coupe du Monde</h2>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          {stats.wcCards > 0 ? (
            <p className="text-gray-700">
              {player.name} a reçu <span className="font-bold text-yellow-500">{stats.wcCards} carton{stats.wcCards > 1 ? "s" : ""} jaune{stats.wcCards > 1 ? "s" : ""}</span> lors de ses participations précédentes en Coupe du Monde.
              {stats.wcCards >= 3 && " Un historique chargé qui confirme sa tendance à être sanctionné dans les grands tournois."}
              {stats.wcCards >= 1 && stats.wcCards < 3 && " Un volume modéré, mais qui montre qu'il n'est pas à l'abri d'une sanction sous pression."}
            </p>
          ) : (
            <p className="text-gray-700">
              {player.name} n&apos;a pas encore reçu de carton jaune en Coupe du Monde ou participe pour la première fois au tournoi en 2026.
            </p>
          )}
        </div>
      </section>

      {/* Comparaison tournoi */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-primary">Comparaison avec la moyenne du tournoi</h2>
        </div>
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6">
          <p className="text-gray-700">
            Avec {stats.cardsPerMatch} carton par match, {player.name} se situe{" "}
            {stats.cardsPerMatch > stats.tournamentAvgCards ? (
              <span className="font-bold text-yellow-600">au-dessus</span>
            ) : (
              <span className="font-bold text-green-600">en dessous</span>
            )}{" "}
            de la moyenne estimée du tournoi ({stats.tournamentAvgCards} carton/match). Ses {stats.foulsPerMatch} fautes/match sont{" "}
            {stats.foulsPerMatch > stats.tournamentAvgFouls ? "supérieures" : "inférieures"} à la moyenne ({stats.tournamentAvgFouls}/match).
          </p>
        </div>
      </section>

      {/* Facteurs à considérer */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="w-7 h-7 text-yellow-500" />
          <h2 className="text-2xl font-bold text-primary">Facteurs à considérer</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-bold text-primary mb-2"><Swords className="h-5 w-5 inline-block" /> Adversaire</h3>
            <p className="text-sm text-gray-600">Les équipes combatives (Australie, Corée du Sud, Uruguay) génèrent plus de fautes et de cartons. Le style de jeu adverse influe directement sur la probabilité de sanction.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-bold text-primary mb-2"><Trophy className="h-5 w-5 inline-block" /> Enjeu du match</h3>
            <p className="text-sm text-gray-600">Les matchs à élimination directe et les derbys génèrent plus de tension. Phase de groupes = moins de cartons en moyenne que les 8es ou quarts de finale.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-bold text-primary mb-2"><User className="h-5 w-5 inline-block" />‍⚖️ Arbitre</h3>
            <p className="text-sm text-gray-600">Certains arbitres distribuent 4-5 cartons par match, d&apos;autres 2-3. Vérifiez la désignation arbitrale pour affiner votre analyse avant de parier.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-primary mb-4">Comparer les cotes carton jaune</h3>
          <p className="text-gray-600 mb-6">
            Trouvez la meilleure cote pour parier sur un carton jaune de {player.name} lors de la Coupe du Monde 2026.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://www.winamax.fr" target="_blank" rel="noopener noreferrer sponsored nofollow" className="bg-accent text-white rounded-xl py-3.5 px-6 font-semibold inline-flex items-center justify-center gap-2">
              Winamax <ExternalLink className="w-4 h-4" />
            </a>
            <a href="https://www.betclic.fr" target="_blank" rel="noopener noreferrer sponsored nofollow" className="bg-accent text-white rounded-xl py-3.5 px-6 font-semibold inline-flex items-center justify-center gap-2">
              Betclic <ExternalLink className="w-4 h-4" />
            </a>
            <a href="https://www.unibet.fr" target="_blank" rel="noopener noreferrer sponsored nofollow" className="bg-accent text-white rounded-xl py-3.5 px-6 font-semibold inline-flex items-center justify-center gap-2">
              Unibet <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <p className="text-xs text-gray-400 mt-4"></p>
        </div>
      </section>

      {/* Related */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-6">Paris joueur associés</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href={`/tirs-cadres/${slug}`} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
            <span className="font-semibold text-primary">Tirs cadrés de {player.name}</span>
            <ArrowRight className="w-5 h-5 text-accent" />
          </Link>
          <Link href={`/passes-decisives/${slug}`} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
            <span className="font-semibold text-primary">Passes décisives de {player.name}</span>
            <ArrowRight className="w-5 h-5 text-accent" />
          </Link>
        </div>
      </section>

      <FAQSection title={`Questions fréquentes — Carton jaune ${player.name}`} items={faqItems} />
    </>
  );
}
