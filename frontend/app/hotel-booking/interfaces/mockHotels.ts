import { AmenityKey } from './constants';

/**
 * 飯店列表頁 (List Page) 專用的資料介面。
 * 備註：此介面的 amenities 使用 AmenityKey 陣列形式，與列表頁的篩選邏輯兼容。
 */
export interface Hotel {
  id: number;
  name: string;
  engName?: string;
  location: string;
  rating: number;
  price: number;
  image: string;
  amenities: AmenityKey[]; // 👈 這裡使用陣列，以匹配列表頁的篩選邏輯
  busFree?: boolean;
  notes?: string;
  roomType?: string;
}

/**
 * 完整的模擬飯店列表數據。
 */
export const allMockHotels: Hotel[] = [
  {
    id: 1,
    name: '東京成田機場旅館',
    engName: 'Toyoko Inn Narita Airport | Hotel',
    location: '第二航廈・機場內',
    rating: 3.4,
    price: 3500,
    image: '/images/hotel/room1.jpeg',
    amenities: [
      'wifi',
      'parking',
      'cafe',
      'restaurant',
      'frontDesk24h',
      'luggageStorage',
    ],
    busFree: true,
    roomType: '經典商務房',
  },
  {
    id: 2,
    name: '成田日航酒店',
    engName: 'Hotel Nikko Narita | Hotel',
    location: '距離機場約 0.3公里',
    rating: 4.9,
    price: 5500,
    image: '/images/hotel/room2.jpeg',
    amenities: [
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
  },
  {
    id: 3,
    name: '普雷米爾飯店',
    engName: 'Premier Narita | Hotel',
    location: '距離機場約 0.2公里',
    rating: 4.7,
    price: 10000,
    image: '/images/hotel/room3.jpeg',
    amenities: [
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
  },
  {
    id: 4,
    name: 'Grand Hotel Narita ',
    engName: 'Grand Hotel Narita |Hotel',
    location: '距離機場約 0.2公里',
    rating: 4.8,
    price: 12000,
    image: '/images/hotel/room4.jpeg',
    amenities: [
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
  },
  {
    id: 5,
    name: '成田東武酒店',
    engName: 'Narita Tobu Hotel |Hotel',
    location: '距離機場約 0.3公里',
    rating: 4.7,
    price: 18000,
    image: '/images/hotel/room5.jpeg',
    amenities: [
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
  },
];
