import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { TableOfContents } from "@repo/ui";
import { Shield, Users, Clock, Trophy, Target, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Règlement Coupe du Monde 2026 - Format 48 équipes, VAR, Remplacements | CDM 2026",
  description:
    "Règlement officiel de la Coupe du Monde 2026 : format à 48 équipes, 12 groupes, phases éliminatoires, VAR, nombre de remplacements, cartons et lois du jeu FIFA.",
  openGraph: {
    title: "Règlement CDM 2026 - Tout savoir sur les nouvelles règles",
    description:
      "Format, VAR, remplacements, cartons : découvrez le règlement complet de la Coupe du Monde 2026 avec 48 équipes.",
    url: "https://www.cdm2026.fr/reglement",
  },
  alternates: {
    canonical: "https://www.cdm2026.fr/reglement",
  },
};

const faqItems = [
  {
    question: "Combien de remplacements sont autorisés en Coupe du Monde 2026 ?",
    answer: "Chaque équipe peut effectuer jusqu'à 5 remplacements pendant le match, sur un maximum de 3 fenêtres de remplacement (hors mi-temps et prolongations). En cas de prolongation, un 6e remplacement supplémentaire est autorisé. Cette règle adoptée par la FIFA depuis 2020 vise à préserver la santé des joueurs."
  },
  {
    question: "Comment fonctionne la VAR en Coupe du Monde ?",
    answer: "La VAR (Video Assistant Referee) intervient uniquement pour 4 situations : buts, penalties, cartons rouges directs et erreur d'identité de joueur sanctionné. L'arbitre vidéo signale à l'arbitre de terrain si une erreur claire et évidente a été commise. L'arbitre peut alors consulter les images sur un écran latéral ou accepter la recommandation VAR."
  },
  {
    question: "Que se passe-t-il en cas d'égalité en phase de groupes ?",
    answer: "En phase de groupes, le classement se fait d'abord par points (3 pour une victoire, 1 pour un nul, 0 pour une défaite). En cas d'égalité de points, les critères de départage sont : 1) confrontations directes (points), 2) différence de buts dans les confrontations directes, 3) buts marqués dans les confrontations directes, 4) différence de buts générale, 5) buts marqués totaux, 6) fair-play (cartons), 7) tirage au sort FIFA."
  },
  {
    question: "Combien de joueurs peuvent être inscrits sur la liste ?",
    answer: "Chaque sélection peut inscrire 26 joueurs sur sa liste officielle pour la Coupe du Monde 2026, un quota augmenté par rapport aux 23 joueurs des éditions précédentes. Cette décision a été prise par la FIFA pour permettre une meilleure gestion des blessures et de la charge physique dans un tournoi de 7 matchs maximum."
  },
  {
    question: "Y a-t-il un but en or ou en argent en 2026 ?",
    answer: "Non. Le but en or (golden goal) et le but en argent (silver goal) ont été abandonnés par la FIFA depuis 2004. En cas d'égalité après 90 minutes en phase éliminatoire, deux prolongations de 15 minutes sont jouées. Si l'égalité persiste, une séance de tirs au but départage les équipes (5 tirs initiaux, puis mort subite)."
  },
  {
    question: "Peut-on remplacer un joueur blessé après le début du tournoi ?",
    answer: "Oui, depuis la Coupe du Monde 2022, la FIFA autorise le remplacement d'un joueur blessé ou malade dans la liste des 26 joueurs, même après le début de la compétition, tant que le joueur remplaçant était sur la liste élargie des réservistes soumise avant le tournoi. Le joueur remplacé ne peut plus participer au tournoi."
  }
];

