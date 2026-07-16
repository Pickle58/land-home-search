"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, Suspense } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { STATUS_LABELS, type PropertyStatus } from "@/convex/lib/enums";
import { formatAcres, formatCurrency, labelize } from "@/lib/format";

const COMPARE_FIELDS: {
  label: string;
  get: (p: Record<string, unknown>) => React.ReactNode;
}[] = [
  {
    label: "Status",
    get: (p) => STATUS_LABELS[p.status as PropertyStatus],
  },
  { label: "Price", get: (p) => formatCurrency(p.price as number) },
  {
    label: "Price / acre",
    get: (p) => formatCurrency(p.pricePerAcre as number | undefined),
  },
  { label: "Acres", get: (p) => formatAcres(p.lotSizeAcres as number) },
  {
    label: "Buildable acres",
    get: (p) => formatAcres(p.buildableAcres as number | undefined),
  },
  {
    label: "Location",
    get: (p) => `${p.city}, ${p.county}, ${p.state}`,
  },
  { label: "Water", get: (p) => labelize(String(p.waterSource)) },
  { label: "Wastewater", get: (p) => labelize(String(p.wastewater)) },
  { label: "Electric", get: (p) => labelize(String(p.electric)) },
  { label: "Gas", get: (p) => labelize(String(p.gas)) },
  { label: "Internet", get: (p) => labelize(String(p.internet)) },
  { label: "Flood zone", get: (p) => String(p.femaFloodZone || "—") },
  { label: "Fire risk", get: (p) => labelize(String(p.fireRiskZone)) },
  { label: "Road type", get: (p) => labelize(String(p.roadType)) },
  {
    label: "Road maintenance",
    get: (p) => labelize(String(p.roadMaintenance)),
  },
  {
    label: "Fire dept access",
    get: (p) =>
      labelize(String(p.fireDeptAccessAdequate ?? "unknown")),
  },
  {
    label: "Nearest fire station",
    get: (p) =>
      p.nearestFireStationMiles != null
        ? `${p.nearestFireStationMiles} mi`
        : "—",
  },
  {
    label: "FD access width",
    get: (p) =>
      p.fireDeptAccessRoadWidthFt != null
        ? `${p.fireDeptAccessRoadWidthFt} ft`
        : "—",
  },
  {
    label: "FD improvements",
    get: (p) => String(p.fireDeptImprovementsNeeded || "—"),
  },
  { label: "Zoning", get: (p) => String(p.zoning || "—") },
  { label: "Topography", get: (p) => labelize(String(p.topography)) },
  {
    label: "Wetlands",
    get: (p) => (p.wetlandsPresent ? "Yes" : "No"),
  },
  {
    label: "Annual tax",
    get: (p) => formatCurrency(p.annualPropertyTax as number | undefined),
  },
  { label: "Notes", get: (p) => String(p.notes || "—") },
];

function CompareInner() {
  const search = useSearchParams();
  const ids = useMemo(() => {
    const raw = search.get("ids") ?? "";
    return raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 4) as Id<"properties">[];
  }, [search]);

  const properties = useQuery(
    api.properties.getMany,
    ids.length ? { ids } : "skip",
  );

  if (ids.length < 2) {
    return (
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold">Compare</h1>
        <p className="text-sm text-stone-600">
          Select 2–4 properties on the list page, then open Compare.
        </p>
        <Link href="/" className="text-sm underline">
          Back to list
        </Link>
      </div>
    );
  }

  if (properties === undefined) {
    return <p className="text-sm text-stone-500">Loading…</p>;
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Compare</h1>
        <p className="text-sm text-stone-600">
          Side-by-side tradeoffs across utilities, hazards, and cost.
        </p>
      </div>
      <div className="overflow-x-auto rounded-lg border border-stone-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-stone-200 bg-stone-50">
            <tr>
              <th className="px-3 py-2">Field</th>
              {properties.map((p) => (
                <th key={p._id} className="px-3 py-2">
                  <Link
                    href={`/properties/${p._id}`}
                    className="font-semibold underline-offset-2 hover:underline"
                  >
                    {p.city}, {p.state}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARE_FIELDS.map((field) => (
              <tr key={field.label} className="border-b border-stone-100 align-top">
                <td className="px-3 py-2 font-medium text-stone-600">
                  {field.label}
                </td>
                {properties.map((p) => (
                  <td key={p._id} className="px-3 py-2">
                    {field.get(p as unknown as Record<string, unknown>)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<p className="text-sm text-stone-500">Loading…</p>}>
      <CompareInner />
    </Suspense>
  );
}
