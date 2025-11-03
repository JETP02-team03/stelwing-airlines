'use client';

import clsx from 'clsx';
import {
  Armchair,
  ArrowLeftRight,
  Calendar,
  ChevronDown,
  Plane,
  Ticket,
  User,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { JSX, useMemo, useRef, useState } from 'react';

/**
 * 行程類型：
 * - 'roundtrip'：來回行程
 * - 'oneway'：單程行程
 * 艙等類別：
 * - 'Economy'：經濟艙
 * - 'Business'：商務艙
 */
export type TripType = 'roundtrip' | 'oneway';
export type CabinClass = 'Economy' | 'Business';

export interface AirportOption {
  code: string;
  city: string;
  label?: string;
}

export interface FlightSearchValues {
  tripType: TripType;
  origin: string;
  destination: string;
  departDate: string;
  returnDate?: string;
  passengers: number;
  cabinClass: CabinClass;
}

/**
 * FlightSearchCard 元件可接收的屬性
 * @property className - 自訂 CSS 類名（可選）
 * @property style - 內聯樣式（可選）
 * @property initialValues - 預設填入的初始搜尋資料（部分可省略）
 * @property airports - 可選的機場清單（若未提供，使用 DEFAULT_AIRPORTS）
 * @property onSubmit - 表單送出後的回呼函式，會回傳完整的搜尋資料
 */
export interface FlightSearchCardProps {
  className?: string;
  style?: React.CSSProperties;
  initialValues?: Partial<FlightSearchValues>;
  airports?: AirportOption[];
  onSubmit?: (values: FlightSearchValues) => void;
}

/** 預設機場 */
const DEFAULT_AIRPORTS: AirportOption[] = [
  { code: 'TPE', city: '台北', label: '台北' },
  { code: 'TYO', city: '東京', label: '東京' },
  { code: 'HKG', city: '香港' },
  { code: 'SIN', city: '新加坡' },
];

/**
 * TODAY：當天日期的 ISO 格式（YYYY-MM-DD）
 * 用於預設出發日期。
 */
const TODAY = new Date().toISOString().slice(0, 10);

/**
 * FieldShell 元件
 * 這是一個「欄位外殼」的共用元件，用於包裝表單項目。
 * 結構為「左側 icon + 中間 children（內容）+ 右側下拉箭頭裝飾（可選）」。
 */
const FieldShell: React.FC<{
  label: string; // 顯示於上方的小標籤文字
  icon: JSX.Element; // 左側的圖示元件
  children: React.ReactNode; // 放入主要內容的區域（例如 input、文字）
  showChevron?: boolean; // 是否顯示右側箭頭，預設 true
}> = ({ label, icon, children, showChevron = true }) => (
  <div className="flex flex-col gap-1">
    {/* 上方的欄位標籤 */}
    <span className="text-xs text-[#1F2E3C]/70">{label}</span>
    {/* 下方的輸入外框區域 */}
    <div className="relative h-12 w-full flex items-center gap-2 rounded-[10px] bg-white border border-[#DCBB87] px-3">
      {/* 左側 icon（設定 pointer-events-none 以防被點擊） */}
      <span className="text-[#1F2E3C] pointer-events-none">{icon}</span>
      {/* 中間主要內容區塊（例如輸入框或選項） */}
      <div className="flex-1">{children}</div>
      {/* 右側裝飾箭頭：僅在 showChevron 為 true 時顯示，不吃點擊事件 */}
      {showChevron && (
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1F2E3C]" />
      )}
    </div>
  </div>
);

