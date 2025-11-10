'use client';

// 🌟 導入 Link 組件以替換 <a> 標籤
import Link from 'next/link';
import { notFound } from 'next/navigation';
// 🌟 導入 React 的 use Hook (解決 Next.js 15+ 參數警告)
import * as React from 'react';

// 請根據您的實際結構調整導入路徑
import HotelDetailBookingCard from '../components/HotelDetailBookingCard';
import HotelDetailContent from '../components/HotelDetailContent';
import {
  HotelDetailData,
  mockHotelDetailData,
} from '../interfaces/HotelDetailData';

interface HotelDetailPageProps {
  params: Promise<{ id: string }> | { id: string };
}

/**
 * 模擬從 ID 獲取飯店數據的函式。
 * 實際應用中,您會在這裡發起 API 請求。
 */
const fetchHotelData = (id: string): HotelDetailData | null => {
  // 臨時修正:允許任何非空 ID 返回模擬數據
  if (id) {
    return mockHotelDetailData;
  }
  return null;
};

export default function HotelDetailPage({ params }: HotelDetailPageProps) {
  // 🌟 修正 Next.js 15+ 參數警告:使用 React.use() 解包 params
  const unwrappedParams =
    params instanceof Promise
      ? (React.use(params) as { id: string })
      : (params as { id: string });

  const hotel = fetchHotelData(unwrappedParams.id);

  // 🌟 統一狀態管理
  const [formData, setFormData] = React.useState({
    checkIn: '2025/12/24',
    checkOut: '2025/12/27',
    nights: 3,
    guests: 2,
    name: '',
    phone: '',
    email: '',
    roomType: 'King Size Bed',
    smokingPreference: '禁菸房',
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = '請輸入姓名';
    if (!formData.phone.trim()) {
      newErrors.phone = '請輸入電話';
    } else if (!/^09\d{8}$/.test(formData.phone.replace(/-/g, ''))) {
      newErrors.phone = '請輸入有效的手機號碼 (09xxxxxxxx)';
    }
    if (!formData.email.trim()) {
      newErrors.email = '請輸入電子郵件';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '請輸入有效的電子郵件';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      alert(
        `預訂成功!\n\n訂房資訊:\n姓名: ${formData.name}\n電話: ${formData.phone}\n郵件: ${formData.email}\n入住: ${formData.checkIn}\n退房: ${formData.checkOut}\n房型: ${formData.roomType}\n吸菸需求: ${formData.smokingPreference}\n總金額: $${hotel?.price.toLocaleString()}`
      );
      setIsSubmitting(false);
    }, 1500);
  };

  if (!hotel) notFound();

  return (
    <div className="min-h-screen bg-[url('/images/hotel/bg2.jpeg')] bg-cover bg-center sm:bg-top bg-no-repeat bg-black/70 bg-blend-darken pb-10">
      <div className="flex flex-col w-full min-h-screen px-4 md:px-8 pt-6">
        {/* 麵包屑/頂部導航 */}
        <nav className="text-sm text-gray-300 mb-6 max-w-6xl mx-auto w-full">
          <Link
            href="/"
            className="hover:underline hover:text-white transition"
          >
            首頁
          </Link>{' '}
          &gt;{' '}
          <Link
            href="/hotel"
            className="hover:underline hover:text-white transition"
          >
            飯店列表
          </Link>{' '}
          &gt; <span className="text-white font-medium">{hotel.name}</span>
        </nav>

        {/* 主體內容 */}
        <div className="w-full max-w-6xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl p-6 md:p-8 flex flex-col lg:flex-row gap-8 mb-8">
          <HotelDetailContent
            hotel={hotel}
            formData={{
              name: formData.name,
              phone: formData.phone,
              email: formData.email,
              roomType: formData.roomType,
              smokingPreference: formData.smokingPreference,
            }}
            errors={errors}
            onInputChange={handleInputChange}
          />

          <HotelDetailBookingCard
            hotel={hotel}
            formData={{
              checkIn: formData.checkIn,
              checkOut: formData.checkOut,
              nights: formData.nights,
              guests: formData.guests,
            }}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}
