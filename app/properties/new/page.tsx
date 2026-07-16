"use client";

import { useRouter } from "next/navigation";
import { useAction, useMutation } from "convex/react";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import { PropertyForm } from "@/components/PropertyForm";
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
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Add property</h1>
        <p className="text-sm text-stone-600">
          Paste a listing to pre-fill, then review before saving.
        </p>
      </div>

      <section className="space-y-3 rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
        <h2 className="text-base font-semibold">Paste to fill</h2>
        <textarea
          className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm"
          rows={5}
          placeholder="Paste listing description or notes…"
          value={paste}
          onChange={(e) => setPaste(e.target.value)}
        />
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={extracting || !paste.trim()}
            onClick={handleExtract}
            className="rounded-md bg-emerald-800 px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {extracting ? "Extracting…" : "Extract fields"}
          </button>
          {extractError ? (
            <p className="text-sm text-red-700">{extractError}</p>
          ) : null}
        </div>
      </section>

      <PropertyForm
        key={formKey}
        initialValues={formValues}
        submitLabel="Create property"
        onSubmit={async (args) => {
          const id = await create(args);
          router.push(`/properties/${id}`);
        }}
      />
    </div>
  );
}
