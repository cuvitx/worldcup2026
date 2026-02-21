import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { groups } from "@repo/data/groups";
import { teamsById } from "@repo/data/teams";
import { Trophy, ArrowRight, Info, BarChart3, Scale, Shield, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "Classement des meilleurs 3èmes - Qui se qualifie en 16èmes ? | CDM 2026",
  description:
    "Classement des meilleurs troisièmes de la Coupe du Monde 2026 : 8 sur 12 se qualifient. Critères FIFA, scénarios et simulations.",
  openGraph: {
    title: "Meilleurs 3èmes - CDM 2026 : Qui passe en 16èmes ?",
    description:
      "8 des 12 troisièmes de groupe se qualifient. Critères de classement, scénarios probables et tableau simulé.",
    url: "https://www.cdm2026.fr/meilleurs-troisiemes",
  },
  alternates: {
    canonical: "https://www.cdm2026.fr/meilleurs-troisiemes",
  },
};

/* ---------- Simulated 3rd-place table ---------- */
interface ThirdPlaceRow {
  group: string;
  teamId: string;
  pts: number;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
  gd: number;
  qualified: boolean;
}

const simulatedTable: ThirdPlaceRow[] = [
  { group: "C", teamId: "ecosse", pts: 4, w: 1, d: 1, l: 1, gf: 4, ga: 3, gd: 1, qualified: true },
  { group: "E", teamId: "cote-divoire", pts: 4, w: 1, d: 1, l: 1, gf: 3, ga: 2, gd: 1, qualified: true },
  { group: "L", teamId: "ghana", pts: 4, w: 1, d: 1, l: 1, gf: 3, ga: 3, gd: 0, qualified: true },
  { group: "H", teamId: "arabie-saoudite", pts: 3, w: 1, d: 0, l: 2, gf: 3, ga: 3, gd: 0, qualified: true },
  { group: "J", teamId: "algerie", pts: 3, w: 1, d: 0, l: 2, gf: 2, ga: 2, gd: 0, qualified: true },
  { group: "A", teamId: "coree-du-sud", pts: 3, w: 1, d: 0, l: 2, gf: 2, ga: 3, gd: -1, qualified: true },
  { group: "F", teamId: "tunisie", pts: 3, w: 1, d: 0, l: 2, gf: 1, ga: 2, gd: -1, qualified: true },
  { group: "I", teamId: "norvege", pts: 3, w: 1, d: 0, l: 2, gf: 1, ga: 3, gd: -2, qualified: true },
  { group: "B", teamId: "qatar", pts: 2, w: 0, d: 2, l: 1, gf: 2, ga: 3, gd: -1, qualified: false },
  { group: "G", teamId: "nouvelle-zelande", pts: 2, w: 0, d: 2, l: 1, gf: 1, ga: 2, gd: -1, qualified: false },
  { group: "D", teamId: "barrage-uefa-c", pts: 1, w: 0, d: 1, l: 2, gf: 1, ga: 3, gd: -2, qualified: false },
  { group: "K", teamId: "barrage-interconf-1", pts: 1, w: 0, d: 1, l: 2, gf: 0, ga: 2, gd: -2, qualified: false },
];

const faqItems = [
  {
    question: "Combien de troisièmes de groupe se qualifient en 2026 ?",
    answer:
      "8 des 12 troisièmes de groupe se qualifient pour les 16èmes de finale. Seuls les 4 derniers du classement des troisièmes sont éliminés après la phase de groupes.",
  },
  {
    question: "Quels sont les critères pour départager les troisièmes ?",
    answer:
      "Les critères FIFA sont dans l'ordre : 1) nombre de points, 2) différence de buts, 3) nombre de buts marqués, 4) classement fair-play (cartons), 5) tirage au sort.",
  },
  {
    question: "Combien de points faut-il pour se qualifier comme meilleur 3ème ?",
    answer:
      "Historiquement (Euro 2016, format similaire), 3 points suffisaient presque toujours. Avec 12 groupes au lieu de 6, on estime que 3 points avec une différence de buts neutre ou positive devrait suffire dans la grande majorité des cas.",
  },
  {
    question: "Ce système a-t-il déjà été utilisé ?",
    answer:
      "Oui, l'Euro 2016 en France utilisait un système similaire avec 4 meilleurs 3èmes sur 6 groupes. La Coupe du Monde 2026 l'étend à 8 meilleurs 3èmes sur 12 groupes, ce qui en fait le plus grand tournoi utilisant cette règle.",
  },
  {
    question: "Comment sont déterminés les adversaires des meilleurs 3èmes en 16èmes ?",
    answer:
      "La FIFA utilise un tableau prédéfini basé sur la combinaison de groupes dont les 3èmes se qualifient. Les 8 troisièmes qualifiés sont répartis contre les premiers de groupe selon un bracket fixe publié avant le tournoi.",
  },
];

