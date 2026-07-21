"use client";

import { CardPanel } from "@/components/CardPanel";
import { FormField } from "@/components/FormField";
import { EnumSelect } from "@/components/EnumSelect";
import { Input } from "@/components/ui/input";
import type { PropertyFormSectionProps } from "./types";
import {
  PROPERTY_STATUSES,
  STATUS_LABELS
} from "@/convex/lib/enums";

export function PropertyFormListing({ values, set }: PropertyFormSectionProps) {
  return (
      <CardPanel title="Listing">
        <div className="grid gap-3 sm:grid-cols-2">
          <FormField label="Listing URL">
            <Input
              value={values.listingUrl}
              onChange={(e) => set("listingUrl", e.target.value)}
            />
          </FormField>
          <FormField label="MLS #">
            <Input
              value={values.mlsNumber}
              onChange={(e) => set("mlsNumber", e.target.value)}
            />
          </FormField>
          <FormField label="Price *">
            <Input
              type="number"
              required
              value={values.price}
              onChange={(e) => set("price", e.target.value)}
            />
          </FormField>
          <FormField label="Status">
            <EnumSelect
              options={PROPERTY_STATUSES}
              value={values.status}
              onChange={(v) => set("status", v)}
              labels={STATUS_LABELS}
            />
          </FormField>
          <FormField label="Date found">
            <Input
              type="date"
              value={values.dateFound}
              onChange={(e) => set("dateFound", e.target.value)}
            />
          </FormField>
          <FormField label="Source">
            <Input
              value={values.source}
              onChange={(e) => set("source", e.target.value)}
              placeholder="Zillow, county listing…"
            />
          </FormField>
          <FormField label="Agent name">
            <Input
              value={values.agentName}
              onChange={(e) => set("agentName", e.target.value)}
            />
          </FormField>
          <FormField label="Agent contact">
            <Input
              value={values.agentContact}
              onChange={(e) => set("agentContact", e.target.value)}
            />
          </FormField>
        </div>
      </CardPanel>
  );
}
