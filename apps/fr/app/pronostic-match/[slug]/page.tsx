import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { teamsById } from "@repo/data/teams";
import { matches } from "@repo/data/matches";
import { matchPredictionByPair, predictionsByTeamId } from "@repo/data/predictions";
import { h2hByPair } from "@repo/data/h2h";
import { stadiumsById } from "@repo/data/stadiums";
import { citiesById } from "@repo/data/cities";
import {
  bookmakers,
  featuredBookmaker,
  estimatedMatchOdds,
} from "@repo/data/affiliates";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const stageLabels: Record<string, string> = {
  group: "Phase de groupes",
  "round-of-32": "32e de finale",
  "round-of-16": "8e de finale",
  "quarter-final": "Quart de finale",
  "semi-final": "Demi-finale",
  "third-place": "Match pour la 3e place",
  final: "Finale",
};

export async function generateStaticParams() {
  return matches.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const match = matches.find((m) => m.slug === slug);
  if (!match) return {};

  const home = teamsById[match.homeTeamId];
  const away = teamsById[match.awayTeamId];

  const homeName = home?.name ?? "A determiner";
  const awayName = away?.name ?? "A determiner";

  return {
    title: `Pronostic ${homeName} vs ${awayName} | Cotes & Prediction CDM 2026`,
    description: `Pronostic ${homeName} vs ${awayName} Coupe du Monde 2026 : cotes estimees, score predit, analyse du match et historique des confrontations. Pariez sur ${homeName} - ${awayName} CDM 2026.`,
    openGraph: {
      title: `${home?.flag ?? ""} Pronostic ${homeName} vs ${awayName} ${away?.flag ?? ""} | CDM 2026`,
      description: `Cotes, prediction et analyse du match ${homeName} - ${awayName}. Coupe du Monde 2026.`,
    },
  };
}

