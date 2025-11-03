'use client';

import { useState } from 'react';

// UI 元件
import Button from '../components/ui/Button';
import Dropdown from '../components/ui/Dropdown';
import SearchView from '../components/ui/SearchView';
import TabButton from '../components/ui/TabButton';

// 卡片元件（已統一）
import CarryOnCard from '../components/cards/CarryOnCard';
import CheckedLuggageCard from '../components/cards/CheckedLuggageCard';
import ProhibitedItemsCard from '../components/cards/ProhibitedItemsCard';

export default function FAQPage() {
  const [selectedTab, setSelectedTab] = useState('行李規定');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  // --- 下拉選單資料 ---
  const countryOptions = ['台灣', '日本', '泰國', '新加坡'];
  const cityOptions = ['台北', '東京', '曼谷', '新加坡'];

  const tabButtons = [
    '行李規定',
    '機場資訊',
    '出入境須知',
    '緊急聯絡',
    '安全提醒',
  ];

  // --- 卡片資料 ---
  const checkedLuggageRestrictions = [
    {
      category: '經濟艙',
      weight: '23公斤以下',
      dimensions: '長寬高總和不超過158cm',
      pieces: '1-2件（依航空公司而定）',
    },
    {
      category: '商務艙',
      weight: '32公斤以下',
      dimensions: '長寬高總和不超過158cm',
      pieces: '2件',
    },
  ];

  const carryOnRestrictions = {
    category: '標準',
    dimensions: '55cm x 40cm x 25cm以內',
    weight: '7-10公斤（依航空公司而定）',
    liquids: '每瓶不超過100ml，總量不超過1公升',
  };

  const prohibitedItems = [
    {
      category: '完全禁止',
      items: ['易燃易爆物品', '毒品及管制藥品', '武器及刀具', '腐蝕性化學品'],
    },
    {
      category: '限制攜帶',
      items: [
        '鋰電池（需隨身攜帶）',
        '液體（符合3-1-1規定）',
        '食品（需申報檢疫）',
        '現金超過100萬日圓',
      ],
    },
  ];

  // --- Handlers ---
  const handleTabClick = (tab: string) => setSelectedTab(tab);
  const handleSearch = () => {
    console.log('Search:', { selectedCountry, selectedCity, searchKeyword });
  };

  return (
    <div className="bg-[#1f2e3c] py-10">
      {/* Hero + 搜尋區 */}
      <section className="w-full py-8 sm:py-12 md:py-16">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6 sm:gap-8">
          <h1 className="text-xl sm:text-2xl md:text-[24px] font-bold text-center text-white">
            目的地旅遊資訊
          </h1>

          {/* 搜尋列區塊 */}
          <div className="w-full max-w-[704px]">
            <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8">
              <Dropdown
                options={countryOptions}
                placeholder="國家"
                value={selectedCountry}
                onChange={(val) => setSelectedCountry(val)}
                className="flex-1"
              />
              <Dropdown
                options={cityOptions}
                placeholder="城市"
                value={selectedCity}
                onChange={(val) => setSelectedCity(val)}
                className="flex-1"
              />
              <SearchView
                placeholder="關鍵字"
                value={searchKeyword}
                onChange={(val) => setSearchKeyword(val)}
                className="flex-1"
              />
            </div>

            <div className="flex justify-center">
              <Button
                text="搜尋"
                text_font_size="text-[24px]"
                text_font_weight="font-bold"
                text_line_height="leading-[33px]"
                border_border_radius="rounded-[26px]"
                className="px-8 py-2"
                onClick={handleSearch}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tab 導覽 */}
      <section className="w-full py-8 sm:py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center border-[3px] border-[#8e7c60] rounded-full p-3">
            {tabButtons.map((tab) => (
              <TabButton
                key={tab}
                text={tab}
                selected={selectedTab === tab}
                onClick={() => handleTabClick(tab)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 卡片區 */}
      <section className="pb-16 sm:pb-20">
        <div className="max-w-[1104px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          <CheckedLuggageCard data={checkedLuggageRestrictions} />
          <CarryOnCard data={carryOnRestrictions} />
          <ProhibitedItemsCard data={prohibitedItems} />
        </div>
      </section>
    </div>
  );
}
