export type ShipmentEntity = {
  trackingCode: string;
  initials: string;
  name: string;
  category: string;
  status: string;
  checkpoints: Array<Record<string, string | number | null | object>>;
};
