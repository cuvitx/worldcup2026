import { MatchCard, roundColors } from "./MatchCard";
import { r32Bracket, r32Winners, r16Matches, r16Winners, qfMatches, qfWinners, sfMatches, sfWinners, finalMatchData, champion } from "./bracket-data";

export function DesktopBracket() {
  return (
    <section className="hidden lg:block overflow-x-auto">
      <div className="flex gap-6 items-start min-w-max pb-4">
        {/* Round of 32 */}
        <div className="space-y-3 shrink-0">
          <div className="text-center mb-4"><span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white ${roundColors["round-of-32"]!.badge}`}>32e de finale</span></div>
          {r32Bracket.map((m, i) => (
            <MatchCard key={m.matchId} matchId={m.matchId} homeTeamId={m.homeTeamId} awayTeamId={m.awayTeamId} homeLabel={m.homeLabel} awayLabel={m.awayLabel} winnerId={r32Winners[i] ?? null} stage="round-of-32" />
          ))}
        </div>

        {/* Round of 16 */}
        <div className="space-y-3 shrink-0 pt-[36px]">
          <div className="text-center mb-4"><span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white ${roundColors["round-of-16"]!.badge}`}>16e de finale</span></div>
          {r16Matches.map((m, i) => (
            <div key={m.matchId} className="mb-[52px]"><MatchCard matchId={m.matchId} homeTeamId={m.homeTeamId} awayTeamId={m.awayTeamId} winnerId={r16Winners[i] ?? null} stage="round-of-16" /></div>
          ))}
        </div>

        {/* Quarter-finals */}
        <div className="space-y-3 shrink-0 pt-[108px]">
          <div className="text-center mb-4"><span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white ${roundColors["quarter-final"]!.badge}`}>Quarts de finale</span></div>
          {qfMatches.map((m, i) => (
            <div key={m.matchId} className="mb-[172px]"><MatchCard matchId={m.matchId} homeTeamId={m.homeTeamId} awayTeamId={m.awayTeamId} winnerId={qfWinners[i] ?? null} stage="quarter-final" /></div>
          ))}
        </div>

        {/* Semi-finals */}
        <div className="space-y-3 shrink-0 pt-[252px]">
          <div className="text-center mb-4"><span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white ${roundColors["semi-final"]!.badge}`}>Demi-finales</span></div>
          {sfMatches.map((m, i) => (
            <div key={m.matchId} className="mb-[412px]"><MatchCard matchId={m.matchId} homeTeamId={m.homeTeamId} awayTeamId={m.awayTeamId} winnerId={sfWinners[i] ?? null} stage="semi-final" /></div>
          ))}
        </div>

        {/* Final */}
        <div className="space-y-3 shrink-0 pt-[480px]">
          <div className="text-center mb-4"><span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white ${roundColors.final!.badge}`}>Finale</span></div>
          <MatchCard matchId={finalMatchData.matchId} homeTeamId={finalMatchData.homeTeamId} awayTeamId={finalMatchData.awayTeamId} winnerId={champion} stage="final" />
        </div>
      </div>
    </section>
  );
}

export function MobileBracket() {
  return (
    <section className="lg:hidden overflow-x-auto -mx-4 px-4">
      <div className="flex gap-4 items-start min-w-max pb-4">
        <div className="space-y-2 shrink-0 w-[200px]">
          <div className="text-center mb-3"><span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold text-white ${roundColors["round-of-32"]!.badge}`}>32e</span></div>
          {r32Bracket.map((m, i) => (
            <MatchCard key={m.matchId} matchId={m.matchId} homeTeamId={m.homeTeamId} awayTeamId={m.awayTeamId} homeLabel={m.homeLabel} awayLabel={m.awayLabel} winnerId={r32Winners[i] ?? null} stage="round-of-32" />
          ))}
        </div>
        <div className="space-y-2 shrink-0 w-[200px] pt-[28px]">
          <div className="text-center mb-3"><span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold text-white ${roundColors["round-of-16"]!.badge}`}>16e</span></div>
          {r16Matches.map((m, i) => (
            <div key={m.matchId} className="mb-[40px]"><MatchCard matchId={m.matchId} homeTeamId={m.homeTeamId} awayTeamId={m.awayTeamId} winnerId={r16Winners[i] ?? null} stage="round-of-16" /></div>
          ))}
        </div>
        <div className="space-y-2 shrink-0 w-[200px] pt-[80px]">
          <div className="text-center mb-3"><span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold text-white ${roundColors["quarter-final"]!.badge}`}>Quarts</span></div>
          {qfMatches.map((m, i) => (
            <div key={m.matchId} className="mb-[130px]"><MatchCard matchId={m.matchId} homeTeamId={m.homeTeamId} awayTeamId={m.awayTeamId} winnerId={qfWinners[i] ?? null} stage="quarter-final" /></div>
          ))}
        </div>
        <div className="space-y-2 shrink-0 w-[200px] pt-[180px]">
          <div className="text-center mb-3"><span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold text-white ${roundColors["semi-final"]!.badge}`}>Demis</span></div>
          {sfMatches.map((m, i) => (
            <div key={m.matchId} className="mb-[300px]"><MatchCard matchId={m.matchId} homeTeamId={m.homeTeamId} awayTeamId={m.awayTeamId} winnerId={sfWinners[i] ?? null} stage="semi-final" /></div>
          ))}
        </div>
        <div className="space-y-2 shrink-0 w-[200px] pt-[350px]">
          <div className="text-center mb-3"><span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold text-white ${roundColors.final!.badge}`}>Finale</span></div>
          <MatchCard matchId={finalMatchData.matchId} homeTeamId={finalMatchData.homeTeamId} awayTeamId={finalMatchData.awayTeamId} winnerId={champion} stage="final" />
        </div>
      </div>
    </section>
  );
}
