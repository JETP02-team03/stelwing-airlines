'use client';

import { useState } from 'react';
import { timezones } from '../src/data/timezone';
// @ts-expect-error 我不寫就跳錯我只好加啊氣死
import { DateTime } from 'luxon';

// export interface CreatePlanFormProps {}
// {}: CreatePlanFormProps

export default function CreatePlanForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    startDate: '',
    startTimezone: '',
    endDate: '',
    endTimezone: '',
    note: '',
    coverImage: '',
  });

  // 功能：監看欄位變化
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 功能：結束日期不得早於開始日期
  const handleStartDateChange = (newStartDate: string) => {
    setFormData((prev) => {
      const correctedEndDate =
        // 如果原本的結束日期已經設定、不是 undefined，而且早於開始日期，則把結束日期改為新的開始日期，如果等於或晚於開始日期就沒問題，使用原本的結束日期
        prev.endDate && prev.endDate < newStartDate
          ? newStartDate
          : prev.endDate;
      return { ...prev, startDate: newStartDate, endDate: correctedEndDate };
    });
  };

  // 功能：表單送出
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // e 是事件物件，這裡指表單的 submit 事件，參數 e 冒號後面都是型別定義，TS 就可以知道 e 有哪些屬性和方法可以使用，而這個 e 是 FormEvrnt 表單事件，事件綁掉的元素一定是 HTMLFormElement <form></form> 標籤元素
    e.preventDefault();

    try {
      // 資料整理：日期轉為帶有時區資料的時間物件格式
      const startDateTime = DateTime.fromISO(formData.startDate, {
        zone: formData.startTimezone,
      }).startOf('day');
      const endDateTime = DateTime.fromISO(formData.endDate, {
        zone: formData.endTimezone,
      }).startOf('day');

      const adjustedData = {
        ...formData,
        startDate: startDateTime.toUTC().toISO(),
        endDate: endDateTime.toUTC().toISO(),
      };

      const res = await fetch(`${API_BASE}/plans`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(adjustedData),
      });

      if (!res.ok) {
        throw new Error(`HTTP 錯誤：${res.status}`);
      }

      const data = await res.json();
      console.log('後端回傳結果', data);
      onSuccess();
    } catch (error) {
      console.log('新增失敗', error);
    }

    console.log('送出的表單資料:', formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pr-3">
        {/* 旅程標題 */}
        <div className="sw-l-input">
          <label htmlFor="title">旅程標題</label>
          <input id="title" name="title" type="text" onChange={handleChange} />
        </div>
        {/* 目的地 */}
        <div className="sw-l-input">
          <label htmlFor="destination">目的地</label>
          <input
            id="destination"
            name="destination"
            type="text"
            onChange={handleChange}
          />
        </div>
        {/* 開始日期及時區 */}
        <div className="flex gap-4">
          <div className="flex-1 sw-l-input">
            <label htmlFor="startDate">開始日期</label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => handleStartDateChange(e.target.value)}
            />
          </div>
          <div className="flex-2 sw-l-input">
            <label htmlFor="startTimezone">開始日期時區</label>
            <select
              id="startTimezone"
              name="startTimezone"
              onChange={handleChange}
            >
              <option value="">選擇時區 ⭣</option>
              {timezones.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.city} {tz.code} - {tz.country}
                </option>
              ))}
            </select>
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
              value={formData.endDate}
              min={formData.startDate || undefined}
              onChange={handleChange}
            />
          </div>
          <div className="flex-2 sw-l-input">
            <label htmlFor="endTimezone">結束日期時區</label>
            <select id="endTimezone" name="endTimezone" onChange={handleChange}>
              <option value="">選擇時區 ⭣</option>
              {timezones.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.city} {tz.code} - {tz.country}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* 備註 */}
        <div className="flex-1 sw-l-input">
          <label htmlFor="startDate">備註 (選填)</label>
          <textarea
            id="note"
            name="note"
            rows={3}
            onChange={handleChange}
          ></textarea>
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
              onChange={handleChange}
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
          <button type="submit" className="sw-btn sw-btn--gold-square">
            確認新增
          </button>
        </div>
      </form>
    </>
  );
}
