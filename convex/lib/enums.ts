import { v } from "convex/values";

function literalUnion<T extends string>(values: readonly [T, ...T[]]) {
  const [first, ...rest] = values;
  return v.union(v.literal(first), ...rest.map((value) => v.literal(value)));
}

export const PROPERTY_STATUSES = [
  "researching",
  "contacted_agent",
  "scheduled_tour",
  "toured",
  "offer_made",
  "under_contract",
  "purchased",
  "passed",
] as const;

export const TOPOGRAPHIES = [
  "flat",
  "gently_sloped",
  "steep",
  "mixed",
] as const;

export const MINERAL_RIGHTS = ["included", "excluded", "unknown"] as const;

export const WATER_SOURCES = [
  "municipal",
  "private_well_existing",
  "well_needed",
  "shared_well",
  "unknown",
] as const;

export const WASTEWATER_TYPES = [
  "municipal_sewer",
  "septic_installed",
  "perc_test_passed",
  "perc_test_needed",
  "perc_test_failed",
  "unknown",
] as const;

export const ELECTRIC_AVAILABILITY = [
  "on_site",
  "available_at_road",
  "nearby_needs_extension",
  "unknown",
] as const;

export const GAS_TYPES = ["natural_gas", "propane_tank", "none"] as const;

export const INTERNET_TYPES = [
  "fiber",
  "cable",
  "dsl",
  "satellite",
  "none_confirmed",
  "unknown",
] as const;

export const ROAD_TYPES = [
  "paved",
  "gravel",
  "dirt",
  "private_easement",
  "unknown",
] as const;

export const ROAD_MAINTENANCE = [
  "county",
  "hoa",
  "private_owner",
  "unknown",
] as const;

export const FIRE_DEPT_ACCESS = [
  "adequate",
  "needs_improvements",
  "unknown",
] as const;

export const FIRE_RISK_ZONES = [
  "low",
  "moderate",
  "high",
  "very_high",
  "unknown",
] as const;

export const LANDSLIDE_RISKS = ["low", "moderate", "high", "unknown"] as const;

export const CONTACT_ROLES = [
  "builder",
  "general_contractor",
  "well_driller",
  "septic_installer",
  "electrician",
  "surveyor",
  "real_estate_agent",
  "inspector",
  "other",
] as const;

export const DOCUMENT_LABELS = [
  "survey",
  "perc_test",
  "disclosure",
  "other",
] as const;

export const propertyStatusValidator = literalUnion(PROPERTY_STATUSES);
export const topographyValidator = literalUnion(TOPOGRAPHIES);
export const mineralRightsValidator = literalUnion(MINERAL_RIGHTS);
export const waterSourceValidator = literalUnion(WATER_SOURCES);
export const wastewaterValidator = literalUnion(WASTEWATER_TYPES);
export const electricValidator = literalUnion(ELECTRIC_AVAILABILITY);
export const gasValidator = literalUnion(GAS_TYPES);
export const internetValidator = literalUnion(INTERNET_TYPES);
export const roadTypeValidator = literalUnion(ROAD_TYPES);
export const roadMaintenanceValidator = literalUnion(ROAD_MAINTENANCE);
export const fireDeptAccessValidator = literalUnion(FIRE_DEPT_ACCESS);
export const fireRiskValidator = literalUnion(FIRE_RISK_ZONES);
export const landslideRiskValidator = literalUnion(LANDSLIDE_RISKS);
export const contactRoleValidator = literalUnion(CONTACT_ROLES);
export const documentLabelValidator = literalUnion(DOCUMENT_LABELS);

export const contactValidator = v.object({
  name: v.string(),
  role: contactRoleValidator,
  company: v.optional(v.string()),
  phone: v.optional(v.string()),
  email: v.optional(v.string()),
  notes: v.optional(v.string()),
});

export const priceHistoryEntryValidator = v.object({
  date: v.number(),
  price: v.number(),
});

export const visitLogEntryValidator = v.object({
  date: v.number(),
  notes: v.string(),
});

export type PropertyStatus = (typeof PROPERTY_STATUSES)[number];
export type Topography = (typeof TOPOGRAPHIES)[number];
export type MineralRights = (typeof MINERAL_RIGHTS)[number];
export type WaterSource = (typeof WATER_SOURCES)[number];
export type WastewaterType = (typeof WASTEWATER_TYPES)[number];
export type ElectricAvailability = (typeof ELECTRIC_AVAILABILITY)[number];
export type GasType = (typeof GAS_TYPES)[number];
export type InternetType = (typeof INTERNET_TYPES)[number];
export type RoadType = (typeof ROAD_TYPES)[number];
export type RoadMaintenance = (typeof ROAD_MAINTENANCE)[number];
export type FireDeptAccess = (typeof FIRE_DEPT_ACCESS)[number];
export type FireRiskZone = (typeof FIRE_RISK_ZONES)[number];
export type LandslideRisk = (typeof LANDSLIDE_RISKS)[number];
export type DocumentLabel = (typeof DOCUMENT_LABELS)[number];
export type ContactRole = (typeof CONTACT_ROLES)[number];

export const STATUS_LABELS: Record<PropertyStatus, string> = {
  researching: "Researching",
  contacted_agent: "Contacted agent",
  scheduled_tour: "Scheduled tour",
  toured: "Toured",
  offer_made: "Offer made",
  under_contract: "Under contract",
  purchased: "Purchased",
  passed: "Passed",
};

export const STATUS_COLORS: Record<PropertyStatus, string> = {
  researching: "#64748b",
  contacted_agent: "#0ea5e9",
  scheduled_tour: "#8b5cf6",
  toured: "#06b6d4",
  offer_made: "#f59e0b",
  under_contract: "#f97316",
  purchased: "#16a34a",
  passed: "#94a3b8",
};
