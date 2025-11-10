'use client';

import { Calendar, CreditCard, Moon, Users } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { mockHotelDetailData } from '../../interfaces/HotelDetailData';

export default function PaymentPage() {
  const router = useRouter();
  const params = useParams();
  const hotelId = params.id; // 抓 URL 的 [id]

  const hotel = mockHotelDetailData; // 模擬飯店資料

  const [formData] = useState({
    checkIn: '2025-11-20',
    checkOut: '2025-11-22',
    nights: 2,
    guests: 2,
  });

  const [payment, setPayment] = useState({
    firstName: '',
    lastName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'creditCard' | 'linePay'>(
    'creditCard'
  );

  const [isPaying, setIsPaying] = useState(false);

  const totalPrice = hotel.price;

  const handlePayment = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      router.push(`/hotel-booking/${hotelId}/payment/success`);
    }, 800); // 模擬付款延遲
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] py-12 px-6 flex flex-col lg:flex-row justify-center gap-10">
      {/* 左邊 - 付款資訊 */}
      <div className="bg-white rounded-lg shadow-md p-8 lg:w-2/3 w-full border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <CreditCard size={24} className="text-[#DCBB87]" />
          付款資訊
        </h2>

        {/* 付款方式 */}
        <div className="mb-6 flex gap-4">
          <button
            onClick={() => setPaymentMethod('creditCard')}
            className={`flex-1 py-2 rounded-lg font-medium border ${
              paymentMethod === 'creditCard'
                ? 'bg-[#DCBB87] text-white border-[#DCBB87]'
                : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            信用卡
          </button>
          <button
            onClick={() => setPaymentMethod('linePay')}
            className={`flex-1 py-2 rounded-lg font-medium border ${
              paymentMethod === 'linePay'
                ? 'bg-[#00c300] text-white border-[#00c300]'
                : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            LinePay
          </button>
        </div>

        {/* 姓 / 名 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              姓
            </label>
            <input
              type="text"
              placeholder="請輸入姓"
              value={payment.lastName}
              onChange={(e) =>
                setPayment({ ...payment, lastName: e.target.value })
              }
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#DCBB87] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              名
            </label>
            <input
              type="text"
              placeholder="請輸入名"
              value={payment.firstName}
              onChange={(e) =>
                setPayment({ ...payment, firstName: e.target.value })
              }
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#DCBB87] focus:outline-none"
            />
          </div>
        </div>

        {/* 信用卡資訊 */}
        {paymentMethod === 'creditCard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                信用卡號碼
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={payment.cardNumber}
                onChange={(e) =>
                  setPayment({ ...payment, cardNumber: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#DCBB87] focus:outline-none"
                maxLength={19}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                到期日
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                value={payment.expiry}
                onChange={(e) =>
                  setPayment({ ...payment, expiry: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#DCBB87] focus:outline-none"
                maxLength={5}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                安全碼 (CVC)
              </label>
              <input
                type="password"
                placeholder="123"
                value={payment.cvc}
                onChange={(e) =>
                  setPayment({ ...payment, cvc: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#DCBB87] focus:outline-none"
                maxLength={3}
              />
            </div>
          </div>
        )}

        <button
          onClick={handlePayment}
          disabled={isPaying}
          className="w-full mt-8 py-3 bg-[#1F2E3C] text-white font-bold text-lg rounded-lg hover:bg-[#2d3d4c] transition disabled:opacity-50"
        >
          {isPaying ? '付款中...' : '確認付款'}
        </button>
      </div>

      {/* 右邊 - 訂單摘要 */}
      <aside className="bg-white rounded-lg shadow-md p-8 w-full lg:w-1/3 border border-gray-200 h-fit">
        <Image
          src={hotel.images?.[1] || '/images/hotel/default.jpeg'}
          alt={hotel.name}
          width={400}
          height={160}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
        <h3 className="text-xl font-bold text-gray-800 mb-4">訂單摘要</h3>
        <div className="space-y-3 text-gray-700 text-sm">
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
          <div className="border-t border-gray-300 mt-4 pt-4 flex justify-between text-lg font-bold text-gray-900">
            <span>總金額</span>
            <span>${totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
