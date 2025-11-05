// ==================== 飯店資料結構定義 ====================
export interface HotelCardData {
  id: number;
  name: string;
  rating: number;
  location: string;
  distance: string;
  price: number;
  priceUnit?: string;
  currency?: string;
  image?: string;

  // 第二頁列表額外欄位
  address?: string;
  roomType?: string;
  freeCancellation?: boolean;
  amenities?: {
    wifi?: boolean;
    parking?: boolean;
    cafe?: boolean;
    restaurant?: boolean;
    frontDesk24h?: boolean;
    luggageStorage?: boolean;
    shuttleService?: boolean;
  };
  notes?: string;

  // 新增：地圖座標（可選，因為不是每間飯店都有）
  lat?: number;
  lng?: number;
}
