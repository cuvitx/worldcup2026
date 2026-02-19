"use client";

import dynamic from "next/dynamic";

const StadiumMap = dynamic(
  () => import("./StadiumMap").then((m) => m.StadiumMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
        Chargement de la carte…
      </div>
    ),
  }
);

export default function StadiumMapLazy() {
  return <StadiumMap />;
}
