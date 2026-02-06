import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aviso legal",
  description:
    "Aviso legal del sitio Mundial 2026. Informacion sobre el editor, el alojamiento y las condiciones de uso.",
};

export default function AvisoLegalPage() {
  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-primary">
                Inicio
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Aviso legal</li>
          </ol>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="mb-8 text-3xl font-extrabold">Aviso legal</h1>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">Editor del sitio</h2>
            <p>
              Este sitio esta editado a titulo personal en el marco de un proyecto
              de informacion deportiva. El contenido se proporciona unicamente con
              fines informativos.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">Alojamiento</h2>
            <p>
              Este sitio esta alojado por Vercel Inc., 440 N Barranca Ave #4133,
              Covina, CA 91723, Estados Unidos.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Propiedad intelectual
            </h2>
            <p>
              Este sitio no esta afiliado a la FIFA ni a ninguna organizacion
              oficial de la Copa del Mundo. Los nombres de equipos, logotipos y
              marcas mencionados pertenecen a sus respectivos propietarios.
            </p>
            <p className="mt-2">
              Los datos estadisticos se recopilan a partir de fuentes
              publicas con fines de informacion y analisis.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Enlaces de afiliacion
            </h2>
            <p>
              Este sitio puede contener enlaces de afiliacion hacia
              operadores de apuestas deportivas autorizados. Podemos recibir una
              comision si te registras a traves de estos enlaces. Esto no afecta
              al coste para ti y no influye en nuestros analisis o
              pronosticos.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Proteccion de datos
            </h2>
            <p>
              Este sitio no recopila directamente datos personales. Nuestros
              socios publicitarios y de analisis pueden utilizar cookies de
              terceros. Puedes configurar tu navegador para
              rechazar las cookies.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Limitacion de responsabilidad
            </h2>
            <p>
              Los pronosticos y analisis presentados en este sitio se proporcionan
              unicamente con fines informativos y no constituyen en ningun caso
              consejos de apuestas. Las apuestas deportivas conllevan riesgos de
              perdidas financieras. Consulta nuestra pagina{" "}
              <Link
                href="/juego-responsable"
                className="text-accent hover:underline"
              >
                Juego responsable
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">Contacto</h2>
            <p>
              Para cualquier pregunta sobre este sitio, puedes contactarnos
              por correo electronico en la direccion indicada en la pagina{" "}
              <Link href="/acerca-de" className="text-accent hover:underline">
                Acerca de
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
