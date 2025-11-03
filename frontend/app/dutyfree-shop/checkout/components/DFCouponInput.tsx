import { useState } from "react";
import { DFInput } from "./DFInput";
import { DFButton } from "./DFButton";

interface DFCouponInputProps {
  onApplyCoupon: (code: string) => void;
}

export function DFCouponInput({ onApplyCoupon }: DFCouponInputProps) {
  const [couponCode, setCouponCode] = useState("");

  const handleApply = () => {
    if (couponCode.trim()) {
      onApplyCoupon(couponCode);
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="mb-4 text-[#333333]">使用折扣碼</h3>
      <div className="mb-4">
        <p className="text-sm text-gray-500">請輸入折扣碼</p>
      </div>
      <div className="flex gap-2">
        <DFInput
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <DFButton
          onClick={handleApply}
          variant="primary"
          size="md"
          className="px-6"
        >
          Apply
        </DFButton>
      </div>
    </div>
  );
}
