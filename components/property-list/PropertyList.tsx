"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/EmptyState";
import { LoadingState } from "@/components/LoadingState";
import { PageHeader } from "@/components/PageHeader";
import { PropertyCardGrid } from "@/components/property-list/PropertyCardGrid";
import { PropertyFilters } from "@/components/property-list/PropertyFilters";
import { PropertyTable } from "@/components/property-list/PropertyTable";
import {
  emptyPropertyFilters,
  type PropertyFiltersState,
} from "@/components/property-list/types";
import { cn } from "@/lib/utils";

export function PropertyList() {
  const [filters, setFilters] =
    useState<PropertyFiltersState>(emptyPropertyFilters);
  const [selected, setSelected] = useState<Id<"properties">[]>([]);
  const [view, setView] = useState<"table" | "cards">("table");

  const queryArgs = useMemo(() => {
    const args: Record<string, unknown> = {
      sortBy: filters.sortBy,
      sortDir: filters.sortDir,
    };
    if (filters.status) args.status = filters.status;
    if (filters.waterSource) args.waterSource = filters.waterSource;
    if (filters.wastewater) args.wastewater = filters.wastewater;
    if (filters.electric) args.electric = filters.electric;
    if (filters.city.trim()) args.city = filters.city.trim();
    if (filters.county.trim()) args.county = filters.county.trim();
    if (filters.state.trim()) args.state = filters.state.trim();
    if (filters.favoritesOnly) args.isFavorite = true;
    if (filters.minPrice) args.minPrice = Number(filters.minPrice);
    if (filters.maxPrice) args.maxPrice = Number(filters.maxPrice);
    if (filters.minAcres) args.minAcres = Number(filters.minAcres);
    if (filters.maxAcres) args.maxAcres = Number(filters.maxAcres);
    return args;
  }, [filters]);

  const properties = useQuery(api.properties.list, queryArgs);

  function toggleSelect(id: Id<"properties">) {
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      if (prev.length >= 4) {
        return prev;
      }
      return [...prev, id];
    });
  }

  const compareHref =
    selected.length >= 2
      ? `/compare?ids=${selected.join(",")}`
      : "/compare";

  return (
    <div className="space-y-4">
      <PageHeader
        title="Properties"
        description="Catalog and compare land and homes you're researching."
        actions={
          <>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setView(view === "table" ? "cards" : "table")}
            >
              {view === "table" ? "Card view" : "Table view"}
            </Button>
            <Button
              variant={selected.length >= 2 ? "secondary" : "outline"}
              size="sm"
              asChild
              disabled={selected.length < 2}
              className={cn(
                selected.length < 2 && "pointer-events-none opacity-50",
              )}
            >
              <Link href={compareHref}>Compare ({selected.length}/4)</Link>
            </Button>
            <Button variant="accent" size="sm" asChild>
              <Link href="/properties/new">Add property</Link>
            </Button>
          </>
        }
      />

      <PropertyFilters filters={filters} onChange={setFilters} />

      {properties === undefined ? (
        <LoadingState />
      ) : properties.length === 0 ? (
        <EmptyState>
          No properties yet.{" "}
          <Link href="/properties/new" className="underline">
            Add your first listing
          </Link>
          .
        </EmptyState>
      ) : view === "table" ? (
        <PropertyTable
          properties={properties}
          selected={selected}
          onToggleSelect={toggleSelect}
        />
      ) : (
        <PropertyCardGrid
          properties={properties}
          selected={selected}
          onToggleSelect={toggleSelect}
        />
      )}
    </div>
  );
}
