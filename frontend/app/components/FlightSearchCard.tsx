'use client';

import clsx from 'clsx';
import {
  Armchair,
  ArrowLeftRight,
  Calendar,
  ChevronDown,
  ChevronLeft,
  Plane,
  Ticket,
  User,
  X,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { JSX, useEffect, useMemo, useRef, useState } from 'react';

export type TripType = 'roundtrip' | 'oneway';
export type CabinClass = 'Economy' | 'Business';

type AirportNode = { code: string; name: string };
type CityNode = { cityId: string; cityName: string; airports: AirportNode[] };
type CountryNode = {
  countryId: string;
  countryCode: string;
  countryName: string;
  cities: CityNode[];
};

export interface FlightSearchValues {
  tripType: TripType;
  origin: string; // IATA
  destination: string; // IATA
  departDate: string;
  returnDate?: string;
  passengers: number;
  cabinClass: CabinClass;
}

/** ===== Mock / API 切換 ===== */
const USE_MOCK = true;
const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:3007';

/** ===== 公用 FieldShell（吃 globals token） ===== */
const FieldShell: React.FC<{
  label: string;
  icon: JSX.Element;
  children: React.ReactNode;
  showChevron?: boolean;
}> = ({ label, icon, children, showChevron = true }) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs text-[color:var(--sw-primary)]/70">{label}</span>
    <div className="relative h-12 w-full flex items-center gap-2 rounded-[var(--sw-r-md)] bg-[color:var(--sw-white)] border border-[color:var(--sw-accent)] px-3">
      <span className="text-[color:var(--sw-primary)] pointer-events-none">
        {icon}
      </span>
      <div className="flex-1">{children}</div>
      {showChevron && (
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--sw-primary)]" />
      )}
    </div>
  </div>
);

