import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { FAQSection } from "@repo/ui/faq-section";
import { domains } from "@repo/data/route-mapping";
import { RelatedLinks } from "../components/RelatedLinks";
import { TableOfContents } from "@repo/ui";
import { Smile, Heart, Users, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Mascotte Coupe du Monde 2026 - Découvrez la mascotte officielle | CDM 2026",
  description:
    "Découvrez la mascotte officielle de la Coupe du Monde 2026. Histoire, signification et rôle de la mascotte dans la plus grande compétition de football.",
  openGraph: {
    title: "Mascotte Coupe du Monde 2026",
    description:
      "Découvrez la mascotte officielle de la CDM 2026, son histoire et sa signification pour le tournoi.",
    url: "https://cdm2026.fr/mascotte",
  },
  alternates: {
    canonical: "https://cdm2026.fr/mascotte",
  },
};

const faqItems = [
  {
    question: "Quelle est la mascotte de la Coupe du Monde 2026 ?",
    answer: "La mascotte officielle de la Coupe du Monde 2026 sera annoncée par la FIFA courant 2025. Traditionnellement, les mascottes sont dévoilées environ un an avant le début du tournoi. Restez connectés pour découvrir le personnage qui incarnera l'esprit de cette édition historique à 48 équipes."
  },
  {
    question: "Quand la mascotte de la CDM 2026 sera-t-elle révélée ?",
    answer: "La FIFA n'a pas encore annoncé la date exacte de présentation de la mascotte 2026. Selon les éditions précédentes, elle devrait être dévoilée entre avril et juin 2025, soit environ un an avant le coup d'envoi du tournoi le 11 juin 2026. Un événement spécial est généralement organisé pour cette révélation."
  },
  {
    question: "Quelle était la mascotte de la Coupe du Monde 2022 ?",
    answer: "La mascotte de la Coupe du Monde 2022 au Qatar était La'eeb, un keffieh (coiffe traditionnelle arabe) animé qui symbolise l'hospitalité et la culture qatarie. Son nom signifie 'joueur super-talentueux' en arabe. La'eeb était conçu pour incarner l'enthousiasme et la joie du football."
  },
  {
    question: "Quel est le rôle d'une mascotte de Coupe du Monde ?",
    answer: "La mascotte joue plusieurs rôles clés : incarner l'identité et la culture du pays hôte, créer un lien émotionnel avec les jeunes supporters, servir d'ambassadeur marketing pour promouvoir le tournoi, animer les événements et cérémonies officielles, et générer des revenus via la vente de produits dérivés (peluches, vêtements, etc.)."
  },
  {
    question: "Quelle est la mascotte la plus célèbre de l'histoire de la CDM ?",
    answer: "Plusieurs mascottes sont iconiques : Footix (France 1998), le coq bleu tricolore ; Naranjito (Espagne 1982), l'orange souriante ; Zakumi (Afrique du Sud 2010), le léopard aux cheveux verts ; et Striker (États-Unis 1994), le chien habillé en footballeur. Footix reste particulièrement mémorable en France grâce à la victoire des Bleus en 1998."
  },
  {
    question: "La mascotte 2026 représentera-t-elle les trois pays hôtes ?",
    answer: "C'est très probable ! Étant donné que la Coupe du Monde 2026 est co-organisée par les États-Unis, le Canada et le Mexique, la FIFA pourrait créer une mascotte qui fusionne des éléments culturels des trois nations. Ou bien trois mascottes distinctes représentant chaque pays hôte. Nous le saurons lors de l'annonce officielle."
  }
];

