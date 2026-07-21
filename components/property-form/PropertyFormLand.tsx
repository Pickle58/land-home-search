"use client";

import { CardPanel } from "@/components/CardPanel";
import { FormField } from "@/components/FormField";
import { EnumSelect } from "@/components/EnumSelect";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { PropertyFormSectionProps } from "./types";
import {
  MINERAL_RIGHTS,
  TOPOGRAPHIES
} from "@/convex/lib/enums";

export function PropertyFormLand({ values, set }: PropertyFormSectionProps) {
  return (
      <CardPanel title="Land / lot">
        <div className="grid gap-3 sm:grid-cols-2">
          <FormField label="Lot size (acres) *">
            <Input
              type="number"
              step="any"
              required
              value={values.lotSizeAcres}
              onChange={(e) => set("lotSizeAcres", e.target.value)}
            />
          </FormField>
          <FormField label="Buildable acres">
            <Input
              type="number"
              step="any"
              value={values.buildableAcres}
              onChange={(e) => set("buildableAcres", e.target.value)}
            />
          </FormField>
          <FormField label="Zoning">
            <Input
              value={values.zoning}
              onChange={(e) => set("zoning", e.target.value)}
            />
          </FormField>
          <FormField label="Topography">
            <EnumSelect
              options={TOPOGRAPHIES}
              value={values.topography}
              onChange={(v) => set("topography", v)}
            />
          </FormField>
          <FormField label="Elevation (ft)">
            <Input
              type="number"
              value={values.elevation}
              onChange={(e) => set("elevation", e.target.value)}
            />
          </FormField>
          <FormField label="Mineral rights">
            <EnumSelect
              options={MINERAL_RIGHTS}
              value={values.mineralRights}
              onChange={(v) => set("mineralRights", v)}
            />
          </FormField>
          <FormField label="View description">
            <Input
              value={values.viewDescription}
              onChange={(e) => set("viewDescription", e.target.value)}
            />
          </FormField>
          <FormField label="Water rights">
            <Input
              value={values.waterRights}
              onChange={(e) => set("waterRights", e.target.value)}
            />
          </FormField>
          <div className="sm:col-span-2">
            <FormField label="Easements">
              <Textarea
                rows={2}
                value={values.easements}
                onChange={(e) => set("easements", e.target.value)}
              />
            </FormField>
          </div>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={values.hoaOrDeedRestrictions}
              onChange={(e) => set("hoaOrDeedRestrictions", e.target.checked)}
            />
            HOA / deed restrictions
          </label>
          <FormField label="HOA / deed details">
            <Input
              value={values.hoaOrDeedDetails}
              onChange={(e) => set("hoaOrDeedDetails", e.target.value)}
            />
          </FormField>
          <div className="sm:col-span-2">
            <FormField label="Setback notes">
              <Textarea
                rows={2}
                value={values.setbackNotes}
                onChange={(e) => set("setbackNotes", e.target.value)}
              />
            </FormField>
          </div>
        </div>
      </CardPanel>
  );
}
