'use client';

// @ts-expect-error 我不寫就跳錯我只好加啊氣死
import { DateTime } from 'luxon';
import TripCard from '../components/tripCard';
// export interface ListPageProps {}

export default function ListPage() {
  const mockTrips = [
    {
      id: '1',
      userId: '1',
      title: '12 月東京旅：一般',
      destination: '日本：東京、輕井澤、富士山、鐮倉',
      startDate: '2025-12-12T00:00:00.000Z',
      startTimezone: 'Asia/Taipei',
      endDate: '2025-12-27T00:00:00.000Z',
      endTimezone: 'Asia/Taipei',
      note: '',
      coverImage: '',
      isDeleted: 0,
      createdAt: '2025-10-30T07:35:38.608Z',
      updatedAt: '2025-10-30T07:35:38.608Z',
    },
    {
      id: '2',
      userId: '1',
      title: '12 月東京旅：雨備',
      destination: '日本：東京、輕井澤、富士山、鐮倉',
      startDate: '2025-12-12T00:00:00.000Z',
      startTimezone: 'Asia/Taipei',
      endDate: '2025-12-27T00:00:00.000Z',
      endTimezone: 'Asia/Taipei',
      note: '雨天就去迪士尼',
      coverImage: '',
      isDeleted: 0,
      createdAt: '2025-10-30T07:35:38.608Z',
      updatedAt: '2025-10-30T07:35:38.608Z',
    },
    {
      id: '3',
      userId: '1',
      title: '加拿大躲熊熊',
      destination: '溫哥華',
      startDate: '2025-10-31T00:00:00.000Z',
      startTimezone: 'America/Vancouver',
      endDate: '2025-11-05T00:00:00.000Z',
      endTimezone: 'America/Vancouver',
      note: '此時此刻應該尚未開始',
      coverImage: '',
      isDeleted: 0,
      createdAt: '2025-10-30T07:35:38.608Z',
      updatedAt: '2025-10-30T07:35:38.608Z',
    },
    {
      id: '4',
      userId: '1',
      title: '10 月泰國清邁',
      destination: '清邁',
      startDate: '2025-10-03T00:00:00.000Z',
      startTimezone: 'Asia/Taipei',
      endDate: '2025-10-05T00:00:00.000Z',
      endTimezone: 'Asia/Taipei',
      note: '大阿啊啊啊啊象',
      coverImage: '',
      isDeleted: 0,
      createdAt: '2025-10-30T07:35:38.608Z',
      updatedAt: '2025-10-30T07:35:38.608Z',
    },
    {
      id: '5',
      userId: '1',
      title: '只有我想去尼泊爾',
      destination: 'Kathmandu、Pokhara、Chitwan',
      startDate: '2025-09-11T00:00:00.000Z',
      startTimezone: 'Asia/Taipei',
      endDate: '2025-09-21T00:00:00.000Z',
      endTimezone: 'Asia/Kathmandu',
      note: '尼泊爾的湖',
      coverImage: '',
      isDeleted: 0,
      createdAt: '2025-10-30T07:35:38.608Z',
      updatedAt: '2025-10-30T07:35:38.608Z',
    },
  ];

  // #region 關於 Luxon
  // Luxon 的 DateTime 物件是「時間點 + 時區」的組合
  // DateTime.fromISO(時間的 ISOstring, {zone: '時區'})：將 ISOSstring 轉成帶有時區資料的 DateTime 物件
  // DateTime.setZone：把這個時間物件移去別的時區顯示，同一時間、不同時區顯示
  // DateTime.toUTC：把這個時間物件轉成 UTC (+0) 時區會顯示的時間
  // DateTime.toISO：把這個時間物件轉成帶有時區資訊的 ISO 字串
  // DateTime.utc：建立一個 utc 的時間物件

  // #endregion
  function calculateStatus(trip: any): string {
    const nowUTC = DateTime.utc();
    const startDateUTC = DateTime.fromISO(trip.startDate, {
      zone: trip.startTimezone,
    }).toUTC();
    const endDateUTC = DateTime.fromISO(trip.endDate, {
      zone: trip.endTimezone,
    });

    let status;
    if (nowUTC < startDateUTC) {
      status = '待啟程';
    } else if (nowUTC < endDateUTC) {
      status = '進行中';
    } else {
      status = '已結束';
    }

    return status;
  }

  const tripsForUI = mockTrips.map((trip) => ({
    ...trip,
    status: calculateStatus(trip), //前端用：判斷旅程是否進行中的欄位
  }));

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
                {tripsForUI.map((t) => (
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
