'use client';

import OrderPage, { FormDataType } from '../../components/OrderPage';

export default function OrderEditPage() {
  const handleUpdateOrder = (formData: FormDataType) => {
    alert('訂單已更新！');
    // 這裡可以呼叫 API 更新資料
  };

  return (
    <div className="min-h-screen bg-[url('/images/hotel/bg2.jpeg')] bg-cover bg-center sm:bg-top bg-no-repeat bg-black/50 bg-blend-darken pb-10">
      <OrderPage
        pageTitle="修改訂單"
        buttonText="更新訂單"
        onSubmit={handleUpdateOrder}
      />
    </div>
  );
}
