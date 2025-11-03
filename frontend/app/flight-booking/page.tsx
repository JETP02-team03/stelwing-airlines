'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import FareDateStrip, { FareCell } from './components/FareDateStrip';
import FlightCard, { FlightItem } from './components/FlightCard';
import FlightInfoBar from './components/FlightInfoBar';

function labelOf(d: Date) {
  const wk = ['日', '一', '二', '三', '四', '五', '六'][d.getDay()];
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${mm}/${dd} 週${wk}`;
}

export default function FlightBookingPage() {
  const router = useRouter();
  const sp = useSearchParams();

  // ===== 假資料：日期列 =====
  const outboundDates: FareCell[] = useMemo(() => {
    const base = new Date('2025-12-01');
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      return {
        iso: d.toISOString().slice(0, 10),
        label: labelOf(d),
        fare: i === 3 ? 7777 : 8888,
        currency: 'TWD',
        isCheapest: i === 3,
      };
    });
  }, []);

  const inboundDates: FareCell[] = useMemo(() => {
    const base = new Date('2025-12-08');
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      return {
        iso: d.toISOString().slice(0, 10),
        label: labelOf(d),
        fare: i === 2 ? 8888 : 7777,
        currency: 'TWD',
        isCheapest: i !== 2,
      };
    });
  }, []);

  const [obIndex, setObIndex] = useState(3);
  const [ibIndex, setIbIndex] = useState(3);

  // ===== 假資料：航班清單 =====
  const flights: FlightItem[] = [
    {
      flightNo: 'SW220',
      leg: {
        originCode: 'TPE',
        originName: '台北(桃園)',
        depTime: '06:35',
        destinationCode: 'NRT',
        destinationName: '東京成田',
        arrTime: '11:00',
        duration: '3小時25分',
      },
      price: 8888,
      currency: 'TWD',
      cabin: '經濟艙',
    },
    {
      flightNo: 'SW221',
      leg: {
        originCode: 'TPE',
        originName: '台北(桃園)',
        depTime: '13:15',
        destinationCode: 'NRT',
        destinationName: '東京成田',
        arrTime: '17:40',
        duration: '3小時25分',
      },
      price: 8888,
      currency: 'TWD',
      cabin: '經濟艙',
    },
  ];

  // ===== 工具：把現有查詢參數帶過去，避免遺失 =====
  const baseQS = () => {
    const keep = [
      'tripType',
      'origin',
      'destination',
      'departDate',
      'returnDate',
      'passengers',
      'cabin',
      'currency',
    ] as const;

    const next = new URLSearchParams();
    keep.forEach((k) => {
      const v = sp.get(k);
      if (v) next.set(k, v);
    });
    return next;
  };

  const handleBookOutbound = (f: FlightItem) => {
    // 保留目前 URL 裡的 *所有* 參數 (包含已選 ob* / ib*)
    const qs = new URLSearchParams(Array.from(sp.entries()));
    qs.set('dir', 'outbound');
    qs.set('flightNo', f.flightNo);
    router.push(`/flight-booking/fare?${qs.toString()}`);
  };

  const handleBookInbound = (f: FlightItem) => {
    const qs = new URLSearchParams(Array.from(sp.entries()));
    qs.set('dir', 'inbound');
    qs.set('flightNo', f.flightNo);
    router.push(`/flight-booking/fare?${qs.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <FlightInfoBar />

      <main className="mx-auto w-full max-w-6xl px-4 py-8 space-y-10">
        {/* 去程 */}
        <FareDateStrip
          title="✈️ 去程　台北(桃園) → 東京成田"
          items={outboundDates}
          selectedIndex={obIndex}
          onSelect={setObIndex}
          onPrev={() => {}}
          onNext={() => {}}
        />
        <div className="grid gap-4 md:grid-cols-2">
          {flights.map((f, i) => (
            <FlightCard
              key={`ob-${i}`}
              data={f}
              dir="outbound"
              onBook={handleBookOutbound}
            />
          ))}
        </div>

        {/* 回程 */}
        <FareDateStrip
          className="mt-10"
          title="🛬 回程　東京成田 → 台北(桃園)"
          items={inboundDates}
          selectedIndex={ibIndex}
          onSelect={setIbIndex}
          onPrev={() => {}}
          onNext={() => {}}
        />
        <div className="grid gap-4 md:grid-cols-2">
          {flights.map((f, i) => (
            <FlightCard
              key={`ib-${i}`}
              data={f}
              dir="inbound"
              onBook={handleBookInbound}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
