"use client"
import { getVariantsAsync, selectVariants } from '@/lib/features/mall/mallSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import React, { useEffect, useState, useRef } from 'react'
import Variant from './Variant'
import { getMinMaxPriceRangeAsync, selectMinMaxPriceRange } from '@/lib/features/navigation/navigationSlice'
import { usePathname, useRouter } from 'next/navigation'
import PriceRangeSlider from './PriceRangeSlider'
import { Button } from './ui/button'
import { useFilterQuery } from '@/app/ClientLayout'

interface CategoryFilterParam {
    setOpenFilterModal: React.Dispatch<React.SetStateAction<boolean>>
    page?: string
}

export default function CategoryFilter({ page, setOpenFilterModal }: CategoryFilterParam) {
    const dispatch = useAppDispatch()
    const variants = useAppSelector(selectVariants)
    const router = useRouter()
    const { setQuery } = useFilterQuery()
    const pathname = usePathname()
    const minMaxPriceRange = useAppSelector(selectMinMaxPriceRange)
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(0)
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 0])
    const [defaultPriceRange, setDefaultPriceRange] = useState<[number, number]>([0, 0])
    const debounceRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        dispatch(getVariantsAsync())
        dispatch(getMinMaxPriceRangeAsync())
    }, [])

    useEffect(() => {
        if (minMaxPriceRange) {
            const newMin = minMaxPriceRange?.cheapest_product?.price ?? 0;
            const newMax = minMaxPriceRange?.expensive_product?.price ?? 0;
            setMin(newMin);
            setMax(newMax);
            setPriceRange([newMin, newMax]);
            setDefaultPriceRange([newMin, newMax]);
        }
    }, [minMaxPriceRange]);


    const updateQueryParams = (values: [number, number]) => {
        if (debounceRef.current) clearTimeout(debounceRef.current)

        debounceRef.current = setTimeout(() => {
            const params = new URLSearchParams(window.location.search)

            params.set("minPrice", values[0].toString())
            params.set("maxPrice", values[1].toString())

            const newQuery = "?" + params.toString()
            setQuery(newQuery)

            const newUrl = `${pathname}${newQuery}`
            router.replace(newUrl, { scroll: false })
        }, 400)
    }

    const handlePriceChange = (values: [number, number]) => {
        setPriceRange(values)
        updateQueryParams(values)
    }

    const handleClearAll = () => {
        window.location.href = window.location.pathname
    }

    return (
        <div className="mt-4 lg:mt-0 w-full h-auto">
            {
                max > 1 && (
                    <div className="flex flex-col items-center justify-center">
                        <PriceRangeSlider
                            min={min}
                            max={max}
                            step={50}
                            defaultValues={priceRange}
                            notChangingValues={defaultPriceRange}
                            onChange={handlePriceChange}
                        />
                    </div>
                )
            }

            <div className="flex flex-col gap-y-[1.5rem]">
                {variants?.map((variant, index) => (
                    <Variant key={index.toString()} variant={variant} />
                ))}
            </div>

            <div className="flex w-full items-center justify-between">
                <Button
                    onClick={handleClearAll}
                    className="w-[9rem] lg:hidden md:w-[6rem] h-[2.5rem] border border-black bg-white hover:bg-white text-black text-[0.875rem]"
                >
                    Clear All
                </Button>

                <Button
                    onClick={() => setOpenFilterModal(false)}
                    className="bg-[#E82989] lg:hidden h-[2.5rem] hover:bg-[#E82989] w-[9rem] md:w-[6rem] text-[0.875rem]"
                >
                    Close
                </Button>
            </div>
        </div>
    )
}