export default function FlightSearchCard({
  className,
  style,
  initialValues,
  airports = DEFAULT_AIRPORTS,
  onSubmit,
}: FlightSearchCardProps) {
  const router = useRouter(); // 用來導頁
  const [values, setValues] = useState<FlightSearchValues>(() => ({
    tripType: initialValues?.tripType ?? 'roundtrip',
    origin: initialValues?.origin ?? airports[0]?.code ?? '',
    destination: initialValues?.destination ?? airports[1]?.code ?? '',
    departDate: initialValues?.departDate ?? TODAY,
    returnDate:
      initialValues?.tripType === 'oneway'
        ? undefined
        : (initialValues?.returnDate ?? TODAY),
    passengers: initialValues?.passengers ?? 1,
    cabinClass: initialValues?.cabinClass ?? 'Business',
  }));

  // 📅 Ref：日期輸入框的參考（用於手動觸發 focus 或控制輸入）
  const departRef = useRef<HTMLInputElement | null>(null);
  const returnRef = useRef<HTMLInputElement | null>(null);

  /**
   * useMemo：
   * 只有當 values 改變時才重新計算，避免不必要 re-render。
   *
   * 驗證條件：
   * 出發地、目的地、出發日期必填
   * 乘客人數必須大於 0
   * 若為 roundtrip（來回），則 returnDate 也必填
   */
  const canSubmit = useMemo(() => {
    const base =
      !!values.origin &&
      !!values.destination &&
      !!values.departDate &&
      values.passengers > 0;
    return values.tripType === 'roundtrip' ? base && !!values.returnDate : base;
  }, [values]);

  // 更新指定欄位的值（如出發地、目的地、日期等）
  const handle = <K extends keyof FlightSearchValues>(
    key: K,
    value: FlightSearchValues[K]
  ) => setValues((prev) => ({ ...prev, [key]: value }));

  // 交換出發地與目的地
  const swapOD = () =>
    setValues((v) => ({ ...v, origin: v.destination, destination: v.origin }));

  // 開啟出發或回程日期選擇器
  const openPicker = (which: 'depart' | 'return') => {
    // 根據傳入參數決定要操作哪一個日期輸入框
    const el = which === 'depart' ? departRef.current : returnRef.current;
    // 若瀏覽器支援 showPicker()，直接開啟日期選擇器
    if (el?.showPicker) el.showPicker();
    // 若不支援，則聚焦該 input，讓使用者自行開啟
    else el?.focus();
  };

  const handleSubmit = () => {
    if (!canSubmit) return;

    // 若父層還想接 `onSubmit` 做紀錄/埋點，可先呼叫
    onSubmit?.(values);

    const params = new URLSearchParams({
      tripType: values.tripType,
      origin: values.origin,
      destination: values.destination,
      departDate: values.departDate,
      ...(values.tripType === 'roundtrip' && values.returnDate
        ? { returnDate: values.returnDate }
        : {}),
      passengers: String(values.passengers),
      cabinClass: values.cabinClass,
    });

    router.push(`/flight-booking?${params.toString()}`);
  };

  /** 切換 單程 / 來回（置中分頁使用） */
  const setTripType = (tt: TripType) => {
    setValues((prev) => {
      if (tt === 'oneway') {
        return { ...prev, tripType: tt, returnDate: undefined };
      }
      const nextReturn =
        prev.returnDate && prev.returnDate >= prev.departDate
          ? prev.returnDate
          : prev.departDate;
      return { ...prev, tripType: tt, returnDate: nextReturn };
    });
  };

  return (
    <div
      className={clsx(
        'w-full max-w-[1140px] rounded-[12px] overflow-hidden shadow-sm border border-[#DCBB87]/60 bg-white',
        className
      )}
      style={style}
    >
      <div className="bg-[#DCBB87] py-2">
        <div className="flex justify-center">
          <div
            role="tablist"
            aria-label="行程類型"
            className="inline-flex rounded-full bg-[#1F2E3C]/10 p-1"
          >
            <button
              role="tab"
              aria-selected={values.tripType === 'roundtrip'}
              onClick={() => setTripType('roundtrip')}
              className={clsx(
                'px-4 sm:px-5 py-1.5 rounded-full text-sm font-medium transition',
                values.tripType === 'roundtrip'
                  ? 'bg-white text-[#1F2E3C] shadow'
                  : 'text-[#1F2E3C]/80 hover:bg-white/30'
              )}
            >
              來回
            </button>
            <button
              role="tab"
              aria-selected={values.tripType === 'oneway'}
              onClick={() => setTripType('oneway')}
              className={clsx(
                'px-4 sm:px-5 py-1.5 rounded-full text-sm font-medium transition',
                values.tripType === 'oneway'
                  ? 'bg-white text-[#1F2E3C] shadow'
                  : 'text-[#1F2E3C]/80 hover:bg-white/30'
              )}
            >
              單程
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-6 pt-4 pb-5">
        {/* 第 1 排：起點(5) | 交換(2) | 到達(5) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          {/* 起點 */}
          <div className="md:col-span-5">
            <FieldShell
              label="起點"
              icon={<Plane className="w-4 h-4 text-[#1F2E3C]" />}
            >
              <select
                className="w-full bg-white text-[#1F2E3C] outline-none appearance-none pr-6"
                value={values.origin}
                onChange={(e) => handle('origin', e.target.value)}
              >
                {airports.map((a) => (
                  <option key={a.code} value={a.code}>
                    {a.label ?? a.city}
                  </option>
                ))}
              </select>
            </FieldShell>
          </div>

          {/* 交換（置中） */}
          <div className="hidden md:flex md:col-span-2 items-end pb-0.5 justify-center">
            <button
              type="button"
              onClick={swapOD}
              className="h-12 w-12 rounded-full border border-[#DCBB87] bg-white text-[#1F2E3C]/80 hover:text-[#1F2E3C] shadow-sm flex items-center justify-center"
              title="交換起點與到達"
              aria-label="交換起點與到達"
            >
              <ArrowLeftRight className="w-5 h-5" />
            </button>
          </div>

          {/* 到達 */}
          <div className="md:col-span-5">
            <FieldShell
              label="到達"
              icon={<Plane className="w-4 h-4 text-[#1F2E3C]" />}
            >
              <select
                className="w-full bg-white text-[#1F2E3C] outline-none appearance-none pr-6"
                value={values.destination}
                onChange={(e) => handle('destination', e.target.value)}
              >
                {airports.map((a) => (
                  <option key={a.code} value={a.code}>
                    {a.label ?? a.city}
                  </option>
                ))}
              </select>
            </FieldShell>
          </div>
        </div>

        {/* 第 2 排：日期(6) | 乘客(3) | 艙等(3) */}
        <div className="mt-3 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          {/* 日期 */}
          <div className="md:col-span-6">
            <FieldShell
              label="日期"
              icon={<Calendar className="w-4 h-4 text-[#1F2E3C]" />}
              showChevron={false}
            >
              <div className="flex items-center gap-5 w-full">
                {/* 出發日 */}
                <button
                  type="button"
                  onClick={() => openPicker('depart')}
                  className="flex items-center gap-2"
                >
                  <span className="text-xs text-[#1F2E3C]/70 whitespace-nowrap">
                    出發日
                  </span>
                  <input
                    ref={departRef}
                    type="date"
                    className="bg-white text-[#1F2E3C] outline-none"
                    value={values.departDate}
                    min={TODAY}
                    onChange={(e) => handle('departDate', e.target.value)}
                  />
                </button>

                <span className="text-[#1F2E3C]/40">—</span>

                {/* 往返日（單程禁用） */}
                <button
                  type="button"
                  onClick={() => openPicker('return')}
                  className="flex items-center gap-2"
                  disabled={values.tripType === 'oneway'}
                >
                  <span className="text-xs text-[#1F2E3C]/70 whitespace-nowrap">
                    往返日
                  </span>
                  <input
                    ref={returnRef}
                    type="date"
                    className="bg-white text-[#1F2E3C] outline-none disabled:opacity-50"
                    value={values.returnDate ?? ''}
                    min={values.departDate || TODAY}
                    onChange={(e) => handle('returnDate', e.target.value)}
                    disabled={values.tripType === 'oneway'}
                  />
                </button>
              </div>
            </FieldShell>
          </div>

          {/* 乘客 */}
          <div className="md:col-span-3">
            <FieldShell
              label="乘客"
              icon={<User className="w-4 h-4 text-[#1F2E3C]" />}
            >
              <select
                className="w-full bg-white text-[#1F2E3C] outline-none appearance-none pr-6"
                value={values.passengers}
                onChange={(e) => handle('passengers', Number(e.target.value))}
              >
                {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </FieldShell>
          </div>

          {/* 艙等 */}
          <div className="md:col-span-3">
            <FieldShell
              label="艙等"
              icon={<Armchair className="w-4 h-4 text-[#1F2E3C]" />}
            >
              <select
                className="w-full bg-white text-[#1F2E3C] outline-none appearance-none pr-6"
                value={values.cabinClass}
                onChange={(e) =>
                  handle('cabinClass', e.target.value as CabinClass)
                }
              >
                <option value="Economy">經濟艙</option>
                <option value="Business">商務艙</option>
              </select>
            </FieldShell>
          </div>
        </div>

        {/* 送出 */}
        <div className="w-full flex justify-center mt-6">
          <button
            type="button"
            disabled={!canSubmit}
            onClick={handleSubmit}
            className={clsx(
              'inline-flex items-center gap-2 rounded-full px-6 py-2 text-sm font-medium',
              canSubmit
                ? 'bg-[#DCBB87] text-[#1F2E3C] hover:opacity-90'
                : 'bg-[#DCBB87]/60 text-[#1F2E3C]/80 cursor-not-allowed'
            )}
          >
            <Ticket className="w-4 h-4 text-[#1F2E3C]" />
            訂購機票
          </button>
        </div>
      </div>
    </div>
  );
}
