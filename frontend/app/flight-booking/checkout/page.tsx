'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { FareDetailsFromStore } from '../components/FareDetailsModal';
import FlightInfoBar from '../components/FlightInfoBar';
import StepActions from '../components/StepActions';

/* ===================== Types ===================== */
type TripType = 'OB' | 'IB' | 'outbound' | 'inbound' | null;

type BookingDetail = {
  detailId: number | string;
  tripType: TripType;
  flight: {
    flightId: number | string;
    flightNumber: string;
    flightDate: string;
    originIata: string;
    destinationIata: string;
    depTimeUtc: string;
    arrTimeUtc: string;
    status: string;
  };
};

type BookingDTO = {
  pnr: string;
  currency: string;
  totalAmount: number;
  firstName: string | null;
  lastName: string | null;
  paymentStatus: string;
  details: BookingDetail[];
};

type FareStore = {
  finalFare?: number;
};

const fmtMoney = (n: number) =>
  `TWD ${Number(n || 0).toLocaleString('zh-TW', {
    maximumFractionDigits: 0,
  })}`;

/* ===================== Page ===================== */
export default function CheckoutPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const pnr = sp.get('pnr') ?? '';

  const [data, setData] = useState<BookingDTO | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  const [payMethod, setPayMethod] = useState<'card' | 'linepay' | 'ecpay'>(
    'card'
  );
  const [card, setCard] = useState({ number: '', exp: '', cvc: '' });

  /* ===== 1) 讀取訂單 ===== */
  useEffect(() => {
    if (!pnr) {
      setError('缺少 PNR');
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `http://localhost:3007/api/flight-booking/bookings/${encodeURIComponent(
            pnr
          )}`,
          { cache: 'no-store' }
        );
        const json = await res.json();
        if (!res.ok) throw new Error(json?.message || `HTTP ${res.status}`);
        setData(json.data ?? json);
      } catch (e: any) {
        console.error(e);
        setError(e.message || '讀取訂單失敗');
      }
    })();
  }, [pnr]);

  /* ===== 2) 從 passenger 帶入聯絡人 ===== */
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('stelwing.passenger.form');
      if (raw) {
        const parsed = JSON.parse(raw);
        setContact({
          firstName: parsed?.contact?.firstName || '',
          lastName: parsed?.contact?.lastName || '',
          phone:
            (parsed?.contact?.phoneCountry
              ? `${parsed.contact.phoneCountry}-`
              : '') + (parsed?.contact?.phone || ''),
          email: parsed?.contact?.email || '',
        });
      }
    } catch {}
  }, []);

  /* ===== 3) 票價 ===== */
  const obFareStore: FareStore | null = useMemo(() => {
    try {
      const s = sessionStorage.getItem('fare_outbound');
      return s ? JSON.parse(s) : null;
    } catch {
      return null;
    }
  }, []);
  const ibFareStore: FareStore | null = useMemo(() => {
    try {
      const s = sessionStorage.getItem('fare_inbound');
      return s ? JSON.parse(s) : null;
    } catch {
      return null;
    }
  }, []);

  /* ===== 4) 整理 segments ===== */
  const segments = useMemo(() => {
    if (!data)
      return { ob: null as any, ib: null as any, total: 0, currency: 'TWD' };

    const details = Array.isArray(data.details) ? data.details : [];
    const currency = data.currency || 'TWD';

    const ob =
      details.find((d) => d.tripType === 'OB' || d.tripType === 'outbound') ||
      null;
    const ib =
      details.find((d) => d.tripType === 'IB' || d.tripType === 'inbound') ||
      null;

    const segCount = [ob, ib].filter(Boolean).length || 1;
    const avg = Math.round((data.totalAmount || 0) / segCount);

    const obFare = Math.round(
      (obFareStore?.finalFare as number | undefined) ?? (segCount ? avg : 0)
    );
    const ibFare = Math.round(
      (ibFareStore?.finalFare as number | undefined) ?? (segCount > 1 ? avg : 0)
    );

    const mapSeg = (d: BookingDetail | null, fare?: number) => {
      if (!d) return null;
      const f = d.flight;
      const dep = new Date(f.depTimeUtc);
      const arr = new Date(f.arrTimeUtc);
      const isInbound = d.tripType === 'IB' || d.tripType === 'inbound';

      return {
        title: isInbound ? '回程' : '去程',
        origin: f.originIata,
        destination: f.destinationIata,
        depTime: dep.toLocaleTimeString('zh-TW', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        arrTime: arr.toLocaleTimeString('zh-TW', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        flightNo: f.flightNumber,
        fare: fare || 0,
      };
    };

    return {
      ob: mapSeg(ob, obFare),
      ib: mapSeg(ib, ibFare),
      total: Math.round(obFare + ibFare),
      currency,
    };
  }, [data, obFareStore, ibFareStore]);

  /* ===== 5) 付款 ===== */
  const onPay = () => {
    if (payMethod === 'ecpay') {
      alert('已切換至綠界金流（ECPay）模擬付款流程');
    } else if (payMethod === 'linepay') {
      alert('已切換至 LinePay 模擬付款流程');
    } else {
      alert('模擬信用卡付款成功！（此區可串接金流或導至 3D 驗證頁）');
    }
    router.push('/');
  };

  const onPrev = () => router.back();

  /* ===== Render ===== */
  if (error) return <div className="p-6 text-red-500 text-lg">{error}</div>;
  if (!data) return <div className="p-6">載入中...</div>;

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <FlightInfoBar />

      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 py-8">
        <h2 className="text-2xl font-bold text-[color:var(--sw-primary)] mb-6">
          確認與付款
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* ================= 左側：深色航段卡 ================= */}
          <section className="md:col-span-7">
            <div className="rounded-2xl bg-[color:var(--sw-primary)] text-white px-6 py-7 space-y-7 shadow-sm">
              {/* ===== 去程 ===== */}
              {segments.ob && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm opacity-90">
                    <span className="tracking-[0.2em] text-xs border px-2 py-0.5 rounded-full border-white/40">
                      去程
                    </span>
                    <span className="font-semibold">
                      小計 {fmtMoney(segments.ob.fare)}
                    </span>
                  </div>

                  <div className="text-sm opacity-90">
                    {segments.ob.origin} → {segments.ob.destination}
                  </div>

                  <div className="border-t border-white/15 pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs opacity-70">出發</div>
                        <div className="text-xl font-bold mt-1">
                          {segments.ob.depTime}
                        </div>
                      </div>
                      <div className="text-xs opacity-70">3 小時 25 分</div>
                      <div className="text-right">
                        <div className="text-xs opacity-70">抵達</div>
                        <div className="text-xl font-bold mt-1">
                          {segments.ob.arrTime}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-y-1 text-sm opacity-90">
                      <div>機上加值服務</div>
                      <div className="text-right">TWD 350</div>
                      <div>票價</div>
                      <div className="text-right">
                        {fmtMoney(Math.max(segments.ob.fare - 700, 0))}
                      </div>
                      <div>稅金與其他費用</div>
                      <div className="text-right">TWD 350</div>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-sm font-semibold">
                      <span>小計</span>
                      <span className="text-[color:var(--sw-accent)]">
                        {fmtMoney(segments.ob.fare)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ===== 回程 ===== */}
              {segments.ib && (
                <div className="space-y-4 pt-4 border-t border-white/15">
                  <div className="flex items-center justify-between text-sm opacity-90">
                    <span className="tracking-[0.2em] text-xs border px-2 py-0.5 rounded-full border-white/40">
                      回程
                    </span>
                    <span className="font-semibold">
                      小計 {fmtMoney(segments.ib.fare)}
                    </span>
                  </div>

                  <div className="text-sm opacity-90">
                    {segments.ib.origin} → {segments.ib.destination}
                  </div>

                  <div className="border-t border-white/15 pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs opacity-70">出發</div>
                        <div className="text-xl font-bold mt-1">
                          {segments.ib.depTime}
                        </div>
                      </div>
                      <div className="text-xs opacity-70">3 小時 25 分</div>
                      <div className="text-right">
                        <div className="text-xs opacity-70">抵達</div>
                        <div className="text-xl font-bold mt-1">
                          {segments.ib.arrTime}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-y-1 text-sm opacity-90">
                      <div>機上加值服務</div>
                      <div className="text-right">TWD 350</div>
                      <div>票價</div>
                      <div className="text-right">
                        {fmtMoney(Math.max(segments.ib.fare - 700, 0))}
                      </div>
                      <div>稅金與其他費用</div>
                      <div className="text-right">TWD 350</div>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-sm font-semibold">
                      <span>小計</span>
                      <span className="text-[color:var(--sw-accent)]">
                        {fmtMoney(segments.ib.fare)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ===== 總計 ===== */}
              <div className="pt-4 mt-4 border-t border-white/20 flex items-center justify-between text-lg font-extrabold">
                <span>總計</span>
                <span className="text-[color:var(--sw-accent)]">
                  {fmtMoney(segments.total)}
                </span>
              </div>
            </div>
          </section>

          {/* ================= 右側：白色卡片區 ================= */}
          <section className="md:col-span-5 space-y-6">
            {/* ===== 聯絡資訊 ===== */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-4">
              <h3 className="font-semibold text-lg text-[color:var(--sw-primary)]">
                聯絡資訊
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                <div className="md:col-span-6">
                  <label className="text-xs opacity-70">姓</label>
                  <input
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    value={contact.lastName}
                    onChange={(e) =>
                      setContact({ ...contact, lastName: e.target.value })
                    }
                    placeholder="Last name"
                  />
                </div>
                <div className="md:col-span-6">
                  <label className="text-xs opacity-70">名</label>
                  <input
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    value={contact.firstName}
                    onChange={(e) =>
                      setContact({ ...contact, firstName: e.target.value })
                    }
                    placeholder="First name"
                  />
                </div>

                <div className="md:col-span-6">
                  <label className="text-xs opacity-70">聯絡電話</label>
                  <input
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    value={contact.phone}
                    onChange={(e) =>
                      setContact({ ...contact, phone: e.target.value })
                    }
                    placeholder="Phone number"
                  />
                </div>

                <div className="md:col-span-6">
                  <label className="text-xs opacity-70">EMAIL</label>
                  <input
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    value={contact.email}
                    onChange={(e) =>
                      setContact({ ...contact, email: e.target.value })
                    }
                    placeholder="Your email"
                  />
                </div>
              </div>
            </div>

            {/* ===== 付款方式 ===== */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-4">
              <h3 className="font-semibold text-lg text-[color:var(--sw-primary)]">
                付款方式
              </h3>

              <div className="space-y-3">
                {/* 信用卡 */}
                <label
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer ${
                    payMethod === 'card'
                      ? 'border-[color:var(--sw-accent)] bg-[color:var(--sw-accent)]/5'
                      : 'border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="pay"
                      checked={payMethod === 'card'}
                      onChange={() => setPayMethod('card')}
                      className="accent-[color:var(--sw-accent)]"
                    />
                    信用卡付款
                  </div>
                </label>

                {/* LinePay */}
                <label
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer ${
                    payMethod === 'linepay'
                      ? 'border-[color:var(--sw-accent)] bg-[color:var(--sw-accent)]/5'
                      : 'border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="pay"
                      checked={payMethod === 'linepay'}
                      onChange={() => setPayMethod('linepay')}
                      className="accent-[color:var(--sw-accent)]"
                    />
                    LinePay
                  </div>
                </label>

                {/* 綠界 */}
                <label
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer ${
                    payMethod === 'ecpay'
                      ? 'border-[color:var(--sw-accent)] bg-[color:var(--sw-accent)]/5'
                      : 'border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="pay"
                      checked={payMethod === 'ecpay'}
                      onChange={() => setPayMethod('ecpay')}
                      className="accent-[color:var(--sw-accent)]"
                    />
                    綠界金流（ECPay）
                  </div>
                </label>
              </div>

              {/* 卡片資料 */}
              <div
                className={`grid grid-cols-1 md:grid-cols-12 gap-3 ${
                  payMethod === 'card' ? '' : 'opacity-50 pointer-events-none'
                }`}
              >
                <div className="md:col-span-12">
                  <label className="text-xs opacity-70">信用卡號</label>
                  <input
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    placeholder="1234 1234 1234 1234"
                    value={card.number}
                    onChange={(e) =>
                      setCard({ ...card, number: e.target.value })
                    }
                  />
                </div>
                <div className="md:col-span-6">
                  <label className="text-xs opacity-70">有效期限</label>
                  <input
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    placeholder="MM/YY"
                    value={card.exp}
                    onChange={(e) => setCard({ ...card, exp: e.target.value })}
                  />
                </div>
                <div className="md:col-span-6">
                  <label className="text-xs opacity-70">CVC</label>
                  <input
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    placeholder="CVC code"
                    value={card.cvc}
                    onChange={(e) => setCard({ ...card, cvc: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* ===== 底部按鈕 ===== */}
            <StepActions
              className="mt-4"
              onPrev={onPrev}
              onNext={onPay}
              prevText="上一步"
              nextText="付款"
              nextDisabled={false}
            />
          </section>
        </div>

        {/* 查看明細 modal */}
        <FareDetailsFromStore />
      </div>
    </div>
  );
}
