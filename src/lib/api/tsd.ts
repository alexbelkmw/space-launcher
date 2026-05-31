import z from "zod";
import { request } from "./";
import { LaunchResponseSchema } from "../schemas/launches";
import { requireEnv } from "../utils/env";

const BASE_URL = requireEnv("SPACE_DEVS_URL");

async function tsdRequest<T extends z.ZodTypeAny>(
  endpoint: string,
  params: Record<string, string>,
  schema: T,
) {
  return await request({
    baseUrl: BASE_URL,
    endpoint,
    params,
    schema,
  });
}

export interface LaunchesParameters {
  mode: "list" | "normal" | "detailed";
  filters: Record<string, string>;
  ordering: "id" | "last_updated" | "name" | "net";
  limit: string;
}

export const getLaunches = (data: Partial<LaunchesParameters>) => {
  return tsdRequest(
    "launches",
    {
      mode: data.mode ?? "list",
      ordering: data.ordering ?? "-last_updated",
      limit: data.limit ?? "10",
      ...data.filters,
    },
    LaunchResponseSchema,
  );
};
