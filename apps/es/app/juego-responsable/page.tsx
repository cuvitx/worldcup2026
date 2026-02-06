import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Juego responsable - Apuestas deportivas",
  description:
    "Informacion sobre el juego responsable y las apuestas deportivas. Consejos para apostar de manera responsable durante la Copa del Mundo 2026.",
};

export default function JuegoResponsablePage() {
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
            <li className="text-gray-900 font-medium">Juego responsable</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-extrabold">Juego responsable</h1>
          <p className="mt-4 text-lg text-gray-300">
            Las apuestas deportivas deben ser un entretenimiento. Juega de
            manera responsable.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <div className="rounded-lg border-2 border-accent/30 bg-accent/5 p-6">
            <p className="text-lg font-bold text-accent">
              Los juegos de azar pueden ser peligrosos: perdida de dinero,
              conflictos familiares, adiccion... Consulta jugarbien.es o llama al
              900 200 225 (llamada gratuita).
            </p>
          </div>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Nuestros compromisos
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                No nos dirigimos a menores. Las apuestas deportivas estan
                prohibidas para personas menores de 18 anos.
              </li>
              <li>
                Nuestros pronosticos se proporcionan con fines informativos y no garantizan
                ninguna ganancia.
              </li>
              <li>
                Solo recomendamos operadores autorizados por la DGOJ (Direccion
                General de Ordenacion del Juego) en Espana.
              </li>
              <li>
                Fomentamos una practica moderada y responsable de las apuestas
                deportivas.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Consejos para apostar responsablemente
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Fija un presupuesto",
                  text: "Determina de antemano la cantidad que estas dispuesto a perder. Nunca superes ese presupuesto.",
                },
                {
                  title: "No persigas tus perdidas",
                  text: "Si pierdes, no intentes recuperar tus perdidas apostando mas.",
                },
                {
                  title: "Fija limites de tiempo",
                  text: "Las apuestas no deben interferir en tu vida cotidiana, tu trabajo o tus relaciones.",
                },
                {
                  title: "No apuestes bajo influencia",
                  text: "No apuestes bajo los efectos del alcohol, medicamentos o en situaciones de estres emocional.",
                },
                {
                  title: "Mantente informado",
                  text: "Comprende las cuotas y las probabilidades. Un pronostico nunca es una certeza.",
                },
                {
                  title: "Pide ayuda",
                  text: "Si sientes que pierdes el control, no dudes en pedir ayuda.",
                },
              ].map((consejo) => (
                <div
                  key={consejo.title}
                  className="rounded-lg bg-gray-50 p-4"
                >
                  <h3 className="font-bold text-gray-900">{consejo.title}</h3>
                  <p className="mt-1 text-sm">{consejo.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Senales de una practica problematica
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Apuestas mas de lo que puedes permitirte perder</li>
              <li>Pides dinero prestado para apostar</li>
              <li>Mientes a tus allegados sobre tus habitos de juego</li>
              <li>Apuestas para escapar de problemas personales</li>
              <li>Te sientes ansioso o irritable cuando no apuestas</li>
              <li>Descuidas tu trabajo o tus relaciones por las apuestas</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Recursos de ayuda
            </h2>
            <div className="space-y-4">
              <div className="rounded-lg bg-white border border-gray-200 p-4">
                <h3 className="font-bold text-gray-900">
                  Jugarbien.es
                </h3>
                <p className="text-sm">
                  Portal de juego responsable de la DGOJ
                </p>
                <p className="text-sm text-gray-500">jugarbien.es</p>
              </div>
              <div className="rounded-lg bg-white border border-gray-200 p-4">
                <h3 className="font-bold text-gray-900">
                  DGOJ - Direccion General de Ordenacion del Juego
                </h3>
                <p className="text-sm">
                  Regulador del juego online en Espana
                </p>
                <p className="text-sm text-gray-500">ordenacionjuego.es</p>
              </div>
              <div className="rounded-lg bg-white border border-gray-200 p-4">
                <h3 className="font-bold text-gray-900">
                  Linea de atencion al jugador
                </h3>
                <p className="text-sm">900 200 225 (llamada gratuita, 24h)</p>
                <p className="text-sm text-gray-500">Servicio de ayuda confidencial</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Herramientas de autoexclusion
            </h2>
            <p>
              Todos los operadores autorizados por la DGOJ ofrecen herramientas
              de autolimitacion y autoexclusion:
            </p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>Limitacion de depositos y apuestas</li>
              <li>Limitacion del tiempo de juego</li>
              <li>Autoexclusion temporal o definitiva</li>
              <li>
                Registro General de Interdicciones de Acceso al Juego (RGIAJ)
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
