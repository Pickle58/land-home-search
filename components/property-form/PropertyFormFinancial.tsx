"use client";

import { CardPanel } from "@/components/CardPanel";
import { FormField } from "@/components/FormField";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { PropertyFormSectionProps } from "./types";

export function PropertyFormFinancial({ values, set }: PropertyFormSectionProps) {
  return (
      <CardPanel title="Improvements & financial">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <FormField label="Existing structures">
              <Textarea
                rows={2}
                value={values.existingStructures}
                onChange={(e) => set("existingStructures", e.target.value)}
              />
            </FormField>
          </div>
          <FormField label="Structure age (years)">
            <Input
              type="number"
              value={values.structureAgeYears}
              onChange={(e) => set("structureAgeYears", e.target.value)}
            />
          </FormField>
          <FormField label="Condition notes">
            <Input
              value={values.structureConditionNotes}
              onChange={(e) => set("structureConditionNotes", e.target.value)}
            />
          </FormField>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={values.fencing}
              onChange={(e) => set("fencing", e.target.checked)}
            />
            Fencing
          </label>
          <FormField label="Fencing notes">
            <Input
              value={values.fencingNotes}
              onChange={(e) => set("fencingNotes", e.target.value)}
            />
          </FormField>
          <div className="sm:col-span-2">
            <FormField label="Outbuildings">
              <Textarea
                rows={2}
                value={values.outbuildings}
                onChange={(e) => set("outbuildings", e.target.value)}
              />
            </FormField>
          </div>
          <FormField label="Annual property tax ($)">
            <Input
              type="number"
              value={values.annualPropertyTax}
              onChange={(e) => set("annualPropertyTax", e.target.value)}
            />
          </FormField>
          <FormField label="Assessed value ($)">
            <Input
              type="number"
              value={values.assessedValue}
              onChange={(e) => set("assessedValue", e.target.value)}
            />
          </FormField>
          <FormField label="HOA fees ($)">
            <Input
              type="number"
              value={values.hoaFees}
              onChange={(e) => set("hoaFees", e.target.value)}
            />
          </FormField>
        </div>
      </CardPanel>
  );
}
