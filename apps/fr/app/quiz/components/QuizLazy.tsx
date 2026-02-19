"use client";

import dynamic from "next/dynamic";

const Quiz = dynamic(() => import("./Quiz"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-24 text-gray-400">
      Chargement du quiz…
    </div>
  ),
});

export default function QuizLazy() {
  return <Quiz />;
}
