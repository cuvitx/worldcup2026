import type { ReactNode } from "react";

/**
 * Props for the DataRow component.
 * 
 * @param label - Row label (left side)
 * @param value - Row value (right side, optional if children is used)
 * @param children - Alternative to value prop
 * @param className - Additional CSS classes
 */
interface DataRowProps {
  label: string;
  value?: ReactNode;
  children?: ReactNode;
  className?: string;
}

/**
 * DataRow component — Key-value row for data lists (label on left, value on right).
 * 
 * @example
 * ```tsx
 * <dl className="space-y-2">
 *   <DataRow label="Capacité" value="80 000 places" />
 *   <DataRow label="Ville" value="Paris" />
 * </dl>
 * ```
 */
export function DataRow({ label, value, children, className = "" }: DataRowProps) {
  return (
    <div className={`flex justify-between gap-2 ${className}`}>
      <dt className="text-gray-500 shrink-0">{label}</dt>
      <dd className="font-medium text-right break-words min-w-0">
        {children ?? value}
      </dd>
    </div>
  );
}
