export const MIN_PRICE = 3000;
export const MAX_PRICE = 30000;
export const PRICE_STEP = 1000;

export type AmenityKey =
  | 'wifi'
  | 'parking'
  | 'cafe'
  | 'restaurant'
  | 'frontDesk24h'
  | 'luggageStorage'
  | 'shuttleService';

export const amenityLabels: Record<AmenityKey, string> = {
  wifi: 'WiFi',
  parking: '停車場',
  cafe: '咖啡廳',
  restaurant: '餐廳',
  frontDesk24h: '24小時前台',
  luggageStorage: '行李寄存',
  shuttleService: '接駁服務',
};
