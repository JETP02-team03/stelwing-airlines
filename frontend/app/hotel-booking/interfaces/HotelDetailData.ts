// 從 constants.ts 引入 AmenityKey
import { AmenityKey } from './constants';

/**
 * 飯店詳情頁 (Detail Page) 專用的資料介面。
 * 備註: 詳情頁的 amenities 使用 AmenityKey[] 陣列。
 */
export interface HotelDetailData {
  // 核心基礎屬性 (從 HotelCardData 沿用)
  id: number;
  name: string;
  engName: string;
  rating: number;
  price: number;
  location: string;
  roomType: string;
  busFree: boolean;

  // 詳情頁新增欄位
  images: string[];
  reviewCount: number;
  description: string;
  address: string;
  contact: string;
  email: string;
  amenityKeys: AmenityKey[];
}

// 模擬單一飯店數據 (保持不變)
export const mockHotelDetailData: HotelDetailData = {
  id: 1,
  name: '東京成田機場旅館',
  engName: 'Toyoko Inn Narita Airport | Hotel',
  location: '第二航廈・機場內',
  rating: 4.8,
  reviewCount: 348,
  price: 8000,
  images: [
    '/images/hotel/detail1.jpeg',
    '/images/hotel/room1.jpeg',
    '/images/hotel/room2.jpeg',
    '/images/hotel/room3.jpeg',
    '/images/hotel/room4.jpeg',
    '/images/hotel/room5.jpeg',
    '/images/hotel/room1.jpeg',
    '/images/hotel/room2.jpeg',
  ],
  amenityKeys: [
    'wifi',
    'parking',
    'cafe',
    'restaurant',
    'frontDesk24h',
    'luggageStorage',
    'shuttleService',
  ],
  busFree: true,
  roomType: '經典商務房',
  description:
    '位於成田機場第二航廈內的靜謐酒店，提供短期休息和過夜住宿。酒店設施齊全，交通便利，是轉機旅客或商務人士的理想選擇。我們承諾提供溫馨舒適的住宿體驗和優質服務。',
  address: '千葉県成田市古込1-1',
  contact: '0900-123-123',
  email: 'toyokoinn@narita.com',
};
