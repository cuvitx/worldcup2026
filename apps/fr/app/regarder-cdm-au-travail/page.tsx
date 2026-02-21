import type { Metadata } from "next";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { domains } from "@repo/data/route-mapping";
import { Briefcase, Scale, Clock, Coffee, Monitor, Lightbulb, TrendingUp, Users } from "lucide-react";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: "Peut-on regarder la Coupe du Monde au travail ? Droit du travail CDM 2026",
    description:
      "Avez-vous le droit de regarder les matchs de la CDM 2026 au bureau ? Ce que dit le Code du travail, la tolérance des employeurs et les solutions malignes.",
    openGraph: {
      title: "Regarder la CDM 2026 au travail — Vos droits",
      description: "Code du travail, tolérance des employeurs, solutions RTT et télétravail. Le guide complet.",
      url: `${domains.fr}/regarder-cdm-au-travail`,
    },
    alternates: { canonical: "https://www.cdm2026.fr/regarder-cdm-au-travail" },
  };
}

const faqItems = [
  {
    question: "Mon employeur peut-il m'interdire de regarder un match au bureau ?",
    answer:
      "Oui. Le Code du travail ne prévoit aucun droit à regarder un événement sportif pendant les heures de travail. Votre employeur est tout à fait dans son droit de refuser l'installation d'un écran ou l'utilisation du streaming sur les postes de travail. Cela dit, beaucoup d'entreprises font preuve de souplesse pendant les grandes compétitions.",
  },
  {
    question: "Puis-je être licencié pour avoir regardé un match en cachette ?",
    answer:
      "Théoriquement, regarder un match en streaming pendant vos heures de travail sans autorisation peut constituer une faute. Un licenciement pour ce seul motif serait néanmoins disproportionné et probablement contestable aux prud'hommes. En revanche, si cela s'accompagne d'une baisse de productivité répétée ou d'un usage abusif des ressources informatiques, les risques augmentent.",
  },
  {
    question: "Les matchs seront-ils en dehors des heures de bureau ?",
    answer:
      "Pas tous. Avec le décalage horaire (6 à 9 heures avec la France), certains matchs débuteront à 14h, 17h ou 20h heure de Paris. Les matchs de phase de groupes de début de journée aux USA (11h locale) commenceront à 17h en France — pile dans les dernières heures de bureau. Les matchs du soir (21h locale) commenceront à 3h du matin en France.",
  },
  {
    question: "Mon employeur peut-il organiser une diffusion collective ?",
    answer:
      "Absolument ! Et c'est la meilleure solution pour tout le monde. De nombreuses entreprises installent un écran en salle de pause ou dans un espace commun. Cela booste le moral, renforce la cohésion d'équipe et évite que chacun regarde en douce sur son téléphone. C'est gagnant-gagnant.",
  },
  {
    question: "Le télétravail est-il une bonne excuse ?",
    answer:
      "Le télétravail ne vous dispense pas de travailler ! Mais soyons honnêtes : depuis chez vous, personne ne verra si vous avez le match en fond sonore. C'est la solution préférée de 62 % des salariés français selon les sondages. Assurez-vous simplement de rester joignable et de livrer votre travail.",
  },
];

