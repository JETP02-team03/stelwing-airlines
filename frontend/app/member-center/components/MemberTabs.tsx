"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

const tabs = [
  { key: "info", label: "會員資訊", path: "/member-center" },
  { key: "flights", label: "機票訂單", path: "/member-center/flight" },
  { key: "hotels", label: "住宿訂單", path: "/member-center/hotel" },
  { key: "dutyfree", label: "免稅商品訂單", path: "/member-center/dutyfree" },
]

export default function MemberTabs() {
  const pathname = usePathname()

  const getActiveTab = () => {
    if (pathname === "/member-center") return "info"
    if (pathname.includes("/flight")) return "flights"
    if (pathname.includes("/hotel")) return "hotels"
    if (pathname.includes("/dutyfree")) return "dutyfree"
    return "info"
  }

  const activeTab = getActiveTab()

  return (
    <div className="flex h-12 border-b-2 border-[#D4D4D4] bg-white rounded-t-lg shadow-sm overflow-hidden leading-none">
      {tabs.map((tab) => (
        <Link
          key={tab.key}
          href={tab.path}
          className={`flex-1 h-12 flex items-center justify-center px-6 text-center font-medium transition-all duration-150 border-r border-[#E5E5E5] last:border-r-0
            ${activeTab === tab.key
              ? "bg-[#DCBB87] text-[#1F2E3C]"
              : "bg-white text-[#666666] hover:bg-[#F5F5F5]"}
          `}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
