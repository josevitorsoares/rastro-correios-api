import { IHttpClientService } from '@domain/services/http-client.service.interface';
import { axiosInstance } from '@infrastructure/http/axios';
import { AxiosHttpClientService } from '@services/axios-http-client.service';

export const makeAxiosHttpClientService = (): IHttpClientService => {
  const axiosHttpClientService = new AxiosHttpClientService(axiosInstance);

  return axiosHttpClientService;
};
