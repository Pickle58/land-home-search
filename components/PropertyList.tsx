"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import {
  ELECTRIC_AVAILABILITY,
  PROPERTY_STATUSES,
  STATUS_LABELS,
  WASTEWATER_TYPES,
  WATER_SOURCES,
  type PropertyStatus,
} from "@/convex/lib/enums";
import { formatAcres, formatCurrency, labelize } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  pageSubtitleClass,
  pageTitleClass,
  selectClass,
} from "@/lib/ui-styles";
import { cn } from "@/lib/utils";

type Filters = {
  status: string;
  waterSource: string;
  wastewater: string;
  electric: string;
  city: string;
  county: string;
  state: string;
  favoritesOnly: boolean;
  minPrice: string;
  maxPrice: string;
  minAcres: string;
  maxAcres: string;
  sortBy: "updatedAt" | "price" | "lotSizeAcres" | "city" | "status" | "dateFound";
  sortDir: "asc" | "desc";
};

const emptyFilters: Filters = {
  status: "",
  waterSource: "",
  wastewater: "",
  electric: "",
  city: "",
  county: "",
  state: "",
  favoritesOnly: false,
  minPrice: "",
  maxPrice: "",
  minAcres: "",
  maxAcres: "",
  sortBy: "updatedAt",
  sortDir: "desc",
};

export function PropertyList() {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [selected, setSelected] = useState<Id<"properties">[]>([]);
  const [view, setView] = useState<"table" | "cards">("table");
  const toggleFavorite = useMutation(api.properties.toggleFavorite);

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
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className={pageTitleClass}>Properties</h1>
          <p className={pageSubtitleClass}>
            Catalog and compare land and homes you&apos;re researching.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
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
            className={cn(selected.length < 2 && "pointer-events-none opacity-50")}
          >
            <Link href={compareHref}>Compare ({selected.length}/4)</Link>
          </Button>
          <Button variant="accent" size="sm" asChild>
            <Link href="/properties/new">Add property</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-2 rounded-xl border border-border bg-card p-3 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
        <select
          className={selectClass}
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All statuses</option>
          {PROPERTY_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
        <select
          className={selectClass}
          value={filters.waterSource}
          onChange={(e) =>
            setFilters({ ...filters, waterSource: e.target.value })
          }
        >
          <option value="">Water: any</option>
          {WATER_SOURCES.map((w) => (
            <option key={w} value={w}>
              {labelize(w)}
            </option>
          ))}
        </select>
        <select
          className={selectClass}
          value={filters.wastewater}
          onChange={(e) =>
            setFilters({ ...filters, wastewater: e.target.value })
          }
        >
          <option value="">Wastewater: any</option>
          {WASTEWATER_TYPES.map((w) => (
            <option key={w} value={w}>
              {labelize(w)}
            </option>
          ))}
        </select>
        <select
          className={selectClass}
          value={filters.electric}
          onChange={(e) => setFilters({ ...filters, electric: e.target.value })}
        >
          <option value="">Electric: any</option>
          {ELECTRIC_AVAILABILITY.map((eOpt) => (
            <option key={eOpt} value={eOpt}>
              {labelize(eOpt)}
            </option>
          ))}
        </select>
        <input
          className={selectClass}
          placeholder="City"
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
        />
        <input
          className={selectClass}
          placeholder="County"
          value={filters.county}
          onChange={(e) => setFilters({ ...filters, county: e.target.value })}
        />
        <input
          className={selectClass}
          placeholder="State"
          value={filters.state}
          onChange={(e) => setFilters({ ...filters, state: e.target.value })}
        />
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={filters.favoritesOnly}
            onChange={(e) =>
              setFilters({ ...filters, favoritesOnly: e.target.checked })
            }
          />
          Favorites only
        </label>
        <input
          className={selectClass}
          placeholder="Min price"
          type="number"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
        />
        <input
          className={selectClass}
          placeholder="Max price"
          type="number"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
        />
        <input
          className={selectClass}
          placeholder="Min acres"
          type="number"
          value={filters.minAcres}
          onChange={(e) => setFilters({ ...filters, minAcres: e.target.value })}
        />
        <input
          className={selectClass}
          placeholder="Max acres"
          type="number"
          value={filters.maxAcres}
          onChange={(e) => setFilters({ ...filters, maxAcres: e.target.value })}
        />
        <select
          className={selectClass}
          value={filters.sortBy}
          onChange={(e) =>
            setFilters({
              ...filters,
              sortBy: e.target.value as Filters["sortBy"],
            })
          }
        >
          <option value="updatedAt">Sort: updated</option>
          <option value="price">Sort: price</option>
          <option value="lotSizeAcres">Sort: acres</option>
          <option value="city">Sort: city</option>
          <option value="status">Sort: status</option>
          <option value="dateFound">Sort: date found</option>
        </select>
        <select
          className={selectClass}
          value={filters.sortDir}
          onChange={(e) =>
            setFilters({
              ...filters,
              sortDir: e.target.value as Filters["sortDir"],
            })
          }
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      {properties === undefined ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : properties.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border bg-card p-8 text-center text-muted-foreground">
          No properties yet.{" "}
          <Link href="/properties/new" className="underline">
            Add your first listing
          </Link>
          .
        </p>
      ) : view === "table" ? (
        <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-border bg-muted text-muted-foreground">
              <tr>
                <th className="px-3 py-2">Cmp</th>
                <th className="px-3 py-2">★</th>
                <th className="px-3 py-2">City</th>
                <th className="px-3 py-2">Price</th>
                <th className="px-3 py-2">Acres</th>
                <th className="px-3 py-2">Water</th>
                <th className="px-3 py-2">Septic</th>
                <th className="px-3 py-2">Flood</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p) => (
                <tr key={p._id} className="border-b border-border/60">
                  <td className="px-3 py-2">
                    <input
                      type="checkbox"
                      checked={selected.includes(p._id)}
                      onChange={() => toggleSelect(p._id)}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <button
                      type="button"
                      aria-label="Toggle favorite"
                      onClick={() => toggleFavorite({ id: p._id })}
                      className={
                        p.isFavorite ? "text-accent" : "text-muted-foreground/40"
                      }
                    >
                      ★
                    </button>
                  </td>
                  <td className="px-3 py-2">
                    <Link
                      href={`/properties/${p._id}`}
                      className="font-medium text-primary underline-offset-2 hover:underline"
                    >
                      {p.city}, {p.state}
                    </Link>
                  </td>
                  <td className="px-3 py-2">{formatCurrency(p.price)}</td>
                  <td className="px-3 py-2">{formatAcres(p.lotSizeAcres)}</td>
                  <td className="px-3 py-2">{labelize(p.waterSource)}</td>
                  <td className="px-3 py-2">{labelize(p.wastewater)}</td>
                  <td className="px-3 py-2">{p.femaFloodZone || "—"}</td>
                  <td className="px-3 py-2">
                    {STATUS_LABELS[p.status as PropertyStatus]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
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
                <button
                  type="button"
                  onClick={() => toggleFavorite({ id: p._id })}
                  className={p.isFavorite ? "text-accent" : "text-muted-foreground/40"}
                >
                  ★
                </button>
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
                  onChange={() => toggleSelect(p._id)}
                />
                Compare
              </label>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
