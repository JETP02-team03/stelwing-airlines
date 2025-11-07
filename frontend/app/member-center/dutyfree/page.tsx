"use client";

import { useState } from "react";
import OrderTable, { type Column } from "../components/OrderTable";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";

const mockDutyFreeOrders = [
  {
    id: "1",
    orderId: "#0123_45678",
    product: "Chanel N°5系列 典藏香水-50mL",
    paymentMethod: "信用卡",
    status: "success",
    createdAt: "2023-03-12\n12:24:22 AM",
  },
  {
    id: "2",
    orderId: "#0123_45678",
    product: "Chanel N°5系列 典藏香水-50mL",
    paymentMethod: "現金",
    status: "refunding",
    createdAt: "2023-03-12\n12:24:22 AM",
  },
  {
    id: "3",
    orderId: "#0123_45678",
    product: "Chanel N°5系列 典藏香水-50mL",
    paymentMethod: "信用卡",
    status: "disabled",
    createdAt: "2023-03-12\n12:24:22 AM",
  },
  {
    id: "4",
    orderId: "#0123_45678",
    product: "Chanel N°5系列 典藏香水-50mL",
    paymentMethod: "信用卡",
    status: "refunded",
    createdAt: "2023-03-12\n12:24:22 AM",
  },
];

const normalize = (v: string): "success" | "disabled" | "refunding" | "refunded" => {
  if (!v) return "success";
  const x = v.toLowerCase().trim();
  if (["success", "paid", "done", "completed"].includes(x)) return "success";
  if (["disabled", "cancel", "cancelled", "canceled", "fail"].includes(x)) return "disabled";
  if (["refunding", "processing"].includes(x)) return "refunding";
  if (["refunded", "finish_refund", "refund_done"].includes(x)) return "refunded";
  return "success";
};

const statusMap: Record<string, string> = {
  success: "已完成",
  disabled: "已取消",
  refunding: "退款中",
  refunded: "已退款",
};

export default function DutyFreePage() {
  const [orders] = useState(mockDutyFreeOrders);

  const columns: Column[] = [
    { key: "id", title: "ID", width: 60, align: "center" },
    { key: "orderId", title: "訂單編號", width: 140 },
    { key: "product", title: "商品", width: 300 },
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
    { key: "createdAt", title: "成立日期", width: 180, align: "center" },
    {
      key: "delete",
      title: "刪除",
      width: 100,
      align: "center",
      render: () => (
        <button
          className="text-[#1F2E3C] hover:text-red-400 text-xl transition-colors"
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
        <EmptyState message="尚無免稅商品訂單" />
      )}
    </div>
  );
}
