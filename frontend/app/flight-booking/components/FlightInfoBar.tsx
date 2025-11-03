'use client';

import { Armchair, Calendar, Edit3, FileText, Plane, User } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function fmtDate(iso?: string | null) {
  if (!iso) return '';
  const d = new Date(iso);
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${m}/${day}`;
}

export default function FlightInfoBar() {
  const sp = useSearchParams();

  const tripType = sp.get('tripType') ?? 'roundtrip';
  const origin = sp.get('origin') ?? 'TPE';
  const destination = sp.get('destination') ?? 'NRT';
  const departDate = sp.get('departDate');
  const returnDate = sp.get('returnDate');
  const passengers = Number(sp.get('passengers') ?? '1');
  const cabin = sp.get('cabin') ?? '經濟艙';

  // 金額加總（只加有帶的值）
  const obFare = Number(sp.get('obFare') ?? NaN);
  const ibFare = Number(sp.get('ibFare') ?? NaN);
  const total =
    (Number.isFinite(obFare) ? obFare : 0) +
    (Number.isFinite(ibFare) ? ibFare : 0);

  const qs = sp.toString();

  return (
    <div className="sw-section--light border-b border-[var(--sw-grey)]">
      <div className="h-[2px] w-full bg-[var(--sw-accent)]" />
      <div className="mx-auto max-w-[1140px] px-4 h-12 flex items-center justify-between">
        {/* 左 */}
        <div className="flex flex-wrap items-center gap-3 sw-p1 text-[var(--sw-primary)]">
          <div className="flex items-center gap-2">
            <Plane className="w-4 h-4 text-[var(--sw-primary)]" />
            <span className="font-semibold">
              {origin} <span className="mx-1">→</span> {destination}
            </span>
            <span className="sw-p2 opacity-70">
              （{tripType === 'roundtrip' ? '來回' : '單程'}）
            </span>
          </div>
          <span className="hidden md:inline opacity-40">│</span>
          <div className="hidden md:flex items-center gap-1">
            <Calendar className="w-4 h-4 text-[var(--sw-primary)]" />
            <span className="sw-p2 opacity-80">日期：</span>
            <span className="font-medium">
              {tripType === 'roundtrip'
                ? `${fmtDate(departDate)} - ${fmtDate(returnDate)}`
                : fmtDate(departDate)}
            </span>
          </div>
          <span className="hidden md:inline opacity-40">│</span>
          <div className="hidden md:flex items-center gap-1">
            <User className="w-4 h-4 text-[var(--sw-primary)]" />
            <span className="sw-p2 opacity-80">乘客：</span>
            <span className="font-medium">{passengers} 位 成人</span>
          </div>
          <span className="hidden md:inline opacity-40">│</span>
          <div className="hidden md:flex items-center gap-1">
            <Armchair className="w-4 h-4 text-[var(--sw-primary)]" />
            <span className="sw-p2 opacity-80">艙等：</span>
            <span className="font-medium">{cabin}</span>
            <Link
              href={`/?${qs}`}
              className="inline-flex items-center gap-1 text-[var(--sw-accent)] hover:opacity-80"
              aria-label="修改搜尋條件"
            >
              <Edit3 className="w-[14px] h-[14px]" />
            </Link>
          </div>
        </div>

        {/* 右 */}
        <div className="flex items-center gap-3 sw-p1 text-[var(--sw-primary)]">
          <Link
            href="/order/summary"
            className="inline-flex items-center gap-1 hover:opacity-80"
          >
            <FileText className="w-4 h-4" />
            <span className="font-semibold">查看明細</span>
          </Link>
          <span className="opacity-40">│</span>
          <div className="sw-p1 opacity-80">
            TWD{' '}
            <span className="font-bold text-[var(--sw-primary)]">
              {new Intl.NumberFormat('zh-Hant', {
                maximumFractionDigits: 0,
              }).format(total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
