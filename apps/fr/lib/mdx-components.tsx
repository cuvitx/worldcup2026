import Link from "next/link";
import type { ReactNode } from "react";

/* ── Custom MDX components ── */

function InfoBox({
  type = "info",
  children,
}: {
  type?: "info" | "warning" | "tip";
  children: ReactNode;
}) {
  const styles = {
    info: "border-blue-500 bg-blue-50  text-blue-900 ",
    warning:
      "border-secondary bg-secondary/10  text-secondary ",
    tip: "border-accent bg-accent/10  text-accent ",
  };
  const icons = { info: "ℹ️", warning: "⚠️", tip: "💡" };

  return (
    <div
      className={`my-6 rounded-lg border-l-4 p-4 ${styles[type]} not-prose`}
    >
      <span className="mr-2">{icons[type]}</span>
      {children}
    </div>
  );
}

function StatHighlight({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="my-4 inline-flex flex-col items-center rounded-xl bg-primary/10  px-6 py-4 not-prose">
      <span className="text-3xl font-extrabold text-primary ">
        {value}
      </span>
      <span className="text-sm text-gray-600 ">{label}</span>
    </div>
  );
}

function TeamCard({
  name,
  slug,
  emoji,
}: {
  name: string;
  slug: string;
  emoji?: string;
}) {
  return (
    <Link
      href={`/equipes/${slug}`}
      className="my-2 inline-flex items-center gap-2 rounded-lg border border-gray-200  bg-white  px-4 py-2 text-sm font-medium hover:shadow-md transition not-prose"
    >
      {emoji && <span>{emoji}</span>}
      <span className="text-primary ">{name}</span>
      <span className="text-xs text-gray-400">→</span>
    </Link>
  );
}

function MatchCard({
  label,
  slug,
}: {
  label: string;
  slug: string;
}) {
  return (
    <Link
      href={`/calendrier/${slug}`}
      className="my-2 inline-flex items-center gap-2 rounded-lg border border-gray-200  bg-white  px-4 py-2 text-sm font-medium hover:shadow-md transition not-prose"
    >
      ⚽ <span className="text-primary ">{label}</span>
      <span className="text-xs text-gray-400">→</span>
    </Link>
  );
}

function StadiumCard({
  name,
  slug,
  emoji,
}: {
  name: string;
  slug: string;
  emoji?: string;
}) {
  return (
    <Link
      href={`/stades/${slug}`}
      className="my-2 inline-flex items-center gap-2 rounded-lg border border-gray-200  bg-white  px-4 py-2 text-sm font-medium hover:shadow-md transition not-prose"
    >
      {emoji ?? "🏟️"} <span className="text-primary ">{name}</span>
      <span className="text-xs text-gray-400">→</span>
    </Link>
  );
}

function BettingCta({
  label,
  href,
}: {
  label?: string;
  href?: string;
}) {
  return (
    <div className="my-6 rounded-xl bg-gradient-to-r from-primary to-primary/80 p-6 text-center text-white not-prose">
      <p className="text-lg font-bold mb-3">
        {label ?? "Pariez sur la Coupe du Monde 2026"}
      </p>
      <a
        href={href ?? "/paris-sportifs"}
        className="inline-block rounded-lg bg-white text-primary font-bold px-6 py-2 hover:bg-gray-100 transition"
      >
        Voir les cotes →
      </a>
    </div>
  );
}

/* ── HTML overrides with Tailwind prose ── */

export const mdxComponents = {
  // Custom
  InfoBox,
  StatHighlight,
  TeamCard,
  MatchCard,
  StadiumCard,
  BettingCta,
  // Standard HTML — handled by prose classes, but we add link styling
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith("http");
    if (!isExternal && href) {
      return (
        <Link href={href} className="text-primary  hover:underline" {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary  hover:underline"
        {...props}
      >
        {children}
      </a>
    );
  },
};
