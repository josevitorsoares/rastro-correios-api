import { TrackEntity } from '@entities/track.entity';
import { TrackDescriptionEnum } from '@enums/track-description.enum';
import { TrackStatusEnum } from '@enums/track-status.enum';

type ShipmentCheckpoint = {
  date: string;
  description: TrackDescriptionEnum;
  local: { city: string; state: string; localName: string };
  destination?: { city: string; state: string; localName: string };
};

export class TrackMapper {
  private _getStatus(description: TrackDescriptionEnum): TrackStatusEnum {
    switch (description) {
      case TrackDescriptionEnum.OBJECT_POSTED:
        return TrackStatusEnum.POSTED;

      case TrackDescriptionEnum.OBJECT_DELIVERY_ROUTE:
        return TrackStatusEnum.DELIVERY_ROUTE;

      case TrackDescriptionEnum.OBJECT_DELIVERED:
        return TrackStatusEnum.DELIVERED;

      case TrackDescriptionEnum.OBJECT_IN_TRANSIT:
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
    track.status = this.prototype._getStatus(description);

    track.origin = `${localName} ${city}, ${state}`;

    if (destination) {
      track.destination = `${destination.localName} ${destination.city}, ${destination.state}`;
    }

    track.date = newDate.toLocaleDateString('pt-BR');
    track.time = newDate.toLocaleTimeString('pt-BR');

    return track as TrackEntity;
  }
}
