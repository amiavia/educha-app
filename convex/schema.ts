import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    fullName: v.optional(v.string()),
    dateOfBirth: v.optional(v.string()),
    nationality: v.optional(v.string()),
    phone: v.optional(v.string()),
    profilePhotoId: v.optional(v.string()),
    profileCompletion: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_email", ["email"]),

  profileSections: defineTable({
    userId: v.id("users"),
    sectionId: v.string(),
    completed: v.boolean(),
    data: v.any(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_sectionId", ["userId", "sectionId"]),

  universities: defineTable({
    name: v.string(),
    location: v.string(),
    ranking: v.optional(v.number()),
    logo: v.optional(v.string()),
    description: v.string(),
  })
    .index("by_name", ["name"])
    .index("by_ranking", ["ranking"]),

  programs: defineTable({
    universityId: v.id("universities"),
    name: v.string(),
    level: v.string(), // "bachelor", "master", "phd"
    duration: v.string(),
    fee: v.string(),
  })
    .index("by_universityId", ["universityId"])
    .index("by_level", ["level"]),

  applications: defineTable({
    userId: v.id("users"),
    programId: v.id("programs"),
    status: v.string(), // "draft", "submitted", "under_review", "accepted", "rejected"
    submittedAt: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_programId", ["programId"])
    .index("by_status", ["status"]),

  documents: defineTable({
    userId: v.id("users"),
    storageId: v.string(),
    fileName: v.string(),
    fileType: v.string(),
    uploadedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_fileType", ["fileType"]),
});
