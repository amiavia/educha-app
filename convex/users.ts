import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query to get user by Clerk ID
export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();
    return user;
  },
});

// Query to get user by email
export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
    return user;
  },
});

// Query to get user by ID
export const getUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});

// Mutation to create or update user
export const createOrUpdateUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    fullName: v.optional(v.string()),
    dateOfBirth: v.optional(v.string()),
    nationality: v.optional(v.string()),
    phone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    const now = Date.now();

    if (existingUser) {
      // Update existing user
      await ctx.db.patch(existingUser._id, {
        email: args.email,
        fullName: args.fullName,
        dateOfBirth: args.dateOfBirth,
        nationality: args.nationality,
        phone: args.phone,
        updatedAt: now,
      });
      return existingUser._id;
    } else {
      // Create new user
      const userId = await ctx.db.insert("users", {
        clerkId: args.clerkId,
        email: args.email,
        fullName: args.fullName,
        dateOfBirth: args.dateOfBirth,
        nationality: args.nationality,
        phone: args.phone,
        profileCompletion: 0,
        createdAt: now,
        updatedAt: now,
      });
      return userId;
    }
  },
});

// Mutation to update user profile
export const updateUserProfile = mutation({
  args: {
    userId: v.id("users"),
    fullName: v.optional(v.string()),
    dateOfBirth: v.optional(v.string()),
    nationality: v.optional(v.string()),
    phone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { userId, ...updates } = args;

    await ctx.db.patch(userId, {
      ...updates,
      updatedAt: Date.now(),
    });

    return userId;
  },
});

// Mutation to update profile completion
export const updateProfileCompletion = mutation({
  args: {
    userId: v.id("users"),
    profileCompletion: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      profileCompletion: args.profileCompletion,
      updatedAt: Date.now(),
    });

    return args.userId;
  },
});

// Query to get profile sections for a user
export const getProfileSections = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("profileSections")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

// Mutation to update user's profile photo
export const updateProfilePhoto = mutation({
  args: {
    userId: v.id("users"),
    profilePhotoId: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      profilePhotoId: args.profilePhotoId,
      updatedAt: Date.now(),
    });

    return args.userId;
  },
});

// Mutation to update profile section
export const updateProfileSection = mutation({
  args: {
    userId: v.id("users"),
    sectionId: v.string(),
    completed: v.boolean(),
    data: v.any(),
  },
  handler: async (ctx, args) => {
    const existingSection = await ctx.db
      .query("profileSections")
      .withIndex("by_userId_sectionId", (q) =>
        q.eq("userId", args.userId).eq("sectionId", args.sectionId)
      )
      .unique();

    const now = Date.now();

    if (existingSection) {
      await ctx.db.patch(existingSection._id, {
        completed: args.completed,
        data: args.data,
        updatedAt: now,
      });
      return existingSection._id;
    } else {
      const sectionId = await ctx.db.insert("profileSections", {
        userId: args.userId,
        sectionId: args.sectionId,
        completed: args.completed,
        data: args.data,
        updatedAt: now,
      });
      return sectionId;
    }
  },
});
