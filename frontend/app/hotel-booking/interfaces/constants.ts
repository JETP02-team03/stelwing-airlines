// interfaces/constants.ts

/**
 * 飯店卡片數據介面 (用於列表頁和地圖顯示)。
 * 備註：amenities 字段使用布林值物件的形式。
 */
export interface HotelCardData {
  id: number;
  name: string;
  engName?: string;
  rating: number;
  location: string;
  distance?: string;
  price: number;
  image?: string;

  // 🔽 地圖座標欄位
  lat?: number;
  lng?: number;

  // 搜尋頁額外欄位
  address?: string;
  roomType?: string;
  notes?: string;
  busFree?: boolean;
  amenities?: {
    wifi?: boolean;
    parking?: boolean;
    cafe?: boolean;
    restaurant?: boolean;
    frontDesk24h?: boolean;
    luggageStorage?: boolean;
    shuttleService?: boolean;
  };
}

// 價格常量
export const MIN_PRICE = 3000;
export const MAX_PRICE = 30000;
export const PRICE_STEP = 1000;

// 設施鍵名類型
export type AmenityKey =
  | 'wifi'
  | 'parking'
  | 'cafe'
  | 'restaurant'
  | 'frontDesk24h'
  | 'luggageStorage'
  | 'shuttleService';

// 設施標籤
export const amenityLabels: Record<AmenityKey, string> = {
  wifi: 'WiFi',
  parking: '停車場',
  cafe: '咖啡廳',
  restaurant: '餐廳',
  frontDesk24h: '24小時前台',
  luggageStorage: '行李寄存',
  shuttleService: '接駁服務',
};
