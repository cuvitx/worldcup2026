/**
 * ResponsiveTable — Shows a regular table on desktop, card layout on mobile.
 * Wraps children with responsive overflow behavior.
 */

interface Column {
  key: string;
  label: string;
  className?: string;
}

interface ResponsiveTableProps {
  columns: Column[];
  rows: Record<string, React.ReactNode>[];
  /** Optional: highlight the best value per column (e.g., best odds) */
  highlightBest?: Record<string, React.ReactNode>;
  className?: string;
}

export function ResponsiveTable({ columns, rows, className = "" }: ResponsiveTableProps) {
  if (rows.length === 0) return null;

  return (
    <div className={className}>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500">
              {columns.map((col) => (
                <th key={col.key} className={`pb-2 font-medium ${col.className ?? "text-center"}`}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {rows.map((row, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td key={col.key} className={`py-2 ${col.className ?? "text-center"}`}>
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="space-y-3 md:hidden">
        {rows.map((row, i) => (
          <div key={i} className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
            {columns.map((col) => (
              <div key={col.key} className="flex items-center justify-between py-1">
                <span className="text-xs font-medium text-gray-500">{col.label}</span>
                <span className="text-sm font-semibold text-gray-700">{row[col.key]}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
