/** Shared Tailwind class strings aligned with the shadcn theme tokens. */
export const inputClass =
  "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50";

export const selectClass = `${inputClass} py-1.5`;

export const sectionClass =
  "space-y-4 rounded-xl border border-border bg-card p-4 shadow-sm";

export const fieldLabelClass = "font-medium text-foreground";

export const fieldHintClass = "text-xs text-muted-foreground";

export const pageTitleClass = "text-2xl font-semibold text-foreground";

export const pageSubtitleClass = "text-sm text-muted-foreground";
