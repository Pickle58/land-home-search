import { v } from "convex/values";

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

export const propertyStatusValidator = v.union(
  v.literal("researching"),
  v.literal("contacted_agent"),
  v.literal("scheduled_tour"),
  v.literal("toured"),
  v.literal("offer_made"),
  v.literal("under_contract"),
  v.literal("purchased"),
  v.literal("passed"),
);

export const topographyValidator = v.union(
  v.literal("flat"),
  v.literal("gently_sloped"),
  v.literal("steep"),
  v.literal("mixed"),
);

export const mineralRightsValidator = v.union(
  v.literal("included"),
  v.literal("excluded"),
  v.literal("unknown"),
);

export const waterSourceValidator = v.union(
  v.literal("municipal"),
  v.literal("private_well_existing"),
  v.literal("well_needed"),
  v.literal("shared_well"),
  v.literal("unknown"),
);

export const wastewaterValidator = v.union(
  v.literal("municipal_sewer"),
  v.literal("septic_installed"),
  v.literal("perc_test_passed"),
  v.literal("perc_test_needed"),
  v.literal("perc_test_failed"),
  v.literal("unknown"),
);

export const electricValidator = v.union(
  v.literal("on_site"),
  v.literal("available_at_road"),
  v.literal("nearby_needs_extension"),
  v.literal("unknown"),
);

export const gasValidator = v.union(
  v.literal("natural_gas"),
  v.literal("propane_tank"),
  v.literal("none"),
);

export const internetValidator = v.union(
  v.literal("fiber"),
  v.literal("cable"),
  v.literal("dsl"),
  v.literal("satellite"),
  v.literal("none_confirmed"),
  v.literal("unknown"),
);

export const roadTypeValidator = v.union(
  v.literal("paved"),
  v.literal("gravel"),
  v.literal("dirt"),
  v.literal("private_easement"),
  v.literal("unknown"),
);

export const roadMaintenanceValidator = v.union(
  v.literal("county"),
  v.literal("hoa"),
  v.literal("private_owner"),
  v.literal("unknown"),
);

export const fireDeptAccessValidator = v.union(
  v.literal("adequate"),
  v.literal("needs_improvements"),
  v.literal("unknown"),
);

export const fireRiskValidator = v.union(
  v.literal("low"),
  v.literal("moderate"),
  v.literal("high"),
  v.literal("very_high"),
  v.literal("unknown"),
);

export const landslideRiskValidator = v.union(
  v.literal("low"),
  v.literal("moderate"),
  v.literal("high"),
  v.literal("unknown"),
);

export const contactRoleValidator = v.union(
  v.literal("builder"),
  v.literal("general_contractor"),
  v.literal("well_driller"),
  v.literal("septic_installer"),
  v.literal("electrician"),
  v.literal("surveyor"),
  v.literal("real_estate_agent"),
  v.literal("inspector"),
  v.literal("other"),
);

export const documentLabelValidator = v.union(
  v.literal("survey"),
  v.literal("perc_test"),
  v.literal("disclosure"),
  v.literal("other"),
);

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
export type WaterSource = (typeof WATER_SOURCES)[number];
export type WastewaterType = (typeof WASTEWATER_TYPES)[number];
export type ElectricAvailability = (typeof ELECTRIC_AVAILABILITY)[number];
export type FireDeptAccess = (typeof FIRE_DEPT_ACCESS)[number];
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
