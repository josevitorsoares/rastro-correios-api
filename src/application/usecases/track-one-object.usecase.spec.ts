import { ITrackService } from '@domain/services/track.service.interface';
import {
  TrackOneObjectInput,
  TrackOneObjectOutput,
} from '@dtos/track-one-object.dto';
import { TrackStatusEnum } from '@enums/track-status.enum';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TrackOneObjectUseCase } from './track-one-object.usecase';

describe('TrackOneObjectUseCase', () => {
  let trackServiceMock: ITrackService;
  let trackOneObjectUseCase: TrackOneObjectUseCase;

  const trackingCode = 'AA123456789BR';

  const fakeOutput: TrackOneObjectOutput = {
    package: {
      code: trackingCode,
      type: 'ENCOMENDA PAC',
    },
    tracks: [
      {
        description: 'Objeto postado',
        status: TrackStatusEnum.DELIVERED,
        origin: 'Agência dos Correios FORTALEZA, CE',
        date: '18/03/2025',
        time: '13:21:27',
      },
    ],
  };

  beforeEach(() => {
    trackServiceMock = {
      trackObject: vi.fn().mockResolvedValue(fakeOutput),
    };

    trackOneObjectUseCase = new TrackOneObjectUseCase(trackServiceMock);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should be able to return the tracking object one correctly', async () => {
    const input: TrackOneObjectInput = { code: trackingCode };

    const tracking = await trackOneObjectUseCase.execute(input);

    expect(trackServiceMock.trackObject).toHaveBeenCalledWith(trackingCode);
    expect(tracking).toMatchObject(fakeOutput);
  });
});
