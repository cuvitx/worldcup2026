import type { Metadata } from "next";
import Link from "next/link";
import { domains, getStaticAlternates } from "@repo/data/route-mapping";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta con el equipo de Mundial 2026. Para cualquier consulta sobre el sitio, nuestros contenidos o colaboraciones.",
  alternates: getStaticAlternates("contact", "es"),
};

export default function ContactoPage() {
  return (
    <>
      <BreadcrumbSchema
        baseUrl={domains.es}
        items={[
          { name: "Inicio", url: "/" },
          { name: "Contacto", url: "/contacto" },
        ]}
      />

      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-primary">
                Inicio
              </Link>
            </li>
            <li>/</li>
            <li className="font-medium text-gray-900">Contacto</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary py-12 text-white">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-4xl font-extrabold">Contacto</h1>
          <p className="mt-4 text-lg text-gray-300">
            Tienes una pregunta, sugerencia o consulta de colaboracion?
            No dudes en contactarnos.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Contactanos
            </h2>
            <p>
              Para cualquier consulta sobre el sitio web, nuestros contenidos o
              analisis, puedes escribirnos a la siguiente direccion de correo:
            </p>
            <p className="mt-4">
              <a
                href="mailto:contact@mundial2026.es"
                className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 font-semibold text-primary hover:bg-primary/20"
              >
                contact@mundial2026.es
              </a>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Sobre este sitio
            </h2>
            <p>
              Mundial 2026 es un sitio web informativo independiente dedicado a
              la Copa del Mundo FIFA 2026. Ofrecemos pronosticos, analisis
              estadisticos, comparaciones de cuotas y guias practicas para los
              aficionados.
            </p>
            <p className="mt-2">
              Este sitio no esta afiliado a la FIFA ni a ninguna casa de
              apuestas deportivas. Nuestro contenido es informativo y no
              constituye asesoramiento de apuestas.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Juego responsable
            </h2>
            <p>
              Si decides apostar, hazlo de manera responsable. Las apuestas
              conllevan riesgos. Visita nuestra pagina dedicada para mas
              informacion.
            </p>
            <p className="mt-4">
              <Link
                href="/juego-responsable"
                className="text-accent font-medium hover:underline"
              >
                Visita nuestra pagina de Juego responsable
              </Link>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Enlaces utiles
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/acerca-de"
                  className="text-accent hover:underline"
                >
                  Acerca de nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/aviso-legal"
                  className="text-accent hover:underline"
                >
                  Aviso legal
                </Link>
              </li>
              <li>
                <Link
                  href="/juego-responsable"
                  className="text-accent hover:underline"
                >
                  Juego responsable
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
