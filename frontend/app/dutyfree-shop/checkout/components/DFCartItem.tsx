import { Minus, Plus, X } from "lucide-react";
import { DFButton } from "./DFButton";

interface DFCartItemProps {
  id: number;
  image: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  onQuantityChange: (id: number, newQuantity: number) => void;
  onRemove: (id: number) => void;
}

export function DFCartItem({
  id,
  image,
  name,
  description,
  quantity,
  price,
  onQuantityChange,
  onRemove,
}: DFCartItemProps) {
  const subtotal = quantity * price;

  return (
    <div className="flex items-center gap-6 py-4 border-b border-gray-200">
      <img
        src={image}
        alt={name}
        className="w-[70px] h-[70px] object-cover rounded"
      />
      
      <div className="flex-1 flex items-center justify-between">
        <div className="min-w-[200px]">
          <h3 className="text-[#333333]">{name}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>

        <div className="flex items-center gap-12">
          <div className="flex items-center gap-2">
            <DFButton
              variant="secondary"
              size="icon"
              onClick={() => onQuantityChange(id, Math.max(1, quantity - 1))}
            >
              <Minus className="h-4 w-4" />
            </DFButton>
            <span className="w-12 text-center">{quantity}</span>
            <DFButton
              variant="primary"
              size="icon"
              onClick={() => onQuantityChange(id, quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </DFButton>
          </div>

          <div className="min-w-[100px] text-right">
            ${subtotal.toLocaleString()}
          </div>

          <DFButton
            variant="icon"
            size="icon"
            onClick={() => onRemove(id)}
          >
            <X className="h-4 w-4 text-gray-400" />
          </DFButton>
        </div>
      </div>
    </div>
  );
}
