"use client";

import { CardPanel } from "@/components/CardPanel";
import { FormField } from "@/components/FormField";
import { EnumSelect } from "@/components/EnumSelect";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { PropertyFormSectionProps } from "./types";
import {
  FIRE_DEPT_ACCESS,
  ROAD_MAINTENANCE,
  ROAD_TYPES
} from "@/convex/lib/enums";

export function PropertyFormAccess({ values, set }: PropertyFormSectionProps) {
  return (
      <CardPanel title="Access">
        <div className="grid gap-3 sm:grid-cols-2">
          <FormField label="Road type" hint="Paved, gravel, dirt, private easement…">
            <EnumSelect
              options={ROAD_TYPES}
              value={values.roadType}
              onChange={(v) => set("roadType", v)}
            />
          </FormField>
          <FormField
            label="Road maintenance"
            hint="County, HOA, or private owner"
          >
            <EnumSelect
              options={ROAD_MAINTENANCE}
              value={values.roadMaintenance}
              onChange={(v) => set("roadMaintenance", v)}
            />
          </FormField>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={values.drivewayInstalled}
              onChange={(e) => set("drivewayInstalled", e.target.checked)}
            />
            Driveway installed
          </label>
          <FormField label="Miles from paved road">
            <Input
              type="number"
              step="any"
              value={values.distanceFromPavedRoadMiles}
              onChange={(e) =>
                set("distanceFromPavedRoadMiles", e.target.value)
              }
            />
          </FormField>
          <FormField
            label="Fire dept access"
            hint="Adequate for engines, or needs improvements"
          >
            <EnumSelect
              options={FIRE_DEPT_ACCESS}
              value={values.fireDeptAccessAdequate}
              onChange={(v) => set("fireDeptAccessAdequate", v)}
            />
          </FormField>
          <FormField label="Nearest fire station (mi)">
            <Input
              type="number"
              step="any"
              value={values.nearestFireStationMiles}
              onChange={(e) =>
                set("nearestFireStationMiles", e.target.value)
              }
            />
          </FormField>
          <FormField
            label="Access road width (ft)"
            hint="Driveway / access width for apparatus"
          >
            <Input
              type="number"
              step="any"
              value={values.fireDeptAccessRoadWidthFt}
              onChange={(e) =>
                set("fireDeptAccessRoadWidthFt", e.target.value)
              }
            />
          </FormField>
          <div className="sm:col-span-2">
            <FormField
              label="Fire dept improvements needed"
              hint="Turnaround, vegetation clearance, bridge/weight limits, etc."
            >
              <Textarea
              className="min-h-[80px]"
                value={values.fireDeptImprovementsNeeded}
                onChange={(e) =>
                  set("fireDeptImprovementsNeeded", e.target.value)
                }
              />
            </FormField>
          </div>
        </div>
      </CardPanel>
  );
}
