import {
  TrackOneObjectInput,
  TrackOneObjectOutput,
} from '@dtos/track-one-object.dto';

export interface ITrackOneObjectUseCase {
  execute(input: TrackOneObjectInput): Promise<TrackOneObjectOutput>;
}
