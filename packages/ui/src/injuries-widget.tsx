/**
 * Translations for injuries widget.
 */
const translations = {
  fr: { title: "Blessures & Absences", noInjuries: "Aucune blessure signalee", absent: "Absent" },
  en: { title: "Injuries & Absences", noInjuries: "No injuries reported", absent: "Out" },
  es: { title: "Lesiones & Ausencias", noInjuries: "Sin lesiones reportadas", absent: "Ausente" },
};

/**
 * A player injury/absence record.
 * 
 * @param player - Player name
 * @param reason - Injury reason (e.g., "Hamstring")
 * @param type - Injury type (e.g., "Missing Fixture", "Questionable")
 */
interface Injury {
  player: string;
  reason: string;
  type: string;
}

/**
 * Props for the InjuriesWidget component.
 * 
 * @param homeTeam - Home team name
 * @param awayTeam - Away team name
 * @param homeInjuries - Home team injuries
 * @param awayInjuries - Away team injuries
 * @param locale - UI language
 */
interface InjuriesWidgetProps {
  homeTeam: string;
  awayTeam: string;
  homeInjuries: Injury[];
  awayInjuries: Injury[];
  locale?: "fr" | "en" | "es";
}

/**
 * Injury type color mapping.
 */
const typeColors: Record<string, string> = {
  "Missing Fixture": "bg-red-100 text-red-700",
  "Questionable": "bg-secondary/10 text-secondary",
  "Doubtful": "bg-secondary/10 text-secondary",
};

function InjuryList({ team, injuries, t }: { team: string; injuries: Injury[]; t: { noInjuries: string; absent: string } }) {
  if (injuries.length === 0) {
    return (
      <div>
        <p className="font-semibold text-gray-700 mb-2">{team}</p>
        <p className="text-sm text-accent">{t.noInjuries}</p>
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
              {inj.type === "Missing Fixture" ? t.absent : inj.type}
            </span>
            <span className="font-medium text-gray-800">{inj.player}</span>
            <span className="text-gray-500">— {inj.reason}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * InjuriesWidget component — Displays injuries and absences for both teams.
 * 
 * Shows color-coded badges for injury severity.
 * Hides if no injuries.
 * 
 * @example
 * ```tsx
 * <InjuriesWidget
 *   homeTeam="France"
 *   awayTeam="Brésil"
 *   homeInjuries={[
 *     { player: "Benzema", reason: "Hamstring", type: "Missing Fixture" }
 *   ]}
 *   awayInjuries={[]}
 *   locale="fr"
 * />
 * ```
 */
export function InjuriesWidget({ homeTeam, awayTeam, homeInjuries, awayInjuries, locale }: InjuriesWidgetProps) {
  const t = translations[locale ?? "fr"];

  if (homeInjuries.length === 0 && awayInjuries.length === 0) return null;

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <h4 className="mb-3 text-sm font-semibold text-gray-700 uppercase tracking-wide">
        {t.title}
      </h4>
      <div className="space-y-4">
        <InjuryList team={homeTeam} injuries={homeInjuries} t={t} />
        <InjuryList team={awayTeam} injuries={awayInjuries} t={t} />
      </div>
    </div>
  );
}
