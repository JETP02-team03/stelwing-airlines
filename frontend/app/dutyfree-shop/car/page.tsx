'use client';
import { ShoppingCart, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { DFCheckoutStepper } from '../components/DFCheckoutStepper';
import { DFQuantitySelector } from '../components/DFQuantitySelector';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

interface DFCartPageProps {
  cart: CartItem[];
  promoCode: string;
  discount: number;
  discountPercent: number;
  deleteItemId: string | null;
  onNavigateHome: () => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onPromoCodeChange: (code: string) => void;
  onApplyPromoCode: () => void;
  onCheckout: () => void;
  onSetDeleteItemId: (id: string | null) => void;
}

// =========================
// 🧱 購物車畫面元件
// =========================
export function DFCartPage({
  cart,
  promoCode,
  discount,
  discountPercent,
  deleteItemId,
  onNavigateHome,
  onUpdateQuantity,
  onRemoveItem,
  onPromoCodeChange,
  onApplyPromoCode,
  onCheckout,
  onSetDeleteItemId,
}: DFCartPageProps) {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal - discount;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto px-4 lg:px-16 max-w-7xl">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4">
          <button
            onClick={onNavigateHome}
            className="hover:text-[var(--df-accent-gold)]"
          >
            首頁
          </button>
          {' > '}
          <span>購物車</span>
        </div>

        <h1 className="text-2xl font-semibold mb-6 md:mb-8">購物車</h1>

        {/* Checkout Stepper */}
        <DFCheckoutStepper currentStep={1} />

        {cart.length === 0 ? (
          <div className="bg-white rounded-lg p-8 md:p-12 text-center">
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 mb-4">您的購物車是空的</p>
            <Button
              onClick={onNavigateHome}
              className="bg-[var(--df-accent-gold)] hover:bg-[var(--df-accent-gold)]/90 text-white"
            >
              繼續購物
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
            {/* 左側：購物車商品 */}
            <div className="lg:col-span-2 space-y-4">
              {/* 桌機表格 */}
              <div className="hidden md:block bg-white rounded-lg overflow-hidden">
                <div className="grid grid-cols-12 gap-4 p-4 bg-[var(--df-surface-alt)] border-b">
                  <div className="col-span-6">商品</div>
                  <div className="col-span-2 text-center">數量</div>
                  <div className="col-span-2 text-center">小計</div>
                  <div className="col-span-2 text-center">刪除</div>
                </div>

                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 gap-4 p-4 border-b items-center"
                  >
                    <div className="col-span-6 flex gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <DFQuantitySelector
                        value={item.quantity}
                        onChange={(qty) => onUpdateQuantity(item.id, qty)}
                      />
                    </div>
                    <div className="col-span-2 text-center font-medium">
                      ${(item.price * item.quantity).toLocaleString()}
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <button
                        onClick={() => onSetDeleteItemId(item.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 右側：結帳資訊 */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold mb-4">使用折扣碼</h3>
                <div className="flex gap-2">
                  <Input
                    placeholder="Coupon Code"
                    value={promoCode}
                    onChange={(e) => onPromoCodeChange(e.target.value)}
                  />
                  <Button
                    onClick={onApplyPromoCode}
                    className="bg-[var(--df-accent-gold)] hover:bg-[var(--df-accent-gold)]/90 text-white whitespace-nowrap"
                  >
                    Apply
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <div className="space-y-3 border-b pb-4 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>小計</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-[var(--df-state-success)]">
                      <span>折扣 ({discountPercent}%)</span>
                      <span>- ${discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold text-lg">
                    <span>總金額</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                </div>

                {/* ✅ 結帳按鈕 */}
                <Button
                  onClick={onCheckout}
                  className="w-full bg-[var(--df-accent-gold)] hover:bg-[var(--df-accent-gold)]/90 text-white h-12"
                >
                  結帳
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 刪除商品確認視窗 */}
      <AlertDialog
        open={deleteItemId !== null}
        onOpenChange={(open) => !open && onSetDeleteItemId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>確認刪除</AlertDialogTitle>
            <AlertDialogDescription>
              確定要從購物車移除此商品嗎？此操作無法復原。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => onSetDeleteItemId(null)}>
              取消
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteItemId && onRemoveItem(deleteItemId)}
              className="bg-[var(--df-state-error)] hover:bg-[var(--df-state-error)]/90"
            >
              確認刪除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ================================
// ✅ 頁面主元件
// ================================
const initialCart = [
  {
    id: '1',
    name: '香氛禮盒',
    description: '來自法國的高級香氛組合',
    price: 1800,
    image:
      'https://images.unsplash.com/photo-1591925463023-1ca6b0636780?auto=format&fit=crop&q=80&w=600',
    quantity: 1,
  },
];

export default function CartPage() {
  const router = useRouter(); // ✅ 初始化 router

  const [cart, setCart] = useState(initialCart);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

  // 結帳按鈕邏輯 ✅
  const handleCheckout = () => {
    // 👉 1. 儲存購物車資料到 localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // 👉 2. 導向結帳頁
    router.push('/dutyfree-shop/checkout');
  };

  return (
    <DFCartPage
      cart={cart}
      promoCode={promoCode}
      discount={discount}
      discountPercent={discountPercent}
      deleteItemId={deleteItemId}
      onNavigateHome={() => router.push('/dutyfree-shop')}
      onUpdateQuantity={(id, qty) =>
        setCart((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, qty) } : item
          )
        )
      }
      onRemoveItem={(id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
        setDeleteItemId(null);
      }}
      onPromoCodeChange={setPromoCode}
      onApplyPromoCode={() => {
        if (promoCode === 'DF2025') {
          setDiscountPercent(10);
          setDiscount(
            cart.reduce((sum, item) => sum + item.price * item.quantity, 0) *
              0.1
          );
        } else {
          setDiscountPercent(0);
          setDiscount(0);
        }
      }}
      onCheckout={handleCheckout}
      onSetDeleteItemId={setDeleteItemId}
    />
  );
}
