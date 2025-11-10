'use client';

import { MoveRight } from 'lucide-react';
import { useCallback, useState } from 'react';
import ConfirmDialog from './confirmDialog';

export interface Trip {
  id: string; // 必填：用於 key
  userId: string; // 必填：可以追蹤誰的行程
  title: string; // 必填：行程標題
  destination: string | null; // 選填或 null：行程目的地
  startDate: string; // 必填：開始日期
  startTimezone: string; // 必填：開始日期時區
  displayStartDate: string; //程式給：轉時區的開始日期
  endDate: string; // 必填：結束日期
  endTimezone: string; // 必填：結束日期時區
  displayEndDate: string; //程式給：轉時區的結束日期
  note: string | null; // 選填或 null：備註
  coverImage: string | null; // 選填或 null：封面圖片
  status: string; //程式帶：旅程進行狀態
  collaborators?: any[]; // 選填：合作人列表
  isDeleted?: number; // 選填：是否刪除
  createdAt?: string; // 選填
  updatedAt?: string; // 選填
}

// TripCardProps 直接傳整個 trip
export interface TripCardProps {
  trip: Trip;
}

const STATUS_BACKGROUND_COLORS: Record<string, string> = {
  待啟程: '--sw-grey', // 灰
  進行中: '--sw-accent', // 金
  已結束: '--sw-primary', // 藍
};

const STATUS_TEXT_COLORS: Record<string, string> = {
  待啟程: '--sw-black', // 灰
  進行中: '--sw-black', // 金
  已結束: '--sw-white', // 藍
};

export default function TripCard({ trip }: TripCardProps) {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
  const [isOpenDeletePlan, setIsOpenDeletePlan] = useState(false);

  const handleDelete = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/plans/${trip.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (res.ok) {
        // setIsOpenDeletePlan(false);
        // alert(data.message);
      } else {
        // alert(data.message || '刪除失敗');
      }
    } catch (error) {
      alert(`系統錯誤，請再試一次：${error}`);
    }
  }, [API_BASE, trip.id]);

  return (
    <>
      <div className="rounded-lg bg-ticket py-4 flex">
        {/* 第 1 塊：飛機窗圖片 */}
        <div className="px-4">
          <div className="bg-(--sw-primary) w-20 h-30 rounded-full"></div>
        </div>
        {/* 第 2 塊：行程文字內容 */}
        <div className="flex-1 px-4 flex flex-col">
          {/* 時間與標題 */}
          <div className="flex-1 flex items-start">
            {/* 時間 */}
            <div className="flex-1 flex gap-2">
              {/* 開始 */}
              <div className="flex-1">
                <h6 className="sw-h6">{trip.displayStartDate}</h6>
                <p className="text-[#8b929a] text-xs">{trip.startTimezone}</p>
              </div>
              <div>
                <MoveRight />
              </div>
              {/* 結束 */}
              <div className="flex-1 text-right">
                <h6 className="sw-h6">{trip.displayEndDate}</h6>
                <p className="text-[#8b929a] text-xs">{trip.endTimezone}</p>
              </div>
            </div>
            {/* 標題 */}
            <div className="flex-1">
              <h6 className="sw-h6  ml-10">{trip.title}</h6>
            </div>
          </div>

          {/* 地點 */}
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
          {/* 裝飾 */}
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
          <div
            className="py-2 px-8 rounded-lg"
            style={{
              backgroundColor: `var(${STATUS_BACKGROUND_COLORS[trip.status]})`,
              color: `var(${STATUS_TEXT_COLORS[trip.status]})`,
            }}
          >
            <h6 className="sw-h6">{trip.status}</h6>
          </div>
        </div>
        {/* 第 4 塊：按鈕操作 */}
        <div
          className="px-4 flex items-center gap-2 
                    border-l border-dashed border-(--sw-primary)"
        >
          <button className="sw-btn border border-solid border-(--sw-grey)">
            <h6 className="sw-h6">查看詳細行程</h6>
          </button>
          <button
            className="sw-btn border border-solid border-(--sw-grey)"
            onClick={() => setIsOpenDeletePlan(true)}
          >
            <h6 className="sw-h6">刪除整趟旅程</h6>
          </button>
        </div>
      </div>
      {/* 彈出視窗 / UI 套件：確認是否刪除 */}
      <ConfirmDialog
        open={isOpenDeletePlan}
        onOpenChange={setIsOpenDeletePlan}
        title={'確定要刪除這趟旅程嗎？'}
        description={'整趟旅程及已建立的每日行程細項皆會刪除'}
        confirmText={'確認刪除'}
        onConfirm={handleDelete}
      />
    </>
  );
}
