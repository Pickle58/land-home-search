import { v } from "convex/values";
import {
  contactValidator,
  electricValidator,
  fireDeptAccessValidator,
  fireRiskValidator,
  gasValidator,
  internetValidator,
  landslideRiskValidator,
  mineralRightsValidator,
  priceHistoryEntryValidator,
  propertyStatusValidator,
  roadMaintenanceValidator,
  roadTypeValidator,
  topographyValidator,
  visitLogEntryValidator,
  wastewaterValidator,
  waterSourceValidator,
} from "./enums";

/** Shared writable property fields (create / update). */
export const propertyFieldsValidator = {
  address: v.optional(v.string()),
  city: v.string(),
  county: v.string(),
  state: v.string(),
  zip: v.string(),
  latitude: v.number(),
  longitude: v.number(),
  subdivision: v.optional(v.string()),
  schoolDistrict: v.optional(v.string()),

  listingUrl: v.string(),
  mlsNumber: v.optional(v.string()),
  price: v.number(),
  status: propertyStatusValidator,
  dateFound: v.number(),
  source: v.string(),
  agentName: v.optional(v.string()),
  agentContact: v.optional(v.string()),

  lotSizeAcres: v.number(),
  buildableAcres: v.optional(v.number()),
  zoning: v.string(),
  topography: topographyValidator,
  elevation: v.optional(v.number()),
  viewDescription: v.optional(v.string()),
  easements: v.optional(v.string()),
  mineralRights: mineralRightsValidator,
  waterRights: v.optional(v.string()),
  hoaOrDeedRestrictions: v.boolean(),
  hoaOrDeedDetails: v.optional(v.string()),
  setbackNotes: v.optional(v.string()),

  waterSource: waterSourceValidator,
  wellDepthFt: v.optional(v.number()),
  wellGpm: v.optional(v.number()),
  wastewater: wastewaterValidator,
  septicNotes: v.optional(v.string()),
  electric: electricValidator,
  distanceToNearestPoleFt: v.optional(v.number()),
  estimatedExtensionCost: v.optional(v.number()),
  gas: gasValidator,
  internet: internetValidator,
  cellSignalNotes: v.optional(v.string()),

  roadType: roadTypeValidator,
  roadMaintenance: roadMaintenanceValidator,
  drivewayInstalled: v.boolean(),
  distanceFromPavedRoadMiles: v.optional(v.number()),
  fireDeptAccessAdequate: v.optional(fireDeptAccessValidator),
  fireDeptImprovementsNeeded: v.optional(v.string()),
  nearestFireStationMiles: v.optional(v.number()),
  fireDeptAccessRoadWidthFt: v.optional(v.number()),

  femaFloodZone: v.string(),
  fireRiskZone: fireRiskValidator,
  wildfireHistoryNearby: v.boolean(),
  wildfireHistoryNotes: v.optional(v.string()),
  seismicZoneNotes: v.optional(v.string()),
  landslideRisk: landslideRiskValidator,
  radonZoneNotes: v.optional(v.string()),
  wetlandsPresent: v.boolean(),
  protectedSpeciesOrEnvRestrictions: v.optional(v.string()),

  existingStructures: v.optional(v.string()),
  structureAgeYears: v.optional(v.number()),
  structureConditionNotes: v.optional(v.string()),
  fencing: v.boolean(),
  fencingNotes: v.optional(v.string()),
  outbuildings: v.optional(v.string()),

  annualPropertyTax: v.optional(v.number()),
  assessedValue: v.optional(v.number()),
  hoaFees: v.optional(v.number()),
  priceHistory: v.array(priceHistoryEntryValidator),

  contacts: v.array(contactValidator),

  isFavorite: v.boolean(),
  tags: v.array(v.string()),
  notes: v.optional(v.string()),
  visitLog: v.array(visitLogEntryValidator),
};

export function computePricePerAcre(
  price: number,
  lotSizeAcres: number,
): number | undefined {
  if (!lotSizeAcres || lotSizeAcres <= 0) {
    return undefined;
  }
  return price / lotSizeAcres;
}