export default async function PronosticMatchPage({ params }: PageProps) {
  const { slug } = await params;
  const match = matches.find((m) => m.slug === slug);
  if (!match) notFound();

  const home = teamsById[match.homeTeamId];
  const away = teamsById[match.awayTeamId];
  const stadium = stadiumsById[match.stadiumId];
  const city = stadium ? citiesById[stadium.cityId] : null;
  const stage = stageLabels[match.stage] ?? match.stage;

  // Predictions
  const prediction =
    home && away
      ? matchPredictionByPair[`${home.id}:${away.id}`]
      : undefined;
  const predHome = home ? predictionsByTeamId[home.id] : undefined;
  const predAway = away ? predictionsByTeamId[away.id] : undefined;

  // Estimated odds
  const odds = prediction
    ? estimatedMatchOdds(
        prediction.team1WinProb,
        prediction.drawProb,
        prediction.team2WinProb
      )
    : null;

  // H2H
  const h2h =
    home && away ? h2hByPair[`${home.id}:${away.id}`] : undefined;

  // Date formatting
  const dateFormatted = new Date(match.date).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const homeName = home?.name ?? "A determiner";
  const awayName = away?.name ?? "A determiner";

  // Find the most likely outcome
  const outcomes = prediction
    ? [
        { key: "1", label: `Victoire ${homeName}`, prob: prediction.team1WinProb },
        { key: "N", label: "Match nul", prob: prediction.drawProb },
        { key: "2", label: `Victoire ${awayName}`, prob: prediction.team2WinProb },
      ]
    : [];
  const maxProb = Math.max(...outcomes.map((o) => o.prob));

  // Related matches (same matchday or group)
  const relatedMatches = matches.filter(
    (m) =>
      m.id !== match.id &&
      ((match.group && m.group === match.group) ||
        (match.matchday && m.matchday === match.matchday && m.stage === "group"))
  ).slice(0, 6);

  return (
    <>
      {/* Breadcrumb */}
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-primary">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/match/calendrier" className="hover:text-primary">
                Calendrier
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">
              Pronostic {homeName} vs {awayName}
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <p className="mb-2 text-center text-sm text-gold font-medium uppercase tracking-wide">
            {stage}
            {match.group ? ` - Groupe ${match.group}` : ""}
            {match.matchday ? ` - Journee ${match.matchday}` : ""}
          </p>
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-center md:gap-8">
            <div className="flex flex-col items-center">
              <span className="text-6xl">{home?.flag ?? "\ud83c\udff3\ufe0f"}</span>
              {home ? (
                <Link
                  href={`/equipe/${home.slug}`}
                  className="mt-2 text-2xl font-extrabold hover:text-gold"
                >
                  {home.name}
                </Link>
              ) : (
                <p className="mt-2 text-2xl font-extrabold">A determiner</p>
              )}
              {home && (
                <p className="text-sm text-gray-400">#{home.fifaRanking} FIFA</p>
              )}
            </div>
            <div className="text-center">
              <span className="text-3xl font-bold text-gold">VS</span>
              <p className="mt-1 text-sm text-gray-400">{match.time} UTC</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-6xl">{away?.flag ?? "\ud83c\udff3\ufe0f"}</span>
              {away ? (
                <Link
                  href={`/equipe/${away.slug}`}
                  className="mt-2 text-2xl font-extrabold hover:text-gold"
                >
                  {away.name}
                </Link>
              ) : (
                <p className="mt-2 text-2xl font-extrabold">A determiner</p>
              )}
              {away && (
                <p className="text-sm text-gray-400">#{away.fifaRanking} FIFA</p>
              )}
            </div>
          </div>
          <p className="mt-6 text-center text-gray-300">
            {dateFormatted}
            {stadium ? ` | ${stadium.name}` : ""}
            {city ? `, ${city.name}` : ""}
          </p>
        </div>
      </section>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">
            {/* 1N2 Prediction */}
            {prediction && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-bold">
                  Pronostic 1N2 : {homeName} vs {awayName}
                </h2>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {outcomes.map((outcome) => {
                    const isHighlighted = outcome.prob === maxProb;
                    const pct = Math.round(outcome.prob * 100);
                    return (
                      <div
                        key={outcome.key}
                        className={`relative rounded-lg p-5 text-center transition-all ${
                          isHighlighted
                            ? "bg-accent/10 border-2 border-accent ring-2 ring-accent/20"
                            : "bg-gray-50 border border-gray-200"
                        }`}
                      >
                        {isHighlighted && (
                          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-white">
                            Favori
                          </span>
                        )}
                        <p className="text-sm font-medium text-gray-500 mb-1">
                          {outcome.key}
                        </p>
                        <p
                          className={`text-3xl font-extrabold ${
                            isHighlighted ? "text-accent" : "text-gray-700"
                          }`}
                        >
                          {pct}%
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {outcome.label}
                        </p>
                        {/* Visual bar */}
                        <div className="mt-3 h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              isHighlighted ? "bg-accent" : "bg-gray-400"
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Score exact predit */}
            {prediction && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">Score exact predit</h2>
                <div className="flex items-center justify-center gap-6 rounded-lg bg-primary/5 p-8">
                  <div className="text-center">
                    <span className="text-3xl">{home?.flag ?? "\ud83c\udff3\ufe0f"}</span>
                    <p className="mt-1 text-sm font-medium text-gray-600">
                      {homeName}
                    </p>
                  </div>
                  <p className="text-5xl font-extrabold text-primary tracking-wider">
                    {prediction.predictedScore}
                  </p>
                  <div className="text-center">
                    <span className="text-3xl">{away?.flag ?? "\ud83c\udff3\ufe0f"}</span>
                    <p className="mt-1 text-sm font-medium text-gray-600">
                      {awayName}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-center text-sm text-gray-500">
                  Score le plus probable selon notre modele de prediction base sur les ratings ELO,
                  les statistiques recentes et l&apos;historique des confrontations.
                </p>
              </section>
            )}

            {/* Cotes estimees */}
            {odds && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">
                  Cotes estimees : {homeName} vs {awayName}
                </h2>
                <p className="mb-4 text-sm text-gray-600">
                  Cotes decimales estimees a partir de notre modele de prediction.
                  Comparez avec les offres des bookmakers ci-dessous.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="pb-3 text-left font-semibold text-gray-700">
                          Bookmaker
                        </th>
                        <th className="pb-3 text-center font-semibold text-gray-700">
                          Victoire {homeName}
                        </th>
                        <th className="pb-3 text-center font-semibold text-gray-700">
                          Nul
                        </th>
                        <th className="pb-3 text-center font-semibold text-gray-700">
                          Victoire {awayName}
                        </th>
                        <th className="pb-3 text-right font-semibold text-gray-700">
                          Bonus
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {/* Estimated odds row */}
                      <tr className="bg-primary/5">
                        <td className="py-3 text-left font-medium text-primary">
                          Estimation
                        </td>
                        <td className="py-3 text-center font-bold text-primary">
                          {odds.home}
                        </td>
                        <td className="py-3 text-center font-bold text-primary">
                          {odds.draw}
                        </td>
                        <td className="py-3 text-center font-bold text-primary">
                          {odds.away}
                        </td>
                        <td className="py-3 text-right text-sm text-gray-400">
                          --
                        </td>
                      </tr>
                      {/* Bookmaker rows */}
                      {bookmakers.map((bk) => (
                        <tr
                          key={bk.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-3 text-left">
                            <a
                              href={bk.url}
                              target="_blank"
                              rel="noopener noreferrer nofollow"
                              className="font-medium text-accent hover:underline"
                            >
                              {bk.name}
                            </a>
                            {bk.highlight && (
                              <span className="ml-2 inline-block rounded bg-gold/20 px-1.5 py-0.5 text-xs font-semibold text-gold">
                                Recommande
                              </span>
                            )}
                          </td>
                          <td className="py-3 text-center font-semibold">
                            {odds.home}
                          </td>
                          <td className="py-3 text-center font-semibold">
                            {odds.draw}
                          </td>
                          <td className="py-3 text-center font-semibold">
                            {odds.away}
                          </td>
                          <td className="py-3 text-right">
                            <a
                              href={bk.url}
                              target="_blank"
                              rel="noopener noreferrer nofollow"
                              className="inline-block rounded bg-accent px-3 py-1 text-xs font-bold text-white hover:bg-accent/90"
                            >
                              {bk.bonus}
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-gray-400">
                  Cotes estimees, susceptibles d&apos;evoluer. Les cotes reelles peuvent
                  varier selon les bookmakers.
                </p>
              </section>
            )}

            {/* Affiliate CTA Block */}
            <section className="rounded-lg bg-gradient-to-br from-accent to-accent/80 p-6 shadow-md text-white">
              <h2 className="mb-4 text-xl font-bold">
                Parier sur ce match
              </h2>
              {/* Featured bookmaker */}
              <div className="mb-6 rounded-lg bg-white/10 backdrop-blur-sm p-5">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-bold">{featuredBookmaker.name}</p>
                    <p className="text-sm text-white/80">
                      {featuredBookmaker.bonus} {featuredBookmaker.bonusDetail}
                    </p>
                    <div className="mt-1 flex items-center gap-0.5">
                      {Array.from({ length: featuredBookmaker.rating }).map(
                        (_, i) => (
                          <span key={i} className="text-gold text-sm">
                            &#9733;
                          </span>
                        )
                      )}
                    </div>
                  </div>
                  <a
                    href={featuredBookmaker.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-block rounded-lg bg-gold px-6 py-3 text-sm font-bold text-primary hover:bg-gold/90 transition-colors whitespace-nowrap"
                  >
                    {featuredBookmaker.name} - {featuredBookmaker.bonus} &rarr; Parier maintenant
                  </a>
                </div>
              </div>
              {/* Other bookmakers */}
              <div className="space-y-2">
                {bookmakers
                  .filter((bk) => bk.id !== featuredBookmaker.id)
                  .map((bk) => (
                    <a
                      key={bk.id}
                      href={bk.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3 hover:bg-white/10 transition-colors"
                    >
                      <div>
                        <span className="font-semibold">{bk.name}</span>
                        <span className="ml-2 text-sm text-white/70">
                          {bk.bonus} {bk.bonusDetail}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gold">
                        Voir l&apos;offre &rarr;
                      </span>
                    </a>
                  ))}
              </div>
              <p className="mt-4 text-xs text-white/60">
                Cotes estimees, susceptibles d&apos;evoluer. Pariez responsablement. 18+
              </p>
            </section>

            {/* Analyse du match */}
            {home && away && prediction && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">
                  Analyse du match : {homeName} vs {awayName}
                </h2>
                <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
                  <p>
                    Ce match de {stage.toLowerCase()}
                    {match.group ? ` du Groupe ${match.group}` : ""} opposera{" "}
                    <strong>{homeName}</strong> (#{home.fifaRanking} FIFA) a{" "}
                    <strong>{awayName}</strong> (#{away.fifaRanking} FIFA) le{" "}
                    {dateFormatted}
                    {stadium ? ` au ${stadium.name}` : ""}.
                  </p>
                  <p>
                    Selon notre modele de prediction,{" "}
                    {prediction.team1WinProb > prediction.team2WinProb
                      ? `${homeName} est favori avec ${Math.round(prediction.team1WinProb * 100)}% de chances de victoire`
                      : prediction.team2WinProb > prediction.team1WinProb
                        ? `${awayName} est favori avec ${Math.round(prediction.team2WinProb * 100)}% de chances de victoire`
                        : "les deux equipes se neutralisent selon nos estimations"}
                    . Le score le plus probable est de{" "}
                    <strong>{prediction.predictedScore}</strong>.
                  </p>
                  {predHome && predAway && (
                    <p>
                      En termes de rating ELO, {homeName} affiche un score de{" "}
                      <strong>{predHome.eloRating}</strong> contre{" "}
                      <strong>{predAway.eloRating}</strong> pour {awayName},
                      soit un ecart de{" "}
                      {Math.abs(predHome.eloRating - predAway.eloRating)} points
                      en faveur de{" "}
                      {predHome.eloRating >= predAway.eloRating
                        ? homeName
                        : awayName}
                      .
                    </p>
                  )}
                  {home.fifaRanking < away.fifaRanking ? (
                    <p>
                      Au classement FIFA, {homeName} occupe la{" "}
                      {home.fifaRanking}
                      <sup>e</sup> place mondiale, soit{" "}
                      {away.fifaRanking - home.fifaRanking} rangs au-dessus de{" "}
                      {awayName} ({away.fifaRanking}
                      <sup>e</sup>). Cet avantage au classement se reflete dans
                      les probabilites de notre modele.
                    </p>
                  ) : home.fifaRanking > away.fifaRanking ? (
                    <p>
                      Au classement FIFA, {awayName} occupe la{" "}
                      {away.fifaRanking}
                      <sup>e</sup> place mondiale, soit{" "}
                      {home.fifaRanking - away.fifaRanking} rangs au-dessus de{" "}
                      {homeName} ({home.fifaRanking}
                      <sup>e</sup>). Malgre cela, l&apos;avantage du terrain pourrait
                      jouer un faveur de {homeName}.
                    </p>
                  ) : null}
                  {match.stage === "group" && match.group && (
                    <p>
                      Ce match se deroule dans le cadre du{" "}
                      <Link
                        href={`/groupe/${match.group.toLowerCase()}`}
                        className="text-accent hover:underline"
                      >
                        Groupe {match.group}
                      </Link>{" "}
                      de la Coupe du Monde 2026. Le resultat de cette rencontre
                      sera determinant pour la qualification aux 32es de finale.
                    </p>
                  )}
                  {h2h && h2h.totalMatches > 0 && (
                    <p>
                      Historiquement, ces deux equipes se sont affrontees{" "}
                      {h2h.totalMatches} fois avec un bilan de {h2h.team1Wins}{" "}
                      victoire{h2h.team1Wins > 1 ? "s" : ""} pour {homeName},{" "}
                      {h2h.draws} nul{h2h.draws > 1 ? "s" : ""} et{" "}
                      {h2h.team2Wins} victoire{h2h.team2Wins > 1 ? "s" : ""}{" "}
                      pour {awayName}.
                    </p>
                  )}
                </div>
              </section>
            )}

            {/* Historique H2H */}
            {home && away && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">
                  Historique des confrontations
                </h2>
                {h2h && h2h.totalMatches > 0 ? (
                  <>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="rounded-lg bg-accent/5 p-4 text-center">
                        <p className="text-3xl font-bold text-accent">
                          {h2h.team1Wins}
                        </p>
                        <p className="text-xs text-gray-500">
                          Victoires {homeName}
                        </p>
                      </div>
                      <div className="rounded-lg bg-gray-50 p-4 text-center">
                        <p className="text-3xl font-bold text-gray-600">
                          {h2h.draws}
                        </p>
                        <p className="text-xs text-gray-500">Nuls</p>
                      </div>
                      <div className="rounded-lg bg-accent/5 p-4 text-center">
                        <p className="text-3xl font-bold text-accent">
                          {h2h.team2Wins}
                        </p>
                        <p className="text-xs text-gray-500">
                          Victoires {awayName}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="rounded-lg bg-gray-50 p-3 text-center">
                        <p className="text-xl font-bold text-primary">
                          {h2h.totalMatches}
                        </p>
                        <p className="text-xs text-gray-500">Matchs joues</p>
                      </div>
                      <div className="rounded-lg bg-gray-50 p-3 text-center">
                        <p className="text-xl font-bold text-primary">
                          {h2h.team1Goals} - {h2h.team2Goals}
                        </p>
                        <p className="text-xs text-gray-500">Buts marques</p>
                      </div>
                    </div>
                    {h2h.lastMatch && (
                      <p className="text-sm text-gray-600 mb-4">
                        <span className="font-medium">Dernier match :</span>{" "}
                        {h2h.lastMatch}
                        {h2h.lastMatchDate &&
                          ` (${new Date(h2h.lastMatchDate).toLocaleDateString(
                            "fr-FR",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )})`}
                      </p>
                    )}
                    <div className="text-center">
                      <Link
                        href={`/h2h/${home.slug}-vs-${away.slug}`}
                        className="text-sm font-medium text-accent hover:underline"
                      >
                        Voir l&apos;historique complet des confrontations &rarr;
                      </Link>
                    </div>
                  </>
                ) : (
                  <div>
                    <p className="text-gray-600 mb-4">
                      {homeName} et {awayName} ne se sont jamais affrontes. La
                      Coupe du Monde 2026 sera leur premiere confrontation
                      historique.
                    </p>
                    <div className="text-center">
                      <Link
                        href={`/h2h/${home.slug}-vs-${away.slug}`}
                        className="text-sm font-medium text-accent hover:underline"
                      >
                        Voir la page de confrontation &rarr;
                      </Link>
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* Infos match */}
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Informations du match</h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg bg-gray-50 p-4">
                  <dt className="text-gray-500 mb-1">Date</dt>
                  <dd className="font-semibold">{dateFormatted}</dd>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <dt className="text-gray-500 mb-1">Heure (UTC)</dt>
                  <dd className="font-semibold">{match.time}</dd>
                </div>
                {stadium && (
                  <div className="rounded-lg bg-gray-50 p-4">
                    <dt className="text-gray-500 mb-1">Stade</dt>
                    <dd>
                      <Link
                        href={`/stade/${stadium.slug}`}
                        className="font-semibold text-accent hover:underline"
                      >
                        {stadium.name}
                      </Link>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {stadium.capacity.toLocaleString("fr-FR")} places
                      </p>
                    </dd>
                  </div>
                )}
                {city && (
                  <div className="rounded-lg bg-gray-50 p-4">
                    <dt className="text-gray-500 mb-1">Ville</dt>
                    <dd>
                      <Link
                        href={`/ville/${city.slug}`}
                        className="font-semibold text-accent hover:underline"
                      >
                        {city.name}
                      </Link>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {stadium?.country}
                      </p>
                    </dd>
                  </div>
                )}
                <div className="rounded-lg bg-gray-50 p-4">
                  <dt className="text-gray-500 mb-1">Phase</dt>
                  <dd className="font-semibold">{stage}</dd>
                </div>
                {match.group && (
                  <div className="rounded-lg bg-gray-50 p-4">
                    <dt className="text-gray-500 mb-1">Groupe</dt>
                    <dd>
                      <Link
                        href={`/groupe/${match.group.toLowerCase()}`}
                        className="font-semibold text-accent hover:underline"
                      >
                        Groupe {match.group}
                      </Link>
                    </dd>
                  </div>
                )}
                {match.matchday && (
                  <div className="rounded-lg bg-gray-50 p-4">
                    <dt className="text-gray-500 mb-1">Journee</dt>
                    <dd className="font-semibold">Journee {match.matchday}</dd>
                  </div>
                )}
              </dl>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Match info card */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">Resume du pronostic</h3>
              {prediction ? (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Favori</span>
                    <span className="font-semibold">
                      {prediction.team1WinProb > prediction.team2WinProb
                        ? homeName
                        : prediction.team2WinProb > prediction.team1WinProb
                          ? awayName
                          : "Indecis"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Score predit</span>
                    <span className="font-bold text-primary">
                      {prediction.predictedScore}
                    </span>
                  </div>
                  {odds && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Cote 1</span>
                        <span className="font-semibold">{odds.home}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Cote N</span>
                        <span className="font-semibold">{odds.draw}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Cote 2</span>
                        <span className="font-semibold">{odds.away}</span>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-600">
                  Les pronostics detailles pour ce match seront disponibles
                  prochainement.
                </p>
              )}
            </div>

            {/* Team links */}
            {home && away && (
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold">Fiches equipes</h3>
                <div className="space-y-3">
                  <Link
                    href={`/equipe/${home.slug}`}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent"
                  >
                    <span className="text-xl">{home.flag}</span>
                    <span className="font-medium">{home.name}</span>
                  </Link>
                  <Link
                    href={`/equipe/${away.slug}`}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent"
                  >
                    <span className="text-xl">{away.flag}</span>
                    <span className="font-medium">{away.name}</span>
                  </Link>
                  <Link
                    href={`/h2h/${home.slug}-vs-${away.slug}`}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent"
                  >
                    <span className="text-xl">&#9878;</span>
                    <span className="font-medium">
                      H2H {home.name} vs {away.name}
                    </span>
                  </Link>
                </div>
              </div>
            )}

            {/* Stadium card */}
            {stadium && (
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold">Lieu du match</h3>
                <Link
                  href={`/stade/${stadium.slug}`}
                  className="block rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent"
                >
                  <p className="font-semibold">{stadium.name}</p>
                  <p className="text-sm text-gray-500">
                    {stadium.capacity.toLocaleString("fr-FR")} places &middot;{" "}
                    {stadium.city}
                  </p>
                </Link>
                {city && (
                  <Link
                    href={`/ville/${city.slug}`}
                    className="mt-2 block text-sm text-accent hover:underline"
                  >
                    Guide de {city.name} &rarr;
                  </Link>
                )}
              </div>
            )}

            {/* Sidebar CTA */}
            <div className="rounded-lg bg-accent/5 border border-accent/20 p-6">
              <h3 className="mb-2 text-lg font-bold text-accent">
                Parier sur ce match
              </h3>
              <p className="mb-3 text-sm text-gray-600">
                {featuredBookmaker.bonus} {featuredBookmaker.bonusDetail}
              </p>
              <a
                href={featuredBookmaker.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="block w-full rounded-lg bg-accent px-4 py-2.5 text-center text-sm font-bold text-white hover:bg-accent/90 transition-colors"
              >
                Parier sur {featuredBookmaker.name} &rarr;
              </a>
              <p className="mt-2 text-xs text-gray-400 text-center">
                18+ | Pariez responsablement
              </p>
            </div>

            {/* Autres pronostics */}
            {relatedMatches.length > 0 && (
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold">Autres pronostics</h3>
                <div className="space-y-2">
                  {relatedMatches.map((rm) => {
                    const rmHome = teamsById[rm.homeTeamId];
                    const rmAway = teamsById[rm.awayTeamId];
                    return (
                      <Link
                        key={rm.id}
                        href={`/pronostic-match/${rm.slug}`}
                        className="flex items-center justify-between rounded-lg border border-gray-200 p-3 text-sm transition-colors hover:border-accent"
                      >
                        <span>
                          {rmHome?.flag ?? "\ud83c\udff3\ufe0f"}{" "}
                          {rmHome?.name ?? "TBD"} vs{" "}
                          {rmAway?.name ?? "TBD"}{" "}
                          {rmAway?.flag ?? "\ud83c\udff3\ufe0f"}
                        </span>
                        <span className="text-xs text-gray-400">
                          {rm.date}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Link to match page */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <Link
                href={`/match/${match.slug}`}
                className="block w-full rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-bold text-white hover:bg-primary/90 transition-colors"
              >
                Voir la fiche complete du match &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD SportsEvent */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsEvent",
            name: `${homeName} vs ${awayName} - Coupe du Monde 2026`,
            startDate: `${match.date}T${match.time}:00Z`,
            location: stadium
              ? {
                  "@type": "StadiumOrArena",
                  name: stadium.name,
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: stadium.city,
                    addressCountry: stadium.country,
                  },
                }
              : undefined,
            homeTeam: home
              ? { "@type": "SportsTeam", name: home.name }
              : undefined,
            awayTeam: away
              ? { "@type": "SportsTeam", name: away.name }
              : undefined,
            sport: "Football",
            description: `Pronostic et cotes pour ${homeName} vs ${awayName}, ${stage} de la Coupe du Monde 2026.`,
          }),
        }}
      />
    </>
  );
}
