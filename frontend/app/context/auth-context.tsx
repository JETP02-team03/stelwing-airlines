"use client";

import { createContext, useContext, useEffect, useState } from "react";
// 🔼【新增】引入 usePathname，讓每次路由變化都重新檢查 token
import { usePathname } from "next/navigation";

// ========================================
// ✅ Auth Context：集中管理登入狀態
// ========================================
interface AuthContextType {
  isLoggedIn: boolean;
  avatar: string;
  member: any;
  login: (token: string) => void;
  logout: () => void;
  refresh: () => void; // 重新抓後端資料
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatar, setAvatar] = useState("/avatars/default.png");
  const [member, setMember] = useState(null);

  // 🔼【新增】目前所在路徑
  const pathname = usePathname();

  // ========================================
  // ⭐ 主要登入狀態同步 function
  // ========================================
  const loadMember = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoggedIn(false);
      setMember(null);
      setAvatar("/avatars/default.png");
      return;
    }

    try {
      const res = await fetch("http://localhost:3007/api/auth/verify", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!data.ok) {
        setIsLoggedIn(false);
        setMember(null);
        setAvatar("/avatars/default.png");
      } else {
        setIsLoggedIn(true);
        setMember(data.member);
        setAvatar(data.member?.avatar?.imagePath || "/avatars/default.png");
      }
    } catch (err) {
      console.error("Auth verify error:", err);
      setIsLoggedIn(false);
      setMember(null);
      setAvatar("/avatars/default.png");
    }
  };

  // ========================================
  // ⭐ 提供給 Login 頁面呼叫
  // ========================================
  const login = (token: string) => {
    localStorage.setItem("token", token); // ← 儲存 token
    loadMember();                         // ← 立即同步狀態（登入當下就更新 Header）
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setMember(null);
    setAvatar("/avatars/default.png");
  };

  const refresh = () => loadMember();

  // ❌【原本】只在第一次 mount 時跑一次
  // useEffect(() => {
  //   loadMember();
  // }, []);

  // 🔧【修改】→ 每次路由變化時都重新檢查 token
  useEffect(() => {
    loadMember();
  }, [pathname]); // 🔼 依賴 pathname：登入後跳轉頁面，Header 就會重新檢查

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, avatar, member, login, logout, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
