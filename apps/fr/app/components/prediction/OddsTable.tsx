import { bookmakers } from "@repo/data/affiliates";

interface OddsTableProps {
  odds: { home: string; draw: string; away: string };
  homeName: string;
  awayName: string;
}

export function OddsTable({ odds, homeName, awayName }: OddsTableProps) {
  return (
    <section className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold">
        Cotes estimees : {homeName} vs {awayName}
      </h2>
      <p className="mb-4 text-sm text-gray-600">
        Cotes decimales estimees a partir de notre modele de prediction.
        Comparez avec les offres des bookmakers ci-dessous.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="pb-3 text-left font-semibold text-gray-700">
                Bookmaker
              </th>
              <th className="pb-3 text-center font-semibold text-gray-700">
                Victoire {homeName}
              </th>
              <th className="pb-3 text-center font-semibold text-gray-700">
                Nul
              </th>
              <th className="pb-3 text-center font-semibold text-gray-700">
                Victoire {awayName}
              </th>
              <th className="pb-3 text-right font-semibold text-gray-700">
                Bonus
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* Estimated odds row */}
            <tr className="bg-primary/5">
              <td className="py-3 text-left font-medium text-primary">
                Estimation
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
                      Recommande
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
        Cotes estimees, susceptibles d&apos;evoluer. Les cotes reelles peuvent
        varier selon les bookmakers.
      </p>
    </section>
  );
}
