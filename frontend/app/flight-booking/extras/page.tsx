'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useBookingStore } from '../../../src/store/bookingStore';
import FlightInfoBar from '../components/FlightInfoBar';
import StepActions from '../components/StepActions';

/* ====================== Types ====================== */
type BaggageOption = {
  baggageId: number;
  weightKg: number;
  price: number; // TWD
  currency?: string;
};

type MealOption = {
  mealId: number;
  mealCode: string;
  mealName: string;
  price: number; // TWD
  currency?: string;
};

type FareStore = {
  flightId?: number;
  flightNo?: string;
  finalFare?: number;
  currency?: string;
  cabin?: string;
  leg?: {
    originCode: string;
    destinationCode: string;
    depTime: string;
    arrTime: string;
  };
};

type PassengerFormStore = {
  pax?: {
    gender?: 'M' | 'F';
    firstName?: string;
    lastName?: string;
    birthday?: string;
    nationality?: string;
    passportNo?: string;
    passportExpiry?: string;
  };
  contact?: {
    firstName?: string;
    lastName?: string;
    phoneCountry?: string;
    phone?: string;
    email?: string;
  };
};

/* =================== Utils / helpers =================== */
const fmtMoney = (n: number, currency = 'TWD') =>
  `${currency} ${Number(n || 0).toLocaleString('zh-TW', {
    maximumFractionDigits: 0,
  })}`;

