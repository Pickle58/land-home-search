"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

type FavoriteButtonProps = {
  propertyId: Id<"properties">;
  isFavorite: boolean;
  className?: string;
};

export function FavoriteButton({
  propertyId,
  isFavorite,
  className,
}: FavoriteButtonProps) {
  const toggleFavorite = useMutation(api.properties.toggleFavorite);

  return (
    <button
      type="button"
      aria-label={isFavorite ? "Remove favorite" : "Add favorite"}
      onClick={() => void toggleFavorite({ id: propertyId })}
      className={cn(
        isFavorite ? "text-accent" : "text-muted-foreground/40",
        className,
      )}
    >
      ★
    </button>
  );
}
