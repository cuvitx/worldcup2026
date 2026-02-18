import type { Metadata } from "next";
import Link from "next/link";
import { domains, getStaticAlternates } from "@repo/data/route-mapping";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez l'equipe CDM 2026. Pour toute question relative au site, a nos contenus ou a nos partenariats.",
  alternates: getStaticAlternates("contact", "fr"),
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema
        baseUrl={domains.fr}
        items={[
          { name: "Accueil", url: "/" },
          { name: "Contact", url: "/contact" },
        ]}
      />

      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-primary">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li className="font-medium text-gray-900">Contact</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary py-12 text-white">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-4xl font-extrabold">Contact</h1>
          <p className="mt-4 text-lg text-gray-300">
            Une question, une suggestion ou une demande de partenariat ?
            N&apos;hesitez pas a nous contacter.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Nous contacter
            </h2>
            <p>
              Pour toute question relative au site, a nos contenus ou a nos
              analyses, vous pouvez nous ecrire a l&apos;adresse suivante :
            </p>
            <p className="mt-4">
              <a
                href="mailto:contact@mondial2026.fr"
                className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 font-semibold text-primary hover:bg-primary/20"
              >
                contact@mondial2026.fr
              </a>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              A propos du site
            </h2>
            <p>
              CDM 2026 est un site d&apos;information independant dedie a la
              Coupe du Monde FIFA 2026. Nous proposons des pronostics, des
              analyses statistiques, des comparaisons de cotes et des guides
              pratiques pour les supporters.
            </p>
            <p className="mt-2">
              Ce site n&apos;est pas affilie a la FIFA ni a aucun operateur de
              paris sportifs. Nos contenus sont a caractere informatif et ne
              constituent pas des conseils de paris.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Jeu responsable
            </h2>
            <p>
              Si vous pariez, faites-le de maniere responsable. Les jeux
              d&apos;argent comportent des risques. Consultez notre page
              dediee pour plus d&apos;informations.
            </p>
            <p className="mt-4">
              <Link
                href="/jeu-responsable"
                className="text-accent font-medium hover:underline"
              >
                Consulter notre page Jeu responsable
              </Link>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Liens utiles
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/a-propos"
                  className="text-accent hover:underline"
                >
                  A propos
                </Link>
              </li>
              <li>
                <Link
                  href="/mentions-legales"
                  className="text-accent hover:underline"
                >
                  Mentions legales
                </Link>
              </li>
              <li>
                <Link
                  href="/jeu-responsable"
                  className="text-accent hover:underline"
                >
                  Jeu responsable
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
