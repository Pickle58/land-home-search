"use client";

import {
  ELECTRIC_AVAILABILITY,
  PROPERTY_STATUSES,
  STATUS_LABELS,
  WASTEWATER_TYPES,
  WATER_SOURCES,
} from "@/convex/lib/enums";
import { CardPanel } from "@/components/CardPanel";
import { EnumSelect } from "@/components/EnumSelect";
import { Input } from "@/components/ui/input";
import type { PropertyFiltersState } from "./types";

type PropertyFiltersProps = {
  filters: PropertyFiltersState;
  onChange: (filters: PropertyFiltersState) => void;
};

export function PropertyFilters({ filters, onChange }: PropertyFiltersProps) {
  function set<K extends keyof PropertyFiltersState>(
    key: K,
    value: PropertyFiltersState[K],
  ) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <CardPanel className="grid gap-2 p-3 sm:grid-cols-2 lg:grid-cols-4">
      <EnumSelect
        options={PROPERTY_STATUSES}
        value={(filters.status || "") as (typeof PROPERTY_STATUSES)[number] | ""}
        onChange={(v) => set("status", v)}
        placeholder="All statuses"
        labels={STATUS_LABELS}
      />
      <EnumSelect
        options={WATER_SOURCES}
        value={
          (filters.waterSource || "") as (typeof WATER_SOURCES)[number] | ""
        }
        onChange={(v) => set("waterSource", v)}
        placeholder="Water: any"
      />
      <EnumSelect
        options={WASTEWATER_TYPES}
        value={
          (filters.wastewater || "") as (typeof WASTEWATER_TYPES)[number] | ""
        }
        onChange={(v) => set("wastewater", v)}
        placeholder="Wastewater: any"
      />
      <EnumSelect
        options={ELECTRIC_AVAILABILITY}
        value={
          (filters.electric || "") as
            | (typeof ELECTRIC_AVAILABILITY)[number]
            | ""
        }
        onChange={(v) => set("electric", v)}
        placeholder="Electric: any"
      />
      <Input
        placeholder="City"
        value={filters.city}
        onChange={(e) => set("city", e.target.value)}
      />
      <Input
        placeholder="County"
        value={filters.county}
        onChange={(e) => set("county", e.target.value)}
      />
      <Input
        placeholder="State"
        value={filters.state}
        onChange={(e) => set("state", e.target.value)}
      />
      <label className="flex items-center gap-2 text-sm text-muted-foreground">
        <input
          type="checkbox"
          checked={filters.favoritesOnly}
          onChange={(e) => set("favoritesOnly", e.target.checked)}
        />
        Favorites only
      </label>
      <Input
        placeholder="Min price"
        type="number"
        value={filters.minPrice}
        onChange={(e) => set("minPrice", e.target.value)}
      />
      <Input
        placeholder="Max price"
        type="number"
        value={filters.maxPrice}
        onChange={(e) => set("maxPrice", e.target.value)}
      />
      <Input
        placeholder="Min acres"
        type="number"
        value={filters.minAcres}
        onChange={(e) => set("minAcres", e.target.value)}
      />
      <Input
        placeholder="Max acres"
        type="number"
        value={filters.maxAcres}
        onChange={(e) => set("maxAcres", e.target.value)}
      />
      <select
        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm"
        value={filters.sortBy}
        onChange={(e) =>
          set("sortBy", e.target.value as PropertyFiltersState["sortBy"])
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
        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm"
        value={filters.sortDir}
        onChange={(e) =>
          set("sortDir", e.target.value as PropertyFiltersState["sortDir"])
        }
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </CardPanel>
  );
}
