import { IHttpClientService } from '@domain/services/http-client.service.interface';
import { ShipmentEntity } from '@entities/shipment.entity';
import { TrackDescriptionEnum } from '@enums/track-description.enum';
import { TrackStatusEnum } from '@enums/track-status.enum';
import { TrackingError } from '@errors/tracking.error';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TrackService } from './track.service';

describe('TrackService', () => {
  let trackService: TrackService;
  let httpClientServiceMock: IHttpClientService;

  const trackingCode = 'AA123456789BR';

  beforeEach(() => {
    httpClientServiceMock = {
      request: vi.fn(),
    };

    trackService = new TrackService(httpClientServiceMock);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should be able return the tracking data correctly', async () => {
    const shipmentMock: ShipmentEntity[] = [
      {
        trackingCode,
        initials: 'QS',
        category: 'ENCOMENDA PAC',
        name: 'ETIQUETA LOGICA PAC',
        status: 'DELIVERED',
        checkpoints: [
          {
            date: '2025-03-18T16:43:20.000Z',
            description: 'Objeto em transferência - por favor aguarde',
            local: {
              localName: 'Agência dos Correios',
              city: 'FORTALEZA',
              state: 'CE',
            },
            destination: {
              localName: 'Unidade de Tratamento',
              city: 'FORTALEZA',
              state: 'CE',
            },
          },
          {
            date: '2025-03-18T16:21:27.000Z',
            description: 'Objeto postado',
            local: {
              localName: 'Agência dos Correios',
              city: 'FORTALEZA',
              state: 'CE',
            },
          },
        ],
      },
    ];

    httpClientServiceMock.request = vi
      .fn()
      .mockResolvedValue({ body: shipmentMock });

    const tracking = await trackService.trackObject(trackingCode);

    expect(httpClientServiceMock.request).toHaveBeenCalledWith({
      method: 'get',
      url: `/tracking?trackingCode=${trackingCode}`,
    });

    expect(tracking.package.code).toBe(trackingCode);
    expect(tracking.package.type).toBe('ENCOMENDA PAC');

    expect(tracking.tracks).toHaveLength(2);

    expect(tracking.tracks[0]).toMatchObject({
      description: TrackDescriptionEnum.OBJECT_POSTED,
      status: TrackStatusEnum.POSTED,
      origin: 'Agência dos Correios FORTALEZA, CE',
      date: '18/03/2025',
      time: '13:21:27',
    });

    expect(tracking.tracks[1]).toMatchObject({
      description: TrackDescriptionEnum.OBJECT_IN_TRANSIT,
      status: TrackStatusEnum.IN_TRANSIT,
      origin: 'Agência dos Correios FORTALEZA, CE',
      destination: 'Unidade de Tratamento FORTALEZA, CE',
      date: '18/03/2025',
      time: '13:43:20',
    });
  });

  it('should not be able to return tracking data', async () => {
    httpClientServiceMock.request = vi.fn().mockResolvedValue({ body: [] });

    try {
      await trackService.trackObject(trackingCode);

      throw new Error(
        "It was expected to launch a TrackingError, but it didn't.",
      );
    } catch (error) {
      expect(error).toBeInstanceOf(TrackingError);

      const trackingError = error as TrackingError;

      expect(trackingError.name).toBe('TrackingError');
      expect(trackingError.trackingCode).toBe(trackingCode);
      expect(trackingError.message).toBe(
        'Ainda não há informações disponíveis sobre esse objeto no sistema dos Correios.',
      );
      expect(trackingError.note).toContain(
        'os dados de rastreio podem ainda não estar disponíveis',
      );
    }
  });
});
