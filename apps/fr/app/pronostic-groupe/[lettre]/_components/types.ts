import type { teamsById } from "@repo/data/teams";
import type { predictionsByTeamId } from "@repo/data/predictions";

export type Team = NonNullable<(typeof teamsById)[string]>;
export type Prediction = NonNullable<(typeof predictionsByTeamId)[string]>;

export interface SortedTeam {
  team: Team;
  pred: Prediction | undefined;
  id: string;
}
