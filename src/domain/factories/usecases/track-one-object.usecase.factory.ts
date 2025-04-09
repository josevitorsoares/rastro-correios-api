import { ITrackOneObjectUseCase } from '@domain/usecases/track-one-object.usecase.interface';
import { makeTrackService } from '@factories/services';
import { TrackOneObjectUseCase } from '@usecases/track-one-object.usecase';

export const makeTrackOneObjectUseCase = (): ITrackOneObjectUseCase => {
  const trackService = makeTrackService();

  const trackOneObject = new TrackOneObjectUseCase(trackService);

  return trackOneObject;
};
