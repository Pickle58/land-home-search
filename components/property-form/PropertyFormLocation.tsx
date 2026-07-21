"use client";

import { CardPanel } from "@/components/CardPanel";
import { FormField } from "@/components/FormField";
import { Input } from "@/components/ui/input";
import type { PropertyFormSectionProps } from "./types";

export function PropertyFormLocation({ values, set }: PropertyFormSectionProps) {
  return (
      <CardPanel title="Location">
        <div className="grid gap-3 sm:grid-cols-2">
          <FormField label="Address">
            <Input
              value={values.address}
              onChange={(e) => set("address", e.target.value)}
            />
          </FormField>
          <FormField label="City / town *">
            <Input
              required
              value={values.city}
              onChange={(e) => set("city", e.target.value)}
            />
          </FormField>
          <FormField label="County *">
            <Input
              required
              value={values.county}
              onChange={(e) => set("county", e.target.value)}
            />
          </FormField>
          <FormField label="State *">
            <Input
              required
              value={values.state}
              onChange={(e) => set("state", e.target.value)}
            />
          </FormField>
          <FormField label="ZIP">
            <Input
              value={values.zip}
              onChange={(e) => set("zip", e.target.value)}
            />
          </FormField>
          <FormField label="Subdivision">
            <Input
              value={values.subdivision}
              onChange={(e) => set("subdivision", e.target.value)}
            />
          </FormField>
          <FormField label="School district">
            <Input
              value={values.schoolDistrict}
              onChange={(e) => set("schoolDistrict", e.target.value)}
            />
          </FormField>
          <FormField label="Latitude" hint="For map pin">
            <Input
              type="number"
              step="any"
              value={values.latitude}
              onChange={(e) => set("latitude", e.target.value)}
            />
          </FormField>
          <FormField label="Longitude" hint="For map pin">
            <Input
              type="number"
              step="any"
              value={values.longitude}
              onChange={(e) => set("longitude", e.target.value)}
            />
          </FormField>
        </div>
      </CardPanel>
  );
}
