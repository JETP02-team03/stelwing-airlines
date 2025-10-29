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
 * 取得指定月份在 6x7 (42格) 月曆中應顯示的所有日期
 */
function getDaysInMonth(year: number, month: number): Date[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days: Date[] = [];

  // 1. 補齊上個月的日期
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(new Date(year, month, -startingDayOfWeek + i + 1));
  }
  // 2. 填入本月的所有日期
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }
  // 3. 補齊下個月的日期 (填滿 42 格)
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push(new Date(year, month + 1, i));
  }
  return days;
}

/**
 * 檢查兩個 Date 物件是否為同一天
 */
function isSameDay(date1: Date, date2: Date): boolean {
  if (!date1 || !date2) {
    return false;
  }
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

/**
 * 檢查日期是否為範圍的起始日 (from)
 */
function isRangeStart(date: Date, range?: DateRange): boolean {
  if (!range?.from) return false;
  return isSameDay(date, range.from);
}

/**
 * 檢查日期是否為範圍的結束日 (to)
 */
function isRangeEnd(date: Date, range?: DateRange): boolean {
  if (!range?.to) return false;
  return isSameDay(date, range.to);
}

// ==================== 單一月曆元件 (SingleCalendar) ====================
/**
 * 顯示單一個月的月曆 (內部組件)
 */
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
  const days = getDaysInMonth(year, month);
  const currentMonth = month;
  // 取得今天的日期，並清除時/分/秒，設為 00:00:00
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  /**
   * 日期點擊事件處理
   */
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
    <div className="bg-transparent rounded-2xl p-6 min-w-[320px]">
      {/* 標題區：年份與月份 */}
      <div className="text-center mb-6">
        <div
          style={{ color: 'var(--calendar-primary)' }}
          className="text-lg font-light tracking-wide"
        >
          {year}
        </div>
        <div
          style={{ color: 'var(--calendar-primary)' }}
          className="text-base font-light mt-1"
        >
          {MONTHS[month]}
        </div>
      </div>

      {/* 星期標題列 (Sun, Mon...) */}
      <div className="grid grid-cols-7 gap-2 mb-2">
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

      {/* 日期格子區 (42 天) */}
      <div className="grid grid-cols-7 gap-0">
        {days.map((date, index) => {
          // 判斷日期的各種狀態
          const isCurrentMonth = date.getMonth() === currentMonth;
          const inRange = isInRange(date, selected);
          const isStart = isRangeStart(date, selected);
          const isEnd = isRangeEnd(date, selected);
          const isPastDate = date < today;

          const buttonStyle: React.CSSProperties = {};
          let buttonClass =
            'relative h-10 w-10 text-sm font-light transition-colors flex items-center justify-center rounded-full z-10 ';

          // === 根據日期狀態決定樣式 ===
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
              className="relative h-10 flex items-center justify-center"
            >
              {/* 背景長條 */}
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
              {/* 日期按鈕 */}
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
export type DateRange = {
  from?: Date;
  to?: Date;
};

type DualCalendarProps = {
  selected?: DateRange;
  onSelect?: (range: DateRange | undefined) => void;
  className?: string;
};

// ==================== 雙月曆元件（組合） ====================
/**
 * 組合左右兩個 SingleCalendar，並包含月份導覽箭頭
 */
export default function Calendar({
  selected,
  onSelect,
  className,
}: DualCalendarProps) {
  // 預設顯示「今天」的月份
  const today = new Date();
  const [leftMonth, setLeftMonth] = React.useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  // 判斷「上個月」按鈕是否該禁用
  const currentMonth = {
    year: today.getFullYear(),
    month: today.getMonth(),
  };
  const isPrevDisabled =
    leftMonth.year === currentMonth.year &&
    leftMonth.month === currentMonth.month;

  // 切換上個月的函式
  const handlePrevMonth = () => {
    if (isPrevDisabled) return;
    setLeftMonth((prev) => {
      if (prev.month === 0) {
        return { year: prev.year - 1, month: 11 };
      }
      return { year: prev.year, month: prev.month - 1 };
    });
  };

  // 切換下個月的函式
  const handleNextMonth = () => {
    setLeftMonth((prev) => {
      if (prev.month === 11) {
        return { year: prev.year + 1, month: 0 };
      }
      return { year: prev.year, month: prev.month + 1 };
    });
  };

  // 根據左邊月曆，自動計算右邊月曆
  const rightMonth = {
    year: leftMonth.month === 11 ? leftMonth.year + 1 : leftMonth.year,
    month: leftMonth.month === 11 ? 0 : leftMonth.month + 1,
  };

  return (
    <div
      className={`calendar-wrapper flex justify-center gap-6 relative ${
        className || ''
      }`}
    >
      {/* 上個月按鈕 */}
      <button
        onClick={handlePrevMonth}
        disabled={isPrevDisabled}
        className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed z-20 transition-opacity"
        aria-label="上一個月"
      >
        <ChevronLeft size={24} style={{ color: 'var(--calendar-primary)' }} />
      </button>

      {/* 左邊月曆 */}
      <SingleCalendar
        year={leftMonth.year}
        month={leftMonth.month}
        selected={selected}
        onSelect={onSelect}
      />

      {/* 右邊月曆 */}
      <SingleCalendar
        year={rightMonth.year}
        month={rightMonth.month}
        selected={selected}
        onSelect={onSelect}
      />

      {/* 下個月按鈕 */}
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
