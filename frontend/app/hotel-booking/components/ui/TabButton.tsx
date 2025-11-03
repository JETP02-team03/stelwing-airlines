'use client';

interface TabButtonProps {
  text: string;
  selected?: boolean;
  onClick?: () => void;
}

const TabButton = ({ text, selected = false, onClick }: TabButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-7 py-2 rounded-full font-bold transition-all duration-200
        ${
          selected
            ? 'bg-[#DCBB87] text-white shadow-md'
            : 'bg-transparent text-white border border-[#dcba83] hover:bg-[#dcba83]/10'
        }
      `}
    >
      {text}
    </button>
  );
};

export default TabButton;
