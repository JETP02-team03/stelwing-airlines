'use client';

import { ArrowLeft, ArrowRight, Loader2, PenSquare, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

/* ========== Types ========== */
type BookingDetail = {
  detailId: number | string;
  tripType: 'OB' | 'IB';
  seat?: { seatNumber: string | null } | null;
  baggage?: { weightKg: number | null; price?: number | null } | null;
  meal?: { mealName: string | null; price?: number | null } | null;
  flight: {
    flightNumber: string;
    flightDate: string;
    originIata: string;
    destinationIata: string;
    depTimeUtc: string;
    arrTimeUtc: string;
  };
};

type Booking = {
  bookingId: number;
  pnr: string;
  currency: string;
  totalAmount: number;
  paymentMethod: string | null;
  paymentStatus: string | null;
  createdAt: string;
  details: BookingDetail[];
};

/* ========== Utils ========== */
const fmtMoney = (n: number, currency = 'TWD') =>
  `${currency} ${Number(n || 0).toLocaleString('zh-TW', {
    maximumFractionDigits: 0,
  })}`;

function formatDateMD(dateStr?: string | null): string {
  if (!dateStr) return '--';

  const pure = dateStr.includes('T') ? dateStr.slice(0, 10) : dateStr;
  const [y, m, d] = pure.split('-').map((v) => Number(v));

  if (!y || !m || !d) return pure;

  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];

  return `${String(d).padStart(2, '0')} ${months[m - 1] ?? ''}`;
}

