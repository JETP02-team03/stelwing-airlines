'use client';

import { LoginForm } from './_components/LoginForm';

export default function Page() {
  return (
    <>
      <div className="flex h-screen">
        {/* 1. 表單區域：佔容器寬度的一半 */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          {/*
          注意：LoginForm 內部已經有一個居中和最大寬度設定，
          但我們將其放在 w-1/2 的容器內。
          您可能需要調整 LoginForm 內部的外層 div 的寬度設定，
          或直接將其內容拉出來，以確保它只佔 1/2。
          
          如果 LoginForm 內部已經設定了 w-full 和 max-w-md，
          它會保持居中在左側的 w-1/2 區域內。
        */}
          <LoginForm />
        </div>

        {/* 2. 圖片區域：佔容器寬度的另一半 */}
        <div className="hidden lg:flex lg:w-1/2">
          <img
            alt="Login visual"
            // 圖片填滿整個 div 容器，並確保不失真
            className="object-cover w-full h-full"
            src="/login.jpg"
          />
        </div>
      </div>
    </>
  );
}
