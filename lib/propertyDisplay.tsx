import type { ReactNode } from "react";
import type { Doc } from "@/convex/_generated/dataModel";
import { STATUS_LABELS, type PropertyStatus } from "@/convex/lib/enums";
import { formatAcres, formatCurrency, formatDate, labelize } from "@/lib/format";

export type PropertyDisplayField = {
  key: string;
  label: string;
  section?: string;
  format: (p: Doc<"properties">) => ReactNode;
  compare?: boolean;
};

function yesNo(value: boolean | undefined | null): string {
  if (value === undefined || value === null) return "—";
  return value ? "Yes" : "No";
}

function miles(value: number | undefined | null): string {
  return value != null ? `${value} mi` : "—";
}

function feet(value: number | undefined | null): string {
  return value != null ? `${value} ft` : "—";
}

export const PROPERTY_DISPLAY_FIELDS: PropertyDisplayField[] = [
  {
    key: "status",
    label: "Status",
    section: "listing",
    compare: true,
    format: (p) => STATUS_LABELS[p.status as PropertyStatus],
  },
  {
    key: "price",
    label: "Price",
    section: "listing",
    compare: true,
    format: (p) => formatCurrency(p.price),
  },
  {
    key: "pricePerAcre",
    label: "Price / acre",
    section: "listing",
    compare: true,
    format: (p) => formatCurrency(p.pricePerAcre),
  },
  {
    key: "lotSizeAcres",
    label: "Acres",
    section: "land",
    compare: true,
    format: (p) => formatAcres(p.lotSizeAcres),
  },
  {
    key: "buildableAcres",
    label: "Buildable acres",
    section: "land",
    compare: true,
    format: (p) => formatAcres(p.buildableAcres),
  },
  {
    key: "location",
    label: "Location",
    section: "location",
    compare: true,
    format: (p) => `${p.city}, ${p.county}, ${p.state}`,
  },
  {
    key: "address",
    label: "Address",
    section: "location",
    format: (p) => p.address,
  },
  {
    key: "cityLine",
    label: "City",
    section: "location",
    format: (p) => `${p.city}, ${p.state} ${p.zip}`,
  },
  {
    key: "county",
    label: "County",
    section: "location",
    format: (p) => p.county,
  },
  {
    key: "coords",
    label: "Coords",
    section: "location",
    format: (p) => `${p.latitude}, ${p.longitude}`,
  },
  {
    key: "subdivision",
    label: "Subdivision",
    section: "location",
    format: (p) => p.subdivision,
  },
  {
    key: "schoolDistrict",
    label: "Schools",
    section: "location",
    format: (p) => p.schoolDistrict,
  },
  {
    key: "listingUrl",
    label: "URL",
    section: "listing",
    format: (p) =>
      p.listingUrl ? (
        <a
          href={p.listingUrl}
          className="underline"
          target="_blank"
          rel="noreferrer"
        >
          Open listing
        </a>
      ) : (
        "—"
      ),
  },
  {
    key: "mlsNumber",
    label: "MLS",
    section: "listing",
    format: (p) => p.mlsNumber,
  },
  {
    key: "dateFound",
    label: "Found",
    section: "listing",
    format: (p) => formatDate(p.dateFound),
  },
  {
    key: "source",
    label: "Source",
    section: "listing",
    format: (p) => p.source,
  },
  {
    key: "agent",
    label: "Agent",
    section: "listing",
    format: (p) =>
      [p.agentName, p.agentContact].filter(Boolean).join(" · ") || "—",
  },
  {
    key: "waterSource",
    label: "Water",
    section: "utilities",
    compare: true,
    format: (p) => labelize(p.waterSource),
  },
  {
    key: "well",
    label: "Well",
    section: "utilities",
    format: (p) =>
      [p.wellDepthFt && `${p.wellDepthFt} ft`, p.wellGpm && `${p.wellGpm} gpm`]
        .filter(Boolean)
        .join(" · ") || "—",
  },
  {
    key: "wastewater",
    label: "Wastewater",
    section: "utilities",
    compare: true,
    format: (p) => labelize(p.wastewater),
  },
  {
    key: "septicNotes",
    label: "Septic notes",
    section: "utilities",
    format: (p) => p.septicNotes,
  },
  {
    key: "electric",
    label: "Electric",
    section: "utilities",
    compare: true,
    format: (p) => labelize(p.electric),
  },
  {
    key: "gas",
    label: "Gas",
    section: "utilities",
    compare: true,
    format: (p) => labelize(p.gas),
  },
  {
    key: "internet",
    label: "Internet",
    section: "utilities",
    compare: true,
    format: (p) => labelize(p.internet),
  },
  {
    key: "cellSignalNotes",
    label: "Cell",
    section: "utilities",
    format: (p) => p.cellSignalNotes,
  },
  {
    key: "roadType",
    label: "Road type",
    section: "access",
    compare: true,
    format: (p) => labelize(p.roadType),
  },
  {
    key: "roadMaintenance",
    label: "Road maintenance",
    section: "access",
    compare: true,
    format: (p) => labelize(p.roadMaintenance),
  },
  {
    key: "drivewayInstalled",
    label: "Driveway",
    section: "access",
    format: (p) => yesNo(p.drivewayInstalled),
  },
  {
    key: "distanceFromPavedRoadMiles",
    label: "From paved",
    section: "access",
    format: (p) => miles(p.distanceFromPavedRoadMiles),
  },
  {
    key: "fireDeptAccessAdequate",
    label: "Fire dept access",
    section: "access",
    compare: true,
    format: (p) => labelize(p.fireDeptAccessAdequate ?? "unknown"),
  },
  {
    key: "nearestFireStationMiles",
    label: "Nearest fire station",
    section: "access",
    compare: true,
    format: (p) => miles(p.nearestFireStationMiles),
  },
  {
    key: "fireDeptAccessRoadWidthFt",
    label: "FD access width",
    section: "access",
    compare: true,
    format: (p) => feet(p.fireDeptAccessRoadWidthFt),
  },
  {
    key: "fireDeptImprovementsNeeded",
    label: "FD improvements",
    section: "access",
    compare: true,
    format: (p) => p.fireDeptImprovementsNeeded || "—",
  },
  {
    key: "femaFloodZone",
    label: "Flood zone",
    section: "hazards",
    compare: true,
    format: (p) => p.femaFloodZone || "—",
  },
  {
    key: "fireRiskZone",
    label: "Fire risk",
    section: "hazards",
    compare: true,
    format: (p) => labelize(p.fireRiskZone),
  },
  {
    key: "wildfireHistoryNearby",
    label: "Wildfire nearby",
    section: "hazards",
    format: (p) => yesNo(p.wildfireHistoryNearby),
  },
  {
    key: "landslideRisk",
    label: "Landslide",
    section: "hazards",
    format: (p) => labelize(p.landslideRisk),
  },
  {
    key: "wetlandsPresent",
    label: "Wetlands",
    section: "hazards",
    compare: true,
    format: (p) => yesNo(p.wetlandsPresent),
  },
  {
    key: "protectedSpeciesOrEnvRestrictions",
    label: "Env. notes",
    section: "hazards",
    format: (p) => p.protectedSpeciesOrEnvRestrictions,
  },
  {
    key: "zoning",
    label: "Zoning",
    section: "land",
    compare: true,
    format: (p) => p.zoning || "—",
  },
  {
    key: "topography",
    label: "Topography",
    section: "land",
    compare: true,
    format: (p) => labelize(p.topography),
  },
  {
    key: "mineralRights",
    label: "Mineral rights",
    section: "land",
    format: (p) => labelize(p.mineralRights),
  },
  {
    key: "annualPropertyTax",
    label: "Annual tax",
    section: "financial",
    compare: true,
    format: (p) => formatCurrency(p.annualPropertyTax),
  },
  {
    key: "assessedValue",
    label: "Assessed",
    section: "financial",
    format: (p) => formatCurrency(p.assessedValue),
  },
  {
    key: "hoaFees",
    label: "HOA fees",
    section: "financial",
    format: (p) => formatCurrency(p.hoaFees),
  },
  {
    key: "tags",
    label: "Tags",
    section: "notes",
    format: (p) => p.tags?.join(", ") || "—",
  },
  {
    key: "notes",
    label: "Notes",
    section: "notes",
    compare: true,
    format: (p) => p.notes || "—",
  },
];

