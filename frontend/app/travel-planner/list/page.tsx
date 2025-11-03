'use client';

import TripCard from '../components/tripCard';
// export interface ListPageProps {}

export default function ListPage() {
  const mockTrips = [
    {
      id: 1,
      userId: 123,
      title: '巴黎浪漫七日遊',
      destination: 'France - Paris',
      startDate: '2025-10-20T09:00:00Z',
      endDate: '2025-10-26T18:00:00Z',
      note: '巴黎鐵塔、羅浮宮、凡爾賽宮都要走一遍，\n記得帶雨具，天氣可能多變。',
      coverImage: '',
      collaborators: [],
      isDeleted: 0,
      createdAt: '2025-10-01T12:00:00Z',
      updatedAt: '2025-10-01T12:00:00Z',
    },
    {
      id: 2,
      userId: 123,
      title: '紐約城市探索',
      destination: 'USA - New York',
      startDate: '2025-11-05T09:00:00Z',
      endDate: '2025-11-12T18:00:00Z',
      note: '自由女神像、第五大道購物、百老匯音樂劇。\n地鐵複雜，建議事先查好路線。',
      coverImage: '',
      collaborators: [],
      isDeleted: 0,
      createdAt: '2025-10-01T12:00:00Z',
      updatedAt: '2025-10-01T12:00:00Z',
    },
    {
      id: 3,
      userId: 123,
      title: '東京深度旅遊',
      destination: 'Japan - Tokyo',
      startDate: '2025-10-25T09:00:00Z',
      endDate: '2025-10-31T18:00:00Z',
      note: '淺草寺、秋葉原、銀座購物、涉谷拍照打卡，\n每晚嘗試不同拉麵店。',
      coverImage: '',
      collaborators: [],
      isDeleted: 0,
      createdAt: '2025-10-01T12:00:00Z',
      updatedAt: '2025-10-01T12:00:00Z',
    },
    {
      id: 4,
      userId: 123,
      title: '倫敦週末快閃',
      destination: 'UK - London',
      startDate: '2025-10-18T09:00:00Z',
      endDate: '2025-10-20T18:00:00Z',
      note: '倫敦眼、大笨鐘、泰晤士河遊船，\n行程緊湊，需提早訂票。',
      coverImage: '',
      collaborators: [],
      isDeleted: 0,
      createdAt: '2025-10-01T12:00:00Z',
      updatedAt: '2025-10-01T12:00:00Z',
    },
    {
      id: 5,
      userId: 123,
      title: '巴塞隆納美食藝術之旅',
      destination: 'Spain - Barcelona',
      startDate: '2025-10-10T09:00:00Z',
      endDate: '2025-10-15T18:00:00Z',
      note: '高第建築巡禮，拉巴爾街小吃品嚐。\n注意小偷與貴重物品安全。',
      coverImage: '',
      collaborators: [],
      isDeleted: 0,
      createdAt: '2025-10-01T12:00:00Z',
      updatedAt: '2025-10-01T12:00:00Z',
    },
    {
      id: 6,
      userId: 123,
      title: '羅馬古蹟漫遊',
      destination: 'Italy - Rome',
      startDate: '2025-09-28T09:00:00Z',
      endDate: '2025-10-02T18:00:00Z',
      note: '鬥獸場、萬神殿、梵蒂岡博物館。\n每個景點建議提前買票。',
      coverImage: '',
      collaborators: [],
      isDeleted: 0,
      createdAt: '2025-10-01T12:00:00Z',
      updatedAt: '2025-10-01T12:00:00Z',
    },
    {
      id: 7,
      userId: 123,
      title: '阿姆斯特丹運河遊',
      destination: 'Netherlands - Amsterdam',
      startDate: '2025-10-01T09:00:00Z',
      endDate: '2025-10-05T18:00:00Z',
      note: '運河船遊、梵谷博物館、咖啡館巡禮。\n行程悠閒，可慢慢拍照打卡。',
      coverImage: '',
      collaborators: [],
      isDeleted: 0,
      createdAt: '2025-10-01T12:00:00Z',
      updatedAt: '2025-10-01T12:00:00Z',
    },
    {
      id: 8,
      userId: 123,
      title: '悉尼海港假期',
      destination: 'Australia - Sydney',
      startDate: '2025-10-12T09:00:00Z',
      endDate: '2025-10-16T18:00:00Z',
      note: '歌劇院、海港大橋、邦迪海灘。\n記得準備防曬用品，海風可能很強。',
      coverImage: '',
      collaborators: [],
      isDeleted: 0,
      createdAt: '2025-10-01T12:00:00Z',
      updatedAt: '2025-10-01T12:00:00Z',
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center px-16 py-8 gap-6 w-full">
        <h5 className="sw-h5">行程規劃</h5>
        <section
          className="flex-1 border border-solid border-black rounded-2xl
          w-full flex flex-col
          overflow-hidden"
        >
          <div className="p-4">search！</div>
          {/* 行程列表區*/}
          <div className="flex-1 p-10 bg-(--sw-primary)">
            <nav></nav>
            <div className="">
              <div>
                <button className="sw-btn sw-btn--gold-square">
                  <h6>建立新行程</h6>
                </button>
              </div>
              <div className="py-6 flex flex-col gap-6">
                {/* 單一卡片 */}
                {mockTrips.map((t) => (
                  // 關鍵：一定要給 key（即使不傳資料也要 key）
                  <TripCard key={t.id} trip={t} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
