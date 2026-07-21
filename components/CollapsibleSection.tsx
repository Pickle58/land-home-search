"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type CollapsibleSectionProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export function CollapsibleSection({
  title,
  children,
  defaultOpen = true,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="rounded-xl border border-border bg-card shadow-sm">
      <button
        type="button"
        className="flex w-full items-center justify-between px-4 py-3 text-left"
        onClick={() => setOpen((v) => !v)}
      >
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <span className="text-muted-foreground/60">{open ? "−" : "+"}</span>
      </button>
      {open ? (
        <div
          className={cn(
            "space-y-2 border-t border-border/60 px-4 py-3 text-sm",
          )}
        >
          {children}
        </div>
      ) : null}
    </section>
  );
}
