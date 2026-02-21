import Link from "next/link";
import { teams } from "@repo/data/teams";
import { stadiums } from "@repo/data/stadiums";
import { cities } from "@repo/data/cities";
import { players } from "@repo/data/players";

/* ── Types ── */

interface EntityEntry {
  name: string;
  href: string;
  priority: number; // lower = higher priority
}

/* ── Build lookup dictionary once at module level ── */

const MIN_NAME_LENGTH = 4;

function buildDictionary(): EntityEntry[] {
  const entries: EntityEntry[] = [];

  // Priority 0: teams
  for (const t of teams) {
    if (t.name.length >= MIN_NAME_LENGTH) {
      entries.push({ name: t.name, href: `/equipe/${t.slug}`, priority: 0 });
    }
  }

  // Priority 1: stadiums
  for (const s of stadiums) {
    if (s.name.length >= MIN_NAME_LENGTH) {
      entries.push({ name: s.name, href: `/stade/${s.slug}`, priority: 1 });
    }
  }

  // Priority 2: cities
  for (const c of cities) {
    if (c.name.length >= MIN_NAME_LENGTH) {
      entries.push({ name: c.name, href: `/ville/${c.slug}`, priority: 2 });
    }
  }

  // Priority 3: players (top 50 only)
  const top50 = players.slice(0, 50);
  for (const p of top50) {
    if (p.name.length >= MIN_NAME_LENGTH) {
      entries.push({ name: p.name, href: `/joueur/${p.slug}`, priority: 3 });
    }
  }

  // Sort: higher priority first (lower number), then longer names first (to match longest)
  entries.sort((a, b) => a.priority - b.priority || b.name.length - a.name.length);

  // Deduplicate by name (case-insensitive) — keep highest priority
  const seen = new Set<string>();
  return entries.filter((e) => {
    const key = e.name.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const ENTITY_DICT = buildDictionary();

/* ── Core auto-link function ── */

const MAX_LINKS = 5;

export interface TextSegment {
  type: "text" | "link";
  text: string;
  href?: string;
}

export function autoLinkSegments(
  text: string,
  currentPath?: string
): TextSegment[] {
  // Normalize currentPath for comparison
  const excludePath = currentPath?.replace(/\/$/, "");

  let segments: TextSegment[] = [{ type: "text", text }];
  let linkCount = 0;

  for (const entity of ENTITY_DICT) {
    if (linkCount >= MAX_LINKS) break;

    // Skip if this entity's page is the current page
    if (excludePath && excludePath === entity.href) continue;

    // Find first occurrence in a text segment (case-insensitive, word boundary)
    const regex = new RegExp(
      `(?<![\\p{L}\\p{N}])${escapeRegex(entity.name)}(?![\\p{L}\\p{N}])`,
      "iu"
    );

    let found = false;
    const newSegments: TextSegment[] = [];

    for (const seg of segments) {
      if (found || seg.type !== "text") {
        newSegments.push(seg);
        continue;
      }

      const match = regex.exec(seg.text);
      if (!match) {
        newSegments.push(seg);
        continue;
      }

      found = true;
      linkCount++;

      const before = seg.text.slice(0, match.index);
      const matched = seg.text.slice(match.index, match.index + match[0].length);
      const after = seg.text.slice(match.index + match[0].length);

      if (before) newSegments.push({ type: "text", text: before });
      newSegments.push({ type: "link", text: matched, href: entity.href });
      if (after) newSegments.push({ type: "text", text: after });
    }

    segments = newSegments;
  }

  return segments;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* ── React component ── */

interface AutoLinkedTextProps {
  text: string;
  currentPath?: string;
  className?: string;
}

export function AutoLinkedText({
  text,
  currentPath,
  className,
}: AutoLinkedTextProps) {
  const segments = autoLinkSegments(text, currentPath);

  return (
    <p className={className}>
      {segments.map((seg, i) =>
        seg.type === "link" ? (
          <Link
            key={i}
            href={seg.href!}
            className="text-primary hover:underline"
          >
            {seg.text}
          </Link>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </p>
  );
}
