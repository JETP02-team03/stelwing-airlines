'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DFOrderDetailPage } from '../../components/DFOrderDetailPage';
import { ordersStorage } from '../../utils/storage';

// ===============================
// 型別定義
// ===============================
interface Product {
  id: string;
  name: string;
  sub: string; //✅ 改成 sub，取代 description
  description: string;
  price: number;
  image: string;
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: number;
  paymentMethod: string;
  products: Product[]; // ✅ 訂單內商品
}

// ===============================
// 頁面元件
// ===============================
export default function OrderDetailPage() {
  const router = useRouter();
  const { orderId } = useParams<{ orderId: string }>();

  const [order, setOrder] = useState<Order | null>(null);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [pickupModalOpen, setPickupModalOpen] = useState(false);

  // ✅ 載入指定訂單
  useEffect(() => {
    if (!orderId) return;

    const storedOrders = ordersStorage.load() as Order[];
    const found = storedOrders.find((o) => o.id === orderId);

    if (found) {
      // ✅ 防止舊資料沒有 sub 欄位（相容舊版）
      const normalizedProducts = (found.products || []).map((p) => ({
        ...p,
        sub: p.sub ?? (p as any).description ?? '', // 若舊訂單沒有 sub，用 description 補上
      }));

      setOrder(found);
      setCartItems(normalizedProducts);
    } else {
      setOrder(null);
    }
  }, [orderId]);

  // ✅ 找不到訂單時的 fallback UI
  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-600">
        <p className="text-lg mb-4">找不到此訂單資料，可能已被刪除。</p>
        <button
          onClick={() => router.push('/dutyfree-shop/member')}
          className="bg-[var(--df-accent-gold)] text-white px-6 py-2 rounded hover:opacity-90 transition"
        >
          返回會員中心
        </button>
      </div>
    );
  }

  // ✅ 顯示訂單詳情頁
  return (
    <DFOrderDetailPage
      order={order}
      cart={cartItems}
      pickupModalOpen={pickupModalOpen}
      onNavigateHome={() => router.push('/dutyfree-shop')}
      onNavigateAccount={() => router.push('/dutyfree-shop/member')}
      onOpenPickupModal={() => setPickupModalOpen(true)}
      onClosePickupModal={() => setPickupModalOpen(false)}
    />
  );
}
