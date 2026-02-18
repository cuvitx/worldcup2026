import type { Bookmaker } from "@repo/data";

interface OddsTableProps {
  odds: { home: string; draw: string; away: string };
  homeName: string;
  awayName: string;
  bookmakers: Bookmaker[];
}

export function OddsTable({
  odds,
  homeName,
  awayName,
  bookmakers,
}: OddsTableProps) {
  return (
    <section className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold">
        Cuotas estimadas: {homeName} vs {awayName}
      </h2>
      <p className="mb-4 text-sm text-gray-600">
        Cuotas decimales estimadas a partir de nuestro modelo de prediccion.
        Compara con las ofertas de las casas de apuestas a continuacion.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="pb-3 text-left font-semibold text-gray-700">
                Casa de apuestas
              </th>
              <th className="pb-3 text-center font-semibold text-gray-700">
                Victoria {homeName}
              </th>
              <th className="pb-3 text-center font-semibold text-gray-700">
                Empate
              </th>
              <th className="pb-3 text-center font-semibold text-gray-700">
                Victoria {awayName}
              </th>
              <th className="pb-3 text-right font-semibold text-gray-700">
                Bono
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* Estimated odds row */}
            <tr className="bg-primary/5">
              <td className="py-3 text-left font-medium text-primary">
                Estimacion
              </td>
              <td className="py-3 text-center font-bold text-primary">
                {odds.home}
              </td>
              <td className="py-3 text-center font-bold text-primary">
                {odds.draw}
              </td>
              <td className="py-3 text-center font-bold text-primary">
                {odds.away}
              </td>
              <td className="py-3 text-right text-sm text-gray-400">
                --
              </td>
            </tr>
            {/* Bookmaker rows */}
            {bookmakers.map((bk) => (
              <tr
                key={bk.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 text-left">
                  <a
                    href={bk.url}
                    target="_blank"
                    rel="noopener noreferrer sponsored nofollow"
                    className="font-medium text-accent hover:underline"
                  >
                    {bk.name}
                  </a>
                  {bk.highlight && (
                    <span className="ml-2 inline-block rounded bg-gold/20 px-1.5 py-0.5 text-xs font-semibold text-gold">
                      Recomendado
                    </span>
                  )}
                </td>
                <td className="py-3 text-center font-semibold">
                  {odds.home}
                </td>
                <td className="py-3 text-center font-semibold">
                  {odds.draw}
                </td>
                <td className="py-3 text-center font-semibold">
                  {odds.away}
                </td>
                <td className="py-3 text-right">
                  <a
                    href={bk.url}
                    target="_blank"
                    rel="noopener noreferrer sponsored nofollow"
                    className="inline-block rounded bg-accent px-3 py-1 text-xs font-bold text-white hover:bg-accent/90"
                  >
                    {bk.bonus}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-gray-400">
        Cuotas estimadas, sujetas a cambios. Las cuotas reales pueden
        variar segun las casas de apuestas.
      </p>
    </section>
  );
}
