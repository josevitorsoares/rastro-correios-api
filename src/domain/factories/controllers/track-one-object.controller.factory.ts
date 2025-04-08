import { TrackOneObjectController } from '@controllers/track';
import { makeTrackOneObjectUseCase } from '@factories/usecases/track-one-object.usecase.factory';

export const makeTrackOneObjectController = () => {
  const trackOneObjectUseCase = makeTrackOneObjectUseCase();

  const trackOneObjectController = new TrackOneObjectController(
    trackOneObjectUseCase,
  );

  return trackOneObjectController;
};
