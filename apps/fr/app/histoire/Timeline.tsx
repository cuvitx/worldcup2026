import { EditionCard, type CdmEdition } from "./EditionCard";

interface TimelineProps {
  editions: CdmEdition[];
}

export function Timeline({ editions }: TimelineProps) {
  return (
    <div className="relative">
      {/* Ligne centrale verticale (desktop uniquement) */}
      <div className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/30 to-primary" />

      <div className="space-y-8">
        {editions.map((ed, i) => (
          <EditionCard
            key={ed.year}
            edition={ed}
            side={i % 2 === 0 ? "left" : "right"}
          />
        ))}
      </div>
    </div>
  );
}
