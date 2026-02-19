import type { Metadata } from "next";
import Link from "next/link";
import { domains } from "@repo/data/route-mapping";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Politique de confidentialité | CDM 2026",
  description:
    "Politique de confidentialité et protection des données personnelles du site CDM 2026. Conformité RGPD, cookies, droits des utilisateurs.",
  openGraph: {
    title: "Politique de confidentialité - CDM 2026",
    description: "Politique de confidentialité et RGPD du site CDM 2026.",
  },
  alternates: {
    canonical: `${domains.fr}/politique-de-confidentialite`,
  },
};

export default function PolitiqueConfidentialitePage() {
  const lastUpdate = "19 février 2026";

  return (
    <>
      <BreadcrumbSchema
        baseUrl={domains.fr}
        items={[
          { name: "Accueil", url: "/" },
          { name: "Politique de confidentialité", url: "/politique-de-confidentialite" },
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
            <li className="font-medium text-gray-900 dark:text-white">
              Politique de confidentialité
            </li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary py-12 text-white">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-2xl font-extrabold sm:text-4xl">
            Politique de confidentialité
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Protection de vos données personnelles — Conformité RGPD
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Dernière mise à jour : {lastUpdate}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">

          {/* Intro */}
          <section>
            <p>
              Le site <strong>cdm2026.fr</strong> (ci-après « le Site ») s&apos;engage à
              protéger la vie privée de ses utilisateurs et à traiter leurs données
              personnelles conformément au Règlement Général sur la Protection des Données
              (RGPD — Règlement UE 2016/679) et à la loi française « Informatique et Libertés »
              du 6 janvier 1978 modifiée.
            </p>
            <p className="mt-3">
              La présente politique de confidentialité vous informe sur la nature des données
              susceptibles d&apos;être collectées, les finalités de ce traitement, vos droits
              et les moyens de les exercer.
            </p>
          </section>

          {/* 1. Responsable du traitement */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 dark:">
              1. Responsable du traitement
            </h2>
            <ul className="space-y-1 text-sm">
              <li><strong>Site :</strong> cdm2026.fr</li>
              <li>
                <strong>Contact :</strong>{" "}
                <a href="mailto:contact@cdm2026.fr" className="text-primary hover:underline">
                  contact@cdm2026.fr
                </a>
              </li>
            </ul>
          </section>

          {/* 2. Données collectées */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 dark:">
              2. Données collectées et finalités
            </h2>
            <p className="mb-3">
              Le Site ne collecte <strong>aucune donnée personnelle directement identifiante</strong>{" "}
              (nom, prénom, adresse postale) sans votre consentement explicite. Les données
              susceptibles d&apos;être traitées sont :
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse border border-gray-200 dark:border-slate-700">
                <thead>
                  <tr className="bg-gray-50 dark:bg-slate-700/50 text-xs uppercase text-gray-500">
                    <th className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-left font-semibold">Données</th>
                    <th className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-left font-semibold">Finalité</th>
                    <th className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-left font-semibold">Base légale</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 dark:border-slate-600 px-4 py-2">Adresse IP (anonymisée)</td>
                    <td className="border border-gray-200 dark:border-slate-600 px-4 py-2">Analyse d&apos;audience, sécurité</td>
                    <td className="border border-gray-200 dark:border-slate-600 px-4 py-2">Intérêt légitime</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-slate-700/50 text-xs uppercase text-gray-500">
                    <td className="border border-gray-200 dark:border-slate-600 px-4 py-2">Données de navigation (pages vues, durée)</td>
                    <td className="border border-gray-200 dark:border-slate-600 px-4 py-2">Amélioration du service</td>
                    <td className="border border-gray-200 dark:border-slate-600 px-4 py-2">Consentement</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-slate-600 px-4 py-2">Préférences utilisateur (thème, langue)</td>
                    <td className="border border-gray-200 dark:border-slate-600 px-4 py-2">Personnalisation</td>
                    <td className="border border-gray-200 dark:border-slate-600 px-4 py-2">Intérêt légitime</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-slate-700/50 text-xs uppercase text-gray-500">
                    <td className="border border-gray-200 dark:border-slate-600 px-4 py-2">Adresse email (newsletter)</td>
                    <td className="border border-gray-200 dark:border-slate-600 px-4 py-2">Envoi de la newsletter</td>
                    <td className="border border-gray-200 dark:border-slate-600 px-4 py-2">Consentement</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-slate-600 px-4 py-2">Données cookies tiers</td>
                    <td className="border border-gray-200 dark:border-slate-600 px-4 py-2">Publicité, affiliation</td>
                    <td className="border border-gray-200 dark:border-slate-600 px-4 py-2">Consentement</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 3. Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 dark:">
              3. Cookies et traceurs
            </h2>
            <p className="mb-3">
              Le Site utilise des cookies et traceurs. Lors de votre première visite, une
              bannière vous permet de consentir ou de refuser l&apos;utilisation des cookies
              non essentiels.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2 dark:">
              3.1 Cookies essentiels (pas de consentement requis)
            </h3>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><strong>cookie_consent</strong> — Mémorisation de vos préférences de cookies (durée : 12 mois)</li>
              <li><strong>theme</strong> — Préférence de thème clair/sombre (durée : session)</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2 dark:">
              3.2 Cookies analytiques (avec consentement)
            </h3>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>
                <strong>Google Analytics 4</strong> — Mesure d&apos;audience anonymisée.
                Données transmises à Google Ireland Limited (respectant le RGPD via des
                clauses contractuelles types). Durée de conservation : 14 mois.
                <br />
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-xs"
                >
                  Politique de confidentialité Google →
                </a>
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2 dark:">
              3.3 Cookies tiers / affiliation (avec consentement)
            </h3>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Cookies des bookmakers partenaires (Betclic, Winamax, Unibet, PMU) pour le suivi des conversions d&apos;affiliation.</li>
            </ul>

            <p className="mt-3 text-sm">
              Vous pouvez modifier vos préférences à tout moment en cliquant sur le bouton
              de gestion des cookies en bas de page ou en configurant votre navigateur.
            </p>
          </section>

          {/* 4. Hébergement et transfert de données */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 dark:">
              4. Hébergement et transferts hors UE
            </h2>
            <p>
              Le Site est hébergé par <strong>Vercel Inc.</strong> (États-Unis). Ce
              transfert hors de l&apos;Union européenne est encadré par des Clauses
              Contractuelles Types approuvées par la Commission Européenne, conformément
              à l&apos;article 46 du RGPD.
            </p>
            <p className="mt-2">
              Les données analytiques sont traitées par Google (États-Unis), sous les
              mêmes garanties contractuelles.
            </p>
          </section>

          {/* 5. Durée de conservation */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 dark:">
              5. Durée de conservation des données
            </h2>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Données analytiques anonymisées : 14 mois maximum</li>
              <li>Préférences cookies : 12 mois</li>
              <li>Adresse email newsletter : jusqu&apos;à désinscription</li>
              <li>Logs serveur (adresses IP) : 12 mois maximum</li>
            </ul>
          </section>

          {/* 6. Vos droits */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 dark:">
              6. Vos droits (RGPD)
            </h2>
            <p className="mb-3">
              Conformément au RGPD, vous disposez des droits suivants concernant vos
              données personnelles :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>
                <strong>Droit d&apos;accès</strong> — Obtenir la confirmation que des données
                vous concernant sont traitées et en obtenir une copie.
              </li>
              <li>
                <strong>Droit de rectification</strong> — Demander la correction de données
                inexactes.
              </li>
              <li>
                <strong>Droit à l&apos;effacement</strong> («droit à l&apos;oubli») — Demander
                la suppression de vos données dans les cas prévus par le RGPD.
              </li>
              <li>
                <strong>Droit d&apos;opposition</strong> — Vous opposer au traitement de vos
                données pour des raisons tenant à votre situation particulière.
              </li>
              <li>
                <strong>Droit à la limitation</strong> — Demander le gel temporaire du
                traitement de vos données.
              </li>
              <li>
                <strong>Droit à la portabilité</strong> — Recevoir vos données dans un format
                structuré et lisible par machine.
              </li>
              <li>
                <strong>Droit de retirer votre consentement</strong> — À tout moment, sans que
                cela ne remette en cause le traitement effectué avant le retrait.
              </li>
            </ul>
            <p className="mt-4">
              Pour exercer ces droits, contactez-nous à :{" "}
              <a href="mailto:contact@cdm2026.fr" className="text-primary hover:underline">
                contact@cdm2026.fr
              </a>
              . Nous nous engageons à répondre dans un délai d&apos;un mois.
            </p>
            <p className="mt-2">
              En cas de réponse insatisfaisante, vous pouvez introduire une réclamation
              auprès de la{" "}
              <a
                href="https://www.cnil.fr/fr/plaintes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                CNIL (Commission Nationale de l&apos;Informatique et des Libertés)
              </a>
              .
            </p>
          </section>

          {/* 7. Sécurité */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 dark:">
              7. Sécurité des données
            </h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées
              pour protéger vos données contre tout accès non autorisé, perte ou divulgation :
            </p>
            <ul className="mt-2 list-disc pl-6 space-y-1 text-sm">
              <li>Connexion chiffrée via HTTPS (TLS)</li>
              <li>Hébergement sur infrastructure sécurisée (Vercel)</li>
              <li>Anonymisation des données analytiques</li>
              <li>Pas de stockage de mots de passe ou données bancaires</li>
            </ul>
          </section>

          {/* 8. Mineurs */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 dark:">
              8. Mineurs
            </h2>
            <p>
              Le Site est destiné à un public adulte. Nous ne collectons pas sciemment
              de données personnelles concernant des personnes de moins de 18 ans. Si vous
              êtes parent ou tuteur et pensez que votre enfant nous a fourni des données
              personnelles, contactez-nous immédiatement à{" "}
              <a href="mailto:contact@cdm2026.fr" className="text-primary hover:underline">
                contact@cdm2026.fr
              </a>
              .
            </p>
            <div className="mt-3 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm">
              <strong>⚠️ Rappel :</strong> Les jeux d&apos;argent sont interdits aux personnes
              mineures. Appelez le <strong>09 74 75 13 13</strong> (appel non surtaxé).
            </div>
          </section>

          {/* 9. Liens externes */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 dark:">
              9. Liens vers des sites tiers
            </h2>
            <p>
              Notre site contient des liens vers des sites tiers (bookmakers, médias sportifs).
              Nous ne sommes pas responsables de la politique de confidentialité de ces sites.
              Nous vous invitons à consulter leurs politiques de confidentialité respectives.
            </p>
          </section>

          {/* 10. Modifications */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 dark:">
              10. Modifications de la présente politique
            </h2>
            <p>
              Nous nous réservons le droit de modifier cette politique de confidentialité
              à tout moment. La date de dernière mise à jour figurant en haut de page sera
              actualisée. En cas de modification substantielle, nous vous en informerons
              via une notification visible sur le Site.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 dark:">Contact</h2>
            <p>
              Pour toute question relative à cette politique de confidentialité :{" "}
              <a href="mailto:contact@cdm2026.fr" className="text-primary hover:underline">
                contact@cdm2026.fr
              </a>
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <Link href="/mentions-legales" className="text-primary hover:underline">
                Mentions légales
              </Link>
              <Link href="/contact" className="text-primary hover:underline">
                Contact
              </Link>
              <Link href="/jeu-responsable" className="text-primary hover:underline">
                Jeu responsable
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
