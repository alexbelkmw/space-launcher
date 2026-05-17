import { z } from "zod";
import { request } from "./";
import { NasaApodResponseSchema } from "../schemas/apod";
import { NasaNeoFeedResponseSchema } from "../schemas/asteroids";

const BASE_URL = process.env.NASA_URL;
const API_KEY = process.env.NASA_API_KEY;

interface APODParameters {
  date: string;
  start_date: string;
  end_date: string;
  count: string;
}

interface AsteroidsParameters {
  start_date: string;
  end_date: string;
}

async function nasaRequest<T extends z.ZodTypeAny>(
  endpoint: string,
  data: Partial<APODParameters> | Partial<AsteroidsParameters>,
  schema: T,
) {
  if (typeof BASE_URL !== "string") throw new Error("Отсутствует URL NASA");

  if (typeof API_KEY !== "string") throw new Error("Отсутствует API key NASA");

  const params = { api_key: API_KEY, ...data };

  return await request({ baseUrl: BASE_URL, endpoint, params, schema });
}

export const getApod = (data: Partial<APODParameters>) => {
  return nasaRequest("planetary/apod", data, NasaApodResponseSchema);
};

export const getAsteroids = (data: Partial<AsteroidsParameters>) => {
  return nasaRequest("neo/rest/v1/feed", data, NasaNeoFeedResponseSchema);
};
