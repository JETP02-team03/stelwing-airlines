/**
 * 飯店卡片資料型別
 */
export interface HotelCardData {
  id: number;
  name: string;
  location: string;
  distance: string;
  rating: number;
  price: number;
  currency: string;
  priceUnit: string;
  image: string;
}
