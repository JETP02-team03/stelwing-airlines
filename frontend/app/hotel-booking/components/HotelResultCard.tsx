'use client';

import {
  Car,
  Clock,
  Coffee,
  Heart,
  MapPin,
  Package,
  Star,
  Truck,
  Utensils,
  Wifi,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AmenityKey, amenityLabels } from '../interfaces/constants';

interface HotelResultCardProps {
  hotel: {
    id: number;
    name: string;
    engName?: string;
    location: string;
    distance?: string;
    rating: number;
    price: number;
    image?: string;
    amenities?: AmenityKey[];
    busFree?: boolean;
    roomType?: string;
    notes?: string;
  };
  onBookClick: () => void;
  isBooking?: boolean;
}

export default function HotelResultCard({
  hotel,
  onBookClick,
  isBooking = false,
}: HotelResultCardProps) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  // 控制全屏圖片預覽模態框的狀態
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    const favorites: number[] = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );
    setIsFavorite(favorites.includes(hotel.id));
  }, [hotel.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const favorites: number[] = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );
    const updated = isFavorite
      ? favorites.filter((id) => id !== hotel.id)
      : [...favorites, hotel.id];
    localStorage.setItem('favorites', JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  const iconsMap: Record<AmenityKey, React.ReactNode> = {
    wifi: <Wifi size={16} />,
    parking: <Car size={16} />,
    cafe: <Coffee size={16} />,
    restaurant: <Utensils size={16} />,
    frontDesk24h: <Clock size={16} />,
    luggageStorage: <Package size={16} />,
    shuttleService: <Truck size={16} />,
  };

  return (
    <div className="flex w-full max-w-4xl items-center px-4 bg-white rounded shadow-md hover:shadow-xl transition overflow-hidden">
      {/* 左側飯店圖 - 點擊時開啟圖片放大模態框 (已加入阻止冒泡) */}
      <div
        className="relative w-50 h-40 flex-shrink-0 cursor-pointer"
        onClick={(e) => {
          // 接收事件參數 e
          e.stopPropagation(); // 阻止事件冒泡，確保圖片點擊不會觸發路由跳轉
          if (hotel.image) {
            setIsImageModalOpen(true);
          }
        }}
      >
        {hotel.image ? (
          <Image
            src={hotel.image}
            alt={hotel.name}
            fill
            className="object-cover object-center rounded-lg"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                '/images/hotel/fallback.jpeg';
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg">
            無圖片
          </div>
        )}
        <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded-full flex items-center gap-1 text-xs text-white">
          <Star size={12} color="#D4AF37" fill="#D4AF37" />{' '}
          {hotel.rating.toFixed(1)}
        </div>
      </div>

      {/* 右側文字區 */}
      <div className="flex flex-col flex-1 p-3 gap-2 relative">
        {/* 收藏按鈕 */}
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white border border-gray-200 flex justify-center items-center text-gray-400 hover:text-red-500 transition"
        >
          <Heart
            size={16}
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke={isFavorite ? 'none' : undefined}
          />
        </button>

        <h3 className="text-gray-900 font-semibold text-lg">{hotel.name}</h3>
        {hotel.engName && (
          <p className="text-sm text-gray-600">{hotel.engName}</p>
        )}

        <div className="flex items-center text-gray-500 text-xs gap-1 mt-1">
          <MapPin size={12} /> {hotel.location}
          {hotel.distance && <span>・{hotel.distance}</span>}
          {hotel.busFree && (
            <span className="ml-2 px-2 py-0.5 rounded-lg bg-[#DCBB87] text-black font-semibold text-xs">
              免稅
            </span>
          )}
        </div>

        {hotel.notes && (
          <p className="text-gray-700 text-sm mt-1">{hotel.notes}</p>
        )}

        {hotel.amenities && (
          <div className="flex gap-2 mt-1">
            {hotel.amenities.map(
              (key) =>
                iconsMap[key] && (
                  <div
                    key={key}
                    className="bg-[#F1F1F1] rounded-lg p-1 flex items-center justify-center hover:bg-[#E0D7C1] transition-all duration-200"
                    style={{ width: 28, height: 28 }}
                    title={amenityLabels[key]}
                  >
                    {iconsMap[key]}
                  </div>
                )
            )}
          </div>
        )}

        <div className="flex justify-end items-center gap-3 mt-auto">
          <div className="text-lg font-bold text-gray-900">
            ${hotel.price.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 mb-0.5">/night</div>

          {/* 預訂按鈕：點擊時執行 onBookClick (包含您需要的路由跳轉邏輯) */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // 阻止冒泡，確保只觸發預訂邏輯
              onBookClick(); // 執行預訂，通常這裡會包含 router.push(...)
            }}
            disabled={isBooking}
            className={`
              px-4 py-1 font-semibold rounded-lg transition-all duration-300 flex items-center gap-2
              ${
                isBooking
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-[#1E2A33] text-[#DCBB87] hover:bg-[#303D49]'
              }
            `}
          >
            {isBooking ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                處理中
              </>
            ) : (
              '預訂'
            )}
          </button>
        </div>
      </div>

      {/* 🖼️ 圖片預覽模態框 (Modal) */}
      {isImageModalOpen && hotel.image && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex justify-center items-center backdrop-blur-sm"
          onClick={(e) => {
            e.stopPropagation(); // 確保點擊背景不會觸發父級路由
            setIsImageModalOpen(false);
          }}
        >
          <div className="relative max-w-7xl max-h-[90vh] p-4">
            <Image
              src={hotel.image}
              alt={hotel.name + ' - 放大預覽'}
              width={1200}
              height={800}
              className="object-contain w-full h-full rounded-lg"
              onClick={(e) => e.stopPropagation()} // 防止點擊圖片本身關閉模態框
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  '/images/hotel/fallback.jpeg';
              }}
            />
            {/* 關閉按鈕 - 確保點擊 X 不會跳轉 */}
            <button
              className="absolute top-4 right-4 text-white text-3xl p-2 rounded-full bg-black/50 hover:bg-black/80 transition"
              onClick={(e) => {
                e.stopPropagation(); // 💥 阻止點擊 X 後事件冒泡到父級 Link/onClick
                setIsImageModalOpen(false);
              }}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
