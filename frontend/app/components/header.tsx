'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
// icon 使用 lucide-react 套件，這是需要 npm i 的
import { Menu, X } from 'lucide-react';

export interface HeaderProps {
  className?: string;
}

export default function Header({}: HeaderProps) {
  // 導覽 nav 有橫向電腦版和手機漢堡版，透過這裡做切換，預設是不打開 (false) 的漢堡版
  const [isOpen, setIsOpen] = useState(false);

  // 不能重複寫五次 Link，迴圈用起來
  const navItems = [
    { name: '訂購機票', href: '/flight-booking' },
    { name: '住宿預定', href: '/hotel-booking' },
    { name: '免稅商品', href: '/dutyfree-shop' },
    { name: '旅程規劃', href: '/travel-planner' },
    { name: '旅遊分享', href: '/travel-community' },
  ];

  return (
    <>
      <header
        className="
      w-full bg-[#1F2E3C] 
      px-[64px] py-[16px]
      flex items-center gap-[48px]
      relative
      shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
      >
        <Link href="/">
          <Image
            src="/logo-white.svg"
            alt="Stelwing Logo"
            width={125}
            height={48}
            className="cursor-pointer"
          />
        </Link>

        {/* 橫向電腦版：預設隱藏，出現時使用 flex */}
        <div className="nav-bar hidden flex-1 md:flex justify-between">
          <nav className="flex gap-[36px]">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:text-[#DCBB87]"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* 寬螢幕：工具列：(購物車)、(多語系切換)、會員中心 */}
          <div>
            <Link
              href="/member-center"
              className="text-white hover:text-[#DCBB87]"
            >
              會員中心
            </Link>
          </div>
        </div>

        {/* 手機漢堡版：在小螢幕時隱藏 */}
        <div className="nav-hamburger md:hidden flex-1 flex justify-end">
          <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* 漢堡選單內容 */}
        {isOpen && (
          <div
            className="
          md:hidden py-4
          absolute top-full left-0 w-full 
          bg-[#1F2E3C] 
          flex flex-col items-center"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:text-[#DCBB87] py-2"
                onClick={() => setIsOpen(false)} // 點擊後自動收起
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/member-center"
              className="text-white hover:text-[#DCBB87] py-2"
              onClick={() => setIsOpen(false)}
            >
              會員中心
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
