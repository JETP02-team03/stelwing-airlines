'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DateRange } from '../components/Calendar';
import FilterSidebar from '../components/FilterSidebar';
import HotelResultCard from '../components/HotelResultCard';
import SearchBar from '../components/SearchBar';
import { AmenityKey, MAX_PRICE, MIN_PRICE } from '../interfaces/constants';
import { allMockHotels } from '../interfaces/mockHotels';

const formatDateLocal = (date: Date) => {
  const tzOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - tzOffset).toISOString().split('T')[0];
};

export default function HotelPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showFilter, setShowFilter] = useState(false);
  const [priceMin, setPriceMin] = useState(MIN_PRICE);
  const [priceMax, setPriceMax] = useState(MAX_PRICE);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<AmenityKey[]>([]);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    () => {
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
    }
  );

  const [guests, setGuests] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('booking_search');
      return saved ? JSON.parse(saved).guests || 2 : 2;
    }
    return 2;
  });

  const [rooms, setRooms] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('booking_search');
      return saved ? JSON.parse(saved).rooms || 1 : 1;
    }
    return 1;
  });

  const hotelRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const clearAllFilters = useCallback(() => {
    setPriceMin(MIN_PRICE);
    setPriceMax(MAX_PRICE);
    setSelectedRatings([]);
    setSelectedAmenities([]);
  }, []);

  const filteredHotels = useMemo(() => {
    const min = Math.min(priceMin, priceMax);
    const max = Math.max(priceMin, priceMax);
    return allMockHotels.filter((hotel) => {
      if (hotel.price < min || hotel.price > max) return false;
      if (
        selectedRatings.length > 0 &&
        !selectedRatings.some((r) => hotel.rating >= r)
      )
        return false;
      if (
        selectedAmenities.length > 0 &&
        !selectedAmenities.every((a) => hotel.amenities.includes(a))
      )
        return false;
      return true;
    });
  }, [priceMin, priceMax, selectedRatings, selectedAmenities]);

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

  useEffect(() => {
    const highlightedHotelId =
      searchParams.get('scrollToHotelId') ||
      localStorage.getItem('scrollToHotelId');
    if (highlightedHotelId) {
      const id = parseInt(highlightedHotelId, 10);
      const el = hotelRefs.current[id];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-4', 'ring-[#DCBB87]', 'ring-offset-4');
        setTimeout(
          () =>
            el.classList.remove('ring-4', 'ring-[#DCBB87]', 'ring-offset-4'),
          3000
        );
      }
    }
  }, [searchParams, filteredHotels]);

  const goToDetail = (hotelId: number) => {
    localStorage.setItem('booking_selectedHotelId', hotelId.toString());
    router.push(`/hotel-booking/${hotelId}?${searchParams.toString()}`);
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/images/hotel/bg1.jpeg')" }}
    >
      <div className="flex flex-col w-full h-full bg-black/70 min-h-screen p-4 md:p-8">
        <SearchBar
          selectedRange={selectedRange}
          onDateChange={handleDateChange}
          guests={guests}
          onGuestsChange={handleGuestsChange}
          rooms={rooms}
          onRoomsChange={handleRoomsChange}
        />

        <div className="flex-1 flex flex-col md:flex-row w-full max-w-6xl mx-auto mt-4 md:mt-6">
          <div className="w-auto flex-shrink-0 h-full">
            <FilterSidebar
              isMobileOpen={showFilter}
              onClose={() => setShowFilter(false)}
              priceMin={priceMin}
              onPriceMinChange={setPriceMin}
              priceMax={priceMax}
              onPriceMaxChange={setPriceMax}
              selectedRatings={selectedRatings}
              onSelectedRatingsChange={setSelectedRatings}
              selectedAmenities={selectedAmenities}
              onSelectedAmenitiesChange={setSelectedAmenities}
              onClearAll={clearAllFilters}
            />
          </div>

          <main className="flex-1 overflow-y-auto space-y-6 px-4 md:px-8 flex flex-col items-center">
            {filteredHotels.length === 0 ? (
              <div className="text-center py-12 text-gray-300">
                <p className="text-lg mb-4">沒有符合條件的飯店</p>
                <button
                  onClick={clearAllFilters}
                  className="text-[#DCBB87] underline"
                >
                  清除篩選條件
                </button>
              </div>
            ) : (
              filteredHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  ref={(el) => {
                    hotelRefs.current[hotel.id] = el;
                  }}
                  className="w-full"
                >
                  <div
                    onClick={() => goToDetail(hotel.id)}
                    className="cursor-pointer"
                  >
                    <HotelResultCard hotel={hotel} />
                  </div>
                </div>
              ))
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
