"use client";

import { labelize } from "@/lib/format";
import { cn } from "@/lib/utils";

type BaseProps<T extends string> = {
  options: readonly T[];
  labels?: Partial<Record<T, string>>;
  className?: string;
  id?: string;
  required?: boolean;
};

type WithPlaceholder<T extends string> = BaseProps<T> & {
  placeholder: string;
  value: T | "";
  onChange: (value: T | "") => void;
};

type WithoutPlaceholder<T extends string> = BaseProps<T> & {
  placeholder?: undefined;
  value: T;
  onChange: (value: T) => void;
};

export function EnumSelect<T extends string>(props: WithPlaceholder<T>): React.ReactElement;
export function EnumSelect<T extends string>(props: WithoutPlaceholder<T>): React.ReactElement;
export function EnumSelect<T extends string>({
  options,
  value,
  onChange,
  placeholder,
  labels,
  className,
  id,
  required,
}: WithPlaceholder<T> | WithoutPlaceholder<T>) {
  return (
    <select
      id={id}
      required={required}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm text-foreground shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      value={value}
      onChange={(e) => {
        const next = e.target.value;
        if (placeholder !== undefined) {
          (onChange as (value: T | "") => void)(next as T | "");
        } else {
          (onChange as (value: T) => void)(next as T);
        }
      }}
    >
      {placeholder ? <option value="">{placeholder}</option> : null}
      {options.map((option) => (
        <option key={option} value={option}>
          {labels?.[option] ?? labelize(option)}
        </option>
      ))}
    </select>
  );
}
