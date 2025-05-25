export type Config = {
  method?: "GET" | "POST" | "DELETE"
  tags?: string | string[]
  revalidate?: number | false
  cache?: RequestCache
}

export type ResponseType<T> = {
  ok: boolean
  message: string | string[]
  data: T
}
