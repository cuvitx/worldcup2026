"use client";

import { TableOfContents } from "@repo/ui";

const tocItems = [
  { id: "preise", label: "Preise nach Phase", level: 2 },
  { id: "so-kaufen", label: "So kaufen Sie", level: 2 },
  { id: "verkaufsphasen", label: "Verkaufsphasen", level: 2 },
  { id: "categories", label: "Ticketkategorien", level: 2 },
  { id: "betrug-vermeiden", label: "Betrug vermeiden", level: 2 },
];

export function TicketsToc() {
  return (
    <div className="hidden xl:block fixed right-[max(1rem,calc((100vw-80rem)/2+1rem))] top-24 w-[200px]">
      <TableOfContents items={tocItems} />
    </div>
  );
}
