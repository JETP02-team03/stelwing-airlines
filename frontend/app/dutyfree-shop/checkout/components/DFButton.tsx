import { ButtonHTMLAttributes, forwardRef } from "react";

export interface DFButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "icon";
  size?: "sm" | "md" | "lg" | "icon";
}

export const DFButton = forwardRef<HTMLButtonElement, DFButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variantStyles = {
      primary: "bg-[#DCBB87] hover:bg-[#d1af79] text-white",
      secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900",
      ghost: "hover:bg-gray-100 text-gray-900",
      icon: "hover:bg-gray-100",
    };

    const sizeStyles = {
      sm: "px-3 py-1.5 rounded",
      md: "px-4 py-2 rounded-lg",
      lg: "px-6 py-3 rounded-lg",
      icon: "h-8 w-8 rounded",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

DFButton.displayName = "DFButton";
