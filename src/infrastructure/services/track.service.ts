import { IHttpClientService } from '@domain/services/http-client.service.interface';
import {
  ITrackService,
  TrackOutput,
} from '@domain/services/track.service.interface';
import { ShipmentEntity } from '@entities/shipment.entity';
import { TrackingError } from '@errors/tracking.error';
import { TrackMapper } from '@mappers/track.mapper';

export class TrackService implements ITrackService {
  constructor(private readonly _httpClientService: IHttpClientService) {}

  async trackObject(trackingCode: string): Promise<TrackOutput> {
    const shipment = await this._httpClientService.request<ShipmentEntity[]>({
      method: 'get',
      url: `/tracking?trackingCode=${trackingCode}`,
    });

    if (!shipment.body.length) {
      throw new TrackingError(
        trackingCode,
        'Ainda não há informações disponíveis sobre esse objeto no sistema dos Correios.',
        'Caso o envio tenha sido recente, os dados de rastreio podem ainda não estar disponíveis. \nVerifique se o código está correto e tente novamente em alguns instantes.',
      );
    }

    const tracking: TrackOutput = {
      package: {
        code: trackingCode,
        type: shipment.body[0].category,
      },
      tracks: shipment.body[0].checkpoints
        .reverse()
        .map((checkpoint) => TrackMapper.toDomain(checkpoint)),
    };

    return tracking;
  }
}
