'use client';

import * as React from 'react';
import Calendar, { DateRange } from './components/Calendar';
import HotelCard from './components/HotelCard';
import SearchBar from './components/SearchBar';
// 🌟 修正導入路徑，確保使用 interfaces/constants.ts 中的 HotelCardData
import { HotelCardData } from './interfaces/constants';

export default function Page() {
  // 數據保持本地定義，並使用 HotelCardData
  const hotels: HotelCardData[] = [
    {
      id: 1,
      name: 'Toyoko Inn Narita Airport',
      location: 'Tokyo, Japan',
      distance: '距離機場約 0.1 公里',
      rating: 4.6,
      price: 3500,
      image: '/images/hotel/room1.jpeg',
    },
    {
      id: 2,
      name: 'Hotel Nikko Narita',
      location: 'Tokyo, Japan',
      distance: '距離機場約 0.3公里',
      rating: 4.9,
      price: 5500,
      image: '/images/hotel/room2.jpeg',
    },
    {
      id: 3,
      name: 'Hotel Mystays Premier Narita',
      location: 'Tokyo, Japan',
      distance: '第二航廈・機場內',
      rating: 4.7,
      price: 10000,
      image: '/images/hotel/room3.jpeg',
    },
    {
      id: 4,
      name: 'Garden Hotel Narita',
      location: 'Tokyo, Japan',
      distance: '距離機場約 0.2公里',
      rating: 4.8,
      price: 1200,
      image: '/images/hotel/room4.jpeg',
    },
    {
      id: 5,
      name: 'Narita Tobu Hotel Airport',
      location: 'Tokyo, Japan',
      distance: '第二航廈・機場內',
      rating: 4.8,
      price: 18000,
      image: '/images/hotel/room5.jpeg',
    },
  ];

  const [selectedRange, setSelectedRange] = React.useState<
    DateRange | undefined
  >(undefined);

  return (
    <div className="min-h-screen bg-[url('/images/hotel/bg1.jpeg')] bg-cover bg-center sm:bg-top bg-no-repeat bg-black/70 bg-blend-darken pb-10">
      {/* 搜尋欄 */}
      <SearchBar
        selectedRange={selectedRange}
        onDateChange={setSelectedRange}
      />

      {/* 日曆區域 */}
      <div className="flex justify-center px-4 mb-10">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
          <Calendar selected={selectedRange} onSelect={setSelectedRange} />
        </div>
      </div>

      {/* 飯店列表 */}
      <div className="bg-white/90 py-[30px] rounded-lg shadow-md mx-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">
            TOP 5 附近優質飯店
          </h2>

          {/* 卡片 Grid，自動欄位 + minmax 寬度 */}
          <div className="[grid-template-columns:repeat(auto-fit,minmax(220px,0fr))] justify-center grid gap-y-5 gap-x-2 py-3 px-2">
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="w-full transition-all duration-300 ease-in-out"
              >
                <HotelCard hotel={hotel} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
