"use client";

import { CardPanel } from "@/components/CardPanel";
import { FormField } from "@/components/FormField";
import { EnumSelect } from "@/components/EnumSelect";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { PropertyFormSectionProps } from "./types";
import {
  ELECTRIC_AVAILABILITY,
  GAS_TYPES,
  INTERNET_TYPES,
  WASTEWATER_TYPES,
  WATER_SOURCES
} from "@/convex/lib/enums";

export function PropertyFormUtilities({ values, set }: PropertyFormSectionProps) {
  return (
      <CardPanel title="Utilities">
        <div className="grid gap-3 sm:grid-cols-2">
          <FormField label="Water source">
            <EnumSelect
              options={WATER_SOURCES}
              value={values.waterSource}
              onChange={(v) => set("waterSource", v)}
            />
          </FormField>
          <FormField label="Well depth (ft)">
            <Input
              type="number"
              value={values.wellDepthFt}
              onChange={(e) => set("wellDepthFt", e.target.value)}
            />
          </FormField>
          <FormField label="Well GPM">
            <Input
              type="number"
              step="any"
              value={values.wellGpm}
              onChange={(e) => set("wellGpm", e.target.value)}
            />
          </FormField>
          <FormField label="Wastewater">
            <EnumSelect
              options={WASTEWATER_TYPES}
              value={values.wastewater}
              onChange={(v) => set("wastewater", v)}
            />
          </FormField>
          <div className="sm:col-span-2">
            <FormField label="Septic notes">
              <Textarea
                rows={2}
                value={values.septicNotes}
                onChange={(e) => set("septicNotes", e.target.value)}
              />
            </FormField>
          </div>
          <FormField label="Electric">
            <EnumSelect
              options={ELECTRIC_AVAILABILITY}
              value={values.electric}
              onChange={(v) => set("electric", v)}
            />
          </FormField>
          <FormField label="Distance to nearest pole (ft)">
            <Input
              type="number"
              value={values.distanceToNearestPoleFt}
              onChange={(e) => set("distanceToNearestPoleFt", e.target.value)}
            />
          </FormField>
          <FormField label="Est. extension cost ($)">
            <Input
              type="number"
              value={values.estimatedExtensionCost}
              onChange={(e) => set("estimatedExtensionCost", e.target.value)}
            />
          </FormField>
          <FormField label="Gas">
            <EnumSelect
              options={GAS_TYPES}
              value={values.gas}
              onChange={(v) => set("gas", v)}
            />
          </FormField>
          <FormField label="Internet">
            <EnumSelect
              options={INTERNET_TYPES}
              value={values.internet}
              onChange={(v) => set("internet", v)}
            />
          </FormField>
          <FormField label="Cell signal notes">
            <Input
              value={values.cellSignalNotes}
              onChange={(e) => set("cellSignalNotes", e.target.value)}
            />
          </FormField>
        </div>
      </CardPanel>
  );
}
