"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-6xl font-extrabold text-primary">Error</p>
      <h1 className="mt-4 text-2xl font-bold text-gray-900">
        Algo salio mal
      </h1>
      <p className="mt-2 text-gray-500">
        Se ha producido un error inesperado. Por favor, intentalo de nuevo.
      </p>
      <div className="mt-8 flex gap-4">
        <button
          onClick={reset}
          className="rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary/90"
        >
          Intentar de nuevo
        </button>
        <a
          href="/"
          className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
}
