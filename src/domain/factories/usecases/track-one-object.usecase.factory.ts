import { ITrackOneObjectUseCase } from '@domain/usecases/track-one-object.usecase.interface';
import { TrackOneObjectUseCase } from '@usecases/track-one-object.usecase';
import { makePuppeteerScrapingService } from '../services';

export const makeTrackOneObjectUseCase = (): ITrackOneObjectUseCase => {
  const scrapingService = makePuppeteerScrapingService();

  const trackOneObject = new TrackOneObjectUseCase(scrapingService);

  return trackOneObject;
};
