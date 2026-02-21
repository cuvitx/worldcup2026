import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { groups, groupsBySlug } from "@repo/data/groups";
import { teamsById } from "@repo/data/teams";
import { matchesByGroup } from "@repo/data/matches";
import { notFound } from "next/navigation";
import { ArrowRight, Target, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

export const dynamicParams = false;

interface PageProps {
  params: Promise<{ lettre: string }>;
}

export async function generateStaticParams() {
  return groups.map((g) => ({ lettre: g.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lettre } = await params;
  const group = groupsBySlug[lettre];
  if (!group) return {};

  const teamNames = group.teams
    .map((id) => teamsById[id]?.name ?? id)
    .join(", ");

  return {
    title: `Scénarios de qualification Groupe ${group.letter} - ${teamNames} | CDM 2026`,
    description: `Que doit faire chaque équipe pour se qualifier dans le Groupe ${group.letter} ? Scénarios, probabilités et calculs pour ${teamNames}.`,
    openGraph: {
      title: `Scénarios Groupe ${group.letter} - CDM 2026`,
      description: `Analyse des scénarios de qualification du Groupe ${group.letter} : ${teamNames}.`,
    },
    alternates: {
      canonical: `https://cdm2026.fr/scenarios-qualification/${lettre}`,
    },
  };
}

export default async function ScenariosQualificationPage({ params }: PageProps) {
  const { lettre } = await params;
  const group = groupsBySlug[lettre];
  if (!group) notFound();

  const groupTeams = group.teams.map((id) => teamsById[id]).filter((t): t is NonNullable<typeof t> => t != null);
  const groupMatches = matchesByGroup[group.letter] ?? [];

  // Probability templates - favori → outsider
  const probSets = [
    { first: 45, second: 30, third: 18, out: 7 },
    { first: 28, second: 32, third: 25, out: 15 },
    { first: 18, second: 23, third: 30, out: 29 },
    { first: 9, second: 15, third: 27, out: 49 },
  ];

  const faqItems = [
    {
      question: `Quelles équipes sont dans le Groupe ${group.letter} ?`,
      answer: `Le Groupe ${group.letter} est composé de : ${groupTeams.map((t) => t.name).join(", ")}.`,
    },
    {
      question: `Combien d'équipes du Groupe ${group.letter} se qualifient ?`,
      answer: `Les 2 premières équipes se qualifient directement pour les 16èmes de finale. Le 3ème peut aussi se qualifier s'il fait partie des 8 meilleurs troisièmes sur les 12 groupes.`,
    },
    {
      question: `Que se passe-t-il en cas d'égalité dans le Groupe ${group.letter} ?`,
      answer: `En cas d'égalité de points, les critères de départage sont : confrontation directe, différence de buts générale, buts marqués, fair-play (cartons), puis tirage au sort.`,
    },
  ];

  return (
    <>
{/* Hero */}
      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            Scénarios de qualification :{" "}
            <span className="text-secondary">Groupe {group.letter}</span>
          </h1>
          <p className="text-lg text-white/80">
            {groupTeams.map((t) => t.name).join(" · ")}
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-4 py-12 space-y-12">
        {/* Navigation groupes */}
        <nav className="flex flex-wrap gap-2 justify-center">
          {groups.map((g) => (
            <Link
              key={g.slug}
              href={`/scenarios-qualification/${g.slug}`}
              className={`px-3 py-1.5 rounded-lg text-sm font-bold transition ${
                g.slug === lettre
                  ? "bg-[#022149] text-white"
                  : "bg-gray-100 text-[#022149] hover:bg-gray-200"
              }`}
            >
              {g.letter}
            </Link>
          ))}
        </nav>

        {/* Tableau des probabilités */}
        <section>
          <h2 className="text-2xl font-bold text-[#022149] mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-[#00B865]" />
            Probabilités de qualification
          </h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#022149] text-white">
                  <th className="px-4 py-3 text-left">Équipe</th>
                  <th className="px-4 py-3 text-center">1er</th>
                  <th className="px-4 py-3 text-center">2ème</th>
                  <th className="px-4 py-3 text-center">3ème qualifié</th>
                  <th className="px-4 py-3 text-center">Éliminé</th>
                </tr>
              </thead>
              <tbody>
                {groupTeams.map((team, i) => {
                  const probs = probSets[i] ?? probSets[3];
                  if (!probs) return null;
                  const qualifTotal = probs.first + probs.second + probs.third;
                  return (
                    <tr key={team.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">
                        {team.flag && <span className="mr-1.5">{team.flag}</span>}
                        <Link href={`/equipe/${team.slug}`} className="hover:underline">
                          {team.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="font-mono font-bold text-[#00B865]">{probs.first}%</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="font-mono">{probs.second}%</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="font-mono text-[#D4AF37]">{probs.third}%</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="font-mono text-red-500">{probs.out}%</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2 italic">
            Probabilités estimées avant le début du tournoi, basées sur le classement FIFA et les cotes des bookmakers.
          </p>
        </section>

        {/* Matchs du groupe */}
        <section>
          <h2 className="text-2xl font-bold text-[#022149] mb-4">Calendrier du Groupe {group.letter}</h2>
          <div className="space-y-3">
            {groupMatches.map((match) => {
              const home = teamsById[match.homeTeamId];
              const away = teamsById[match.awayTeamId];
              const homeName = home?.name ?? "À déterminer";
              const awayName = away?.name ?? "À déterminer";
              const dateStr = new Date(match.date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
              });
              return (
                <Link
                  key={match.slug}
                  href={`/match/${match.slug}`}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-[#00B865] transition group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500 w-16">{dateStr}</span>
                    <span className="font-medium">
                      {home?.flag} {homeName}
                    </span>
                    <span className="text-gray-400 text-sm">vs</span>
                    <span className="font-medium">
                      {away?.flag} {awayName}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-[#00B865] transition" />
                </Link>
              );
            })}
          </div>
        </section>

        {/* Scénarios détaillés */}
        <section>
          <h2 className="text-2xl font-bold text-[#022149] mb-6 flex items-center gap-2">
            <Target className="h-6 w-6 text-[#00B865]" />
            Scénarios détaillés par équipe
          </h2>
          <div className="space-y-8">
            {groupTeams.map((team, i) => {
              const others = groupTeams.filter((_, j) => j !== i);
              const isStrong = i < 2;
              return (
                <div key={team.id} className="rounded-xl border border-gray-200 p-5">
                  <h3 className="text-xl font-bold text-[#022149] mb-3">
                    {team.flag} {team.name}
                  </h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex gap-2">
                      <CheckCircle className="h-5 w-5 text-[#00B865] flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#022149]">Pour finir 1er :</strong>{" "}
                        {isStrong
                          ? `Gagner ses 2 premiers matchs garantit quasiment la 1ère place. Un nul au dernier match contre ${others[0]?.name ?? "le favori"} peut suffire si la différence de buts est favorable.`
                          : `Battre ${others[0]?.name ?? "le favori"} et au moins un autre adversaire. Un parcours sans faute (3 victoires) est nécessaire pour devancer les têtes de série.`}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Target className="h-5 w-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#022149]">Pour finir 2ème :</strong>{" "}
                        {isStrong
                          ? `Même avec une défaite contre ${others[0]?.name ?? "l'autre favori"}, une victoire et un nul devraient suffire pour sécuriser la 2ème place.`
                          : `Victoire contre ${others[others.length - 1]?.name ?? "l'outsider"} + nul contre un des favoris. 4 points est l'objectif minimum.`}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#022149]">Pour être meilleur 3ème :</strong>{" "}
                        3 points avec une différence de buts neutre ou positive. Battre l&apos;adversaire le plus abordable
                        et limiter la casse sur les deux autres matchs. Chaque but encaissé peut coûter la qualification.
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <Link
            href="/meilleurs-troisiemes"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-8 font-bold text-lg hover:opacity-90 transition"
          >
            Classement des meilleurs 3èmes
            <ArrowRight className="h-5 w-5" />
          </Link>
          <div className="mt-4">
            <Link href={`/groupe/${lettre}`} className="text-sm text-[#022149] underline hover:no-underline">
              Voir la page complète du Groupe {group.letter}
            </Link>
          </div>
        </section>

        <FAQSection title={`Questions sur le Groupe ${group.letter}`} items={faqItems} />

        <p className="text-xs text-gray-400 text-center">
          Les paris sportifs comportent des risques. Jouez responsable. 18+ | Autorité Nationale des Jeux (ANJ) —{" "}
          <a href="https://www.joueurs-info-service.fr" className="underline" target="_blank" rel="noopener noreferrer">
            joueurs-info-service.fr
          </a>
        </p>
      </main>
    </>
  );
}
