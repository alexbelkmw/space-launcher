import z from "zod";
import { request } from "./";
import { LaunchResponseSchema } from "../schemas/launches";

const BASE_URL = process.env.SPACE_DEVS_URL;

interface LaunchesParameters {
  mode: "list" | "normal" | "detailed";
  filters: Record<string, string>;
  ordering: "id" | "last_updated" | "name" | "net";
  limit: string;
}

async function tsdRequest<T extends z.ZodTypeAny>(
  endpoint: string,
  params: Partial<LaunchesParameters>,
  schema: T,
) {
  if (typeof BASE_URL !== "string")
    throw new Error("Отсутствует URL SPACE DEV");

  return await request({
    baseUrl: BASE_URL,
    endpoint,
    params: {
      mode: params.mode ?? "list",
      ordering: params.ordering ?? "last_updated",
      limit: params.limit ?? "10",
      ...params.filters,
    },
    schema,
  });
}

export const getLaunches = (data: Partial<LaunchesParameters>) => {
  return tsdRequest("launches/", data, LaunchResponseSchema);
};
