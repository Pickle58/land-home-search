import {
  ELECTRIC_AVAILABILITY,
  FIRE_DEPT_ACCESS,
  FIRE_RISK_ZONES,
  GAS_TYPES,
  INTERNET_TYPES,
  LANDSLIDE_RISKS,
  MINERAL_RIGHTS,
  PROPERTY_STATUSES,
  ROAD_MAINTENANCE,
  ROAD_TYPES,
  TOPOGRAPHIES,
  WASTEWATER_TYPES,
  WATER_SOURCES,
} from "./enums";
import { propertyFieldsValidator } from "./propertyFields";

/** Nested/complex arrays documented specially (or omitted) in the LLM prompt. */
const EXCLUDED_EXTRACTION_FIELDS = new Set([
  "priceHistory",
  "contacts",
  "visitLog",
]);

function enumLine(name: string, values: readonly string[]): string {
  return `${name}: ${values.join("|")}`;
}

const fieldKeys = Object.keys(propertyFieldsValidator).filter(
  (key) => !EXCLUDED_EXTRACTION_FIELDS.has(key),
);

export const EXTRACTION_PROMPT = `You extract structured real-estate / vacant land listing data into JSON.
Return ONLY valid JSON (no markdown). Use null for unknown fields.
Schema keys (use these exact names):
${fieldKeys.join(", ")}

Enums when applicable:
${enumLine("status", PROPERTY_STATUSES)}
${enumLine("topography", TOPOGRAPHIES)}
${enumLine("mineralRights", MINERAL_RIGHTS)}
${enumLine("waterSource", WATER_SOURCES)}
${enumLine("wastewater", WASTEWATER_TYPES)}
${enumLine("electric", ELECTRIC_AVAILABILITY)}
${enumLine("gas", GAS_TYPES)}
${enumLine("internet", INTERNET_TYPES)}
${enumLine("roadType", ROAD_TYPES)}
${enumLine("roadMaintenance", ROAD_MAINTENANCE)}
${enumLine("fireDeptAccessAdequate", FIRE_DEPT_ACCESS)}
${enumLine("fireRiskZone", FIRE_RISK_ZONES)}
${enumLine("landslideRisk", LANDSLIDE_RISKS)}
tags should be a string array when present.`;
