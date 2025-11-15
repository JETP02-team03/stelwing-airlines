'use client';

import { ChevronLeft, ChevronRight, Pause, Star } from 'lucide-react';
import Image from 'next/image';

const hotels = [
  {
    id: 'A',
    title: 'Hotel A',
    rating: 4.8,
    img: '/images/hotel/room3.jpeg',
  },
  { id: 'B', title: 'Hotel B', rating: 4.8, img: '/images/hotel/room4.jpeg' },
  // 中間大卡
  {
    id: 'C',
    title: 'Hotel C',
    rating: 4.8,
    img: '/images/hotel/room2.jpeg',
    featured: true,
  },
  { id: 'D', title: 'Hotel D', rating: 4.8, img: '/images/hotel/food1.jpeg' },
  { id: 'E', title: 'Hotel E', rating: 4.8, img: '/images/hotel/food3.jpeg' },
];

const dutyfree = [
  {
    id: 1,
    brand: 'Estee Lauder',
    name: '雅詩蘭黛特潤導入全方位修護露100ML',
    img: '/images/dutyfree/brown.png',
  },
  {
    id: 2,
    brand: 'Estee Lauder',
    name: '雅詩蘭黛特潤導入全方位修護露100ML',
    img: '/images/dutyfree/brown.png',
  },
  {
    id: 3,
    brand: 'Estee Lauder',
    name: '雅詩蘭黛特潤導入全方位修護露100ML',
    img: '/images/dutyfree/brown.png',
  },
  {
    id: 4,
    brand: 'Estee Lauder',
    name: '雅詩蘭黛特潤導入全方位修護露100ML',
    img: '/images/dutyfree/brown.png',
  },
  {
    id: 5,
    brand: 'Estee Lauder',
    name: '雅詩蘭黛特潤導入全方位修護露100ML',
    img: '/images/dutyfree/brown.png',
  },
  {
    id: 6,
    brand: 'Estee Lauder',
    name: '雅詩蘭黛特潤導入全方位修護露100ML',
    img: '/images/dutyfree/brown.png',
  },
];

