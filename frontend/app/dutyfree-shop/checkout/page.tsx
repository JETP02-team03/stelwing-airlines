'use client';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { DFCartItem } from './components/DFCartItem';
import { DFCouponInput } from './components/DFCouponInput';
import { DFOrderSummary } from './components/DFOrderSummary';

interface CartItem {
  id: number;
  image: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
}

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1631701464241-99f7f0ed6f8f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687',
      name: 'Chanel N°5系列',
      description: '經典香水-50mL',
      quantity: 1,
      price: 6800,
    },
  ]);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleApplyCoupon = (code: string) => {
    // 優惠券邏輯可以在這裡實現
    console.log('Applied coupon:', code);
    alert(`已套用優惠券: ${code}`);
  };

  const handleCheckout = () => {
    alert('前往結帳');
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
          <span>首頁</span>
          <ChevronRight className="h-4 w-4" />
          <span>購物車</span>
        </div>

        {/* Title */}
        <h1 className="mb-8 text-[#333333]">購物車</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="grid grid-cols-[200px_1fr] gap-6 pb-4 border-b border-gray-200 mb-4">
              <div className="text-gray-600">商品</div>
              <div className="flex items-center justify-between">
                <div className="text-gray-600">數量</div>
                <div className="flex items-center gap-12">
                  <div className="text-gray-600">小計</div>
                  <div className="w-8"></div>
                </div>
              </div>
            </div>

            {/* Cart Items */}
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <DFCartItem
                  key={item.id}
                  {...item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                />
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                購物車是空的
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <DFCouponInput onApplyCoupon={handleApplyCoupon} />
            <DFOrderSummary
              subtotal={subtotal}
              total={total}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
