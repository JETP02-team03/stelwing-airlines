import { InputHTMLAttributes, forwardRef } from "react";

export interface DFInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const DFInput = forwardRef<HTMLInputElement, DFInputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full px-4 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#DCBB87]/50 focus:border-[#DCBB87] transition-colors ${className}`}
        {...props}
      />
    );
  }
);

DFInput.displayName = "DFInput";
