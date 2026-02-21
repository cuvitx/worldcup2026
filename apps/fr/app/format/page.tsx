import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { RelatedLinks } from "../components/RelatedLinks";
import { TableOfContents } from "@repo/ui";
import { AlertTriangle, ArrowRight, Check, Target, Trophy, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Format Coupe du Monde 2026 - 48 équipes, 12 groupes, Bracket | CDM 2026",
  description:
    "Format révolutionnaire de la CDM 2026 : 48 équipes, 12 groupes de 4, phases éliminatoires, meilleurs 3e qualifiés. Comparez avec l'ancien format 32 équipes.",
  openGraph: {
    title: "Format CDM 2026 - Nouveau système à 48 équipes",
    description:
      "Découvrez le nouveau format de la Coupe du Monde 2026 : 48 équipes, 12 groupes, 104 matchs. Phases, qualifications et bracket.",
    url: "https://www.cdm2026.fr/format",
  },
  alternates: {
    canonical: "https://www.cdm2026.fr/format",
  },
};

const faqItems = [
  {
    question: "Pourquoi la FIFA est-elle passée de 32 à 48 équipes ?",
    answer: "La FIFA a décidé d'élargir la Coupe du Monde à 48 équipes pour plusieurs raisons : augmenter la représentativité mondiale du football (plus de places pour l'Afrique, l'Asie et l'Amérique du Nord), générer des revenus supplémentaires grâce à plus de matchs (104 au lieu de 64), et offrir à davantage de nations l'opportunité de participer au plus grand événement sportif mondial."
  },
  {
    question: "Comment sont répartis les 48 places entre les confédérations ?",
    answer: "Les 48 places sont réparties ainsi : UEFA (Europe) 16 places, CAF (Afrique) 9 places, AFC (Asie) 8 places, CONMEBOL (Amérique du Sud) 6 places, CONCACAF (Amérique du Nord/Centrale/Caraïbes) 6 places dont 3 pour les pays hôtes (USA, Canada, Mexique), OFC (Océanie) 1 place, et 2 places via barrages intercontinentaux."
  },
  {
    question: "Combien de matchs doit jouer le champion du monde 2026 ?",
    answer: "Le champion du monde 2026 devra jouer 7 matchs au total : 3 matchs de phase de groupes, puis 4 matchs à élimination directe (huitièmes, quarts, demi-finale et finale). C'est le même nombre de matchs qu'avec l'ancien format 32 équipes, mais le parcours est différent avec 12 groupes au lieu de 8."
  },
  {
    question: "Qu'est-ce qui change pour les 3e de groupe ?",
    answer: "Avec le format 48 équipes, seuls les 8 meilleurs 3e de groupe (sur 12) se qualifient pour les huitièmes de finale, en plus des 24 premiers et deuxièmes. Un classement des 12 troisièmes est établi selon les critères : points, différence de buts, buts marqués et fair-play. Cette règle crée de l'incertitude jusqu'au dernier match de chaque groupe."
  },
  {
    question: "Y aura-t-il plus de matchs nuls avec 12 groupes ?",
    answer: "Potentiellement oui. Avec 12 groupes de 4 équipes au lieu de 8, certaines équipes pourraient jouer de manière plus prudente pour décrocher une place de 3e qualifié. Cependant, la règle des meilleurs 3e (seulement 8 sur 12 se qualifient) incite à marquer des buts pour améliorer la différence, ce qui devrait limiter les matchs trop défensifs."
  },
  {
    question: "Le format 48 équipes est-il définitif pour les prochaines éditions ?",
    answer: "Oui, la FIFA a confirmé que le format 48 équipes sera maintenu pour les éditions futures, notamment pour la Coupe du Monde 2030 (co-organisée par le Maroc, l'Espagne, le Portugal, l'Uruguay, l'Argentine et le Paraguay). Ce format est considéré comme un succès commercial et sportif par l'instance mondiale."
  }
];

