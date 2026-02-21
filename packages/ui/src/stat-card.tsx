import type { ReactNode } from "react";

/**
 * Props for the StatCard component.
 * 
 * @param value - The main statistic value (can be a number, string, or React node)
 * @param label - Description label for the statistic
 * @param icon - Optional emoji or icon to display above the value
 * @param color - Color theme: "primary" | "secondary" | "accent" (default: "primary")
 * @param className - Additional CSS classes to apply
 */
interface StatCardProps {
  value: ReactNode;
  label: string;
  icon?: string;
  color?: "primary" | "secondary" | "accent";
  className?: string;
}

const colorMap = {
  primary: "text-primary",
  secondary: "text-accent",
  accent: "text-accent",
} as const;

/**
 * StatCard component — Displays a key statistic with optional icon and label.
 * 
 * Used for showing metrics like goals scored, matches played, win percentage, etc.
 * 
 * @example
 * ```tsx
 * <StatCard
 *   value={42}
 *   label="Buts marqués"
 *   icon=""
 *   color="accent"
 * />
 * ```
 * 
 * @example
 * ```tsx
 * <StatCard
 *   value="75%"
 *   label="Taux de victoire"
 *   icon=""
 *   color="primary"
 * />
 * ```
 */
export function StatCard({ value, label, icon, color = "primary", className = "" }: StatCardProps) {
  return (
    <div className={`rounded-lg bg-gray-50 p-4 text-center ${className}`}>
      {icon && <p className="text-2xl mb-1">{icon}</p>}
      <p className={`text-3xl font-bold ${colorMap[color]}`}>{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}
