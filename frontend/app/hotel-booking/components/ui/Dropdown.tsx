'use client';

import { useState } from 'react';

interface DropdownProps {
  options: string[];
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export default function Dropdown({
  options,
  value,
  placeholder = '請選擇',
  onChange,
  className = '',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <span>{value || placeholder}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-auto">
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => {
                onChange?.(opt);
                setIsOpen(false);
              }}
              className={`px-4 py-2 hover:bg-gray-50 cursor-pointer ${
                value === opt ? 'bg-gray-200' : ''
              }`}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