export default function ReglementPage() {
  return (
    <>
{/* Hero */}
      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-2">
            Lois du jeu FIFA
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Règlement Coupe du Monde 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto mb-6">
            Format à 48 équipes, VAR, remplacements, cartons, phases éliminatoires :
            découvrez toutes les règles officielles du tournoi FIFA.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { val: "48", label: "Équipes" },
              { val: "12", label: "Groupes" },
              { val: "104", label: "Matchs" },
              { val: "5+1", label: "Remplacements" },
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
          {/* Format du tournoi */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-7 h-7 text-accent" />
              <h2 id="format-tournoi" className="text-2xl font-bold text-gray-900">
                Format du tournoi
              </h2>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Phase de groupes (12 groupes de 4 équipes)
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-bold mt-0.5">1</span>
                  <div>
                    <span className="font-semibold text-gray-900">48 équipes réparties en 12 groupes de 4</span>
                    <p className="text-sm text-gray-600 mt-1">
                      Chaque équipe affronte les 3 autres équipes de son groupe (3 matchs par équipe).
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-bold mt-0.5">2</span>
                  <div>
                    <span className="font-semibold text-gray-900">Les 2 premiers de chaque groupe se qualifient (24 équipes)</span>
                    <p className="text-sm text-gray-600 mt-1">
                      Les vainqueurs et dauphins de chaque groupe accèdent automatiquement aux huitièmes de finale.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-bold mt-0.5">3</span>
                  <div>
                    <span className="font-semibold text-gray-900">Les 8 meilleurs 3e se qualifient également (32 équipes qualifiées au total)</span>
                    <p className="text-sm text-gray-600 mt-1">
                      Un classement des 12 troisièmes est établi selon les critères : points, différence de buts, buts marqués, fair-play.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Phase éliminatoire (32 équipes → 1 champion)
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-accent flex-shrink-0" />
                  <span><strong>Huitièmes de finale :</strong> 32 équipes → 16 équipes (matchs à élimination directe)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-accent flex-shrink-0" />
                  <span><strong>Quarts de finale :</strong> 16 équipes → 8 équipes</span>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-accent flex-shrink-0" />
                  <span><strong>Demi-finales :</strong> 8 équipes → 4 équipes</span>
                </div>
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-accent flex-shrink-0" />
                  <span><strong>Petite finale :</strong> Match pour la 3e place</span>
                </div>
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-accent flex-shrink-0" />
                  <span><strong>Finale :</strong> Sacre du champion du monde</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600 italic">
                En cas d'égalité après 90 minutes : 2 × 15 minutes de prolongation, puis tirs au but si nécessaire.
              </p>
            </div>
          </div>

          {/* Règles de match */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-7 h-7 text-accent" />
              <h2 id="regles-match" className="text-2xl font-bold text-gray-900">
                Règles de match
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-accent" />
                  Effectif et remplacements
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span><strong>26 joueurs</strong> par sélection (liste officielle)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span><strong>11 joueurs</strong> sur le terrain + <strong>3 gardiens</strong> obligatoires dans la liste</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span><strong>5 remplacements</strong> maximum (sur 3 fenêtres, hors mi-temps)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span><strong>+1 remplacement</strong> supplémentaire en prolongation</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent" />
                  Durée de jeu
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span><strong>90 minutes</strong> (2 × 45 min) + temps additionnel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span><strong>Prolongations :</strong> 2 × 15 minutes (phase à élimination directe uniquement)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span><strong>Tirs au but :</strong> 5 tirs initiaux par équipe, puis mort subite</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span><strong>Pause :</strong> 15 minutes entre les deux mi-temps</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-accent" />
                  VAR (Video Assistant Referee)
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span><strong>Buts :</strong> validation ou annulation (hors-jeu, faute, main)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span><strong>Penalties :</strong> vérification des fautes dans la surface</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span><strong>Cartons rouges directs :</strong> révision des exclusions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span><strong>Erreur d'identité :</strong> rectification du joueur sanctionné</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-accent" />
                  Cartons et sanctions
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span><strong>Carton jaune :</strong> avertissement (2 jaunes = 1 rouge)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span><strong>Carton rouge :</strong> expulsion immédiate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span><strong>Suspension :</strong> 1 match minimum en cas de rouge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span><strong>Amnistie :</strong> cartons jaunes effacés après les quarts de finale</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Critères de départage */}
          <div className="mb-12">
            <h2 id="criteres-departage" className="text-2xl font-bold text-gray-900 mb-6">
              Critères de départage en phase de groupes
            </h2>
            
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <p className="text-sm text-gray-700 mb-4">
                En cas d'égalité de points entre deux équipes ou plus dans un groupe, l'ordre suivant s'applique :
              </p>
              <ol className="space-y-3">
                {[
                  "Points obtenus dans les confrontations directes entre les équipes à égalité",
                  "Différence de buts dans les confrontations directes",
                  "Buts marqués dans les confrontations directes",
                  "Différence de buts générale dans le groupe",
                  "Buts marqués dans le groupe",
                  "Points de fair-play (cartons jaunes = -1, carton rouge indirect = -3, carton rouge direct = -4, carton jaune + rouge = -5)",
                  "Tirage au sort effectué par la commission d'organisation de la FIFA"
                ].map((criterion, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{criterion}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Ballons et équipements */}
          <div className="mb-12">
            <h2 id="equipements" className="text-2xl font-bold text-gray-900 mb-6">
              Ballon et équipements officiels
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3">
                  Ballon officiel
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Ballon Adidas certifié FIFA Quality Pro</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Circonférence : 68-70 cm</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Poids : 410-450 grammes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Pression : 0,6-1,1 atmosphères</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3">
                  Équipements joueurs
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Maillot, short, chaussettes obligatoires</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Protège-tibias obligatoires</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Numéro de 1 à 26 sur le maillot</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Couleurs différentes entre les deux équipes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 grid sm:grid-cols-3 gap-4">
            {[
              { href: "/format", label: "Format du tournoi", desc: "Nouveau format 48 équipes" },
              { href: "/groupes", label: "Phase de groupes", desc: "12 groupes de 4 équipes" },
              { href: "/tableau", label: "Tableau éliminatoire", desc: "Bracket interactif" },
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
          { id: "format-tournoi", label: "Format du tournoi", level: 2 },
          { id: "regles-match", label: "Règles de match", level: 2 },
          { id: "criteres-departage", label: "Critères de départage", level: 2 },
          { id: "equipements", label: "Équipements", level: 2 },
        ]} />
      </div>

      <FAQSection title="Questions sur le règlement" items={faqItems} />

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Règlement Coupe du Monde 2026 - Format, VAR, Remplacements",
            description: "Règlement officiel de la Coupe du Monde 2026 : format à 48 équipes, VAR, remplacements et lois du jeu FIFA.",
            url: "https://www.cdm2026.fr/reglement",
          }),
        }}
      />
    </>
  );
}