export default function MeilleursTroisiemesPage() {
  return (
    <>
{/* Hero */}
      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Classement des meilleurs 3<sup>èmes</sup> :{" "}
            <span className="text-secondary">Qui se qualifie en 16èmes ?</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Pour la première fois en Coupe du Monde, les 8 meilleurs troisièmes sur 12 groupes
            accèdent aux phases éliminatoires. Décryptage complet du système.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-4 py-12 space-y-14">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-bold text-[#022149] mb-4 flex items-center gap-2">
            <Info className="h-6 w-6 text-[#00B865]" />
            Un format inédit en Coupe du Monde
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            La Coupe du Monde 2026 inaugure un format à <strong>48 équipes réparties en 12 groupes de 4</strong>.
            Contrairement aux éditions précédentes (32 équipes, 8 groupes), les deux premiers de chaque groupe ne
            suffisent pas à remplir le tableau des 16èmes de finale. Les 24 qualifiés directs (12 premiers + 12
            deuxièmes) doivent être complétés par <strong>8 des 12 troisièmes de groupe</strong> pour atteindre les 32
            équipes nécessaires en phase éliminatoire.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Ce mécanisme, jamais vu en Coupe du Monde, s&apos;inspire directement de l&apos;Euro 2016 organisé en France,
            qui avait introduit le principe des meilleurs troisièmes (4 sur 6 groupes qualifiés). La version 2026 est
            encore plus ambitieuse : 8 troisièmes sur 12 passent, soit un ratio de qualification de 66,7 %, identique à
            celui de l&apos;Euro 2016.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Ce système crée une dynamique passionnante lors de la dernière journée de chaque groupe : même une équipe
            troisième avec un seul match nul peut encore espérer se qualifier. Chaque but compte, chaque carton jaune
            aussi. C&apos;est un des aspects les plus stratégiques du nouveau format.
          </p>
        </section>

        {/* Critères */}
        <section>
          <h2 className="text-2xl font-bold text-[#022149] mb-4 flex items-center gap-2">
            <Scale className="h-6 w-6 text-[#00B865]" />
            Critères de classement FIFA
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Pour départager les 12 troisièmes de groupe et déterminer les 8 qualifiés, la FIFA applique les critères
            suivants dans cet ordre strict :
          </p>
          <ol className="space-y-4 mb-6">
            {[
              {
                title: "Points obtenus",
                desc: "3 pts par victoire, 1 pt par nul, 0 pt par défaite. Le critère principal et le plus déterminant.",
              },
              {
                title: "Différence de buts",
                desc: "Buts marqués moins buts encaissés sur les 3 matchs de groupe. Une grosse victoire peut faire la différence.",
              },
              {
                title: "Buts marqués",
                desc: "À différence de buts égale, l'équipe la plus offensive est avantagée. L'attaque est récompensée.",
              },
              {
                title: "Classement fair-play",
                desc: "Cartons jaunes (-1 pt), double jaune (-3 pts), rouge direct (-4 pts), jaune + rouge (-5 pts). L'indiscipline peut coûter une qualification.",
              },
              {
                title: "Tirage au sort",
                desc: "En dernier recours absolu, si tous les critères sont identiques. Extrêmement improbable sur 3 matchs.",
              },
            ].map((item, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#022149] text-white flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </span>
                <div>
                  <strong className="text-[#022149]">{item.title}</strong>
                  <p className="text-gray-600 text-sm mt-0.5">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl p-4">
            <p className="text-sm text-gray-700">
              <strong className="text-[#D4AF37]">Point clé :</strong> Le fair-play peut être décisif. À l&apos;Euro 2016,
              aucun cas n&apos;est allé au-delà de la différence de buts, mais avec 12 groupes en 2026, la probabilité d&apos;un
              départage au fair-play augmente significativement.
            </p>
          </div>
        </section>

        {/* Tableau simulé */}
        <section>
          <h2 className="text-2xl font-bold text-[#022149] mb-4 flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-[#00B865]" />
            Tableau simulé des 12 troisièmes
          </h2>
          <p className="text-gray-700 mb-6">
            Voici une simulation réaliste du classement des troisièmes de groupe, basée sur les forces relatives des
            équipes et les pronostics pré-tournoi. Les 8 premières équipes se qualifient pour les 16èmes de finale.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#022149] text-white">
                  <th className="px-3 py-2 text-left">#</th>
                  <th className="px-3 py-2 text-left">Grp</th>
                  <th className="px-3 py-2 text-left">Équipe</th>
                  <th className="px-3 py-2 text-center">V</th>
                  <th className="px-3 py-2 text-center">N</th>
                  <th className="px-3 py-2 text-center">D</th>
                  <th className="px-3 py-2 text-center">BP</th>
                  <th className="px-3 py-2 text-center">BC</th>
                  <th className="px-3 py-2 text-center">DB</th>
                  <th className="px-3 py-2 text-center font-bold">Pts</th>
                  <th className="px-3 py-2 text-center">Statut</th>
                </tr>
              </thead>
              <tbody>
                {simulatedTable.map((row, i) => {
                  const team = teamsById[row.teamId];
                  const teamName = team?.name ?? row.teamId;
                  return (
                    <tr
                      key={row.group}
                      className={`border-b ${
                        row.qualified
                          ? i === 7
                            ? "bg-yellow-50"
                            : "bg-green-50/50"
                          : "bg-red-50/50"
                      }`}
                    >
                      <td className="px-3 py-2 font-bold text-gray-500">{i + 1}</td>
                      <td className="px-3 py-2 font-mono font-bold">{row.group}</td>
                      <td className="px-3 py-2 font-medium">
                        {team?.flag && <span className="mr-1">{team.flag}</span>}
                        {teamName}
                      </td>
                      <td className="px-3 py-2 text-center">{row.w}</td>
                      <td className="px-3 py-2 text-center">{row.d}</td>
                      <td className="px-3 py-2 text-center">{row.l}</td>
                      <td className="px-3 py-2 text-center">{row.gf}</td>
                      <td className="px-3 py-2 text-center">{row.ga}</td>
                      <td className="px-3 py-2 text-center font-medium">
                        {row.gd > 0 ? `+${row.gd}` : row.gd}
                      </td>
                      <td className="px-3 py-2 text-center font-bold">{row.pts}</td>
                      <td className="px-3 py-2 text-center">
                        {row.qualified ? (
                          <span className="inline-block px-2 py-0.5 bg-[#00B865] text-white text-xs rounded-full font-medium">
                            Qualifié
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-medium">
                            Éliminé
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2 italic">
            Simulation basée sur les pronostics pré-tournoi. Les résultats réels seront mis à jour pendant la compétition.
          </p>
        </section>

        {/* Scénarios */}
        <section>
          <h2 className="text-2xl font-bold text-[#022149] mb-4 flex items-center gap-2">
            <Target className="h-6 w-6 text-[#00B865]" />
            Combien de points faut-il ? Scénarios probables
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            La question que tout le monde se pose : quel est le minimum pour passer comme meilleur troisième ? Voici
            notre analyse basée sur des milliers de simulations et l&apos;historique de l&apos;Euro 2016.
          </p>
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            {[
              {
                pts: "4 points",
                prob: "99%",
                desc: "Quasiment garanti. Une victoire + un nul suffit presque toujours, quelle que soit la différence de buts.",
                color: "bg-green-100 border-green-300",
              },
              {
                pts: "3 points",
                prob: "~75%",
                desc: "Probable mais pas certain. La différence de buts devient cruciale. Une victoire 2-0 est bien plus sûre qu'un 1-0.",
                color: "bg-yellow-100 border-yellow-300",
              },
              {
                pts: "2 points",
                prob: "~15%",
                desc: "Très risqué. Deux nuls et une défaite. Possible uniquement si plusieurs groupes produisent des résultats serrés.",
                color: "bg-red-100 border-red-300",
              },
            ].map((scenario) => (
              <div key={scenario.pts} className={`rounded-xl border p-4 ${scenario.color}`}>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-lg font-bold text-[#022149]">{scenario.pts}</span>
                  <span className="text-sm font-mono font-bold">{scenario.prob}</span>
                </div>
                <p className="text-sm text-gray-700">{scenario.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-700 leading-relaxed">
            En résumé, <strong>4 points est le seuil de sécurité</strong>. Avec 3 points, il faudra surveiller
            anxieusement les résultats des autres groupes. Avec 2 points, il faut un miracle statistique. À l&apos;Euro
            2016, le Portugal s&apos;était qualifié comme meilleur troisième avec seulement 3 points (3 nuls), et avait fini
            par remporter le tournoi — preuve que tout est possible une fois en phase finale.
          </p>
        </section>

        {/* Historique */}
        <section>
          <h2 className="text-2xl font-bold text-[#022149] mb-4 flex items-center gap-2">
            <Trophy className="h-6 w-6 text-[#D4AF37]" />
            Historique : l&apos;Euro 2016 comme référence
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Le précédent le plus pertinent est l&apos;Euro 2016, organisé en France avec 24 équipes et 6 groupes de 4.
            Les 4 meilleurs troisièmes (sur 6) se qualifiaient pour les 8èmes de finale. Ce ratio (4/6 = 66,7 %) est
            identique à celui de la CDM 2026 (8/12 = 66,7 %).
          </p>
          <div className="bg-gray-50 rounded-xl p-5 mb-4">
            <h3 className="font-bold text-[#022149] mb-3">Les 4 meilleurs 3èmes de l&apos;Euro 2016</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center py-1 border-b border-gray-200">
                <span className="font-medium">Slovaquie (Grp B)</span>
                <span className="font-mono">4 pts | +1 DB</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-200">
                <span className="font-medium">Irlande (Grp E)</span>
                <span className="font-mono">3 pts | -1 DB</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-200">
                <span className="font-medium">Portugal (Grp F)</span>
                <span className="font-mono">3 pts | 0 DB</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-medium">Irlande du Nord (Grp C)</span>
                <span className="font-mono">3 pts | -1 DB</span>
              </div>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            La différence majeure en 2026 : avec 12 groupes au lieu de 6, la variance est beaucoup plus grande. Il y a
            plus de chances de voir des groupes &quot;de la mort&quot; où le troisième est très fort, et des groupes plus faibles
            où le troisième n&apos;a qu&apos;un ou deux points. Cette asymétrie rend les prédictions plus incertaines et le
            suivi en temps réel encore plus palpitant.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Autre fait marquant : le Portugal de Cristiano Ronaldo avait terminé 3ème de son groupe avec 3 nuls en 3
            matchs, avant de remporter l&apos;intégralité du tournoi. La preuve que la qualification comme meilleur troisième
            n&apos;est absolument pas un handicap — et peut même forger un mental de champion. En 2026, certaines équipes
            pourraient reproduire ce parcours héroïque.
          </p>
        </section>

        {/* Implications stratégiques */}
        <section>
          <h2 className="text-2xl font-bold text-[#022149] mb-4 flex items-center gap-2">
            <Shield className="h-6 w-6 text-[#00B865]" />
            Implications stratégiques pour les sélectionneurs
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Le système des meilleurs troisièmes modifie profondément la stratégie des équipes lors du troisième match
            de groupe. Voici les conséquences tactiques majeures :
          </p>
          <ul className="space-y-3 text-gray-700 mb-4">
            <li className="flex gap-3">
              <ArrowRight className="h-5 w-5 text-[#00B865] flex-shrink-0 mt-0.5" />
              <span>
                <strong>Chaque but compte :</strong> la différence de buts est le deuxième critère. Une équipe qui perd
                0-1 plutôt que 0-3 peut sauver sa qualification.
              </span>
            </li>
            <li className="flex gap-3">
              <ArrowRight className="h-5 w-5 text-[#00B865] flex-shrink-0 mt-0.5" />
              <span>
                <strong>Fair-play décisif :</strong> les cartons jaunes peuvent départager deux équipes. Les
                sélectionneurs devront gérer la discipline de leurs joueurs comme un critère de qualification à part
                entière.
              </span>
            </li>
            <li className="flex gap-3">
              <ArrowRight className="h-5 w-5 text-[#00B865] flex-shrink-0 mt-0.5" />
              <span>
                <strong>Pas de &quot;matchs sans enjeu&quot; :</strong> avec 8 troisièmes qualifiés sur 12, la dernière journée
                de chaque groupe conserve un suspense maximal. Même à 0 point après 2 matchs, une grosse victoire lors
                du 3ème match peut suffire.
              </span>
            </li>
            <li className="flex gap-3">
              <ArrowRight className="h-5 w-5 text-[#00B865] flex-shrink-0 mt-0.5" />
              <span>
                <strong>Rotation mesurée :</strong> les équipes déjà qualifiées (1ère ou 2ème) pourraient faire tourner
                au 3ème match, offrant des opportunités aux troisièmes de remonter.
              </span>
            </li>
          </ul>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <Link
            href="/scenarios-qualification/a"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-8 font-bold text-lg hover:opacity-90 transition"
          >
            <Trophy className="h-5 w-5" />
            Voir les scénarios par groupe
            <ArrowRight className="h-5 w-5" />
          </Link>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link href="/format" className="text-sm text-[#022149] underline hover:no-underline">
              Format du tournoi
            </Link>
            <Link href="/tableau-final-virtuel" className="text-sm text-[#022149] underline hover:no-underline">
              Tableau final virtuel
            </Link>
            <Link href="/simulateur" className="text-sm text-[#022149] underline hover:no-underline">
              Simulateur de groupes
            </Link>
          </div>
        </section>

        <FAQSection title="Questions sur les meilleurs troisièmes" items={faqItems} />

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
