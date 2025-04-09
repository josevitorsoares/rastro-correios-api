import { ITrackService } from '@domain/services/track.service.interface';
import { ITrackOneObjectUseCase } from '@domain/usecases/track-one-object.usecase.interface';
import {
  TrackOneObjectInput,
  TrackOneObjectOutput,
} from '@dtos/track-one-object.dto';

export class TrackOneObjectUseCase implements ITrackOneObjectUseCase {
  constructor(private readonly _trackService: ITrackService) {}

  async execute(input: TrackOneObjectInput): Promise<TrackOneObjectOutput> {
    const { code } = input;

    const tracking = await this._trackService.trackObject(code);

    return tracking;
  }
}
