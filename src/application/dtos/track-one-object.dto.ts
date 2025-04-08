import { PackageEntity } from '@entities/package.entity';
import { TrackEntity } from '@entities/track.entity';

export type TrackOneObjectInput = {
  code: string;
};

export type TrackOneObjectOutput = {
  package: PackageEntity;
  tracks: TrackEntity[];
};
