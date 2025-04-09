import { PackageEntity } from '@entities/package.entity';
import { TrackEntity } from '@entities/track.entity';

export type TrackOutput = {
  package: PackageEntity;
  tracks: TrackEntity[];
};

export interface ITrackService {
  trackObject(trackingCode: string): Promise<TrackOutput>;
}
