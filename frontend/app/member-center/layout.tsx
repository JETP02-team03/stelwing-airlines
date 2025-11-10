// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { ChevronRight } from "lucide-react";
// import MemberTabs from "./components/MemberTabs";

// export default function MemberCenterLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [loading, setLoading] = useState(true); // ✅ 新增：控制載入狀態
//   const router = useRouter(); // ✅ 新增：讓我們可以在程式裡導頁

//   // ✅ 新增：登入驗證邏輯
//   useEffect(() => {
//     const token = localStorage.getItem("token"); // 檢查是否有登入憑證
//     if (!token) {
//       router.push("/member-center/login"); // 沒 token → 導向登入頁
//       return;
//     }

//     // 驗證 token 是否有效
//     fetch("http://localhost:3007/api/auth/verify", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (!data.ok) {
//           router.push("/member-center/login"); // token 無效 → 重新登入
//         }
//       })
//       .catch(() => router.push("/member-center/login")) // 伺服器錯誤也導回登入
//       .finally(() => setLoading(false)); // 結束載入
//   }, [router]);

//   // ✅ 新增：顯示「檢查登入中」畫面（避免閃爍）
//   if (loading)
//     return (
//       <div className="flex items-center justify-center min-h-screen text-[#666] text-lg">
//         檢查登入中...
//       </div>
//     );

//   // ✅ 以下保留原本的版型不動
//   return (
//     <div className="min-h-screen bg-[#F5F5F5]">
//       <div className="w-full max-w-[1440px] mx-auto py-10 px-4 sm:px-6 lg:px-8">
//         {/* Breadcrumb */}
//         <div className="flex items-center gap-2 text-sm text-[#666666] mb-6">
//           <Link href="/" className="hover:text-[#DCBB87] transition-colors">
//             首頁
//           </Link>
//           <ChevronRight size={16} />
//           <span className="text-[#1F2E3C]">會員中心</span>
//         </div>

//         {/* Page Title */}
//         <h1 className="text-[24px] text-[#1F2E3C] mb-8">會員中心</h1>

//         {/* Tabs */}
//         <MemberTabs />

//         {/* Content */}
//         <div className="pt-6">{children}</div>
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import MemberTabs from "./components/MemberTabs";

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

  // ✅ 下面是你原本的UI，完全保留
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
