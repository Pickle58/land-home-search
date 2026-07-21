"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { MediaUploader } from "@/components/MediaUploader";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { DetailRow } from "@/components/DetailRow";
import { LoadingState } from "@/components/LoadingState";
import { PageShell } from "@/components/PageShell";
import { PropertyNotFound } from "@/components/PropertyNotFound";
import { Button } from "@/components/ui/button";
import { STATUS_LABELS, type PropertyStatus } from "@/convex/lib/enums";
import { formatAcres, formatCurrency } from "@/lib/format";
import {
  DETAIL_SECTIONS,
  fieldsForSection,
} from "@/lib/propertyDisplay";

export default function PropertyDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id as Id<"properties">;
  const router = useRouter();
  const data = useQuery(api.properties.get, { id });
  const remove = useMutation(api.properties.remove);
  const [deleting, setDeleting] = useState(false);

  if (data === undefined) {
    return <LoadingState />;
  }
  if (data === null) {
    return <PropertyNotFound />;
  }

  const p = data.property;

  return (
    <PageShell spacing="tight">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">
            {STATUS_LABELS[p.status as PropertyStatus]}
            {p.isFavorite ? " · ★ Favorite" : ""}
          </p>
          <h1 className="text-2xl font-semibold text-foreground">
            {p.address || `${p.city}, ${p.state}`}
          </h1>
          <p className="text-foreground/90">
            {formatCurrency(p.price)} · {formatAcres(p.lotSizeAcres)}
            {p.pricePerAcre
              ? ` · ${formatCurrency(p.pricePerAcre)}/ac`
              : ""}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/properties/${id}/edit`}>Edit</Link>
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            disabled={deleting}
            onClick={async () => {
              if (!confirm("Delete this property?")) return;
              setDeleting(true);
              await remove({ id });
              router.push("/");
            }}
          >
            Delete
          </Button>
        </div>
      </div>

      {DETAIL_SECTIONS.map((section) => (
        <CollapsibleSection key={section.id} title={section.title}>
          {fieldsForSection(section.id).map((field) => (
            <DetailRow
              key={field.key}
              label={field.label}
              value={field.format(p)}
            />
          ))}
        </CollapsibleSection>
      ))}

      <CollapsibleSection title="Notes">
        <DetailRow label="Tags" value={p.tags?.join(", ")} />
        <p className="whitespace-pre-wrap text-foreground">{p.notes || "—"}</p>
      </CollapsibleSection>

      <CollapsibleSection title="Photos & documents">
        <MediaUploader
          propertyId={id}
          photoIds={p.photos}
          documents={data.documents}
        />
      </CollapsibleSection>
    </PageShell>
  );
}
