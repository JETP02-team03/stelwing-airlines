'use client';

import clsx from 'clsx';
import {
  ChevronDown,
  Globe,
  Menu,
  Plane,
  ShoppingCart,
  Trash2,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../dutyfree-shop/components/ui/button'; //  dutyfree 套件按鈕

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface HeaderProps {
  cartItemCount?: number;
  cartItems?: CartItem[];
  onCartClick?: () => void;
  onCheckoutClick?: () => void;
  onMemberClick?: () => void;
  onRemoveItem?: (id: string) => void;
}

export default function Header({
  cartItemCount = 0,
  cartItems = [],
  onCheckoutClick,
  onMemberClick,
  onRemoveItem,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isDutyfree = pathname.startsWith('/dutyfree-shop');

  const navItems = [
    { name: '訂購機票', href: '/flight-booking' },
    { name: '住宿預定', href: '/hotel-booking' },
    { name: '免稅商品', href: '/dutyfree-shop' },
    { name: '旅程規劃', href: '/travel-planner' },
    { name: '旅遊分享', href: '/travel-community' },
  ];

  return (
    <header
      className={clsx('bg-[var(--sw-primary)] text-white sticky top-0 z-50')}
    >
      <div className="mx-auto w-full h-16 px-16 flex items-center justify-between gap-[48px]">
        {/* =================== 左區：Logo + 導覽 =================== */}
        <div className="flex items-center gap-12">
          <Link href="/">
            <Image
              src="/logo-white.svg"
              alt="Stelwing Logo"
              width={125}
              height={48}
              className="cursor-pointer"
            />
          </Link>

          {/* 桌面版導覽列 */}
          <nav className="hidden md:flex items-center gap-9">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'inline-flex items-center h-10 leading-none text-white hover:text-(--sw-accent)transition',
                  pathname.startsWith(item.href) &&
                    'text-(--sw-accent) font-semibold'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* =================== 右區 =================== */}
        <div className="flex items-center gap-6">
          {/* 🛒 Dutyfree 才顯示購物車 */}
          {isDutyfree && (
            <div className="relative">
              <button
                onClick={() => setCartDropdownOpen(!cartDropdownOpen)}
                className="relative p-2 hover:text-(--sw-accent) transition"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Dropdown內容 */}
              {cartDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white text-gray-800 rounded-lg shadow-xl border border-gray-200 z-50">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold">購物車 ({cartItemCount})</h3>
                  </div>

                  {cartItems.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      購物車是空的
                    </div>
                  ) : (
                    <>
                      <div className="max-h-96 overflow-y-auto">
                        {cartItems.map((item) => (
                          <div
                            key={item.id}
                            className="p-4 border-b hover:bg-gray-50 flex gap-3"
                          >
                            <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {item.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                x{item.quantity}
                              </p>
                              <p className="text-sm font-medium text-[var(--sw-accent)]">
                                TWD{' '}
                                {(item.price * item.quantity).toLocaleString()}
                              </p>
                            </div>
                            <button
                              onClick={() => onRemoveItem?.(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="p-4 space-y-2">
                        <Button
                          onClick={() => {
                            setCartDropdownOpen(false);
                            onCheckoutClick
                              ? onCheckoutClick()
                              : router.push('/dutyfree-shop/cart');
                          }}
                          className="w-full bg-(--sw-accent) hover:bg-(--sw-accent)/90 text-white"
                        >
                          結帳
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {/* 🌐 語系切換 */}
          <button
            type="button"
            className="inline-flex items-center h-10 gap-2 text-white hover:text-[var(--sw-accent)] transition"
          >
            <Globe className="w-4 h-4" />
            <span>繁體中文</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* ✈️ 會員登入 */}
          <Link
            href="/member-center"
            className="hidden md:inline-flex items-center gap-2 h-10 px-4 rounded-full bg-[var(--sw-accent)] hover:bg-[var(--sw-accent)]/90 text-[var(--sw-primary)] font-medium transition"
          >
            <Plane className="w-4 h-4" />
            會員登入
          </Link>

          {/* 📱 手機漢堡選單 */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* =================== 手機版選單 =================== */}
      {isOpen && (
        <div className="md:hidden py-4 absolute top-full left-0 w-full bg-[#1F2E3C] flex flex-col items-center z-40">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white hover:text-[#DCBB87] py-2"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          <Button
            onClick={onMemberClick}
            className="w-[80%] mt-4 bg-(--sw-accent)] hover:bg-(--sw-accent)/90 text-(--sw-primary)"
          >
            <Plane className="w-4 h-4 mr-2" /> 會員中心
          </Button>
        </div>
      )}
    </header>
  );
}
