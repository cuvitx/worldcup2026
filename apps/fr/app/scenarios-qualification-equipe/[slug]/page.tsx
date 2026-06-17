import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FAQSection } from "@repo/ui/faq-section";
import { domains } from "@repo/data/route-mapping";
import { teams, teamsBySlug, teamsById } from "@repo/data/teams";
import { groups } from "@repo/data/groups";
import { matches } from "@repo/data/matches";
import { predictionsByTeamId } from "@repo/data/predictions";
import { getISOCode } from "@repo/data/country-codes";
import { AlertTriangle, ArrowRight, BarChart3, CheckCircle2, Lightbulb, Medal, Target, TrendingDown, TrendingUp, Trophy, Users, X, XCircle } from "lucide-react";

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return teams.map((team) => ({ slug: team.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const team = teamsBySlug[slug];
  if (!team) return {};

  return {
    title: `${team.name} qualifiée si… — Scénarios de Qualification CDM 2026`,
    description: `Scénarios de qualification de ${team.name} (Groupe ${team.group}) à la Coupe du Monde 2026. 1er, 2ème ou 3ème ? Probabilités et matchs clés.`,
    openGraph: {
      title: `${team.flag} ${team.name} qualifiée si… — CDM 2026`,
      description: `Scénarios de qualification du Groupe ${team.group} pour ${team.name}. Probabilités, matchs clés et simulations.`,
      url: `${domains.fr}/scenarios-qualification-equipe/${team.slug}`,
    },
    alternates: {
      canonical: `https://www.cdm2026.fr/scenarios-qualification-equipe/${team.slug}`,
    },
  };
}

/* ── Helper: derive qualification probabilities from ELO-based predictions ── */
function getQualificationProbs(teamId: string) {
  const pred = predictionsByTeamId[teamId];
  if (!pred) {
    return { first: 25, second: 25, thirdQualified: 15, eliminated: 35 };
  }
  // groupStageProb = chance of advancing (top 2 + best 3rds)
  const advance = pred.groupStageProb;
  // Estimate: stronger teams more likely 1st
  const firstRaw = advance * 0.45;
  const secondRaw = advance * 0.35;
  const thirdQualifiedRaw = advance * 0.20;
  const eliminatedRaw = 1 - advance;

  const first = Math.round(firstRaw * 100);
  const second = Math.round(secondRaw * 100);
  const thirdQualified = Math.round(thirdQualifiedRaw * 100);
  const eliminated = 100 - first - second - thirdQualified;

  return { first, second, thirdQualified, eliminated };
}

/* ── Helper: get group opponents ── */
function getGroupOpponents(teamId: string, groupLetter: string) {
  const group = groups.find((g) => g.letter === groupLetter);
  if (!group) return [];
  return group.teams.filter((id) => id !== teamId).map((id) => teamsById[id]).filter(Boolean);
}

/* ── Helper: get group matches for team ── */
function getTeamGroupMatches(teamId: string) {
  return matches.filter(
    (m) => m.stage === "group" && (m.homeTeamId === teamId || m.awayTeamId === teamId)
  );
}

/* ── Severity label for position ── */
function getSeverityColor(pct: number) {
  if (pct >= 40) return "bg-green-500";
  if (pct >= 25) return "bg-yellow-500";
  if (pct >= 15) return "bg-orange-500";
  return "bg-red-500";
}

export default async function ScenariosQualificationPage({ params }: PageProps) {
  const { slug } = await params;
  const team = teamsBySlug[slug];
  if (!team) notFound();

  const opponents = getGroupOpponents(team.id, team.group);
  const teamMatches = getTeamGroupMatches(team.id);
  const probs = getQualificationProbs(team.id);
  const pred = predictionsByTeamId[team.id];

  const opponentNames = opponents.map((o) => o?.name ?? "À déterminer").join(", ");

  const faqItems = [
    {
      question: `${team.name} peut-elle se qualifier pour les huitièmes de finale ?`,
      answer: `Oui, ${team.name} a environ ${Math.round((probs.first + probs.second + probs.thirdQualified))}% de chances de se qualifier. Les 2 premiers de chaque groupe et les 8 meilleurs 3èmes accèdent aux 16èmes de finale (format 48 équipes).`,
    },
    {
      question: `Combien de points faut-il pour se qualifier en tant que 3ème ?`,
      answer: `Historiquement dans un format à 4 équipes par groupe avec 3 matchs, 4 points suffisent généralement pour être parmi les meilleurs 3èmes. Avec le format CDM 2026 (3 matchs de poule), 3-4 points devraient être le seuil minimum.`,
    },
    {
      question: `Quels sont les adversaires de ${team.name} dans le Groupe ${team.group} ?`,
      answer: `${team.name} est dans le Groupe ${team.group} avec ${opponentNames}. Chaque équipe joue 3 matchs de phase de groupes.`,
    },
    {
      question: `Comment fonctionne la qualification en Coupe du Monde 2026 ?`,
      answer: `La CDM 2026 compte 48 équipes réparties en 12 groupes de 4. Les 2 premiers de chaque groupe (24 équipes) et les 8 meilleurs 3èmes sont qualifiés pour les 16èmes de finale, soit 32 équipes au total.`,
    },
  ];

  return (
    <>
{/* Hero */}
      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-sm text-white/60 mb-2">Groupe {team.group} — CDM 2026</p>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            {team.flag}{" "}
            <span className="text-accent">{team.name}</span> qualifiée si…
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Tous les scénarios de qualification de {team.name} pour les phases finales.
            1ère, 2ème, 3ème ou éliminée ? Découvrez les probabilités et les matchs clés.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-4 py-12 space-y-12">
        {/* Breadcrumb visuel */}
        <nav className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#022149]">Accueil</Link>
          <span>/</span>
          <Link href="/equipe" className="hover:text-[#022149]">Équipes</Link>
          <span>/</span>
          <Link href={`/equipe/${team.slug}`} className="hover:text-[#022149]">{team.name}</Link>
          <span>/</span>
          <span className="text-[#022149] font-medium">Scénarios</span>
        </nav>

        {/* Groupe & Adversaires */}
        <section>
          <h2 className="text-2xl font-bold text-[#022149] mb-4 flex items-center gap-2">
            <Users className="h-6 w-6 text-[#00B865]" />
            Groupe {team.group} — Adversaires
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {opponents.map((opp) => {
              if (!opp) return null;
              const oppPred = predictionsByTeamId[opp.id];
              return (
                <Link
                  key={opp.id}
                  href={`/equipe/${opp.slug}`}
                  className="rounded-xl border border-gray-200 p-4 hover:border-[#00B865] transition text-center"
                >
                  <div className="text-3xl mb-2">{opp.flag}</div>
                  <div className="font-bold text-[#022149]">{opp.name}</div>
                  <div className="text-xs text-gray-500">FIFA #{opp.fifaRanking} — {opp.confederation}</div>
                  {oppPred && (
                    <div className="text-xs text-gray-400 mt-1">
                      Qualif. {Math.round(oppPred.groupStageProb * 100)}%
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </section>

        {/* Tableau de probabilités */}
        <section>
          <h2 className="text-2xl font-bold text-[#022149] mb-4 flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-[#D4AF37]" />
            Probabilités de classement
          </h2>
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-4 text-center text-sm font-bold bg-[#022149] text-white">
              <div className="p-3"><Medal className="h-5 w-5 inline-block" /> 1er</div>
              <div className="p-3"><Medal className="h-5 w-5 inline-block" /> 2ème</div>
              <div className="p-3"><Medal className="h-5 w-5 inline-block" /> 3ème qualifié</div>
              <div className="p-3"><X className="h-5 w-5 inline-block" /> Éliminée</div>
            </div>
            <div className="grid grid-cols-4 text-center">
              {[
                { value: probs.first, color: "text-green-600" },
                { value: probs.second, color: "text-blue-600" },
                { value: probs.thirdQualified, color: "text-orange-500" },
                { value: probs.eliminated, color: "text-red-500" },
              ].map((item, i) => (
                <div key={i} className="p-4 border-t border-gray-100">
                  <div className={`text-2xl font-extrabold ${item.color}`}>{item.value}%</div>
                  <div className="mt-2 mx-auto w-full max-w-[60px]">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${getSeverityColor(item.value)}`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scénario 1er */}
        <section>
          <h2 className="text-2xl font-bold text-[#022149] mb-4 flex items-center gap-2">
            <Trophy className="h-6 w-6 text-[#D4AF37]" />
            Scénario pour finir 1er du groupe
          </h2>
          <div className="rounded-xl border-l-4 border-l-[#D4AF37] border border-gray-200 p-5 space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-[#D4AF37] mt-0.5 shrink-0" />
              <p className="text-gray-700">
                <strong>Gagner ses 3 matchs de poule</strong> — 9 points garantissent la 1ère place dans 99% des cas.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-[#D4AF37] mt-0.5 shrink-0" />
              <p className="text-gray-700">
                <strong>2 victoires + 1 nul</strong> (7 points) — Suffisant si la différence de buts est favorable par rapport aux adversaires directs.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Target className="h-5 w-5 text-[#D4AF37] mt-0.5 shrink-0" />
              <p className="text-gray-700">
                <strong>Match clé :</strong> La confrontation directe contre le favori du groupe sera déterminante pour la 1ère place.
              </p>
            </div>
            <div className="bg-[#D4AF37]/10 rounded-lg p-3 text-sm text-gray-600">
              <Lightbulb className="h-5 w-5 inline-block" /> Finir 1er permet d&apos;éviter potentiellement les grosses équipes en 16èmes de finale.
            </div>
          </div>
        </section>

        {/* Scénario 2ème */}
        <section>
          <h2 className="text-2xl font-bold text-[#022149] mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-blue-500" />
            Scénario pour finir 2ème (qualification directe)
          </h2>
          <div className="rounded-xl border-l-4 border-l-blue-500 border border-gray-200 p-5 space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
              <p className="text-gray-700">
                <strong>6 points</strong> (2 victoires + 1 défaite) — La 2ème place est quasi assurée.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
              <p className="text-gray-700">
                <strong>4-5 points</strong> — Suffisant dans la plupart des configurations, sauf groupe très serré.
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 text-sm text-gray-600">
              <Lightbulb className="h-5 w-5 inline-block" /> Les 2 premiers de chaque groupe sont directement qualifiés pour les 16èmes de finale.
            </div>
          </div>
        </section>

        {/* Scénario 3ème */}
        <section>
          <h2 className="text-2xl font-bold text-[#022149] mb-4 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-500" />
            Scénario pour finir 3ème (meilleurs 3èmes)
          </h2>
          <div className="rounded-xl border-l-4 border-l-orange-500 border border-gray-200 p-5 space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
              <p className="text-gray-700">
                <strong>4 points</strong> — Devrait suffire pour figurer parmi les 8 meilleurs 3èmes (sur 12 groupes).
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
              <p className="text-gray-700">
                <strong>3 points</strong> — Possible mais la différence de buts sera cruciale. Chaque but compte !
              </p>
            </div>
            <div className="flex items-start gap-3">
              <XCircle className="h-5 w-5 text-red-400 mt-0.5 shrink-0" />
              <p className="text-gray-700">
                <strong>2 points ou moins</strong> — Très difficile de se qualifier parmi les meilleurs 3èmes.
              </p>
            </div>
            <div className="bg-orange-50 rounded-lg p-3 text-sm text-gray-600">
              <Lightbulb className="h-5 w-5 inline-block" /> 8 des 12 troisièmes se qualifient. La différence de buts et les buts marqués départagent les ex-aequo.
            </div>
          </div>
        </section>

        {/* Scénario élimination */}
        <section>
          <h2 className="text-2xl font-bold text-[#022149] mb-4 flex items-center gap-2">
            <TrendingDown className="h-6 w-6 text-red-500" />
            Scénario d&apos;élimination (pire cas)
          </h2>
          <div className="rounded-xl border-l-4 border-l-red-500 border border-gray-200 p-5 space-y-3">
            <div className="flex items-start gap-3">
              <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
              <p className="text-gray-700">
                <strong>0-1 point</strong> — Finir dernier du groupe avec 3 défaites ou 1 nul + 2 défaites = élimination certaine.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
              <p className="text-gray-700">
                <strong>2-3 points + différence de buts négative</strong> — Finir 3ème avec un goal-average catastrophique peut être insuffisant.
              </p>
            </div>
            <div className="bg-red-50 rounded-lg p-3 text-sm text-gray-600">
              <AlertTriangle className="h-5 w-5 inline-block" /> {team.name} serait éliminée si elle termine 4ème du groupe ou parmi les 4 pires 3èmes.
            </div>
          </div>
        </section>

        {/* Matchs clés */}
        <section>
          <h2 className="text-2xl font-bold text-[#022149] mb-4 flex items-center gap-2">
            <Target className="h-6 w-6 text-[#00B865]" />
            Matchs clés à surveiller
          </h2>
          <div className="space-y-3">
            {teamMatches.map((m) => {
              const home = teamsById[m.homeTeamId];
              const away = teamsById[m.awayTeamId];
              const homeName = home?.name ?? "À déterminer";
              const awayName = away?.name ?? "À déterminer";
              const homeFlag = home?.flag ?? "🏳️";
              const awayFlag = away?.flag ?? "🏳️";
              const dateStr = new Date(m.date).toLocaleDateString("fr-FR", {
                weekday: "short",
                day: "numeric",
                month: "long",
              });
              return (
                <Link
                  key={m.id}
                  href={`/match/${m.slug}`}
                  className="flex items-center justify-between rounded-xl border border-gray-200 p-4 hover:border-[#00B865] transition"
                >
                  <div>
                    <div className="font-bold text-[#022149]">
                      {homeFlag} {homeName} vs {awayFlag} {awayName}
                    </div>
                    <div className="text-xs text-gray-500">
                      J{m.matchday} — {dateStr} — {m.time} UTC
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA simulateur */}
        <section className="text-center py-8">
          <Link
            href="/simulateur"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-8 font-bold text-lg hover:opacity-90 transition"
          >
            Simuler les résultats du Groupe {team.group}
            <ArrowRight className="h-5 w-5" />
          </Link>
          <div className="mt-4 flex justify-center gap-6">
            <Link href={`/equipe/${team.slug}`} className="text-sm text-[#022149] underline hover:no-underline">
              Fiche de {team.name}
            </Link>
            <Link href={`/groupe/${team.group.toLowerCase()}`} className="text-sm text-[#022149] underline hover:no-underline">
              Classement Groupe {team.group}
            </Link>
          </div>
        </section>

        <FAQSection title="Questions sur la qualification" items={faqItems} />

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
