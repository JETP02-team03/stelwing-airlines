'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import FlightInfoBar from '../components/FlightInfoBar';
import FareBundleCard, { FareBundle } from './components/FareBundleCard';

/** ==== 假資料（照你的 UI 三種方案） ==== */
function buildBundles(currency = 'TWD'): FareBundle[] {
  return [
    {
      id: 'value',
      name: '超值',
      price: 8888,
      currency,
      features: [
        { key: 'hand', label: '手提行李', included: true },
        { key: 'checked', label: '托運行李', included: true },
        { key: 'seat', label: '座位選擇', included: true },
        { key: 'meal', label: '組合餐點', included: false },
        { key: 'refund', label: '退票費用', included: false, note: 'TWD 1000' },
      ],
    },
    {
      id: 'basic',
      name: '基本',
      price: 9999,
      currency,
      features: [
        { key: 'hand', label: '手提行李', included: true },
        { key: 'checked', label: '托運行李', included: true },
        { key: 'seat', label: '座位選擇', included: true },
        { key: 'meal', label: '組合餐點', included: true },
        { key: 'refund', label: '退票費用', included: false, note: '—' },
      ],
    },
    {
      id: 'luxury',
      name: '豪華',
      price: 12000,
      currency,
      features: [
        { key: 'hand', label: '手提行李', included: true },
        { key: 'checked', label: '托運行李', included: true },
        { key: 'seat', label: '座位選擇', included: true },
        { key: 'meal', label: '組合餐點', included: true },
        { key: 'refund', label: '退票費用', included: false, note: '—' },
      ],
    },
  ];
}

/** 工具：format number */
const fmt = (n: number) =>
  new Intl.NumberFormat('zh-Hant', { maximumFractionDigits: 0 }).format(n);

/** 工具：把物件安全轉 URLSearchParams 字串（忽略空值） */
function toQS(obj: Record<string, any>) {
  const sp = new URLSearchParams();
  Object.entries(obj).forEach(([k, v]) => {
    if (v === undefined || v === null || v === '') return;
    sp.set(k, String(v));
  });
  return sp.toString();
}

export default function FarePage() {
  const router = useRouter();
  const sp = useSearchParams();

  /** ===== 從上一頁帶來的基本參數（保持 FlightInfoBar 一致） ===== */
  const tripType = sp.get('tripType') ?? 'roundtrip';
  const origin = sp.get('origin') ?? 'TPE';
  const destination = sp.get('destination') ?? 'NRT';
  const departDate = sp.get('departDate') ?? '';
  const returnDate = sp.get('returnDate') ?? '';
  const cabin = sp.get('cabin') ?? '經濟艙';
  const currency = sp.get('currency') ?? 'TWD';

  /** ===== 本頁控制：方向與班號 ===== */
  const dir = (sp.get('dir') as 'outbound' | 'inbound') ?? 'outbound';
  const flightNo = sp.get('flightNo') ?? '';

  /** ===== 票價方案（假資料） ===== */
  const bundles = useMemo(() => buildBundles(currency), [currency]);

  /** ===== Modal 狀態 ===== */
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<FareBundle | null>(null);

  /** 點選票種卡片 */
  const handleSelect = (b: FareBundle) => {
    setSelected(b);
    setOpen(true);
  };

  /** 返回上一頁（維持你的流程） */
  const handleBack = () => {
    setOpen(false);
    router.back();
  };

  /** 確認票種 */
  const handleConfirm = () => {
    if (!selected || !flightNo) return;

    // 先拿到現有的所有參數（保留 ob* / ib* 舊狀態）
    const current = Object.fromEntries(sp.entries());

    // 共用基本參數（保險起見，確保還在 URL 上）
    const base = {
      tripType,
      origin,
      destination,
      departDate,
      returnDate,
      cabin,
      currency,
    };

    // 依方向寫回該段的票價、方案 id 與「方案名稱」，也帶上已選航班
    const payload =
      dir === 'inbound'
        ? {
            ibFare: selected.price,
            ibBundle: selected.id,
            ibBundleName: selected.name, // 讓 FlightCard 顯示中文名稱
            ibFlight: flightNo,
            focus: 'inbound', // 返回列表後聚焦回程（你的流程）
          }
        : {
            obFare: selected.price,
            obBundle: selected.id,
            obBundleName: selected.name,
            obFlight: flightNo,
            focus: tripType === 'roundtrip' ? 'inbound' : undefined, // 來回就導去選回程
          };

    // 合併：舊參數 + 基礎 + 這次選擇
    const qs = toQS({ ...current, ...base, ...payload });

    // 回到 flight-booking，讓 FlightInfoBar 與 FlightCard 自動連動
    router.push(`/flight-booking?${qs}`);
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* 上方共用資訊條（沿用） */}
      <FlightInfoBar />

      {/* 主要內容：三欄卡片（照你的版型） */}
      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        <h2 className="text-xl font-extrabold mb-6">
          {dir === 'inbound' ? '回程 票價組合' : '去程 票價組合'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bundles.map((b) => (
            <FareBundleCard
              key={b.id}
              bundle={b}
              onSelect={() => handleSelect(b)}
            />
          ))}
        </div>
      </main>

      {/* 確認視窗（保持你原本的互動文案） */}
      {open && selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-[101] w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-extrabold mb-3">確認票價組合</h3>

            <div className="mb-4 rounded-xl bg-[var(--sw-primary)] text-[var(--sw-white)] p-4">
              <div className="text-sm opacity-80 mb-1">
                {dir === 'inbound' ? '回程' : '去程'}：{flightNo}
              </div>
              <div className="text-xl font-extrabold">{selected.name}</div>
              <div className="mt-1 text-sm opacity-90">
                價格：{currency} {fmt(selected.price)}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button className="sw-btn" onClick={handleBack}>
                返回上一頁
              </button>
              <button
                className="sw-btn sw-btn--gold-primary"
                onClick={handleConfirm}
              >
                確認此票種
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
