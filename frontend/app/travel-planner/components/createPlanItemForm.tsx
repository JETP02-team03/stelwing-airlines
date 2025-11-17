'use client';

import { useState } from 'react';
import { timezones } from '../src/data/timezone';
// @ts-expect-error 我不寫就跳錯我只好加啊氣死
import { DateTime } from 'luxon';
import { Trip } from '../types';
import { apiFetch } from '../utils/apiFetch';
import AlertDialogBox from './alertDialog/alertDialogBox';
import { useAlertDialog } from './alertDialog/useAlertDialog';

// export interface CreatePlanFormProps {}
// {}: CreatePlanFormProps

export default function CreatePlanItemForm({
  tripId,
  onSuccess,
}: {
  tripId: string;
  onSuccess: (newTripId: string) => void;
}) {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
  const { alert, showAlert } = useAlertDialog();
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    allDay: false,
    startTime: '',
    startTimezone: '',
    endTime: '',
    endTimezone: '',
    note: '',
    locationTextchar: '',
    locationUrl: '',
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
  const handleStartTimeChange = (newStartTime: string) => {
    setFormData((prev) => {
      const correctedEndTime =
        // 如果原本的結束日期已經設定、不是 undefined，而且早於開始日期，則把結束日期改為新的開始日期，如果等於或晚於開始日期就沒問題，使用原本的結束日期
        prev.endTime && prev.endTime < newStartTime
          ? newStartTime
          : prev.endTime;
      return { ...prev, startTime: newStartTime, endTime: correctedEndTime };
    });
  };

  // 功能：表單送出
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // e 是事件物件，這裡指表單的 submit 事件，參數 e 冒號後面都是型別定義，TS 就可以知道 e 有哪些屬性和方法可以使用，而這個 e 是 FormEvrnt 表單事件，事件綁掉的元素一定是 HTMLFormElement <form></form> 標籤元素
    e.preventDefault();

    try {
      // 資料整理：日期轉為帶有時區資料的時間物件格式
      const startDateTime = DateTime.fromISO(formData.startTime, {
        zone: formData.startTimezone,
      });
      const endDateTime = DateTime.fromISO(formData.endTime, {
        zone: formData.endTimezone,
      });

      const adjustedData = {
        ...formData,
        startTime: startDateTime.toUTC().toISO(),
        endTime: endDateTime.toUTC().toISO(),
      };

      const data = await apiFetch<Trip>(
        `http://localhost:3007/api/plans/${tripId}/items`,
        {
          // const data = await apiFetch(`${API_BASE}/plans`, {
          method: 'POST',
          body: JSON.stringify(adjustedData),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      showAlert({
        title: '新增成功',
        description: '點擊確認跳轉行程規劃頁面',
        confirmText: '確認',
        onConfirm: () => onSuccess(data.id),
      });
    } catch (err: any) {
      showAlert({
        title: '新增失敗',
        description: err.message || '請稍後再試',
        confirmText: '確認',
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pr-3">
        {/* 旅程標題 */}
        <div className="sw-l-input">
          <label htmlFor="title">行程標題</label>
          <input id="title" name="title" type="text" onChange={handleChange} />
        </div>

        {/* 開始日期及時區 */}
        <div className="flex gap-4">
          <div className="flex-1 sw-l-input">
            <label htmlFor="startTime">開始日期</label>
            <input
              id="startTime"
              name="startTime"
              type="datetime-local"
              value={formData.startTime}
              onChange={(e) => handleStartTimeChange(e.target.value)}
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
            <label htmlFor="endTime">結束日期</label>
            <input
              id="endTime"
              name="endTime"
              type="datetime-local"
              value={formData.endTime}
              min={formData.startTime || undefined}
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
        {/* 純文字地址 */}
        <div className="sw-l-input">
          <label htmlFor="locationTextchar">地址：純文字 (選填)</label>
          <input
            id="locationTextchar"
            name="locationTextchar"
            type="text"
            onChange={handleChange}
          />
        </div>
        {/* 連結地址 */}
        <div className="sw-l-input">
          <label htmlFor="locationUrl">地址：Google Map 連結 (選填)</label>
          <input
            id="locationUrl"
            name="locationUrl"
            type="text"
            onChange={handleChange}
          />
        </div>
        {/* 儲存按鈕 */}
        <div className="flex justify-end">
          <button type="submit" className="sw-btn sw-btn--gold-square">
            確認新增
          </button>
        </div>
      </form>
      {/* 彈出視窗 / 整包套件：刪除結果訊息 */}
      {alert.open && <AlertDialogBox alert={alert} />}
    </>
  );
}
