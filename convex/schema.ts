import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";
import { documentLabelValidator } from "./lib/enums";
import { propertyFieldsValidator } from "./lib/propertyFields";

export default defineSchema({
  ...authTables,

  properties: defineTable({
    userId: v.optional(v.id("users")),
    ...propertyFieldsValidator,
    pricePerAcre: v.optional(v.number()),
    photos: v.array(v.id("_storage")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_isFavorite", ["isFavorite"])
    .index("by_state", ["state"])
    .index("by_city", ["city"])
    .index("by_county", ["county"])
    .index("by_user", ["userId"])
    .index("by_updatedAt", ["updatedAt"]),

  documents: defineTable({
    propertyId: v.id("properties"),
    storageId: v.id("_storage"),
    label: documentLabelValidator,
    fileName: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_property", ["propertyId"]),
});
