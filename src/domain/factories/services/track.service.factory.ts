import { ITrackService } from '@domain/services/track.service.interface';
import { TrackService } from '@services/track.service';
import { makeAxiosHttpClientService } from './axios-http-client.service.factory';

export const makeTrackService = (): ITrackService => {
  const axiosHttpClientService = makeAxiosHttpClientService();

  const trackService = new TrackService(axiosHttpClientService);

  return trackService;
};
