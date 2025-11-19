'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useBookingStore } from '../../src/store/bookingStore';
import FareDateStrip, { FareCell } from './components/FareDateStrip';
import type { Segment } from './components/FareDetailsModal';
import { FareDetailsFromStore } from './components/FareDetailsModal';
import FlightCard, { FlightItem } from './components/FlightCard';
import StepActions from './components/StepActions';

/* ================= utils ================= */
function ymd(d: Date) {
  return d.toISOString().slice(0, 10);
}
function addDays(base: Date, days: number) {
  const dd = new Date(base);
  dd.setDate(dd.getDate() + days);
  return dd;
}
function labelOf(d: Date) {
  const wk = ['日', '一', '二', '三', '四', '五', '六'][d.getDay()];
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${mm}/${dd} 週${wk}`;
}
function genFareCells(start: Date, len = 7, cheapestIdx = 3): FareCell[] {
  return Array.from({ length: len }).map((_, i) => {
    const d = addDays(start, i);
    return {
      iso: ymd(d),
      label: labelOf(d),
      fare: i === cheapestIdx ? 3232 : 4545,
      currency: 'TWD',
      isCheapest: i === cheapestIdx,
    };
  });
}
function sameDayUTC(a: string, b: string) {
  return (
    new Date(a).toISOString().slice(0, 10) ===
    new Date(b).toISOString().slice(0, 10)
  );
}

/* =============== backend types =============== */
type RawFlight = {
  flightId: number;
  flightNumber: string;
  flightDate: string; // YYYY-MM-DD (出發地當地)
  originIata: string;
  destinationIata: string;
  depTimeUtc: string; // ISO UTC
  arrTimeUtc: string; // ISO UTC
  status: string;
};

/* =============== page component =============== */
export default function FlightBookingPage() {
  const router = useRouter();
  const sp = useSearchParams();

  const ORIGIN = (sp.get('origin') ?? 'TPE').toUpperCase();
  const DEST = (sp.get('destination') ?? 'NRT').toUpperCase();
  const departISO = (sp.get('departDate') ?? ymd(new Date())).slice(0, 10);
  const returnISO = (sp.get('returnDate') ?? departISO).slice(0, 10);

  const originLabel = sp.get('originLabel') ?? ORIGIN;
  const destLabel = sp.get('destLabel') ?? DEST;

  // 給日期條用的標題
  const outboundTitle = `去程　${originLabel} → ${destLabel}`;
  const inboundTitle = `回程　${destLabel} → ${originLabel}`;

  /* ===== 日期條（7 天，置中第 4 格） ===== */
  const [obStart, setObStart] = useState(() =>
    addDays(new Date(departISO), -3)
  );
  const [ibStart, setIbStart] = useState(() =>
    addDays(new Date(returnISO), -3)
  );
  const [obIndex, setObIndex] = useState(3);
  const [ibIndex, setIbIndex] = useState(3);

  const outboundDates = useMemo(() => genFareCells(obStart, 7, 3), [obStart]);
  const inboundDates = useMemo(() => genFareCells(ibStart, 7, 3), [ibStart]);

  const selectedObDate = outboundDates[obIndex]?.iso;
  const selectedIbDate = inboundDates[ibIndex]?.iso;
  const obDayFare = outboundDates[obIndex]?.fare ?? 0;
  const ibDayFare = inboundDates[ibIndex]?.fare ?? 0;

  /* ===== 取航班列表 ===== */
  const [raw, setRaw] = useState<RawFlight[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://localhost:3007/api/flight', {
          cache: 'no-store',
        });
        const data = (await res.json()) as RawFlight[];
        setRaw(data ?? []);
      } catch (e) {
        console.error('讀取航班失敗：', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const allOb = useMemo(
    () =>
      raw
        .filter(
          (f) =>
            f.originIata?.toUpperCase() === ORIGIN &&
            f.destinationIata?.toUpperCase() === DEST
        )
        .sort((a, b) => +new Date(a.depTimeUtc) - +new Date(b.depTimeUtc)),
    [raw, ORIGIN, DEST]
  );

  const allIb = useMemo(
    () =>
      raw
        .filter(
          (f) =>
            f.originIata?.toUpperCase() === DEST &&
            f.destinationIata?.toUpperCase() === ORIGIN
        )
        .sort((a, b) => +new Date(a.depTimeUtc) - +new Date(b.depTimeUtc)),
    [raw, ORIGIN, DEST]
  );

  /* ===== 依日期產出卡片（票價暫以日期列價格） ===== */
  const obFlights: FlightItem[] = useMemo(() => {
    if (!selectedObDate) return [];
    return allOb
      .filter((f) => sameDayUTC(f.flightDate, selectedObDate))
      .map((f) => ({
        flightNo: f.flightNumber,
        leg: {
          originCode: f.originIata,
          originName: originLabel, // 🆕 去程出發地
          depTime: new Date(f.depTimeUtc).toLocaleTimeString('zh-TW', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          destinationCode: f.destinationIata,
          destinationName: destLabel, // 🆕 去程目的地
          arrTime: new Date(f.arrTimeUtc).toLocaleTimeString('zh-TW', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          duration: '',
        },
        price: obDayFare,
        currency: 'TWD',
        cabin: '經濟艙',
      }));
  }, [allOb, selectedObDate, obDayFare, originLabel, destLabel]);

  const ibFlights: FlightItem[] = useMemo(() => {
    if (!selectedIbDate) return [];
    return allIb
      .filter((f) => sameDayUTC(f.flightDate, selectedIbDate))
      .map((f) => ({
        flightNo: f.flightNumber,
        leg: {
          originCode: f.originIata,
          originName: destLabel, // 🆕 回程出發地（＝去程目的地）
          depTime: new Date(f.depTimeUtc).toLocaleTimeString('zh-TW', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          destinationCode: f.destinationIata,
          destinationName: originLabel, // 🆕 回程目的地（＝去程出發地）
          arrTime: new Date(f.arrTimeUtc).toLocaleTimeString('zh-TW', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          duration: '',
        },
        price: ibDayFare,
        currency: 'TWD',
        cabin: '經濟艙',
      }));
  }, [allIb, selectedIbDate, ibDayFare, originLabel, destLabel]);

  /* ===== 已選航班（從 sessionStorage 讀）與合計 ===== */
  type Stored = {
    finalFare: number;
    flightNo: string;
    flightId?: number;
    cabin?: string;
    leg?: any;
  };
  const readKey = (k: 'fare_outbound' | 'fare_inbound'): Stored | null => {
    try {
      const s = sessionStorage.getItem(k);
      return s ? JSON.parse(s) : null;
    } catch {
      return null;
    }
  };

  const [selectedOutbound, setSelectedOutbound] = useState<FlightItem | null>(
    null
  );
  const [selectedInbound, setSelectedInbound] = useState<FlightItem | null>(
    null
  );

  useEffect(() => {
    const s = readKey('fare_outbound');
    if (s && obFlights.length) {
      const f = obFlights.find((x) => x.flightNo === s.flightNo);
      if (f) {
        setSelectedOutbound({ ...f, price: s.finalFare });
        const match = allOb.find((rf) => rf.flightNumber === f.flightNo);
        if (match && s.flightId == null) {
          sessionStorage.setItem(
            'fare_outbound',
            JSON.stringify({
              ...s,
              flightId: match.flightId,
              cabin: s.cabin ?? '經濟艙',
              leg: s.leg ?? {
                originCode: match.originIata,
                destinationCode: match.destinationIata,
                depTime: match.depTimeUtc,
                arrTime: match.arrTimeUtc,
              },
            })
          );
        }
      }
    }
  }, [obFlights, allOb]);

  useEffect(() => {
    const s = readKey('fare_inbound');
    if (s && ibFlights.length) {
      const f = ibFlights.find((x) => x.flightNo === s.flightNo);
      if (f) {
        setSelectedInbound({ ...f, price: s.finalFare });
        const match = allIb.find((rf) => rf.flightNumber === f.flightNo);
        if (match && s.flightId == null) {
          sessionStorage.setItem(
            'fare_inbound',
            JSON.stringify({
              ...s,
              flightId: match.flightId,
              cabin: s.cabin ?? '經濟艙',
              leg: s.leg ?? {
                originCode: match.originIata,
                destinationCode: match.destinationIata,
                depTime: match.depTimeUtc,
                arrTime: match.arrTimeUtc,
              },
            })
          );
        }
      }
    }
  }, [ibFlights, allIb]);

  const totalPrice =
    (selectedOutbound?.price ?? 0) + (selectedInbound?.price ?? 0);
  const canProceed = !!(selectedOutbound && selectedInbound);

  const setBaseFare = useBookingStore((s) => s.setBaseFare);
  const setExtrasTotal = useBookingStore((s) => s.setExtrasTotal);
  const setOutboundSeg = useBookingStore((s) => s.setOutbound);
  const setInboundSeg = useBookingStore((s) => s.setInbound);

  useEffect(() => {
    setBaseFare(totalPrice);
    setExtrasTotal(0);

    // 將目前選擇的去/回程寫到 store，供彈窗顯示
    setOutboundSeg(toSeg('去程', selectedOutbound));
    setInboundSeg(toSeg('回程', selectedInbound));
  }, [totalPrice, setBaseFare, setExtrasTotal]);

  const cancelOutbound = () => {
    setSelectedOutbound(null);
    sessionStorage.removeItem('fare_outbound');
  };
  const cancelInbound = () => {
    setSelectedInbound(null);
    sessionStorage.removeItem('fare_inbound');
  };

  /* ===== 前往票價頁：把 flightId 也一起塞到 query ===== */
  const goFarePage = (dir: 'outbound' | 'inbound', f: FlightItem) => {
    const base = dir === 'outbound' ? allOb : allIb;
    const match = base.find((rf) => rf.flightNumber === f.flightNo);

    const qs = new URLSearchParams(Array.from(sp.entries()));
    qs.set('dir', dir);
    qs.set('flightNo', f.flightNo);
    if (match?.flightId) qs.set('flightId', String(match.flightId));

    router.push(`/flight-booking/fare?${qs.toString()}`);
  };

  /* ===== 上一步 / 下一步 ===== */
  const goPrev = () => router.back();
  const goNext = () => {
    const qs = new URLSearchParams(Array.from(sp.entries()));
    router.push(`/flight-booking/passenger?${qs.toString()}`);
  };

  /* ===== 查看明細（彈窗） ===== */
  const toSeg = (
    title: '去程' | '回程',
    f?: FlightItem | null
  ): Segment | null => {
    if (!f) return null;
    return {
      title,
      flightNo: f.flightNo,
      originCode: f.leg.originCode,
      originName: f.leg.originName,
      depTime: f.leg.depTime,
      destinationCode: f.leg.destinationCode,
      destinationName: f.leg.destinationName,
      arrTime: f.leg.arrTime,
      cabin: f.cabin,
      fare: f.price ?? 0,
      currency: f.currency ?? 'TWD',
    };
  };
  const obSeg = toSeg('去程', selectedOutbound);
  const ibSeg = toSeg('回程', selectedInbound);

  return (
    <div>
      <main className="sw-container pb-12 pt-8 space-y-10">
        {/* 去程 日期列 */}
        <FareDateStrip
          title={outboundTitle}
          items={outboundDates}
          selectedIndex={obIndex}
          onSelect={(i) => {
            const iso = outboundDates[i]?.iso;
            if (!iso) return;
            setObStart(addDays(new Date(iso), -3));
            setObIndex(3);
          }}
          onPrev={() => {
            setObStart((cur) => addDays(cur, -7));
            setObIndex(3);
          }}
          onNext={() => {
            setObStart((cur) => addDays(cur, +7));
            setObIndex(3);
          }}
        />

        {/* 去程 卡片 */}
        <div className="grid gap-4 md:grid-cols-2">
          {loading ? (
            <p>航班載入中...</p>
          ) : obFlights.length === 0 ? (
            <p>此日期沒有航班</p>
          ) : (
            obFlights.map((f, i) => {
              const isSel = !!(
                selectedOutbound && selectedOutbound.flightNo === f.flightNo
              );
              const shown = isSel
                ? { ...f, price: selectedOutbound!.price }
                : f;
              return (
                <FlightCard
                  key={`ob-${i}`}
                  data={shown}
                  dir="outbound"
                  isSelected={isSel}
                  isDisabled={
                    !!selectedOutbound &&
                    selectedOutbound.flightNo !== f.flightNo
                  }
                  onBook={() => goFarePage('outbound', f)}
                  onCancel={cancelOutbound}
                />
              );
            })
          )}
        </div>

        {/* 回程 日期列 */}
        <FareDateStrip
          className="mt-10"
          title={inboundTitle}
          items={inboundDates}
          selectedIndex={ibIndex}
          onSelect={(i) => {
            const iso = inboundDates[i]?.iso;
            if (!iso) return;
            setIbStart(addDays(new Date(iso), -3));
            setIbIndex(3);
          }}
          onPrev={() => {
            setIbStart((cur) => addDays(cur, -7));
            setIbIndex(3);
          }}
          onNext={() => {
            setIbStart((cur) => addDays(cur, +7));
            setIbIndex(3);
          }}
        />

        {/* 回程 卡片 */}
        <div className="grid gap-4 md:grid-cols-2">
          {loading ? (
            <p>航班載入中...</p>
          ) : ibFlights.length === 0 ? (
            <p>此日期沒有航班</p>
          ) : (
            ibFlights.map((f, i) => {
              const isSel = !!(
                selectedInbound && selectedInbound.flightNo === f.flightNo
              );
              const shown = isSel ? { ...f, price: selectedInbound!.price } : f;
              return (
                <FlightCard
                  key={`ib-${i}`}
                  data={shown}
                  dir="inbound"
                  isSelected={isSel}
                  isDisabled={
                    !!selectedInbound && selectedInbound.flightNo !== f.flightNo
                  }
                  onBook={() => goFarePage('inbound', f)}
                  onCancel={cancelInbound}
                />
              );
            })
          )}
        </div>

        {/* 底部操作 */}
        <StepActions
          onPrev={goPrev}
          onNext={goNext}
          nextDisabled={!canProceed}
        />
      </main>
      {/* 掛 store 版本的彈窗（跨頁可用） */}
      <FareDetailsFromStore />
    </div>
  );
}
