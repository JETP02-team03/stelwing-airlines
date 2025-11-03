'use client';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';

export type FlightLeg = {
  originCode: string;
  originName: string;
  depTime: string;
  destinationCode: string;
  destinationName: string;
  arrTime: string;
  duration: string;
};

export type FlightItem = {
  flightNo: string;
  aircraft?: string;
  leg: FlightLeg;
  price: number;
  currency?: string; // TWD
  cabin?: string; // 經濟艙
};

interface FlightCardProps {
  data: FlightItem;
  onBook?: (flight: FlightItem) => void;
  className?: string;
  /** 必填：確保只影響該段 */
  dir: 'outbound' | 'inbound';
}

const BUNDLE_NAME_FALLBACK: Record<string, string> = {
  value: '超值',
  basic: '基本',
  luxury: '豪華',
};

export default function FlightCard({
  data,
  onBook,
  className,
  dir,
}: FlightCardProps) {
  const sp = useSearchParams();
  const router = useRouter();

  // 只看本段的已選
  const chosenFlight =
    dir === 'outbound' ? sp.get('obFlight') : sp.get('ibFlight');
  const isSelected = chosenFlight === data.flightNo;
  const hasChosenInThisDir = Boolean(chosenFlight);
  const isDisabledOther = hasChosenInThisDir && !isSelected;

  // 讀已選的票價與組合名稱（本段）
  const fareKey = dir === 'outbound' ? 'obFare' : 'ibFare';
  const bundleKey = dir === 'outbound' ? 'obBundle' : 'ibBundle';
  const bundleNameKey = dir === 'outbound' ? 'obBundleName' : 'ibBundleName';
  const selectedFare = Number(sp.get(fareKey) ?? NaN);
  const chosenBundleId = sp.get(bundleKey) ?? undefined;
  const chosenBundleName =
    sp.get(bundleNameKey) ??
    (chosenBundleId ? BUNDLE_NAME_FALLBACK[chosenBundleId] : undefined);

  const displayPrice =
    isSelected && !Number.isNaN(selectedFare) ? selectedFare : data.price;

  const cur = data.currency ?? 'TWD';
  const fmt = (n: number) =>
    new Intl.NumberFormat('zh-Hant', { maximumFractionDigits: 0 }).format(n);

  const handleCancel = () => {
    const next = new URLSearchParams(sp.toString());
    if (dir === 'outbound') {
      next.delete('obFlight');
      next.delete('obFare');
      next.delete('obBundle');
      next.delete('obBundleName');
    } else {
      next.delete('ibFlight');
      next.delete('ibFare');
      next.delete('ibBundle');
      next.delete('ibBundleName');
    }
    next.delete('focus');
    router.push(`/flight-booking?${next.toString()}`);
    router.refresh();
  };

  return (
    <article
      className={clsx(
        isDisabledOther
          ? 'bg-[#E5E7EB] text-[#6B7280] border-[#E5E7EB]'
          : 'bg-[var(--sw-primary)] text-[var(--sw-white)]',
        'rounded-2xl p-5 shadow-md border',
        className
      )}
      aria-disabled={isDisabledOther}
    >
      <div className="flex items-center justify-between gap-6">
        {/* 左側：保持你的排版 */}
        <div className="min-w-0 flex-1">
          <div
            className={clsx(
              'text-sm',
              isDisabledOther ? 'opacity-70' : 'opacity-80'
            )}
          >
            {data.flightNo}
          </div>
          <div className="mt-3 grid grid-cols-3 items-center gap-3 md:gap-6">
            <div>
              <div className="text-2xl font-extrabold">{data.leg.depTime}</div>
              <div
                className={clsx(
                  'text-sm',
                  isDisabledOther ? 'opacity-70' : 'opacity-80'
                )}
              >
                {data.leg.originCode} {data.leg.originName}
              </div>
            </div>
            <div className="text-center">
              <div
                className={clsx(
                  'text-xs',
                  isDisabledOther ? 'opacity-70' : 'opacity-80'
                )}
              >
                直飛
              </div>
              <div
                className={clsx(
                  'text-sm',
                  isDisabledOther ? 'opacity-70' : 'opacity-80'
                )}
              >
                {data.leg.duration}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-extrabold">{data.leg.arrTime}</div>
              <div
                className={clsx(
                  'text-sm',
                  isDisabledOther ? 'opacity-70' : 'opacity-80'
                )}
              >
                {data.leg.destinationCode} {data.leg.destinationName}
              </div>
            </div>
          </div>
        </div>

        {/* 右側：價格、按鈕、(已選時)組合名稱 */}
        <div className="flex flex-col items-end gap-3">
          <div
            className={clsx(
              'text-sm',
              isDisabledOther ? 'opacity-60' : 'opacity-80'
            )}
          >
            含稅自
          </div>
          <div className="text-xl font-extrabold">
            {cur} {fmt(displayPrice)}
          </div>
          {isSelected && chosenBundleName && (
            <div className="text-xs opacity-90">{chosenBundleName}</div>
          )}

          {isSelected ? (
            <div className="flex items-center gap-2">
              <button
                className="rounded-full border border-[var(--sw-accent)] bg-[var(--sw-accent)] px-5 py-2 font-bold text-[var(--sw-black)] hover:opacity-90 pointer-events-none"
                disabled
              >
                已選擇
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-full px-4 py-2 border border-white text-white hover:opacity-90"
              >
                取消
              </button>
            </div>
          ) : isDisabledOther ? (
            <button
              className="rounded-full px-5 py-2 font-bold border border-transparent bg-[#D1D5DB] text-[#6B7280] pointer-events-none"
              disabled
              aria-disabled
            >
              訂購
            </button>
          ) : (
            <button
              className="rounded-full border border-[var(--sw-accent)] bg-[var(--sw-accent)] px-5 py-2 font-bold text-[var(--sw-black)] hover:opacity-90"
              onClick={() => onBook?.(data)}
            >
              訂購
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
