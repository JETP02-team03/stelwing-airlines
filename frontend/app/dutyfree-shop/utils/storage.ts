/**
 * STELWING - localStorage 工具函數（完整整合版）
 * ✅ 新增：ordersStorage 支援儲存完整 products 陣列
 */

const STORAGE_KEYS = {
  CART: 'stelwing_cart',
  IS_LOGGED_IN: 'stelwing_is_logged_in',
  PROMO_CODE: 'stelwing_promo_code',
  DISCOUNT: 'stelwing_discount',
  DISCOUNT_PERCENT: 'stelwing_discount_percent',
  ORDERS: 'stelwing_orders',
  USER_INFO: 'stelwing_user_info',
} as const;

// ===============================
// 通用 localStorage 工具
// ===============================
function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
  }
}

function getItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key}:`, error);
    return defaultValue;
  }
}

function removeItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key}:`, error);
  }
}

function clearAll(): void {
  Object.values(STORAGE_KEYS).forEach(removeItem);
}

// ===============================
// 模組封裝
// ===============================
export const storage = {
  set: setItem,
  get: getItem,
  remove: removeItem,
  clear: clearAll,
};

// 購物車
export const cartStorage = {
  save: (cart: any[]) => storage.set(STORAGE_KEYS.CART, cart),
  load: () => storage.get(STORAGE_KEYS.CART, []),
  clear: () => storage.remove(STORAGE_KEYS.CART),
};

// 登入
export const authStorage = {
  saveLoginState: (isLoggedIn: boolean) =>
    storage.set(STORAGE_KEYS.IS_LOGGED_IN, isLoggedIn),
  loadLoginState: () => storage.get(STORAGE_KEYS.IS_LOGGED_IN, false),
  saveUserInfo: (userInfo: any) =>
    storage.set(STORAGE_KEYS.USER_INFO, userInfo),
  loadUserInfo: () => storage.get(STORAGE_KEYS.USER_INFO, null),
  clearAuth: () => {
    storage.remove(STORAGE_KEYS.IS_LOGGED_IN);
    storage.remove(STORAGE_KEYS.USER_INFO);
  },
};

// 折扣
export const promoStorage = {
  save: (promoCode: string, discount: number, discountPercent: number) => {
    storage.set(STORAGE_KEYS.PROMO_CODE, promoCode);
    storage.set(STORAGE_KEYS.DISCOUNT, discount);
    storage.set(STORAGE_KEYS.DISCOUNT_PERCENT, discountPercent);
  },
  load: () => ({
    promoCode: storage.get(STORAGE_KEYS.PROMO_CODE, ''),
    discount: storage.get(STORAGE_KEYS.DISCOUNT, 0),
    discountPercent: storage.get(STORAGE_KEYS.DISCOUNT_PERCENT, 0),
  }),
  clear: () => {
    storage.remove(STORAGE_KEYS.PROMO_CODE);
    storage.remove(STORAGE_KEYS.DISCOUNT);
    storage.remove(STORAGE_KEYS.DISCOUNT_PERCENT);
  },
};

// ✅ 訂單（含商品清單）
export const ordersStorage = {
  save: (orders: any[]) => storage.set(STORAGE_KEYS.ORDERS, orders),
  load: () => storage.get(STORAGE_KEYS.ORDERS, []),
  clear: () => storage.remove(STORAGE_KEYS.ORDERS),
};
