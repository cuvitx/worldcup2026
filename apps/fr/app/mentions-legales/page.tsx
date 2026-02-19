import type { Metadata } from "next";
import Link from "next/link";
import { domains, getStaticAlternates } from "@repo/data/route-mapping";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Mentions légales | CDM 2026",
  description:
    "Mentions légales du site CDM 2026 : éditeur, hébergeur, données personnelles, cookies et conditions d'utilisation.",
  alternates: getStaticAlternates("legal", "fr"),
  openGraph: {
    title: "Mentions légales - CDM 2026",
    description: "Informations légales du site CDM 2026.",
  },
};

export default function MentionsLegalesPage() {
  return (
    <>
      <BreadcrumbSchema
        baseUrl={domains.fr}
        items={[
          { name: "Accueil", url: "/" },
          { name: "Mentions légales", url: "/mentions-legales" },
        ]}
      />

      <nav className="border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 flex-wrap min-w-0">
            <li>
              <Link href="/" className="hover:text-primary">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li className="font-medium text-gray-900 dark:text-white">Mentions légales</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary py-12 text-white">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-2xl font-extrabold sm:text-4xl">Mentions légales</h1>
          <p className="mt-4 text-lg text-gray-300">
            Informations légales relatives au site cdm2026.fr
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 dark:">
              1. Éditeur du site
            </h2>
            <p>
              Le site <strong>cdm2026.fr</strong> (ci-après « le
              Site ») est édité à titre personnel dans le cadre d&apos;un projet
              d&apos;information sportive.
            </p>
            <ul className="mt-3 space-y-1 text-sm">
              <li>
                <strong>Responsable de la publication :</strong> L&apos;éditeur
                du site
              </li>
              <li>
                <strong>Contact :</strong>{" "}
                <a
                  href="mailto:contact@cdm2026.fr"
                  className="text-primary hover:underline"
                >
                  contact@cdm2026.fr
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 dark:">
              2. Hébergeur
            </h2>
            <p>Le Site est hébergé par :</p>
            <ul className="mt-3 space-y-1 text-sm">
              <li>
                <strong>Vercel Inc.</strong>
              </li>
              <li>440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</li>
              <li>
                Site web :{" "}
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  vercel.com
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 dark:">
              3. Propriété intellectuelle
            </h2>
            <p>
              Ce site n&apos;est pas affilié à la FIFA ni à aucune organisation
              officielle de la Coupe du Monde. Les noms d&apos;équipes, logos et
              marques mentionnés appartiennent à leurs propriétaires respectifs.
            </p>
            <p className="mt-2">
              L&apos;ensemble des contenus (textes, analyses, pronostics, mise
              en page) est protégé par le droit d&apos;auteur. Toute
              reproduction, même partielle, est interdite sans autorisation
              préalable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 dark:">
              4. Protection des données personnelles (CNIL / RGPD)
            </h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données
              (RGPD) et à la loi « Informatique et Libertés » du 6 janvier
              1978, vous disposez d&apos;un droit d&apos;accès, de
              rectification, de suppression et d&apos;opposition concernant vos
              données personnelles.
            </p>
            <p className="mt-2">
              Le Site ne collecte aucune donnée personnelle directement. Aucun
              formulaire d&apos;inscription ou de paiement n&apos;est proposé.
              Les seules données pouvant être collectées le sont via des cookies
              tiers (voir section ci-dessous).
            </p>
            <p className="mt-2">
              Pour exercer vos droits, contactez-nous à l&apos;adresse :{" "}
              <a
                href="mailto:contact@cdm2026.fr"
                className="text-primary hover:underline"
              >
                contact@cdm2026.fr
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 dark:">
              5. Cookies
            </h2>
            <p>
              Le Site utilise des cookies pour améliorer l&apos;expérience
              utilisateur et mesurer l&apos;audience. Les cookies utilisés sont :
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-6 text-sm">
              <li>
                <strong>Cookies essentiels :</strong> nécessaires au
                fonctionnement du site (préférences, consentement cookies)
              </li>
              <li>
                <strong>Cookies analytiques :</strong> mesure d&apos;audience
                anonymisée pour améliorer nos contenus
              </li>
              <li>
                <strong>Cookies tiers :</strong> nos partenaires publicitaires et
                d&apos;affiliation peuvent déposer des cookies
              </li>
            </ul>
            <p className="mt-3">
              Vous pouvez configurer votre navigateur pour refuser les cookies ou
              gérer vos préférences via la bannière de consentement affichée lors
              de votre première visite.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 dark:">
              6. Liens d&apos;affiliation
            </h2>
            <p>
              Ce site peut contenir des liens d&apos;affiliation vers des
              opérateurs de paris sportifs agréés par l&apos;Autorité Nationale
              des Jeux (ANJ). Nous pouvons percevoir une commission si vous vous
              inscrivez via ces liens. Cela n&apos;affecte pas le coût pour vous
              et n&apos;influence pas nos analyses ou pronostics.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 dark:">
              7. Clause de non-responsabilité — Paris sportifs
            </h2>
            <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-5">
              <p>
                Les pronostics, analyses et comparaisons de cotes présentés sur
                ce site sont fournis <strong>à titre informatif uniquement</strong>{" "}
                et ne constituent en aucun cas des conseils en investissement ou
                des incitations à parier.
              </p>
              <p className="mt-2">
                Les paris sportifs comportent des{" "}
                <strong>risques de pertes financières</strong>. L&apos;éditeur du
                site ne saurait être tenu responsable des pertes résultant de
                l&apos;utilisation des informations publiées.
              </p>
              <p className="mt-2">
                Les jeux d&apos;argent sont <strong>interdits aux mineurs</strong>.
                Jouer comporte des risques : endettement, isolement, dépendance.
                Appelez le{" "}
                <strong>09 74 75 13 13</strong> (appel non surtaxé).
              </p>
              <p className="mt-3">
                <Link
                  href="/jeu-responsable"
                  className="font-medium text-primary hover:underline"
                >
                  Consulter notre page Jeu responsable →
                </Link>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 dark:">
              8. Limitation de responsabilité
            </h2>
            <p>
              L&apos;éditeur s&apos;efforce de fournir des informations fiables
              et à jour, mais ne garantit pas l&apos;exactitude, la complétude
              ou l&apos;actualité des contenus publiés. L&apos;utilisation du
              site se fait aux risques et périls de l&apos;utilisateur.
            </p>
            <p className="mt-2">
              L&apos;éditeur ne saurait être tenu responsable des dommages
              directs ou indirects résultant de l&apos;accès au site ou de
              l&apos;utilisation des informations qu&apos;il contient.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 dark:">
              9. Droit applicable
            </h2>
            <p>
              Les présentes mentions légales sont régies par le droit français.
              Tout litige relatif à l&apos;utilisation du site sera soumis aux
              juridictions françaises compétentes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 dark:">Contact</h2>
            <p>
              Pour toute question concernant ces mentions légales :{" "}
              <a
                href="mailto:contact@cdm2026.fr"
                className="text-primary hover:underline"
              >
                contact@cdm2026.fr
              </a>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
