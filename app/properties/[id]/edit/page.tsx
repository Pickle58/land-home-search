"use client";

import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { PropertyForm } from "@/components/PropertyForm";
import { propertyToForm } from "@/lib/propertyForm";

export default function EditPropertyPage() {
  const params = useParams<{ id: string }>();
  const id = params.id as Id<"properties">;
  const router = useRouter();
  const data = useQuery(api.properties.get, { id });
  const update = useMutation(api.properties.update);

  if (data === undefined) {
    return <p className="text-sm text-muted-foreground">Loading…</p>;
  }
  if (data === null) {
    return <p className="text-sm text-muted-foreground">Property not found.</p>;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <h1 className="text-2xl font-semibold">Edit property</h1>
      <PropertyForm
        initialValues={propertyToForm(data.property)}
        submitLabel="Save changes"
        onSubmit={async (args) => {
          await update({
            id,
            ...args,
            priceHistory: data.property.priceHistory,
            contacts: data.property.contacts,
            visitLog: data.property.visitLog,
          });
          router.push(`/properties/${id}`);
        }}
      />
    </div>
  );
}
