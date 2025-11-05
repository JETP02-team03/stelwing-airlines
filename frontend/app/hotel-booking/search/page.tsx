'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function HotelPage() {
  const [showFilter, setShowFilter] = useState(false);

  const hotels = [
    {
      id: 1,
      name: '東橫INN 成田機場新館',
      location: 'Narita Airport Terminal | Hotel',
      rating: 4.6,
      price: 8000,
      image: '/images/hotel/hotel1.jpeg',
    },
    {
      id: 2,
      name: '成田日航酒店',
      location: 'Narita Airport Terminal | Hotel',
      rating: 4.9,
      price: 8000,
      image: '/images/hotel/hotel2.jpeg',
    },
    {
      id: 3,
      name: 'Solana Smart INN 成田空港',
      location: 'Narita Airport Terminal | Hotel',
      rating: 4.7,
      price: 10000,
      image: '/images/hotel/hotel3.jpeg',
    },
    {
      id: 4,
      name: 'Grand Hotel Narita Airport',
      location: 'Narita Airport Terminal | Hotel',
      rating: 4.7,
      price: 10000,
      image: '/images/hotel/hotel4.jpeg',
    },
  ];

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/hotel/bg1.jpeg')" }}
    >
      <div className="flex flex-col md:flex-row w-full h-full bg-black/40">
        {/* 左側篩選區 */}
        <aside className="w-full md:w-1/4 p-4 md:p-6">
          {/* 手機版篩選按鈕 */}
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="md:hidden flex items-center justify-between w-full bg-white/80 rounded-lg px-4 py-2 font-semibold text-gray-800 shadow"
          >
            <span>篩選條件</span>
            <span>{showFilter ? '▲' : '▼'}</span>
          </button>

          {/* 篩選內容 */}
          <div
            className={`transition-all duration-300 overflow-hidden ${
              showFilter ? 'max-h-[1500px] mt-4' : 'max-h-0 md:max-h-none'
            } md:block`}
          >
            <div className="bg-white/90 rounded-2xl shadow-lg backdrop-blur-md space-y-6 p-4 md:p-6">
              <div>
                <Image
                  src="/images/hotel/map.jpeg"
                  alt="地圖截圖"
                  width={400}
                  height={200}
                  className="rounded-xl mb-4"
                />
                <h2 className="text-lg font-semibold mb-2">價格範圍（每晚）</h2>
                <input
                  type="range"
                  min="3000"
                  max="50000"
                  className="w-full accent-[#DCBB87]"
                />
                <div className="flex justify-between text-sm text-gray-700 mt-1">
                  <span>¥3,000</span>
                  <span>¥50,000</span>
                </div>
              </div>

              <div>
                <h3 className="text-md font-semibold mb-2">最低評分</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    <input type="checkbox" /> 4.5星以上
                  </li>
                  <li>
                    <input type="checkbox" /> 4星以上
                  </li>
                  <li>
                    <input type="checkbox" /> 3.5星以上
                  </li>
                  <li>
                    <input type="checkbox" /> 3星以上
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-md font-semibold mb-2">設施</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    <input type="checkbox" /> WiFi
                  </li>
                  <li>
                    <input type="checkbox" /> 停車場
                  </li>
                  <li>
                    <input type="checkbox" /> 咖啡廳
                  </li>
                  <li>
                    <input type="checkbox" /> 餐廳
                  </li>
                  <li>
                    <input type="checkbox" /> 24小時前台
                  </li>
                  <li>
                    <input type="checkbox" /> 行李寄存
                  </li>
                  <li>
                    <input type="checkbox" /> 機場接送
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>

        {/* 右側飯店卡片區 */}
        <main className="flex-1 p-4 md:p-8 space-y-6 overflow-y-auto">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="flex flex-col md:flex-row bg-white/90 rounded-2xl overflow-hidden shadow-lg backdrop-blur-md hover:shadow-2xl transition-all"
            >
              {/* 飯店圖片 */}
              <div className="relative md:w-1/3">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  width={400}
                  height={260}
                  className="object-cover h-full w-full"
                />
                <div className="absolute top-3 left-3 bg-black/70 text-white text-sm px-2 py-1 rounded-full">
                  ⭐ {hotel.rating}
                </div>
              </div>

              {/* 飯店資訊 */}
              <div className="flex flex-col justify-between p-6 md:w-2/3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {hotel.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">{hotel.location}</p>
                  <p className="text-gray-700 text-sm mb-4">
                    房型：經濟雙床房
                    <br />
                    位於成田機場第二航廈內，交通便利。
                  </p>
                  <div className="flex flex-wrap gap-3 text-gray-600">
                    <Image
                      src="/icons/wifi.svg"
                      alt="WiFi"
                      width={24}
                      height={24}
                    />
                    <Image
                      src="/icons/parking.svg"
                      alt="Parking"
                      width={24}
                      height={24}
                    />
                    <Image
                      src="/icons/coffee.svg"
                      alt="Coffee"
                      width={24}
                      height={24}
                    />
                    <Image
                      src="/icons/restaurant.svg"
                      alt="Restaurant"
                      width={24}
                      height={24}
                    />
                    <Image
                      src="/icons/concierge.svg"
                      alt="Concierge"
                      width={24}
                      height={24}
                    />
                    <Image
                      src="/icons/luggage.svg"
                      alt="Luggage"
                      width={24}
                      height={24}
                    />
                    <Image
                      src="/icons/shuttle.svg"
                      alt="Shuttle"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <div className="text-xl font-bold text-gray-900">
                    ¥{hotel.price.toLocaleString()}
                  </div>
                  <button className="bg-[#DCBB87] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#c9a76e] transition-all">
                    預訂
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* 上一步 / 下一步 */}
          <div className="flex justify-between mt-8 pb-6">
            <button className="bg-black/60 text-white px-6 py-2 rounded-full hover:bg-black transition-all">
              上一步
            </button>
            <button className="bg-black/60 text-white px-6 py-2 rounded-full hover:bg-black transition-all">
              下一步
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
