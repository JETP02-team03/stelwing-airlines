// app/travel-community/components/Masonry.tsx
"use client";

import PostCard, { Post } from "./PostCard";

// ⚠ 把你的圖片放到 /public/travel-community/ 下，檔名用你壓縮檔的即可
const posts: Post[] = [
  {
    id: 1,
    title: "臺北市立動物園探訪",
    author: "徒步阿德",
    miles: 1500,
    type: "影片",
    cover: "/travel-community/490316eca0afb5d0e709aaa3731216313a473821.png",
    duration: "0:06",
    location: "臺北市立動物園",
  },
  {
    id: 2,
    title: "寺廟與市井",
    author: "徠步阿德",
    miles: 1500,
    type: "遊記",
    cover: "/travel-community/a885306d896c3658dcd722f3cb4bf1de66900578.png",
    location: "臺北市立動物園",
  },
  {
    id: 3,
    title: "市場街拍",
    author: "徠步阿德",
    miles: 1500,
    type: "隨手拍",
    cover: "/travel-community/3bb90f73891e7f9796828144d84e6e144fa45f53.png",
    location: "臺北市立動物園",
  },
  {
    id: 4,
    title: "親子嘉年華",
    author: "徠步阿德",
    miles: 1500,
    type: "影片",
    cover: "/travel-community/7730ca546b6dce767d75cf8bd7ffca372808d05c.png",
    duration: "0:06",
    location: "臺北市立動物園",
  },
  {
    id: 5,
    title: "教堂穹頂",
    author: "徒步阿德",
    miles: 1500,
    type: "遊記",
    cover: "/travel-community/32b1772ed86c96aa1ddf11d0f6a1c218def05a4c.png",
    location: "臺北市立動物園",
  },
  {
    id: 6,
    title: "動物園日常",
    author: "徒步阿德",
    miles: 1500,
    type: "隨手拍",
    cover: "/travel-community/fd6ff7b2e620c8d459330b3e2e43e55291d031ea.png",
    location: "臺北市立動物園",
  },
  {
    id: 7,
    title: "街邊攤位",
    author: "徒步阿德",
    miles: 1500,
    type: "隨手拍",
    cover: "/travel-community/6bae12d15af11f9404a862238ae2380681f4fc02.png",
    location: "臺北市立動物園",
  },
];

export default function Masonry() {
  return (
    <div
      className="
        columns-1
        sm:columns-2
        lg:columns-3
        2xl:columns-4
        gap-5
      "
    >
      {posts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  );
}
