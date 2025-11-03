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
  sub: string;
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
      name: 'Dior 迪奧癮誘超模漆光唇釉',
      sub: '花蜜護唇精華質地 6ml',
      description:
        '融合高濃度花蜜精華與漆光色料，一抹即現鮮明色澤與鏡面光感。輕盈不厚重的質地能長效保濕，同時修護乾裂唇紋，打造柔滑飽滿的立體唇形，全天維持水潤亮澤。',
      price: 8800,
      image: 'images/dutyfree/dior4.png',
      images: [
        '/images/dutyfree/dior1.png',
        '/images/dutyfree/dior2.png',
        '/images/dutyfree/dior3.png',
        '/images/dutyfree/dior4.png',
      ],
      category: '美妝保養',
      subcategory: '彩妝',
    },
    {
      id: '6',
      name: 'Dior 迪奧雪晶靈透亮粉餅',
      sub: '高效持妝光感粉餅 12g',
      description:
        '蘊含雪絨花精萃與礦物粉體，能瞬間提亮膚色並修飾毛孔。質地輕盈細緻，柔焦光感自然服貼，長時間控油不暗沉。附高密度粉撲，上妝滑順不卡粉，維持清透亮澤一整天。',
      price: 3200,
      image: '/images/dutyfree/dior5.png',
      images: [
        '/images/dutyfree/dior5.png',
        '/images/dutyfree/dior6.png',
        '/images/dutyfree/dior7.jpg',
        '/images/dutyfree/dior8.png',
      ],
      category: '美妝保養',
      subcategory: '彩妝',
    },
    {
      id: '7',
      name: 'CHANEL 香奈兒四色眼影盤',
      sub: '霧光絢采限量版 2g',
      description:
        '結合絲絨與珠光質地，色澤飽和細緻，可自由搭配打造自然或濃郁妝感。粉質細膩不飛粉，輕鬆延展並服貼眼皮，長效不暈染。附專用雙頭刷具，適合日常與宴會使用。',
      price: 2800,
      image: '/images/dutyfree/c1.png',
      images: [
        '/images/dutyfree/c1.png',
        '/images/dutyfree/c2.png',
        '/images/dutyfree/c3.png',
        '/images/dutyfree/c4.png',
      ],
      category: '美妝保養',
      subcategory: '彩妝',
    },
    {
      id: '8',
      name: 'Shu Uemura 植村秀極細眉筆',
      sub: '防水持色硬筆芯 0.09g',
      description:
        '日本精製筆芯，硬度適中不易斷裂，筆觸穩定可精準描繪眉型。防水抗汗配方讓妝效長效持久不暈染，自然顯色不生硬，輕鬆打造立體柔和眉感。附可替換筆蕊設計，方便實用。',
      price: 1450,
      image: '/images/dutyfree/s1.png',
      images: [
        '/images/dutyfree/s1.png',
        '/images/dutyfree/s2.png',
        '/images/dutyfree/s3.png',
        '/images/dutyfree/s4.png',
      ],
      category: '美妝保養',
      subcategory: '彩妝',
    },
    {
      id: '9',
      name: 'Hermès 經典緹花絲巾',
      sub: '柔軟真絲材質 90x90cm',
      description:
        '以細膩緹花工藝編織出典雅圖紋，展現品牌經典美學。絲質柔滑親膚，色澤飽滿亮麗，可隨心變化造型，無論頸巾或髮飾皆能散發高雅氣質，是時尚配件中的永恆經典。',
      price: 12800,
      image: '/images/dutyfree/h1.png',
      images: [
        '/images/dutyfree/h1.png',
        '/images/dutyfree/h2.png',
        '/images/dutyfree/h3.png',
        '/images/dutyfree/h1.png',
      ],
      category: '時尚精品',
      subcategory: '配件',
    },
    {
      id: '10',
      name: 'Gucci 方框太陽眼鏡',
      sub: '抗UV400鏡片 義大利製',
      description:
        '採用輕盈醋酸纖維鏡框與金屬細節結構，兼具舒適與耐用。UV400防護鏡片可有效阻擋紫外線傷害，並維持清晰視野。經典方框設計展現俐落風格，適合日常穿搭與旅行配戴。',
      price: 16200,
      image: '/images/dutyfree/g1.png',
      images: [
        '/images/dutyfree/g1.png',
        '/images/dutyfree/g1.png',
        '/images/dutyfree/g1.png',
        '/images/dutyfree/g1.png',
      ],
      category: '時尚精品',
      subcategory: '配件',
    },
    {
      id: '11',
      name: 'Rolex 蠔式恆動腕錶',
      sub: '不鏽鋼錶殼 自動上鍊',
      description:
        '以精鋼打造堅固錶殼，防水深度達100米。搭載自動上鍊機芯，走時精準穩定。簡潔錶面搭配夜光刻度與指針，無論商務或休閒皆展現雋永質感，是經典工藝的象徵。',
      price: 328000,
      image: '/images/dutyfree/r1.png',
      images: [
        '/images/dutyfree/r1.png',
        '/images/dutyfree/r1.png',
        '/images/dutyfree/r1.png',
        '/images/dutyfree/r1.png',
      ],
      category: '時尚精品',
      subcategory: '配件',
    },
    {
      id: '12',
      name: 'Prada 漁夫帽尼龍系列',
      sub: '經典三角標徽 黑色款',
      description:
        '以高級尼龍面料打造，具備輕盈與防潑水特性。帽型立體俐落，搭配品牌經典金屬三角標誌，展現低調奢華風格。適合日常外出或旅遊穿搭，輕鬆塑造時尚造型。',
      price: 9800,
      image: '/images/dutyfree/p1.png',
      images: [
        '/images/dutyfree/p1.png',
        '/images/dutyfree/p1.png',
        '/images/dutyfree/p1.png',
        '/images/dutyfree/p1.png',
      ],
      category: '時尚精品',
      subcategory: '配件',
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
