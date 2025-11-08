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
}

export default function HotelResultCard({ hotel }: HotelResultCardProps) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

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

  const handleClick = () => router.push(`/hotel/${hotel.id}`);

  return (
    <div
      onClick={handleClick}
      // ⭐ 修正區：移除 mx-auto (由父層負責置中)，加入 w-full (確保佔滿父層寬度)
      className="flex w-full max-w-4xl items-center px-4 bg-white rounded-lg shadow-md hover:shadow-xl transition cursor-pointer overflow-hidden"
    >
      {/* 左側飯店圖 */}
      <div className="relative w-50 h-40 flex-shrink-0 ">
        {hotel.image ? (
          <Image
            src={hotel.image}
            alt={hotel.name}
            fill
            className="object-cover object-center rounded-lg" // 圖片置中和圓角
            onError={(e) => {
              // fallback 如果 next/image 沒載入成功
              (e.currentTarget as HTMLImageElement).src =
                '/images/hotel/fallback.jpeg';
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
            無圖片
          </div>
        )}
        {/* 星級 */}
        <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded flex items-center gap-1 text-xs text-white">
          <Star size={12} color="#D4AF37" fill="#D4AF37" />{' '}
          {hotel.rating.toFixed(1)}
        </div>
        {/* 右上箭頭按鈕 (已修正為垂直置中) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/hotel/${hotel.id}`);
          }}
          className="absolute top-1/2 right-2 -translate-y-1/2 w-6 h-6 bg-white rounded-full flex justify-center items-center text-gray-800 shadow-md hover:bg-gray-100 transition"
        >
          &gt;
        </button>
      </div>

      {/* 右側文字區 (現在受制於外層 max-w-4xl) */}
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

        {/* 飯店名稱 */}
        <h3 className="text-gray-900 font-semibold text-lg">{hotel.name}</h3>
        {hotel.engName && (
          <p className="text-sm text-gray-600">{hotel.engName}</p>
        )}

        {/* 位置與距離 */}
        <div className="flex items-center text-gray-500 text-xs gap-1 mt-1">
          <MapPin size={12} /> {hotel.location}
          {hotel.distance && <span>・{hotel.distance}</span>}
          {hotel.busFree && (
            <span className="ml-2 px-2 py-0.5 rounded-lg bg-[#DCBB87] text-black font-semibold text-xs">
              免稅
            </span>
          )}
        </div>

        {/* 註解 */}
        {hotel.notes && (
          <p className="text-gray-700 text-sm mt-1">{hotel.notes}</p>
        )}

        {/* 設施圖標 */}
        {hotel.amenities && (
          <div className="flex gap-2 mt-1">
            {hotel.amenities.map(
              (key) =>
                iconsMap[key] && (
                  <div
                    key={key}
                    className="bg-[#F1F1F1] rounded-md p-1 flex items-center justify-center hover:bg-[#E0D7C1] transition-all duration-200"
                    style={{ width: 28, height: 28 }}
                    title={amenityLabels[key]}
                  >
                    {iconsMap[key]}
                  </div>
                )
            )}
          </div>
        )}

        {/* 價格與預訂按鈕 */}
        <div className="flex justify-end items-center gap-3 mt-auto">
          <div className="text-lg font-bold text-gray-900">
            ${hotel.price.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 mb-0.5">/night</div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              alert(`預訂 ${hotel.name}`);
            }}
            className="px-4 py-1 bg-[#1E2A33] text-[#DCBB87] font-semibold rounded-md hover:bg-[#303D49] transition"
          >
            預訂
          </button>
        </div>
      </div>
    </div>
  );
}
