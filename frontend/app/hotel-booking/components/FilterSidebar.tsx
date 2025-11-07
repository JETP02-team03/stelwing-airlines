'use client';

import {
  Car,
  Clock,
  Coffee,
  Package,
  Truck,
  Utensils,
  Wifi,
} from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import {
  AmenityKey,
  MAX_PRICE,
  MIN_PRICE,
  PRICE_STEP,
} from '../interfaces/constants';

interface FilterSidebarProps {
  onFilter: (filters: {
    priceMin: number;
    priceMax: number;
    rating?: number[];
    amenities?: AmenityKey[];
  }) => void;
  isMobileOpen: boolean;
  onClose: () => void;
}

export default function FilterSidebar({
  onFilter,
  isMobileOpen,
  onClose,
}: FilterSidebarProps) {
  const [priceMin, setPriceMin] = useState(MIN_PRICE);
  const [priceMax, setPriceMax] = useState(MAX_PRICE);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [amenities, setAmenities] = useState<AmenityKey[]>([]);

  const ratings = [4.5, 4, 3.5, 3] as const;

  const amenityList: {
    key: AmenityKey;
    label: string;
    icon: React.ReactNode;
  }[] = [
    { key: 'wifi', label: 'WiFi', icon: <Wifi size={16} /> },
    { key: 'parking', label: '停車場', icon: <Car size={16} /> },
    { key: 'cafe', label: '咖啡廳', icon: <Coffee size={16} /> },
    { key: 'restaurant', label: '餐廳', icon: <Utensils size={16} /> },
    { key: 'shuttleService', label: '機場接送', icon: <Truck size={16} /> },
    { key: 'frontDesk24h', label: '24小時前台', icon: <Clock size={16} /> },
    { key: 'luggageStorage', label: '行李寄存', icon: <Package size={16} /> },
  ];

  const toggleRating = (rate: number) => {
    setSelectedRatings((prev) =>
      prev.includes(rate) ? prev.filter((r) => r !== rate) : [...prev, rate]
    );
  };

  const clearAll = () => {
    setPriceMin(MIN_PRICE);
    setPriceMax(MAX_PRICE);
    setSelectedRatings([]);
    setAmenities([]);
  };

  const applyFilters = () => {
    // 🔒 自動修正 min/max 順序
    const min = Math.min(priceMin, priceMax);
    const max = Math.max(priceMin, priceMax);

    onFilter({
      priceMin: min,
      priceMax: max,
      rating: selectedRatings.length > 0 ? selectedRatings : undefined,
      amenities: amenities.length > 0 ? amenities : undefined,
    });
    onClose();
  };

  const minPercent = ((priceMin - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;
  const maxPercent = ((priceMax - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* ⚙️ 外層容器 */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 w-80 space-y-4 z-50 
          transform transition-transform duration-300 ease-in-out overflow-y-auto
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* 🗺️ 地圖 */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 w-full h-40 relative cursor-pointer">
          <Image
            src="/images/hotel/map.jpeg"
            alt="地圖找房"
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 1024px) 100vw, 320px"
          />
          <div className="absolute inset-0 flex justify-center items-center bg-black/30 text-white font-semibold text-lg z-10 rounded-lg">
            地圖找房
          </div>
        </div>

        {/* ⚙️ 篩選內容 */}
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-6 w-full space-y-6">
          {/* 標題與清除 */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800">篩選條件</h3>
            <button
              onClick={clearAll}
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              清除全部
            </button>
          </div>

          {/* 💰 價格滑桿 */}
          <div>
            <h4 className="font-semibold mb-10 text-gray-700">
              價格範圍（每晚）
            </h4>
            <div className="relative h-10 flex items-center">
              <div className="absolute w-full h-5 bg-black rounded-full" />
              <div
                className="absolute h-1 bg-black rounded"
                style={{
                  left: `${Math.min(minPercent, maxPercent)}%`,
                  right: `${100 - Math.max(minPercent, maxPercent)}%`,
                }}
              />
              {/* 🔸 最小值滑桿 */}
              <input
                type="range"
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={PRICE_STEP}
                value={priceMin}
                onChange={(e) => setPriceMin(Number(e.target.value))}
                className="absolute w-full h-6 bg-transparent appearance-none z-20 pointer-events-auto cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                  [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md
                  [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white 
                  [&::-moz-range-thumb]:rounded-lg [&::-moz-range-thumb]:border-0"
              />
              {/* 🔸 最大值滑桿 */}
              <input
                type="range"
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={PRICE_STEP}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="absolute w-full h-6 bg-transparent appearance-none z-10 pointer-events-auto cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                  [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md
                  [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white 
                  [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
              />

              {/* 金額標籤 */}
              <div className="absolute top-0 w-full h-0 pointer-events-none">
                <div
                  className="absolute bg-[#DCBB87] text-white text-xs px-2 py-1 rounded-lg"
                  style={{ left: `${minPercent}%`, bottom: '100%' }}
                >
                  ¥{priceMin.toLocaleString()}
                </div>
                <div
                  className="absolute bg-[#DCBB87] text-white text-xs px-2 py-1 rounded-lg -translate-x-3/3"
                  style={{ left: `${maxPercent}%`, bottom: '100%' }}
                >
                  ¥{priceMax.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* 🌟 評分 */}
          <div>
            <h4 className="font-semibold mb-3  text-gray-700">最低評分</h4>
            <ul className="space-y-1 text-gray-700 text-sm">
              {ratings.map((r) => (
                <li key={r}>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={selectedRatings.includes(r)}
                      onChange={() => toggleRating(r)}
                      className="w-4 h-4 text-[#DCBB87] rounded-lg focus:ring-[#DCBB87]"
                    />
                    {r}星以上
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* 🏨 設施 */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-700">設施</h4>
            <ul className="space-y-1 text-gray-700 text-sm">
              {amenityList.map(({ key, label, icon }) => (
                <li key={key}>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={amenities.includes(key)}
                      onChange={(e) => {
                        setAmenities((prev) =>
                          e.target.checked
                            ? [...prev, key]
                            : prev.filter((a) => a !== key)
                        );
                      }}
                      className="w-4 h-4 text-[#DCBB87] rounded focus:ring-[#DCBB87]"
                    />
                    <span className="flex items-center gap-1">
                      {icon} {label}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 📱 手機版按鈕 */}
        <button
          onClick={applyFilters}
          className="lg:hidden w-full py-3 bg-[#DCBB87] rounded-lg font-semibold text-white hover:bg-[#C49D67] transition"
        >
          套用篩選
        </button>
      </div>
    </>
  );
}
