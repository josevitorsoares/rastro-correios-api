import { CustomHttpRequest, CustomHttpResponse } from '../types/http.types';

export interface IHttpClientService {
  request<T = unknown>(
    data: CustomHttpRequest,
  ): Promise<CustomHttpResponse<T>>;
}
