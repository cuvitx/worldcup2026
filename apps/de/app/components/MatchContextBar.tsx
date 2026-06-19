import Link from "next/link";
import { Calendar, Clock, MapPin, Landmark, Tag } from "lucide-react";
import { matches } from "@repo/data/matches";
import { stadiums } from "../../lib/localized-data";
import { teams } from "../../lib/localized-data";

interface MatchContextBarProps {
  matchSlug: string;
}

const stageLabels: Record<string, string> = {
  group: "Gruppenphase",
  "round-of-32": "32es de finale",
  "round-of-16": "16es de finale",
  "quarter-final": "Viertelfinale",
  "semi-final": "Halbfinale",
  "third-place": "3e place",
  final: "Finale",
};

function formatDateFR(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatTimeFR(parisTime: string): string {
  const parts = parisTime.split(":").map(Number);
  const h = parts[0] ?? 0;
  const m = parts[1] ?? 0;
  // Times in matches.ts are already in Europe/Paris (CEST, UTC+2)
  return `${String(h).padStart(2, "0")}h${String(m).padStart(2, "0")}`;
}

export function MatchContextBar({ matchSlug }: MatchContextBarProps) {
  const match = matches.find((m) => m.slug === matchSlug);
  if (!match) return null;

  const stadium = stadiums.find((s) => s.id === match.stadiumId);
  const phase = stageLabels[match.stage] ?? match.stage;
  const groupLabel = match.group ? ` — Gruppe ${match.group}` : "";

  return (
    <div className="rounded-xl bg-gray-50 p-4">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-700">
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-4 w-4 text-primary" />
          {formatDateFR(match.date)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-primary" />
          {formatTimeFR(match.time)} (heure de Paris)
        </span>
        {stadium && (
          <>
            <Link
              href={`/stadion/${stadium.slug}`}
              className="inline-flex items-center gap-1.5 text-primary hover:text-accent transition-colors"
            >
              <Landmark className="h-4 w-4" />
              {stadium.name}
            </Link>
            <Link
              href={`/stadt/${stadium.cityId}`}
              className="inline-flex items-center gap-1.5 text-primary hover:text-accent transition-colors"
            >
              <MapPin className="h-4 w-4" />
              {stadium.city}
            </Link>
          </>
        )}
        <span className="inline-flex items-center gap-1.5">
          <Tag className="h-4 w-4 text-primary" />
          {phase}{groupLabel}
        </span>
        <Link
          href="/ou-regarder"
          className="text-primary hover:text-accent transition-colors"
        >
          Ou regarder
        </Link>
      </div>
    </div>
  );
}
