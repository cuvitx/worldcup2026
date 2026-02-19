import type { ReactNode } from "react";

interface StatCardProps {
  value: ReactNode;
  label: string;
  icon?: string;
  color?: "primary" | "secondary" | "accent";
  className?: string;
}

const colorMap = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
} as const;

export function StatCard({ value, label, icon, color = "primary", className = "" }: StatCardProps) {
  return (
    <div className={`rounded-lg bg-gray-50 dark:bg-slate-700 p-4 text-center ${className}`}>
      {icon && <p className="text-2xl mb-1">{icon}</p>}
      <p className={`text-3xl font-bold ${colorMap[color]}`}>{value}</p>
      <p className="text-sm text-gray-500 dark:text-gray-300">{label}</p>
    </div>
  );
}
