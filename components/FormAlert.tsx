import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FormAlertProps = {
  children: ReactNode;
  variant?: "destructive" | "success";
  className?: string;
};

export function FormAlert({
  children,
  variant = "destructive",
  className,
}: FormAlertProps) {
  return (
    <p
      role="alert"
      className={cn(
        "rounded-md border px-3 py-2 text-sm",
        variant === "destructive" &&
          "border-destructive/30 bg-destructive/10 text-destructive",
        variant === "success" &&
          "border-primary/20 bg-primary/5 text-primary",
        className,
      )}
    >
      {children}
    </p>
  );
}