/* ====================== Page ====================== */
export default function ExtrasPage() {
  const router = useRouter();
  const sp = useSearchParams();

  // Zustand setters：把票價與加購寫回全域金額狀態，讓 FlightInfoBar 即時更新
  const setBaseFare = useBookingStore((s) => s.setBaseFare);
  const setExtrasTotal = useBookingStore((s) => s.setExtrasTotal);

  // 後端選項
  const [bags, setBags] = useState<BaggageOption[]>([]);
  const [meals, setMeals] = useState<MealOption[]>([]);
  const [loading, setLoading] = useState(true);

  // 各方向的選擇（行李/餐點）
  const [obBag, setObBag] = useState<number | null>(null);
  const [ibBag, setIbBag] = useState<number | null>(null);
  const [obMeal, setObMeal] = useState<number | null>(null);
  const [ibMeal, setIbMeal] = useState<number | null>(null);

  // 只保留必要的 query 帶到下一頁
  const qsKeep = useMemo(() => {
    const keep = [
      'tripType',
      'origin',
      'destination',
      'departDate',
      'returnDate',
      'pax',
      'passengers',
      'cabin',
      'cabinClass',
    ];
    const out = new URLSearchParams();
    keep.forEach((k) => {
      const v = sp.get(k);
      if (v != null) out.set(k, v);
    });
    return out.toString();
  }, [sp]);

  // 讀取上一頁暫存的票價（必須含 flightId / finalFare）
  const outbound: FareStore | null = useMemo(() => {
    try {
      const s = sessionStorage.getItem('fare_outbound');
      return s ? JSON.parse(s) : null;
    } catch {
      return null;
    }
  }, []);
  const inbound: FareStore | null = useMemo(() => {
    try {
      const s = sessionStorage.getItem('fare_inbound');
      return s ? JSON.parse(s) : null;
    } catch {
      return null;
    }
  }, []);

  // 讀取乘客/聯絡人（建立訂單示意用）
  const formStore: PassengerFormStore = useMemo(() => {
    try {
      const s = sessionStorage.getItem('stelwing.passenger.form');
      return s ? JSON.parse(s) : {};
    } catch {
      return {};
    }
  }, []);

  const currency =
    outbound?.currency || inbound?.currency || sp.get('currency') || 'TWD';

  // 載入行李/餐點選項
  useEffect(() => {
    (async () => {
      try {
        const [bRes, mRes] = await Promise.all([
          fetch('http://localhost:3007/api/flight-booking/baggage-options', {
            cache: 'no-store',
          }),
          fetch('http://localhost:3007/api/flight-booking/meal-options', {
            cache: 'no-store',
          }),
        ]);
        const bJson = await bRes.json();
        const mJson = await mRes.json();
        setBags(bJson || []);
        setMeals(mJson || []);
      } catch (e) {
        console.error('載入行李/餐點失敗：', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 初始若 sessionStorage 有選過就還原
  useEffect(() => {
    try {
      const ob = sessionStorage.getItem('extras_outbound');
      if (ob) {
        const parsed = JSON.parse(ob);
        if (parsed?.baggageId) setObBag(parsed.baggageId);
        if (parsed?.mealId) setObMeal(parsed.mealId);
      }
      const ib = sessionStorage.getItem('extras_inbound');
      if (ib) {
        const parsed = JSON.parse(ib);
        if (parsed?.baggageId) setIbBag(parsed.baggageId);
        if (parsed?.mealId) setIbMeal(parsed.mealId);
      }
    } catch {}
  }, []);

  // 票價（不含加購）→ 寫回 store.baseFare
  const obFare = Math.round(outbound?.finalFare || 0);
  const ibFare = Math.round(inbound?.finalFare || 0);
  useEffect(() => {
    setBaseFare(obFare + ibFare);
  }, [obFare, ibFare, setBaseFare]);

  // 取得某選項價格（避免與 state 名稱衝突）
  const priceOfBag = (id: number | null) =>
    id ? bags.find((b) => b.baggageId === id)?.price || 0 : 0;
  const priceOfMeal = (id: number | null) =>
    id ? meals.find((m) => m.mealId === id)?.price || 0 : 0;

  // 加購合計 → 寫回 store.extrasTotal
  useEffect(() => {
    const extras =
      priceOfBag(obBag) +
      priceOfBag(ibBag) +
      priceOfMeal(obMeal) +
      priceOfMeal(ibMeal);
    setExtrasTotal(extras);
  }, [obBag, ibBag, obMeal, ibMeal, bags, meals, setExtrasTotal]);

  // 本頁顯示用（票價 + 加購）
  const obTotal = obFare + priceOfBag(obBag) + priceOfMeal(obMeal);
  const ibTotal = ibFare + priceOfBag(ibBag) + priceOfMeal(ibMeal);
  const grandTotal = obTotal + ibTotal;

  // 是否可下一步
  const canNext =
    !!outbound?.flightId &&
    (!!inbound?.flightId || sp.get('tripType') !== 'roundtrip');

  // 建立訂單（示意；如需可保留）
  const createBooking = async () => {
    if (!outbound?.flightId && !inbound?.flightId) {
      alert('缺少航班資訊，請返回上一頁重選。');
      return;
    }
    // 暫存使用者選擇，方便返回還原
    sessionStorage.setItem(
      'extras_outbound',
      JSON.stringify({
        baggageId: obBag || undefined,
        mealId: obMeal || undefined,
      })
    );
    sessionStorage.setItem(
      'extras_inbound',
      JSON.stringify({
        baggageId: ibBag || undefined,
        mealId: ibMeal || undefined,
      })
    );

    const pax = formStore?.pax || {};
    const contact = formStore?.contact || {};
    const details: Array<{
      flightId: number;
      tripType?: 'outbound' | 'inbound';
      seatId?: number;
      mealId?: number;
      baggageId?: number;
    }> = [];
    if (outbound?.flightId) {
      details.push({
        flightId: Number(outbound.flightId),
        tripType: 'outbound',
        mealId: obMeal || undefined,
        baggageId: obBag || undefined,
      });
    }
    if (inbound?.flightId) {
      details.push({
        flightId: Number(inbound.flightId),
        tripType: 'inbound',
        mealId: ibMeal || undefined,
        baggageId: ibBag || undefined,
      });
    }

    const payload = {
      firstName: pax.firstName || '',
      lastName: pax.lastName || '',
      gender: pax.gender || undefined,
      nationality: pax.nationality || undefined,
      passportNo: pax.passportNo || undefined,

      cabinClass: outbound?.cabin || 'economy',
      currency,
      totalAmount: Math.round(grandTotal),
      paymentStatus: 'pending',

      details,
      contactEmail: contact.email || undefined,
      contactPhone:
        (contact.phoneCountry ? `${contact.phoneCountry}-` : '') +
        (contact.phone || ''),
    };

    try {
      const res = await fetch('http://localhost:3007/api/flight-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) {
        console.error('Create booking failed:', result);
        alert(`建立訂單失敗：${result?.message || JSON.stringify(result)}`);
        return;
      }
      router.push(
        `/flight-booking/checkout?pnr=${encodeURIComponent(result.pnr)}`
      );
    } catch (e) {
      console.error(e);
      alert('建立訂單失敗');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Header 下方固定顯示 */}
      <FlightInfoBar />

      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 py-6 md:py-8">
        <h2 className="text-xl md:text-2xl font-bold text-[color:var(--sw-primary)] mb-2">
          行李與餐點
        </h2>
        <div className="text-sm text-[color:var(--sw-primary)]/70 mb-6">
          總額：
          <span className="font-semibold">
            {fmtMoney(grandTotal, currency)}
          </span>
        </div>

        {loading ? (
          <div>選項載入中…</div>
        ) : (
          <>
            {/* 托運行李選擇 */}
            <section className="rounded-2xl border border-[color:var(--sw-grey)]/30 bg-[color:var(--sw-primary)] text-[color:var(--sw-white)] p-5 md:p-6 shadow-sm">
              <h3 className="font-semibold mb-3">托運行李選擇</h3>

              {outbound?.flightId && (
                <div className="mb-5">
                  <div className="text-sm opacity-80 mb-2">
                    去程 {outbound.leg?.originCode} →{' '}
                    {outbound.leg?.destinationCode}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {bags.map((b) => (
                      <button
                        key={`ob-bag-${b.baggageId}`}
                        onClick={() =>
                          setObBag((cur) =>
                            cur === b.baggageId ? null : b.baggageId
                          )
                        }
                        className={`rounded-xl border px-4 py-2 text-sm ${
                          obBag === b.baggageId
                            ? 'bg-white text-[color:var(--sw-primary)] border-white'
                            : 'bg-white/10 border-white/20'
                        }`}
                      >
                        {b.weightKg} 公斤 ·{' '}
                        {fmtMoney(b.price, b.currency || 'TWD')}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {inbound?.flightId && (
                <div>
                  <div className="text-sm opacity-80 mb-2">
                    回程 {inbound.leg?.originCode} →{' '}
                    {inbound.leg?.destinationCode}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {bags.map((b) => (
                      <button
                        key={`ib-bag-${b.baggageId}`}
                        onClick={() =>
                          setIbBag((cur) =>
                            cur === b.baggageId ? null : b.baggageId
                          )
                        }
                        className={`rounded-xl border px-4 py-2 text-sm ${
                          ibBag === b.baggageId
                            ? 'bg-white text-[color:var(--sw-primary)] border-white'
                            : 'bg-white/10 border-white/20'
                        }`}
                      >
                        {b.weightKg} 公斤 ·{' '}
                        {fmtMoney(b.price, b.currency || 'TWD')}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* 機上餐點選擇 */}
            <section className="mt-6 rounded-2xl border border-[color:var(--sw-grey)]/30 bg-[color:var(--sw-primary)] text-[color:var(--sw-white)] p-5 md:p-6 shadow-sm">
              <h3 className="font-semibold mb-3">機上餐點選擇</h3>

              {outbound?.flightId && (
                <div className="mb-6">
                  <div className="text-sm opacity-80 mb-2">
                    去程 {outbound.leg?.originCode} →{' '}
                    {outbound.leg?.destinationCode}
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    {meals.map((m) => (
                      <div
                        key={`ob-meal-${m.mealId}`}
                        className={`rounded-2xl border p-4 ${
                          obMeal === m.mealId
                            ? 'bg-white text-[color:var(--sw-primary)] border-white'
                            : 'bg-white/10 border-white/20'
                        }`}
                      >
                        <div className="text-sm font-semibold">
                          {m.mealName}
                        </div>
                        <div className="mt-1 text-xs opacity-80">
                          {m.mealCode}
                        </div>
                        <div className="mt-3 text-sm font-bold">
                          {fmtMoney(m.price, m.currency || 'TWD')}
                        </div>
                        <div className="mt-3 flex justify-end">
                          <button
                            className="sw-btn sw-btn--outline rounded-full"
                            onClick={() =>
                              setObMeal((cur) =>
                                cur === m.mealId ? null : m.mealId
                              )
                            }
                          >
                            {obMeal === m.mealId ? '取消' : '選擇'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {inbound?.flightId && (
                <div>
                  <div className="text-sm opacity-80 mb-2">
                    回程 {inbound.leg?.originCode} →{' '}
                    {inbound.leg?.destinationCode}
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    {meals.map((m) => (
                      <div
                        key={`ib-meal-${m.mealId}`}
                        className={`rounded-2xl border p-4 ${
                          ibMeal === m.mealId
                            ? 'bg-white text-[color:var(--sw-primary)] border-white'
                            : 'bg-white/10 border-white/20'
                        }`}
                      >
                        <div className="text-sm font-semibold">
                          {m.mealName}
                        </div>
                        <div className="mt-1 text-xs opacity-80">
                          {m.mealCode}
                        </div>
                        <div className="mt-3 text-sm font-bold">
                          {fmtMoney(m.price, m.currency || 'TWD')}
                        </div>
                        <div className="mt-3 flex justify-end">
                          <button
                            className="sw-btn sw-btn--outline rounded-full"
                            onClick={() =>
                              setIbMeal((cur) =>
                                cur === m.mealId ? null : m.mealId
                              )
                            }
                          >
                            {ibMeal === m.mealId ? '取消' : '選擇'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* 底部操作列 */}
            <StepActions
              onPrev={() => router.back()}
              onNext={() => {
                // 保險再寫一次 extrasTotal
                const extras =
                  priceOfBag(obBag) +
                  priceOfBag(ibBag) +
                  priceOfMeal(obMeal) +
                  priceOfMeal(ibMeal);
                setExtrasTotal(extras);
                router.push(`/flight-booking/seats?${qsKeep}`);
                // 若要直接建立訂單，改呼叫 createBooking()
              }}
              nextDisabled={!canNext}
            />
          </>
        )}
      </div>
    </div>
  );
}
