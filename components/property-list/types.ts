export type PropertyFiltersState = {
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

export const emptyPropertyFilters: PropertyFiltersState = {
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
