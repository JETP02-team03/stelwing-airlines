'use client';

import { Calendar, Moon, Users } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { mockHotelDetailData } from '../../../interfaces/HotelDetailData';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const hotel = mockHotelDetailData;

  const formData = {
    checkIn: '2025-11-20',
    checkOut: '2025-11-22',
    nights: 2,
    guests: 2,
  };

  const totalPrice = hotel.price;

  return (
    <div className="min-h-screen bg-[url('/images/hotel/bg2.jpeg')] bg-cover bg-center sm:bg-top bg-no-repeat bg-black/50 bg-blend-darken flex flex-col items-center justify-center px-6 py-12">
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">預訂成功！</h2>
        <p className="text-gray-700 mb-6">
          感謝您的預訂，確認信件將寄送至您的信箱。
        </p>

        <Image
          src={hotel.images?.[1] || '/images/hotel/default.jpeg'}
          alt={hotel.name}
          width={400}
          height={160}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />

        <div className="space-y-3 text-gray-700 text-sm mb-6 text-left">
          <div className="flex justify-between">
            <span>飯店名稱</span>
            <span className="font-medium">{hotel.name}</span>
          </div>
          <div className="flex justify-between">
            <span>房型</span>
            <span>{hotel.roomType}</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              入住
            </span>
            <span>{formData.checkIn}</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              退房
            </span>
            <span>{formData.checkOut}</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center gap-1">
              <Moon size={14} />
              住宿晚數
            </span>
            <span>{formData.nights} 晚</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center gap-1">
              <Users size={14} />
              人數
            </span>
            <span>{formData.guests} 人</span>
          </div>
          <div className="border-t border-gray-300 pt-2 flex justify-between font-bold text-gray-900">
            <span>總金額</span>
            <span>${totalPrice.toLocaleString()}</span>
          </div>
        </div>

        <button
          onClick={() => router.push('/hotel-booking')}
          className="w-full py-3 bg-[#1F2E3C] text-white font-bold rounded-lg hover:bg-[#2d3d4c] transition"
        >
          返回首頁
        </button>
      </div>
    </div>
  );
}
