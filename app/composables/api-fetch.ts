export function useApi<T = unknown>(
  endpoint: string,
  options: any = {}
) {
  const  authCookie  = { value: undefined};
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBase;

  return $fetch<T>(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: authCookie.value ? `Bearer ${authCookie.value}` : "",
    },
  });
}