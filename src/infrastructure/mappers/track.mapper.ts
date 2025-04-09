import { TrackEntity } from '@entities/track.entity';
import { TrackStatusEnum } from '@enums/track-status.enum';

type ShipmentCheckpoint = {
  date: string;
  description: string;
  local: { city: string; state: string; localName: string };
  destination?: { city: string; state: string; localName: string };
};

export class TrackMapper {
  private _getStatus(description: string): TrackStatusEnum {
    switch (description) {
      case 'Objeto postado':
        return TrackStatusEnum.POSTED;
      case 'Objeto saiu para entrega ao destinatário':
        return TrackStatusEnum.DELIVERY_ROUTE;
      case 'Objeto entregue ao destinatário':
        return TrackStatusEnum.DELIVERED;
      default:
        return TrackStatusEnum.IN_TRANSIT;
    }
  }

  static toDomain(
    input: Record<string, string | number | null | object>,
  ): TrackEntity {
    const { date, description, local, destination } =
      input as ShipmentCheckpoint;

    const { localName, city, state } = local;

    const track: Record<string, string> = {};

    const newDate = new Date(date);

    track.description = description;
    track.status = this.prototype._getStatus(track.description);

    track.origin = `${localName} ${city}, ${state}`;

    if (destination) {
      track.destination = `${destination.localName} ${destination.city}, ${destination.state}`;
    }

    track.date = newDate.toLocaleDateString('pt-BR');
    track.time = newDate.toLocaleTimeString('pt-BR');

    return track as TrackEntity;
  }
}
