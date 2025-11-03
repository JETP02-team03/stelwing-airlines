'use client';

import InfoCard from '../ui/InfoCard';

interface CheckedLuggageItem {
  category: string;
  weight: string;
  dimensions: string;
  pieces: string;
}

interface CheckedLuggageCardProps {
  data: CheckedLuggageItem[];
}

const CheckedLuggageCard = ({ data }: CheckedLuggageCardProps) => {
  return (
    <InfoCard badgeText="托運行李限制">
      <div className="space-y-4">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="border-b border-gray-200 pb-3 last:border-0"
          >
            <h3 className="font-bold text-black mb-1">{item.category}</h3>
            <div className="space-y-1 text-sm text-gray-700">
              <p>• 重量：{item.weight}</p>
              <p>• 尺寸：{item.dimensions}</p>
              <p>• 件數：{item.pieces}</p>
            </div>
          </div>
        ))}
      </div>
    </InfoCard>
  );
};

export default CheckedLuggageCard;
