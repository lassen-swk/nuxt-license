export function useAppFetch<T = unknown>(
  endpoint: string,
  options: any = {}
) {
  const  { authCookie } = useUser();
  const config = useRuntimeConfig();
  const baseUrl = import.meta.server ? config.apiBase : config.public.apiBase;
  console.log(config.apiBase, config.public.apiBase)

  return $fetch<T>(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: authCookie.value ? `Bearer ${authCookie.value}` : "",
    },
  });
}