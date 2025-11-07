// app/travel-community/components/PostCard.tsx
"use client";

import { useState } from "react";

export interface Post {
  id: string | number;
  title: string;
  author: string;
  miles: number;
  type: "遊記" | "影片" | "隨手拍";
  cover?: string;
  duration?: string;
  location?: string;
}

export default function PostCard({ post }: { post: Post }) {
  const [error, setError] = useState(false);
  const badge = post.type;
  const isVideo = post.type === "影片";

  return (
    <article
      className="
        mb-[18px]
        break-inside-avoid
        rounded-[var(--sw-r-lg)]
        border border-[rgba(31,46,60,0.08)]
        bg-white shadow-sm overflow-hidden
      "
    >
      {/* 圖片 / fallback 區 */}
      <div className="relative w-full pb-[140%] rounded-[var(--sw-r-lg)] overflow-hidden bg-[var(--sw-primary)]">
        {!error && post.cover && (
          <img
            src={post.cover}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setError(true)}
          />
        )}

        {/* fallback（品牌感佔位） */}
        {(!post.cover || error) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <div className="w-2/3 h-[2px] bg-[var(--sw-accent)] mb-3 rounded-full opacity-80" />
            <span className="text-[var(--sw-white)] font-bold text-[14px] tracking-wider uppercase">
              No Image
            </span>
            <div className="flex gap-[3px] mt-3">
              <div className="w-1 h-1 bg-[var(--sw-accent)] rounded-full"></div>
              <div className="w-1 h-1 bg-[var(--sw-accent)] rounded-full"></div>
              <div className="w-1 h-1 bg-[var(--sw-accent)] rounded-full"></div>
            </div>
          </div>
        )}

        {/* 類型標籤 */}
        <div className="absolute left-2 top-2">
          <span
            className="
              rounded-full bg-white/85 backdrop-blur
              px-2 py-1 text-[11px] font-semibold
            "
          >
            {badge}
            {isVideo && post.duration ? `・${post.duration}` : ""}
          </span>
        </div>
      </div>

      {/* 文字內容 */}
      <div className="p-3">
        <div className="sw-h6 mb-1 leading-tight">
          {post.location ? `${post.location}｜` : ""}
          {post.title}
        </div>

        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
          <div>👤 {post.author}</div>
          <div>💳 {post.miles.toLocaleString()} 哩程</div>
        </div>
      </div>
    </article>
  );
}
