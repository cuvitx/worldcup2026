import Link from "next/link";
import { Calendar, Clock, MapPin, Landmark, Tag } from "lucide-react";
import { matches } from "@repo/data/matches";
import { stadiums } from "@repo/data/stadiums";
import { teams } from "@repo/data/teams";

interface MatchContextBarProps {
  matchSlug: string;
}

const stageLabels: Record<string, string> = {
  group: "Phase de groupes",
  "round-of-32": "32es de finale",
  "round-of-16": "16es de finale",
  "quarter-final": "Quart de finale",
  "semi-final": "Demi-finale",
  "third-place": "3e place",
  final: "Finale",
};

function formatDateFR(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatTimeFR(utcTime: string): string {
  const parts = utcTime.split(":").map(Number);
  const h = parts[0] ?? 0;
  const m = parts[1] ?? 0;
  // UTC to CEST (UTC+2 in summer for France during the World Cup)
  const cetH = (h + 2) % 24;
  return `${String(cetH).padStart(2, "0")}h${String(m).padStart(2, "0")}`;
}

export function MatchContextBar({ matchSlug }: MatchContextBarProps) {
  const match = matches.find((m) => m.slug === matchSlug);
  if (!match) return null;

  const stadium = stadiums.find((s) => s.id === match.stadiumId);
  const phase = stageLabels[match.stage] ?? match.stage;
  const groupLabel = match.group ? ` — Groupe ${match.group}` : "";

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
              href={`/stade/${stadium.slug}`}
              className="inline-flex items-center gap-1.5 text-primary hover:text-accent transition-colors"
            >
              <Landmark className="h-4 w-4" />
              {stadium.name}
            </Link>
            <Link
              href={`/ville/${stadium.cityId}`}
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
