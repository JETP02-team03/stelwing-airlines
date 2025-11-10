'use client';

import * as React from 'react';
// 🌟 導入所需的介面和常量
import { HotelDetailData } from '../interfaces/HotelDetailData'; // 修正路徑
import { AmenityKey, amenityLabels } from '../interfaces/constants'; // 修正路徑
// 導入 Lucide Icons
import {
  Briefcase,
  BusFront,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Coffee,
  Heart,
  Luggage,
  Mail,
  MapPin,
  MapPinned,
  Phone,
  Star,
  User,
  Utensils,
  Wifi,
  X,
} from 'lucide-react';

interface HotelDetailContentProps {
  hotel: HotelDetailData;
  formData: {
    name: string;
    phone: string;
    email: string;
    roomType: string;
    smokingPreference: string;
  };
  errors: Record<string, string>;
  onInputChange: (field: string, value: any) => void;
}

// 設施圖標映射
const amenityIcons: Record<AmenityKey, React.ReactNode> = {
  wifi: <Wifi size={20} />,
  parking: <Car size={20} />,
  cafe: <Coffee size={20} />,
  restaurant: <Utensils size={20} />,
  frontDesk24h: <Clock size={20} />,
  luggageStorage: <Luggage size={20} />,
  shuttleService: <BusFront size={20} />,
};

// --- 組件定義 ---
export default function HotelDetailContent({
  hotel,
  formData,
  errors,
  onInputChange,
}: HotelDetailContentProps) {
  // 🌟 狀態管理
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  // 評分渲染
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

  // 🌟 圖片導航功能
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
      {/* 1. 標題與基本資訊 - 🌟 新增收藏按鈕 */}
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

      {/* 2. 圖片輪播/畫廊 - 🌟 新增點擊開啟燈箱功能 */}
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
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white font-bold text-xl hover:bg-opacity-70 transition">
                  + {hotel.images.length - 4} 張
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 🌟 圖片燈箱 (全螢幕圖片瀏覽) */}
      {isGalleryOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
          <button
            onClick={() => setIsGalleryOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition p-2"
            aria-label="關閉"
          >
            <X size={32} />
          </button>
          <button
            onClick={prevImage}
            className="absolute left-4 text-white hover:text-gray-300 transition p-2"
            aria-label="上一張"
          >
            <ChevronLeft size={48} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 text-white hover:text-gray-300 transition p-2"
            aria-label="下一張"
          >
            <ChevronRight size={48} />
          </button>
          <img
            src={hotel.images[currentImageIndex]}
            alt={`飯店圖片 ${currentImageIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
          <div className="absolute bottom-4 text-white text-lg">
            {currentImageIndex + 1} / {hotel.images.length}
          </div>
        </div>
      )}

      {/* 3. 描述 */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">
          飯店簡介
        </h3>
        <p className="text-gray-600 leading-relaxed">{hotel.description}</p>
      </div>

      {/* 4. 設施列表 - 🌟 新增 hover 效果 */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">
          主要設施
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {hotel.amenityKeys.map((key) => (
            <div
              key={key}
              className="flex items-center space-x-3 text-gray-700 bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-100 transition"
            >
              {amenityIcons[key] || <Briefcase size={20} />}
              <span className="font-medium">{amenityLabels[key]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. 聯絡資訊 - 🌟 改善排版與圖示 */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">
          聯絡資訊
        </h3>
        <div className="text-gray-600 space-y-3">
          <div className="flex items-start space-x-3">
            <MapPinned size={20} className="mt-1 flex-shrink-0 text-gray-500" />
            <div>
              <strong className="text-gray-700">地址：</strong>
              {hotel.address}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone size={20} className="flex-shrink-0 text-gray-500" />
            <div>
              <strong className="text-gray-700">電話：</strong>
              <a
                href={`tel:${hotel.contact}`}
                className="hover:text-[#DCBB87] transition"
              >
                {hotel.contact}
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Mail size={20} className="flex-shrink-0 text-gray-500" />
            <div>
              <strong className="text-gray-700">電子郵件：</strong>
              <a
                href={`mailto:${hotel.email}`}
                className="hover:text-[#DCBB87] transition"
              >
                {hotel.email}
              </a>
            </div>
          </div>
          {hotel.busFree && (
            <div className="flex items-center space-x-3 text-green-600 font-semibold bg-green-50 p-3 rounded-lg">
              <Check size={20} />
              <span>提供免費接駁巴士</span>
            </div>
          )}
        </div>
      </div>

      {/* 🌟 6. 主要登記者資料 (從 BookingCard 移過來) */}
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
              placeholder="09xx-xxx-xxx"
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

          {/* 特殊需求區 */}
          <div className="border-t border-gray-200 pt-4 space-y-4 mt-4">
            <h4 className="font-semibold text-sm text-gray-800">特殊需求</h4>

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
                  🚭 禁菸房
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
                  🚬 吸菸房
                </button>
              </div>
            </div>

            {/* 床型需求 */}
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
                  🛏️ 大床房
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
                  🛏️🛏️ 雙床房
                </button>
              </div>
            </div>

            <p className="text-xs text-gray-500 italic">
              ℹ️ 提醒: 實際房型需以現場安排為主
            </p>
          </div>
        </div>
      </div>

      {/* 定義 SVG 漸變以模擬半星 */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="halfGradient">
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#d1d5db" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
