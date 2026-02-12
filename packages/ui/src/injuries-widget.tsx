interface Injury {
  player: string;
  reason: string;
  type: string;
}

interface InjuriesWidgetProps {
  homeTeam: string;
  awayTeam: string;
  homeInjuries: Injury[];
  awayInjuries: Injury[];
}

const typeColors: Record<string, string> = {
  "Missing Fixture": "bg-red-100 text-red-700",
  "Questionable": "bg-yellow-100 text-yellow-700",
  "Doubtful": "bg-orange-100 text-orange-700",
};

function InjuryList({ team, injuries }: { team: string; injuries: Injury[] }) {
  if (injuries.length === 0) {
    return (
      <div>
        <p className="font-semibold text-gray-700 mb-2">{team}</p>
        <p className="text-sm text-green-600">Aucune blessure signalee</p>
      </div>
    );
  }

  return (
    <div>
      <p className="font-semibold text-gray-700 mb-2">{team}</p>
      <ul className="space-y-1.5">
        {injuries.map((inj) => (
          <li key={inj.player} className="flex items-center gap-2 text-sm">
            <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${typeColors[inj.type] ?? "bg-gray-100 text-gray-600"}`}>
              {inj.type === "Missing Fixture" ? "Absent" : inj.type}
            </span>
            <span className="font-medium text-gray-800">{inj.player}</span>
            <span className="text-gray-500">— {inj.reason}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function InjuriesWidget({ homeTeam, awayTeam, homeInjuries, awayInjuries }: InjuriesWidgetProps) {
  if (homeInjuries.length === 0 && awayInjuries.length === 0) return null;

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <h4 className="mb-3 text-sm font-semibold text-gray-700 uppercase tracking-wide">
        Blessures & Absences
      </h4>
      <div className="space-y-4">
        <InjuryList team={homeTeam} injuries={homeInjuries} />
        <InjuryList team={awayTeam} injuries={awayInjuries} />
      </div>
    </div>
  );
}
