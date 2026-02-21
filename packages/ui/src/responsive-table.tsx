/**
 * ResponsiveTable — Shows a regular table on desktop, card layout on mobile.
 * Wraps children with responsive overflow behavior.
 */

/**
 * A table column definition.
 * 
 * @param key - Column identifier (matches row data keys)
 * @param label - Column header label
 * @param className - Optional CSS classes for alignment (e.g., "text-left")
 */
interface Column {
  key: string;
  label: string;
  className?: string;
}

/**
 * Props for the ResponsiveTable component.
 * 
 * @param columns - Column definitions
 * @param rows - Array of row data objects (keys must match column keys)
 * @param highlightBest - Optional: highlight the best value per column (e.g., best odds)
 * @param className - Additional CSS classes
 */
interface ResponsiveTableProps {
  columns: Column[];
  rows: Record<string, React.ReactNode>[];
  /** Optional: highlight the best value per column (e.g., best odds) */
  highlightBest?: Record<string, React.ReactNode>;
  className?: string;
}

/**
 * ResponsiveTable component — Adaptive table that switches to card layout on mobile.
 * 
 * @example
 * ```tsx
 * <ResponsiveTable
 *   columns={[
 *     { key: "team", label: "Équipe", className: "text-left" },
 *     { key: "points", label: "Pts", className: "text-center" }
 *   ]}
 *   rows={[
 *     { team: "France", points: 9 },
 *     { team: "Brésil", points: 6 }
 *   ]}
 * />
 * ```
 */
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
              <tr key={i} className="hover:bg-gray-50/50 transition-colors">
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
