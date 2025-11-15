// app/travel-community/page.tsx
"use client";

import PageTabs from "./components/PageTabs";
import FilterSidebar from "./components/FilterSidebar";
import Masonry from "./components/Masonry";
import Breadcrumb from "@/app/components/Breadcrumb";

export default function TravelCommunityPage() {
  return (
    <main className="space-y-6">
      <Breadcrumb
        items={[
          { label: "首頁", href: "/" },
          { label: "旅遊分享" },
        ]}
      />

      {/* 次導航（吃滿 1440 的一整列） */}
      <PageTabs />

      {/* 內容區：左側固定篩選 + 右側瀑布流 */}
      <div className="grid grid-cols-12 gap-6">
        {/* 左側：桌機常駐、手機/平板自動收合 */}
        <aside className="col-span-12 lg:col-span-3">
          <div className="lg:sticky lg:top-24">
            <FilterSidebar />
          </div>
        </aside>

        {/* 右側：內容瀑布流 */}
        <section className="col-span-12 lg:col-span-9">
          <Masonry />
        </section>
      </div>
    </main>
  );
}
