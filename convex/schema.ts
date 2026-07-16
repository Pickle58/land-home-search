import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";
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
  documentLabelValidator,
} from "./lib/enums";

export default defineSchema({
  ...authTables,

  properties: defineTable({
    userId: v.optional(v.id("users")),
    // Location
    address: v.optional(v.string()),
    city: v.string(),
    county: v.string(),
    state: v.string(),
    zip: v.string(),
    latitude: v.number(),
    longitude: v.number(),
    subdivision: v.optional(v.string()),
    schoolDistrict: v.optional(v.string()),

    // Listing basics
    listingUrl: v.string(),
    mlsNumber: v.optional(v.string()),
    price: v.number(),
    pricePerAcre: v.optional(v.number()),
    status: propertyStatusValidator,
    dateFound: v.number(),
    source: v.string(),
    agentName: v.optional(v.string()),
    agentContact: v.optional(v.string()),

    // Land / lot
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

    // Utilities
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

    // Access
    roadType: roadTypeValidator,
    roadMaintenance: roadMaintenanceValidator,
    drivewayInstalled: v.boolean(),
    distanceFromPavedRoadMiles: v.optional(v.number()),
    fireDeptAccessAdequate: v.optional(fireDeptAccessValidator),
    fireDeptImprovementsNeeded: v.optional(v.string()),
    nearestFireStationMiles: v.optional(v.number()),
    fireDeptAccessRoadWidthFt: v.optional(v.number()),

    // Hazards
    femaFloodZone: v.string(),
    fireRiskZone: fireRiskValidator,
    wildfireHistoryNearby: v.boolean(),
    wildfireHistoryNotes: v.optional(v.string()),
    seismicZoneNotes: v.optional(v.string()),
    landslideRisk: landslideRiskValidator,
    radonZoneNotes: v.optional(v.string()),
    wetlandsPresent: v.boolean(),
    protectedSpeciesOrEnvRestrictions: v.optional(v.string()),

    // Existing improvements
    existingStructures: v.optional(v.string()),
    structureAgeYears: v.optional(v.number()),
    structureConditionNotes: v.optional(v.string()),
    fencing: v.boolean(),
    fencingNotes: v.optional(v.string()),
    outbuildings: v.optional(v.string()),

    // Financial
    annualPropertyTax: v.optional(v.number()),
    assessedValue: v.optional(v.number()),
    hoaFees: v.optional(v.number()),
    priceHistory: v.array(priceHistoryEntryValidator),

    // Contacts
    contacts: v.array(contactValidator),

    // Tracking / meta
    isFavorite: v.boolean(),
    tags: v.array(v.string()),
    notes: v.optional(v.string()),
    photos: v.array(v.id("_storage")),
    visitLog: v.array(visitLogEntryValidator),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_isFavorite", ["isFavorite"])
    .index("by_state", ["state"])
    .index("by_city", ["city"])
    .index("by_county", ["county"])
    .index("by_user", ["userId"])
    .index("by_updatedAt", ["updatedAt"]),

  documents: defineTable({
    propertyId: v.id("properties"),
    storageId: v.id("_storage"),
    label: documentLabelValidator,
    fileName: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_property", ["propertyId"]),
});
