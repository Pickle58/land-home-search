"use client";

import { FormEvent, useState } from "react";
import {
  PropertyFormValues,
  formToMutationArgs,
} from "@/lib/propertyForm";
import { Button } from "@/components/ui/button";
import { FormAlert } from "@/components/FormAlert";
import { PropertyFormAccess } from "@/components/property-form/PropertyFormAccess";
import { PropertyFormFinancial } from "@/components/property-form/PropertyFormFinancial";
import { PropertyFormHazards } from "@/components/property-form/PropertyFormHazards";
import { PropertyFormLand } from "@/components/property-form/PropertyFormLand";
import { PropertyFormListing } from "@/components/property-form/PropertyFormListing";
import { PropertyFormLocation } from "@/components/property-form/PropertyFormLocation";
import { PropertyFormNotes } from "@/components/property-form/PropertyFormNotes";
import { PropertyFormUtilities } from "@/components/property-form/PropertyFormUtilities";

type Props = {
  initialValues: PropertyFormValues;
  submitLabel: string;
  onSubmit: (args: ReturnType<typeof formToMutationArgs>) => Promise<void>;
  headerSlot?: React.ReactNode;
};

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

  const sectionProps = { values, set };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {headerSlot}
      {error ? <FormAlert>{error}</FormAlert> : null}
      <PropertyFormLocation {...sectionProps} />
      <PropertyFormListing {...sectionProps} />
      <PropertyFormLand {...sectionProps} />
      <PropertyFormUtilities {...sectionProps} />
      <PropertyFormAccess {...sectionProps} />
      <PropertyFormHazards {...sectionProps} />
      <PropertyFormFinancial {...sectionProps} />
      <PropertyFormNotes {...sectionProps} />
      <div className="flex justify-end gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
