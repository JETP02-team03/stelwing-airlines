// app/search/page.tsx
'use client';

import HotelResultCard from '@/components/ui/HotelResultCard';
import { Filter, List, Map } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import FilterSidebar from './components/ui/FilterSidebar';
import { HotelCardData } from '/interfaces/HotelCardData';

// 動態載入地圖（避免 SSR 問題）
const MapView = dynamic(() => import('@/components/ui/MapView'), {
  ssr: false,
});

const mockHotels: HotelCardData[] = [
  {
    id: 1,
    name: '東橫INN成田機場新館',
    location: '第二航廈・機場內',
    distance: '距離市中心 0.1 公里',
    rating: 4.6,
    price: 8000,
    image: '/images/hotel/room1.jpeg',
    notes: '位於成田機場第二航廈內的優質飯店，適合轉機旅客。',
    amenities: { wifi: true, cafe: true, frontDesk24h: true },
    lat: 35.7648,
    lng: 140.3855,
  },
  {
    id: 2,
    name: '成田日航酒店',
    location: '第二航廈・機場內',
    distance: '距離機場約 0.3公里',
    rating: 4.9,
    price: 8000,
    image: '/images/hotel/room2.jpeg',
    notes: '五星級飯店，免費接送。',
    amenities: {
      wifi: true,
      parking: true,
      restaurant: true,
      shuttleService: true,
    },
    lat: 35.762,
    lng: 140.388,
  },
  // ... 其他
];

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<any>({});

  // 真篩選
  const filteredHotels = useMemo(() => {
    return mockHotels.filter((hotel) => {
      if (filters.priceMin && hotel.price < filters.priceMin) return false;
      if (filters.priceMax && hotel.price > filters.priceMax) return false;
      if (filters.rating && hotel.rating < filters.rating) return false;
      if (filters.amenities?.length) {
        return filters.amenities.every(
          (a: string) => hotel.amenities?.[a as keyof typeof hotel.amenities]
        );
      }
      return true;
    });
  }, [filters]);

  const handleHotelClick = (hotel: HotelCardData) => {
    const params = new URLSearchParams(searchParams.toString());
    router.push(`/hotel/${hotel.id}?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 標題列 */}
      <div className="bg-white shadow-sm py-4 px-6 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              成田機場住宿 ({filteredHotels.length} 間)
            </h1>
            {searchParams.get('checkin') && (
              <p className="text-sm text-gray-600">
                {new Date(searchParams.get('checkin')!).toLocaleDateString(
                  'zh-TW'
                )}{' '}
                -{' '}
                {new Date(searchParams.get('checkout')!).toLocaleDateString(
                  'zh-TW'
                )}{' '}
                · {searchParams.get('adults')} 人 · {searchParams.get('rooms')}{' '}
                房
              </p>
            )}
          </div>

          <div className="flex gap-2 items-center">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <List size={20} />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-lg transition ${viewMode === 'map' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Map size={20} />
            </button>
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-gray-100 flex items-center gap-1 text-sm"
            >
              <Filter size={18} /> 篩選
            </button>
          </div>
        </div>
      </div>

      {/* 內容區 */}
      <div className="max-w-6xl mx-auto p-6">
        {viewMode === 'list' ? (
          <div className="grid md:grid-cols-4 gap-6">
            {/* 桌面版篩選（固定） */}
            <div className="hidden lg:block md:col-span-1">
              <FilterSidebar
                onFilter={setFilters}
                isMobileOpen={false}
                onClose={() => {}}
              />
            </div>

            {/* 列表 */}
            <div className="md:col-span-3 space-y-4">
              {filteredHotels.map((hotel) => (
                <HotelResultCard
                  key={hotel.id}
                  hotel={hotel}
                  onClick={() => handleHotelClick(hotel)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="h-96 rounded-xl overflow-hidden shadow-lg">
            <MapView hotels={filteredHotels} />
          </div>
        )}
      </div>

      {/* 手機版篩選彈窗（只出現一次！） */}
      <FilterSidebar
        onFilter={setFilters}
        isMobileOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      {/* 分頁 */}
      <div className="flex justify-center gap-4 py-6">
        <button classSearchName="px-6 py-2 border rounded-full hover:bg-gray-50">
          上一頁
        </button>
        <button className="px-6 py-2 border rounded-full hover:bg-gray-50">
          下一頁
        </button>
      </div>
    </div>
  );
}
