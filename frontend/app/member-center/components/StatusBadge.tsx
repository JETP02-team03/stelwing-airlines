"use client"

import { useState } from "react"

type StatusBadgeVariant = "success" | "danger" | "disabled" | "refund"

interface StatusBadgeProps {
  variant: StatusBadgeVariant;
  label: string;
  tooltip?: string;
}

export default function StatusBadge({ variant, label, tooltip }: StatusBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "status-badge--success border border-[#28A745] text-[#28A745] bg-white"
      case "danger":
        return "status-badge--danger border border-[#F60621] text-[#F60621] bg-white"
      case "refund":
        return "status-badge--refund border border-[#F60621] text-[#F60621] bg-white"
      case "disabled":
        return "status-badge--disabled border border-[#C5C8C8] text-[#C5C8C8] bg-white"
      default:
        return ""
    }
  };

  return (
    <div className="relative inline-block">
      <span
        className={`
          inline-block px-3 py-1 rounded-md text-[12px]
          transition-all duration-200
          ${getVariantStyles()}
        `}
        onMouseEnter={() => tooltip && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {label}
      </span>
      {tooltip && showTooltip && (
        <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-[#1F2E3C] text-white text-xs rounded whitespace-pre-line">
          {tooltip}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#1F2E3C]"></div>
        </div>
      )}
    </div>
  );
}
