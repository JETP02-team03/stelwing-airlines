'use client';

import FlightSearchCard from './components/FlightSearchCard';

// export type AppPageProps = object;

export default function AppPage() {
  return (
    <main className="flex flex-col items-center">
      {/* Hero Banner */}
      <section className="relative w-full h-[393px] bg-[#1F2E3C] text-white flex justify-center">
        <div className="w-[1140px] flex items-center justify-between">
          {/* 左側文案 / 右側圖片略 */}
        </div>

        {/* 直接掛在 banner 下緣 */}
        <div className="absolute -bottom-[156px] w-full flex justify-center">
          <FlightSearchCard
            onSubmit={(values) => {
              // 這裡你可以導向搜尋結果頁 or 呼叫 API
              console.log('search submit:', values);
              // e.g. router.push(`/search?${new URLSearchParams({...})}`)
            }}
            initialValues={{
              tripType: 'roundtrip',
              origin: 'TPE',
              destination: 'NRT',
              cabinClass: 'Business',
            }}
          />
        </div>
      </section>
      {/* 後續內容… */}
      <section className="h-[160px]" /> {/* 讓出絕對定位高度 */}
    </main>
  );
}
