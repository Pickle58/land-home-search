"use client";

import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { PropertyForm } from "@/components/PropertyForm";
import { LoadingState } from "@/components/LoadingState";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { PropertyNotFound } from "@/components/PropertyNotFound";
import { propertyToForm } from "@/lib/propertyForm";

export default function EditPropertyPage() {
  const params = useParams<{ id: string }>();
  const id = params.id as Id<"properties">;
  const router = useRouter();
  const data = useQuery(api.properties.get, { id });
  const update = useMutation(api.properties.update);

  if (data === undefined) {
    return <LoadingState />;
  }
  if (data === null) {
    return <PropertyNotFound />;
  }

  return (
    <PageShell spacing="tight">
      <PageHeader title="Edit property" />
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
    </PageShell>
  );
}
