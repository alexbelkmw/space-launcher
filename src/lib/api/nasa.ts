import { z } from "zod";
import { request } from "./";
import { NasaApodResponseSchema } from "../schemas/apod";
import { TransformedNasaNeoFeedResponseSchema } from "../schemas/asteroids";
import { requireEnv } from "../utils/env";

const BASE_URL = requireEnv("NASA_URL");
const API_KEY = requireEnv("NASA_API_KEY");

async function nasaRequest<T extends z.ZodTypeAny>(
  endpoint: string,
  data: Record<string, string>,
  schema: T,
) {
  const params = { api_key: API_KEY, ...data };

  return await request({ baseUrl: BASE_URL, endpoint, params, schema });
}

export interface APODParameters {
  date: string;
  start_date: string;
  end_date: string;
  count: string;
}

export const getApod = (data: Partial<APODParameters>) => {
  return nasaRequest("planetary/apod", data, NasaApodResponseSchema);
};

interface AsteroidsParameters {
  start_date: string;
  end_date: string;
}

export const getAsteroids = (data: Partial<AsteroidsParameters>) => {
  return nasaRequest(
    "neo/rest/v1/feed",
    data,
    TransformedNasaNeoFeedResponseSchema,
  );
};
