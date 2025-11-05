// components/HotelResultCard.tsx
'use client';

import {
  Car,
  Clock,
  Coffee,
  Heart,
  MapPin,
  Package,
  Star,
  Wifi,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HotelCardData } from '../interfaces/HotelCardData';

export default function HotelResultCard({ hotel }: { hotel: HotelCardData }) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  // 愛心：localStorage
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(hotel.id));
  }, [hotel.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (isFavorite) {
      localStorage.setItem(
        'favorites',
        JSON.stringify(favorites.filter((id: number) => id !== hotel.id))
      );
    } else {
      localStorage.setItem(
        'favorites',
        JSON.stringify([...favorites, hotel.id])
      );
    }
    setIsFavorite(!isFavorite);
  };

  const handleClick = () => {
    const params = new URLSearchParams(window.location.search);
    router.push(`/hotel/${hotel.id}?${params.toString()}`);
  };

  const amenityIcons = [
    hotel.amenities?.wifi && <Wifi size={16} className="text-gray-600" />,
    hotel.amenities?.parking && <Car size={16} className="text-gray-600" />,
    hotel.amenities?.cafe && <Coffee size={16} className="text-gray-600" />,
    hotel.amenities?.frontDesk24h && (
      <Clock size={16} className="text-gray-600" />
    ),
    hotel.amenities?.luggageStorage && (
      <Package size={16} className="text-gray-600" />
    ),
  ].filter(Boolean);

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 flex"
    >
      <div className="w-32 h-32 flex-shrink-0">
        <img
          src={hotel.image || '/placeholder.jpg'}
          alt={hotel.name}
          className="w-full h-full object-cover rounded-l-2xl"
        />
      </div>

      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg text-gray-800 line-clamp-1">
              {hotel.name}
            </h3>
            <button
              onClick={toggleFavorite}
              className={`transition ${isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
            >
              <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
            <Star size={14} fill="#D4AF37" color="#D4AF37" />
            <span>{hotel.rating}</span>
          </div>

          <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
            <MapPin size={14} />
            <span className="line-clamp-1">{hotel.location}</span>
          </div>

          <p className="text-xs text-gray-500 mt-2 line-clamp-2">
            {hotel.notes || '位於成田機場第二航廈內，交通便利，適合轉機旅客。'}
          </p>

          <div className="flex gap-2 mt-3">
            {amenityIcons.map((icon, i) => (
              <div key={i}>{icon}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col justify-between items-end">
        <div className="text-right">
          <div className="text-xl font-bold text-gray-800">
            ¥ {hotel.price.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">/night</div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition mt-2"
        >
          預訂
        </button>
      </div>
    </div>
  );
}
