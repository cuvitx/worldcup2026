import type { Metadata } from "next";
import Link from "next/link";
import { getStaticAlternates } from "@repo/data/route-mapping";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";

export const metadata: Metadata = {
  title: "Contact — Contactez l'équipe CDM 2026",
  description:
    "Contactez l'équipe CDM 2026 pour toute question, suggestion ou demande de partenariat. FAQ et informations utiles.",
  alternates: getStaticAlternates("contact", "fr"),
  openGraph: {
    title: "Contact - CDM 2026",
    description: "Contactez l'équipe CDM 2026 pour toute question ou partenariat.",
  },
};

const faqs = [
  {
    question: "Vos pronostics sont-ils gratuits ?",
    answer:
      "Oui, tous nos pronostics et analyses sont entièrement gratuits. Nous nous finançons via des liens d'affiliation vers des bookmakers agréés ANJ.",
  },
  {
    question: "Êtes-vous affiliés à la FIFA ?",
    answer:
      "Non, CDM 2026 est un site d'information indépendant. Nous ne sommes affiliés ni à la FIFA ni à aucune fédération de football.",
  },
  {
    question: "Comment sont calculés vos pronostics ?",
    answer:
      "Nos pronostics s'appuient sur des modèles statistiques combinant classement ELO, forme récente, historique des confrontations et cotes des bookmakers. Consultez notre page Méthodologie pour en savoir plus.",
  },
  {
    question: "Puis-je reprendre vos contenus sur mon site ?",
    answer:
      "Nos contenus sont protégés par le droit d'auteur. Pour toute demande de reproduction ou de partenariat éditorial, contactez-nous par email.",
  },
];

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema items={[{"name":"Accueil","url":"/"},{"name":"Contact","url":"/contact"}]} baseUrl={domains.fr} />
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Contact" },
        ]}
      />

      <section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-secondary">Nous contacter</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">Contact</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Une question, une suggestion ou une demande de partenariat ?
            N&apos;hésitez pas à nous contacter.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-12 text-gray-700 leading-relaxed">
          {/* Contact form-like section */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Nous écrire
            </h2>
            <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700 p-6">
              <p className="mb-4">
                Pour toute question relative au site, à nos contenus, à nos
                analyses ou à une demande de partenariat, envoyez-nous un email :
              </p>
              <a
                href="mailto:contact@cdm2026.fr?subject=Contact%20CDM%202026"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary/90"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                contact@cdm2026.fr
              </a>
              <p className="mt-4 text-sm text-gray-500">
                Nous nous efforçons de répondre sous 48 heures.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              Questions fréquentes
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                >
                  <summary className="cursor-pointer px-5 py-4 font-semibold text-gray-900 dark:text-white transition-colors hover:text-primary">
                    {faq.question}
                  </summary>
                  <p className="px-5 pb-4 text-gray-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* À propos */}
          <section>
            <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
              À propos du site
            </h2>
            <p>
              CDM 2026 est un site d&apos;information indépendant dédié à la
              Coupe du Monde FIFA 2026. Nous proposons des pronostics, des
              analyses statistiques, des comparaisons de cotes et des guides
              pratiques pour les supporters.
            </p>
            <p className="mt-2">
              Ce site n&apos;est pas affilié à la FIFA ni à aucun opérateur de
              paris sportifs. Nos contenus sont à caractère informatif et ne
              constituent pas des conseils de paris.
            </p>
          </section>

          {/* Jeu responsable */}
          <section className="rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Jeu responsable
            </h2>
            <p>
              Si vous pariez, faites-le de manière responsable. Les jeux
              d&apos;argent comportent des risques de pertes financières et
              d&apos;addiction.
            </p>
            <p className="mt-3">
              <Link
                href="/jeu-responsable"
                className="font-medium text-primary hover:underline"
              >
                Consulter notre page Jeu responsable →
              </Link>
            </p>
          </section>

          {/* Liens utiles */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Liens utiles
            </h2>
            <ul className="space-y-2">
              <li>
                <Link href="/a-propos" className="text-primary hover:underline">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="text-primary hover:underline">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/methodologie" className="text-primary hover:underline">
                  Méthodologie
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-primary hover:underline">
                  FAQ complète
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
