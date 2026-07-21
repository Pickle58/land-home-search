"use client";

import { CardPanel } from "@/components/CardPanel";
import { FormField } from "@/components/FormField";
import { EnumSelect } from "@/components/EnumSelect";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { PropertyFormSectionProps } from "./types";
import {
  FIRE_RISK_ZONES,
  LANDSLIDE_RISKS
} from "@/convex/lib/enums";

export function PropertyFormHazards({ values, set }: PropertyFormSectionProps) {
  return (
      <CardPanel title="Hazards & environment">
        <div className="grid gap-3 sm:grid-cols-2">
          <FormField label="FEMA flood zone">
            <Input
              value={values.femaFloodZone}
              onChange={(e) => set("femaFloodZone", e.target.value)}
              placeholder="Zone X, Zone AE…"
            />
          </FormField>
          <FormField label="Fire risk zone">
            <EnumSelect
              options={FIRE_RISK_ZONES}
              value={values.fireRiskZone}
              onChange={(v) => set("fireRiskZone", v)}
            />
          </FormField>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={values.wildfireHistoryNearby}
              onChange={(e) => set("wildfireHistoryNearby", e.target.checked)}
            />
            Wildfire history nearby
          </label>
          <FormField label="Wildfire notes">
            <Input
              value={values.wildfireHistoryNotes}
              onChange={(e) => set("wildfireHistoryNotes", e.target.value)}
            />
          </FormField>
          <FormField label="Landslide risk">
            <EnumSelect
              options={LANDSLIDE_RISKS}
              value={values.landslideRisk}
              onChange={(v) => set("landslideRisk", v)}
            />
          </FormField>
          <FormField label="Seismic notes">
            <Input
              value={values.seismicZoneNotes}
              onChange={(e) => set("seismicZoneNotes", e.target.value)}
            />
          </FormField>
          <FormField label="Radon notes">
            <Input
              value={values.radonZoneNotes}
              onChange={(e) => set("radonZoneNotes", e.target.value)}
            />
          </FormField>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={values.wetlandsPresent}
              onChange={(e) => set("wetlandsPresent", e.target.checked)}
            />
            Wetlands present
          </label>
          <div className="sm:col-span-2">
            <FormField label="Protected species / env. restrictions">
              <Textarea
                rows={2}
                value={values.protectedSpeciesOrEnvRestrictions}
                onChange={(e) =>
                  set("protectedSpeciesOrEnvRestrictions", e.target.value)
                }
              />
            </FormField>
          </div>
        </div>
      </CardPanel>
  );
}
