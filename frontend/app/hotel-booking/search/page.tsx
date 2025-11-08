'use client';

import { useCallback, useMemo, useState } from 'react';
import { DateRange } from '../components/Calendar';
import FilterSidebar from '../components/FilterSidebar';
import HotelResultCard from '../components/HotelResultCard';
import SearchBar from '../components/SearchBar';
import { AmenityKey, MAX_PRICE, MIN_PRICE } from '../interfaces/constants';

interface Hotel {
  id: number;
  name: string;
  engName?: string;
  location: string;
  rating: number;
  price: number;
  image: string;
  amenities: AmenityKey[];
  busFree?: boolean;
  notes?: string;
  roomType?: string;
}

const hotels: Hotel[] = [
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

export default function HotelPage() {
  const [showFilter, setShowFilter] = useState(false);

  // 所有的篩選狀態都由父層 (HotelPage) 管理
  const [priceMin, setPriceMin] = useState(MIN_PRICE);
  const [priceMax, setPriceMax] = useState(MAX_PRICE);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<AmenityKey[]>([]);

  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    undefined
  );

  // 移除了 handleFilter，篩選條件直接使用 state

  const clearAllFilters = useCallback(() => {
    setPriceMin(MIN_PRICE);
    setPriceMax(MAX_PRICE);
    setSelectedRatings([]);
    setSelectedAmenities([]);
  }, []);

  const filteredHotels = useMemo(() => {
    // 🔒 自動修正 min/max 順序，確保篩選正確
    const min = Math.min(priceMin, priceMax);
    const max = Math.max(priceMin, priceMax);

    return hotels.filter((hotel) => {
      // 1. 價格篩選
      if (hotel.price < min || hotel.price > max) return false;

      // 2. 評分篩選
      if (
        selectedRatings.length > 0 &&
        !selectedRatings.some((r) => hotel.rating >= r)
      )
        return false;

      // 3. 設施篩選 (要求飯店包含所有選定的設施)
      if (
        selectedAmenities.length > 0 &&
        !selectedAmenities.every((a) => hotel.amenities.includes(a))
      )
        return false;

      return true;
    });
  }, [priceMin, priceMax, selectedRatings, selectedAmenities]); // 依賴於所有篩選狀態

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative "
      style={{ backgroundImage: "url('/images/hotel/bg1.jpeg')" }}
    >
      <div className="flex flex-col w-full h-full bg-black/70 min-h-screen p-4 md:p-8">
        <SearchBar
          selectedRange={selectedRange}
          onDateChange={setSelectedRange}
        />

        {/* ⭐ 主要內容區塊：加上最大寬度 max-w-6xl 和水平置中 mx-auto */}
        <div className="flex-1 flex flex-col md:flex-row w-full max-w-6xl mx-auto mt-4 md:mt-6">
          {/* ⭐ 篩選側邊欄包裹層：保留 w-auto */}
          <div className="w-auto flex-shrink-0 h-full">
            <FilterSidebar
              isMobileOpen={showFilter}
              onClose={() => setShowFilter(false)}
              // 傳遞狀態值和更新函式給 FilterSidebar
              priceMin={priceMin}
              onPriceMinChange={setPriceMin}
              priceMax={priceMax}
              onPriceMaxChange={setPriceMax}
              selectedRatings={selectedRatings}
              onSelectedRatingsChange={setSelectedRatings}
              selectedAmenities={selectedAmenities}
              onSelectedAmenitiesChange={setSelectedAmenities}
              onClearAll={clearAllFilters} // 傳遞清除所有篩選的函式
            />
          </div>

          {/* ⭐ 主內容區：確保卡片水平置中，並移除多餘的 space-x-6 */}
          <main className="flex-1 overflow-y-auto space-y-6 px-4 md:px-8 flex flex-col items-center">
            <button
              onClick={() => setShowFilter(true)}
              className="md:hidden mb-4 border rounded-md px-4 py-2 bg-white text-gray-800 font-bold w-full"
            >
              篩選條件
            </button>

            {filteredHotels.length === 0 ? (
              <div className="text-center py-12 text-gray-300">
                <p className="text-lg mb-4">沒有符合條件的飯店</p>
                <button
                  onClick={clearAllFilters} // 使用新的清除函式
                  className="text-[#DCBB87] underline"
                >
                  清除篩選條件
                </button>
              </div>
            ) : (
              filteredHotels.map((hotel) => (
                <HotelResultCard key={hotel.id} hotel={hotel} />
              ))
            )}

            <div className="flex justify-between mt-8 pb-6 w-full max-w-4xl">
              <button className="border border-[#D4A574] text-[#D4A574] px-6 py-2 rounded-full hover:bg-[#D4A574] hover:text-white transition-all font-semibold">
                上一步
              </button>
              <button className="border border-[#D4A574] text-[#D4A574] px-6 py-2 rounded-full hover:bg-[#D4A574] hover:text-white transition-all font-semibold">
                下一步
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
