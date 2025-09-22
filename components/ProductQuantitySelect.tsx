"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"
import { useAppSelector } from "@/lib/hooks"
import { selectProduct } from "@/lib/features/navigation/navigationSlice"

type ProductQuantitySelectProps = {
  quantity: number
  setQuantity: React.Dispatch<React.SetStateAction<number>>
}

const ProductQuantitySelect: React.FC<ProductQuantitySelectProps> = ({
  quantity,
  setQuantity,
}) => {
  const product = useAppSelector(selectProduct)
  const maxQuantity = product?.stock_quantity ?? 0

  const handleIncrease = () => {
    setQuantity((prev) => Math.min(prev + 1, maxQuantity))
  }

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(prev - 1, 1))
  }

  return (
    <div className="text-custom-black mt-[0.5rem]">
      <div className="flex items-center w-[120px]">
        <Button
          variant="ghost"
          size="icon"
          className="h-[3rem] border border-[rgba(0,0,0,0.40)]"
          onClick={handleDecrease}
          disabled={quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>

        <div className="flex-1 text-center text-sm">{quantity}</div>

        <Button
          variant="ghost"
          size="icon"
          className="h-[3rem] border border-[rgba(0,0,0,0.40)]"
          onClick={handleIncrease}
          disabled={quantity >= maxQuantity}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default ProductQuantitySelect
