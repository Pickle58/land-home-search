import { getAuthUserId } from "@convex-dev/auth/server";
import type { Id } from "../_generated/dataModel";
import type { ActionCtx, MutationCtx, QueryCtx } from "../_generated/server";

export async function requireUserId(ctx: QueryCtx | MutationCtx) {
  const userId = await getAuthUserId(ctx);
  if (!userId) {
    throw new Error("Not authenticated");
  }
  return userId;
}

export async function requireActionUser(ctx: ActionCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Not authenticated");
  }
  return identity;
}

export async function getOwnedProperty(
  ctx: QueryCtx | MutationCtx,
  propertyId: Id<"properties">,
  userId: Id<"users">,
) {
  const property = await ctx.db.get(propertyId);
  if (!property || property.userId !== userId) {
    return null;
  }
  return property;
}

export async function requireOwnedProperty(
  ctx: QueryCtx | MutationCtx,
  propertyId: Id<"properties">,
  userId: Id<"users">,
) {
  const property = await getOwnedProperty(ctx, propertyId, userId);
  if (!property) {
    throw new Error("Property not found");
  }
  return property;
}

export async function touchProperty(
  ctx: MutationCtx,
  propertyId: Id<"properties">,
) {
  await ctx.db.patch(propertyId, { updatedAt: Date.now() });
}
