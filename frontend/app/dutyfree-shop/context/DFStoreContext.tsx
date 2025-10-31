'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { authStorage, cartStorage, promoStorage } from '../utils/storage';

// ===============================
// 型別定義
// ===============================
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images?: string[];
  category?: string;
  subcategory?: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface DFStoreContextType {
  products: Product[];
  cart: CartItem[];
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  logout: () => void; // ✅ 新增：登出方法
  discount: number;
  promoCode: string;
  discountPercent: number;
  checkoutItem: Product | null;
  setCheckoutItem: (item: Product | null) => void;
  addToCart: (product: Product, qty: number) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  applyPromoCode: (code: string) => void;
}

// ===============================
// Context 建立
// ===============================
const DFStoreContext = createContext<DFStoreContextType | undefined>(undefined);

// ===============================
// Provider 實作
// ===============================
export function DFStoreProvider({ children }: { children: React.ReactNode }) {
  // -------------------------------
  // 假資料
  // -------------------------------
  const products: Product[] = [
    {
      id: '1',
      name: 'Estee Lauder 雅詩蘭黛',
      description: '特潤修護肌透精華水方程雙層唇釉精華100ML',
      price: 8800,
      image: '/images/dutyfree/sunglasses.png',
      images: [
        '/images/dutyfree/brown.png',
        '/images/dutyfree/diorlipstick.png',
        '/images/dutyfree/sunglasses.png',
        '/images/dutyfree/sunglasses.png',
      ],
      category: '美妝保養',
      subcategory: '臉部',
    },
    {
      id: '2',
      name: 'Chanel N°5 系列',
      description: '經典香水-50mL',
      price: 6800,
      image: '/images/dutyfree/perfume.jpg',
      images: [
        '/images/dutyfree/perfume.jpg',
        '/images/dutyfree/sunglasses.png',
        '/images/dutyfree/sunglasses.png',
        '/images/dutyfree/sunglasses.png',
      ],
      category: '香氛花園',
      subcategory: '女仕',
    },
    {
      id: '3',
      name: 'Prada 太陽眼鏡',
      description: '義大利設計師款式',
      price: 15800,
      image: '/images/dutyfree/sunglasses.png',
      images: [
        '/images/dutyfree/sunglasses.png',
        '/images/dutyfree/sunglasses.png',
        '/images/dutyfree/sunglasses.png',
        '/images/dutyfree/sunglasses.png',
      ],
      category: '時尚精品',
      subcategory: '配件',
    },
    {
      id: '4',
      name: 'Aesop 室內香氛噴霧',
      description: '香氛・伊蘭香調',
      price: 2100,
      image: '/images/dutyfree/aromatherapy.png',
      images: [
        '/images/dutyfree/aromatherapy.png',
        '/images/dutyfree/diorlipstick.png',
        '/images/dutyfree/diorlipstick.png',
        '/images/dutyfree/diorlipstick.png',
      ],
      category: '品味生活',
      subcategory: '家居',
    },
    {
      id: 'm1',
      name: 'Dior 癮誘粉漾潤唇膏',
      description: '001 粉紅色 經典保濕潤唇膏',
      price: 1500,
      image: '/images/dutyfree/diorlipstick.png',
      images: [
        '/images/dutyfree/diorlipstick.png',
        '/images/dutyfree/chanel-2.jpg',
        '/images/dutyfree/chanel-3.jpg',
        '/images/dutyfree/chanel-4.jpg',
      ],
      category: '美妝保養',
      subcategory: '彩妝',
    },
  ];

  // -------------------------------
  // 狀態管理
  // -------------------------------
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [checkoutItem, setCheckoutItem] = useState<Product | null>(null);

  // -------------------------------
  // 初始化：載入儲存資料
  // -------------------------------
  useEffect(() => {
    const savedCart = cartStorage.load();
    const savedLogin = authStorage.loadLoginState(); // ✅ 改成 sessionStorage
    const savedPromo = promoStorage.load();

    if (savedCart.length) setCart(savedCart);
    if (savedLogin) setIsLoggedIn(savedLogin);
    if (savedPromo.promoCode) {
      setPromoCode(savedPromo.promoCode);
      setDiscount(savedPromo.discount);
      setDiscountPercent(savedPromo.discountPercent);
    }
  }, []);

  // -------------------------------
  // 資料持久化
  // -------------------------------
  useEffect(() => cartStorage.save(cart), [cart]);
  useEffect(() => authStorage.saveLoginState(isLoggedIn), [isLoggedIn]);
  useEffect(() => {
    if (promoCode) promoStorage.save(promoCode, discount, discountPercent);
  }, [promoCode, discount, discountPercent]);

  // -------------------------------
  // 功能方法
  // -------------------------------
  const addToCart = (product: Product, qty: number) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: qty }]);
    }
    toast.success('已加入購物車！', { description: `${product.name} x${qty}` });
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
    toast.success('商品已移除');
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    setCart(
      cart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const applyPromoCode = (code: string) => {
    if (code.toLowerCase() === 'stelwing95') {
      const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const discountAmount = Math.round(subtotal * 0.05);
      setPromoCode(code);
      setDiscount(discountAmount);
      setDiscountPercent(5);
      toast.success('折扣碼已套用', { description: '95 折優惠' });
    } else {
      toast.error('無效的折扣碼');
    }
  };

  // 登出方法：清除 session 與登入狀態
  const logout = () => {
    setIsLoggedIn(false);
    authStorage.clearAuth();
    toast.info('您已登出');
  };

  // -------------------------------
  // Context 提供值
  // -------------------------------
  return (
    <DFStoreContext.Provider
      value={{
        products,
        cart,
        isLoggedIn,
        setIsLoggedIn,
        logout, // 新增
        discount,
        promoCode,
        discountPercent,
        checkoutItem,
        setCheckoutItem,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        applyPromoCode,
      }}
    >
      {children}
    </DFStoreContext.Provider>
  );
}

// ===============================
// 自訂 Hook
// ===============================
export const useDFStore = () => {
  const ctx = useContext(DFStoreContext);
  if (!ctx) throw new Error('useDFStore 必須在 DFStoreProvider 內使用');
  return ctx;
};
