'use client';

import InfoCard from '../ui/InfoCard';

interface CarryOnCardProps {
  data: {
    category: string;
    dimensions: string;
    weight: string;
    liquids: string;
  };
}

const CarryOnCard = ({ data }: CarryOnCardProps) => {
  return (
    <InfoCard title={data.category} badgeText="隨身行李限制">
      <div className="space-y-1 text-sm">
        <p>• 尺寸：{data.dimensions}</p>
        <p>• 重量：{data.weight}</p>
        <p>• 液體：{data.liquids}</p>
      </div>
    </InfoCard>
  );
};

export default CarryOnCard;
