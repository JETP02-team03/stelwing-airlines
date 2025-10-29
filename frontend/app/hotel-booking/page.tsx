'use client';
import HotelCard from './components/HotelCard';
import { HotelCardData } from './interfaces/HotelCardData';

// ==================== 飯店搜尋頁面 (首頁) ====================
// 顯示多張飯店卡片（可橫向滾動）
export default function Page() {
  // 範例飯店資料
  const hotels: HotelCardData[] = [
    {
      id: 1,
      name: 'Toyoko Inn Narita Airport',
      location: 'Tokyo, Japan',
      distance: '距離市中心 2 公里',
      rating: 4.6,
      price: 2000,
      currency: 'NT$',
      priceUnit: '每晚',
      image: '/images/hotel/room1.jpeg',
    },
    {
      id: 2,
      name: 'Hotel Nikko Narita',
      location: 'Tokyo, Japan',
      distance: '距離機場約 0.3公里',
      rating: 4.9,
      price: 4500,
      currency: 'NT',
      priceUnit: '每晚',
      image: '/images/hotel/room3.jpeg',
    },
    {
      id: 3,
      name: 'Hotel Mystays Premier Narita',
      location: 'Tokyo, Japan',
      distance: '距離機場約 0.2公里',
      rating: 4.7,
      price: 3800,
      currency: 'NT',
      priceUnit: '每晚',
      image: '/images/hotel/room2.jpeg',
    },
    {
      id: 4,
      name: 'Garden Hotel Narita',
      location: 'Tokyo, Japan',
      distance: '第二航廈・機場內',
      rating: 4.8,
      price: 2500,
      currency: 'NT',
      priceUnit: '每晚',
      image: '/images/hotel/room5.jpeg',
    },
    {
      id: 5,
      name: 'Narita Tobu Hotel Airport',
      location: 'Tokyo, Japan',
      distance: '距離機場約 0.1公里',
      rating: 4.8,
      price: 3000,
      currency: 'NT',
      priceUnit: '每晚',
      image: '/images/hotel/room4.jpeg',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      {/* 標題 */}
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Top 5 熱門飯店推薦
      </h1>

      {/* 飯店卡片列表（橫向滾動） */}
      <div className="flex gap-6 overflow-x-auto px-6 scrollbar-hide">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}
