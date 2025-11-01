'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';

// ==================== 星期與月份文字 (常數) ====================
const DAYS = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

// ==================== 日期輔助函式 ====================

/**
 * 取得當月實際應顯示的所有日期 (不補下個月，只顯示前面空格)
 */
function getDaysInMonthExact(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days: (Date | null)[] = [];

  // 1️⃣ 前面補空白（用 null 表示）
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }

  // 2️⃣ 填入本月日期
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }
  while (days.length < 42) {
    days.push(null);
  }
  return days;
}

/**
 * 檢查兩個 Date 物件是否為同一天
 */
function isSameDay(date1: Date, date2: Date): boolean {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * 檢查日期是否在選取範圍內 (from 和 to 之間)
 */
function isInRange(date: Date, range?: DateRange): boolean {
  if (!range?.from || !range?.to) return false;
  const start = range.from < range.to ? range.from : range.to;
  const end = range.from < range.to ? range.to : range.from;
  return date >= start && date <= end;
}

function isRangeStart(date: Date, range?: DateRange): boolean {
  if (!range?.from) return false;
  return isSameDay(date, range.from);
}

function isRangeEnd(date: Date, range?: DateRange): boolean {
  if (!range?.to) return false;
  return isSameDay(date, range.to);
}

// ==================== 單一月曆 ====================
function SingleCalendar({
  year,
  month,
  selected,
  onSelect,
}: {
  year: number;
  month: number;
  selected?: DateRange;
  onSelect?: (range: DateRange | undefined) => void;
}) {
  const days = getDaysInMonthExact(year, month);
  const currentMonth = month;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleDateClick = (date: Date) => {
    if (!onSelect) return;
    if (!selected?.from || (selected.from && selected.to)) {
      onSelect({ from: date, to: undefined });
    } else {
      if (date < selected.from) {
        onSelect({ from: date, to: selected.from });
      } else {
        onSelect({ from: selected.from, to: date });
      }
    }
  };

  return (
    <div className="bg-neutral-50 rounded-lg p-3 min-w-[320px] w-full max-w-[360px] mx-auto">
      {/* 標題區 */}
      <div className="text-center mb-6">
        <div
          style={{ color: 'var(--calendar-primary)' }}
          className="text-lg font-light tracking-wide"
        >
          {year}
        </div>
        <div
          style={{ color: 'var(--calendar-primary)' }}
          className="text-base font-light"
        >
          {MONTHS[month]}
        </div>
      </div>

      {/* 星期列 */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAYS.map((day) => (
          <div
            key={day}
            style={{ color: 'var(--calendar-primary)' }}
            className="text-center text-sm font-light py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* 日期格 */}
      <div className="grid grid-cols-7 gap-0">
        {days.map((date, index) => {
          if (!date) {
            // 🔸 無日期的空格
            return <div key={index} className="h-6 w-10" />;
          }

          const isCurrentMonth = date.getMonth() === currentMonth;
          const inRange = isInRange(date, selected);
          const isStart = isRangeStart(date, selected);
          const isEnd = isRangeEnd(date, selected);
          const isPastDate = date < today;

          const buttonStyle: React.CSSProperties = {};
          let buttonClass =
            'relative h-10 w-10 text-sm font-light transition-colors flex items-center justify-center rounded-full z-10 ';

          if (isPastDate) {
            buttonStyle.color = 'var(--calendar-past)';
            buttonClass += ' cursor-default';
          } else if (!isCurrentMonth) {
            buttonStyle.color = 'var(--calendar-muted)';
            buttonClass += ' cursor-default';
          } else {
            buttonStyle.color = 'var(--calendar-primary)';
            buttonClass += ' hover:bg-gray-200/50';
          }

          if (!isPastDate && isCurrentMonth && (isStart || isEnd)) {
            buttonStyle.backgroundColor = 'var(--calendar-selected)';
            buttonStyle.color = '#ffffff';
            buttonClass += ' font-semibold';
          }

          const isClickable = !isPastDate && isCurrentMonth;
          const clickHandler = isClickable
            ? () => handleDateClick(date)
            : undefined;

          return (
            <div
              key={index}
              className="relative h-8 flex items-center justify-center"
            >
              {!isPastDate && isCurrentMonth && inRange && (
                <div
                  className={`
                    absolute inset-y-1 z-0 
                    ${isStart ? 'left-1/2 rounded-l-full' : 'left-0'}
                    ${isEnd ? 'right-1/2 rounded-r-full' : 'right-0'}
                  `}
                  style={{ backgroundColor: 'var(--calendar-range)' }}
                />
              )}
              <button
                onClick={clickHandler}
                style={buttonStyle}
                className={buttonClass}
                disabled={!isClickable}
              >
                {date.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==================== 型別定義 ====================
export type DateRange = { from?: Date; to?: Date };

type DualCalendarProps = {
  selected?: DateRange;
  onSelect?: (range: DateRange | undefined) => void;
  className?: string;
};

// ==================== 雙月曆 ====================
export default function Calendar({
  selected,
  onSelect,
  className,
}: DualCalendarProps) {
  const today = new Date();
  const [leftMonth, setLeftMonth] = React.useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  const currentMonth = { year: today.getFullYear(), month: today.getMonth() };
  const isPrevDisabled =
    leftMonth.year === currentMonth.year &&
    leftMonth.month === currentMonth.month;

  const handlePrevMonth = () => {
    if (isPrevDisabled) return;
    setLeftMonth((prev) =>
      prev.month === 0
        ? { year: prev.year - 1, month: 11 }
        : { year: prev.year, month: prev.month - 1 }
    );
  };

  const handleNextMonth = () => {
    setLeftMonth((prev) =>
      prev.month === 11
        ? { year: prev.year + 1, month: 0 }
        : { year: prev.year, month: prev.month + 1 }
    );
  };

  const rightMonth = {
    year: leftMonth.month === 11 ? leftMonth.year + 1 : leftMonth.year,
    month: leftMonth.month === 11 ? 0 : leftMonth.month + 1,
  };

  return (
    <div
      className={`calendar-wrapper flex flex-col md:flex-row justify-center gap-6 relative ${className || ''}`}
    >
      {/* 上一月 */}
      <button
        onClick={handlePrevMonth}
        disabled={isPrevDisabled}
        className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed z-20 transition-opacity"
        aria-label="上一個月"
      >
        <ChevronLeft size={24} style={{ color: 'var(--calendar-primary)' }} />
      </button>

      {/* 左右月曆 */}
      <SingleCalendar
        year={leftMonth.year}
        month={leftMonth.month}
        selected={selected}
        onSelect={onSelect}
      />
      <SingleCalendar
        year={rightMonth.year}
        month={rightMonth.month}
        selected={selected}
        onSelect={onSelect}
      />

      {/* 下一月 */}
      <button
        onClick={handleNextMonth}
        className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 z-20 transition-opacity"
        aria-label="下一個月"
      >
        <ChevronRight size={24} style={{ color: 'var(--calendar-primary)' }} />
      </button>
    </div>
  );
}
