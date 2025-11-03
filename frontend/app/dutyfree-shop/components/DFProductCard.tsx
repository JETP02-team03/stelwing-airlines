'use client';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DFProductCardProps {
  id: string;
  image?: string; // ✅ 改為可選
  images?: string[]; // ✅ 新增多圖支援
  name: string;
  sub: string;
  description: string;
  price: number;
  onClick?: () => void;
}

export function DFProductCard({
  id,
  image,
  images,
  name,
  sub,
  description,
  price,
  onClick,
}: DFProductCardProps) {
  // ✅ 優先取多圖第一張，其次取單圖，最後用預設圖
  const displayImage = images?.[0] || image || '/images/dutyfree/mainLeft.jpg';

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={displayImage}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <h3 className="font-medium mb-1 text-[var(--df-text-dark)] group-hover:text-[var(--df-accent-gold)] transition-colors">
          {name}
        </h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{sub}</p>
        <div
          className="text-[var(--df-accent-gold)]"
          style={{
            fontSize: '1.75rem',
            lineHeight: '2.25rem',
            fontWeight: 'bold',
          }}
        >
          TWD {price.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
