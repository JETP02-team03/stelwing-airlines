'use client';

import { Calendar, Moon, Users } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { mockHotelDetailData } from '../interfaces/HotelDetailData';

interface OrderPageProps {
  pageTitle: string;
  buttonText: string;
  onSubmit: (formData: FormDataType) => void;
}

export interface FormDataType {
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  firstName?: string;
  lastName?: string;
  cardNumber?: string;
  expiry?: string;
  cvc?: string;
}

export default function OrderPage({
  pageTitle,
  buttonText,
  onSubmit,
}: OrderPageProps) {
  const hotel = mockHotelDetailData;

  const [formData, setFormData] = useState<FormDataType>({
    checkIn: '2025-11-20',
    checkOut: '2025-11-22',
    nights: 2,
    guests: 2,
    firstName: '',
    lastName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const totalPrice = hotel.price;

  return (
    <div className="min-h-screen py-12 px-6 flex flex-col lg:flex-row justify-center gap-10">
      {/* 左邊 - 表單 */}
      <div className="bg-white rounded-lg shadow-md p-8 lg:w-2/3 w-full border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          {pageTitle}
        </h2>

        {/* 如果有信用卡欄位 (付款頁才需要) */}
        {formData.cardNumber !== undefined && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  姓
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
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
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#DCBB87] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  信用卡號碼
                </label>
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, cardNumber: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#DCBB87] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  到期日
                </label>
                <input
                  type="text"
                  value={formData.expiry}
                  onChange={(e) =>
                    setFormData({ ...formData, expiry: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#DCBB87] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  CVC
                </label>
                <input
                  type="password"
                  value={formData.cvc}
                  onChange={(e) =>
                    setFormData({ ...formData, cvc: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#DCBB87] focus:outline-none"
                />
              </div>
            </div>
          </>
        )}

        {/* 入住/退房/晚數/人數 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              入住日期
            </label>
            <input
              type="date"
              value={formData.checkIn}
              onChange={(e) =>
                setFormData({ ...formData, checkIn: e.target.value })
              }
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#DCBB87] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              退房日期
            </label>
            <input
              type="date"
              value={formData.checkOut}
              onChange={(e) =>
                setFormData({ ...formData, checkOut: e.target.value })
              }
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#DCBB87] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              住宿晚數
            </label>
            <input
              type="number"
              min={1}
              value={formData.nights}
              onChange={(e) =>
                setFormData({ ...formData, nights: Number(e.target.value) })
              }
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#DCBB87] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              人數
            </label>
            <input
              type="number"
              min={1}
              value={formData.guests}
              onChange={(e) =>
                setFormData({ ...formData, guests: Number(e.target.value) })
              }
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#DCBB87] focus:outline-none"
            />
          </div>
        </div>

        <button
          onClick={() => onSubmit(formData)}
          className="w-full mt-8 py-3 bg-[#1F2E3C] text-white font-bold text-lg rounded-lg hover:bg-[#2d3d4c] transition"
        >
          {buttonText}
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
