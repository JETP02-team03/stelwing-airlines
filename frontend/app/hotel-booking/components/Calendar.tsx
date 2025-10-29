'use client';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // For date clicking
import FullCalendar from '@fullcalendar/react';
import { useRef, useState } from 'react';

interface CalendarProps {
  initialDate?: Date; // Initial date, defaults to today
  onDateSelect?: (date: Date) => void; // Date selection callback
  selectedDates?: Date[]; // Default selected dates (highlight)
}

export default function BookingCalendar({
  initialDate = new Date(),
  onDateSelect,
  selectedDates = [],
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);
  const leftCalendarRef = useRef<FullCalendar>(null);
  const rightCalendarRef = useRef<FullCalendar>(null);

  // Generate events: highlight selected dates
  const events = selectedDates.map((date) => ({
    title: '已預訂',
    date: date.toISOString().split('T')[0],
    display: 'background' as const,
    backgroundColor: '#D4A574', // Match hotel card color
  }));

  // Date click handler
  const handleDateClick = (info: any) => {
    if (onDateSelect) {
      onDateSelect(new Date(info.dateStr));
    }
  };

  // Navigation functions
  const goToPrev = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const goToNext = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  // Calculate left and right calendar months
  const leftDate = new Date(currentDate);
  const rightDate = new Date(currentDate);
  rightDate.setMonth(rightDate.getMonth() + 1);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 max-w-4xl mx-auto">
      {/* Custom header with navigation arrows */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={goToPrev}
          className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="前兩個月"
        >
          ←
        </button>
        <h2 className="text-lg font-bold text-gray-800">
          {currentDate.getFullYear()} 年 {currentDate.getMonth() + 1} 月 至{' '}
          {rightDate.getFullYear()} 年 {rightDate.getMonth() + 1} 月
        </h2>
        <button
          onClick={goToNext}
          className="text-yellow-500 hover:text-yellow-700 p-2 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="後兩個月"
        >
          →
        </button>
      </div>

      {/* Two-month side-by-side calendars */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left calendar */}
        <div className="border border-gray-200 rounded-lg p-2">
          <FullCalendar
            ref={leftCalendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            initialDate={leftDate}
            events={events}
            dateClick={handleDateClick}
            headerToolbar={false} // Hide default header
            titleFormat={{ month: 'long', year: 'numeric' }} // Standard title format
            height="auto"
            weekends={true}
            dayHeaderClassNames="text-xs font-semibold text-gray-600 border-b border-gray-200 py-1 text-center"
            dayCellClassNames="h-10 w-10 border border-gray-200 rounded-full mx-0.5 my-0.5 hover:bg-gray-100 cursor-pointer transition-colors text-center"
            dayCellContent={(arg) => (
              <div className="flex items-center justify-center h-full w-full text-sm">
                {arg.dayNumberText}
              </div>
            )}
          />
        </div>

        {/* Right calendar */}
        <div className="border border-gray-200 rounded-lg p-2">
          <FullCalendar
            ref={rightCalendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            initialDate={rightDate}
            events={events}
            dateClick={handleDateClick}
            headerToolbar={false}
            titleFormat={{ month: 'long', year: 'numeric' }}
            height="auto"
            weekends={true}
            dayHeaderClassNames="text-xs font-semibold text-gray-600 border-b border-gray-200 py-1 text-center"
            dayCellClassNames="h-10 w-10 border border-gray-200 rounded-full mx-0.5 my-0.5 hover:bg-gray-100 cursor-pointer transition-colors text-center"
            dayCellContent={(arg) => (
              <div className="flex items-center justify-center h-full w-full text-sm">
                {arg.dayNumberText}
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}
