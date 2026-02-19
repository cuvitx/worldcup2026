import type { ReactNode } from "react";

interface DataRowProps {
  label: string;
  value?: ReactNode;
  children?: ReactNode;
  className?: string;
}

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
