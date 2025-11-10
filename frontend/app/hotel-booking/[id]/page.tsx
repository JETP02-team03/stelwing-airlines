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
  // 由於我們只有一個模擬數據,這裡我們簡單地返回它。
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

  // 🌟 統一狀態管理 (整合所有表單數據)
  const [formData, setFormData] = React.useState({
    // 預訂資訊
    checkIn: '2025/12/24',
    checkOut: '2025/12/27',
    nights: 3,
    guests: 2,
    // 登記者資料
    name: '',
    phone: '',
    email: '',
    roomType: 'King Size Bed',
    smokingPreference: '禁菸房',
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // 🌟 處理輸入變更
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // 清除該欄位的錯誤
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // 🌟 表單驗證
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = '請輸入姓名';
    }
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

  // 🌟 提交處理
  const handleSubmit = () => {
    if (!validateForm()) {
      // 滾動到第一個錯誤欄位
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    // 模擬提交
    setTimeout(() => {
      alert(
        `預訂成功!\n\n訂房資訊:\n姓名: ${formData.name}\n電話: ${formData.phone}\n郵件: ${formData.email}\n入住: ${formData.checkIn}\n退房: ${formData.checkOut}\n房型: ${formData.roomType}\n吸菸需求: ${formData.smokingPreference}\n總金額: $${hotel?.price.toLocaleString()}`
      );
      setIsSubmitting(false);
    }, 1500);
  };

  if (!hotel) {
    // 如果找不到飯店 (例如 ID 不存在),使用 Next.js 的 notFound() 處理 404
    notFound();
  }

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative"
      // 使用您網頁中常見的背景圖和樣式
      style={{ backgroundImage: "url('/images/hotel/bg1.jpeg')" }}
    >
      <div className="flex flex-col w-full min-h-screen bg-black/70 p-4 md:p-8">
        {/* 麵包屑/頂部導航 - 🌟 替換為 Next.js 的 Link 組件 */}
        <nav className="text-sm text-gray-400 mb-6 max-w-6xl mx-auto w-full">
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

        {/* 主要內容容器 (左右分欄) */}
        <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-2xl p-6 md:p-8 flex flex-col lg:flex-row gap-8 mb-8">
          {/* 左側:內容區 (圖片、描述、設施、登記者資料) */}
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

          {/* 右側:預訂卡片區 (價格、日期、訂單輸入) */}
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

        {/* 🌟 底部資訊 */}
        <footer className="text-center text-gray-400 text-sm pb-4">
          <p>© 2025 飯店預訂系統. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
