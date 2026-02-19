import type { ReactNode } from "react";

const paddingMap = {
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
} as const;

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

export function Card({ children, className = "", hover = false, padding = "lg" }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm ${paddingMap[padding]} ${
        hover ? "hover:shadow-md transition-shadow" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
