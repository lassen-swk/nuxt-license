export function useAppFetch<T = unknown>(
  endpoint: string,
  options: any = {}
) {
  const { authCookie } = useUser()
  const config = useRuntimeConfig()

  const headers: Record<string, string> = {
    // Nur auf dem Server: Cookies des eingehenden Requests weiterreichen
    ...(import.meta.server ? useRequestHeaders(['cookie']) : {}),
    ...(options.headers || {}),
  }

  if (authCookie.value) {
    headers.Authorization = `Bearer ${authCookie.value}`
  }

  return $fetch<T>(endpoint, {
    baseURL: config.public.apiBase,
    credentials: 'include', // Client: Cookies auch bei Cross-Origin mitsenden
    ...options,
    headers,
  })
}