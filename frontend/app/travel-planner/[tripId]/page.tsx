'use client';

import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTripContext } from '../../../src/context/TripContext';
import TripCardSortSample from '../components/tripCardShortSample';
import TripItemCard from '../components/tripItemCard';
import { Trip } from '../types';
import { apiFetch } from '../utils/apiFetch';
import { transformTripForUI } from '../utils/tripUtils';

// export interface TripDetailPageProps {}
// {  }: TripDetailPageProps

export default function TripDetailPage() {
  const events12 = [
    // 🛫 12/22 出發日（含跨時段活動）
    {
      title: '桃園 > 成田',
      start: '2025-12-22T08:30:00',
      end: '2025-12-22T13:00:00',
    },
    {
      title: '抵達飯店 Check-in',
      start: '2025-12-22T14:00:00',
      end: '2025-12-22T15:00:00',
    },
    {
      title: '澀谷散步',
      start: '2025-12-22T16:00:00',
      end: '2025-12-22T17:30:00',
      color: '#DCBB87',
    },
    {
      title: '晚餐：燒肉 Like',
      start: '2025-12-22T18:30:00',
      end: '2025-12-22T20:00:00',
      color: '#A87B47',
    },
    {
      title: '藥妝店採購',
      start: '2025-12-22T20:30:00',
      end: '2025-12-22T21:30:00',
      color: '#1F2E3C',
    },

    // 🏙️ 12/23 東京一日遊（多筆）
    {
      title: '淺草寺參拜',
      start: '2025-12-23T09:00:00',
      end: '2025-12-23T10:00:00',
    },
    {
      title: '晴空塔展望台',
      start: '2025-12-23T10:30:00',
      end: '2025-12-23T12:00:00',
    },
    {
      title: '午餐：築地壽司',
      start: '2025-12-23T12:30:00',
      end: '2025-12-23T13:30:00',
      color: '#B35E2E',
    },
    {
      title: '銀座逛街',
      start: '2025-12-23T14:00:00',
      end: '2025-12-23T17:30:00',
      color: '#6E6658',
    },
    {
      title: '歌舞伎町夜拍',
      start: '2025-12-23T20:00:00',
      end: '2025-12-23T22:00:00',
      color: '#1F2E3C',
    },

    // 🎄 12/24–25：聖誕跨夜活動（跨日事件）
    {
      title: '聖誕燈節夜拍',
      start: '2025-12-24T19:00:00',
      end: '2025-12-25T01:00:00',
      color: '#DCBB87',
    },

    // 🎅 12/24 當日滿滿行程（觸發 +more）
    {
      title: '原宿表參道',
      start: '2025-12-24T10:00:00',
      end: '2025-12-24T11:00:00',
    },
    {
      title: '代代木公園散步',
      start: '2025-12-24T11:00:00',
      end: '2025-12-24T12:00:00',
    },
    {
      title: '午餐：Bills 鬆餅',
      start: '2025-12-24T12:30:00',
      end: '2025-12-24T13:30:00',
    },
    {
      title: '澀谷十字路口拍照',
      start: '2025-12-24T14:00:00',
      end: '2025-12-24T14:30:00',
    },
    {
      title: '涉谷 Parco 逛街',
      start: '2025-12-24T15:00:00',
      end: '2025-12-24T17:00:00',
    },
    {
      title: '回飯店小睡',
      start: '2025-12-24T17:00:00',
      end: '2025-12-24T18:00:00',
    },
    {
      title: '六本木夜景',
      start: '2025-12-24T19:00:00',
      end: '2025-12-24T20:00:00',
      color: '#1F2E3C',
    },
    {
      title: '聖誕晚餐',
      start: '2025-12-24T20:00:00',
      end: '2025-12-24T21:30:00',
      color: '#DCBB87',
    },

    // 🎁 12/25 聖誕節
    {
      title: '新宿早餐',
      start: '2025-12-25T09:00:00',
      end: '2025-12-25T10:00:00',
    },
    {
      title: '明治神宮',
      start: '2025-12-25T10:30:00',
      end: '2025-12-25T12:00:00',
    },
    {
      title: '午餐：烏龍麵',
      start: '2025-12-25T12:30:00',
      end: '2025-12-25T13:30:00',
    },
    {
      title: '涉谷 109',
      start: '2025-12-25T14:00:00',
      end: '2025-12-25T16:00:00',
    },
    {
      title: '甜點咖啡廳',
      start: '2025-12-25T20:00:00',
      end: '2025-12-25T21:30:00',
      color: '#DCBB87',
    },
    {
      title: '回飯店休息',
      start: '2025-12-25T22:00:00',
      end: '2025-12-25T23:30:00',
    },

    // 🛬 12/26 回程
    {
      title: '早餐 Buffet',
      start: '2025-12-26T08:00:00',
      end: '2025-12-26T09:00:00',
    },
    {
      title: 'Check-out',
      start: '2025-12-26T10:00:00',
      end: '2025-12-26T11:00:00',
    },
    {
      title: '羽田 > 桃園',
      start: '2025-12-26T13:00:00',
      end: '2025-12-26T17:00:00',
    },
  ];
  const params = useParams();
  const router = useRouter();
  const { tripId } = params;
  const { currentTrip, setCurrentTrip } = useTripContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpenItemCard, setIsOpenItemCard] = useState(false);

  useEffect(() => {
    if (!tripId) return;

    let ignore = false;

    async function fetchTrip(showLoading = false) {
      try {
        if (showLoading) setLoading(true);

        const data = await apiFetch<Trip>(
          `http://localhost:3007/api/plans/${tripId}`
        );

        if (!ignore) {
          setCurrentTrip(transformTripForUI(data));
        }
      } catch (err: any) {
        if (!ignore) setError(err.message);
      } finally {
        if (showLoading && !ignore) setLoading(false);
      }
    }

    // ⬅️ 首次進頁面才會 loading（且只會 loading 一次）
    if (!currentTrip) {
      fetchTrip(true); // 首次要 loading
    } else {
      fetchTrip(false); // 如果有 cache 就立刻用舊資料，不 loading → 不閃
    }

    // ⬅️ 背景更新永遠不 loading → 不會閃
    const intervalId = setInterval(
      () => {
        fetchTrip(false);
      },
      5 * 60 * 1000
    );

    return () => {
      ignore = true;
      clearInterval(intervalId);
    };
  }, [tripId]);

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse h-40 bg-gray-200 rounded-lg" />
      </div>
    );
  }

  // loading 結束了但沒資料，才顯示錯誤
  if (!currentTrip) {
    return <p>旅程資料不存在，請回到列表頁</p>;
  }

  // 資料好了才渲染真的卡片
  return (
    <>
      <div className="flex-1 flex px-16 py-8 w-full">
        <section
          className="flex-1 min-h-full border border-solid border-black rounded-2xl
          w-full flex 
          overflow-hidden"
        >
          {/* 左邊功能 */}
          <div className="flex-1 px-6 py-4 bg-(--sw-primary) flex flex-col gap-4">
            {/* 旅程資訊卡片 */}
            <TripCardSortSample trip={currentTrip} />
            {/* 主要按鈕 */}
            <div className="button-group flex gap-2">
              <div className="flex-1">
                <button className="sw-btn h-full w-full sw-btn--gold-square">
                  + 新增每日行程
                </button>
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <button className="sw-btn text-white">刪除整趟旅程</button>
                <button className="sw-btn text-white">修改旅程資訊</button>
              </div>
            </div>
            {/* 收合頁面 */}
            <div className="flex-1 flex flex-col gap-2">
              {/* 收合卡片 1 */}
              <div>
                {/* 標題 */}
                <div className="text-white flex justify-between border-b border-white py-2">
                  <div>備註</div>
                  <ChevronUp />
                </div>
                {/* 內容 */}
                <div className=" text-white rounded-lg py-4 mt-2">
                  帶媽媽和妹妹一家東京自由行，總共一老三大兩小一幼兒，重點是要帶裡個小的去迪士尼玩
                </div>
              </div>
              {/* 收合卡片 2 */}
              <div>
                {/* 標題 */}
                <div className="text-white flex justify-between border-b border-white py-2">
                  <div>參考連結</div>
                  <ChevronDown />
                </div>
              </div>
            </div>
            {/* 匯出按鈕 */}
            <div>
              <button className="sw-btn text-white w-full">
                匯出旅程及行程 PDF 檔
              </button>
            </div>
          </div>
          {/* 右邊日曆 */}
          <div className="flex-2 px-6 py-4">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
              initialView="dayGridMonth"
              initialDate="2025-12-22"
              selectable={true}
              selectMirror={true}
              unselectAuto={true}
              height="100%"
              expandRows={false}
              stickyHeaderDates={true}
              headerToolbar={{
                start: 'title',
                center: 'prev,next today',
                end: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
              }}
              buttonText={{
                today: '今天',
                month: '月曆',
                week: '週曆',
                day: '日曆',
                list: '列表',
              }}
              events={events12}
              eventColor="#DCBB87"
              eventClick={(info) => {
                // 阻止預設的導向行為（例如連到網址）
                info.jsEvent.preventDefault();
                setIsOpenItemCard(true);
              }}
            />
          </div>
        </section>
        {isOpenItemCard && <TripItemCard />}
      </div>
    </>
  );
}
