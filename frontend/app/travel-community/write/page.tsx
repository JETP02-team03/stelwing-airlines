"use client";

import { useState } from "react";
import {
  Book,
  Video,
  Camera,
  Hash,
  Send,
  Eye,
  ImagePlus,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function TravelWritePage() {
  const router = useRouter();
  const [tab, setTab] = useState<"travelogue" | "video" | "photo">("travelogue");

  // 共用狀態
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  // 各別內容狀態
  const [content, setContent] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [photoCaption, setPhotoCaption] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const handleSubmit = () => {
    alert(
      `已送出 ${tab === "travelogue" ? "遊記" : tab === "video" ? "影片" : "隨手拍"}！`
    );
  };

  return (
    <div className="flex bg-[#F8F8F8] min-h-screen text-[#1F2E3C]">
      {/* Sidebar */}
      <aside className="w-[240px] bg-white border-r border-[#BA9A60] flex flex-col p-6 gap-8">
        <div className="text-[#1F2E3C] font-bold text-lg flex items-center gap-2">
          <Book className="text-[#DCBB87]" size={20} />
          開始分享
        </div>
        <nav className="flex flex-col gap-6 text-sm text-[#1F2E3C]/70">
          <a href="#" className="hover:text-[#DCBB87] transition-colors">
            收藏管理
          </a>
          <a href="#" className="hover:text-[#DCBB87] transition-colors">
            發表列表
          </a>
          <a href="#" className="hover:text-[#DCBB87] transition-colors">
            通知列表
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex justify-center py-10">
        <div className="w-[1024px] bg-white border border-[#DCBB87] rounded-lg p-10 shadow-sm relative">
          {/* 🔙 返回按鈕 */}
          <button
            onClick={() => router.push("/travel-community")}
            className="absolute right-10 top-10 flex items-center gap-2 text-sm text-[#1F2E3C]/70 hover:text-[#DCBB87] transition-colors"
          >
            <ArrowLeft size={16} />
            返回分享列表
          </button>

          <h1 className="text-2xl font-bold mb-6 text-[#1F2E3C]">
            {tab === "travelogue"
              ? "發表遊記"
              : tab === "video"
              ? "發表影片"
              : "隨手拍分享"}
          </h1>

          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            {[
              { key: "travelogue", label: "遊記", icon: <Book size={16} /> },
              { key: "video", label: "影片", icon: <Video size={16} /> },
              { key: "photo", label: "隨手拍", icon: <Camera size={16} /> },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key as any)}
                className={`flex items-center gap-2 px-6 py-2 rounded-md border ${
                  tab === t.key
                    ? "bg-[#DCBB87] text-white border-[#DCBB87]"
                    : "border-[#DCBB87] text-[#1F2E3C] hover:bg-[#DCBB87]/10"
                }`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* 共用欄位（標題、標籤） */}
          {(tab === "travelogue" || tab === "video") && (
            <div className="mb-6">
              <label className="block text-sm mb-2 text-[#1F2E3C]/80">標題</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`請輸入${tab === "video" ? "影片" : "文章"}標題`}
                className="w-full border border-[#DCBB87] rounded-md p-3 text-sm focus:ring-1 focus:ring-[#DCBB87] outline-none"
              />
            </div>
          )}

          {(tab === "travelogue" || tab === "video") && (
            <div className="mb-6">
              <label className="block text-sm mb-2 text-[#1F2E3C]/80 flex items-center gap-2">
                <Hash size={16} className="text-[#DCBB87]" /> 標籤
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="請輸入標籤"
                  className="flex-1 border border-[#DCBB87] rounded-md p-2 text-sm focus:ring-1 focus:ring-[#DCBB87] outline-none"
                />
                <button
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-[#DCBB87] text-white rounded-md hover:bg-[#BA9A60]"
                >
                  新增
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm border border-[#DCBB87] rounded-full text-[#1F2E3C]/80"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 📝 遊記 */}
          {tab === "travelogue" && (
            <>
              <div className="mb-6">
                <label className="block text-sm mb-2 text-[#1F2E3C]/80">
                  文章內容
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="今天想寫些什麼..."
                  className="w-full h-[240px] border border-[#DCBB87] rounded-md p-3 text-sm resize-none focus:ring-1 focus:ring-[#DCBB87] outline-none"
                ></textarea>
              </div>

              <div className="mb-6">
                <label className="block text-sm mb-2 text-[#1F2E3C]/80 flex items-center gap-2">
                  <ImagePlus size={16} className="text-[#DCBB87]" /> 上傳圖片
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-[#1F2E3C]/70 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#DCBB87]/10 file:text-[#1F2E3C] hover:file:bg-[#DCBB87]/20"
                />
                {images.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {images.map((img, i) => (
                      <div
                        key={i}
                        className="border border-[#DCBB87] rounded-md h-[120px] flex items-center justify-center text-sm text-[#1F2E3C]/50"
                      >
                        {img.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* 🎥 影片 */}
          {tab === "video" && (
            <>
              <div className="mb-6">
                <label className="block text-sm mb-2 text-[#1F2E3C]/80">
                  影片連結 (YouTube)
                </label>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="請貼上影片連結"
                  className="w-full border border-[#DCBB87] rounded-md p-3 text-sm focus:ring-1 focus:ring-[#DCBB87] outline-none"
                />
                {videoUrl && (
                  <div className="mt-4 aspect-video w-full border border-[#DCBB87] rounded-md overflow-hidden">
                    <iframe
                      src={videoUrl.replace("watch?v=", "embed/")}
                      className="w-full h-full"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </div>
            </>
          )}

          {/* 📸 隨手拍 */}
          {tab === "photo" && (
            <>
              <div className="mb-6">
                <label className="block text-sm mb-2 text-[#1F2E3C]/80">
                  想說些什麼？
                </label>
                <textarea
                  value={photoCaption}
                  onChange={(e) => setPhotoCaption(e.target.value)}
                  placeholder="今天拍到什麼有趣的畫面？"
                  className="w-full h-[120px] border border-[#DCBB87] rounded-md p-3 text-sm resize-none focus:ring-1 focus:ring-[#DCBB87] outline-none"
                ></textarea>
              </div>

              <div className="mb-6">
                <label className="block text-sm mb-2 text-[#1F2E3C]/80">
                  上傳圖片
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-[#1F2E3C]/70 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#DCBB87]/10 file:text-[#1F2E3C] hover:file:bg-[#DCBB87]/20"
                />
                {images.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {images.map((img, i) => (
                      <div
                        key={i}
                        className="border border-[#DCBB87] rounded-md h-[120px] flex items-center justify-center text-sm text-[#1F2E3C]/50"
                      >
                        {img.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-10">
            <button className="flex items-center gap-2 border border-[#DCBB87] text-[#1F2E3C] px-6 py-2 rounded-md hover:bg-[#DCBB87]/10">
              <Eye size={16} /> 預覽
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 bg-[#DCBB87] text-white px-6 py-2 rounded-md hover:bg-[#BA9A60]"
            >
              <Send size={16} /> 送出
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
