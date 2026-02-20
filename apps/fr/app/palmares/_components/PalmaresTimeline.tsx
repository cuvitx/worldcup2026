import Link from "next/link";
import type { WorldCupEdition } from "./palmares-data";

export function PalmaresTimeline({ editions }: { editions: WorldCupEdition[] }) {
 return (
 <section>
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
 Timeline — tous les vainqueurs
 </h2>
 <p className="text-sm text-gray-500 dark:text-gray-300 mb-6">
 Cliquez sur une édition pour voir les détails.
 </p>

 {/* Timeline visual */}
 <div className="relative">
 {/* Line */}
 <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary to-primary hidden sm:block" />
 <div className="space-y-3 sm:pl-20">
 {editions.map((ed) => (
 <div
 key={ed.year}
 className="group relative rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-4 shadow-sm hover:border-primary/30 hover:shadow-md transition-all"
 >
 {/* Dot on timeline */}
 <div className="absolute left-[26px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-primary/20 bg-white dark:bg-slate-800 hidden sm:block group-hover:bg-primary transition-colors" />
 <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 items-center">
 <div className="col-span-2 sm:col-span-1">
 <span className="text-2xl font-extrabold text-primary">{ed.year}</span>
 <div className="text-xs text-gray-500 flex items-center gap-1">
 <span>{ed.hostFlag}</span>
 <span>{ed.host}</span>
 </div>
 </div>
 <div className="flex items-center gap-2">
 <span className="text-3xl">{ed.winnerFlag}</span>
 <div>
 <div className="font-bold text-sm">{ed.winner}</div>
 <div className="text-xs text-accent dark:text-accent">
 Champion
 </div>
 </div>
 </div>
 <div className="text-center text-gray-500 dark:text-gray-300">
 <div className="font-mono font-bold text-lg">{ed.score}</div>
 <div className="text-xs">Score final</div>
 </div>
 <div className="flex items-center gap-2">
 <span className="text-3xl">{ed.runnerUpFlag}</span>
 <div>
 <div className="font-semibold text-sm text-gray-600 dark:text-gray-300">
 {ed.runnerUp}
 </div>
 <div className="text-xs text-gray-500"> Finaliste</div>
 </div>
 </div>
 <div className="text-xs text-gray-500 dark:text-gray-300 hidden sm:block">
 <div className="flex items-center gap-1">
 <span>{ed.thirdPlaceFlag}</span>
 <span>{ed.thirdPlace}</span>
 <span className="text-gray-500 dark:text-gray-600">(3e)</span>
 </div>
 <div className="mt-1">
 {ed.topScorer} ({ed.topScorerGoals} buts)
 </div>
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>
 );
}