function formatTimeHM(iso?: string | null): string {
  if (!iso) return '--';
  const d = new Date(iso);
  return d.toLocaleTimeString('zh-TW', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getBoardingTime(depIso?: string | null): string {
  if (!depIso) return '--';
  const d = new Date(depIso);
  d.setMinutes(d.getMinutes() - 30);
  return d.toLocaleTimeString('zh-TW', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
}

/* ========== BoardingPass（純 UI） ========== */
type BoardingPassProps = {
  title: string;
  directionLabel: string;
  detail: BookingDetail;
  currency: string;
  onChange: () => void;
  onRefund: () => void;
};

function BoardingPassSection({
  title,
  directionLabel,
  detail,
  currency,
  onChange,
  onRefund,
}: BoardingPassProps) {
  const f = detail.flight;
  const dateLabel = formatDateMD(f.flightDate);
  const boardingTime = getBoardingTime(f.depTimeUtc);
  const depTime = formatTimeHM(f.depTimeUtc);
  const arrTime = formatTimeHM(f.arrTimeUtc);

  const seatNo = detail.seat?.seatNumber || '--';
  const gate = detail.tripType === 'OB' ? 'A2' : 'B5';

  const baggageText = detail.baggage?.weightKg
    ? `托運行李 ${detail.baggage.weightKg}kg`
    : '無托運行李';

  const mealText = detail.meal?.mealName || '未選擇餐點';

  const baggagePrice = detail.baggage?.price || 0;
  const mealPrice = detail.meal?.price || 0;
  const legExtras = baggagePrice + mealPrice;

  return (
    <section className="mt-6">
      <div className="mb-3 flex items-center gap-3 text-[color:var(--sw-primary)]">
        <ArrowRight className="h-4 w-4" />
        <span className="text-sm">{title}</span>
        <span className="text-sm font-semibold">{directionLabel}</span>
      </div>

      {/* Boarding Pass 卡片 */}
      <div className="rounded-2xl border border-[#D9B37B]/70 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between bg-[color:var(--sw-primary)] px-6 py-3 text-white">
          <div className="text-lg font-semibold tracking-wide">STELWING</div>
          <div className="text-sm font-semibold tracking-[0.1em]">
            BOARDING PASS
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* 左半 */}
          <div className="flex-1 border-b md:border-b-0 md:border-r border-dashed border-[#DADADA] px-6 py-5">
            <div className="mb-4 text-sm font-semibold text-[color:var(--sw-primary)]">
              CHECKIN
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 text-xs text-[#444]">
              <InfoRow label="FLIGHT 航班" value={f.flightNumber} />
              <InfoRow label="DATE 日期" value={dateLabel} />
              <InfoRow label="BOARDING 登機時間" value={boardingTime} />
              <InfoRow label="GATE 登機門" value={gate} />
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-y-3 text-xs text-[#444]">
              <InfoRow label="DEPARTURE 出發" value={depTime} />
              <InfoRow label="ARRIVAL 抵達" value={arrTime} />
              <InfoRow label="SEAT 座位" value={seatNo} />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-dashed border-[#E5E5E5] pt-4 text-xs">
              <InfoRow label="FROM 從" value={f.originIata} />
              <InfoRow label="TO 到" value={f.destinationIata} />
            </div>
          </div>

          {/* 右半 */}
          <div className="flex-1 px-6 py-5 bg-[#F7F7F7]">
            <div className="mb-4 text-sm font-semibold text-[color:var(--sw-primary)]">
              CHECKIN
            </div>

            <div className="grid grid-cols-2 gap-y-3 text-xs text-[#444]">
              <InfoRow label="FLIGHT 航班" value={f.flightNumber} />
              <InfoRow label="SEAT 座位" value={seatNo} />
            </div>

            <div className="mt-4 border-t border-dashed border-[#E5E5E5] pt-4 text-xs">
              <div className="mb-1">
                <span className="mr-2 font-semibold">行李</span>
                <span>{baggageText}</span>
              </div>
              <div>
                <span className="mr-2 font-semibold">餐點</span>
                <span>{mealText}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm font-semibold text-[#1F2E3C]">
              <span>本段加價項目</span>
              <span>{fmtMoney(legExtras, currency)}</span>
            </div>
          </div>
        </div>

        {/* 按鈕 */}
        <div className="mt-3 flex justify-end gap-3 p-4">
          <button
            onClick={onChange}
            className="inline-flex items-center gap-1 rounded-full border border-[color:var(--sw-primary)] px-4 py-2 text-sm font-semibold text-[color:var(--sw-primary)] hover:bg-[color:var(--sw-primary)] hover:text-white"
          >
            <PenSquare className="h-4 w-4" /> 改票
          </button>

          <button
            onClick={onRefund}
            className="inline-flex items-center gap-1 rounded-full border border-red-500 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-500 hover:text-white"
          >
            <Trash className="h-4 w-4" /> 退票
          </button>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="uppercase text-[11px] opacity-70">{label}</div>
      <div className="mt-1 text-sm font-semibold text-[#1F2E3C]">{value}</div>
    </div>
  );
}

/* ========== 主頁面 ========== */
export default function FlightTicketPage() {
  const { pnr } = useParams<{ pnr: string }>();
  const router = useRouter();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  /* 載入訂單資料 */
  useEffect(() => {
    if (!pnr) return;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:3007/api/flight-booking/bookings/${pnr}`
        );
        const json = await res.json();
        if (!json.success) throw new Error(json.message);
        setBooking(json.data);
      } catch (err: any) {
        setError(err?.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [pnr]);

  /* 改票 */
  const handleChangeTicket = async (trip: 'OB' | 'IB') => {
    const confirmMsg =
      trip === 'OB' ? '確定要進行去程改票？' : '確定要進行回程改票？';
    if (!window.confirm(confirmMsg)) return;

    try {
      setActionLoading(true);
      const fakeNewFlightId = trip === 'OB' ? 999 : 998;

      const res = await fetch(
        `http://localhost:3007/api/flight-booking/bookings/${pnr}/change`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            outboundFlightId: trip === 'OB' ? fakeNewFlightId : undefined,
            inboundFlightId: trip === 'IB' ? fakeNewFlightId : undefined,
          }),
        }
      );

      const json = await res.json();
      if (!json.success) throw new Error(json.message);

      alert('改票成功！');
      router.refresh();
    } catch (err: any) {
      alert(err?.message || '改票失敗');
    } finally {
      setActionLoading(false);
    }
  };

  /* 退票 */
  const handleRefundTicket = async (trip: 'OB' | 'IB') => {
    const confirmMsg =
      trip === 'OB'
        ? '確定要退去程票？此動作無法復原。'
        : '確定要退回程票？此動作無法復原。';

    if (!window.confirm(confirmMsg)) return;

    try {
      setActionLoading(true);

      const res = await fetch(
        `http://localhost:3007/api/flight-booking/bookings/${pnr}/refund`,
        { method: 'POST' }
      );

      const json = await res.json();
      if (!json.success) throw new Error(json.message);

      alert('退票成功！即將返回');
      router.push('/member-center/flight');
    } catch (err: any) {
      alert(err?.message || '退票失敗');
    } finally {
      setActionLoading(false);
    }
  };

  /* Loading / Error UI */
  if (loading) {
    return (
      <div className="w-full py-10 flex items-center justify-center text-[#666]">
        <Loader2 className="h-5 w-5 animate-spin mr-2" />
        票券載入中…
      </div>
    );
  }

  if (!booking || error) {
    return (
      <div className="py-10 text-center">
        <div className="text-[color:var(--sw-primary)] text-lg font-semibold mb-3">
          電子機票載入失敗
        </div>
        <div className="text-sm mb-4">{error}</div>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center border rounded-full px-4 py-2 text-sm border-[color:var(--sw-primary)] text-[color:var(--sw-primary)]"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          返回
        </button>
      </div>
    );
  }

  const currency = booking.currency;
  const outbound = booking.details.find((d) => d.tripType === 'OB');
  const inbound = booking.details.find((d) => d.tripType === 'IB');

  /* 計算金額 */
  const isRoundTrip = Boolean(outbound && inbound);

  const basePerLeg = isRoundTrip
    ? Math.round((booking.totalAmount || 0) / 2)
    : booking.totalAmount || 0;

  const obExtras =
    (outbound?.baggage?.price || 0) + (outbound?.meal?.price || 0);
  const ibExtras = (inbound?.baggage?.price || 0) + (inbound?.meal?.price || 0);

  const obTotal = basePerLeg + obExtras;
  const ibTotal = isRoundTrip ? basePerLeg + ibExtras : 0;

  return (
    <div className="w-full py-6 space-y-6">
      {/* 返回 */}
      <div>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-sm text-[color:var(--sw-primary)]"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          返回機票訂單
        </button>
      </div>

      {/* 去程 */}
      {outbound && (
        <>
          <BoardingPassSection
            title="去程"
            directionLabel={`${outbound.flight.originIata} → ${outbound.flight.destinationIata}`}
            detail={outbound}
            currency={currency}
            onChange={() =>
              router.push(`/member-center/flight/change/${pnr}/OB`)
            }
            onRefund={() => handleRefundTicket('OB')}
          />

          {/* 去程費用 */}
          <CostCard
            title="去程機票費用"
            currency={currency}
            base={basePerLeg}
            baggagePrice={outbound?.baggage?.price || 0}
            baggageText={
              outbound?.baggage?.weightKg
                ? `托運行李 ${outbound.baggage.weightKg}kg`
                : '無托運行李'
            }
            mealPrice={outbound?.meal?.price || 0}
            mealText={outbound?.meal?.mealName || '—'}
            total={obTotal}
          />
        </>
      )}

      {/* 回程 */}
      {inbound && (
        <>
          <BoardingPassSection
            title="回程"
            directionLabel={`${inbound.flight.originIata} → ${inbound.flight.destinationIata}`}
            detail={inbound}
            currency={currency}
            onChange={() =>
              router.push(`/member-center/flight/change/${pnr}/IB`)
            }
            onRefund={() => handleRefundTicket('IB')}
          />

          {/* 回程費用 */}
          <CostCard
            title="回程機票費用"
            currency={currency}
            base={basePerLeg}
            baggagePrice={inbound?.baggage?.price || 0}
            baggageText={
              inbound?.baggage?.weightKg
                ? `托運行李 ${inbound.baggage.weightKg}kg`
                : '無托運行李'
            }
            mealPrice={inbound?.meal?.price || 0}
            mealText={inbound?.meal?.mealName || '—'}
            total={ibTotal}
          />
        </>
      )}

      {/* 整趟總計 */}
      <div className="mt-4 flex items-center justify-between rounded-2xl bg-white px-5 py-4 shadow-sm border border-[#E3E3E3] text-sm font-semibold text-[color:var(--sw-primary)]">
        <span>整趟機票總計</span>
        <span>
          {fmtMoney(booking.totalAmount || obTotal + ibTotal, currency)}
        </span>
      </div>
    </div>
  );
}

/* ========== 費用卡片 Component ========== */
function CostCard({
  title,
  currency,
  base,
  baggageText,
  baggagePrice,
  mealText,
  mealPrice,
  total,
}: {
  title: string;
  currency: string;
  base: number;
  baggageText: string;
  baggagePrice: number;
  mealText: string;
  mealPrice: number;
  total: number;
}) {
  return (
    <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm border border-[#E3E3E3]">
      <div className="mb-3 text-sm font-semibold text-[color:var(--sw-primary)]">
        {title}
      </div>

      <div className="space-y-1 text-sm text-[#555]">
        <div className="flex items-center justify-between">
          <span>票價 基本方案</span>
          <span>{fmtMoney(base, currency)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>行李 {baggageText}</span>
          <span>{fmtMoney(baggagePrice, currency)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>餐點 {mealText}</span>
          <span>{fmtMoney(mealPrice, currency)}</span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-[#E5E5E5] pt-3 text-sm font-semibold text-[color:var(--sw-primary)]">
        <span>本段總計</span>
        <span>{fmtMoney(total, currency)}</span>
      </div>
    </div>
  );
}
