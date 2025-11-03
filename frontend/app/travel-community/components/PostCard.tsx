// app/travel-community/components/PostCard.tsx
type PostType = "遊記" | "影片" | "隨手拍";

export interface Post {
  id: string | number;
  title: string;
  author: string;
  miles: number;
  type: PostType;
  cover: string; // /travel-community/xxx.png
  duration?: string; // 影片 0:06
  location?: string; // 臺北市立動物園
}

export default function PostCard({ post }: { post: Post }) {
  const isVideo = post.type === "影片";
  const isPhoto = post.type === "隨手拍";
  const badge = isVideo ? "影片" : isPhoto ? "隨手拍" : "遊記";

  return (
    <article className="mb-5 break-inside-avoid rounded-[12px] border bg-white shadow-sm overflow-hidden">
      {/* 圖片區 */}
      <div className="relative">
        <img
          src={post.cover}
          alt={post.title}
          className="w-full h-auto object-cover"
        />

        {/* 角落標籤 */}
        <div className="absolute left-2 top-2">
          <span className="rounded-full bg-white/80 px-2 py-1 text-[12px]">
            {badge}{isVideo && post.duration ? ` ・ ${post.duration}` : ""}
          </span>
        </div>
      </div>

      {/* 文字區 */}
      <div className="p-3">
        <div className="text-[15px] font-semibold mb-1">
          {post.location ?? ""}{post.location ? "｜" : ""}{post.title}
        </div>

        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
          <div>👤 {post.author}</div>
          <div>💳 {post.miles.toLocaleString()} 哩程</div>
        </div>
      </div>
    </article>
  );
}
