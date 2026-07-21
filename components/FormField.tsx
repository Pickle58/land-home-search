"use client";

import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FormFieldProps = {
  label: string;
  children: ReactNode;
  hint?: string;
  htmlFor?: string;
  className?: string;
};

export function FormField({
  label,
  children,
  hint,
  htmlFor,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5 text-sm", className)}>
      <Label htmlFor={htmlFor} className="font-medium text-foreground">
        {label}
      </Label>
      {children}
      {hint ? (
        <span className="text-xs text-muted-foreground">{hint}</span>
      ) : null}
    </div>
  );
}
