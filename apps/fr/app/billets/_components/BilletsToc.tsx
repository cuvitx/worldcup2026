"use client";

import { TableOfContents } from "@repo/ui";

const tocItems = [
  { id: "prix", label: "Prix par phase", level: 2 },
  { id: "comment-acheter", label: "Comment acheter", level: 2 },
  { id: "phases-vente", label: "Phases de vente", level: 2 },
  { id: "categories", label: "Catégories de billets", level: 2 },
  { id: "anti-arnaques", label: "Éviter les arnaques", level: 2 },
];

export function BilletsToc() {
  return (
    <div className="hidden lg:block fixed right-[max(1rem,calc((100vw-80rem)/2+1rem))] top-24 w-[200px]">
      <TableOfContents items={tocItems} />
    </div>
  );
}
