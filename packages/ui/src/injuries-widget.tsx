const translations = {
  fr: { title: "Blessures & Absences", noInjuries: "Aucune blessure signalee", absent: "Absent" },
  en: { title: "Injuries & Absences", noInjuries: "No injuries reported", absent: "Out" },
  es: { title: "Lesiones & Ausencias", noInjuries: "Sin lesiones reportadas", absent: "Ausente" },
};

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
  locale?: "fr" | "en" | "es";
}

const typeColors: Record<string, string> = {
  "Missing Fixture": "bg-red-100 text-red-700",
  "Questionable": "bg-yellow-100 text-yellow-700",
  "Doubtful": "bg-orange-100 text-orange-700",
};

function InjuryList({ team, injuries, t }: { team: string; injuries: Injury[]; t: { noInjuries: string; absent: string } }) {
  if (injuries.length === 0) {
    return (
      <div>
        <p className="font-semibold text-gray-700 dark:text-gray-200 mb-2">{team}</p>
        <p className="text-sm text-green-600">{t.noInjuries}</p>
      </div>
    );
  }

  return (
    <div>
      <p className="font-semibold text-gray-700 dark:text-gray-200 mb-2">{team}</p>
      <ul className="space-y-1.5">
        {injuries.map((inj) => (
          <li key={inj.player} className="flex items-center gap-2 text-sm">
            <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${typeColors[inj.type] ?? "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"}`}>
              {inj.type === "Missing Fixture" ? t.absent : inj.type}
            </span>
            <span className="font-medium text-gray-800 dark:text-gray-200">{inj.player}</span>
            <span className="text-gray-500 dark:text-gray-400">— {inj.reason}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function InjuriesWidget({ homeTeam, awayTeam, homeInjuries, awayInjuries, locale }: InjuriesWidgetProps) {
  const t = translations[locale ?? "fr"];

  if (homeInjuries.length === 0 && awayInjuries.length === 0) return null;

  return (
    <div className="rounded-lg bg-white dark:bg-slate-800 p-4 shadow-sm">
      <h4 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wide">
        {t.title}
      </h4>
      <div className="space-y-4">
        <InjuryList team={homeTeam} injuries={homeInjuries} t={t} />
        <InjuryList team={awayTeam} injuries={awayInjuries} t={t} />
      </div>
    </div>
  );
}
