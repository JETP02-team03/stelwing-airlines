'use client';

import { useRouter } from 'next/navigation';
import OrderPage, { FormDataType } from '../../components/OrderPage';

export default function PaymentPage() {
  const router = useRouter();

  const handlePayment = (formData: FormDataType) => {
    // 模擬付款成功
    router.push(`/hotel-booking/1/payment/success`);
  };

  return (
    <div className="min-h-screen bg-[url('/images/hotel/bg2.jpeg')] bg-cover bg-center sm:bg-top bg-no-repeat bg-black/70 bg-blend-darken pb-10">
      <div className="flex justify-center items-center min-h-screen px-6">
        <div className="w-full max-w-6xl">
          <OrderPage
            pageTitle="付款資訊"
            buttonText="確認付款"
            onSubmit={handlePayment}
          />
        </div>
      </div>
    </div>
  );
}
