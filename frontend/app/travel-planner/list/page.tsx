'use client';

import { useEffect, useState } from 'react';
// @ts-expect-error 我不寫就跳錯我只好加啊氣死
import { DateTime } from 'luxon';
import CreatePlanForm from '../components/createPlanForm';
import EditDialog from '../components/editDialog';
import TripCard from '../components/tripCard';
// export interface ListPageProps {}

export default function ListPage() {
  const mockTrips = [
    {
      id: '1',
      userId: '1',
      title: '12 月東京旅：一般',
      destination: '日本：東京、輕井澤、富士山、鐮倉',
      startDate: '2025-12-11T16:00:00.000Z',
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
      startDate: '2025-11-01T07:00:00.000Z',
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

  interface Trip {
    id: string;
    userId: string;
    title: string;
    destination: string;
    startDate: string;
    startTimezone: string;
    endDate: string;
    endTimezone: string;
    note: string;
    coverImage: string;
    isDeleted: number;
    createdAt: string;
    updatedAt: string;
  }
  interface tripForUI extends Trip {
    status: string;
    displayStartDate: string;
    displayEndDate: string;
  }

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
  const tabs = ['全部', '待啟程', '進行中', '已結束'];
  const [activeTab, setActiveTab] = useState('全部');
  const [trips, setTrips] = useState<Trip[]>([]);
  const [error, setError] = useState(null);
  const [isOpenCreatePlan, setIsOpenCreatePlan] = useState(false); //彈出視窗 UI 套件版

  // #region 關於 Luxon

  // Luxon 的 DateTime 物件是「時間點 + 時區」的組合
  // DateTime.fromISO(時間的 ISOstring, {zone: '時區'})：將 ISOSstring 轉成帶有時區資料的 DateTime 物件
  // DateTime.setZone：把這個時間物件移去別的時區顯示，同一時間、不同時區顯示
  // DateTime.toUTC：把這個時間物件轉成 UTC (+0) 時區會顯示的時間
  // DateTime.toISO：把這個時間物件轉成帶有時區資訊的 ISO 字串
  // DateTime.utc：建立一個 utc 的時間物件

  // #endregion
  // function：搭配時區轉換 UTC 時間呈現時間
  function convertToTimezone(isoString: string, timezone: string): string {
    const utcDateTime = DateTime.fromISO(isoString, { zone: 'utc' });
    const localTime = utcDateTime.setZone(timezone);
    const formatLocalTime = localTime.toFormat('yyyy-MM-dd');

    return formatLocalTime;
  }

  // function：取得旅程狀態：待啟程、進行中、已結束
  function calculateStatus(trip: any): string {
    const nowUTC = DateTime.utc();
    const startDateUTC = DateTime.fromISO(trip.startDate);
    const endDateUTC = DateTime.fromISO(trip.endDate);

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

  // data：fetch 後端取得資料
  useEffect(() => {
    async function fetchTrips() {
      try {
        const res = await fetch(`${API_BASE}/plans`);
        // 如果 res 回傳失敗，建立 Error 物件並將 message 設定為無法取得旅程資料，且跳到 catch 環節 setError
        if (!res.ok) throw new Error('無法取得旅程資料');
        const data = await res.json();
        setTrips(data);
      } catch (err: any) {
        setError(err.message);
      }
    }
    fetchTrips();
  }, [API_BASE]);

  // data：根據後端 API 傳來的 Data，調整後的前端用 Data
  const tripsForUI: tripForUI[] = trips.map((trip) => ({
    ...trip,
    status: calculateStatus(trip), //前端用：判斷旅程是否進行中的欄位
    displayStartDate: convertToTimezone(trip.startDate, trip.startTimezone),
    displayEndDate: convertToTimezone(trip.endDate, trip.endTimezone),
  }));

  // data：Tab 分頁切換篩選出要列出的項目
  const filteredTrips =
    // 當 activeTab 為全部時，呈現所有 trips 資料，否則就使用 filter 語法，將 trips 資料留下 status 和 activeTab 相同的
    activeTab === '全部'
      ? tripsForUI
      : tripsForUI.filter((t) => t.status === activeTab);

  // 功能：新增旅程 form 成功新增後關閉彈出視窗
  const handleFormSuccess = () => {
    setIsOpenCreatePlan(false);
  };

  // return 畫面
  return (
    <>
      <div className="flex-1 flex flex-col items-center px-16 py-8 gap-6 w-full">
        <h5 className="sw-h5">旅程規劃</h5>
        <section
          className="flex-1 border border-solid border-black rounded-2xl
          w-full flex flex-col
          overflow-hidden"
        >
          {/* 搜尋及排序 */}
          <div className="p-4">search！</div>
          {/* 主內容 */}
          <div className="flex-1 flex p-10 bg-(--sw-primary)">
            <div className="flex-1 flex flex-col">
              {/* 新增行程按鈕 */}
              <div className="mb-6">
                <button
                  className="sw-btn sw-btn--gold-square"
                  onClick={() => setIsOpenCreatePlan(true)}
                >
                  <h6>建立新旅程</h6>
                </button>
              </div>
              {/* 行程列表 */}
              <div className="flex-1 flex flex-col">
                {/* 分頁切換 */}
                <div className="text-(--sw-white) flex gap-2 items-center px-4 relative top-px">
                  <div className="sw-p1 mr-1">篩選旅程狀態</div>
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      className={`sw-p1 ${
                        // 當 activeTab 是現在要生成的這個 tab，就顯示 active 的 class，否則是一般的 class
                        activeTab === tab ? 'tab-border-active' : 'tab-border'
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                {/* 很多卡片 */}
                <div className="flex-1 p-4 flex flex-col gap-6 border border-solid border-(--sw-grey)">
                  {/* 單一卡片 */}
                  {filteredTrips.length > 0 ? (
                    filteredTrips.map((t) => (
                      // 關鍵：一定要給 key（即使不傳資料也要 key）
                      <TripCard key={t.id} trip={t} />
                    ))
                  ) : (
                    <div className="text-(--sw-white)">尚無旅程規劃</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* 彈出視窗：新增旅程 */}
        <EditDialog
          open={isOpenCreatePlan}
          onOpenChange={setIsOpenCreatePlan}
          title={'新增旅程'}
        >
          <CreatePlanForm onSuccess={handleFormSuccess} />
        </EditDialog>
      </div>
    </>
  );
}