export default function MascottePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "/" },
          { name: "Mascotte CDM 2026", url: "/mascotte" },
        ]}
        baseUrl={domains.fr}
      />

      {/* Hero */}
      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-secondary uppercase tracking-widest mb-2">
            Mascotte officielle
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Mascotte Coupe du Monde 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto mb-6">
            Découvrez la mascotte officielle de la CDM 2026, symbole de l'esprit festif
            et inclusif du plus grand tournoi de football au monde.
          </p>
          <div className="flex justify-center">
            <div className="text-8xl">🏆</div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:grid lg:grid-cols-[1fr_220px] lg:gap-8">
        <div>
          {/* Introduction */}
          <div className="mb-12">
            <h2 id="introduction" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Un symbole attendu pour 2026
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
              La <strong>mascotte officielle de la Coupe du Monde 2026</strong> n'a pas encore été révélée par la FIFA.
              Selon la tradition, elle devrait être dévoilée au cours de l'année 2025, environ 12 à 18 mois avant le coup d'envoi
              du tournoi le <strong>11 juin 2026</strong>.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
              Cette édition étant co-organisée par <strong>trois pays</strong> (États-Unis, Canada et Mexique),
              la mascotte pourrait représenter un concept fédérateur entre ces trois nations, ou bien se décliner
              en plusieurs personnages incarnant chacun l'identité culturelle d'un pays hôte.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Quoi qu'il en soit, la mascotte 2026 aura pour mission d'incarner l'esprit de ce tournoi historique,
              le premier à réunir <strong>48 équipes</strong>, et de toucher le cœur des supporters du monde entier,
              en particulier les jeunes générations.
            </p>
          </div>

          {/* Rôle de la mascotte */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Smile className="w-7 h-7 text-accent" />
              <h2 id="role-mascotte" className="text-2xl font-bold text-gray-900 dark:text-white">
                Le rôle d'une mascotte de Coupe du Monde
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Globe className="w-6 h-6 text-accent" />
                  <h3 className="font-bold text-gray-900 dark:text-white">Ambassadeur culturel</h3>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  La mascotte représente l'identité, les valeurs et la culture du ou des pays hôtes.
                  Elle permet de créer un lien émotionnel entre le tournoi et les supporters du monde entier,
                  tout en mettant en lumière les traditions locales.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-6 h-6 text-accent" />
                  <h3 className="font-bold text-gray-900 dark:text-white">Connexion avec les enfants</h3>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  Les mascottes sont conçues pour séduire les plus jeunes supporters. Elles incarnent la joie,
                  le fair-play et l'esprit sportif, et deviennent souvent des icônes pour toute une génération de fans.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="w-6 h-6 text-accent" />
                  <h3 className="font-bold text-gray-900 dark:text-white">Marketing & Merchandising</h3>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  La mascotte génère d'importants revenus via la vente de produits dérivés (peluches, vêtements, accessoires).
                  Elle est omniprésente dans les campagnes publicitaires et événements officiels du tournoi.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Smile className="w-6 h-6 text-accent" />
                  <h3 className="font-bold text-gray-900 dark:text-white">Animation des événements</h3>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  Présente lors des cérémonies d'ouverture et de clôture, des Fan Zones, des avant-matchs et événements promotionnels,
                  la mascotte anime et divertit les foules tout au long du tournoi.
                </p>
              </div>
            </div>
          </div>

          {/* Histoire des mascottes */}
          <div className="mb-12">
            <h2 id="histoire-mascottes" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Histoire des mascottes de la Coupe du Monde
            </h2>
            
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-slate-900">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
                        Année
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
                        Pays
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
                        Mascotte
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                    {[
                      { annee: "2022", pays: "Qatar", nom: "La'eeb", desc: "Keffieh animé (coiffe arabe)" },
                      { annee: "2018", pays: "Russie", nom: "Zabivaka", desc: "Loup souriant en maillot" },
                      { annee: "2014", pays: "Brésil", nom: "Fuleco", desc: "Tatou à carapace jaune et bleue" },
                      { annee: "2010", pays: "Afrique du Sud", nom: "Zakumi", desc: "Léopard aux cheveux verts" },
                      { annee: "2006", pays: "Allemagne", nom: "Goleo VI", desc: "Lion avec ballon parlant Pille" },
                      { annee: "2002", pays: "Corée/Japon", nom: "Ato, Kaz & Nik", desc: "Trio futuriste orange/violet/bleu" },
                      { annee: "1998", pays: "France", nom: "Footix", desc: "Coq bleu, blanc, rouge" },
                      { annee: "1994", pays: "USA", nom: "Striker", desc: "Chien habillé en footballeur" },
                      { annee: "1990", pays: "Italie", nom: "Ciao", desc: "Bonhomme aux couleurs de l'Italie" },
                      { annee: "1986", pays: "Mexique", nom: "Pique", desc: "Piment jalapeno portant un sombrero" },
                      { annee: "1982", pays: "Espagne", nom: "Naranjito", desc: "Orange souriante" },
                      { annee: "1978", pays: "Argentine", nom: "Gauchito", desc: "Garçon en tenue de gaucho" },
                      { annee: "1974", pays: "Allemagne", nom: "Tip & Tap", desc: "Deux garçons (Allemagne Ouest/Est)" },
                      { annee: "1966", pays: "Angleterre", nom: "World Cup Willie", desc: "Lion en maillot britannique (1ère mascotte)" },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap font-bold text-accent">
                          {row.annee}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {row.pays}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap font-semibold text-gray-900 dark:text-white">
                          {row.nom}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                          {row.desc}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong className="text-accent">Anecdote :</strong> World Cup Willie (Angleterre 1966) est la toute première
                mascotte officielle d'une Coupe du Monde. Depuis, chaque édition a eu sa mascotte, devenant un symbole
                indissociable du tournoi et un objet de collection pour les fans.
              </p>
            </div>
          </div>

          {/* Spéculations 2026 */}
          <div className="mb-12">
            <h2 id="speculations-2026" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Spéculations pour la mascotte 2026
            </h2>
            
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                Étant donné que la Coupe du Monde 2026 sera co-organisée par <strong>trois pays</strong> (États-Unis, Canada, Mexique),
                plusieurs scénarios sont envisageables pour la mascotte :
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                  <div>
                    <strong className="text-gray-900 dark:text-white">Une mascotte unique et fédératrice :</strong>
                    <p className="mt-1">
                      Un personnage qui incarne les valeurs communes des trois nations (diversité, unité, innovation).
                      Elle pourrait intégrer des éléments visuels des trois cultures.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                  <div>
                    <strong className="text-gray-900 dark:text-white">Trois mascottes complémentaires :</strong>
                    <p className="mt-1">
                      Comme en 2002 (Corée/Japon avec Ato, Kaz & Nik), chaque pays hôte pourrait avoir sa propre mascotte,
                      formant ensemble un trio symbolique.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                  <div>
                    <strong className="text-gray-900 dark:text-white">Inspiration des animaux emblématiques :</strong>
                    <p className="mt-1">
                      Aigle (USA), castor ou orignal (Canada), aigle royal ou jaguar (Mexique) pourraient servir de base.
                      Ou un animal mythique fusionnant ces trois identités.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 grid sm:grid-cols-3 gap-4">
            {[
              { href: "/histoire", label: "Histoire de la CDM", desc: "Timeline depuis 1930" },
              { href: "/pays-hotes", label: "Pays hôtes", desc: "USA, Canada, Mexique" },
              { href: "/actualites", label: "Actualités", desc: "Dernières infos CDM 2026" },
            ].map(({ href, label, desc }) => (
              <Link
                key={href}
                href={href}
                className="flex flex-col gap-2 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 shadow-sm hover:border-accent/30 hover:shadow-md transition-all group text-center"
              >
                <div className="font-bold text-gray-900 dark:text-white group-hover:text-accent transition-colors">
                  {label}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{desc}</div>
              </Link>
            ))}
          </div>
        </div>

        <TableOfContents items={[
          { id: "introduction", label: "Introduction", level: 2 },
          { id: "role-mascotte", label: "Rôle de la mascotte", level: 2 },
          { id: "histoire-mascottes", label: "Histoire des mascottes", level: 2 },
          { id: "speculations-2026", label: "Spéculations 2026", level: 2 },
        ]} />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><RelatedLinks variant="compact" title="Pages liées" links={[
          { href: "/histoire", title: "Histoire de la CDM", description: "Retour sur toutes les éditions", icon: "📖" },
          { href: "/pays-hotes", title: "Pays hôtes", description: "USA, Canada, Mexique", icon: "🌎" },
          { href: "/billets", title: "Billets CDM 2026", description: "Comment acheter vos places", icon: "🎟️" },
          { href: "/quiz", title: "Quiz CDM", description: "Testez vos connaissances", icon: "🧠" },
        ]} /></div>
      <FAQSection title="Questions sur la mascotte" items={faqItems} />

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Mascotte Coupe du Monde 2026 - Découvrez la mascotte officielle",
            description: "Découvrez la mascotte officielle de la Coupe du Monde 2026, son histoire et sa signification.",
            url: "https://cdm2026.fr/mascotte",
          }),
        }}
      />
    </>
  );
}
