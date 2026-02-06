import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-6xl font-extrabold text-primary">404</p>
      <h1 className="mt-4 text-2xl font-bold text-gray-900">
        Pagina no encontrada
      </h1>
      <p className="mt-2 text-gray-500">
        La pagina que buscas no existe o ha sido movida.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary/90"
        >
          Volver al inicio
        </Link>
        <Link
          href="/match/calendario"
          className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
        >
          Calendario de partidos
        </Link>
      </div>
    </div>
  );
}
