export function useAppFetch<T = unknown>(
  endpoint: string,
  options: any = {}
) {
  const  { authCookie } = useUser();
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBase;

  return fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: authCookie.value ? `Bearer ${authCookie.value}` : "",
    },
  });
}