"use client"
import React, { forwardRef } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useAppSelector } from "@/lib/hooks"
import { selectProduct } from "@/lib/features/navigation/navigationSlice"
import clsx from "clsx"

type ProductQuantitySelectProps = {
    quantity: number
    setQuantity: React.Dispatch<React.SetStateAction<number>>
    hasError?: boolean,
    setHasError: React.Dispatch<React.SetStateAction<boolean>>,
}

const ProductQuantitySelect = forwardRef<HTMLButtonElement, ProductQuantitySelectProps>(
    ({ quantity, setQuantity, hasError, setHasError }, ref) => {
        const product = useAppSelector(selectProduct)

        const handleValueChange = (val: string) => {
            setHasError(false)
            setQuantity(Number(val))
        }

        return (
            <div className="text-custom-black mt-[0.5rem]">
                <Select
                    value={String(quantity)}
                    onValueChange={(val) => handleValueChange(val)}
                >
                    <SelectTrigger
                        ref={ref}
                        className={clsx(
                            "w-[90px] border",
                            hasError
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-black"
                        )}
                    >
                        <SelectValue placeholder="1" />
                    </SelectTrigger>
                    <SelectContent className="w-[50px]">
                        {Array.from(
                            { length: product?.stock_quantity ?? 0 },
                            (_, i) => i + 1
                        ).map((num) => (
                            <SelectItem key={num} value={String(num)}>
                                {num}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {hasError && (
                    <p className="text-red-500 text-xs mt-1">
                        Please select a quantity
                    </p>
                )}
            </div>
        )
    }
)

ProductQuantitySelect.displayName = "ProductQuantitySelect"
export default ProductQuantitySelect
