// components/HotelDetailBookingCard.tsx
'use client';

import { Calendar, Moon, Users } from 'lucide-react';
import { HotelDetailData } from '../interfaces/HotelDetailData'; // 假設路徑

interface HotelDetailBookingCardProps {
  hotel: HotelDetailData;
  formData: {
    checkIn: string;
    checkOut: string;
    nights: number;
    guests: number;
  };
  onInputChange: (field: string, value: any) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function HotelDetailBookingCard({
  hotel,
  formData,
  onInputChange,
  onSubmit,
  isSubmitting,
}: HotelDetailBookingCardProps) {
  return (
    <aside className="lg:w-80 flex-shrink-0">
      <div className="sticky top-10 bg-[#F7F7F7] p-6 rounded-lg shadow-xl border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">立即預訂</h2>

        {/* 價格 */}
        <div className="flex justify-between items-end mb-4 border-b pb-4">
          <span className="text-sm text-gray-600">總金額 (含稅)</span>
          <span className="text-4xl font-extrabold text-[#303D49]">
            ${hotel.price.toLocaleString()}
          </span>
        </div>

        {/* 預訂日期/人數/晚數 */}
        <div className="space-y-4 text-gray-700">
          {/* 入住日期 */}
          <div>
            <label className="text-sm font-medium block mb-1 flex items-center gap-2">
              <Calendar size={16} className="text-gray-500" />
              入住日期
            </label>
            <input
              type="date"
              value={formData.checkIn}
              onChange={(e) => onInputChange('checkIn', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md bg-white focus:border-[#DCBB87] focus:ring-1 focus:ring-[#DCBB87] transition"
            />
          </div>

          {/* 退房日期 */}
          <div>
            <label className="text-sm font-medium block mb-1 flex items-center gap-2">
              <Calendar size={16} className="text-gray-500" />
              退房日期
            </label>
            <input
              type="date"
              value={formData.checkOut}
              onChange={(e) => onInputChange('checkOut', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md bg-white focus:border-[#DCBB87] focus:ring-1 focus:ring-[#DCBB87] transition"
            />
          </div>

          {/* 住宿晚數 */}
          <div>
            <label className="text-sm font-medium block mb-1 flex items-center gap-2">
              <Moon size={16} className="text-gray-500" />
              住宿晚數
            </label>
            <select
              value={formData.nights}
              onChange={(e) =>
                onInputChange('nights', parseInt(e.target.value))
              }
              className="w-full p-2 border border-gray-300 rounded-md bg-white focus:border-[#DCBB87] focus:ring-1 focus:ring-[#DCBB87] transition"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <option key={n} value={n}>
                  {n} 晚
                </option>
              ))}
            </select>
          </div>

          {/* 住宿人數 */}
          <div>
            <label className="text-sm font-medium block mb-1 flex items-center gap-2">
              <Users size={16} className="text-gray-500" />
              住宿人數
            </label>
            <select
              value={formData.guests}
              onChange={(e) =>
                onInputChange('guests', parseInt(e.target.value))
              }
              className="w-full p-2 border border-gray-300 rounded-md bg-white focus:border-[#DCBB87] focus:ring-1 focus:ring-[#DCBB87] transition"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n} 人
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 價格明細 */}
        <div className="mt-6 border-t pt-4 space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>每晚價格</span>
            <span>${(hotel.price / formData.nights).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>住宿晚數</span>
            <span>{formData.nights} 晚</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>服務費</span>
            <span>已含</span>
          </div>
          <div className="flex justify-between font-bold text-lg text-gray-800 border-t pt-2">
            <span>總計</span>
            <span>${hotel.price.toLocaleString()}</span>
          </div>
        </div>

        {/* 主要操作按鈕 */}
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full mt-6 py-3 bg-[#DCBB87] text-[#303D49] font-bold text-lg rounded-md hover:bg-[#C49D67] transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
        >
          {isSubmitting ? '處理中...' : '確認預訂'}
        </button>

        <p className="text-xs text-center text-gray-500 mt-3">
          點擊確認預訂即表示您同意我們的服務條款
        </p>

        {/* 取消政策提示 */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-xs text-gray-700">
          <p className="font-semibold mb-1">✓ 免費取消</p>
          <p>入住前 24 小時可免費取消</p>
        </div>
      </div>
    </aside>
  );
}
