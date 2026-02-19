/**
 * Button — Brand Book CDM2026
 * Variants: primary | secondary | outline | ghost | cta
 * Sizes: sm | md (default) | lg
 */

import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "cta";
export type ButtonSize = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white hover:bg-[#e05a28] hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(255,107,53,0.3)]",
  secondary:
    "bg-transparent text-secondary border border-secondary hover:bg-[rgba(46,196,182,0.08)] hover:-translate-y-px",
  outline:
    "bg-transparent text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-white/10 hover:-translate-y-px",
  ghost:
    "bg-white/10 text-white border border-white/20 backdrop-blur-sm hover:bg-white/[0.18] hover:-translate-y-px",
  cta:
    "bg-accent text-white font-bold hover:bg-[#e05a28] hover:-translate-y-px shadow-lg shadow-primary/30 hover:shadow-[0_6px_20px_rgba(255,107,53,0.4)]",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-[13px]",
  md: "px-6 py-3 text-[14px]",
  lg: "px-8 py-4 text-[15px]",
};

export function buildBtnClass(
  variant: ButtonVariant,
  size: ButtonSize,
  pill: boolean,
  extra?: string,
): string {
  return [
    "inline-flex items-center justify-center gap-1.5",
    "font-semibold leading-none tracking-[0.05em]",
    "cursor-pointer transition-all duration-200",
    "focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2",
    "active:scale-[0.97] no-underline",
    pill ? "rounded-full" : "rounded-lg",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    extra ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

/* ── <Button> ──────────────────────────────────────────────────────────────── */

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  pill?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  pill = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button className={buildBtnClass(variant, size, pill, className)} {...rest}>
      {children}
    </button>
  );
}

/* ── <ButtonLink> ──────────────────────────────────────────────────────────── */

export interface ButtonLinkProps {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  pill?: boolean;
  className?: string;
  children?: React.ReactNode;
  target?: string;
  rel?: string;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  pill = false,
  className,
  children,
  target,
  rel,
}: ButtonLinkProps) {
  // Use a plain <a> to avoid depending on next/link in the shared package
  return (
    <a
      href={href}
      className={buildBtnClass(variant, size, pill, className)}
      target={target}
      rel={rel}
    >
      {children}
    </a>
  );
}

/* ── <ButtonAnchor> ────────────────────────────────────────────────────────── */

export interface ButtonAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  pill?: boolean;
}

export function ButtonAnchor({
  variant = "primary",
  size = "md",
  pill = false,
  className,
  children,
  ...rest
}: ButtonAnchorProps) {
  return (
    <a className={buildBtnClass(variant, size, pill, className)} {...rest}>
      {children}
    </a>
  );
}
