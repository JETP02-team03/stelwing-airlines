// ==================== 飯店資料結構定義 ====================
// export 是讓其他檔案能匯入使用這個定義
export interface HotelCardData {
  id: number; // 飯店唯一識別碼（數字）
  name: string; // 飯店名稱（文字）
  rating: number; // 飯店評分（數字，例如：4.6）
  location: string; // 飯店位置描述（文字，例如："第二航廈・機場內"）
  distance: string; // 距離描述（文字，例如："距離機場約 0.3公里"）
  price: number; // 價格（數字，例如：2000）
  priceUnit?: string; // 價格單位（文字，例如："/night"）
  currency?: string; // 貨幣符號（文字，例如："$"）
  image?: string; // 飯店圖片網址（可有可無）

  // 以下為第二頁列表額外欄位，可選填
  address?: string; // 飯店詳細地址或附加位置描述
  roomType?: string; // 房型描述（例如："標準雙人房"）
  freeCancellation?: boolean; // 是否可免費取消
  amenities?: {
    wifi?: boolean; // 是否有WiFi
    parking?: boolean; // 是否有停車場
    cafe?: boolean; // 是否有咖啡廳
    restaurant?: boolean; // 是否有餐廳
    frontDesk24h?: boolean; // 是否有24小時櫃台
    luggageStorage?: boolean; // 是否有行李寄存
    shuttleService?: boolean; // 是否有機場接送
  };
  notes?: string; // 其它備註說明
}
