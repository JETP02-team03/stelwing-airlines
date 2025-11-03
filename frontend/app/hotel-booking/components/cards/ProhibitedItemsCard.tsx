'use client';

import InfoCard from '../ui/InfoCard';

interface ProhibitedItemsCardProps {
  data: { category: string; items: string[] }[];
}

const ProhibitedItemsCard = ({ data }: ProhibitedItemsCardProps) => {
  return (
    <InfoCard badgeText="禁止攜帶物品">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        {data.map((group, idx) => (
          <div key={idx} className="space-y-1">
            <h3 className="font-bold text-black">{group.category}</h3>
            {group.items.map((item, i) => (
              <p key={i}>
                {group.category === '限制攜帶' ? '• ' : ''}
                {item}
              </p>
            ))}
          </div>
        ))}
      </div>
    </InfoCard>
  );
};

export default ProhibitedItemsCard;
