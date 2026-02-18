import { z } from "zod";

/** Validate URL slugs (lowercase alphanumeric with hyphens) */
export const slugSchema = z
  .string()
  .min(1, "Slug is required")
  .max(200, "Slug too long")
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format");

export const matchSlugSchema = slugSchema;
export const teamSlugSchema = slugSchema;
