'use client';

import {
  BusFront,
  Car,
  Clock,
  Coffee,
  Heart,
  Luggage,
  MapPin,
  Star,
  User,
  Utensils,
  Wifi,
} from 'lucide-react';
import * as React from 'react';
import { HotelDetailData } from '../interfaces/HotelDetailData';
import { AmenityKey } from '../interfaces/constants';

interface HotelDetailContentProps {
  hotel: HotelDetailData;
  formData: {
    name: string;
    phone: string;
    email: string;
    roomType: string;
    smokingPreference: string;
    nights: number;
    guests: number;
    rooms: number;
    price?: number; // 可以選擇性更新房型價格
  };
  errors: Record<string, string>;
  onInputChange: (field: string, value: any) => void;
}

// 設施圖標映射（固定大小、不可點擊）
const amenityIcons: Record<AmenityKey, React.ReactNode> = {
  wifi: <Wifi size={16} className="text-gray-600" />,
  parking: <Car size={16} className="text-gray-600" />,
  cafe: <Coffee size={16} className="text-gray-600" />,
  restaurant: <Utensils size={16} className="text-gray-600" />,
  frontDesk24h: <Clock size={16} className="text-gray-600" />,
  luggageStorage: <Luggage size={16} className="text-gray-600" />,
  shuttleService: <BusFront size={16} className="text-gray-600" />,
};

export default function HotelDetailContent({
  hotel,
  formData,
  errors,
  onInputChange,
}: HotelDetailContentProps) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    const starColor = 'text-yellow-500';

    return (
      <div className="flex items-center space-x-0.5">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            className={starColor}
            size={18}
            fill="currentColor"
          />
        ))}
        {hasHalfStar && (
          <Star
            key="half"
            className={starColor}
            size={18}
            fill="url(#halfGradient)"
          />
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} className="text-gray-300" size={18} />
        ))}
      </div>
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % hotel.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + hotel.images.length) % hotel.images.length
    );
  };

  return (
    <div className="flex-1 lg:pr-8">
      {/* 標題與收藏 */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            {hotel.name}
          </h1>
          <p className="text-xl font-medium text-gray-500 mb-4">
            {hotel.engName}
          </p>
        </div>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
          aria-label="加入願望清單"
        >
          <Heart
            size={28}
            className={
              isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'
            }
          />
        </button>
      </div>

      {/* 評分與位置 */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center space-x-2">
          {renderRating(hotel.rating)}
          <span className="text-lg font-semibold text-gray-700">
            {hotel.rating.toFixed(1)} ({hotel.reviewCount} 則評論)
          </span>
        </div>
        <div className="flex items-center space-x-1 text-gray-600">
          <MapPin size={18} />
          <span className="text-md">{hotel.location}</span>
        </div>
      </div>

      {/* 圖片輪播 */}
      <div className="mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 rounded-lg overflow-hidden">
          {hotel.images.slice(0, 4).map((img, index) => (
            <div
              key={index}
              onClick={() => {
                setCurrentImageIndex(index);
                setIsGalleryOpen(true);
              }}
              className={`relative overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.03] ${
                index === 0 ? 'col-span-2 row-span-2 h-80 md:h-96' : 'h-40'
              }`}
            >
              <img
                src={img}
                alt={`${hotel.name} 圖片 ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src =
                    'https://placehold.co/600x400/CCCCCC/333333?text=Image+Not+Found';
                }}
              />
              {index === 3 && hotel.images.length > 4 && (
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white font-bold text-xl transition">
                  + {hotel.images.length - 4} 張
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 登記者資料 & 特殊需求 */}
      <div className="space-y-8">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4 flex items-center gap-2">
            <User size={24} />
            主要登記者資料
          </h3>
          <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
            {/* 姓名 */}
            <div>
              <label className="text-sm font-medium block mb-1" htmlFor="name">
                姓名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                placeholder="請輸入姓名"
                value={formData.name}
                onChange={(e) => onInputChange('name', e.target.value)}
                className={`w-full p-3 border rounded-md bg-white focus:border-[#DCBB87] focus:ring-1 focus:ring-[#DCBB87] transition ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* 電話 */}
            <div>
              <label className="text-sm font-medium block mb-1" htmlFor="phone">
                連絡電話 <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="09xxxxxxxx"
                value={formData.phone}
                onChange={(e) => onInputChange('phone', e.target.value)}
                className={`w-full p-3 border rounded-md bg-white focus:border-[#DCBB87] focus:ring-1 focus:ring-[#DCBB87] transition ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium block mb-1" htmlFor="email">
                電子郵件 <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={(e) => onInputChange('email', e.target.value)}
                className={`w-full p-3 border rounded-md bg-white focus:border-[#DCBB87] focus:ring-1 focus:ring-[#DCBB87] transition ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>
        </div>

        {/* 房型 / 晚數 / 人數 / 房間數 / 吸菸需求 */}
        <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
          {/* 房型需求 */}
          <div>
            <label className="text-sm font-medium block mb-2">床型需求</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onInputChange('roomType', 'King Size Bed')}
                className={`flex-1 py-2 px-3 rounded-md border text-sm transition ${
                  formData.roomType === 'King Size Bed'
                    ? 'bg-[#DCBB87] text-[#303D49] border-[#DCBB87] font-semibold'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-[#DCBB87]'
                }`}
              >
                大床房
              </button>
              <button
                type="button"
                onClick={() => onInputChange('roomType', 'Twin Beds')}
                className={`flex-1 py-2 px-3 rounded-md border text-sm transition ${
                  formData.roomType === 'Twin Beds'
                    ? 'bg-[#DCBB87] text-[#303D49] border-[#DCBB87] font-semibold'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-[#DCBB87]'
                }`}
              >
                雙床房
              </button>
            </div>
          </div>

          {/* 吸菸需求 */}
          <div>
            <label className="text-sm font-medium block mb-2">吸菸需求</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onInputChange('smokingPreference', '禁菸房')}
                className={`flex-1 py-2 px-3 rounded-md border text-sm transition ${
                  formData.smokingPreference === '禁菸房'
                    ? 'bg-[#DCBB87] text-[#303D49] border-[#DCBB87] font-semibold'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-[#DCBB87]'
                }`}
              >
                禁菸房
              </button>
              <button
                type="button"
                onClick={() => onInputChange('smokingPreference', '吸菸房')}
                className={`flex-1 py-2 px-3 rounded-md border text-sm transition ${
                  formData.smokingPreference === '吸菸房'
                    ? 'bg-[#DCBB87] text-[#303D49] border-[#DCBB87] font-semibold'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-[#DCBB87]'
                }`}
              >
                吸菸房
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 半星漸變 */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="halfGradient">
            <stop offset="50%" stopColor="#DCBB87" />
            <stop offset="50%" stopColor="#d1d5db" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
