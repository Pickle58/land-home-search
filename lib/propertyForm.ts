import type { Doc } from "@/convex/_generated/dataModel";
import type {
  ElectricAvailability,
  FireDeptAccess,
  PropertyStatus,
  WastewaterType,
  WaterSource,
} from "@/convex/lib/enums";

export type PropertyFormValues = {
  address: string;
  city: string;
  county: string;
  state: string;
  zip: string;
  latitude: string;
  longitude: string;
  subdivision: string;
  schoolDistrict: string;

  listingUrl: string;
  mlsNumber: string;
  price: string;
  status: PropertyStatus;
  dateFound: string;
  source: string;
  agentName: string;
  agentContact: string;

  lotSizeAcres: string;
  buildableAcres: string;
  zoning: string;
  topography: "flat" | "gently_sloped" | "steep" | "mixed";
  elevation: string;
  viewDescription: string;
  easements: string;
  mineralRights: "included" | "excluded" | "unknown";
  waterRights: string;
  hoaOrDeedRestrictions: boolean;
  hoaOrDeedDetails: string;
  setbackNotes: string;

  waterSource: WaterSource;
  wellDepthFt: string;
  wellGpm: string;
  wastewater: WastewaterType;
  septicNotes: string;
  electric: ElectricAvailability;
  distanceToNearestPoleFt: string;
  estimatedExtensionCost: string;
  gas: "natural_gas" | "propane_tank" | "none";
  internet:
    | "fiber"
    | "cable"
    | "dsl"
    | "satellite"
    | "none_confirmed"
    | "unknown";
  cellSignalNotes: string;

  roadType: "paved" | "gravel" | "dirt" | "private_easement" | "unknown";
  roadMaintenance: "county" | "hoa" | "private_owner" | "unknown";
  drivewayInstalled: boolean;
  distanceFromPavedRoadMiles: string;
  fireDeptAccessAdequate: FireDeptAccess;
  fireDeptImprovementsNeeded: string;
  nearestFireStationMiles: string;
  fireDeptAccessRoadWidthFt: string;

  femaFloodZone: string;
  fireRiskZone: "low" | "moderate" | "high" | "very_high" | "unknown";
  wildfireHistoryNearby: boolean;
  wildfireHistoryNotes: string;
  seismicZoneNotes: string;
  landslideRisk: "low" | "moderate" | "high" | "unknown";
  radonZoneNotes: string;
  wetlandsPresent: boolean;
  protectedSpeciesOrEnvRestrictions: string;

  existingStructures: string;
  structureAgeYears: string;
  structureConditionNotes: string;
  fencing: boolean;
  fencingNotes: string;
  outbuildings: string;

  annualPropertyTax: string;
  assessedValue: string;
  hoaFees: string;

  isFavorite: boolean;
  tags: string;
  notes: string;
};

function numToStr(value: number | undefined): string {
  return value === undefined ? "" : String(value);
}

