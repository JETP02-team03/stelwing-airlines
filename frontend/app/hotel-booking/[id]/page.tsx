'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import * as React from 'react';
import HotelDetailBookingCard from '../components/HotelDetailBookingCard';
import HotelDetailContent from '../components/HotelDetailContent';
import { HotelDetailData } from '../interfaces/HotelDetailData';
import { convertHotelToDetailData } from '../interfaces/hotelUtils';
import { allMockHotels } from '../interfaces/mockHotels';

const fetchHotelData = (id: string): HotelDetailData | null => {
  const hotel = allMockHotels.find((h) => h.id === parseInt(id));
  return hotel ? convertHotelToDetailData(hotel) : null;
};

const formatDateLocal = (date: Date) => {
  const tzOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - tzOffset).toISOString().split('T')[0];
};

export default function HotelDetailPage() {
  const router = useRouter();
  const params = useParams();
  const hotelId = Array.isArray(params?.id) ? params.id[0] : params?.id || '';

  const hotel = fetchHotelData(hotelId);

  const savedSearch =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('booking_search') || '{}')
      : {};

  const [formData, setFormData] = React.useState({
    checkIn: savedSearch.checkin || formatDateLocal(new Date()),
    checkOut:
      savedSearch.checkout ||
      formatDateLocal(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)),
    nights: 3,
    guests: savedSearch.guests || 2,
    name: '',
    phone: '',
    email: '',
    roomType: 'King Size Bed',
    smokingPreference: '禁菸房',
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  if (!hotel)
    return <div className="text-center text-white p-10">飯店不存在</div>;

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
    if (!formData.phone.trim()) newErrors.phone = '請輸入電話';
    else if (!/^09\d{8}$/.test(formData.phone.replace(/-/g, '')))
      newErrors.phone = '請輸入有效的手機號碼 (09xxxxxxxx)';
    if (!formData.email.trim()) newErrors.email = '請輸入電子郵件';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = '請輸入有效的電子郵件';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        document
          .getElementById(firstErrorField)
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    localStorage.setItem(
      'booking_final',
      JSON.stringify({
        ...formData,
        hotelId: hotel.id,
        hotelName: hotel.name,
        price: hotel.price,
        image: hotel.images?.[0],
      })
    );

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push(`/hotel-booking/${hotel.id}/payment`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[url('/images/hotel/bg2.jpeg')] bg-cover bg-center sm:bg-top bg-no-repeat bg-black/70 bg-blend-darken pb-10">
      <div className="flex flex-col w-full min-h-screen px-4 md:px-8 pt-6">
        <nav className="text-sm text-gray-300 mb-6 max-w-6xl mx-auto w-full">
          <Link
            href="/"
            className="hover:underline hover:text-white transition"
          >
            首頁
          </Link>{' '}
          &gt;{' '}
          <Link
            href="/hotel-booking/search"
            className="hover:underline hover:text-white transition"
          >
            飯店列表
          </Link>{' '}
          &gt; <span className="text-white font-medium">{hotel.name}</span>
        </nav>

        <div className="w-full max-w-6xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl p-6 md:p-8 flex flex-col lg:flex-row gap-8 mb-8">
          <HotelDetailContent
            hotel={hotel}
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
          />
          <HotelDetailBookingCard
            hotel={hotel}
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>

        <div className="text-center">
          <button
            onClick={() => router.back()}
            className="text-[#D4A574] underline text-lg"
          >
            上一步
          </button>
        </div>
      </div>
    </div>
  );
}