/** ===== 簡易 Modal ===== */
function Modal({
  open,
  onClose,
  children,
  title,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      aria-modal
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative w-[min(680px,92vw)] rounded-[var(--sw-r-lg)] bg-[color:var(--sw-white)] shadow-xl border border-[color:var(--sw-accent)]">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[color:var(--sw-grey)]/50">
          <div className="sw-h5 text-[color:var(--sw-primary)]">
            {title ?? '選擇地點'}
          </div>
          <button
            onClick={onClose}
            aria-label="關閉"
            className="sw-btn sw-btn--grey-square h-8 px-2 py-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

type Level = 'country' | 'city' | 'airport';

/** ===== 地點挑選器（國家→城市→機場） ===== */
function LocationPicker({
  locations,
  onConfirm,
  onCancel,
  initial,
}: {
  locations: CountryNode[];
  onConfirm: (pickedIata: string) => void;
  onCancel: () => void;
  /** 若要預設某條路徑，例如 { countryId: '1', cityId:'10' } */
  initial?: { countryId?: string; cityId?: string };
}) {
  const [level, setLevel] = useState<Level>('country');
  const [countryId, setCountryId] = useState(initial?.countryId ?? '');
  const [cityId, setCityId] = useState(initial?.cityId ?? '');

  useEffect(() => {
    if (initial?.countryId) setLevel(initial.cityId ? 'airport' : 'city');
  }, [initial?.countryId, initial?.cityId]);

  const country = locations.find((c) => c.countryId === countryId);
  const cities = country?.cities ?? [];
  const city = cities.find((ci) => ci.cityId === cityId);
  const airports = city?.airports ?? [];

  const goBack = () => {
    if (level === 'airport') setLevel('city');
    else if (level === 'city') setLevel('country');
  };

  return (
    <div className="space-y-4">
      {/* 麵包屑 */}
      <div className="flex items-center gap-2 text-sm text-[color:var(--sw-primary)]/70">
        <button
          className="inline-flex items-center gap-1 hover:underline disabled:opacity-50"
          onClick={goBack}
          disabled={level === 'country'}
        >
          <ChevronLeft className="w-4 h-4" />
          返回
        </button>
        <span className="mx-1">|</span>
        <span>
          {country ? country.countryName : '選國家'}
          {country && level !== 'country' ? ' › ' : ''}
          {city ? city.cityName : level === 'airport' ? '選城市' : ''}
        </span>
      </div>

      {/* 清單 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[48vh] overflow-auto pr-1">
        {level === 'country' &&
          locations.map((c) => (
            <button
              key={c.countryId}
              className="sw-btn sw-btn--grey-square justify-start"
              onClick={() => {
                setCountryId(c.countryId);
                setLevel('city');
              }}
            >
              {c.countryName}
            </button>
          ))}

        {level === 'city' &&
          cities.map((ci) => (
            <button
              key={ci.cityId}
              className="sw-btn sw-btn--grey-square justify-start"
              onClick={() => {
                setCityId(ci.cityId);
                setLevel('airport');
              }}
            >
              {ci.cityName}
            </button>
          ))}

        {level === 'airport' &&
          airports.map((ap) => (
            <button
              key={ap.code}
              className="sw-btn sw-btn--gold-square justify-between"
              onClick={() => onConfirm(ap.code)}
              title={`${ap.code} — ${ap.name}`}
            >
              <span>✈️ {ap.code}</span>
              <span className="sw-p2">{ap.name}</span>
            </button>
          ))}
      </div>

      {/* 底部動作 */}
      <div className="flex justify-end gap-2 pt-2">
        <button className="sw-btn sw-btn--grey-square" onClick={onCancel}>
          取消
        </button>
        {/* 選機場時按鈕等於直接點選項確定，所以這裡不用再放「確認」 */}
      </div>
    </div>
  );
}

/** ===== 主卡片 ===== */
const TODAY = new Date().toISOString().slice(0, 10);

export default function FlightSearchCard() {
  const router = useRouter();

  const [values, setValues] = useState<FlightSearchValues>({
    tripType: 'roundtrip',
    origin: '',
    destination: '',
    departDate: TODAY,
    returnDate: TODAY,
    passengers: 1,
    cabinClass: 'Economy',
  });

  const [locations, setLocations] = useState<CountryNode[]>([]);
  const [loadingLoc, setLoadingLoc] = useState(true);

  // Modal 控制
  const [openOriginPicker, setOpenOriginPicker] = useState(false);
  const [openDestPicker, setOpenDestPicker] = useState(false);

  // 讓日期 input 可程式開啟
  const departRef = useRef<HTMLInputElement | null>(null);
  const returnRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    (async () => {
      setLoadingLoc(true);
      if (USE_MOCK) {
        const mock: { countries: CountryNode[] } = {
          countries: [
            {
              countryId: '1',
              countryCode: 'TW',
              countryName: 'Taiwan',
              cities: [
                {
                  cityId: '10',
                  cityName: 'Taipei',
                  airports: [
                    { code: 'TPE', name: '台北桃園國際機場' },
                    { code: 'TSA', name: '台北松山機場' },
                  ],
                },
                {
                  cityId: '11',
                  cityName: 'Kaohsiung',
                  airports: [{ code: 'KHH', name: '高雄國際機場' }],
                },
              ],
            },
            {
              countryId: '2',
              countryCode: 'JP',
              countryName: 'Japan',
              cities: [
                {
                  cityId: '20',
                  cityName: 'Tokyo',
                  airports: [
                    { code: 'NRT', name: '成田國際機場' },
                    { code: 'HND', name: '羽田機場' },
                  ],
                },
                {
                  cityId: '21',
                  cityName: 'Osaka',
                  airports: [{ code: 'KIX', name: '關西國際機場' }],
                },
              ],
            },
          ],
        };
        setLocations(mock.countries);
        // 給個預設（可移除）
        setValues((v) => ({ ...v, origin: 'TPE', destination: 'NRT' }));
      } else {
        const res = await fetch(
          `${API_BASE.replace(/\/$/, '')}/api/meta/locations`,
          {
            cache: 'no-store',
          }
        );
        const json = await res.json();
        setLocations(json.countries || []);
      }
      setLoadingLoc(false);
    })();
  }, []);

  const canSubmit = useMemo(() => {
    const base =
      !!values.origin &&
      !!values.destination &&
      !!values.departDate &&
      values.passengers > 0;
    return values.tripType === 'roundtrip' ? base && !!values.returnDate : base;
  }, [values]);

  const handle = <K extends keyof FlightSearchValues>(
    key: K,
    value: FlightSearchValues[K]
  ) => setValues((prev) => ({ ...prev, [key]: value }));

  const swapOD = () =>
    setValues((v) => ({ ...v, origin: v.destination, destination: v.origin }));

  const openPicker = (which: 'depart' | 'return') => {
    const el = which === 'depart' ? departRef.current : returnRef.current;
    if (el?.showPicker) el.showPicker();
    else el?.focus();
  };

  const setTripType = (tt: TripType) => {
    setValues((prev) =>
      tt === 'oneway'
        ? { ...prev, tripType: tt, returnDate: undefined }
        : { ...prev, tripType: tt, returnDate: prev.returnDate ?? TODAY }
    );
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
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

  // 幫 IATA 顯示對應名稱
  const findAirportLabel = (iata?: string) => {
    if (!iata) return '';
    for (const co of locations) {
      for (const ci of co.cities) {
        const ap = ci.airports.find((a) => a.code === iata);
        if (ap) return `${ap.code} — ${ap.name}`;
      }
    }
    return iata;
  };

  return (
    <>
      <div
        className={clsx(
          'w-full max-w-[1140px] overflow-hidden shadow-sm',
          'rounded-[var(--sw-r-md)] border border-[color:var(--sw-accent)] bg-[color:var(--sw-white)]'
        )}
      >
        {/* Tabs */}
        <div className="py-2 flex justify-center bg-[color:var(--sw-accent)]">
          <div
            role="tablist"
            aria-label="行程類型"
            className="inline-flex rounded-full bg-[color:var(--sw-primary)]/10 p-1"
          >
            <button
              onClick={() => setTripType('roundtrip')}
              className={clsx(
                'px-4 sm:px-5 py-1.5 rounded-full text-sm font-medium transition',
                values.tripType === 'roundtrip'
                  ? 'bg-[color:var(--sw-white)] text-[color:var(--sw-primary)] shadow'
                  : 'text-[color:var(--sw-primary)]/80 hover:bg-[color:var(--sw-white)]/30'
              )}
            >
              來回
            </button>
            <button
              onClick={() => setTripType('oneway')}
              className={clsx(
                'px-4 sm:px-5 py-1.5 rounded-full text-sm font-medium transition',
                values.tripType === 'oneway'
                  ? 'bg-[color:var(--sw-white)] text-[color:var(--sw-primary)] shadow'
                  : 'text-[color:var(--sw-primary)]/80 hover:bg-[color:var(--sw-white)]/30'
              )}
            >
              單程
            </button>
          </div>
        </div>

        {/* 表單 */}
        <div className="px-4 md:px-6 pt-4 pb-5">
          {/* 第 1 排：起點 | 交換 | 到達 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
            {/* 起點（點一下開 Modal） */}
            <div className="md:col-span-5">
              <FieldShell
                label="起點"
                icon={
                  <Plane className="w-4 h-4 text-[color:var(--sw-primary)]" />
                }
              >
                <button
                  type="button"
                  disabled={loadingLoc}
                  onClick={() => setOpenOriginPicker(true)}
                  className="w-full text-left bg-transparent outline-none"
                  title="點擊選擇起點"
                >
                  {values.origin ? (
                    <span className="text-[color:var(--sw-primary)]">
                      {findAirportLabel(values.origin)}
                    </span>
                  ) : (
                    <span className="text-[color:var(--sw-primary)]/50">
                      選擇國家 / 城市 / 機場
                    </span>
                  )}
                </button>
              </FieldShell>
            </div>

            {/* 交換 */}
            <div className="hidden md:flex md:col-span-2 items-end justify-center">
              <button
                onClick={swapOD}
                title="交換起點與到達"
                className="h-12 w-12 rounded-full border border-[color:var(--sw-accent)] bg-[color:var(--sw-white)] text-[color:var(--sw-primary)]/80 hover:text-[color:var(--sw-primary)] flex items-center justify-center shadow-sm"
              >
                <ArrowLeftRight className="w-5 h-5" />
              </button>
            </div>

            {/* 到達（點一下開 Modal） */}
            <div className="md:col-span-5">
              <FieldShell
                label="到達"
                icon={
                  <Plane className="w-4 h-4 text-[color:var(--sw-primary)]" />
                }
              >
                <button
                  type="button"
                  disabled={loadingLoc}
                  onClick={() => setOpenDestPicker(true)}
                  className="w-full text-left bg-transparent outline-none"
                  title="點擊選擇到達"
                >
                  {values.destination ? (
                    <span className="text-[color:var(--sw-primary)]">
                      {findAirportLabel(values.destination)}
                    </span>
                  ) : (
                    <span className="text-[color:var(--sw-primary)]/50">
                      選擇國家 / 城市 / 機場
                    </span>
                  )}
                </button>
              </FieldShell>
            </div>
          </div>

          {/* 第 2 排：日期 / 乘客 / 艙等 */}
          <div className="mt-3 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
            <div className="md:col-span-6">
              <FieldShell
                label="日期"
                icon={<Calendar className="w-4 h-4" />}
                showChevron={false}
              >
                <div className="flex items-center gap-5">
                  <button
                    onClick={() => openPicker('depart')}
                    className="flex items-center gap-2"
                  >
                    <span className="text-xs text-[color:var(--sw-primary)]/70">
                      出發
                    </span>
                    <input
                      ref={departRef}
                      type="date"
                      className="bg-(--sw-white) text-(--sw-primary) outline-none"
                      value={values.departDate}
                      min={TODAY}
                      onChange={(e) => handle('departDate', e.target.value)}
                    />
                  </button>
                  <span className="text-[color:var(--sw-primary)]/40">—</span>
                  <button
                    onClick={() => openPicker('return')}
                    disabled={values.tripType === 'oneway'}
                    className="flex items-center gap-2 disabled:opacity-50"
                  >
                    <span className="text-xs text-[color:var(--sw-primary)]/70">
                      回程
                    </span>
                    <input
                      ref={returnRef}
                      type="date"
                      className="bg-[color:var(--sw-white)] text-[color:var(--sw-primary)] outline-none"
                      value={values.returnDate ?? ''}
                      min={values.departDate || TODAY}
                      onChange={(e) => handle('returnDate', e.target.value)}
                      disabled={values.tripType === 'oneway'}
                    />
                  </button>
                </div>
              </FieldShell>
            </div>

            <div className="md:col-span-3">
              <FieldShell label="乘客" icon={<User className="w-4 h-4" />}>
                <select
                  className="w-full bg-[color:var(--sw-white)] text-[color:var(--sw-primary)] outline-none"
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

            <div className="md:col-span-3">
              <FieldShell label="艙等" icon={<Armchair className="w-4 h-4" />}>
                <select
                  className="w-full bg-[color:var(--sw-white)] text-[color:var(--sw-primary)] outline-none"
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
                'sw-btn sw-btn--gold-primary rounded-full',
                !canSubmit && 'sw-btn--gold-disabled'
              )}
            >
              <Ticket className="w-4 h-4 text-[color:var(--sw-primary)] mr-2" />
              訂購機票
            </button>
          </div>
        </div>
      </div>

      {/* === 起點 Modal === */}
      <Modal
        open={openOriginPicker}
        onClose={() => setOpenOriginPicker(false)}
        title="選擇起點"
      >
        <LocationPicker
          locations={locations}
          onCancel={() => setOpenOriginPicker(false)}
          onConfirm={(iata) => {
            setValues((v) => ({ ...v, origin: iata }));
            setOpenOriginPicker(false);
          }}
        />
      </Modal>

      {/* === 到達 Modal === */}
      <Modal
        open={openDestPicker}
        onClose={() => setOpenDestPicker(false)}
        title="選擇到達"
      >
        <LocationPicker
          locations={locations}
          onCancel={() => setOpenDestPicker(false)}
          onConfirm={(iata) => {
            setValues((v) => ({ ...v, destination: iata }));
            setOpenDestPicker(false);
          }}
        />
      </Modal>
    </>
  );
}
