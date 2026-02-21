import { StatBar } from "@repo/ui/stat-bar";

interface Country {
  country: string;
  titles: number;
  color:
    | "green"
    | "accent"
    | "blue"
    | "teal"
    | "orange"
    | "purple"
    | "gold"
    | "field";
}

interface TitledCountriesSectionProps {
  titledCountries: Country[];
}

export function TitledCountriesSection({
  titledCountries,
}: TitledCountriesSectionProps) {
  const maxTitles = Math.max(...titledCountries.map((c) => c.titles));

  return (
    <section id="pays-titres">
      <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
         Pays les plus titrés
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Seules 8 nations ont remporté la Coupe du Monde depuis 1930.
      </p>
      <div className="rounded-xl border border-gray-200 bg-whiteslate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
        <div className="space-y-5">
          {titledCountries.map((c, i) => (
            <div key={c.country} className="flex items-center gap-3">
              <span className="w-6 text-sm font-bold text-gray-400 text-center flex-shrink-0">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <StatBar
                  label={c.country}
                  value={c.titles}
                  maxValue={maxTitles}
                  color={c.color}
                  suffix={c.titles > 1 ? " titres" : " titre"}
                  size="lg"
                  animDelay={i * 80}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-gray-400 text-center">
          * Seules des équipes européennes et sud-américaines ont remporté le titre.
        </p>
      </div>
    </section>
  );
}
