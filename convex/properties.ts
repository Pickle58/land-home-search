import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { Doc, Id } from "./_generated/dataModel";
import {
  electricValidator,
  propertyStatusValidator,
  wastewaterValidator,
  waterSourceValidator,
} from "./lib/enums";
import {
  computePricePerAcre,
  propertyFieldsValidator,
} from "./lib/propertyFields";
import { requireUserId } from "./lib/auth";

const sortFields = v.union(
  v.literal("updatedAt"),
  v.literal("price"),
  v.literal("lotSizeAcres"),
  v.literal("city"),
  v.literal("status"),
  v.literal("dateFound"),
);

export const list = query({
  args: {
    status: v.optional(propertyStatusValidator),
    waterSource: v.optional(waterSourceValidator),
    wastewater: v.optional(wastewaterValidator),
    electric: v.optional(electricValidator),
    femaFloodZone: v.optional(v.string()),
    fireRiskZone: v.optional(v.string()),
    city: v.optional(v.string()),
    county: v.optional(v.string()),
    state: v.optional(v.string()),
    isFavorite: v.optional(v.boolean()),
    minPrice: v.optional(v.number()),
    maxPrice: v.optional(v.number()),
    minAcres: v.optional(v.number()),
    maxAcres: v.optional(v.number()),
    sortBy: v.optional(sortFields),
    sortDir: v.optional(v.union(v.literal("asc"), v.literal("desc"))),
  },
  returns: v.array(v.any()),
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx);
    let properties: Doc<"properties">[];

    if (args.status !== undefined) {
      properties = await ctx.db
        .query("properties")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .collect();
    } else if (args.isFavorite === true) {
      properties = await ctx.db
        .query("properties")
        .withIndex("by_isFavorite", (q) => q.eq("isFavorite", true))
        .collect();
    } else if (args.state) {
      properties = await ctx.db
        .query("properties")
        .withIndex("by_state", (q) => q.eq("state", args.state!))
        .collect();
    } else if (args.city) {
      properties = await ctx.db
        .query("properties")
        .withIndex("by_city", (q) => q.eq("city", args.city!))
        .collect();
    } else if (args.county) {
      properties = await ctx.db
        .query("properties")
        .withIndex("by_county", (q) => q.eq("county", args.county!))
        .collect();
    } else {
      properties = await ctx.db
        .query("properties")
        .withIndex("by_user", (q) => q.eq("userId", userId))
        .collect();
    }

    const filtered = properties.filter((property) => {
      if (property.userId !== userId) {
        return false;
      }
      if (
        args.waterSource !== undefined &&
        property.waterSource !== args.waterSource
      ) {
        return false;
      }
      if (
        args.wastewater !== undefined &&
        property.wastewater !== args.wastewater
      ) {
        return false;
      }
      if (args.electric !== undefined && property.electric !== args.electric) {
        return false;
      }
      if (
        args.femaFloodZone &&
        !property.femaFloodZone
          .toLowerCase()
          .includes(args.femaFloodZone.toLowerCase())
      ) {
        return false;
      }
      if (
        args.fireRiskZone &&
        property.fireRiskZone !== args.fireRiskZone
      ) {
        return false;
      }
      if (
        args.city &&
        property.city.toLowerCase() !== args.city.toLowerCase()
      ) {
        return false;
      }
      if (
        args.county &&
        property.county.toLowerCase() !== args.county.toLowerCase()
      ) {
        return false;
      }
      if (
        args.state &&
        property.state.toLowerCase() !== args.state.toLowerCase()
      ) {
        return false;
      }
      if (
        args.isFavorite !== undefined &&
        property.isFavorite !== args.isFavorite
      ) {
        return false;
      }
      if (args.minPrice !== undefined && property.price < args.minPrice) {
        return false;
      }
      if (args.maxPrice !== undefined && property.price > args.maxPrice) {
        return false;
      }
      if (
        args.minAcres !== undefined &&
        property.lotSizeAcres < args.minAcres
      ) {
        return false;
      }
      if (
        args.maxAcres !== undefined &&
        property.lotSizeAcres > args.maxAcres
      ) {
        return false;
      }
      return true;
    });

    const sortBy = args.sortBy ?? "updatedAt";
    const sortDir = args.sortDir ?? "desc";
    const direction = sortDir === "asc" ? 1 : -1;

    filtered.sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return aVal.localeCompare(bVal) * direction;
      }
      if (typeof aVal === "number" && typeof bVal === "number") {
        return (aVal - bVal) * direction;
      }
      return 0;
    });

    return filtered;
  },
});

