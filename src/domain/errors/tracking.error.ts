export class TrackingError extends Error {
  trackingCode: string;
  note: string;

  constructor(trackingCode: string, message: string, note: string) {
    super(message);

    this.name = 'TrackingError';
    this.trackingCode = trackingCode;
    this.message = message;
    this.note = note;
  }
}
