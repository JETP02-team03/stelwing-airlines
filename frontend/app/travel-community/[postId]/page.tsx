// app/travel-community/[postId]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import Breadcrumb from "@/app/components/Breadcrumb";
import { Heart, MessageCircle, Share2, ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { mockPosts } from "../data/posts";

// 🔹 簡單留言的型別（demo 用）
interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
  avatar: string;
}

const commentAvatars = [
  "/avatars/avatar1.png",
  "/avatars/avatar2.png",
  "/avatars/avatar3.png",
  "/avatars/avatar4.png",
];

export default function TravelDetailPage() {
  const { postId } = useParams();
  const router = useRouter();

  // 取得對應文章
  const post = mockPosts.find((p) => String(p.id) === String(postId));

  // Demo 用假留言
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "旅人 A",
      content: "好喜歡你拍的動物園視角！",
      createdAt: "2025-11-01",
      avatar: commentAvatars[0],
    },
    {
      id: 2,
      author: "旅人 B",
      content: "下次也想帶家人一起去～",
      createdAt: "2025-11-03",
      avatar: commentAvatars[1],
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return mockPosts
      .filter(
        (p) =>
          p.id !== post.id &&
          (p.type === post.type ||
            p.tags.some((tag) => post.tags.includes(tag))),
      )
      .slice(0, 3);
  }, [post]);

  if (!post) {
    return (
      <main className="space-y-6">
        <Breadcrumb
          items={[
            { label: "首頁", href: "/" },
            { label: "旅遊分享", href: "/travel-community" },
            { label: "文章不存在" },
          ]}
        />
        <div className="p-10 text-center text-gray-500">找不到這篇文章</div>
      </main>
    );
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        author: "你",
        content: newComment.trim(),
        createdAt: new Date().toISOString().slice(0, 10),
        avatar: "/avatars/default.png",
      },
    ]);
    setNewComment("");
  };

  return (
    <main className="space-y-6">
      {/* 麵包屑 */}
      <Breadcrumb
        items={[
          { label: "首頁", href: "/" },
          { label: "旅遊分享", href: "/travel-community" },
          { label: post.title },
        ]}
      />

      {/* 返回按鈕 */}
      <button
        onClick={() => router.push("/travel-community")}
        className="flex items-center gap-2 text-sm text-[#1F2E3C]/70 hover:text-[#DCBB87]"
      >
        <ArrowLeft size={16} />
        返回分享列表
      </button>

      {/* 主體：左內容＋右留言 */}
      <section className="grid grid-cols-12 gap-8">
        {/* 左側內容 */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="rounded-xl overflow-hidden border border-[rgba(31,46,60,0.08)] bg-white shadow-sm">
            <div className="relative w-full pb-[66%] bg-[#1F2E3C]">
              {post.cover && (
                <img
                  src={post.cover}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          <div className="bg-white border border-[rgba(31,46,60,0.08)] rounded-xl p-6 shadow-sm space-y-5">
            <div className="text-xs text-gray-500 flex flex-wrap gap-1">
              {post.location ? `${post.location}｜` : ""}
              {post.type}
            </div>
            <h1 className="text-2xl font-bold text-[#1F2E3C]">{post.title}</h1>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#DCBB87]/40 flex items-center justify-center text-xs font-bold text-[#1F2E3C]">
                  {post.author.slice(0, 2)}
                </div>
                <div>
                  <div className="font-medium">{post.author}</div>
                  <div className="text-xs text-gray-400">發佈於 2025-11-01</div>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                💳 {post.miles.toLocaleString()} 哩程可打賞
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 rounded-full bg-[#DCBB87] text-white py-2 text-sm hover:bg-[#BA9A60] transition">
                <Heart size={16} />
                收藏
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 rounded-full border border-[#DCBB87] text-[#1F2E3C] py-2 text-sm hover:bg-[#DCBB87]/10 transition">
                <Share2 size={16} />
                分享
              </button>
            </div>
          </div>

          <article className="bg-white border border-[rgba(31,46,60,0.08)] rounded-xl p-6 shadow-sm space-y-4 text-[15px] leading-7 text-[#1F2E3C]/80">
            <p>{post.summary}</p>
            <p>
              這裡可放置完整內容，等串接後端 API 時改為顯示實際文章。現在的假資料示範
              {post.tags.slice(0, 2).join("、")} 等熱門標籤，並提供旅人之間的交流空間。
            </p>
            <p>
              也可以補充交通方式、花費明細、建議行程或是注意事項，讓讀者能直接依照文章安排旅程。
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-[var(--sw-primary)]/5 text-[var(--sw-primary)] text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </article>

          {relatedPosts.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#1F2E3C]">
                <span className="text-sm font-semibold tracking-[0.2em] text-[#DCBB87]">
                  MORE
                </span>
                <h3 className="text-xl font-bold">相關分享</h3>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/travel-community/${related.id}`}
                    className="rounded-xl border border-[rgba(31,46,60,0.08)] bg-white shadow-sm overflow-hidden hover:-translate-y-[2px] transition"
                  >
                    <div className="relative w-full h-36 bg-[#1F2E3C]/5">
                      {related.cover && (
                        <img
                          src={related.cover}
                          alt={related.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="p-4 space-y-2">
                      <span className="text-xs text-[#1F2E3C]/60">
                        {related.location}
                      </span>
                      <h4 className="text-sm font-semibold text-[#1F2E3C] line-clamp-2">
                        {related.title}
                      </h4>
                      <p className="text-xs text-[#1F2E3C]/60 line-clamp-2">
                        {related.summary}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 右側留言 */}
        <aside className="col-span-12 lg:col-span-4">
          <div className="bg-white border border-[rgba(31,46,60,0.08)] rounded-xl p-6 shadow-sm lg:sticky lg:top-24">
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle size={18} className="text-[#DCBB87]" />
              <h2 className="text-base font-semibold text-[#1F2E3C]">
                留言區
              </h2>
            </div>

            <div className="mb-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="想對作者說些什麼？"
                className="w-full border border-[#DCBB87] rounded-md p-3 text-sm resize-none focus:ring-1 focus:ring-[#DCBB87] outline-none"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleAddComment}
                  className="px-4 py-2 rounded-md bg-[#DCBB87] text-white text-sm hover:bg-[#BA9A60]"
                >
                  送出留言
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {comments.map((c) => (
                <div key={c.id} className="border-t border-gray-100 pt-3 text-sm">
                  <div className="flex items-start gap-3">
                    <img
                      src={c.avatar}
                      alt={c.author}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-[#1F2E3C]">
                          {c.author}
                        </span>
                        <span className="text-xs text-gray-400">
                          {c.createdAt}
                        </span>
                      </div>
                      <p className="text-[#1F2E3C]/80">{c.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              {comments.length === 0 && (
                <div className="text-xs text-gray-400 text-center">
                  還沒有人留言，成為第一個留言的人吧！
                </div>
              )}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
