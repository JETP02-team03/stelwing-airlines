"use client";

import { useState } from "react";
import OrderTable, { type Column } from "../components/OrderTable";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";

const mockFlightOrders = [
  {
    id: "1",
    orderId: "#0123_45678",
    route: "台北(桃園) - 東京成田 12/4 - 12/12 (來回機票)",
    paymentMethod: "信用卡",
    status: "success",
    createdAt: "2023-03-12\n12:24:22 AM",
    ticket: true,
  },
  {
    id: "2",
    orderId: "#0123_45678",
    route: "台北(桃園) - 東京成田 12/4 - 12/12 (來回機票)",
    paymentMethod: "現金",
    status: "refunding",
    createdAt: "2023-03-12\n12:24:22 AM",
    ticket: false,
  },
  {
    id: "3",
    orderId: "#0123_45678",
    route: "台北(桃園) - 東京成田 12/4 - 12/12 (來回機票)",
    paymentMethod: "信用卡",
    status: "disabled",
    createdAt: "2023-03-12\n12:24:22 AM",
    ticket: false,
  },
];

const normalize = (v: string): "success" | "disabled" | "refunding" | "refunded" => {
  if (!v) return "success";
  const x = v.toLowerCase().trim();
  if (["success", "paid", "done", "completed"].includes(x)) return "success";
  if (["disabled", "cancel", "cancelled", "canceled", "fail"].includes(x)) return "disabled";
  if (["refunding", "processing", "pending_refund"].includes(x)) return "refunding";
  if (["refunded", "finish_refund", "refund_done"].includes(x)) return "refunded";
  return "success";
};

const statusMap: Record<string, string> = {
  success: "已完成",
  disabled: "已取消",
  refunding: "退款中",
  refunded: "已退款",
};

export default function FlightOrdersPage() {
  const [orders] = useState(mockFlightOrders);

  const columns: Column[] = [
    { key: "id", title: "ID", width: 60, align: "center" },
    { key: "orderId", title: "訂單編號", width: 140 },
    { key: "route", title: "航段", width: 420 },
    { key: "paymentMethod", title: "付款方式", width: 120, align: "center" },
    {
      key: "status",
      title: "狀態",
      width: 120,
      align: "center",
      render: (value?: string) => {
        const normalized = normalize(value ?? "");
        return <StatusBadge variant={normalized} label={statusMap[normalized]} />;
      },
    },
    {
      key: "createdAt",
      title: "成立日期",
      width: 180,
      align: "center",
      render: (value: string) => value.split("\n").map((line, i) => <div key={i}>{line}</div>),
    },
    {
      key: "ticket",
      title: "電子機票",
      width: 140,
      align: "center",
      render: (value: boolean, row) =>
        normalize(row.status) === "success" ? (
          <button className="underline text-[#1f2e3c] hover:text-[#DCBB87] font-medium">
            前往查看
          </button>
        ) : (
          <button
            className="text-xl text-[#1F2E3C] hover:text-red-400 transition-colors"
            title="刪除"
          >
            ✖
          </button>
        ),
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-center justify-end mb-3 text-sm text-[#666]">
        共 {orders.length} 筆訂單
      </div>

      {orders.length > 0 ? (
        <OrderTable columns={columns} data={orders} />
      ) : (
        <EmptyState message="尚無機票訂單" />
      )}
    </div>
  );
}
