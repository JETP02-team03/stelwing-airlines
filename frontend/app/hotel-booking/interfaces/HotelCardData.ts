export interface HotelCardData {
  id: number;
  name: string;
  engName?: string;
  rating: number;
  location: string;
  distance?: string;
  price: number;
  image?: string;

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
