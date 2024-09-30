export default interface APIRequest {
  url: string;
  method?: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';
  headers?: Record<string, any>;
  body?: {} | FormData;
  abort?: AbortController | null;
}
