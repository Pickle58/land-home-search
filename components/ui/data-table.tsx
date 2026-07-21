import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type DataTableProps = {
  children: ReactNode;
  className?: string;
};

export function DataTable({ children, className }: DataTableProps) {
  return (
    <div
      className={cn(
        "overflow-x-auto rounded-xl border border-border bg-card shadow-sm",
        className,
      )}
    >
      <table className="min-w-full text-left text-sm">{children}</table>
    </div>
  );
}

export function DataTableHeader({ children }: { children: ReactNode }) {
  return (
    <thead className="border-b border-border bg-muted text-muted-foreground">
      {children}
    </thead>
  );
}

export function DataTableBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function DataTableRow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <tr className={cn("border-b border-border/60", className)}>{children}</tr>
  );
}

export function DataTableHead({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <th className={cn("px-3 py-2", className)}>{children}</th>;
}

export function DataTableCell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <td className={cn("px-3 py-2", className)}>{children}</td>;
}
