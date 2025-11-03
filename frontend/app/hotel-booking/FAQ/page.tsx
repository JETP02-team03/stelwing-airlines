'use client';

import { useState } from 'react';

// UI 元件
import Button from '../components/ui/Button';
import Dropdown from '../components/ui/Dropdown';
import SearchView from '../components/ui/SearchView';
import TabButton from '../components/ui/TabButton';

// 卡片元件
import CarryOnCard from '../components/cards/CarryOnCard';
import CheckedLuggageCard from '../components/cards/CheckedLuggageCard';
import ProhibitedItemsCard from '../components/cards/ProhibitedItemsCard';

export default function FAQPage() {
  const [selectedTab, setSelectedTab] = useState('行李規定');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // --- 國家選項 ---
  const countryOptions = ['台灣', '日本', '泰國', '新加坡'];

  // --- 階層式城市選項 ---
  const getCityOptions = (country: string): string[] => {
    const cityMap: { [key: string]: string[] } = {
      台灣: ['台北-桃園', '台北-松山', '高雄'],
      日本: ['東京-成田', '東京-羽田'], // 你的需求！
      泰國: ['曼谷-素萬那普', '曼谷-廊曼'],
      新加坡: ['新加坡-樟宜'],
    };
    return cityMap[country] || ['請選擇國家'];
  };

  const cityOptions = getCityOptions(selectedCountry);

  // --- Tab 選項 ---
  const tabButtons = [
    '行李規定',
    '機場資訊',
    '出入境須知',
    '緊急聯絡',
    '安全提醒',
  ];

  // --- 卡片資料（不變）---
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
  const handleCountryChange = (val: string) => {
    setSelectedCountry(val);
    setSelectedCity(''); // 重置城市
  };

  const handleCityChange = (val: string) => {
    setSelectedCity(val);
  };

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  const handleSearch = () => {
    setIsSearching(true);
    console.log('Search:', { selectedCountry, selectedCity, searchKeyword });
    setTimeout(() => setIsSearching(false), 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-[#1f2e3c] py-10">
      {/* Hero + 搜尋區 */}
      <section className="w-full py-8 sm:py-12 md:py-16">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6 sm:gap-8">
          <h1 className="text-xl sm:text-2xl md:text-[24px] font-bold text-center text-white">
            目的地旅遊資訊
          </h1>

          <div className="w-full max-w-[704px]">
            <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8">
              <Dropdown
                options={countryOptions}
                placeholder="國家"
                value={selectedCountry}
                onChange={handleCountryChange}
                className="flex-1"
              />
              <Dropdown
                options={cityOptions}
                placeholder="城市 / 機場"
                value={selectedCity}
                onChange={handleCityChange}
                className="flex-1"
              />
              <SearchView
                placeholder="關鍵字"
                value={searchKeyword}
                onChange={(val) => setSearchKeyword(val)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
            </div>

            <div className="flex justify-center">
              <Button
                text="搜尋"
                text_font_size="text-lg" // 修正：原本 24px 太大
                text_font_weight="font-bold"
                border_border_radius="rounded-[26px]"
                className="px-8 py-3" // 增加內距
                onClick={handleSearch}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tab 導覽 */}
      <section className="w-full py-8 sm:py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center border-[3px] border-[#8e7c60] rounded-full p-4">
            {/* 修正：p-3 → p-5 */}
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

      {/* 搜尋中提示 */}
      {isSearching && (
        <div className="text-center text-white py-4">
          <p className="text-lg animate-pulse">搜尋中...</p>
        </div>
      )}

      {/* 卡片區 */}
      <section className="pb-16 sm:pb-20">
        <div className="max-w-[1104px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          {selectedTab === '行李規定' && !isSearching && (
            <>
              <CheckedLuggageCard data={checkedLuggageRestrictions} />
              <CarryOnCard data={carryOnRestrictions} />
              <ProhibitedItemsCard data={prohibitedItems} />
            </>
          )}

          {selectedTab !== '行李規定' && !isSearching && (
            <div className="text-center text-white py-20 bg-white/5 rounded-lg">
              <p className="text-xl font-medium">{selectedTab}</p>
              <p className="text-sm mt-2 opacity-75">內容開發中...</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
