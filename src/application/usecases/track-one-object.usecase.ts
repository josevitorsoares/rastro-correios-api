import { IScrapingService } from '@domain/services/scraping.interface.service';
import { ITrackOneObjectUseCase } from '@domain/usecases/track-one-object.usecase.interface';
import {
  TrackOneObjectInput,
  TrackOneObjectOutput,
} from '@dtos/track-one-object.dto';

export class TrackOneObjectUseCase implements ITrackOneObjectUseCase {
  constructor(private readonly _scrapingService: IScrapingService) {}
  async execute(
    input: TrackOneObjectInput,
  ): Promise<TrackOneObjectOutput> {
    const { code } = input;

    const tracking = await this._scrapingService.trackOneObject(code);

    return tracking;
  }
}
