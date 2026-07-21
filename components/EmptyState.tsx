import type { ReactNode } from "react";

type EmptyStateProps = {
  children: ReactNode;
};

export function EmptyState({ children }: EmptyStateProps) {
  return (
    <p className="rounded-xl border border-dashed border-border bg-card p-8 text-center text-muted-foreground">
      {children}
    </p>
  );
}