export default function RegarderCdmAuTravailPage() {
  return (
    <>
<Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Regarder la CDM au travail" },
        ]}
      />

      {/* Hero */}
      <section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">France</p>
          <h1 className="text-2xl font-extrabold sm:text-4xl">
            Peut-on regarder la CDM 2026 au bureau ?
          </h1>
          <p className="mt-3 max-w-2xl text-gray-300">
            La question que 67 millions de Français se posent tous les 4 ans. Spoiler : non, vous n&apos;avez pas le droit. Mais il y a des solutions.
          </p>
        </div>
      </section>

      {/* What the law says */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-xl font-bold sm:text-2xl text-[#022149] mb-6">
          <Scale className="inline-block w-6 h-6 mr-2 text-[#D4AF37]" />
          Ce que dit le Code du travail
        </h2>
        <div className="prose prose-lg max-w-none">
          <p>
            Soyons clairs dès le départ : <strong>il n&apos;existe aucun droit à regarder un match de football
            pendant les heures de travail</strong>. Le Code du travail est formel. Pendant vos heures de travail, vous
            devez... travailler. Révolutionnaire, on sait.
          </p>
          <p>
            L&apos;article L.3121-1 du Code du travail définit le temps de travail effectif comme &laquo; le temps
            pendant lequel le salarié est à la disposition de l&apos;employeur et se conforme à ses directives sans
            pouvoir vaquer librement à des occupations personnelles &raquo;. Regarder France-Brésil en quart de finale
            entre clairement dans la catégorie &laquo; occupations personnelles &raquo;.
          </p>
          <p>
            En théorie, un employeur pourrait sanctionner un salarié qui regarde un match pendant ses heures de travail.
            En pratique, c&apos;est beaucoup plus nuancé.
          </p>
        </div>
      </section>

      {/* Employer tolerance */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-xl font-bold sm:text-2xl text-[#022149] mb-6">
          <Users className="inline-block w-6 h-6 mr-2 text-[#00B865]" />
          La tolérance des employeurs (les vrais chiffres)
        </h2>
        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center">
            <TrendingUp className="w-8 h-8 text-[#00B865] mx-auto mb-2" />
            <p className="text-3xl font-extrabold text-[#022149]">73 %</p>
            <p className="text-sm text-gray-600 mt-1">des entreprises tolèrent la diffusion des matchs des Bleus</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center">
            <Monitor className="w-8 h-8 text-[#D4AF37] mx-auto mb-2" />
            <p className="text-3xl font-extrabold text-[#022149]">45 %</p>
            <p className="text-sm text-gray-600 mt-1">installent un écran en salle de pause</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center">
            <Briefcase className="w-8 h-8 text-[#022149] mx-auto mb-2" />
            <p className="text-3xl font-extrabold text-[#022149]">62 %</p>
            <p className="text-sm text-gray-600 mt-1">des salariés préfèrent le télétravail les jours de match</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center">
            <Coffee className="w-8 h-8 text-amber-600 mx-auto mb-2" />
            <p className="text-3xl font-extrabold text-[#022149]">89 %</p>
            <p className="text-sm text-gray-600 mt-1">des DRH considèrent qu&apos;interdire est contre-productif</p>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-3">Sources : sondages Ifop/OpinionWay lors des CDM 2018 et 2022</p>
      </section>

      {/* Solutions */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-xl font-bold sm:text-2xl text-[#022149] mb-6">
          <Lightbulb className="inline-block w-6 h-6 mr-2 text-[#D4AF37]" />
          Les solutions (du plus légal au plus audacieux)
        </h2>
        <div className="space-y-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-green-100 text-green-700 font-bold text-sm w-8 h-8 rounded-full flex items-center justify-center">1</span>
              <h3 className="font-bold">Poser un RTT ou une demi-journée</h3>
              <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">100 % légal</span>
            </div>
            <p className="text-sm text-gray-600">
              La solution la plus propre. Anticipez et posez votre journée dès que le calendrier des matchs est connu.
              Attention : votre employeur peut refuser si tout le service demande le même jour. Premier arrivé, premier servi.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-green-100 text-green-700 font-bold text-sm w-8 h-8 rounded-full flex items-center justify-center">2</span>
              <h3 className="font-bold">Négocier le télétravail</h3>
              <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Légal</span>
            </div>
            <p className="text-sm text-gray-600">
              Depuis le Covid, le télétravail est entré dans les m&oelig;urs. Proposez de travailler de chez vous les
              jours de match. Vous serez productif le matin et pourrez regarder le match de 17h en toute sérénité.
              Win-win.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-yellow-100 text-yellow-700 font-bold text-sm w-8 h-8 rounded-full flex items-center justify-center">3</span>
              <h3 className="font-bold">La pause déjeuner prolongée</h3>
              <span className="ml-auto text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Toléré</span>
            </div>
            <p className="text-sm text-gray-600">
              Pour les matchs de 14h, une pause déjeuner &laquo; étendue &raquo; peut faire l&apos;affaire. Certaines
              entreprises acceptent de décaler les horaires. Parlez-en avec votre manager — la transparence est toujours
              mieux que la planque.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-orange-100 text-orange-700 font-bold text-sm w-8 h-8 rounded-full flex items-center justify-center">4</span>
              <h3 className="font-bold">L&apos;écran collectif en salle de pause</h3>
              <span className="ml-auto text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">Sur accord</span>
            </div>
            <p className="text-sm text-gray-600">
              Proposez à votre direction d&apos;installer un écran dans un espace commun. C&apos;est bon pour la
              cohésion d&apos;équipe, ça évite le streaming sauvage sur 50 postes, et ça fait plaisir à tout le monde.
              Argument imparable : &laquo; Ça booste l&apos;engagement collaborateur &raquo;.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-red-100 text-red-700 font-bold text-sm w-8 h-8 rounded-full flex items-center justify-center">5</span>
              <h3 className="font-bold">Le live-tweet / notifications</h3>
              <span className="ml-auto text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Risqué</span>
            </div>
            <p className="text-sm text-gray-600">
              Quand vous ne pouvez vraiment pas regarder le match : activez les notifications de L&apos;Équipe ou
              FotMob et suivez le match en texte. C&apos;est frustrant, mais c&apos;est mieux que rien. Et quand toute
              l&apos;open space hurle en même temps, vous saurez que la France a marqué.
            </p>
          </div>
        </div>
      </section>

      {/* Precedents */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-xl font-bold sm:text-2xl text-[#022149] mb-6">
          <Clock className="inline-block w-6 h-6 mr-2 text-[#00B865]" />
          Les précédents : 2018 et 2022
        </h2>
        <div className="prose prose-lg max-w-none">
          <h3>CDM 2018 (Russie) — L&apos;âge d&apos;or</h3>
          <p>
            Les matchs étaient à des heures européennes (14h, 16h, 18h, 20h). Résultat : la France entière a regardé
            les quarts, demies et finale pendant les heures de bureau. La productivité nationale a chuté de
            <strong> 28 % </strong> pendant France-Belgique (mardi à 20h) selon une étude Qapa. Mais personne n&apos;a été
            licencié. La France a gagné. Tout le monde était content.
          </p>

          <h3>CDM 2022 (Qatar) — Le paradoxe hivernal</h3>
          <p>
            En novembre-décembre, les horaires (14h, 16h, 20h) tombaient en plein dans les heures de travail. Mais le
            contexte était différent : le télétravail post-Covid était ancré dans les habitudes. <strong>58 % des
            salariés</strong> ont opté pour le télétravail les jours de match des Bleus. Les entreprises qui avaient
            installé des écrans ont vu leur &laquo; marque employeur &raquo; boostée sur LinkedIn. Celles qui ont
            interdit ont été moquées sur Twitter.
          </p>

          <h3>CDM 2026 — Le défi du décalage horaire</h3>
          <p>
            Avec des matchs entre 14h et 3h du matin (heure de Paris), le problème sera moins aigu pour les matchs du
            soir. Mais les matchs de 17h et 20h resteront dans la zone grise des heures de bureau. La solution magique
            n&apos;existe pas — mais négocier en avance reste la meilleure stratégie.
          </p>
        </div>
      </section>

      {/* Viral CTA */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-2xl bg-gradient-to-r from-[#022149] to-[#00B865] p-8 text-white text-center">
          <h3 className="text-xl font-bold mb-3">Le conseil ultime</h3>
          <p className="text-lg mb-4 max-w-2xl mx-auto">
            Posez votre RTT <strong>maintenant</strong>. Le calendrier des matchs est connu. Les places en télétravail
            partiront vite. Et si votre patron refuse... montrez-lui cet article. On ne garantit rien, mais ça vaut le coup d&apos;essayer.
          </p>
          <p className="text-sm opacity-80">
            &laquo; Un salarié heureux est un salarié productif &raquo; — Un DRH qui a compris, probablement.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-16">
        <FAQSection title="Questions fréquentes — CDM au travail" items={faqItems} />
      </section>
    </>
  );
}
