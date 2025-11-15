"use client";

import { TrendingUp, Award, Plane } from "lucide-react";

export default function MileageOverview({
  mileage,
  level,
  nextLevelPercent,
}: {
  mileage: number;
  level: string;
  nextLevelPercent: number;
}) {
  return (
    <div className="w-full bg-white p-6 border border-[#BA9A60] rounded-xl mb-8">
      <h2 className="text-lg font-semibold mb-4 text-[#1F2E3C] flex items-center gap-2">
        <Plane size={20} className="text-[#DCBB87]" />
        哩程概況
      </h2>

      {/* 卡片排版 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 可用哩程 */}
        <div className="border border-[#BA9A60] rounded-xl p-6 flex flex-col">
          <div className="text-[#1F2E3C] text-sm flex items-center gap-2">
            <Award size={18} className="text-[#DCBB87]" />
            可用哩程
          </div>
          <div className="text-4xl font-semibold mt-2">{mileage.toLocaleString()}</div>
          <div className="text-[#666] text-sm mt-1">哩</div>
        </div>

        {/* 升級進度 */}
        <div className="border border-[#BA9A60] rounded-xl p-6 flex flex-col">
          <div className="text-[#1F2E3C] text-sm flex items-center gap-2">
            <TrendingUp size={18} className="text-[#DCBB87]" />
            升級進度
          </div>
          <div className="text-3xl font-semibold mt-2">{nextLevelPercent}%</div>
          <div className="text-[#666] text-sm mt-1">距離下一級別</div>
        </div>

        {/* 累積需求 */}
        <div className="border border-[#BA9A60] rounded-xl p-6 flex flex-col">
          <div className="text-[#1F2E3C] text-sm flex items-center gap-2">
            <Plane size={18} className="text-[#DCBB87]" />
            需累積哩程
          </div>
          <div className="text-3xl font-semibold mt-2">30,000</div>
          <div className="text-[#666] text-sm mt-1">哩</div>
        </div>
      </div>

      {/* 進度條 */}
      <div className="mt-6">
        <div className="text-sm text-[#1F2E3C] mb-1">
          當前等級：<span className="text-[#BA9A60] font-semibold">{level}會員</span>
        </div>

        <div className="w-full h-3 bg-[#F1E8D2] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#DCBB87] rounded-full"
            style={{ width: `${nextLevelPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
