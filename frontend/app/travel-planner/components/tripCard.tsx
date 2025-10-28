'use client';

export interface Trip {
  id: number; // 必填：用於 key
  userId: number; // 必填：可以追蹤誰的行程
  title: string; // 必填：行程標題
  destination: string | null; // 選填或 null：行程目的地
  startDate: string; // 選填或 null：開始日期
  endDate: string; // 選填或 null：結束日期
  note: string | null; // 選填或 null：備註
  coverImage: string | null; // 選填或 null：封面圖片
  collaborators?: any[]; // 選填：合作人列表
  isDeleted?: number; // 選填：是否刪除
  createdAt?: string; // 選填
  updatedAt?: string; // 選填
}

// TripCardProps 直接傳整個 trip
export interface TripCardProps {
  trip: Trip;
}

export default function TripCard({ trip }: TripCardProps) {
  return (
    <>
      <div className="rounded-lg bg-ticket py-4 flex">
        {/* 第 1 塊：飛機窗圖片 */}
        <div className="px-4">
          <div className="bg-(--sw-primary) w-20 h-30 rounded-full"></div>
        </div>
        {/* 第 2 塊：行程文字內容 */}
        <div className="flex-1 px-4 flex flex-col">
          <h6 className="sw-h6">
            {trip.startDate} - {trip.endDate}
          </h6>
          <div className="flex-1">
            <h6 className="sw-h6">{trip.title}</h6>
          </div>
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#dcbb87"
            >
              <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
            </svg>
            <div>{trip.destination}</div>
          </div>
          <div className="flex justify-between pt-1 mt-1 border-t border-solid border-(--sw-grey)">
            <div className="text-[8px] text-(--sw-grey)">BOARDING TIME</div>
            <div className="text-[8px] text-(--sw-grey)">GATE</div>
            <div className="text-[8px] text-(--sw-grey)">SEAT</div>
          </div>
        </div>
        {/* 第 3 塊：行程狀態 */}
        <div
          className="px-4 flex items-center
                    border-l border-dashed border-(--sw-primary)
                    "
        >
          <div className="bg-(--sw-accent) py-2 px-8 rounded-lg">
            <h6 className="sw-h6">待啟程</h6>
          </div>
        </div>
        {/* 第 4 塊：按鈕操作 */}
        <div
          className="px-4 flex items-center gap-2 
                    border-l border-dashed border-(--sw-primary)"
        >
          <button className="border border-solid border-(--sw-grey) py-2 px-8 rounded-lg">
            <h6 className="sw-h6">查看詳細行程</h6>
          </button>
          <button className="border border-solid border-(--sw-grey) py-2 px-8 rounded-lg">
            <h6 className="sw-h6">刪除整個行程</h6>
          </button>
        </div>
      </div>
    </>
  );
}
