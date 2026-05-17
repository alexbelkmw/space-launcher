import { z } from "zod";

// Схема для объекта "status"
export const LaunchStatusSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  abbrev: z.string(),
  description: z.string(),
});

// Схема для объекта "license" внутри "image"
export const ImageLicenseSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  priority: z.number().int(),
  link: z.url().nullable(),
});

// Схема для объекта "image"
export const LaunchImageSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  image_url: z.url(),
  thumbnail_url: z.url(),
  credit: z.string(),
  license: ImageLicenseSchema,
  single_use: z.boolean(),
  variants: z.array(z.unknown()),
});

export const NetPrecisionSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  abbrev: z.string(),
  description: z.string(),
});

// Основная схема для объекта Launch
export const LaunchSchema = z.object({
  id: z.uuid(),
  url: z.url(),
  name: z.string(),
  response_mode: z.string(),
  slug: z.string(),
  launch_designator: z.string().nullable(),
  status: LaunchStatusSchema,
  last_updated: z.iso.datetime(),
  net: z.iso.datetime(),
  net_precision: NetPrecisionSchema.nullable(),
  window_start: z.iso.datetime(),
  image: LaunchImageSchema.nullable(),
  infographic: z.string().nullable(),
});

export const LaunchResponseSchema = z.object({
  count: z.number().int(),
  next: z.url(),
  previous: z.url().nullable(),
  results: z.array(LaunchSchema),
});

export type LaunchResponse = z.infer<typeof LaunchResponseSchema>;
export type Launch = z.infer<typeof LaunchSchema>;
