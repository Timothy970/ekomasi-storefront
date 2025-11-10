"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"
import { useAppSelector } from "@/lib/hooks"
import { selectProduct } from "@/lib/features/navigation/navigationSlice"

type ProductQuantityProps = {
  quantity: number
  setQuantity: React.Dispatch<React.SetStateAction<number>>
}

const ProductQuantity: React.FC<ProductQuantityProps> = ({
  quantity,
  setQuantity,
}) => {
  const product = useAppSelector(selectProduct)
  const maxQuantity = product?.stock_quantity ?? 0

  const handleIncrease = async () => {
    const newQty = quantity === 0 ? 1 : Math.min(quantity + 1, maxQuantity);
    setQuantity(newQty);
  };

  const handleDecrease = async () => {
    const newQty = Math.max(quantity - 1, 1);
    setQuantity(newQty);
  };

  return (
    <div className="text-custom-black mt-[0.5rem]">
      <div className="flex items-center w-[120px]">
        <Button
          variant="ghost"
          size="icon"
          className="h-[2rem] border border-[rgba(0,0,0,0.40)] cursor-pointer"
          onClick={handleDecrease}
          disabled={quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>

        <div className="flex-1 text-center text-sm">{quantity}</div>

        <Button
          variant="ghost"
          size="icon"
          className="h-[2rem] border border-[rgba(0,0,0,0.40)] cursor-pointer"
          onClick={handleIncrease}
          disabled={quantity >= maxQuantity}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default ProductQuantity
