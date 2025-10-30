/**
 * STELWING - localStorage 工具函數
 * 統一管理本地數據持久化
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

// 通用的 localStorage 操作
function setItem<T>(key: string, value: T): void {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error(`Error saving to localStorage (${key}):`, error);
  }
}

function getItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return defaultValue;
  }
}

function removeItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error);
  }
}

function clearAll(): void {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
}

export const storage = {
  set: setItem,
  get: getItem,
  remove: removeItem,
  clear: clearAll,
};

// 購物車相關
export const cartStorage = {
  save: (cart: any[]) => storage.set(STORAGE_KEYS.CART, cart),
  load: () => storage.get(STORAGE_KEYS.CART, []),
  clear: () => storage.remove(STORAGE_KEYS.CART),
};

// 登入狀態
export const authStorage = {
  saveLoginState: (isLoggedIn: boolean) => storage.set(STORAGE_KEYS.IS_LOGGED_IN, isLoggedIn),
  loadLoginState: () => storage.get(STORAGE_KEYS.IS_LOGGED_IN, false),
  saveUserInfo: (userInfo: any) => storage.set(STORAGE_KEYS.USER_INFO, userInfo),
  loadUserInfo: () => storage.get(STORAGE_KEYS.USER_INFO, null),
  clearAuth: () => {
    storage.remove(STORAGE_KEYS.IS_LOGGED_IN);
    storage.remove(STORAGE_KEYS.USER_INFO);
  },
};

// 折扣碼
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

// 訂單
export const ordersStorage = {
  save: (orders: any[]) => storage.set(STORAGE_KEYS.ORDERS, orders),
  load: () => storage.get(STORAGE_KEYS.ORDERS, []),
  clear: () => storage.remove(STORAGE_KEYS.ORDERS),
};
