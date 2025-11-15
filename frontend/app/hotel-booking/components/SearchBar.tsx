'use client';

import { Calendar as CalendarIcon, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Calendar, { DateRange } from './Calendar';

// 修正 1: 更新 SearchBarProps 介面，以接受 Page.tsx 傳入的屬性
interface SearchBarProps {
  selectedRange?: DateRange;
  onDateChange?: (range: DateRange | undefined) => void;
  // 新增 Guests 和 Rooms 相關屬性
  guests: number; // 注意：Page.tsx 使用 guests，所以這裡使用 guests 而非 adults
  onGuestsChange: (newGuests: number) => void;
  rooms: number;
  onRoomsChange: (newRooms: number) => void;
}

export default function SearchBar({
  selectedRange,
  onDateChange,
  // 修正 2: 在解構中接收 guests, onGuestsChange, rooms, onRoomsChange
  guests,
  onGuestsChange,
  rooms,
  onRoomsChange,
}: SearchBarProps) {
  const router = useRouter();
  const [showCalendar, setShowCalendar] = useState(false);
  const [showGuestPicker, setShowGuestPicker] = useState(false);

  // 修正 3: 移除內部關於 adults/rooms 的 useState，因為它們現在由 props 控制
  // 已經通過 props 接收：const [adults, setAdults] = useState(2);
  // 已經通過 props 接收：const [rooms, setRooms] = useState(1);

  const formatDate = (date: Date | undefined, placeholder: string) => {
    if (!date) return placeholder;
    // 雖然這裡使用了 toLocaleString，但在 Next.js 頁面中，這通常不會造成 hydration error，
    // 因為這是在 'use client' 組件中，且只在客戶端渲染時才真正運行。
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  const handleDateSelect = (range: DateRange | undefined) => {
    if (onDateChange) onDateChange(range);
  };

  // 🌟 搜尋按鈕事件：帶參數跳轉
  const handleSearch = () => {
    if (!selectedRange?.from || !selectedRange?.to) {
      alert('請選擇入住與退房日期');
      return;
    }

    const checkin = selectedRange.from.toISOString().split('T')[0];
    const checkout = selectedRange.to.toISOString().split('T')[0];

    // 修正 4: 使用傳入的 guests 屬性 (來自 Page.tsx)
    router.push(
      `/hotel-booking/search?checkin=${checkin}&checkout=${checkout}&adults=${guests}&rooms=${rooms}`
    );
  };

  return (
    <>
      <div className="text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-center text-xl mb-8 font-medium">
            提尋機場內及周邊 1 公里內的優質住宿
          </h1>

          {/* 搜尋欄 */}
          <div className="flex flex-wrap justify-center gap-3 py-4 relative">
            {/* 日期區 (保持不變) */}
            <div className="flex items-center bg-white rounded-lg gap-0 overflow-hidden">
              {/* Check in */}
              <button
                className="bg-white text-gray-800 px-6 w-[180px] py-[10px] flex items-center justify-start gap-3 hover:bg-gray-50 transition-colors"
                onClick={() => setShowCalendar(true)}
              >
                <CalendarIcon size={20} className="text-gray-600" />
                <span className="font-medium truncate">
                  {formatDate(selectedRange?.from, 'Check in')}
                </span>
              </button>

              <div className="w-[1px] h-6 bg-gray-400 mx-0.5"></div>

              {/* Check out */}
              <button
                className="bg-white text-gray-800 px-6 w-[180px] py-[10px] flex items-center justify-start gap-3 hover:bg-gray-50 transition-colors"
                onClick={() => setShowCalendar(true)}
              >
                <CalendarIcon size={20} className="text-gray-600" />
                <span className="font-medium truncate">
                  {formatDate(selectedRange?.to, 'Check out')}
                </span>
              </button>
            </div>

            {/* 人數/房間 */}
            <button
              className="bg-white text-gray-800 px-6 py-[10px] rounded-lg flex items-center gap-3 hover:bg-gray-50 transition-colors min-w-[180px]"
              onClick={() => setShowGuestPicker(!showGuestPicker)}
            >
              <Users size={20} className="text-gray-600" />
              {/* 修正 5: 顯示傳入的 guests 屬性 */}
              <span className="font-medium">
                {guests} Adults / {rooms} room
              </span>
            </button>

            {/* 人數選擇器彈窗 */}
            {showGuestPicker && (
              <div className="absolute top-[70px] right-0 bg-white text-gray-800 rounded-lg shadow-lg p-4 z-50 w-[220px]">
                {/* 成人 */}
                <div className="flex justify-between items-center mb-2">
                  <span>成人</span>
                  <div className="flex items-center gap-2">
                    <button
                      // 修正 6: 使用 onGuestsChange 更新外部狀態
                      onClick={() => onGuestsChange(Math.max(1, guests - 1))}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{guests}</span>
                    <button
                      // 修正 7: 使用 onGuestsChange 更新外部狀態
                      onClick={() => onGuestsChange(guests + 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* 房間 */}
                <div className="flex justify-between items-center mb-2">
                  <span>房間</span>
                  <div className="flex items-center gap-2">
                    <button
                      // 修正 8: 使用 onRoomsChange 更新外部狀態
                      onClick={() => onRoomsChange(Math.max(1, rooms - 1))}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{rooms}</span>
                    <button
                      // 修正 9: 使用 onRoomsChange 更新外部狀態
                      onClick={() => onRoomsChange(rooms + 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex justify-end mt-3">
                  <button
                    onClick={() => setShowGuestPicker(false)}
                    className="px-4 py-1 bg-[#D4A574] text-white rounded-full hover:bg-[#C69563] transition-colors"
                  >
                    確認
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 搜尋按鈕 */}
          <div className="w-full flex justify-center mt-2">
            <button
              onClick={handleSearch}
              className="bg-[#D4A574] hover:bg-[#C69563] text-white font-semibold px-8 py-1 rounded-full transition-all hover:shadow-lg active:scale-95"
            >
              搜尋
            </button>
          </div>
        </div>
      </div>

      {/* 日曆彈窗 (保持不變) */}
      {showCalendar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowCalendar(false)}
          />
          <div className="relative bg-white rounded-lg p-5 shadow-2xl max-w-4xl w-full z-10">
            <button
              onClick={() => setShowCalendar(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl w-8 h-8 flex items-center justify-center z-20"
            >
              ×
            </button>
            <Calendar selected={selectedRange} onSelect={handleDateSelect} />
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowCalendar(false)}
                className="px-6 py-1 border-2 border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => setShowCalendar(false)}
                className="px-6 py-1 bg-[#D4A574] hover:bg-[#C69563] text-white rounded-full transition-colors"
              >
                確認
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        :root {
          --calendar-primary: #a88352;
          --calendar-selected: #a88352;
          --calendar-muted: #bfa789;
          --calendar-range: rgba(168, 131, 82, 0.15);
          --calendar-past: #cccccc;
        }
      `}</style>
    </>
  );
}
