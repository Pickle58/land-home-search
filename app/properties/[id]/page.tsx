"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { MediaUploader } from "@/components/MediaUploader";
import { STATUS_LABELS, type PropertyStatus } from "@/convex/lib/enums";
import { formatAcres, formatCurrency, formatDate, labelize } from "@/lib/format";

function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="rounded-xl border border-border bg-card shadow-sm">
      <button
        type="button"
        className="flex w-full items-center justify-between px-4 py-3 text-left"
        onClick={() => setOpen((v) => !v)}
      >
        <h2 className="text-base font-semibold">{title}</h2>
        <span className="text-muted-foreground/60">{open ? "−" : "+"}</span>
      </button>
      {open ? <div className="space-y-2 border-t border-border/60 px-4 py-3 text-sm">{children}</div> : null}
    </section>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[10rem_1fr] gap-2">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-foreground">{value || "—"}</dd>
    </div>
  );
}

export default function PropertyDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id as Id<"properties">;
  const router = useRouter();
  const data = useQuery(api.properties.get, { id });
  const remove = useMutation(api.properties.remove);
  const [deleting, setDeleting] = useState(false);

  if (data === undefined) {
    return <p className="text-sm text-muted-foreground">Loading…</p>;
  }
  if (data === null) {
    return <p className="text-sm text-muted-foreground">Property not found.</p>;
  }

  const p = data.property;

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">
            {STATUS_LABELS[p.status as PropertyStatus]}
            {p.isFavorite ? " · ★ Favorite" : ""}
          </p>
          <h1 className="text-2xl font-semibold">
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
          <Link
            href={`/properties/${id}/edit`}
            className="rounded-md border border-input bg-background px-3 py-1.5 text-sm"
          >
            Edit
          </Link>
          <button
            type="button"
            disabled={deleting}
            className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-700"
            onClick={async () => {
              if (!confirm("Delete this property?")) return;
              setDeleting(true);
              await remove({ id });
              router.push("/");
            }}
          >
            Delete
          </button>
        </div>
      </div>

      <Section title="Location">
        <Row label="Address" value={p.address} />
        <Row label="City" value={`${p.city}, ${p.state} ${p.zip}`} />
        <Row label="County" value={p.county} />
        <Row label="Coords" value={`${p.latitude}, ${p.longitude}`} />
        <Row label="Subdivision" value={p.subdivision} />
        <Row label="Schools" value={p.schoolDistrict} />
      </Section>

      <Section title="Listing">
        <Row
          label="URL"
          value={
            p.listingUrl ? (
              <a href={p.listingUrl} className="underline" target="_blank" rel="noreferrer">
                Open listing
              </a>
            ) : null
          }
        />
        <Row label="MLS" value={p.mlsNumber} />
        <Row label="Found" value={formatDate(p.dateFound)} />
        <Row label="Source" value={p.source} />
        <Row label="Agent" value={[p.agentName, p.agentContact].filter(Boolean).join(" · ")} />
      </Section>

      <Section title="Utilities">
        <Row label="Water" value={labelize(p.waterSource)} />
        <Row label="Well" value={[p.wellDepthFt && `${p.wellDepthFt} ft`, p.wellGpm && `${p.wellGpm} gpm`].filter(Boolean).join(" · ")} />
        <Row label="Wastewater" value={labelize(p.wastewater)} />
        <Row label="Septic notes" value={p.septicNotes} />
        <Row label="Electric" value={labelize(p.electric)} />
        <Row label="Gas" value={labelize(p.gas)} />
        <Row label="Internet" value={labelize(p.internet)} />
        <Row label="Cell" value={p.cellSignalNotes} />
      </Section>

      <Section title="Access">
        <Row label="Road type" value={labelize(p.roadType)} />
        <Row label="Maintenance" value={labelize(p.roadMaintenance)} />
        <Row label="Driveway" value={p.drivewayInstalled ? "Yes" : "No"} />
        <Row label="From paved" value={p.distanceFromPavedRoadMiles != null ? `${p.distanceFromPavedRoadMiles} mi` : null} />
        <Row label="Fire dept access" value={labelize(p.fireDeptAccessAdequate ?? "unknown")} />
        <Row label="Nearest station" value={p.nearestFireStationMiles != null ? `${p.nearestFireStationMiles} mi` : null} />
        <Row label="Access width" value={p.fireDeptAccessRoadWidthFt != null ? `${p.fireDeptAccessRoadWidthFt} ft` : null} />
        <Row label="FD improvements" value={p.fireDeptImprovementsNeeded} />
      </Section>

      <Section title="Hazards">
        <Row label="Flood zone" value={p.femaFloodZone} />
        <Row label="Fire risk" value={labelize(p.fireRiskZone)} />
        <Row label="Wildfire nearby" value={p.wildfireHistoryNearby ? "Yes" : "No"} />
        <Row label="Landslide" value={labelize(p.landslideRisk)} />
        <Row label="Wetlands" value={p.wetlandsPresent ? "Yes" : "No"} />
        <Row label="Env. notes" value={p.protectedSpeciesOrEnvRestrictions} />
      </Section>

      <Section title="Land / financial">
        <Row label="Zoning" value={p.zoning} />
        <Row label="Topography" value={labelize(p.topography)} />
        <Row label="Buildable ac" value={p.buildableAcres} />
        <Row label="Mineral rights" value={labelize(p.mineralRights)} />
        <Row label="Tax" value={formatCurrency(p.annualPropertyTax)} />
        <Row label="Assessed" value={formatCurrency(p.assessedValue)} />
        <Row label="HOA fees" value={formatCurrency(p.hoaFees)} />
      </Section>

      <Section title="Notes">
        <Row label="Tags" value={p.tags?.join(", ")} />
        <p className="whitespace-pre-wrap text-foreground">{p.notes || "—"}</p>
      </Section>

      <Section title="Photos & documents">
        <MediaUploader
          propertyId={id}
          photoIds={p.photos}
          documents={data.documents}
        />
      </Section>
    </div>
  );
}
