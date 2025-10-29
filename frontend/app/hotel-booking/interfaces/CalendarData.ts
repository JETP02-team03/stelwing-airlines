import React from 'react';
export interface DateRange {
  from?: Date; // 起始日
  to?: Date; // 結束日
}

/**
 * 雙月曆元件屬性
 * (註解) 錯誤修正：
 * 將 onSelect 的型別修改為 React.Dispatch<React.SetStateAction<...>>
 * 這樣它才能與 Page 組件中的 setSelectedRange (來自 useState) 型別完全匹配。
 */
export interface DualCalendarProps {
  selected?: DateRange; // 傳入的選取範圍
  onSelect?: React.Dispatch<React.SetStateAction<DateRange | undefined>>; // 選取日期時的回呼函式
  className?: string; // 額外的 CSS class
}
