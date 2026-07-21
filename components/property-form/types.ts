import type { PropertyFormValues } from "@/lib/propertyForm";

export type PropertyFormSectionProps = {
  values: PropertyFormValues;
  set: <K extends keyof PropertyFormValues>(
    key: K,
    value: PropertyFormValues[K],
  ) => void;
};
