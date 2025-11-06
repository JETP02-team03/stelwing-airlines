'use client';

import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Trash2 } from 'lucide-react';

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
            {trip.displayStartDate}{' '}
            <span className="text-[#8b929a] text-xs">{trip.startTimezone}</span>{' '}
            - {trip.displayEndDate}{' '}
            <span className="text-[#8b929a] text-xs">{trip.endTimezone}</span>
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
          {/* 刪除按鈕：使用 UI 套件 */}
          <AlertDialog.Root>
            {/* Trigger：觸發彈出視窗的按紐 */}
            {/* asChild：如果有下，裡面包一個 button div，如果沒下，直接寫文字，元件會幫忙生成 button */}
            <AlertDialog.Trigger asChild>
              <button className="sw-btn border border-solid border-(--sw-grey)">
                <h6 className="sw-h6">刪除整趟旅程</h6>
              </button>
            </AlertDialog.Trigger>
            {/* Portal：入口網站的意思，所有要談出的內容及畫面，會傳送到 body 層，讓內容保證蓋在所有內容最上層 */}
            <AlertDialog.Portal>
              {/* Overlay：蓋掉畫面的半透明層，目前一樣設定為固定位置、佔滿全畫面、黑色半透明 50% */}
              <AlertDialog.Overlay className="fixed inset-0 bg-black/50" />
              {/* Content：彈出視窗本體，目前設定：固定位置、置中畫面、背景白色、padding-6、圓角 */}
              <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg flex overflow-hidden">
                <div className="bg-[#a52422] p-3 text-white">
                  <Trash2 />
                </div>
                <div className="p-6">
                  {/* Title：彈出視窗標題 */}
                  <AlertDialog.Title className="text-lg font-bold">
                    確定要刪除這趟旅程嗎？
                  </AlertDialog.Title>
                  {/* Description：描述 */}
                  <AlertDialog.Description className="mt-2 text-sm text-(--sw-gray)">
                    整趟旅程及已建立的每日行程細項皆會刪除
                  </AlertDialog.Description>
                  {/* 自己用 div 把按鈕包成一包 */}
                  <div className="mt-8 flex justify-end gap-2">
                    {/* Cancel：取消操作 */}
                    <AlertDialog.Cancel className="sw-btn">
                      取消
                    </AlertDialog.Cancel>
                    {/* Action：執行操作 */}
                    <AlertDialog.Action
                      className="sw-btn sw-btn--red-square"
                      onClick={() => console.log('刪除按鈕被點擊')}
                    >
                      確認刪除
                    </AlertDialog.Action>
                  </div>
                </div>
              </AlertDialog.Content>
            </AlertDialog.Portal>
          </AlertDialog.Root>
        </div>
      </div>
    </>
  );
}
