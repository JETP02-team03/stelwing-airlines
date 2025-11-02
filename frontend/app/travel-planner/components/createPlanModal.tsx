'use client';

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CreatePlanModal({ onClose }: { onClose: () => void }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    // 在元件首次渲染後，將超過視窗範圍的內容都 hidden，不能滾動
    document.body.style.overflow = 'hidden';

    // 清理副作用：當元件要卸載，或是元件要再一次重新渲染前執行，就進行以下函式
    return () => {
      document.body.style.overflow = '';
    };
  }, []); // 在元件首次渲染後執行

  return (
    <>
      {/* 黑底遮罩 */}
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        {/* 彈出視窗 */}
        <div className="w-[600px] h-[600px] bg-white rounded-lg pl-6 pr-3 py-6 bg-ticket flex flex-col relative ">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-2 right-3 rounded-full bg-white p-1 transition-colors cursor-pointer hover:bg-(--sw-accent)"
          >
            <X />
          </button>
          <h5 className="sw-h5 mb-3">新增旅程</h5>
          <form action="" className="flex-1 overflow-y-auto pr-3">
            {/* 旅程標題 */}
            <div className="sw-l-input">
              <label htmlFor="title">旅程標題</label>
              <input id="title" name="title" type="text" />
            </div>
            {/* 目的地 */}
            <div className="sw-l-input">
              <label htmlFor="destination">目的地</label>
              <input id="destination" name="destination" type="text" />
            </div>
            {/* 開始日期及時區 */}
            <div className="flex gap-4">
              <div className="flex-1 sw-l-input">
                <label htmlFor="startDate">開始日期</label>
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="flex-2 sw-l-input">
                <label htmlFor="startTimezone">開始日期時區</label>
                {/* <input id="startTimezone" name="startTimezone" type="date" /> */}
              </div>
            </div>
            {/* 結束日期及時區 */}
            <div className="flex gap-4">
              <div className="flex-1 sw-l-input">
                <label htmlFor="endDate">結束日期</label>
                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate || undefined}
                />
              </div>
              <div className="flex-2 sw-l-input">
                <label htmlFor="endTimezone">結束日期時區</label>
                {/* <input id="startTimezone" name="startTimezone" type="date" /> */}
              </div>
            </div>
            {/* 備註 */}
            <div className="flex-1 sw-l-input">
              <label htmlFor="startDate">備註 (選填)</label>
              <textarea id="note" name="note" rows={3}></textarea>
            </div>
            {/* 封面照片 */}
            <div className="flex gap-4">
              <div className="flex-1 sw-l-input">
                <label htmlFor="coverImage">
                  封面照片 (選填：支援 jpg / png，大小上限 5MB)
                </label>
                <input
                  id="coverImage"
                  name="coverImage"
                  type="text"
                  readOnly
                  placeholder="使用預設圖片"
                  value=""
                />
              </div>
              <div className="mb-[28px] flex items-end">
                <button
                  className="px-2 py-1 border border-solid border-(--sw-grey) rounded-md"
                  disabled
                >
                  選擇檔案
                </button>
              </div>
            </div>
            {/* 儲存按鈕 */}
            <div className="flex justify-end">
              <button className="sw-btn sw-btn--gold-square">確認新增</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