export default function FormatPage() {
  return (
    <>
{/* Hero */}
      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-secondary uppercase tracking-widest mb-2">
            Nouveau format FIFA
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Format Coupe du Monde 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto mb-6">
            48 équipes, 12 groupes, 104 matchs : découvrez le nouveau format révolutionnaire
            de la première Coupe du Monde élargie de l'histoire.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { val: "48", label: "Équipes" },
              { val: "12", label: "Groupes" },
              { val: "104", label: "Matchs" },
              { val: "32", label: "Qualifiés 8e" },
            ].map(({ val, label }) => (
              <div key={label} className="rounded-xl bg-white/10 px-6 py-3 min-w-[110px]">
                <div className="text-3xl font-extrabold text-white">{val}</div>
                <div className="text-xs text-gray-200 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:grid lg:grid-cols-[1fr_220px] lg:gap-8">
        <div>
          {/* Introduction */}
          <div className="mb-12">
            <h2 id="introduction" className="text-2xl font-bold text-gray-900 mb-4">
              Une révolution dans l'histoire du Mondial
            </h2>
            <p className="text-gray-700 mb-3 leading-relaxed">
              La Coupe du Monde 2026 marque un tournant historique avec l'introduction d'un nouveau format à <strong>48 équipes</strong>,
              contre 32 lors des éditions précédentes (1998-2022). Ce changement radical, voté par le Conseil de la FIFA en janvier 2017,
              vise à rendre le tournoi plus inclusif en permettant à davantage de nations de participer à la plus grande compétition sportive mondiale.
            </p>
            <p className="text-gray-700 mb-3 leading-relaxed">
              Le format retenu divise les 48 équipes en <strong>12 groupes de 4 équipes</strong> chacun. Les deux premiers de chaque groupe
              se qualifient automatiquement pour les huitièmes de finale, accompagnés des <strong>8 meilleurs troisièmes</strong>.
              Au total, 32 équipes accèdent à la phase à élimination directe, contre 16 dans l'ancien format.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Cette nouvelle configuration porte le nombre total de matchs à <strong>104</strong> (contre 64 auparavant),
              allongeant la durée du tournoi à 39 jours (11 juin - 19 juillet 2026). Le champion du monde devra toujours jouer 7 matchs
              pour soulever le trophée, mais le parcours sera différent avec un premier tour élargi.
            </p>
          </div>

          {/* Schéma du format */}
          <div className="mb-12">
            <h2 id="schema-format" className="text-2xl font-bold text-gray-900 mb-6">
              Schéma du format 2026
            </h2>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-gray-200 p-8 shadow-sm">
              <div className="flex flex-col items-center gap-6">
                {/* Étape 1 : Phase de groupes */}
                <div className="w-full">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Users className="w-6 h-6 text-accent" />
                    <h3 className="text-xl font-bold text-gray-900">
                      1. Phase de groupes
                    </h3>
                  </div>
                  <div className="bg-white rounded-xl p-5 border border-gray-200">
                    <div className="text-center mb-3">
                      <p className="text-3xl font-extrabold text-accent">48 équipes</p>
                      <p className="text-sm text-gray-600 mt-1">
                        12 groupes de 4 équipes
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"].map((g) => (
                        <div key={g} className="bg-gray-50 rounded px-2 py-1.5 text-center font-semibold text-gray-900">
                          Groupe {g}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 mt-4 text-center">
                      Chaque équipe joue <strong>3 matchs</strong> (contre les 3 autres de son groupe)
                    </p>
                  </div>
                </div>

                <ArrowRight className="w-8 h-8 text-accent rotate-90 sm:rotate-0" />

                {/* Étape 2 : Qualification */}
                <div className="w-full">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Target className="w-6 h-6 text-accent" />
                    <h3 className="text-xl font-bold text-gray-900">
                      2. Qualification pour les 8e de finale
                    </h3>
                  </div>
                  <div className="bg-white rounded-xl p-5 border border-gray-200">
                    <div className="grid sm:grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-extrabold text-accent">12</p>
                        <p className="text-xs text-gray-600 mt-1">
                          Vainqueurs de groupe (1er)
                        </p>
                      </div>
                      <div>
                        <p className="text-2xl font-extrabold text-accent">12</p>
                        <p className="text-xs text-gray-600 mt-1">
                          Deuxièmes de groupe
                        </p>
                      </div>
                      <div>
                        <p className="text-2xl font-extrabold text-secondary">8</p>
                        <p className="text-xs text-gray-600 mt-1">
                          Meilleurs 3e (sur 12)
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                      <p className="text-3xl font-extrabold text-accent">32 équipes qualifiées</p>
                      <p className="text-sm text-gray-600 mt-1">
                        pour les huitièmes de finale
                      </p>
                    </div>
                  </div>
                </div>

                <ArrowRight className="w-8 h-8 text-accent rotate-90 sm:rotate-0" />

                {/* Étape 3 : Phase à élimination directe */}
                <div className="w-full">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Trophy className="w-6 h-6 text-secondary" />
                    <h3 className="text-xl font-bold text-gray-900">
                      3. Phase à élimination directe
                    </h3>
                  </div>
                  <div className="bg-white rounded-xl p-5 border border-gray-200">
                    <div className="flex items-center justify-between text-center gap-2">
                      <div className="flex-1">
                        <p className="text-xl font-bold text-gray-900">32</p>
                        <p className="text-xs text-gray-600 mt-1">1/8</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <div className="flex-1">
                        <p className="text-xl font-bold text-gray-900">16</p>
                        <p className="text-xs text-gray-600 mt-1">1/4</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <div className="flex-1">
                        <p className="text-xl font-bold text-gray-900">8</p>
                        <p className="text-xs text-gray-600 mt-1">1/2</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <div className="flex-1">
                        <p className="text-xl font-bold text-gray-900">4</p>
                        <p className="text-xs text-gray-600 mt-1">Finale</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <div className="flex-1">
                        <p className="text-xl font-bold text-secondary">1</p>
                        <p className="text-xs text-gray-600 mt-1">Champion</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mt-4 text-center">
                      Matchs à élimination directe (prolongations + tirs au but si nécessaire)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comparaison ancien vs nouveau format */}
          <div className="mb-12">
            <h2 id="comparaison" className="text-2xl font-bold text-gray-900 mb-6">
              Ancien format (32 équipes) vs Nouveau format (48 équipes)
            </h2>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Critère
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Format 32 (1998-2022)
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Format 48 (2026+)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { critere: "Nombre d'équipes", ancien: "32", nouveau: "48" },
                      { critere: "Nombre de groupes", ancien: "8 groupes de 4", nouveau: "12 groupes de 4" },
                      { critere: "Qualifiés 8e de finale", ancien: "16 équipes (1er + 2e)", nouveau: "32 équipes (1er + 2e + 8 meilleurs 3e)" },
                      { critere: "Nombre total de matchs", ancien: "64 matchs", nouveau: "104 matchs" },
                      { critere: "Matchs par équipe (min)", ancien: "3 matchs", nouveau: "3 matchs" },
                      { critere: "Matchs par équipe (max)", ancien: "7 matchs (champion)", nouveau: "7 matchs (champion)" },
                      { critere: "Durée du tournoi", ancien: "~32 jours", nouveau: "~39 jours" },
                      { critere: "Places UEFA (Europe)", ancien: "13", nouveau: "16" },
                      { critere: "Places CAF (Afrique)", ancien: "5", nouveau: "9" },
                      { critere: "Places AFC (Asie)", ancien: "4,5", nouveau: "8" },
                      { critere: "Places CONMEBOL (Am. Sud)", ancien: "4,5", nouveau: "6" },
                      { critere: "Places CONCACAF (Am. Nord)", ancien: "3,5", nouveau: "6 (dont 3 hôtes)" },
                      { critere: "Places OFC (Océanie)", ancien: "0,5", nouveau: "1" },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          {row.critere}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {row.ancien}
                        </td>
                        <td className="px-4 py-3 text-sm text-accent font-semibold">
                          {row.nouveau}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Règle des meilleurs 3e */}
          <div className="mb-12">
            <h2 id="meilleurs-3e" className="text-2xl font-bold text-gray-900 mb-6">
              Comment sont classés les meilleurs 3e ?
            </h2>
            
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <p className="text-sm text-gray-700 mb-4">
                Les 12 troisièmes de groupe sont classés entre eux selon les critères suivants (dans l'ordre) :
              </p>
              <ol className="space-y-3">
                {[
                  "Points obtenus dans le groupe",
                  "Différence de buts dans le groupe",
                  "Buts marqués dans le groupe",
                  "Points de fair-play (cartons jaunes = -1, rouge indirect = -3, rouge direct = -4)",
                  "Tirage au sort FIFA (en dernier recours)"
                ].map((criterion, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{criterion}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-5 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm text-gray-700">
                  <strong className="text-accent">Important :</strong> Seuls les 8 meilleurs troisièmes sur 12 se qualifient.
                  Finir 3e de son groupe ne garantit donc PAS automatiquement la qualification, contrairement au format Euro
                  (où 4 meilleurs 3e sur 6 se qualifient).
                </p>
              </div>
            </div>
          </div>

          {/* Avantages et inconvénients */}
          <div className="mb-12">
            <h2 id="avantages-inconvenients" className="text-2xl font-bold text-gray-900 mb-6">
              Avantages et inconvénients du nouveau format
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <h3 className="font-bold text-accent mb-3 flex items-center gap-2">
                  <span className="text-xl"><Check className="h-5 w-5 inline-block" /></span>
                  Avantages
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Plus de nations représentées (+50% d'équipes)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Plus de matchs pour les fans (104 vs 64)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Davantage de places pour l'Afrique et l'Asie</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Revenus accrus pour la FIFA et les fédérations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Expérience unique pour plus de joueurs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Plus d'incertitude et de suspense en phase de groupes</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <h3 className="font-bold text-red-600 mb-3 flex items-center gap-2">
                  <span className="text-xl"><AlertTriangle className="h-5 w-5 inline-block" /></span>
                  Inconvénients
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">•</span>
                    <span>Dilution du niveau sportif (équipes plus faibles)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">•</span>
                    <span>Tournoi plus long (fatigue des joueurs)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">•</span>
                    <span>Risque de matchs nuls tactiques pour viser la 3e place</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">•</span>
                    <span>Complexité du classement des meilleurs 3e</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">•</span>
                    <span>Coût organisationnel plus élevé (infrastructure)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">•</span>
                    <span>Impact environnemental accru (déplacements, émissions)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 grid sm:grid-cols-3 gap-4">
            {[
              { href: "/reglement", label: "Règlement complet", desc: "Toutes les règles FIFA" },
              { href: "/groupes", label: "Phase de groupes", desc: "12 groupes de 4 équipes" },
              { href: "/tableau", label: "Tableau éliminatoire", desc: "Bracket interactif 32 équipes" },
            ].map(({ href, label, desc }) => (
              <Link
                key={href}
                href={href}
                className="flex flex-col gap-2 bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:border-accent/30 hover:shadow-md transition-all group text-center"
              >
                <div className="font-bold text-gray-900 group-hover:text-accent transition-colors">
                  {label}
                </div>
                <div className="text-xs text-gray-600">{desc}</div>
              </Link>
            ))}
          </div>
        </div>

        <TableOfContents items={[
          { id: "introduction", label: "Introduction", level: 2 },
          { id: "schema-format", label: "Schéma du format", level: 2 },
          { id: "comparaison", label: "Comparaison 32 vs 48", level: 2 },
          { id: "meilleurs-3e", label: "Meilleurs 3e", level: 2 },
          { id: "avantages-inconvenients", label: "Avantages & Inconvénients", level: 2 },
        ]} />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><RelatedLinks variant="compact" title="Pages liées" links={[
          { href: "/groupes", title: "Les 12 groupes", description: "Composition de chaque groupe", icon: "" },
          { href: "/match/calendrier", title: "Calendrier des matchs", description: "Les 104 matchs de la CDM 2026", icon: "" },
          { href: "/simulateur", title: "Simulateur", description: "Simulez le tableau final", icon: "" },
          { href: "/tableau", title: "Tableau final", description: "Bracket des phases éliminatoires", icon: "" },
          { href: "/reglement", title: "Règlement", description: "Règles officielles de la CDM 2026", icon: "" },
        ]} /></div>
      <FAQSection title="Questions sur le format" items={faqItems} />

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Format Coupe du Monde 2026 - 48 équipes, 12 groupes",
            description: "Format révolutionnaire de la CDM 2026 : 48 équipes, 12 groupes de 4, phases éliminatoires et bracket complet.",
            url: "https://www.cdm2026.fr/format",
          }),
        }}
      />
    </>
  );
}
