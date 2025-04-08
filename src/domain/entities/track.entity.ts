import { TrackStatusEnum } from '@enums/track-status.enum';

/**
 * Represents an individual object tracking event.
 */
export type TrackEntity = {
  /** Main description of the event (e.g. “Object posted”). */
  description: string;

  /** Status of the event (e.g. “In transit”). */
  status: TrackStatusEnum;

  /** Optional message with additional information about the event. */
  message?: string;

  /** Origin location of the event (e.g. “Treatment Unit in São Paulo, SP”). */
  origin: string;

  /** Optional destination location of the event (e.g. “Treatment Unit in Teresina, PI”). */
  destination?: string;

  /** Date of the event (e.g. “2025-10-01”). */
  date: string;

  /** Time of the event (e.g. “10:00 AM”). */
  time: string;
};