export default function HomeMain() {
  return (
    <div className="w-full">
      {/* 住宿預訂（卡片內 footer；不再重疊） */}
      <section className="max-w-[1140px] mx-auto px-6 py-12 md:py-16">
        <h2 className="text-center text-xl font-semibold text-[#1F2E3C]">
          住宿預訂
        </h2>

        {/* 三欄比例：左2 / 中3 / 右2；固定列高 330px */}
        <div className="mt-10 grid gap-8 grid-cols-1 md:[grid-template-columns:2fr_3fr_2fr] md:auto-rows-[330px]">
          {/* 小卡模板：請用這個結構 */}
          {/* A：左上 */}
          <article className="group md:col-start-1 md:col-end-2 md:row-start-1 md:h-[330px]">
            <div className="h-full rounded-[14px] border-2 border-[#D9B37B] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col">
              {/* 圖片吃滿剩餘空間 */}
              <div className="relative flex-1">
                <Image
                  src="/images/hotel/room3.jpeg"
                  alt="Hotel A"
                  fill
                  className="object-cover"
                />
              </div>
              {/* 卡片內 footer：標題＋評分 */}
              <div className="px-4 py-3 flex items-center justify-between">
                <p className="text-lg font-semibold text-[#1F2E3C]">Hotel A</p>
                <div className="flex items-center gap-1 text-[#D9B37B]">
                  <Star size={18} className="fill-current" />
                  <span className="text-sm text-[#8A8F98]">4.8</span>
                </div>
              </div>
            </div>
          </article>

          {/* C：中間大卡（跨兩列，總高 = 2*330 + gap(32) = 692px） */}
          <article className="md:col-start-2 md:col-end-3 md:row-start-1 md:row-span-2 md:h-[calc(2*330px+32px)]">
            <div className="h-full rounded-[14px] border-2 border-[#D9B37B] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col">
              <div className="relative flex-1">
                <Image
                  src="/images/hotel/room2.jpeg"
                  alt="Hotel C"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="px-4 py-3 flex items-center justify-between">
                <p className="text-lg md:text-xl font-semibold text-[#1F2E3C]">
                  Hotel C
                </p>
                <div className="flex items-center gap-1 text-[#D9B37B]">
                  <Star size={18} className="fill-current" />
                  <span className="text-sm text-[#8A8F98]">4.8</span>
                </div>
              </div>
            </div>
          </article>

          {/* D：右上 */}
          <article className="group md:col-start-3 md:col-end-4 md:row-start-1 md:h-[330px]">
            <div className="h-full rounded-[14px] border-2 border-[#D9B37B] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col">
              <div className="relative flex-1">
                <Image
                  src="/images/hotel/food1.jpeg"
                  alt="Hotel D"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="px-4 py-3 flex items-center justify-between">
                <p className="text-lg font-semibold text-[#1F2E3C]">Hotel D</p>
                <div className="flex items-center gap-1 text-[#D9B37B]">
                  <Star size={18} className="fill-current" />
                  <span className="text-sm text-[#8A8F98]">4.8</span>
                </div>
              </div>
            </div>
          </article>

          {/* B：左下 */}
          <article className="group md:col-start-1 md:col-end-2 md:row-start-2 md:h-[330px]">
            <div className="h-full rounded-[14px] border-2 border-[#D9B37B] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col">
              <div className="relative flex-1">
                <Image
                  src="/images/hotel/room4.jpeg"
                  alt="Hotel B"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="px-4 py-3 flex items-center justify-between">
                <p className="text-lg font-semibold text-[#1F2E3C]">Hotel B</p>
                <div className="flex items-center gap-1 text-[#D9B37B]">
                  <Star size={18} className="fill-current" />
                  <span className="text-sm text-[#8A8F98]">4.8</span>
                </div>
              </div>
            </div>
          </article>

          {/* E：右下 */}
          <article className="group md:col-start-3 md:col-end-4 md:row-start-2 md:h-[330px]">
            <div className="h-full rounded-[14px] border-2 border-[#D9B37B] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col">
              <div className="relative flex-1">
                <Image
                  src="/images/hotel/food3.jpeg"
                  alt="Hotel E"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="px-4 py-3 flex items-center justify-between">
                <p className="text-lg font-semibold text-[#1F2E3C]">Hotel E</p>
                <div className="flex items-center gap-1 text-[#D9B37B]">
                  <Star size={18} className="fill-current" />
                  <span className="text-sm text-[#8A8F98]">4.8</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* 免稅商品 */}
      <section className="bg-[#233544] text-white py-12 md:py-16">
        <div className="max-w-[1140px] mx-auto px-6">
          <h2 className="text-center text-lg md:text-xl font-semibold">
            免稅商品
          </h2>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {dutyfree.map((p) => (
              <article
                key={p.id}
                className="rounded-2xl overflow-hidden border border-white/10 bg-white/05 backdrop-blur-sm"
              >
                {/* 圖片 */}
                <div className="relative aspect-[16/10]">
                  <Image
                    src={p.img}
                    alt={p.name}
                    fill
                    sizes="(min-width:1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>

                {/* 下方說明區：白色背景 */}
                <div className="p-4 md:p-5 bg-white">
                  {/* 品牌名稱：金色 sw-accent */}
                  <p
                    className="text-sm font-semibold"
                    style={{ color: 'var(--sw-accent)' }}
                  >
                    {p.brand}
                  </p>

                  {/* 商品名稱：深色字 */}
                  <p className="mt-2 text-sm leading-relaxed text-[#1F2E3C]">
                    {p.name}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 圖像型宣傳 Banner */}
      <section className="relative">
        <div className="relative h-[420px] md:h-[520px]">
          <Image
            src="/images/travel1.jpg"
            alt="promo"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          {/* 左側資訊卡 */}
          <div className="absolute left-50 right-auto top-16 md:top-20">
            <div className="mx-6 md:ml-6">
              <div className="w-[300px] md:w-[360px] rounded-2xl bg-[#1F2E3C]/80 text-white p-5 md:p-6 shadow-lg">
                <h3 className="text-lg md:text-xl font-semibold">
                  Book a private jet instantly
                </h3>
                <p className="mt-3 text-sm text-white/85 leading-relaxed">
                  Curly Airline proudly raises the bar and exceeds the standard
                  for luxury and corporate private jet charter services.
                </p>

                <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#D9B37B] px-4 py-2 text-[#1F2E3C] text-sm font-semibold hover:brightness-95">
                  前往文章 <ChevronRight size={16} />
                </button>

                {/* 圓形控制鈕 */}
                <div className="mt-4 flex items-center gap-3">
                  <button
                    aria-label="prev"
                    className="w-9 h-9 grid place-items-center rounded-full bg-white/10 hover:bg-white/15"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    aria-label="play/pause"
                    className="w-9 h-9 grid place-items-center rounded-full bg-white/10 hover:bg-white/15"
                  >
                    <Pause size={18} />
                  </button>
                  <button
                    aria-label="next"
                    className="w-9 h-9 grid place-items-center rounded-full bg-white/10 hover:bg-white/15"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
