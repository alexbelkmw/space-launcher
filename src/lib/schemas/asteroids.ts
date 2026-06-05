import { z } from "zod";

// Ссылки API (пагинация и self-ссылки
const LinksSchema = z.object({
  next: z.url().optional(),
  previous: z.url().optional(),
  self: z.url(),
});

// Единицы измерения диаметров
const DiameterBoundsSchema = z.object({
  estimated_diameter_min: z.number(),
  estimated_diameter_max: z.number(),
});

// Все метрики для расчетного диаметра
const EstimatedDiameterSchema = z.object({
  kilometers: DiameterBoundsSchema,
  meters: DiameterBoundsSchema,
  miles: DiameterBoundsSchema,
  feet: DiameterBoundsSchema,
});

// Скорость сближения (значения приходят в виде строк)
const RelativeVelocitySchema = z.object({
  kilometers_per_second: z.string(),
  kilometers_per_hour: z.string(),
  miles_per_hour: z.string(),
});

// Дистанция до Земли/планеты (значения приходят в виде строк)
const MissDistanceSchema = z.object({
  astronomical: z.string(),
  lunar: z.string(),
  kilometers: z.string(),
  miles: z.string(),
});

// Данные о сближении объекта с космическим телом
const CloseApproachDataSchema = z.object({
  close_approach_date: z.string(), // Формат YYYY-MM-DD
  close_approach_date_full: z.string(),
  epoch_date_close_approach: z.number().int(),
  relative_velocity: RelativeVelocitySchema,
  miss_distance: MissDistanceSchema,
  orbiting_body: z.string(),
});

// Схема для одного Околоземного Объекта (Asteroid/Neo)
const NearEarthObjectSchema = z.object({
  links: LinksSchema,
  id: z.string(),
  neo_reference_id: z.string(),
  name: z.string(),
  nasa_jpl_url: z.url(),
  absolute_magnitude_h: z.number(),
  estimated_diameter: EstimatedDiameterSchema,
  is_potentially_hazardous_asteroid: z.boolean(),
  close_approach_data: z.array(CloseApproachDataSchema),
  is_sentry_object: z.boolean(),
  sentry_data: z.url().optional(), // Присутствует, если `is_sentry_object: true`
});

// Корневая схема ответа NASA Neo API
export const NasaNeoFeedResponseSchema = z.object({
  links: LinksSchema,
  element_count: z.number().int(),
  // Используем z.record(), так как даты в ключах динамические (например: "2026-05-21")
  near_earth_objects: z.record(z.string(), z.array(NearEarthObjectSchema)),
});

// Автоматический вывод TypeScript типов из схем
export type NasaNeoFeedResponse = z.infer<typeof NasaNeoFeedResponseSchema>;
export type NearEarthObject = z.infer<typeof NearEarthObjectSchema>;
export type CloseApproachData = z.infer<typeof CloseApproachDataSchema>;

// Перевод ответа от Nasa в массив
export const TransformedNasaNeoFeedResponseSchema =
  NasaNeoFeedResponseSchema.transform((data) => {
    return {
      count: data.element_count,
      asteroids: Object.values(data.near_earth_objects).reduce(
        (acc, current) => [...acc, ...current],
      ),
    };
  });

export type AsteroidsResponse = z.infer<
  typeof TransformedNasaNeoFeedResponseSchema
>;
