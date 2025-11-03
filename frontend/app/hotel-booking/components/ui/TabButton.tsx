'use client';
interface TabButtonProps {
  text: string;
  selected?: boolean;
  onClick?: () => void;
}

const TabButton = ({ text, selected = false, onClick }: TabButtonProps) => {
  return (
    <button
      className={`px-7 py-2 rounded-full font-bold ${
        selected
          ? 'bg-[#dcbb87] text-white'
          : 'bg-transparent text-white border-2 border-[#dcba83]'
      } transition-colors duration-200`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default TabButton;
