"use client";

export default function MileageTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  return (
    <div className="w-full flex border-b border-[#BA9A60] mt-8">
      <button
        className={`flex-1 py-3 text-center text-sm border border-[#BA9A60] border-b-0 rounded-t-xl 
          ${activeTab === "rule" ? "bg-[#DCBB87] text-[#1F2E3C]" : "bg-[#F3EBDD] text-[#555]"}`}
        onClick={() => setActiveTab("rule")}
      >
        哩程說明
      </button>

      <button
        className={`flex-1 py-3 text-center text-sm border border-[#BA9A60] border-b-0 rounded-t-xl 
          ${activeTab === "detail" ? "bg-[#DCBB87] text-[#1F2E3C]" : "bg-[#F3EBDD] text-[#555]"}`}
        onClick={() => setActiveTab("detail")}
      >
        哩程明細
      </button>
    </div>
  );
}
