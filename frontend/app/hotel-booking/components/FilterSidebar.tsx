// components/FilterSidebar.tsx
'use client';

import { Car, Coffee, Star, Wifi, X } from 'lucide-react';
import { useState } from 'react';

interface FilterSidebarProps {
  onFilter: (filters: any) => void;
  isMobileOpen: boolean;
  onClose: () => void;
}

export default function FilterSidebar({
  onFilter,
  isMobileOpen,
  onClose,
}: FilterSidebarProps) {
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [amenities, setAmenities] = useState<string[]>([]);

  const ratings = [4.5, 4, 3.5, 3];
  const amenityList = [
    { key: 'wifi', label: 'WiFi', icon: <Wifi size={16} /> },
    { key: 'parking', label: '停車場', icon: <Car size={16} /> },
    { key: 'cafe', label: '咖啡廳', icon: <Coffee size={16} /> },
  ];

  const applyFilters = () => {
    onFilter({
      priceMin: priceRange[0],
      priceMax: priceRange[1],
      rating: selectedRating,
      amenities,
    });
  };

  return (
    <>
      {/* 手機版遮罩 */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* 側邊欄 */}
      <div
        className={`fixed lg:static inset-y-0 left-0 w-80 bg-white rounded-2xl shadow-lg p-6 space-y-6 z-50 transform transition-transform lg:transform-none ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">篩選條件</h3>
          <button onClick={onClose} className="lg:hidden">
            <X size={24} />
          </button>
        </div>

        {/* 價格 */}
        <div>
          <h4 className="font-semibold mb-2">價格範圍</h4>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>¥ {priceRange[0].toLocaleString()}</span>
            <span>¥ {priceRange[1].toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="0"
            max="50000"
            step="1000"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
            className="w-full"
          />
        </div>

        {/* 星級 */}
        <div>
          <h4 className="font-semibold mb-2">最低評分</h4>
          <div className="space-y-2">
            {ratings.map((r) => (
              <label key={r} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  checked={selectedRating === r}
                  onChange={() => setSelectedRating(r)}
                  className="w-4 h-4"
                />
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.floor(r) ? '#D4AF37' : 'none'}
                      color="#D4AF37"
                    />
                  ))}
                  <span className="text-sm">{r} 星以上</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* 設施 */}
        <div>
          <h4 className="font-semibold mb-2">設施</h4>
          <div className="space-y-2">
            {amenityList.map(({ key, label, icon }) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={amenities.includes(key)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setAmenities([...amenities, key]);
                    } else {
                      setAmenities(amenities.filter((a) => a !== key));
                    }
                  }}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm flex items-center gap-1">
                  {icon} {label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={applyFilters}
          className="w-full bg-[#D4A574] hover:bg-[#C69563] text-white font-bold py-2 rounded-lg"
        >
          套用篩選
        </button>
      </div>
    </>
  );
}