function dateToInput(ts: number | undefined): string {
  const d = new Date(ts ?? Date.now());
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function emptyPropertyForm(): PropertyFormValues {
  return {
    address: "",
    city: "",
    county: "",
    state: "",
    zip: "",
    latitude: "",
    longitude: "",
    subdivision: "",
    schoolDistrict: "",
    listingUrl: "",
    mlsNumber: "",
    price: "",
    status: "researching",
    dateFound: dateToInput(Date.now()),
    source: "",
    agentName: "",
    agentContact: "",
    lotSizeAcres: "",
    buildableAcres: "",
    zoning: "",
    topography: "mixed",
    elevation: "",
    viewDescription: "",
    easements: "",
    mineralRights: "unknown",
    waterRights: "",
    hoaOrDeedRestrictions: false,
    hoaOrDeedDetails: "",
    setbackNotes: "",
    waterSource: "unknown",
    wellDepthFt: "",
    wellGpm: "",
    wastewater: "unknown",
    septicNotes: "",
    electric: "unknown",
    distanceToNearestPoleFt: "",
    estimatedExtensionCost: "",
    gas: "none",
    internet: "unknown",
    cellSignalNotes: "",
    roadType: "unknown",
    roadMaintenance: "unknown",
    drivewayInstalled: false,
    distanceFromPavedRoadMiles: "",
    fireDeptAccessAdequate: "unknown",
    fireDeptImprovementsNeeded: "",
    nearestFireStationMiles: "",
    fireDeptAccessRoadWidthFt: "",
    femaFloodZone: "",
    fireRiskZone: "unknown",
    wildfireHistoryNearby: false,
    wildfireHistoryNotes: "",
    seismicZoneNotes: "",
    landslideRisk: "unknown",
    radonZoneNotes: "",
    wetlandsPresent: false,
    protectedSpeciesOrEnvRestrictions: "",
    existingStructures: "",
    structureAgeYears: "",
    structureConditionNotes: "",
    fencing: false,
    fencingNotes: "",
    outbuildings: "",
    annualPropertyTax: "",
    assessedValue: "",
    hoaFees: "",
    isFavorite: false,
    tags: "",
    notes: "",
  };
}

export function propertyToForm(property: Doc<"properties">): PropertyFormValues {
  return {
    address: property.address ?? "",
    city: property.city,
    county: property.county,
    state: property.state,
    zip: property.zip,
    latitude: String(property.latitude),
    longitude: String(property.longitude),
    subdivision: property.subdivision ?? "",
    schoolDistrict: property.schoolDistrict ?? "",
    listingUrl: property.listingUrl,
    mlsNumber: property.mlsNumber ?? "",
    price: String(property.price),
    status: property.status,
    dateFound: dateToInput(property.dateFound),
    source: property.source,
    agentName: property.agentName ?? "",
    agentContact: property.agentContact ?? "",
    lotSizeAcres: String(property.lotSizeAcres),
    buildableAcres: numToStr(property.buildableAcres),
    zoning: property.zoning,
    topography: property.topography,
    elevation: numToStr(property.elevation),
    viewDescription: property.viewDescription ?? "",
    easements: property.easements ?? "",
    mineralRights: property.mineralRights,
    waterRights: property.waterRights ?? "",
    hoaOrDeedRestrictions: property.hoaOrDeedRestrictions,
    hoaOrDeedDetails: property.hoaOrDeedDetails ?? "",
    setbackNotes: property.setbackNotes ?? "",
    waterSource: property.waterSource,
    wellDepthFt: numToStr(property.wellDepthFt),
    wellGpm: numToStr(property.wellGpm),
    wastewater: property.wastewater,
    septicNotes: property.septicNotes ?? "",
    electric: property.electric,
    distanceToNearestPoleFt: numToStr(property.distanceToNearestPoleFt),
    estimatedExtensionCost: numToStr(property.estimatedExtensionCost),
    gas: property.gas,
    internet: property.internet,
    cellSignalNotes: property.cellSignalNotes ?? "",
    roadType: property.roadType,
    roadMaintenance: property.roadMaintenance,
    drivewayInstalled: property.drivewayInstalled,
    distanceFromPavedRoadMiles: numToStr(property.distanceFromPavedRoadMiles),
    fireDeptAccessAdequate: property.fireDeptAccessAdequate ?? "unknown",
    fireDeptImprovementsNeeded: property.fireDeptImprovementsNeeded ?? "",
    nearestFireStationMiles: numToStr(property.nearestFireStationMiles),
    fireDeptAccessRoadWidthFt: numToStr(property.fireDeptAccessRoadWidthFt),
    femaFloodZone: property.femaFloodZone,
    fireRiskZone: property.fireRiskZone,
    wildfireHistoryNearby: property.wildfireHistoryNearby,
    wildfireHistoryNotes: property.wildfireHistoryNotes ?? "",
    seismicZoneNotes: property.seismicZoneNotes ?? "",
    landslideRisk: property.landslideRisk,
    radonZoneNotes: property.radonZoneNotes ?? "",
    wetlandsPresent: property.wetlandsPresent,
    protectedSpeciesOrEnvRestrictions:
      property.protectedSpeciesOrEnvRestrictions ?? "",
    existingStructures: property.existingStructures ?? "",
    structureAgeYears: numToStr(property.structureAgeYears),
    structureConditionNotes: property.structureConditionNotes ?? "",
    fencing: property.fencing,
    fencingNotes: property.fencingNotes ?? "",
    outbuildings: property.outbuildings ?? "",
    annualPropertyTax: numToStr(property.annualPropertyTax),
    assessedValue: numToStr(property.assessedValue),
    hoaFees: numToStr(property.hoaFees),
    isFavorite: property.isFavorite,
    tags: property.tags.join(", "),
    notes: property.notes ?? "",
  };
}

function optNumber(value: string): number | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  const n = Number(trimmed);
  if (Number.isNaN(n)) {
    throw new Error(`Invalid number: ${value}`);
  }
  return n;
}

