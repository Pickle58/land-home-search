"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, Suspense } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { LoadingState } from "@/components/LoadingState";
import { PageHeader } from "@/components/PageHeader";
import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableHead,
  DataTableHeader,
  DataTableRow,
} from "@/components/ui/data-table";
import { COMPARE_FIELDS } from "@/lib/propertyDisplay";

function CompareInner() {
  const search = useSearchParams();
  const ids = useMemo(() => {
    const raw = search.get("ids") ?? "";
    return raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 4) as Id<"properties">[];
  }, [search]);

  const properties = useQuery(
    api.properties.getMany,
    ids.length ? { ids } : "skip",
  );

  if (ids.length < 2) {
    return (
      <div className="space-y-3">
        <PageHeader
          title="Compare"
          description="Select 2–4 properties on the list page, then open Compare."
        />
        <Link href="/" className="text-sm underline">
          Back to list
        </Link>
      </div>
    );
  }

  if (properties === undefined) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title="Compare"
        description="Side-by-side tradeoffs across utilities, hazards, and cost."
      />
      <DataTable>
        <DataTableHeader>
          <tr>
            <DataTableHead>Field</DataTableHead>
            {properties.map((p) => (
              <DataTableHead key={p._id}>
                <Link
                  href={`/properties/${p._id}`}
                  className="font-semibold underline-offset-2 hover:underline"
                >
                  {p.city}, {p.state}
                </Link>
              </DataTableHead>
            ))}
          </tr>
        </DataTableHeader>
        <DataTableBody>
          {COMPARE_FIELDS.map((field) => (
            <DataTableRow key={field.key} className="align-top">
              <DataTableCell className="font-medium text-muted-foreground">
                {field.label}
              </DataTableCell>
              {properties.map((p) => (
                <DataTableCell key={p._id}>{field.format(p)}</DataTableCell>
              ))}
            </DataTableRow>
          ))}
        </DataTableBody>
      </DataTable>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <CompareInner />
    </Suspense>
  );
}
