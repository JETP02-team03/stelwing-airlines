const STORAGE_KEYS = {
  CART: 'stelwing_cart',
  IS_LOGGED_IN: 'stelwing_is_logged_in',
  PROMO_CODE: 'stelwing_promo_code',
  DISCOUNT: 'stelwing_discount',
  DISCOUNT_PERCENT: 'stelwing_discount_percent',
  ORDERS: 'stelwing_orders',
  USER_INFO: 'stelwing_user_info',
} as const;

// ======================================================
// 通用 LocalStorage 操作
// ======================================================
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
    Object.values(STORAGE_KEYS).forEach((key) => {
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

// ======================================================
// 購物車資料
// ======================================================
export const cartStorage = {
  save: (cart: any[]) => storage.set(STORAGE_KEYS.CART, cart),
  load: () => storage.get(STORAGE_KEYS.CART, []),
  clear: () => storage.remove(STORAGE_KEYS.CART),
};

// ======================================================
// 登入狀態（使用 sessionStorage）
// ======================================================
export const authStorage = {
  /**
   * 儲存登入狀態（sessionStorage）
   * 關閉瀏覽器或分頁就會自動登出
   */
  saveLoginState: (isLoggedIn: boolean) => {
    try {
      sessionStorage.setItem(
        STORAGE_KEYS.IS_LOGGED_IN,
        JSON.stringify(isLoggedIn)
      );
    } catch (error) {
      console.error('Error saving login state:', error);
    }
  },

  /**
   * 讀取登入狀態
   */
  loadLoginState: (): boolean => {
    try {
      const data = sessionStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN);
      return data ? JSON.parse(data) : false;
    } catch (error) {
      console.error('Error loading login state:', error);
      return false;
    }
  },

  /**
   * 使用者資料仍使用 localStorage（方便暫存資訊）
   */
  saveUserInfo: (userInfo: any) =>
    storage.set(STORAGE_KEYS.USER_INFO, userInfo),
  loadUserInfo: () => storage.get(STORAGE_KEYS.USER_INFO, null),

  /**
   * 清除登入與使用者資料
   */
  clearAuth: () => {
    try {
      sessionStorage.removeItem(STORAGE_KEYS.IS_LOGGED_IN);
      storage.remove(STORAGE_KEYS.USER_INFO);
    } catch (error) {
      console.error('Error clearing auth:', error);
    }
  },
};

// ======================================================
// 折扣碼
// ======================================================
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

// ======================================================
// 訂單資料
// ======================================================
export const ordersStorage = {
  save: (orders: any[]) => storage.set(STORAGE_KEYS.ORDERS, orders),
  load: () => storage.get(STORAGE_KEYS.ORDERS, []),
  clear: () => storage.remove(STORAGE_KEYS.ORDERS),
};
