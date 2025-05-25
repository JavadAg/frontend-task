import { Config, ResponseType } from "@/types/common.type"

/**
 * Asynchronous function to make a fetch request to a specified endpoint with optional configuration.
 *
 * @param {string} endpoint - The URL to which the request is made
 * @param {Config} [config] - Optional configuration for the request
 * @return {Promise<ResponseType<D>>} A promise that resolves with the response data
 */
export async function query<D>(
  endpoint: string,
  config?: Config
): Promise<ResponseType<D>> {
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      accept: "application/json"
    },
    next: {
      ...(config?.revalidate ? { revalidate: config.revalidate } : {}),
      tags: config?.tags as string[]
    },
    ...(config?.cache ? { cache: config.cache } : {})
  })

  if (!response.ok) {
    console.log("GET RESPONSE", response)

    return {
      ok: false,
      message: "Error Response",
      data: await response.json()
    }
  }

  return {
    ok: true,
    message: "Success",
    data: await response.json()
  }
}
/**
 * Asynchronous function for making a POST request to the specified endpoint with the provided body and optional configuration.
 *
 * @param {string} endpoint - the URL endpoint to send the POST request to
 * @param {T} body - the data to be sent in the body of the POST request
 * @param {Config} [config] - additional configuration options for the request
 * @return {Promise<ResponseType<D>>} a Promise that resolves with the response data of type ResponseType<D>
 */
export async function mutate<D, T>(
  endpoint: string,
  body: T,
  method: "DELETE" | "PUT" | "POST" = "POST"
): Promise<ResponseType<D>> {
  const response = await fetch(endpoint, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: body ? JSON.stringify(body) : undefined
  })

  const data = await response.json()

  if (!response.ok) {
    return {
      ok: response.ok,
      message: data.message,
      data
    }
  }
  return {
    ok: response.ok,
    message: data.message,
    data: data
  }
}
