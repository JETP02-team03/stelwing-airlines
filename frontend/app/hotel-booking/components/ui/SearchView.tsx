'use client';

import { useState } from 'react';

interface SearchViewProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export default function SearchView({
  placeholder = '搜尋...',
  value = '',
  onChange,
  className = '',
}: SearchViewProps) {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <img src="/icons/hotel/search.svg" alt="search" className="w-5 h-5" />
      </div>

      <input
        type="search"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:#dcba83 focus:border-transparent"
      />
    </div>
  );
}
