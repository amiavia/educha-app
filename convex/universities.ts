import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query to get all universities
export const getAllUniversities = query({
  handler: async (ctx) => {
    return await ctx.db.query("universities").collect();
  },
});

// Query to get universities by ranking
export const getUniversitiesByRanking = query({
  args: {
    minRanking: v.optional(v.number()),
    maxRanking: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let universities = await ctx.db.query("universities").collect();

    if (args.minRanking !== undefined) {
      universities = universities.filter(
        (u) => u.ranking && u.ranking >= args.minRanking!
      );
    }

    if (args.maxRanking !== undefined) {
      universities = universities.filter(
        (u) => u.ranking && u.ranking <= args.maxRanking!
      );
    }

    return universities.sort((a, b) => {
      if (!a.ranking) return 1;
      if (!b.ranking) return -1;
      return a.ranking - b.ranking;
    });
  },
});

// Query to get university by ID
export const getUniversity = query({
  args: { universityId: v.id("universities") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.universityId);
  },
});

// Query to search universities by name
export const searchUniversitiesByName = query({
  args: { searchTerm: v.string() },
  handler: async (ctx, args) => {
    const universities = await ctx.db.query("universities").collect();
    return universities.filter((u) =>
      u.name.toLowerCase().includes(args.searchTerm.toLowerCase())
    );
  },
});

// Mutation to create a university
export const createUniversity = mutation({
  args: {
    name: v.string(),
    location: v.string(),
    ranking: v.optional(v.number()),
    logo: v.optional(v.string()),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("universities", args);
  },
});

// Query to get programs by university
export const getProgramsByUniversity = query({
  args: { universityId: v.id("universities") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("programs")
      .withIndex("by_universityId", (q) => q.eq("universityId", args.universityId))
      .collect();
  },
});

// Query to get all programs
export const getAllPrograms = query({
  handler: async (ctx) => {
    return await ctx.db.query("programs").collect();
  },
});

// Query to get programs by level
export const getProgramsByLevel = query({
  args: { level: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("programs")
      .withIndex("by_level", (q) => q.eq("level", args.level))
      .collect();
  },
});

// Query to get program by ID
export const getProgram = query({
  args: { programId: v.id("programs") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.programId);
  },
});

// Mutation to create a program
export const createProgram = mutation({
  args: {
    universityId: v.id("universities"),
    name: v.string(),
    level: v.string(),
    duration: v.string(),
    fee: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("programs", args);
  },
});

// Query to get program with university details
export const getProgramWithUniversity = query({
  args: { programId: v.id("programs") },
  handler: async (ctx, args) => {
    const program = await ctx.db.get(args.programId);
    if (!program) return null;

    const university = await ctx.db.get(program.universityId);
    return {
      ...program,
      university,
    };
  },
});

// Query to search programs
export const searchPrograms = query({
  args: {
    searchTerm: v.optional(v.string()),
    level: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let programs = await ctx.db.query("programs").collect();

    if (args.level) {
      programs = programs.filter((p) => p.level === args.level);
    }

    if (args.searchTerm) {
      programs = programs.filter((p) =>
        p.name.toLowerCase().includes(args.searchTerm!.toLowerCase())
      );
    }

    return programs;
  },
});