export const get = query({
  args: { id: v.id("properties") },
  returns: v.union(
    v.object({
      property: v.any(),
      documents: v.array(v.any()),
    }),
    v.null(),
  ),
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx);
    const property = await ctx.db.get(args.id);
    if (!property || property.userId !== userId) {
      return null;
    }
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_property", (q) => q.eq("propertyId", args.id))
      .collect();
    return { property, documents };
  },
});

export const getMany = query({
  args: { ids: v.array(v.id("properties")) },
  returns: v.array(v.any()),
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx);
    const results: Doc<"properties">[] = [];
    for (const id of args.ids.slice(0, 4)) {
      const property = await ctx.db.get(id);
      if (property && property.userId === userId) {
        results.push(property);
      }
    }
    return results;
  },
});

export const create = mutation({
  args: propertyFieldsValidator,
  returns: v.id("properties"),
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx);
    const now = Date.now();
    const pricePerAcre = computePricePerAcre(args.price, args.lotSizeAcres);
    return await ctx.db.insert("properties", {
      ...args,
      userId,
      pricePerAcre,
      photos: [],
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("properties"),
    ...propertyFieldsValidator,
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx);
    const existing = await ctx.db.get(args.id);
    if (!existing || existing.userId !== userId) {
      throw new Error("Property not found");
    }
    const { id, ...fields } = args;
    const pricePerAcre = computePricePerAcre(fields.price, fields.lotSizeAcres);
    await ctx.db.patch(id, {
      ...fields,
      pricePerAcre,
      photos: existing.photos,
      updatedAt: Date.now(),
    });
    return null;
  },
});

export const toggleFavorite = mutation({
  args: { id: v.id("properties") },
  returns: v.boolean(),
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx);
    const property = await ctx.db.get(args.id);
    if (!property || property.userId !== userId) {
      throw new Error("Property not found");
    }
    const next = !property.isFavorite;
    await ctx.db.patch(args.id, {
      isFavorite: next,
      updatedAt: Date.now(),
    });
    return next;
  },
});

export const remove = mutation({
  args: { id: v.id("properties") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx);
    const property = await ctx.db.get(args.id);
    if (!property || property.userId !== userId) {
      throw new Error("Property not found");
    }

    for (const photoId of property.photos) {
      await ctx.storage.delete(photoId);
    }

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_property", (q) => q.eq("propertyId", args.id))
      .collect();

    for (const doc of documents) {
      await ctx.storage.delete(doc.storageId);
      await ctx.db.delete(doc._id);
    }

    await ctx.db.delete(args.id);
    return null;
  },
});

export const listForMap = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("properties"),
      city: v.string(),
      state: v.string(),
      price: v.number(),
      status: propertyStatusValidator,
      latitude: v.number(),
      longitude: v.number(),
      lotSizeAcres: v.number(),
      address: v.optional(v.string()),
    }),
  ),
  handler: async (ctx) => {
    const userId = await requireUserId(ctx);
    const properties = await ctx.db
      .query("properties")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
    return properties
      .filter(
        (p) =>
          Number.isFinite(p.latitude) &&
          Number.isFinite(p.longitude) &&
          !(p.latitude === 0 && p.longitude === 0),
      )
      .map((p) => ({
        _id: p._id,
        city: p.city,
        state: p.state,
        price: p.price,
        status: p.status,
        latitude: p.latitude,
        longitude: p.longitude,
        lotSizeAcres: p.lotSizeAcres,
        address: p.address,
      }));
  },
});

export type PropertyId = Id<"properties">;
