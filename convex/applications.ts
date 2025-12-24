import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query to get all applications for a user
export const getUserApplications = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("applications")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

// Query to get applications by status
export const getApplicationsByStatus = query({
  args: {
    userId: v.id("users"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const applications = await ctx.db
      .query("applications")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();

    return applications.filter((app) => app.status === args.status);
  },
});

// Query to get a specific application
export const getApplication = query({
  args: { applicationId: v.id("applications") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.applicationId);
  },
});

// Query to get application with program and university details
export const getApplicationWithDetails = query({
  args: { applicationId: v.id("applications") },
  handler: async (ctx, args) => {
    const application = await ctx.db.get(args.applicationId);
    if (!application) return null;

    const program = await ctx.db.get(application.programId);
    if (!program) return { ...application, program: null, university: null };

    const university = await ctx.db.get(program.universityId);

    return {
      ...application,
      program,
      university,
    };
  },
});

// Mutation to create an application
export const createApplication = mutation({
  args: {
    userId: v.id("users"),
    programId: v.id("programs"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const applicationId = await ctx.db.insert("applications", {
      userId: args.userId,
      programId: args.programId,
      status: args.status || "draft",
      createdAt: Date.now(),
    });

    return applicationId;
  },
});

// Mutation to update application status
export const updateApplicationStatus = mutation({
  args: {
    applicationId: v.id("applications"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const application = await ctx.db.get(args.applicationId);
    if (!application) {
      throw new Error("Application not found");
    }

    await ctx.db.patch(args.applicationId, {
      status: args.status,
      submittedAt:
        args.status === "submitted" && !application.submittedAt
          ? Date.now()
          : application.submittedAt,
    });

    return args.applicationId;
  },
});

// Mutation to delete an application
export const deleteApplication = mutation({
  args: { applicationId: v.id("applications") },
  handler: async (ctx, args) => {
    const application = await ctx.db.get(args.applicationId);
    if (!application) {
      throw new Error("Application not found");
    }

    await ctx.db.delete(args.applicationId);
    return { success: true };
  },
});

// Query to count applications by status for a user
export const countApplicationsByStatus = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const applications = await ctx.db
      .query("applications")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();

    const counts: Record<string, number> = {};
    applications.forEach((app) => {
      counts[app.status] = (counts[app.status] || 0) + 1;
    });

    return counts;
  },
});

// Query to check if user has already applied to a program
export const hasUserAppliedToProgram = query({
  args: {
    userId: v.id("users"),
    programId: v.id("programs"),
  },
  handler: async (ctx, args) => {
    const applications = await ctx.db
      .query("applications")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();

    return applications.some((app) => app.programId === args.programId);
  },
});

// Query to get user applications with program and university details
export const getUserApplicationsWithDetails = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const applications = await ctx.db
      .query("applications")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();

    const applicationsWithDetails = await Promise.all(
      applications.map(async (app) => {
        const program = await ctx.db.get(app.programId);
        if (!program) return { ...app, program: null, university: null };

        const university = await ctx.db.get(program.universityId);
        return {
          ...app,
          program,
          university,
        };
      })
    );

    return applicationsWithDetails;
  },
});
