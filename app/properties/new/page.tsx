"use client";

import { useRouter } from "next/navigation";
import { useAction, useMutation } from "convex/react";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import { PropertyForm } from "@/components/PropertyForm";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CardPanel } from "@/components/CardPanel";
import { FormAlert } from "@/components/FormAlert";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import {
  emptyPropertyForm,
  mergeExtractedIntoForm,
  type PropertyFormValues,
} from "@/lib/propertyForm";

export default function NewPropertyPage() {
  const router = useRouter();
  const create = useMutation(api.properties.create);
  const extract = useAction(api.extractListing.extractFromListing);

  const [formValues, setFormValues] = useState<PropertyFormValues>(
    emptyPropertyForm(),
  );
  const [formKey, setFormKey] = useState(0);
  const [paste, setPaste] = useState("");
  const [extracting, setExtracting] = useState(false);
  const [extractError, setExtractError] = useState<string | null>(null);

  async function handleExtract() {
    setExtracting(true);
    setExtractError(null);
    try {
      const result = await extract({
        text: paste,
        listingUrl: formValues.listingUrl || undefined,
      });
      const merged = mergeExtractedIntoForm(formValues, result);
      setFormValues(merged);
      setFormKey((k) => k + 1);
    } catch (err) {
      setExtractError(
        err instanceof Error ? err.message : "Extraction failed",
      );
    } finally {
      setExtracting(false);
    }
  }

  return (
    <PageShell>
      <PageHeader
        title="Add property"
        description="Paste a listing to pre-fill, then review before saving."
      />

      <CardPanel title="Paste to fill">
        <Textarea
          className="min-h-28"
          rows={5}
          placeholder="Paste listing description or notes…"
          value={paste}
          onChange={(e) => setPaste(e.target.value)}
        />
        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant="accent"
            size="sm"
            disabled={extracting || !paste.trim()}
            onClick={handleExtract}
          >
            {extracting ? "Extracting…" : "Extract fields"}
          </Button>
          {extractError ? <FormAlert>{extractError}</FormAlert> : null}
        </div>
      </CardPanel>

      <PropertyForm
        key={formKey}
        initialValues={formValues}
        submitLabel="Create property"
        onSubmit={async (args) => {
          const id = await create(args);
          router.push(`/properties/${id}`);
        }}
      />
    </PageShell>
  );
}
