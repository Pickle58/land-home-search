import type { ReactNode } from "react";
import { sectionClass } from "@/lib/ui-styles";
import { cn } from "@/lib/utils";

type CardPanelProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export function CardPanel({ title, children, className }: CardPanelProps) {
  return (
    <section className={cn(sectionClass, className)}>
      {title ? (
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
      ) : null}
      {children}
    </section>
  );
}
