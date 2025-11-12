'use client';

import { useRouter } from 'next/navigation';
import OrderPage, { FormDataType } from '../../components/OrderPage';

export default function PaymentPage() {
  const router = useRouter();

  const handlePayment = (formData: FormDataType) => {
    // 模擬付款成功
    const hotelId = localStorage.getItem('booking_selectedHotelId') || '1';
    router.push(`/hotel-booking/${hotelId}/payment/success`);
  };

  return (
    <OrderPage
      pageTitle="付款資訊"
      buttonText="確認付款"
      onSubmit={handlePayment}
    />
  );
}
