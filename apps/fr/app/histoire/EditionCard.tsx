import { Users } from "lucide-react"
export interface CdmEdition {
  year: number;
  host: string;
  hostFlag: string;
  winner: string;
  winnerFlag: string;
  runnerUp: string;
  runnerUpFlag: string;
  score: string;
  topScorer: string;
  topScorerGoals: number;
  teams: number;
  totalGoals: number;
  highlight: string;
  highlightDetail: string;
  color: string;
}

interface EditionCardProps {
  edition: CdmEdition;
  side: "left" | "right";
}

export function EditionCard({ edition, side }: EditionCardProps) {
  const isLeft = side === "left";

  return (
    <div
      className={`relative flex items-start gap-0 ${
        isLeft ? "flex-row" : "flex-row-reverse"
      }`}
    >
      <div
        className={`w-full md:w-[calc(50%-2rem)] ${
          isLeft ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"
        }`}
      >
        <div className="rounded-xl border border-gray-200 bg-whiteslate-800 shadow-sm p-5 hover:shadow-md transition-shadow group">
          <div
            className={`flex items-center gap-3 mb-3 ${
              isLeft ? "md:flex-row-reverse" : "flex-row"
            }`}
          >
            <span
              className={`text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${edition.color}`}
            >
              {edition.year}
            </span>
            <div className={`flex-1 ${isLeft ? "md:text-right" : ""}`}>
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                {edition.hostFlag} {edition.host}
              </div>
            </div>
          </div>

          <div
            className={`flex items-center gap-2 mb-2 ${
              isLeft ? "md:justify-end" : "justify-start"
            }`}
          >
            <span className="text-2xl">{edition.winnerFlag}</span>
            <div>
              <div className="font-bold text-gray-900">
                {edition.winner}
              </div>
              <div className="text-xs text-accent font-medium">
                 Champion · {edition.score} vs {edition.runnerUpFlag} {edition.runnerUp}
              </div>
            </div>
          </div>

          <div
            className={`flex items-center gap-2 text-xs text-gray-500 mb-3 ${
              isLeft ? "md:justify-end" : ""
            }`}
          >
            <span></span>
            <span>
              <strong>{edition.topScorer}</strong> — {edition.topScorerGoals} but
              {edition.topScorerGoals > 1 ? "s" : ""}
            </span>
          </div>

          <div
            className={`border-t border-gray-100 pt-3 ${
              isLeft ? "md:text-right" : ""
            }`}
          >
            <div className="text-xs font-bold text-primary uppercase tracking-wide mb-1">
              {edition.highlight}
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              {edition.highlightDetail}
            </p>
          </div>

          <div
            className={`flex items-center gap-3 mt-3 text-xs text-gray-500 ${
              isLeft ? "md:justify-end" : ""
            }`}
          >
            <span className="flex items-center gap-1">
              <span><Users className="h-5 w-5 inline-block" /></span> {edition.teams} équipes
            </span>
            <span className="flex items-center gap-1">
              <span></span> {edition.totalGoals} buts
            </span>
          </div>
        </div>
      </div>

      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-10">
        <div
          className={`w-10 h-10 rounded-full border-4 border-white flex items-center justify-center text-sm font-bold text-white shadow-lg bg-gradient-to-br ${edition.color}`}
        >
          {edition.winnerFlag}
        </div>
      </div>

      <div className="hidden md:block w-[calc(50%-2rem)]" />
    </div>
  );
}
