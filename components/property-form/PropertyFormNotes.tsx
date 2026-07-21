"use client";

import { CardPanel } from "@/components/CardPanel";
import { FormField } from "@/components/FormField";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { PropertyFormSectionProps } from "./types";

export function PropertyFormNotes({ values, set }: PropertyFormSectionProps) {
  return (
      <CardPanel title="Notes">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={values.isFavorite}
              onChange={(e) => set("isFavorite", e.target.checked)}
            />
            Favorite
          </label>
          <FormField label="Tags" hint="Comma-separated">
            <Input
              value={values.tags}
              onChange={(e) => set("tags", e.target.value)}
            />
          </FormField>
          <div className="sm:col-span-2">
            <FormField label="Notes">
              <Textarea
                rows={4}
                value={values.notes}
                onChange={(e) => set("notes", e.target.value)}
              />
            </FormField>
          </div>
        </div>
      </CardPanel>
  );
}
