import { z } from "zod";

interface requestOptions<T extends z.ZodTypeAny> {
  baseUrl: string;
  endpoint: string;
  method?: string;
  data?: object;
  headers?: Record<string, string>;
  params?: Record<string, string>;
  schema: T;
}

export async function request<T extends z.ZodTypeAny>({
  baseUrl,
  endpoint,
  data,
  params = {},
  headers,
  method = "GET",
  schema,
}: requestOptions<T>): Promise<z.infer<T>> {
  try {
    const url = new URL(baseUrl + endpoint);
    url.search = new URLSearchParams(params).toString();

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", ...headers },
      body: method === "GET" ? undefined : JSON.stringify(data),
    });

    if (!response.ok) throw new Error(`Error status: ${response.status}`);

    const result = await response.json();

    const validResponse = schema.safeParse(result);

    if (validResponse.success) return validResponse.data;

    throw new Error(validResponse.error.message);
  } catch (error) {
    console.error("Fetch error:", error);

    throw error;
  }
}
