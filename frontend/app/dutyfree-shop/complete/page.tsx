'use client';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { DFCheckoutStepper } from '../components/DFCheckoutStepper';
import { DFPickupModal } from '../components/DFPickupModal';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';

interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

interface DFCompletePageProps {
  cart: CartItem[];
  total: number;
  orderNumber: string;
  pickupModalOpen: boolean;
  onOpenPickupModal: () => void;
  onClosePickupModal: () => void;
  onNavigateAccount: () => void;
}

export function DFCompletePage({
  cart,
  total,
  orderNumber,
  pickupModalOpen,
  onOpenPickupModal,
  onClosePickupModal,
  onNavigateAccount,
}: DFCompletePageProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto px-4 lg:px-16 max-w-4xl">
        <DFCheckoutStepper currentStep={3} />

        <div className="bg-white rounded-lg p-6 md:p-12 text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-[var(--df-state-success)] rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </div>

          <h1
            style={{
              fontSize: 'clamp(1.5rem, 5vw, 2rem)',
              lineHeight: '1.5',
              fontWeight: '600',
            }}
            className="mb-4"
          >
            訂單完成！
          </h1>

          <p className="text-gray-600 mb-2 text-sm md:text-base">
            感謝您的訂購
          </p>
          <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
            訂單號碼：{orderNumber}
          </p>

          {/* Order Items Thumbnails */}
          <div className="mb-6 md:mb-8">
            <h3 className="font-semibold mb-4">訂購商品</h3>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-lg overflow-hidden"
                >
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-md mx-auto mb-6 md:mb-8 p-4 md:p-6 bg-[var(--df-surface-alt)] rounded-lg">
            <div className="flex justify-between mb-2 text-sm md:text-base">
              <span className="text-gray-600">訂單總額</span>
              <span className="font-semibold">
                TWD {total.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              onClick={onOpenPickupModal}
              variant="outline"
              className="gap-2 w-full md:w-auto"
            >
              查看取貨資訊
            </Button>
            <Button
              onClick={onNavigateAccount}
              className="bg-[var(--df-accent-gold)] hover:bg-[var(--df-accent-gold)]/90 text-white w-full md:w-auto"
            >
              前往會員中心
            </Button>
          </div>
        </div>
      </div>

      <DFPickupModal open={pickupModalOpen} onClose={onClosePickupModal} />
    </div>
  );
}

export default function CompletePage() {
  const [pickupModalOpen, setPickupModalOpen] = useState(false);

  // 假資料
  const cart = [
    {
      id: '1',
      name: '香氛禮盒',
      description: '高級香氛組合',
      price: 1800,
      image:
        'https://images.unsplash.com/photo-1591925463023-1ca6b0636780?ixlib=rb-4.1.0&auto=format&fit=crop&w=600&q=80',
      quantity: 1,
    },
    {
      id: '2',
      name: '旅行香水',
      description: '輕巧便攜的香氛噴霧',
      price: 980,
      image:
        'https://images.unsplash.com/photo-1591925463023-1ca6b0636780?ixlib=rb-4.1.0&auto=format&fit=crop&w=600&q=80',
      quantity: 1,
    },
  ];

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const orderNumber = 'DF2025-0001';

  return (
    <DFCompletePage
      cart={cart}
      total={total}
      orderNumber={orderNumber}
      pickupModalOpen={pickupModalOpen}
      onOpenPickupModal={() => setPickupModalOpen(true)}
      onClosePickupModal={() => setPickupModalOpen(false)}
      onNavigateAccount={() => console.log('前往會員中心')}
    />
  );
}