function reqNumber(value: string, label: string): number {
  const n = optNumber(value);
  if (n === undefined) {
    throw new Error(`${label} is required`);
  }
  return n;
}

export function formToMutationArgs(values: PropertyFormValues) {
  const city = values.city.trim();
  const county = values.county.trim();
  const state = values.state.trim();
  if (!city || !county || !state) {
    throw new Error("City, county, and state are required");
  }

  return {
    address: values.address.trim() || undefined,
    city,
    county,
    state,
    zip: values.zip.trim() || "",
    latitude: reqNumber(values.latitude || "0", "Latitude"),
    longitude: reqNumber(values.longitude || "0", "Longitude"),
    subdivision: values.subdivision.trim() || undefined,
    schoolDistrict: values.schoolDistrict.trim() || undefined,
    listingUrl: values.listingUrl.trim() || "",
    mlsNumber: values.mlsNumber.trim() || undefined,
    price: reqNumber(values.price, "Price"),
    status: values.status,
    dateFound: values.dateFound
      ? new Date(values.dateFound).getTime()
      : Date.now(),
    source: values.source.trim() || "unknown",
    agentName: values.agentName.trim() || undefined,
    agentContact: values.agentContact.trim() || undefined,
    lotSizeAcres: reqNumber(values.lotSizeAcres, "Lot size"),
    buildableAcres: optNumber(values.buildableAcres),
    zoning: values.zoning.trim() || "unknown",
    topography: values.topography,
    elevation: optNumber(values.elevation),
    viewDescription: values.viewDescription.trim() || undefined,
    easements: values.easements.trim() || undefined,
    mineralRights: values.mineralRights,
    waterRights: values.waterRights.trim() || undefined,
    hoaOrDeedRestrictions: values.hoaOrDeedRestrictions,
    hoaOrDeedDetails: values.hoaOrDeedDetails.trim() || undefined,
    setbackNotes: values.setbackNotes.trim() || undefined,
    waterSource: values.waterSource,
    wellDepthFt: optNumber(values.wellDepthFt),
    wellGpm: optNumber(values.wellGpm),
    wastewater: values.wastewater,
    septicNotes: values.septicNotes.trim() || undefined,
    electric: values.electric,
    distanceToNearestPoleFt: optNumber(values.distanceToNearestPoleFt),
    estimatedExtensionCost: optNumber(values.estimatedExtensionCost),
    gas: values.gas,
    internet: values.internet,
    cellSignalNotes: values.cellSignalNotes.trim() || undefined,
    roadType: values.roadType,
    roadMaintenance: values.roadMaintenance,
    drivewayInstalled: values.drivewayInstalled,
    distanceFromPavedRoadMiles: optNumber(values.distanceFromPavedRoadMiles),
    fireDeptAccessAdequate: values.fireDeptAccessAdequate,
    fireDeptImprovementsNeeded:
      values.fireDeptImprovementsNeeded.trim() || undefined,
    nearestFireStationMiles: optNumber(values.nearestFireStationMiles),
    fireDeptAccessRoadWidthFt: optNumber(values.fireDeptAccessRoadWidthFt),
    femaFloodZone: values.femaFloodZone.trim() || "unknown",
    fireRiskZone: values.fireRiskZone,
    wildfireHistoryNearby: values.wildfireHistoryNearby,
    wildfireHistoryNotes: values.wildfireHistoryNotes.trim() || undefined,
    seismicZoneNotes: values.seismicZoneNotes.trim() || undefined,
    landslideRisk: values.landslideRisk,
    radonZoneNotes: values.radonZoneNotes.trim() || undefined,
    wetlandsPresent: values.wetlandsPresent,
    protectedSpeciesOrEnvRestrictions:
      values.protectedSpeciesOrEnvRestrictions.trim() || undefined,
    existingStructures: values.existingStructures.trim() || undefined,
    structureAgeYears: optNumber(values.structureAgeYears),
    structureConditionNotes:
      values.structureConditionNotes.trim() || undefined,
    fencing: values.fencing,
    fencingNotes: values.fencingNotes.trim() || undefined,
    outbuildings: values.outbuildings.trim() || undefined,
    annualPropertyTax: optNumber(values.annualPropertyTax),
    assessedValue: optNumber(values.assessedValue),
    hoaFees: optNumber(values.hoaFees),
    priceHistory: [] as { date: number; price: number }[],
    contacts: [] as {
      name: string;
      role:
        | "builder"
        | "general_contractor"
        | "well_driller"
        | "septic_installer"
        | "electrician"
        | "surveyor"
        | "real_estate_agent"
        | "inspector"
        | "other";
      company?: string;
      phone?: string;
      email?: string;
      notes?: string;
    }[],
    isFavorite: values.isFavorite,
    tags: values.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    notes: values.notes.trim() || undefined,
    visitLog: [] as { date: number; notes: string }[],
  };
}

