// ==================== 飯店資料結構定義 ====================
// 為什麼要 export？ 讓其他檔案可以 import (匯入) 這個規格。
export interface HotelCardData {
  id: number; // 飯店唯一識別碼（數字）
  name: string; // 飯店名稱（文字）
  rating: number; // 評分（數字，例如：4.6）
  location: string; // 位置（文字，例如："東京都"）
  distance: string; // 距離描述（文字，例如："距離機場約 0.3公里"）
  price: number; // 價格（數字，例如：2000）
  //currency: string; // 貨幣符號（文字，例如："$"）
  //priceUnit: string; // 價格單位（文字，例如："/night"）
  image?: string; // 圖片網址（文字，? 表示可有可無）
}

// export：讓其他檔案可以引入這個定義
// interface：定義資料的結構
// ?：表示這個欄位是選填的(可有也可沒有)
