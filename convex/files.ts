import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { documentLabelValidator } from "./lib/enums";
import {
  requireOwnedProperty,
  requireUserId,
  touchProperty,
} from "./lib/auth";

export const generateUploadUrl = mutation({
  args: {},
  returns: v.string(),
  handler: async (ctx) => {
    await requireUserId(ctx);
    return await ctx.storage.generateUploadUrl();
  },
});

export const attachPhoto = mutation({
  args: {
    propertyId: v.id("properties"),
    storageId: v.id("_storage"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx);
    const property = await requireOwnedProperty(ctx, args.propertyId, userId);
    await ctx.db.patch(args.propertyId, {
      photos: [...property.photos, args.storageId],
      updatedAt: Date.now(),
    });
    return null;
  },
});

export const removePhoto = mutation({
  args: {
    propertyId: v.id("properties"),
    storageId: v.id("_storage"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx);
    const property = await requireOwnedProperty(ctx, args.propertyId, userId);
    await ctx.storage.delete(args.storageId);
    await ctx.db.patch(args.propertyId, {
      photos: property.photos.filter((id) => id !== args.storageId),
      updatedAt: Date.now(),
    });
    return null;
  },
});

export const attachDocument = mutation({
  args: {
    propertyId: v.id("properties"),
    storageId: v.id("_storage"),
    label: documentLabelValidator,
    fileName: v.optional(v.string()),
  },
  returns: v.id("documents"),
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx);
    await requireOwnedProperty(ctx, args.propertyId, userId);
    const docId = await ctx.db.insert("documents", {
      propertyId: args.propertyId,
      storageId: args.storageId,
      label: args.label,
      fileName: args.fileName,
      createdAt: Date.now(),
    });
    await touchProperty(ctx, args.propertyId);
    return docId;
  },
});

export const removeDocument = mutation({
  args: {
    documentId: v.id("documents"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx);
    const doc = await ctx.db.get(args.documentId);
    if (!doc) {
      throw new Error("Document not found");
    }
    await requireOwnedProperty(ctx, doc.propertyId, userId);
    await ctx.storage.delete(doc.storageId);
    await ctx.db.delete(args.documentId);
    await touchProperty(ctx, doc.propertyId);
    return null;
  },
});

export const getUrls = query({
  args: {
    storageIds: v.array(v.id("_storage")),
  },
  returns: v.array(
    v.object({
      storageId: v.id("_storage"),
      url: v.union(v.string(), v.null()),
    }),
  ),
  handler: async (ctx, args) => {
    await requireUserId(ctx);
    const results = [];
    for (const storageId of args.storageIds) {
      const url = await ctx.storage.getUrl(storageId);
      results.push({ storageId, url });
    }
    return results;
  },
});
