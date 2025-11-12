'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';
import Calendar, { DateRange } from './components/Calendar';
import HotelCard from './components/HotelCard';
import SearchBar from './components/SearchBar';
import { HotelCardData } from './interfaces/HotelCardData';

// 修正時區差一天
const formatDateLocal = (date: Date) => {
  const tzOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - tzOffset).toISOString().split('T')[0];
};

export default function Page() {
  const router = useRouter();

  const hotels: HotelCardData[] = [
    {
      id: 1,
      name: 'Toyoko Inn Narita Airport',
      location: 'Tokyo, Japan',
      distance: '距離機場約 0.1 公里',
      rating: 4.6,
      price: 3500,
      image: '/images/hotel/room1.jpeg',
      amenities: {
        wifi: true,
        parking: true,
        cafe: true,
        restaurant: true,
        frontDesk24h: true,
        luggageStorage: true,
      },
    },
    {
      id: 2,
      name: 'Hotel Nikko Narita',
      location: 'Tokyo, Japan',
      distance: '距離機場約 0.3公里',
      rating: 4.9,
      price: 5500,
      image: '/images/hotel/room2.jpeg',
      amenities: {
        wifi: true,
        parking: true,
        cafe: true,
        restaurant: true,
        frontDesk24h: true,
        luggageStorage: true,
        shuttleService: true,
      },
    },
    {
      id: 3,
      name: 'Hotel Mystays Premier Narita',
      location: 'Tokyo, Japan',
      distance: '第二航廈・機場內',
      rating: 4.7,
      price: 10000,
      image: '/images/hotel/room3.jpeg',
      amenities: {
        wifi: true,
        parking: true,
        cafe: true,
        restaurant: true,
        frontDesk24h: true,
        luggageStorage: true,
        shuttleService: true,
      },
    },
    {
      id: 4,
      name: 'Garden Hotel Narita',
      location: 'Tokyo, Japan',
      distance: '距離機場約 0.2公里',
      rating: 4.8,
      price: 1200,
      image: '/images/hotel/room4.jpeg',
      amenities: {
        wifi: true,
        parking: true,
        cafe: true,
        restaurant: true,
        frontDesk24h: true,
        luggageStorage: true,
        shuttleService: true,
      },
    },
    {
      id: 5,
      name: 'Narita Tobu Hotel Airport',
      location: 'Tokyo, Japan',
      distance: '第二航廈・機場內',
      rating: 4.8,
      price: 18000,
      image: '/images/hotel/room5.jpeg',
      amenities: {
        wifi: true,
        parking: true,
        cafe: true,
        restaurant: true,
        frontDesk24h: true,
        luggageStorage: true,
        shuttleService: true,
      },
    },
  ];

  // 初始化 selectedRange 從 localStorage
  const [selectedRange, setSelectedRange] = React.useState<
    DateRange | undefined
  >(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('booking_search');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.checkin && parsed.checkout
          ? { from: new Date(parsed.checkin), to: new Date(parsed.checkout) }
          : undefined;
      }
    }
    return undefined;
  });

  const [guests, setGuests] = React.useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('booking_search');
      return saved ? JSON.parse(saved).guests || 2 : 2;
    }
    return 2;
  });

  const [rooms, setRooms] = React.useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('booking_search');
      return saved ? JSON.parse(saved).rooms || 1 : 1;
    }
    return 1;
  });

  const updateLocalStorage = (
    updates: Partial<{
      checkin: string;
      checkout: string;
      guests: number;
      rooms: number;
    }>
  ) => {
    const existing = JSON.parse(localStorage.getItem('booking_search') || '{}');
    localStorage.setItem(
      'booking_search',
      JSON.stringify({ ...existing, ...updates })
    );
  };

  const handleDateChange = (range: DateRange | undefined) => {
    setSelectedRange(range);
    if (range?.from && range?.to) {
      updateLocalStorage({
        checkin: formatDateLocal(range.from),
        checkout: formatDateLocal(range.to),
        guests,
        rooms,
      });
    }
  };

  const handleGuestsChange = (newGuests: number) => {
    setGuests(newGuests);
    updateLocalStorage({ guests: newGuests });
  };

  const handleRoomsChange = (newRooms: number) => {
    setRooms(newRooms);
    updateLocalStorage({ rooms: newRooms });
  };

  const handleCardClick = (hotel: HotelCardData) => {
    localStorage.setItem('scrollToHotelId', hotel.id.toString());
    router.push('/hotel-booking/search');
  };

  // 計算入住晚數
  const getNights = () => {
    if (!selectedRange?.from || !selectedRange?.to) return 1;
    const diff = selectedRange.to.getTime() - selectedRange.from.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen bg-[url('/images/hotel/bg1.jpeg')] bg-cover bg-center sm:bg-top bg-no-repeat bg-black/70 bg-blend-darken pb-10">
      <SearchBar
        selectedRange={selectedRange}
        onDateChange={handleDateChange}
        guests={guests}
        onGuestsChange={handleGuestsChange}
        rooms={rooms}
        onRoomsChange={handleRoomsChange}
      />

      <div className="flex justify-center px-4 mb-10">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
          <Calendar selected={selectedRange} onSelect={handleDateChange} />
        </div>
      </div>

      <div className="bg-white/90 py-[30px] rounded-lg shadow-md mx-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">
            TOP 5 附近優質飯店
          </h2>
          <div className="[grid-template-columns:repeat(auto-fit,minmax(220px,0fr))] justify-center grid gap-y-5 gap-x-2 py-3 px-2">
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="w-full transition-all duration-300 ease-in-out"
                onClick={() => handleCardClick(hotel)}
              >
                <HotelCard
                  hotel={{ ...hotel, price: hotel.price * getNights() }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
