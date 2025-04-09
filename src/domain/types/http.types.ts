type HttpMethod = 'get' | 'post' | 'put' | 'delete';

export type CustomHttpRequest<T = unknown> = {
  url: string;
  method: HttpMethod;
  body?: T;
  headers?: Record<string, string>;
}

export type CustomHttpResponse<T = unknown> = {
  statusCode: number;
  body: T;
};
