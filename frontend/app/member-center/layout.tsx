"use client";

import type React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import MemberTabs from "./components/MemberTabs";

export default function MemberCenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="w-full max-w-[1440px] mx-auto py-10 px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#666666] mb-6">
          <Link href="/" className="hover:text-[#DCBB87] transition-colors">
            首頁
          </Link>
          <ChevronRight size={16} />
          <span className="text-[#1F2E3C]">會員中心</span>
        </div>

        {/* Page Title */}
        <h1 className="text-[24px] text-[#1F2E3C] mb-8">會員中心</h1>

        {/* Tabs */}
        <MemberTabs />

        {/* Content */}
        <div className="pt-6">{children}</div>
      </div>
    </div>
  );
}