export const COMPARE_FIELDS = PROPERTY_DISPLAY_FIELDS.filter(
  (field) => field.compare,
);

export const DETAIL_SECTIONS: {
  id: string;
  title: string;
  keys: string[];
}[] = [
  {
    id: "location",
    title: "Location",
    keys: [
      "address",
      "cityLine",
      "county",
      "coords",
      "subdivision",
      "schoolDistrict",
    ],
  },
  {
    id: "listing",
    title: "Listing",
    keys: ["listingUrl", "mlsNumber", "dateFound", "source", "agent"],
  },
  {
    id: "utilities",
    title: "Utilities",
    keys: [
      "waterSource",
      "well",
      "wastewater",
      "septicNotes",
      "electric",
      "gas",
      "internet",
      "cellSignalNotes",
    ],
  },
  {
    id: "access",
    title: "Access",
    keys: [
      "roadType",
      "roadMaintenance",
      "drivewayInstalled",
      "distanceFromPavedRoadMiles",
      "fireDeptAccessAdequate",
      "nearestFireStationMiles",
      "fireDeptAccessRoadWidthFt",
      "fireDeptImprovementsNeeded",
    ],
  },
  {
    id: "hazards",
    title: "Hazards",
    keys: [
      "femaFloodZone",
      "fireRiskZone",
      "wildfireHistoryNearby",
      "landslideRisk",
      "wetlandsPresent",
      "protectedSpeciesOrEnvRestrictions",
    ],
  },
  {
    id: "land",
    title: "Land / financial",
    keys: [
      "zoning",
      "topography",
      "buildableAcres",
      "mineralRights",
      "annualPropertyTax",
      "assessedValue",
      "hoaFees",
    ],
  },
];

const fieldByKey = new Map(
  PROPERTY_DISPLAY_FIELDS.map((field) => [field.key, field]),
);

export function getDisplayField(key: string): PropertyDisplayField | undefined {
  return fieldByKey.get(key);
}

export function fieldsForSection(sectionId: string): PropertyDisplayField[] {
  const section = DETAIL_SECTIONS.find((s) => s.id === sectionId);
  if (!section) return [];
  return section.keys
    .map((key) => fieldByKey.get(key))
    .filter((field): field is PropertyDisplayField => field !== undefined);
}
