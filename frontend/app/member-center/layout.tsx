"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import MemberTabs from "./components/MemberTabs";
import Breadcrumb from "@/app/components/Breadcrumb";


export default function MemberCenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname(); // ✅ 新增：取得目前路徑

  useEffect(() => {
    // ✅ 1) 如果是登入或註冊頁，就直接略過驗證
    if (
      pathname === "/member-center/login" ||
      pathname === "/member-center/register"
    ) {
      setLoading(false); // ← 記得把 loading 關掉
      return; // ← 不再往下做驗證
    }

    // ✅ 2) 其餘頁面才做 token 驗證
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false); // ← 避免永遠顯示「檢查中」
      router.replace("/member-center/login"); // ← 用 replace 避免返回循環
      return;
    }

    fetch("http://localhost:3007/api/auth/verify", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.ok) {
          router.replace("/member-center/login");
        }
      })
      .catch(() => router.replace("/member-center/login"))
      .finally(() => setLoading(false)); // ← 一定要關掉 loading
  }, [pathname, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-[#666] text-lg">
        檢查登入中...
      </div>
    );
  }

  // ✅ ✨✨✨ 新增這一段：登入與註冊頁不渲染 layout（直接顯示內容）
  if (
    pathname === "/member-center/login" ||
    pathname === "/member-center/register"
  ) {
    return <>{children}</>;
  }
  // ✅ ✨✨✨ 結束新增區塊

  // ✅ 下面是你原本的UI，完全保留
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
        <div className="mx-auto max-w-[1312px] w-full px-4 sm:px-6 lg:px-[64px] py-10">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "首頁", href: "/" },
            { label: "會員中心" },
          ]}
        />

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
