"use client";

import { FormEvent, useState } from "react";
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
} from "@/convex/lib/enums";
import { labelize } from "@/lib/format";
import {
  PropertyFormValues,
  formToMutationArgs,
} from "@/lib/propertyForm";
import { Button } from "@/components/ui/button";
import {
  fieldHintClass,
  fieldLabelClass,
  inputClass,
  sectionClass,
} from "@/lib/ui-styles";

type Props = {
  initialValues: PropertyFormValues;
  submitLabel: string;
  onSubmit: (args: ReturnType<typeof formToMutationArgs>) => Promise<void>;
  headerSlot?: React.ReactNode;
};

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className={fieldLabelClass}>{label}</span>
      {children}
      {hint ? <span className={fieldHintClass}>{hint}</span> : null}
    </label>
  );
}
export function PropertyForm({
  initialValues,
  submitLabel,
  onSubmit,
  headerSlot,
}: Props) {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function set<K extends keyof PropertyFormValues>(
    key: K,
    value: PropertyFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const args = formToMutationArgs(values);
      await onSubmit(args);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {headerSlot}

      {error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      ) : null}

      <section className={sectionClass}>
        <h2 className="text-base font-semibold text-foreground">Location</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Address">
            <input
              className={inputClass}
              value={values.address}
              onChange={(e) => set("address", e.target.value)}
            />
          </Field>
          <Field label="City / town *">
            <input
              className={inputClass}
              required
              value={values.city}
              onChange={(e) => set("city", e.target.value)}
            />
          </Field>
          <Field label="County *">
            <input
              className={inputClass}
              required
              value={values.county}
              onChange={(e) => set("county", e.target.value)}
            />
          </Field>
          <Field label="State *">
            <input
              className={inputClass}
              required
              value={values.state}
              onChange={(e) => set("state", e.target.value)}
            />
          </Field>
          <Field label="ZIP">
            <input
              className={inputClass}
              value={values.zip}
              onChange={(e) => set("zip", e.target.value)}
            />
          </Field>
          <Field label="Subdivision">
            <input
              className={inputClass}
              value={values.subdivision}
              onChange={(e) => set("subdivision", e.target.value)}
            />
          </Field>
          <Field label="School district">
            <input
              className={inputClass}
              value={values.schoolDistrict}
              onChange={(e) => set("schoolDistrict", e.target.value)}
            />
          </Field>
          <Field label="Latitude" hint="For map pin">
            <input
              className={inputClass}
              type="number"
              step="any"
              value={values.latitude}
              onChange={(e) => set("latitude", e.target.value)}
            />
          </Field>
          <Field label="Longitude" hint="For map pin">
            <input
              className={inputClass}
              type="number"
              step="any"
              value={values.longitude}
              onChange={(e) => set("longitude", e.target.value)}
            />
          </Field>
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="text-base font-semibold text-foreground">Listing</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Listing URL">
            <input
              className={inputClass}
              value={values.listingUrl}
              onChange={(e) => set("listingUrl", e.target.value)}
            />
          </Field>
          <Field label="MLS #">
            <input
              className={inputClass}
              value={values.mlsNumber}
              onChange={(e) => set("mlsNumber", e.target.value)}
            />
          </Field>
          <Field label="Price *">
            <input
              className={inputClass}
              type="number"
              required
              value={values.price}
              onChange={(e) => set("price", e.target.value)}
            />
          </Field>
          <Field label="Status">
            <select
              className={inputClass}
              value={values.status}
              onChange={(e) =>
                set("status", e.target.value as PropertyFormValues["status"])
              }
            >
              {PROPERTY_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {labelize(s)}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Date found">
            <input
              className={inputClass}
              type="date"
              value={values.dateFound}
              onChange={(e) => set("dateFound", e.target.value)}
            />
          </Field>
          <Field label="Source">
            <input
              className={inputClass}
              value={values.source}
              onChange={(e) => set("source", e.target.value)}
              placeholder="Zillow, county listing…"
            />
          </Field>
          <Field label="Agent name">
            <input
              className={inputClass}
              value={values.agentName}
              onChange={(e) => set("agentName", e.target.value)}
            />
          </Field>
          <Field label="Agent contact">
            <input
              className={inputClass}
              value={values.agentContact}
              onChange={(e) => set("agentContact", e.target.value)}
            />
          </Field>
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="text-base font-semibold text-foreground">
          Land / lot
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Lot size (acres) *">
            <input
              className={inputClass}
              type="number"
              step="any"
              required
              value={values.lotSizeAcres}
              onChange={(e) => set("lotSizeAcres", e.target.value)}
            />
          </Field>
          <Field label="Buildable acres">
            <input
              className={inputClass}
              type="number"
              step="any"
              value={values.buildableAcres}
              onChange={(e) => set("buildableAcres", e.target.value)}
            />
          </Field>
          <Field label="Zoning">
            <input
              className={inputClass}
              value={values.zoning}
              onChange={(e) => set("zoning", e.target.value)}
            />
          </Field>
          <Field label="Topography">
            <select
              className={inputClass}
              value={values.topography}
              onChange={(e) =>
                set(
                  "topography",
                  e.target.value as PropertyFormValues["topography"],
                )
              }
            >
              {TOPOGRAPHIES.map((t) => (
                <option key={t} value={t}>
                  {labelize(t)}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Elevation (ft)">
            <input
              className={inputClass}
              type="number"
              value={values.elevation}
              onChange={(e) => set("elevation", e.target.value)}
            />
          </Field>
          <Field label="Mineral rights">
            <select
              className={inputClass}
              value={values.mineralRights}
              onChange={(e) =>
                set(
                  "mineralRights",
                  e.target.value as PropertyFormValues["mineralRights"],
                )
              }
            >
              {MINERAL_RIGHTS.map((m) => (
                <option key={m} value={m}>
                  {labelize(m)}
                </option>
              ))}
            </select>
          </Field>
          <Field label="View description">
            <input
              className={inputClass}
              value={values.viewDescription}
              onChange={(e) => set("viewDescription", e.target.value)}
            />
          </Field>
          <Field label="Water rights">
            <input
              className={inputClass}
              value={values.waterRights}
              onChange={(e) => set("waterRights", e.target.value)}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Easements">
              <textarea
                className={inputClass}
                rows={2}
                value={values.easements}
                onChange={(e) => set("easements", e.target.value)}
              />
            </Field>
          </div>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={values.hoaOrDeedRestrictions}
              onChange={(e) => set("hoaOrDeedRestrictions", e.target.checked)}
            />
            HOA / deed restrictions
          </label>
          <Field label="HOA / deed details">
            <input
              className={inputClass}
              value={values.hoaOrDeedDetails}
              onChange={(e) => set("hoaOrDeedDetails", e.target.value)}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Setback notes">
              <textarea
                className={inputClass}
                rows={2}
                value={values.setbackNotes}
                onChange={(e) => set("setbackNotes", e.target.value)}
              />
            </Field>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="text-base font-semibold text-foreground">Utilities</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Water source">
            <select
              className={inputClass}
              value={values.waterSource}
              onChange={(e) =>
                set(
                  "waterSource",
                  e.target.value as PropertyFormValues["waterSource"],
                )
              }
            >
              {WATER_SOURCES.map((w) => (
                <option key={w} value={w}>
                  {labelize(w)}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Well depth (ft)">
            <input
              className={inputClass}
              type="number"
              value={values.wellDepthFt}
              onChange={(e) => set("wellDepthFt", e.target.value)}
            />
          </Field>
          <Field label="Well GPM">
            <input
              className={inputClass}
              type="number"
              step="any"
              value={values.wellGpm}
              onChange={(e) => set("wellGpm", e.target.value)}
            />
          </Field>
          <Field label="Wastewater">
            <select
              className={inputClass}
              value={values.wastewater}
              onChange={(e) =>
                set(
                  "wastewater",
                  e.target.value as PropertyFormValues["wastewater"],
                )
              }
            >
              {WASTEWATER_TYPES.map((w) => (
                <option key={w} value={w}>
                  {labelize(w)}
                </option>
              ))}
            </select>
          </Field>
          <div className="sm:col-span-2">
            <Field label="Septic notes">
              <textarea
                className={inputClass}
                rows={2}
                value={values.septicNotes}
                onChange={(e) => set("septicNotes", e.target.value)}
              />
            </Field>
          </div>
          <Field label="Electric">
            <select
              className={inputClass}
              value={values.electric}
              onChange={(e) =>
                set(
                  "electric",
                  e.target.value as PropertyFormValues["electric"],
                )
              }
            >
              {ELECTRIC_AVAILABILITY.map((eOpt) => (
                <option key={eOpt} value={eOpt}>
                  {labelize(eOpt)}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Distance to nearest pole (ft)">
            <input
              className={inputClass}
              type="number"
              value={values.distanceToNearestPoleFt}
              onChange={(e) => set("distanceToNearestPoleFt", e.target.value)}
            />
          </Field>
          <Field label="Est. extension cost ($)">
            <input
              className={inputClass}
              type="number"
              value={values.estimatedExtensionCost}
              onChange={(e) => set("estimatedExtensionCost", e.target.value)}
            />
          </Field>
          <Field label="Gas">
            <select
              className={inputClass}
              value={values.gas}
              onChange={(e) =>
                set("gas", e.target.value as PropertyFormValues["gas"])
              }
            >
              {GAS_TYPES.map((g) => (
                <option key={g} value={g}>
                  {labelize(g)}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Internet">
            <select
              className={inputClass}
              value={values.internet}
              onChange={(e) =>
                set(
                  "internet",
                  e.target.value as PropertyFormValues["internet"],
                )
              }
            >
              {INTERNET_TYPES.map((i) => (
                <option key={i} value={i}>
                  {labelize(i)}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Cell signal notes">
            <input
              className={inputClass}
              value={values.cellSignalNotes}
              onChange={(e) => set("cellSignalNotes", e.target.value)}
            />
          </Field>
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="text-base font-semibold text-foreground">Access</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Road type" hint="Paved, gravel, dirt, private easement…">
            <select
              className={inputClass}
              value={values.roadType}
              onChange={(e) =>
                set(
                  "roadType",
                  e.target.value as PropertyFormValues["roadType"],
                )
              }
            >
              {ROAD_TYPES.map((r) => (
                <option key={r} value={r}>
                  {labelize(r)}
                </option>
              ))}
            </select>
          </Field>
          <Field
            label="Road maintenance"
            hint="County, HOA, or private owner"
          >
            <select
              className={inputClass}
              value={values.roadMaintenance}
              onChange={(e) =>
                set(
                  "roadMaintenance",
                  e.target.value as PropertyFormValues["roadMaintenance"],
                )
              }
            >
              {ROAD_MAINTENANCE.map((r) => (
                <option key={r} value={r}>
                  {labelize(r)}
                </option>
              ))}
            </select>
          </Field>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={values.drivewayInstalled}
              onChange={(e) => set("drivewayInstalled", e.target.checked)}
            />
            Driveway installed
          </label>
          <Field label="Miles from paved road">
            <input
              className={inputClass}
              type="number"
              step="any"
              value={values.distanceFromPavedRoadMiles}
              onChange={(e) =>
                set("distanceFromPavedRoadMiles", e.target.value)
              }
            />
          </Field>
          <Field
            label="Fire dept access"
            hint="Adequate for engines, or needs improvements"
          >
            <select
              className={inputClass}
              value={values.fireDeptAccessAdequate}
              onChange={(e) =>
                set(
                  "fireDeptAccessAdequate",
                  e.target.value as PropertyFormValues["fireDeptAccessAdequate"],
                )
              }
            >
              {FIRE_DEPT_ACCESS.map((f) => (
                <option key={f} value={f}>
                  {labelize(f)}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Nearest fire station (mi)">
            <input
              className={inputClass}
              type="number"
              step="any"
              value={values.nearestFireStationMiles}
              onChange={(e) =>
                set("nearestFireStationMiles", e.target.value)
              }
            />
          </Field>
          <Field
            label="Access road width (ft)"
            hint="Driveway / access width for apparatus"
          >
            <input
              className={inputClass}
              type="number"
              step="any"
              value={values.fireDeptAccessRoadWidthFt}
              onChange={(e) =>
                set("fireDeptAccessRoadWidthFt", e.target.value)
              }
            />
          </Field>
          <div className="sm:col-span-2">
            <Field
              label="Fire dept improvements needed"
              hint="Turnaround, vegetation clearance, bridge/weight limits, etc."
            >
              <textarea
                className={`${inputClass} min-h-[80px]`}
                value={values.fireDeptImprovementsNeeded}
                onChange={(e) =>
                  set("fireDeptImprovementsNeeded", e.target.value)
                }
              />
            </Field>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="text-base font-semibold text-foreground">
          Hazards & environment
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="FEMA flood zone">
            <input
              className={inputClass}
              value={values.femaFloodZone}
              onChange={(e) => set("femaFloodZone", e.target.value)}
              placeholder="Zone X, Zone AE…"
            />
          </Field>
          <Field label="Fire risk zone">
            <select
              className={inputClass}
              value={values.fireRiskZone}
              onChange={(e) =>
                set(
                  "fireRiskZone",
                  e.target.value as PropertyFormValues["fireRiskZone"],
                )
              }
            >
              {FIRE_RISK_ZONES.map((f) => (
                <option key={f} value={f}>
                  {labelize(f)}
                </option>
              ))}
            </select>
          </Field>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={values.wildfireHistoryNearby}
              onChange={(e) => set("wildfireHistoryNearby", e.target.checked)}
            />
            Wildfire history nearby
          </label>
          <Field label="Wildfire notes">
            <input
              className={inputClass}
              value={values.wildfireHistoryNotes}
              onChange={(e) => set("wildfireHistoryNotes", e.target.value)}
            />
          </Field>
          <Field label="Landslide risk">
            <select
              className={inputClass}
              value={values.landslideRisk}
              onChange={(e) =>
                set(
                  "landslideRisk",
                  e.target.value as PropertyFormValues["landslideRisk"],
                )
              }
            >
              {LANDSLIDE_RISKS.map((l) => (
                <option key={l} value={l}>
                  {labelize(l)}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Seismic notes">
            <input
              className={inputClass}
              value={values.seismicZoneNotes}
              onChange={(e) => set("seismicZoneNotes", e.target.value)}
            />
          </Field>
          <Field label="Radon notes">
            <input
              className={inputClass}
              value={values.radonZoneNotes}
              onChange={(e) => set("radonZoneNotes", e.target.value)}
            />
          </Field>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={values.wetlandsPresent}
              onChange={(e) => set("wetlandsPresent", e.target.checked)}
            />
            Wetlands present
          </label>
          <div className="sm:col-span-2">
            <Field label="Protected species / env. restrictions">
              <textarea
                className={inputClass}
                rows={2}
                value={values.protectedSpeciesOrEnvRestrictions}
                onChange={(e) =>
                  set("protectedSpeciesOrEnvRestrictions", e.target.value)
                }
              />
            </Field>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="text-base font-semibold text-foreground">
          Improvements & financial
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Existing structures">
              <textarea
                className={inputClass}
                rows={2}
                value={values.existingStructures}
                onChange={(e) => set("existingStructures", e.target.value)}
              />
            </Field>
          </div>
          <Field label="Structure age (years)">
            <input
              className={inputClass}
              type="number"
              value={values.structureAgeYears}
              onChange={(e) => set("structureAgeYears", e.target.value)}
            />
          </Field>
          <Field label="Condition notes">
            <input
              className={inputClass}
              value={values.structureConditionNotes}
              onChange={(e) => set("structureConditionNotes", e.target.value)}
            />
          </Field>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={values.fencing}
              onChange={(e) => set("fencing", e.target.checked)}
            />
            Fencing
          </label>
          <Field label="Fencing notes">
            <input
              className={inputClass}
              value={values.fencingNotes}
              onChange={(e) => set("fencingNotes", e.target.value)}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Outbuildings">
              <textarea
                className={inputClass}
                rows={2}
                value={values.outbuildings}
                onChange={(e) => set("outbuildings", e.target.value)}
              />
            </Field>
          </div>
          <Field label="Annual property tax ($)">
            <input
              className={inputClass}
              type="number"
              value={values.annualPropertyTax}
              onChange={(e) => set("annualPropertyTax", e.target.value)}
            />
          </Field>
          <Field label="Assessed value ($)">
            <input
              className={inputClass}
              type="number"
              value={values.assessedValue}
              onChange={(e) => set("assessedValue", e.target.value)}
            />
          </Field>
          <Field label="HOA fees ($)">
            <input
              className={inputClass}
              type="number"
              value={values.hoaFees}
              onChange={(e) => set("hoaFees", e.target.value)}
            />
          </Field>
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="text-base font-semibold text-foreground">Notes</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={values.isFavorite}
              onChange={(e) => set("isFavorite", e.target.checked)}
            />
            Favorite
          </label>
          <Field label="Tags" hint="Comma-separated">
            <input
              className={inputClass}
              value={values.tags}
              onChange={(e) => set("tags", e.target.value)}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Notes">
              <textarea
                className={inputClass}
                rows={4}
                value={values.notes}
                onChange={(e) => set("notes", e.target.value)}
              />
            </Field>
          </div>
        </div>
      </section>

      <div className="flex justify-end gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
