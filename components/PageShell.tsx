import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageShellProps = {
  children: ReactNode;
  className?: string;
  spacing?: "tight" | "normal";
};

export function PageShell({
  children,
  className,
  spacing = "normal",
}: PageShellProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-3xl",
        spacing === "normal" ? "space-y-6" : "space-y-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
