"use client";

import dynamic from "next/dynamic";

const BracketSimulator = dynamic(
  () => import("./BracketSimulator").then((m) => m.BracketSimulator),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center py-24 text-gray-400">
        Chargement du simulateur…
      </div>
    ),
  }
);

export default function BracketSimulatorLazy() {
  return <BracketSimulator />;
}
