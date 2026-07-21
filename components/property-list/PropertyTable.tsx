"use client";

import Link from "next/link";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { STATUS_LABELS, type PropertyStatus } from "@/convex/lib/enums";
import { formatAcres, formatCurrency, labelize } from "@/lib/format";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableHead,
  DataTableHeader,
  DataTableRow,
} from "@/components/ui/data-table";

type PropertyTableProps = {
  properties: Doc<"properties">[];
  selected: Id<"properties">[];
  onToggleSelect: (id: Id<"properties">) => void;
};

export function PropertyTable({
  properties,
  selected,
  onToggleSelect,
}: PropertyTableProps) {
  return (
    <DataTable>
      <DataTableHeader>
        <tr>
          <DataTableHead>Cmp</DataTableHead>
          <DataTableHead>★</DataTableHead>
          <DataTableHead>City</DataTableHead>
          <DataTableHead>Price</DataTableHead>
          <DataTableHead>Acres</DataTableHead>
          <DataTableHead>Water</DataTableHead>
          <DataTableHead>Septic</DataTableHead>
          <DataTableHead>Flood</DataTableHead>
          <DataTableHead>Status</DataTableHead>
        </tr>
      </DataTableHeader>
      <DataTableBody>
        {properties.map((p) => (
          <DataTableRow key={p._id}>
            <DataTableCell>
              <input
                type="checkbox"
                checked={selected.includes(p._id)}
                onChange={() => onToggleSelect(p._id)}
              />
            </DataTableCell>
            <DataTableCell>
              <FavoriteButton propertyId={p._id} isFavorite={p.isFavorite} />
            </DataTableCell>
            <DataTableCell>
              <Link
                href={`/properties/${p._id}`}
                className="font-medium text-primary underline-offset-2 hover:underline"
              >
                {p.city}, {p.state}
              </Link>
            </DataTableCell>
            <DataTableCell>{formatCurrency(p.price)}</DataTableCell>
            <DataTableCell>{formatAcres(p.lotSizeAcres)}</DataTableCell>
            <DataTableCell>{labelize(p.waterSource)}</DataTableCell>
            <DataTableCell>{labelize(p.wastewater)}</DataTableCell>
            <DataTableCell>{p.femaFloodZone || "—"}</DataTableCell>
            <DataTableCell>
              {STATUS_LABELS[p.status as PropertyStatus]}
            </DataTableCell>
          </DataTableRow>
        ))}
      </DataTableBody>
    </DataTable>
  );
}
