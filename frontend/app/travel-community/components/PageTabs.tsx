// app/travel-community/components/PageTabs.tsx
"use client";

import Link from "next/link";
import { Bell, PenSquare, Search } from "lucide-react";
import { countryOptions, PostType } from "../data/posts";

const TABS: PostType[] = ["全部", "遊記", "影片", "隨手拍"];

interface PageTabsProps {
  activeTab: PostType;
  onTabChange: (tab: PostType) => void;
  keyword: string;
  onKeywordChange: (keyword: string) => void;
  country: string;
  onCountryChange: (country: string) => void;
  onSearchSubmit: () => void;
}

export default function PageTabs({
  activeTab,
  onTabChange,
  keyword,
  onKeywordChange,
  country,
  onCountryChange,
  onSearchSubmit,
}: PageTabsProps) {
  return (
    <div className="w-full rounded-[12px] bg-white border border-[rgba(45,64,87,0.1)] shadow-sm">
      <div className="flex flex-wrap items-center gap-3 lg:flex-nowrap p-4">
        {/* 國家下拉 */}
        <div className="relative flex-shrink-0">
          <select
            className="h-10 rounded-full border px-4 pr-8 text-sm"
            value={country}
            onChange={(e) => onCountryChange(e.target.value)}
            aria-label="選擇國家"
          >
            {countryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* 搜尋 */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearchSubmit();
          }}
          className="flex items-center flex-1 min-w-[220px] max-w-[360px]"
        >
          <div className="relative flex w-full">
            <input
              className="w-full h-10 pl-10 pr-4 rounded-full border text-sm"
              placeholder="搜尋旅遊內容..."
              value={keyword}
              onChange={(e) => onKeywordChange(e.target.value)}
            />
            <button
              type="submit"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--sw-primary)]"
              aria-label="搜尋"
            >
              <Search size={18} />
            </button>
          </div>
        </form>

        {/* 分類 Tabs + 右側動作 */}
        <div className="flex flex-1 min-w-[280px] items-center gap-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => onTabChange(t)}
                className={`h-10 rounded-full px-5 text-sm whitespace-nowrap transition
                  ${activeTab === t ? "bg-[var(--sw-accent)] text-black" : "bg-white border"}`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0 ml-auto">
            <button
              type="button"
              className="relative w-12 h-12 rounded-full border border-[var(--sw-accent)] bg-white flex items-center justify-center text-[var(--sw-accent)] hover:bg-[var(--sw-accent)]/10 transition"
              aria-label="查看旅遊通知"
            >
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#FF4D4F] border-2 border-white"></span>
            </button>

            <Link
              href="/travel-community/write"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--sw-accent)] text-black text-sm font-semibold px-5 h-12 shadow-[0_8px_20px_rgba(220,187,135,0.35)] hover:bg-[var(--sw-accent)]/90 transition"
              aria-label="撰寫旅遊分享"
            >
              <PenSquare size={16} />
              撰寫分享
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
