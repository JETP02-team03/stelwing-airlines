// components/FilterSidebar.tsx
'use client';

import { Car, Coffee, Star, Wifi, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FilterSidebarProps {
  onFilter: (filters: {
    priceMin?: number;
    priceMax?: number;
    rating?: number;
    amenities?: string[];
  }) => void;
  isMobileOpen: boolean;
  onClose: () => void;
}

export default function FilterSidebar({
  onFilter,
  isMobileOpen,
  onClose,
}: FilterSidebarProps) {
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(50000);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [amenities, setAmenities] = useState<string[]>([]);

  const ratings = [4.5, 4, 3.5, 3];
  const amenityList = [
    { key: 'wifi', label: 'WiFi', icon: <Wifi size={16} /> },
    { key: 'parking', label: '停車場', icon: <Car size={16} /> },
    { key: 'cafe', label: '咖啡廳', icon: <Coffee size={16} /> },
    { key: 'restaurant', label: '餐廳', icon: <Coffee size={16} /> },
    { key: 'shuttleService', label: '接駁車', icon: <Car size={16} /> },
    { key: 'frontDesk24h', label: '24小時櫃台', icon: <Star size={16} /> },
    {
      key: 'luggageStorage',
      label: '行李寄存',
      icon: <div className="w-4 h-4 border rounded" />,
    },
  ];

  // 即時觸發篩選（可選：改為點擊套用）
  useEffect(() => {
    onFilter({
      priceMin: priceMin > 0 ? priceMin : undefined,
      priceMax: priceMax < 50000 ? priceMax : undefined,
      rating: selectedRating !== null ? selectedRating : undefined,
      amenities: amenities.length > 0 ? amenities : undefined,
    });
  }, [priceMin, priceMax, selectedRating, amenities, onFilter]);

  const resetFilters = () => {
    setPriceMin(0);
    setPriceMax(50000);
    setSelectedRating(null);
    setAmenities([]);
  };

  return (
    <>
      {/* 手機遮罩 */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* 側邊欄本體 */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 p-6 space-y-6 z-50
          transform transition-transform duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* 標題列 */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">篩選條件</h3>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* 價格範圍 */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-700">價格範圍</h4>
          <div className="flex justify-between text-sm text-gray-600">
            <span>¥ {priceMin.toLocaleString()}</span>
            <span>¥ {priceMax.toLocaleString()}</span>
          </div>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="50000"
              step="1000"
              value={priceMin}
              onChange={(e) => setPriceMin(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <input
              type="range"
              min="0"
              max="50000"
              step="1000"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
          </div>
        </div>

        {/* 星級評分 */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-700">最低評分</h4>
          <div className="space-y-2">
            {ratings.map((r) => (
              <label key={r} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  checked={selectedRating === r}
                  onChange={() => setSelectedRating(r)}
                  className="w-4 h-4 text-blue-600"
                />
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.floor(r) ? '#FFD700' : 'none'}
                      stroke="#FFD700"
                      className="drop-shadow-sm"
                    />
                  ))}
                  <span className="text-sm text-gray-700">{r} 星以上</span>
                </div>
              </label>
            ))}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={selectedRating === null}
                onChange={() => setSelectedRating(null)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">全部評分</span>
            </label>
          </div>
        </div>

        {/* 設施 */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-700">設施</h4>
          <div className="space-y-2">
            {amenityList.map(({ key, label, icon }) => (
              <label
                key={key}
                className="flex items-center gap-2 cursor-pointer"
              >
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
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm text-gray-700 flex items-center gap-1.5">
                  {icon} {label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* 按鈕群 */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={resetFilters}
            className="flex-1 border border-gray-300 text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-50 transition"
          >
            清除
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-[#D4A574] hover:bg-[#C69563] text-white font-bold py-2 rounded-lg transition"
          >
            套用
          </button>
        </div>
      </div>
    </>
  );
}
