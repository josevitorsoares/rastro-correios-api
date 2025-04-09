import { IHttpClientService } from '@domain/services/http-client.service.interface';
import {
  CustomHttpRequest,
  CustomHttpResponse,
} from '@domain/types/http.types';
import { AxiosInstance } from 'axios';

export class AxiosHttpClientService implements IHttpClientService {
  constructor(private readonly _axiosInstance: AxiosInstance) {}

  async request<T = unknown>(
    data: CustomHttpRequest,
  ): Promise<CustomHttpResponse<T>> {
    const response = await this._axiosInstance.request({
      url: data.url,
      method: data.method,
      headers: data.headers,
      data: data.body,
    });

    return {
      statusCode: response.status,
      body: response.data,
    };
  }
}
