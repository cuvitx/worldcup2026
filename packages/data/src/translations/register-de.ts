// Import this file once in apps/de/layout.tsx to load all German translations
// into the i18n overlay system.

import { registerTeamTranslations, registerStadiumTranslations, registerCityTranslations } from "../i18n";
import { teamsDE } from "./teams.de";
import { stadiumsDE } from "./stadiums.de";
import { citiesDE } from "./cities.de";

// Register all DE translations
registerTeamTranslations("de", teamsDE);
registerStadiumTranslations("de", stadiumsDE);
registerCityTranslations("de", citiesDE);
