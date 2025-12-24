import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query to get all documents for a user
export const getUserDocuments = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("documents")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

// Query to get documents by file type
export const getDocumentsByType = query({
  args: {
    userId: v.id("users"),
    fileType: v.string(),
  },
  handler: async (ctx, args) => {
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();

    return documents.filter((doc) => doc.fileType === args.fileType);
  },
});

// Query to get a specific document
export const getDocument = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.documentId);
  },
});

// Mutation to upload a document
export const uploadDocument = mutation({
  args: {
    userId: v.id("users"),
    storageId: v.string(),
    fileName: v.string(),
    fileType: v.string(),
  },
  handler: async (ctx, args) => {
    const documentId = await ctx.db.insert("documents", {
      userId: args.userId,
      storageId: args.storageId,
      fileName: args.fileName,
      fileType: args.fileType,
      uploadedAt: Date.now(),
    });

    return documentId;
  },
});

// Mutation to delete a document
export const deleteDocument = mutation({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const document = await ctx.db.get(args.documentId);
    if (!document) {
      throw new Error("Document not found");
    }

    // Delete the document record
    await ctx.db.delete(args.documentId);

    // Note: You'll need to handle storage deletion separately using ctx.storage.delete(storageId)
    // This is typically done in a separate mutation or action

    return { success: true };
  },
});

// Mutation to generate upload URL for file storage
export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// Query to get file URL from storage
export const getFileUrl = query({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

// Query to count documents by type for a user
export const countDocumentsByType = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();

    const counts: Record<string, number> = {};
    documents.forEach((doc) => {
      counts[doc.fileType] = (counts[doc.fileType] || 0) + 1;
    });

    return counts;
  },
});
