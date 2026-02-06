import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Acerca de",
  description:
    "Acerca de Mundial 2026: tu guia completa para la Copa del Mundo 2026. Pronosticos, estadisticas y analisis para las 48 selecciones.",
};

export default function AcercaDePage() {
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
            <li className="text-gray-900 font-medium">Acerca de</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-4xl font-extrabold">Acerca de Mundial 2026</h1>
          <p className="mt-4 text-lg text-gray-300">
            Tu guia completa para la primera Copa del Mundo con 48 selecciones.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Nuestra mision
            </h2>
            <p>
              Mundial 2026 es un sitio independiente dedicado a la Copa del Mundo FIFA
              2026 que se celebrara del 11 de junio al 19 de julio de 2026 en
              Estados Unidos, Canada y Mexico. Nuestro objetivo es proporcionar
              la informacion mas completa y los analisis mas relevantes sobre
              este evento historico.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Lo que ofrecemos
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-white border border-gray-200 p-4">
                <h3 className="font-bold text-gray-900">Fichas de equipos</h3>
                <p className="mt-1 text-sm">
                  Analisis detallados de las 48 selecciones clasificadas, con plantillas,
                  estadisticas e historial en la Copa del Mundo.
                </p>
              </div>
              <div className="rounded-lg bg-white border border-gray-200 p-4">
                <h3 className="font-bold text-gray-900">Pronosticos</h3>
                <p className="mt-1 text-sm">
                  Pronosticos basados en datos estadisticos y rankings ELO
                  para cada partido y enfrentamiento.
                </p>
              </div>
              <div className="rounded-lg bg-white border border-gray-200 p-4">
                <h3 className="font-bold text-gray-900">Comparacion de cuotas</h3>
                <p className="mt-1 text-sm">
                  Comparacion de cuotas de las principales casas de apuestas
                  autorizadas para ayudarte a encontrar los mejores valores.
                </p>
              </div>
              <div className="rounded-lg bg-white border border-gray-200 p-4">
                <h3 className="font-bold text-gray-900">Guia practica</h3>
                <p className="mt-1 text-sm">
                  Guias de las 16 ciudades sede y los estadios, con informacion
                  practica para los aficionados.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Nuestra metodologia
            </h2>
            <p>
              Nuestros analisis se basan en datos estadisticos procedentes
              de fuentes publicas reconocidas. Nuestros pronosticos utilizan un modelo
              algoritmico que combina los rankings ELO, las estadisticas
              avanzadas (xG, posesion, forma reciente) y el historial de
              enfrentamientos directos.
            </p>
            <p className="mt-2">
              Nos esforzamos por ser transparentes en nuestra
              metodologia y recordamos que todo pronostico conlleva una parte
              de incertidumbre. Nuestras predicciones no constituyen en ningun caso
              consejos de apuestas.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Independencia editorial
            </h2>
            <p>
              Mundial 2026 es un sitio independiente, no afiliado a la FIFA ni a ningun
              operador de apuestas deportivas. Nuestros analisis y pronosticos se
              realizan con total independencia. Los enlaces de afiliacion
              presentes en el sitio no influyen en nuestro contenido
              editorial.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              La Copa del Mundo 2026 en cifras
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { value: "48", label: "Equipos" },
                { value: "104", label: "Partidos" },
                { value: "16", label: "Ciudades sede" },
                { value: "3", label: "Paises anfitriones" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg bg-gray-50 p-4 text-center"
                >
                  <p className="text-2xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">Enlaces utiles</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/aviso-legal" className="text-accent hover:underline">
                  Aviso legal
                </Link>
              </li>
              <li>
                <Link href="/juego-responsable" className="text-accent hover:underline">
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
