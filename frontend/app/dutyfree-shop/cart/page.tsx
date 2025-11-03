'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { DFQuantitySelector } from '../components/DFQuantitySelector';
import { Button } from '../components/ui/button';
import { useDFStore } from '../context/DFStoreContext';

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    applyPromoCode,
    discount,
    promoCode,
    isLoggedIn, // ✅ 取出登入狀態
  } = useDFStore();

  const [code, setCode] = useState('');

  // 小計與總金額
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = Math.max(0, subtotal - discount);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-600">
        <p>購物車目前是空的。</p>
        <Button
          onClick={() => router.push('/dutyfree-shop')}
          className="mt-4 bg-[var(--df-accent-gold)] text-white"
        >
          返回商品列表
        </Button>
      </div>
    );
  }

  // 套用折扣碼
  const handleApplyCode = () => {
    const formatted = code.trim().toLowerCase();
    if (!formatted) return;
    applyPromoCode(formatted);
    setCode('');
  };

  // ✅ 點擊前往結帳
  const handleCheckout = () => {
    if (!isLoggedIn) {
      router.push('/dutyfree-shop/login');
    } else {
      router.push('/dutyfree-shop/checkout');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto px-4 md:px-8 lg:px-16 max-w-6xl">
        <h1 className="text-2xl font-semibold mb-6">購物車</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: 商品列表 */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-4 md:p-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center justify-between border-b py-4 gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="font-medium text-gray-800">{item.name}</h2>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {item.sub}
                    </p>
                    <p className="text-[var(--df-accent-gold)] font-semibold mt-1">
                      TWD {item.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* 數量與刪除 */}
                <div className="flex items-center gap-3">
                  <DFQuantitySelector
                    value={item.quantity}
                    onChange={(qty) => updateCartQuantity(item.id, qty)}
                  />
                  <Button
                    variant="outline"
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 border-red-300 hover:bg-red-50"
                  >
                    移除
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Right: 結帳資訊 */}
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-semibold mb-4">訂單摘要</h2>

            <div className="flex justify-between text-sm text-gray-600">
              <span>小計</span>
              <span>TWD {subtotal.toLocaleString()}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>折扣 ({promoCode})</span>
                <span>- TWD {discount.toLocaleString()}</span>
              </div>
            )}

            <div className="border-t pt-3 flex justify-between text-lg font-semibold">
              <span>總金額</span>
              <span>TWD {total.toLocaleString()}</span>
            </div>

            {/* 折扣碼輸入 */}
            <div className="mt-4">
              <label className="block text-sm mb-2 text-gray-700">折扣碼</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="輸入折扣碼"
                  className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--df-accent-gold)]"
                />
                <Button
                  onClick={handleApplyCode}
                  className="bg-[var(--df-accent-gold)] text-white hover:bg-[var(--df-accent-gold)]/90"
                >
                  套用
                </Button>
              </div>
              {promoCode && discount > 0 && (
                <p className="text-xs text-green-600 mt-1">
                  已套用優惠碼 <strong>{promoCode}</strong>（95 折）
                </p>
              )}
            </div>

            <Button
              onClick={handleCheckout}
              className="w-full mt-6 bg-[var(--df-accent-gold)] text-white hover:bg-[var(--df-accent-gold)]/90"
            >
              前往結帳
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