/** Merge partial extraction JSON into form values. */
export function mergeExtractedIntoForm(
  current: PropertyFormValues,
  extracted: Record<string, unknown>,
): PropertyFormValues {
  const next = { ...current };
  const stringKeys: (keyof PropertyFormValues)[] = [
    "address",
    "city",
    "county",
    "state",
    "zip",
    "subdivision",
    "schoolDistrict",
    "listingUrl",
    "mlsNumber",
    "source",
    "agentName",
    "agentContact",
    "zoning",
    "viewDescription",
    "easements",
    "waterRights",
    "hoaOrDeedDetails",
    "setbackNotes",
    "septicNotes",
    "cellSignalNotes",
    "fireDeptImprovementsNeeded",
    "femaFloodZone",
    "wildfireHistoryNotes",
    "seismicZoneNotes",
    "radonZoneNotes",
    "protectedSpeciesOrEnvRestrictions",
    "existingStructures",
    "structureConditionNotes",
    "fencingNotes",
    "outbuildings",
    "notes",
  ];

  for (const key of stringKeys) {
    const value = extracted[key];
    if (typeof value === "string" && value.trim()) {
      (next[key] as string) = value;
    }
  }

  const numberKeys: (keyof PropertyFormValues)[] = [
    "latitude",
    "longitude",
    "price",
    "lotSizeAcres",
    "buildableAcres",
    "elevation",
    "wellDepthFt",
    "wellGpm",
    "distanceToNearestPoleFt",
    "estimatedExtensionCost",
    "distanceFromPavedRoadMiles",
    "nearestFireStationMiles",
    "fireDeptAccessRoadWidthFt",
    "structureAgeYears",
    "annualPropertyTax",
    "assessedValue",
    "hoaFees",
  ];

  for (const key of numberKeys) {
    const value = extracted[key];
    if (typeof value === "number" && Number.isFinite(value)) {
      (next[key] as string) = String(value);
    }
  }

  const enumKeys = [
    "status",
    "topography",
    "mineralRights",
    "waterSource",
    "wastewater",
    "electric",
    "gas",
    "internet",
    "roadType",
    "roadMaintenance",
    "fireDeptAccessAdequate",
    "fireRiskZone",
    "landslideRisk",
  ] as const;

  for (const key of enumKeys) {
    const value = extracted[key];
    if (typeof value === "string" && value) {
      // Trusted after LLM JSON parse + form review
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (next as any)[key] = value;
    }
  }

  const boolKeys: (keyof PropertyFormValues)[] = [
    "hoaOrDeedRestrictions",
    "drivewayInstalled",
    "wildfireHistoryNearby",
    "wetlandsPresent",
    "fencing",
    "isFavorite",
  ];

  for (const key of boolKeys) {
    const value = extracted[key];
    if (typeof value === "boolean") {
      (next[key] as boolean) = value;
    }
  }

  if (Array.isArray(extracted.tags)) {
    next.tags = extracted.tags.filter((t) => typeof t === "string").join(", ");
  }

  return next;
}
