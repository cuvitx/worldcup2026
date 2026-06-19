// Import this file once in apps/de/layout.tsx to load all German translations
// into the i18n overlay system.

import { registerTeamTranslations } from "../i18n";
import { teamsDE } from "./teams.de";

// Register all DE translations
registerTeamTranslations("de", teamsDE);

// Stadium and city translations will be added later
// registerStadiumTranslations("de", stadiumsDE);
// registerCityTranslations("de", citiesDE);
// registerPlayerTranslations("de", playersDE);
