"use client";

import Link from "next/link";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { STATUS_LABELS, type PropertyStatus } from "@/convex/lib/enums";
import { formatAcres, formatCurrency, labelize } from "@/lib/format";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

type PropertyCardGridProps = {
  properties: Doc<"properties">[];
  selected: Id<"properties">[];
  onToggleSelect: (id: Id<"properties">) => void;
};

export function PropertyCardGrid({
  properties,
  selected,
  onToggleSelect,
}: PropertyCardGridProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((p) => (
        <article
          key={p._id}
          className="rounded-xl border border-border bg-card p-4 shadow-sm"
        >
          <div className="mb-2 flex items-start justify-between gap-2">
            <Link
              href={`/properties/${p._id}`}
              className="text-lg font-semibold text-foreground hover:underline"
            >
              {p.city}, {p.state}
            </Link>
            <FavoriteButton propertyId={p._id} isFavorite={p.isFavorite} />
          </div>
          <p className="text-sm text-foreground/90">
            {formatCurrency(p.price)} · {formatAcres(p.lotSizeAcres)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {labelize(p.waterSource)} · {labelize(p.wastewater)} · Flood{" "}
            {p.femaFloodZone || "—"}
          </p>
          <Badge variant="secondary" className="mt-2">
            {STATUS_LABELS[p.status as PropertyStatus]}
          </Badge>
          <label className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <input
              type="checkbox"
              checked={selected.includes(p._id)}
              onChange={() => onToggleSelect(p._id)}
            />
            Compare
          </label>
        </article>
      ))}
    </div>
  );
}
