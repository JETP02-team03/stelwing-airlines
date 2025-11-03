import { DFButton } from "./DFButton";

interface DFOrderSummaryProps {
  subtotal: number;
  total: number;
  onCheckout: () => void;
}

export function DFOrderSummary({ subtotal, total, onCheckout }: DFOrderSummaryProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center py-2">
        <span className="text-gray-600">小計</span>
        <span className="text-gray-800">${subtotal.toLocaleString()}</span>
      </div>
      
      <div className="flex justify-between items-center py-2 border-t border-gray-200 pt-4">
        <span className="text-[#333333]">總金額</span>
        <span className="text-xl text-[#333333]">${total.toLocaleString()}</span>
      </div>

      <DFButton
        onClick={onCheckout}
        variant="primary"
        size="lg"
        className="w-full py-6"
      >
        結帳
      </DFButton>
    </div>
  );
}
