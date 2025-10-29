'use client';

import * as React from 'react';
import Calendar from './components/Calendar';
import HotelCard from './components/HotelCard';
import { HotelCardData } from './interfaces/HotelCardData';

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
      image: '/images/hotel/room2.jpeg',
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
      image: '/images/hotel/room3.jpeg',
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
      image: '/images/hotel/room4.jpeg',
    },
    {
      id: 5,
      name: 'Garden Hotel Narita',
      location: 'Tokyo, Japan',
      distance: '第二航廈・機場內',
      rating: 4.8,
      price: 2500,
      currency: 'NT',
      priceUnit: '每晚',
      image: '/images/hotel/room5.jpeg',
    },
  ];

  // 狀態：儲存選取的日期
  const [selectedRange, setSelectedRange] = React.useState<
    DateRange | undefined
  >(undefined);

  return (
    // 加上 flex flex-col items-center 讓所有子層 (日曆、標題、卡片列表) 都能水平置中
    <div className="min-h-screen bg-gray-100 py-12 flex flex-col items-center">
      {/* 定義日曆顏色變數 */}
      <style>
        {`
          :root {
            --calendar-primary: #A88352;   /* 主要文字顏色 (棕金色) */
            --calendar-selected: #A88352;  /* 選取圓圈背景 (同上) */
            --calendar-muted: #BFA789;     /* 非本月日期 (淺棕色) */
            --calendar-range: rgba(168, 131, 82, 0.15); /* 範圍長條背景 (淺棕色透明) */
            --calendar-past: #cccccc;      /* 過去日期的顏色 (淡灰) */
          }
        `}
      </style>

      {/* 日曆元件 (傳入狀態) */}
      <Calendar selected={selectedRange} onSelect={setSelectedRange} />

      {/* 標題 */}
      <h1 className="text-xl font-bold text-center mt-7 mb-4 text-gray-800">
        Top 5 熱門飯店推薦
      </h1>

      {/* 飯店卡片列表（橫向滾動）*/}
      <div className="flex gap-6 overflow-x-auto px-6 py-4 scrollbar-hide max-w-full">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}
