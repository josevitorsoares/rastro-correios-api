import { PackageEntity } from '@entities/package.entity';
import { TrackEntity } from '@entities/track.entity';

export type TrackingPresenterInput = {
  package: PackageEntity;
  tracks: TrackEntity[];
}

export type TrackingPresenterOutput = {
  code: string;
  type: string;
  tracks: TrackEntity[];
};

export class TrackingPresenter {
  static toJSON(tracking: TrackingPresenterInput): TrackingPresenterOutput {
    return {
      code: tracking.package.code,
      type: tracking.package.type,
      tracks: tracking.tracks,
    };
  }
}
