'use client';

// ==================== 飯店卡片組件 ====================
// 顯示單一飯店的卡片，整張卡片都是圖片背景

// 引入需要的東西
import { MapPin, Star } from 'lucide-react'; // 圖示
import { HotelCardData } from '../interfaces/HotelCardData'; // 資料類型

/**
 * HotelCard 組件
 *
 * 功能：
 * - 顯示飯店圖片作為背景
 * - 顯示評分、名稱、位置、價格
 * - 所有文字都在圖片上，有陰影和遮罩確保清晰
 *
 * @param {HotelCardData} hotel - 飯店資料
 */
export default function HotelCard({ hotel }: { hotel: HotelCardData }) {
  // 點擊事件
  const handleClick = () => {
    alert(`你點擊了 ${hotel.name}`);
  };

  return (
    // 最外層容器(卡片本身

    <div
      onClick={handleClick}
      className="
        relative flex-shrink-0
        w-[200px] h-[384px]
        rounded-lg overflow-hidden
        shadow-md hover:shadow-2xl
        transition-all duration-300 transform
        hover:scale-105 cursor-pointer
      "
    >
      {/* ========== 圖片背景層 ========== */}
      <div className="absolute inset-0 bg-gray-400">
        {hotel.image ? (
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
            圖片從後端載入
          </div>
        )}

        {/* 漸層遮罩層 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      {/* ========== 內容層 ========== */}
      <div className="relative h-full flex flex-col justify-between p-4 z-10">
        {/* 頂部：評分 */}
        <div className="flex justify-end">
          <div className="bg-black/70 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm backdrop-blur-sm shadow-lg">
            <Star size={14} color="#D4AF37" fill="#D4AF37" />
            <span className="font-semibold">{hotel.rating}</span>
          </div>
        </div>

        {/* 底部：資訊 */}
        <div className="space-y-5">
          <h3 className="text-white font-bold text-lg drop-shadow-lg text-center h-25 leading-snug flex items-start justify-center">
            {hotel.name}
          </h3>

          <div className="flex items-start gap-2  text-white text-sm mb-0">
            <MapPin
              size={16}
              className="mt-0.5 flex-shrink-0 drop-shadow-lg "
            />
            <div className="drop-shadow-lg">
              <div className="font-medium">{hotel.location}</div>
              <div className="text-xs  text-white/90 mt-0.5">
                {hotel.distance}
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between pt-5 ">
            <div>
              <div className="text-l font-bold text-white drop-shadow-lg">
                {hotel.currency} {hotel.price.toLocaleString()}
              </div>
              <div className="text-xs text-white/80 drop-shadow-lg">
                {hotel.priceUnit}
              </div>
            </div>

            <button className="bg-[#D4A574] hover:bg-[#C69563] text-white font-semibold px-[16px] py-[5px]  rounded-lg text-sm transition-all shadow-lg hover:shadow-xl hover:scale-100 active:scale-90">
              預訂
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
