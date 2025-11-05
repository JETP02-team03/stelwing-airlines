'use client';

import { HotelCardData } from '';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

// 修復 Leaflet marker 圖示
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface MapViewProps {
  hotels: HotelCardData[];
}

// 自動縮放地圖到所有 marker
function MapAutoFit({ hotels }: { hotels: HotelCardData[] }) {
  const map = useMap();
  useEffect(() => {
    const validHotels = hotels.filter((h) => h.lat && h.lng);
    if (validHotels.length > 0) {
      const bounds = L.latLngBounds(validHotels.map((h) => [h.lat!, h.lng!]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [hotels, map]);
  return null;
}

export default function MapView({ hotels }: MapViewProps) {
  const defaultCenter: [number, number] = [35.7648, 140.3855];
  const validHotels = hotels.filter((h) => h.lat && h.lng);

  return (
    <MapContainer
      center={defaultCenter}
      zoom={14}
      // 高度使用 Tailwind 的響應式 class
      className="h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] w-full rounded-xl"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <MapAutoFit hotels={validHotels} />
      {validHotels.map((hotel) => (
        <Marker key={hotel.id} position={[hotel.lat!, hotel.lng!]}>
          <Popup>
            <div className="text-sm">
              <p className="font-bold">{hotel.name}</p>
              <p>¥ {hotel.price.toLocaleString()} / 晚</p>
              <p>{hotel.location}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
