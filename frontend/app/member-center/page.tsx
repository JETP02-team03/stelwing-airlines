'use client';

import { useState } from 'react';

// ---------------------------
// 會員資訊內容
// ---------------------------
function MemberInfoContent() {
  return (
    <div className="relative w-full rounded-bl-[8px] rounded-br-[8px]">
      <div className="p-[32px]">
        <h2 className="text-[20px] font-bold mb-[12px]">會員資訊</h2>
        <p className="text-[16px] text-gray-700">
          這裡顯示會員的基本資料（例如姓名、電話、信箱）。
        </p>
      </div>
    </div>
  );
}

// ---------------------------
// 機票訂單內容
// ---------------------------
// 机票订单内容组件
function FlightOrdersContent() {
  const orders = [
    {
      id: 1,
      orderNo: '#0123_45678',
      flightInfo: '台北(桃園)  - 東京成田  12/4 - 12/12  (來回機票）',
      payment: '信用卡',
      status: '已完成',
      date: '2023-03-12',
      time: '12:24:22 AM',
    },
    {
      id: 2,
      orderNo: '#0123_45678',
      flightInfo: '台北(桃園)  - 東京成田  12/4 - 12/12  (來回機票）',
      payment: '現金',
      status: '退款中',
      date: '2023-03-12',
      time: '12:26:22 AM',
    },
    {
      id: 3,
      orderNo: '#0123_45678',
      flightInfo: '台北(桃園)  - 東京成田  12/4 - 12/12  (來回機票）',
      payment: '信用卡',
      status: '已取消',
      date: '2023-03-12',
      time: '12:26:22 AM',
    },
  ];

  return (
    <div className="relative w-full rounded-bl-[8px] rounded-br-[8px]">
      <div className="box-border content-stretch flex flex-col gap-[10px] items-start overflow-clip p-[32px] relative rounded-[inherit] w-full">
        {/* 表格 */}
        <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
          {/* 表头 */}
          <div className="bg-[#1f2e3c] h-[50px] relative rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full">
            <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
              <div className="box-border content-stretch flex flex-col gap-[20px] h-[50px] items-start justify-center p-[3px] relative w-full">
                <div className="content-stretch flex gap-[7px] items-center relative shrink-0 w-full">
                  <div className="box-border flex gap-[10px] h-[35px] items-center justify-center pl-[10px] pr-[5px] py-[10px] w-[37px]">
                    <p className="font-['Campton:SemiBold',sans-serif] text-[12px] text-white uppercase">
                      ID
                    </p>
                  </div>
                  <div className="flex h-[43px] items-center justify-center w-[1px]">
                    <div className="flex-none rotate-[90deg]">
                      <div className="h-0 w-[43px]">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 43 1"
                        >
                          <line
                            stroke="#999999"
                            strokeWidth="0.5"
                            x2="43"
                            y1="0.25"
                            y2="0.25"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="box-border flex gap-[10px] h-[35px] items-center justify-center px-[10px] py-[10px] w-[146px]">
                    <p
                      className="font-['Noto_Sans:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold text-white"
                      style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
                    >
                      訂單號碼
                    </p>
                  </div>
                  <div className="flex h-[43px] items-center justify-center w-[1px]">
                    <div className="flex-none rotate-[90deg]">
                      <div className="h-0 w-[43px]">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 43 1"
                        >
                          <line
                            stroke="#999999"
                            strokeWidth="0.5"
                            x2="43"
                            y1="0.25"
                            y2="0.25"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="box-border flex gap-[10px] h-[35px] items-center justify-center px-[10px] py-[10px] flex-1">
                    <p
                      className="font-['Noto_Sans:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold text-white"
                      style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
                    >
                      航班資訊
                    </p>
                  </div>
                  <div className="flex h-[43px] items-center justify-center w-[1px]">
                    <div className="flex-none rotate-[90deg]">
                      <div className="h-0 w-[43px]">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 43 1"
                        >
                          <line
                            stroke="#999999"
                            strokeWidth="0.5"
                            x2="43"
                            y1="0.25"
                            y2="0.25"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="box-border flex gap-[10px] h-[35px] items-center px-[10px] py-[10px] w-[142px]">
                    <p
                      className="font-['Noto_Sans:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold text-center text-white"
                      style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
                    >
                      付款方式
                    </p>
                  </div>
                  <div className="flex h-[43px] items-center justify-center w-[1px]">
                    <div className="flex-none rotate-[90deg]">
                      <div className="h-0 w-[43px]">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 43 1"
                        >
                          <line
                            stroke="#999999"
                            strokeWidth="0.5"
                            x2="43"
                            y1="0.25"
                            y2="0.25"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="box-border flex gap-[10px] h-[35px] items-center justify-center px-[10px] py-[10px] w-[121px]">
                    <p
                      className="font-['Noto_Sans:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold text-white"
                      style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
                    >
                      狀態
                    </p>
                  </div>
                  <div className="flex h-[43px] items-center justify-center w-[1px]">
                    <div className="flex-none rotate-[90deg]">
                      <div className="h-0 w-[43px]">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 43 1"
                        >
                          <line
                            stroke="#999999"
                            strokeWidth="0.5"
                            x2="43"
                            y1="0.25"
                            y2="0.25"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="box-border flex gap-[10px] h-[35px] items-center justify-center p-[10px] w-[155px]">
                    <p
                      className="font-['Noto_Sans:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold text-white"
                      style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
                    >
                      成立日期
                    </p>
                  </div>
                  <div className="flex h-[43px] items-center justify-center w-[1px]">
                    <div className="flex-none rotate-[90deg]">
                      <div className="h-0 w-[43px]">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 43 1"
                        >
                          <line
                            stroke="#999999"
                            strokeWidth="0.5"
                            x2="43"
                            y1="0.25"
                            y2="0.25"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-[10px] h-[35px] items-center justify-center p-[10px] w-[100px]">
                    <p
                      className="font-['Noto_Sans:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold text-white"
                      style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
                    >
                      電子機票
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              aria-hidden="true"
              className="absolute border border-[#5f5f5f] border-solid inset-0 pointer-events-none rounded-tl-[8px] rounded-tr-[8px] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)]"
            />
          </div>

          {/* 表格内容 */}
          <div className="content-stretch flex flex-col gap-[5px] items-start w-full">
            {orders.map((order) => (
              <div key={order.id} className="bg-white relative shrink-0 w-full">
                <div className="box-border flex gap-[20px] items-start px-[10px] py-[5px] w-full">
                  <div className="box-border flex flex-col gap-[10px] items-start px-[5px] py-[10px]">
                    <p className="font-['Campton:Book',sans-serif] text-[12px] text-black">
                      {order.id}
                    </p>
                  </div>
                  <div className="flex items-center justify-center self-stretch w-[1px]">
                    <div className="flex-none h-full rotate-[90deg]">
                      <div className="h-full w-[50px]">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 50 1"
                        >
                          <line
                            stroke="#E9ECEF"
                            strokeWidth="0.5"
                            x2="50"
                            y1="0.25"
                            y2="0.25"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="box-border flex gap-[10px] items-start px-[5px] py-[10px] w-[120px]">
                    <p
                      className="font-['Noto_Sans:Regular',sans-serif] text-[#141718]"
                      style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
                    >
                      {order.orderNo}
                    </p>
                  </div>
                  <div className="flex items-center justify-center self-stretch w-[1px]">
                    <div className="flex-none h-full rotate-[90deg]">
                      <div className="h-full w-[50px]">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 50 1"
                        >
                          <line
                            stroke="#E9ECEF"
                            strokeWidth="0.5"
                            x2="50"
                            y1="0.25"
                            y2="0.25"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="box-border flex gap-[10px] items-start p-[10px] flex-1">
                    <p
                      className="font-['Noto_Sans:Regular','Noto_Sans_JP:Regular',sans-serif] text-[12px] text-black"
                      style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
                    >
                      {order.flightInfo}
                    </p>
                  </div>
                  <div className="flex items-center justify-center self-stretch w-[1px]">
                    <div className="flex-none h-full rotate-[90deg]">
                      <div className="h-full w-[50px]">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 50 1"
                        >
                          <line
                            stroke="#E9ECEF"
                            strokeWidth="0.5"
                            x2="50"
                            y1="0.25"
                            y2="0.25"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="box-border flex gap-[10px] items-start justify-center p-[10px] w-[114px]">
                    <p
                      className="font-['Noto_Sans:Regular','Noto_Sans_JP:Regular',sans-serif] text-[12px] text-black"
                      style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
                    >
                      {order.payment}
                    </p>
                  </div>
                  <div className="flex items-center justify-center self-stretch w-[1px]">
                    <div className="flex-none h-full rotate-[90deg]">
                      <div className="h-full w-[50px]">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 50 1"
                        >
                          <line
                            stroke="#E9ECEF"
                            strokeWidth="0.5"
                            x2="50"
                            y1="0.25"
                            y2="0.25"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="box-border flex flex-col gap-[10px] items-start p-[10px]">
                    <div className="box-border flex flex-col gap-[10px] h-[30px] items-center justify-center p-[2.5px] rounded-[6px]">
                      <div
                        aria-hidden="true"
                        className={`absolute border ${order.status === '已完成' ? 'border-[#28a745]' : order.status === '退款中' ? 'border-[#f60621]' : 'border-[#c5c8c8]'} border-solid inset-0 pointer-events-none rounded-[6px]`}
                      />
                      <div className="bg-white box-border flex gap-[10px] items-center justify-center p-[10px] rounded-[5px] w-[70px]">
                        <p
                          className={`font-['Noto_Sans:Regular','Noto_Sans_JP:Regular',sans-serif] text-[12px] ${order.status === '已完成' ? 'text-[#28a745]' : order.status === '退款中' ? 'text-[#f60621]' : 'text-[#c5c8c8]'}`}
                          style={{
                            fontVariationSettings: "'CTGR' 0, 'wdth' 100",
                          }}
                        >
                          {order.status}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center self-stretch w-[1px]">
                    <div className="flex-none h-full rotate-[90deg]">
                      <div className="h-full w-[50px]">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 50 1"
                        >
                          <line
                            stroke="#E9ECEF"
                            strokeWidth="0.5"
                            x2="50"
                            y1="0.25"
                            y2="0.25"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="box-border flex gap-[10px] items-start justify-center p-[10px] w-[130px]">
                    <div className="font-['Campton:Book',sans-serif] text-[12px] text-black text-center">
                      <p className="mb-0">{order.date}</p>
                      <p>{order.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center self-stretch w-[1px]">
                    <div className="flex-none h-full rotate-[90deg]">
                      <div className="h-full w-[50px]">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 50 1"
                        >
                          <line
                            stroke="#E9ECEF"
                            strokeWidth="0.5"
                            x2="50"
                            y1="0.25"
                            y2="0.25"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="box-border flex gap-[10px] items-start justify-center p-[10px] w-[100px]">
                    <button
                      className="font-['Noto_Sans:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold text-black underline hover:opacity-70 transition-opacity"
                      style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
                    >
                      前往查看
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border-2 border-[#dcbb87] border-solid inset-0 pointer-events-none rounded-bl-[8px] rounded-br-[8px]"
      />
    </div>
  );
}

// ---------------------------
// 住宿訂單內容
// ---------------------------
// 住宿订单内容组件
function AccommodationOrdersContent() {
  return (
    <div className="relative w-full rounded-bl-[8px] rounded-br-[8px]">
      <div className="box-border content-stretch flex flex-col gap-[10px] items-start overflow-clip p-[32px] relative rounded-[inherit] w-full">
        {/* 表格 */}
        <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
          {/* 表头 */}
          <div className="bg-[#1f2e3c] h-[50px] relative rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full">
            <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
              <div className="box-border content-stretch flex flex-col gap-[20px] h-[50px] items-start justify-center p-[3px] relative w-full">
                <div className="content-stretch flex gap-[7px] items-center relative shrink-0 w-full">
                  <div className="box-border flex gap-[10px] h-[35px] items-center justify-center pl-[10px] pr-[5px] py-[10px] w-[37px]">
                    <p className="font-['Campton:SemiBold',sans-serif] text-[12px] text-white uppercase">
                      ID
                    </p>
                  </div>
                  <div className="flex h-[43px] items-center justify-center w-[1px]">
                    <div className="flex-none rotate-[90deg]">
                      <div className="h-0 w-[43px]">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 43 1"
                        >
                          <line
                            stroke="#999999"
                            strokeWidth="0.5"
                            x2="43"
                            y1="0.25"
                            y2="0.25"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="box-border flex gap-[10px] h-[35px] items-center justify-center px-[10px] py-[10px] w-[146px]">
                    <p
                      className="font-['Noto_Sans:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold text-white"
                      style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
                    >
                      訂單號碼
                    </p>
                  </div>
                  <div className="flex h-[43px] items-center justify-center w-[1px]">
                    <div className="flex-none rotate-[90deg]">
                      <div className="h-0 w-[43px]">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 43 1"
                        >
                          <line
                            stroke="#999999"
                            strokeWidth="0.5"
                            x2="43"
                            y1="0.25"
                            y2="0.25"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="box-border flex gap-[10px] h-[35px] items-center justify-center px-[10px] py-[10px] flex-1">
                    <p
                      className="font-['Noto_Sans:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold text-white"
                      style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
                    >
                      訂房資料
                    </p>
                  </div>
                  <div className="flex h-[43px] items-center justify-center w-[1px]">
                    <div className="flex-none rotate-[90deg]">
                      <div className="h-0 w-[43px]">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 43 1"
                        >
                          <line
                            stroke="#999999"
                            strokeWidth="0.5"
                            x2="43"
                            y1="0.25"
                            y2="0.25"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="box-border flex gap-[10px] h-[35px] items-center px-[10px] py-[10px] w-[142px]">
                    <p
                      className="font-['Noto_Sans:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold text-center text-white"
                      style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
                    >
                      付款方式
                    </p>
                  </div>
                  <div className="flex h-[43px] items-center justify-center w-[1px]">
                    <div className="flex-none rotate-[90deg]">
                      <div className="h-0 w-[43px]">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 43 1"
                        >
                          <line
                            stroke="#999999"
                            strokeWidth="0.5"
                            x2="43"
                            y1="0.25"
                            y2="0.25"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="box-border flex gap-[10px] h-[35px] items-center justify-center px-[10px] py-[10px] w-[121px]">
                    <p
                      className="font-['Noto_Sans:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold text-white"
                      style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
                    >
                      狀態
                    </p>
                  </div>
                  <div className="flex h-[43px] items-center justify-center w-[1px]">
                    <div className="flex-none rotate-[90deg]">
                      <div className="h-0 w-[43px]">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 43 1"
                        >
                          <line
                            stroke="#999999"
                            strokeWidth="0.5"
                            x2="43"
                            y1="0.25"
                            y2="0.25"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="box-border flex gap-[10px] h-[35px] items-center justify-center p-[10px] w-[155px]">
                    <p
                      className="font-['Noto_Sans:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold text-white"
                      style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
                    >
                      成立日期
                    </p>
                  </div>
                  <div className="flex h-[43px] items-center justify-center w-[1px]">
                    <div className="flex-none rotate-[90deg]">
                      <div className="h-0 w-[43px]">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 43 1"
                        >
                          <line
                            stroke="#999999"
                            strokeWidth="0.5"
                            x2="43"
                            y1="0.25"
                            y2="0.25"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-[10px] h-[35px] items-center justify-center p-[10px] w-[51px]">
                    <p
                      className="font-['Noto_Sans:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold text-white"
                      style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
                    >
                      編輯
                    </p>
                  </div>
                  <div className="flex gap-[10px] h-[35px] items-center justify-center p-[10px] w-[51px]">
                    <p
                      className="font-['Noto_Sans:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold text-white"
                      style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
                    >
                      刪除
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              aria-hidden="true"
              className="absolute border border-[#5f5f5f] border-solid inset-0 pointer-events-none rounded-tl-[8px] rounded-tr-[8px] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)]"
            />
          </div>

          {/* 表格内容 */}
          <div className="bg-white box-border flex gap-[20px] items-start justify-center px-[10px] py-[5px] w-full">
            <div className="box-border flex flex-col gap-[10px] items-center px-[5px] py-[10px]">
              <p className="font-['Campton:Book',sans-serif] text-[12px] text-black">
                1
              </p>
            </div>
            <div className="flex items-center justify-center self-stretch w-[1px]">
              <div className="flex-none h-full rotate-[90deg]">
                <div className="h-full w-[50px]">
                  <svg
                    className="block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 50 1"
                  >
                    <line
                      stroke="#E9ECEF"
                      strokeWidth="0.5"
                      x2="50"
                      y1="0.25"
                      y2="0.25"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="box-border flex gap-[10px] items-start px-[5px] py-[10px] w-[120px]">
              <p
                className="font-['Noto_Sans:Regular',sans-serif] text-[#141718]"
                style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
              >
                #0123_45678
              </p>
            </div>
            <div className="flex items-center justify-center self-stretch w-[1px]">
              <div className="flex-none h-full rotate-[90deg]">
                <div className="h-full w-[50px]">
                  <svg
                    className="block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 50 1"
                  >
                    <line
                      stroke="#E9ECEF"
                      strokeWidth="0.5"
                      x2="50"
                      y1="0.25"
                      y2="0.25"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="box-border flex gap-[10px] items-start p-[10px] flex-1">
              <p
                className="font-['Noto_Sans:Regular','Noto_Sans_JP:Regular',sans-serif] text-black"
                style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
              >
                Solana Smart INN 成田空港
              </p>
            </div>
            <div className="flex items-center justify-center self-stretch w-[1px]">
              <div className="flex-none h-full rotate-[90deg]">
                <div className="h-full w-[50px]">
                  <svg
                    className="block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 50 1"
                  >
                    <line
                      stroke="#E9ECEF"
                      strokeWidth="0.5"
                      x2="50"
                      y1="0.25"
                      y2="0.25"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="box-border flex gap-[10px] items-start justify-center p-[10px] w-[114px]">
              <p
                className="font-['Noto_Sans:Regular','Noto_Sans_JP:Regular',sans-serif] text-[12px] text-black"
                style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
              >
                信用卡
              </p>
            </div>
            <div className="flex items-center justify-center self-stretch w-[1px]">
              <div className="flex-none h-full rotate-[90deg]">
                <div className="h-full w-[50px]">
                  <svg
                    className="block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 50 1"
                  >
                    <line
                      stroke="#E9ECEF"
                      strokeWidth="0.5"
                      x2="50"
                      y1="0.25"
                      y2="0.25"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="box-border flex flex-col gap-[10px] items-start p-[10px]">
              <div className="box-border flex flex-col gap-[10px] h-[30px] items-center justify-center p-[2.5px] rounded-[6px]">
                <div
                  aria-hidden="true"
                  className="absolute border border-[#28a745] border-solid inset-0 pointer-events-none rounded-[6px]"
                />
                <div className="bg-white box-border flex gap-[10px] items-center justify-center p-[10px] rounded-[5px] w-[70px]">
                  <p
                    className="font-['Noto_Sans:Regular','Noto_Sans_JP:Regular',sans-serif] text-[12px] text-[#28a745]"
                    style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
                  >
                    已完成
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center self-stretch w-[1px]">
              <div className="flex-none h-full rotate-[90deg]">
                <div className="h-full w-[50px]">
                  <svg
                    className="block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 50 1"
                  >
                    <line
                      stroke="#E9ECEF"
                      strokeWidth="0.5"
                      x2="50"
                      y1="0.25"
                      y2="0.25"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="box-border flex gap-[10px] items-start justify-center p-[10px] w-[130px]">
              <div className="font-['Campton:Book',sans-serif] text-[12px] text-black text-center">
                <p className="mb-0">2023-03-12</p>
                <p>12:26:22 AM</p>
              </div>
            </div>
            <div className="flex items-center justify-center self-stretch w-[1px]">
              <div className="flex-none h-full rotate-[90deg]">
                <div className="h-full w-[50px]">
                  <svg
                    className="block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 50 1"
                  >
                    <line
                      stroke="#E9ECEF"
                      strokeWidth="0.5"
                      x2="50"
                      y1="0.25"
                      y2="0.25"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <button className="box-border flex gap-[10px] h-[48px] items-center justify-center p-[10px] w-[51px] hover:opacity-70 transition-opacity">
              <div className="relative shrink-0 size-[24px]">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13 3.00011L16 6.00011M17.385 4.58511C17.7788 4.19126 18.0001 3.65709 18.0001 3.10011C18.0001 2.54312 17.7788 2.00895 17.385 1.61511C16.9912 1.22126 16.457 1 15.9 1C15.343 1 14.8088 1.22126 14.415 1.61511L6 10.0001V13.0001H9L17.385 4.58511Z"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                  <path
                    d="M4 5.00011H3C2.46957 5.00011 1.96086 5.21082 1.58579 5.58589C1.21071 5.96097 1 6.46967 1 7.00011V16.0001C1 16.5305 1.21071 17.0392 1.58579 17.4143C1.96086 17.7894 2.46957 18.0001 3 18.0001H12C12.5304 18.0001 13.0391 17.7894 13.4142 17.4143C13.7893 17.0392 14 16.5305 14 16.0001V15.0001"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </button>
            <button className="box-border flex gap-[10px] h-[48px] items-center justify-center p-[10px] w-[51px] hover:opacity-70 transition-opacity">
              <div className="overflow-clip relative shrink-0 size-[24px]">
                <div className="absolute inset-[20.833%]">
                  <svg
                    className="block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      clipRule="evenodd"
                      d="M0.292893 0.292893C0.683418 -0.0976309 1.31658 -0.0976309 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683418 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683418 14.0976 0.292893 13.7071C-0.0976309 13.3166 -0.0976309 12.6834 0.292893 12.2929L5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893Z"
                      fill="#6C7275"
                      fillRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border-2 border-[#dcbb87] border-solid inset-0 pointer-events-none rounded-bl-[8px] rounded-br-[8px]"
      />
    </div>
  );
}

// ---------------------------
// 免稅商品訂單內容
// ---------------------------
// 免税商品订单内容组件
function DutyFreeOrdersContent() {
  const orders = [
    {
      id: 1,
      orderNo: '#0123_45678',
      product: 'Chanel N°5系列 典藏香水-50mL',
      payment: '信用卡',
      status: '已完成',
      statusColor: '#28a745',
      date: '2023-03-12',
      time: '12:24:22 AM',
    },
    {
      id: 1,
      orderNo: '#0123_45678',
      product: 'Chanel N°5系列 典藏香水-50mL',
      payment: '現金',
      status: '退款中',
      statusColor: '#f60621',
      date: '2023-03-12',
      time: '12:26:22 AM',
    },
    {
      id: 1,
      orderNo: '#0123_45678',
      product: 'Chanel N°5系列 典藏香水-50mL',
      payment: '信用卡',
      status: '已取消',
      statusColor: '#c5c8c8',
      date: '2023-03-12',
      time: '12:26:22 AM',
    },
    {
      id: 1,
      orderNo: '#0123_45678',
      product: 'Chanel N°5系列 典藏香水-50mL',
      payment: '信用卡',
      status: '已完成',
      statusColor: '#28a745',
      date: '2023-03-12',
      time: '12:24:22 AM',
    },
  ];

  return (
    <div className="relative w-full rounded-bl-[8px] rounded-br-[8px]">
      <div className="box-border content-stretch flex flex-col gap-[10px] items-start overflow-clip p-[32px] relative rounded-[inherit] w-full">
        {/* 表格 */}
        <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
          {/* 表头 */}
          <div className="bg-[#1f2e3c] h-[50px] relative rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full">
            <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
              <div className="box-border content-stretch flex flex-col gap-[20px] h-[50px] items-start justify-center p-[3px] relative w-full">
                <div className="content-stretch flex gap-[7px] items-center relative shrink-0 w-full">
                  <div className="box-border flex gap-[10px] h-[35px] items-center justify-center pl-[10px] pr-[5px] py-[10px] w-[37px]">
                    <p className="font-['Campton:SemiBold',sans-serif] text-[12px] text-white uppercase">
                      ID
                    </p>
                  </div>
                  <div className="flex h-[43px] items-center justify-center w-[1px]">
                    <div className="flex-none rotate-[90deg]">
                      <div className="h-0 w-[43px]">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 43 1"
                        >
                          <line
                            stroke="#999999"
                            strokeWidth="0.5"
                            x2="43"
                            y1="0.25"
                            y2="0.25"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="box-border flex gap-[10px] h-[35px] items-center justify-center px-[10px] py-[10px] w-[146px]">
                    <p
                      className="font-['Noto_Sans:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold text-white"
                      style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
                    >
                      訂單號碼
                    </p>
                  </div>
                  <div className="flex h-[43px] items-center justify-center w-[1px]">
                    <div className="flex-none rotate-[90deg]">
                      <div className="h-0 w-[43px]">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 43 1"
                        >
                          <line
                            stroke="#999999"
                            strokeWidth="0.5"
                            x2="43"
                            y1="0.25"
                            y2="0.25"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="box-border flex gap-[10px] h-[35px] items-center justify-center px-[10px] py-[10px] flex-1">
                    <p
                      className="font-['Noto_Sans:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold text-white"
                      style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
                    >
                      商品
                    </p>
                  </div>
                  <div className="flex h-[43px] items-center justify-center w-[1px]">
                    <div className="flex-none rotate-[90deg]">
                      <div className="h-0 w-[43px]">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 43 1"
                        >
                          <line
                            stroke="#999999"
                            strokeWidth="0.5"
                            x2="43"
                            y1="0.25"
                            y2="0.25"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="box-border flex gap-[10px] h-[35px] items-center px-[10px] py-[10px] w-[142px]">
                    <p
                      className="font-['Noto_Sans:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold text-center text-white"
                      style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
                    >
                      付款方式
                    </p>
                  </div>
                  <div className="flex h-[43px] items-center justify-center w-[1px]">
                    <div className="flex-none rotate-[90deg]">
                      <div className="h-0 w-[43px]">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 43 1"
                        >
                          <line
                            stroke="#999999"
                            strokeWidth="0.5"
                            x2="43"
                            y1="0.25"
                            y2="0.25"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="box-border flex gap-[10px] h-[35px] items-center justify-center px-[10px] py-[10px] w-[121px]">
                    <p
                      className="font-['Noto_Sans:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold text-white"
                      style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
                    >
                      狀態
                    </p>
                  </div>
                  <div className="flex h-[43px] items-center justify-center w-[1px]">
                    <div className="flex-none rotate-[90deg]">
                      <div className="h-0 w-[43px]">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 43 1"
                        >
                          <line
                            stroke="#999999"
                            strokeWidth="0.5"
                            x2="43"
                            y1="0.25"
                            y2="0.25"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="box-border flex gap-[10px] h-[35px] items-center justify-center p-[10px] w-[155px]">
                    <p
                      className="font-['Noto_Sans:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold text-white"
                      style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
                    >
                      成立日期
                    </p>
                  </div>
                  <div className="flex h-[43px] items-center justify-center w-[1px]">
                    <div className="flex-none rotate-[90deg]">
                      <div className="h-0 w-[43px]">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 43 1"
                        >
                          <line
                            stroke="#999999"
                            strokeWidth="0.5"
                            x2="43"
                            y1="0.25"
                            y2="0.25"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-[10px] h-[35px] items-center justify-center p-[10px] w-[51px]">
                    <p
                      className="font-['Noto_Sans:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold text-white"
                      style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
                    >
                      刪除
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              aria-hidden="true"
              className="absolute border border-[#5f5f5f] border-solid inset-0 pointer-events-none rounded-tl-[8px] rounded-tr-[8px] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)]"
            />
          </div>

          {/* 表格内容 */}
          <div className="content-stretch flex flex-col gap-[5px] items-start w-full">
            {orders.map((order, idx) => (
              <div key={idx} className="bg-white relative shrink-0 w-full">
                <div className="box-border flex gap-[20px] items-start px-[10px] py-[5px] w-full">
                  <div className="box-border flex flex-col gap-[10px] items-start px-[5px] py-[10px]">
                    <p className="font-['Campton:Book',sans-serif] text-[12px] text-black">
                      {order.id}
                    </p>
                  </div>
                  <div className="flex items-center justify-center self-stretch w-[1px]">
                    <div className="flex-none h-full rotate-[90deg]">
                      <div className="h-full w-[50px]">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 50 1"
                        >
                          <line
                            stroke="#E9ECEF"
                            strokeWidth="0.5"
                            x2="50"
                            y1="0.25"
                            y2="0.25"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="box-border flex gap-[10px] items-start px-[5px] py-[10px] w-[120px]">
                    <p
                      className="font-['Noto_Sans:Regular',sans-serif] text-[#141718]"
                      style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
                    >
                      {order.orderNo}
                    </p>
                  </div>
                  <div className="flex items-center justify-center self-stretch w-[1px]">
                    <div className="flex-none h-full rotate-[90deg]">
                      <div className="h-full w-[50px]">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 50 1"
                        >
                          <line
                            stroke="#E9ECEF"
                            strokeWidth="0.5"
                            x2="50"
                            y1="0.25"
                            y2="0.25"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="box-border flex gap-[10px] items-start p-[10px] flex-1">
                    <p
                      className="font-['Noto_Sans:Regular','Noto_Sans_JP:Regular',sans-serif] text-[12px] text-black"
                      style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
                    >
                      {order.product}
                    </p>
                  </div>
                  <div className="flex items-center justify-center self-stretch w-[1px]">
                    <div className="flex-none h-full rotate-[90deg]">
                      <div className="h-full w-[50px]">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 50 1"
                        >
                          <line
                            stroke="#E9ECEF"
                            strokeWidth="0.5"
                            x2="50"
                            y1="0.25"
                            y2="0.25"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="box-border flex gap-[10px] items-start justify-center p-[10px] w-[114px]">
                    <p
                      className="font-['Noto_Sans:Regular','Noto_Sans_JP:Regular',sans-serif] text-[12px] text-black"
                      style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
                    >
                      {order.payment}
                    </p>
                  </div>
                  <div className="flex items-center justify-center self-stretch w-[1px]">
                    <div className="flex-none h-full rotate-[90deg]">
                      <div className="h-full w-[50px]">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 50 1"
                        >
                          <line
                            stroke="#E9ECEF"
                            strokeWidth="0.5"
                            x2="50"
                            y1="0.25"
                            y2="0.25"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="box-border flex flex-col gap-[10px] items-start p-[10px]">
                    <div className="box-border flex flex-col gap-[10px] h-[30px] items-center justify-center p-[2.5px] rounded-[6px]">
                      <div
                        aria-hidden="true"
                        className={`absolute border border-solid inset-0 pointer-events-none rounded-[6px]`}
                        style={{ borderColor: order.statusColor }}
                      />
                      <div className="bg-white box-border flex gap-[10px] items-center justify-center p-[10px] rounded-[5px] w-[70px]">
                        <p
                          className="font-['Noto_Sans:Regular','Noto_Sans_JP:Regular',sans-serif] text-[12px]"
                          style={{
                            fontVariationSettings: "'CTGR' 0, 'wdth' 100",
                            color: order.statusColor,
                          }}
                        >
                          {order.status}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center self-stretch w-[1px]">
                    <div className="flex-none h-full rotate-[90deg]">
                      <div className="h-full w-[50px]">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 50 1"
                        >
                          <line
                            stroke="#E9ECEF"
                            strokeWidth="0.5"
                            x2="50"
                            y1="0.25"
                            y2="0.25"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="box-border flex gap-[10px] items-start justify-center p-[10px] w-[130px]">
                    <div className="font-['Campton:Book',sans-serif] text-[12px] text-black text-center">
                      <p className="mb-0">{order.date}</p>
                      <p>{order.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center self-stretch w-[1px]">
                    <div className="flex-none h-full rotate-[90deg]">
                      <div className="h-full w-[50px]">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 50 1"
                        >
                          <line
                            stroke="#E9ECEF"
                            strokeWidth="0.5"
                            x2="50"
                            y1="0.25"
                            y2="0.25"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <button className="box-border flex gap-[10px] h-[48px] items-center justify-center p-[10px] w-[51px] hover:opacity-70 transition-opacity">
                    <div className="overflow-clip relative shrink-0 size-[24px]">
                      <div className="absolute inset-[20.833%]">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            clipRule="evenodd"
                            d="M0.292893 0.292893C0.683418 -0.0976309 1.31658 -0.0976309 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683418 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683418 14.0976 0.292893 13.7071C-0.0976309 13.3166 -0.0976309 12.6834 0.292893 12.2929L5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893Z"
                            fill="#6C7275"
                            fillRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border-2 border-[#dcbb87] border-solid inset-0 pointer-events-none rounded-bl-[8px] rounded-br-[8px]"
      />
    </div>
  );
}

// ---------------------------
// 主頁面
// ---------------------------
export default function MemberCenterPage() {
  const [activeTab, setActiveTab] = useState('info');

  return (
    <div className="bg-white relative w-full min-h-screen">
      <div className="max-w-[1440px] mx-auto px-[65px] py-[60px]">
        <p className="text-[#dcbb87] text-[12px] mb-[20px]">
          首頁 &gt; 會員中心
        </p>
        <p className="text-black text-[24px] mb-[32px]">會員中心</p>

        {/* Tabs */}
        <div className="flex mb-0">
          {[
            { key: 'info', label: '會員資訊' },
            { key: 'flights', label: '機票訂單' },
            { key: 'accommodation', label: '住宿訂單' },
            { key: 'dutyfree', label: '免稅商品訂單' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-[24px] py-[8px] w-[328px] rounded-t-lg transition-colors ${
                activeTab === tab.key ? 'bg-[#dcbb87]' : 'bg-white'
              }`}
            >
              <p className="text-[20px] font-bold text-black">{tab.label}</p>
            </button>
          ))}
        </div>

        {/* Tab內容 */}
        <div className="relative w-full">
          {activeTab === 'info' && <MemberInfoContent />}
          {activeTab === 'flights' && <FlightOrdersContent />}
          {activeTab === 'accommodation' && <AccommodationOrdersContent />}
          {activeTab === 'dutyfree' && <DutyFreeOrdersContent />}
        </div>
      </div>
    </div>
  );
}
