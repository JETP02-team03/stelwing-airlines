// app/travel-community/components/PageTabs.tsx
"use client";

import { useState } from "react";

const TABS = ["全部", "遊記", "影片", "隨手拍", "🎎 篩選"];

export default function PageTabs() {
  const [active, setActive] = useState("全部");

  return (
    <div className="w-full rounded-[12px] bg-white border border-[rgba(45,64,87,0.1)] shadow-sm">
      <div className="flex flex-wrap items-center gap-3 p-4">
        {/* 國家下拉 */}
        <div className="relative">
          <select
            className="h-10 rounded-full border px-4 pr-8 text-sm"
            defaultValue=""
            aria-label="選擇國家"
          >
            <option value="">全部國家</option>
            <option value="TW">台灣</option>
            <option value="JP">日本</option>
            <option value="KR">韓國</option>
          </select>
        </div>

        {/* 搜尋 */}
        <div className="flex-1 min-w-[220px]">
          <div className="relative">
            <input
              className="w-full h-10 pl-10 pr-4 rounded-full border text-sm"
              placeholder="搜尋旅遊內容..."
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#DCBB87]">🔍</span>
          </div>
        </div>

        {/* 分類 Tabs（吃滿整列、層級屬於整頁） */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`h-10 rounded-full px-5 text-sm whitespace-nowrap transition
                ${active === t ? "bg-[var(--sw-accent)] text-black" : "bg-white border"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
