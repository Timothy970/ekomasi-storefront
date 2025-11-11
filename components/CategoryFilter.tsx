"use client"
import { getVariantsAsync, selectVariants } from '@/lib/features/mall/mallSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import React, { useEffect, useState, useRef } from 'react'
import Variant from './Variant'
import { getMinMaxPriceRangeAsync, selectCategory, selectMinMaxPriceRange } from '@/lib/features/navigation/navigationSlice'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import PriceRangeSlider from './PriceRangeSlider'
import { Button } from './ui/button'
import { useFilterQuery } from '@/app/ClientLayout'
import { MinMaxData } from '@/lib/features/types'

interface CategoryFilterParam {
    setOpenFilterModal: React.Dispatch<React.SetStateAction<boolean>>
    page: string
}

export default function CategoryFilter({ page, setOpenFilterModal }: CategoryFilterParam) {
    const dispatch = useAppDispatch()
    const variants = useAppSelector(selectVariants)
    const router = useRouter()
    const category = useAppSelector(selectCategory)
    const searchParams = useSearchParams()
    const { setQuery } = useFilterQuery()
    const pathname = usePathname()
    const minMaxPriceRange = useAppSelector<MinMaxData | null>(selectMinMaxPriceRange)
    const [minMax, setMinMax] = useState<[number, number]>([0, 20000])
    const [priceRange, setPriceRange] = useState<[number, number]>([
        Number(searchParams.get("minPrice")) || 0,
        Number(searchParams.get("maxPrice")) || 20000,
    ])
    const debounceRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        dispatch(getVariantsAsync())
        dispatch(getMinMaxPriceRangeAsync())
    }, [])

    useEffect(() => {
        if (minMaxPriceRange) {
            setMinMax([
                minMaxPriceRange?.cheapest_product?.price ?? 0,
                minMaxPriceRange?.expensive_product?.price ?? 20000,
            ])
        }
    }, [minMaxPriceRange])

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

    const handleCategoryClick = (id: string) => {
        if (id) {
            setOpenFilterModal(false)
            router.push(`/subcategory/${id}`)
        }
    }

    const handleClearAll = () => {
        window.location.href = window.location.pathname
    }

    return (
        <div className="mt-4 lg:mt-0 w-full h-auto">
            {category?.subcategories && page === "category" && (
                <div className="w-full mb-[1.5rem] flex flex-col gap-y-[1rem]">
                    {category?.subcategories.map((cat, index) => (
                        <div key={index.toString()}>
                            <div
                                onClick={() => handleCategoryClick(cat?.id)}
                                className="w-full text-custom-black cursor-pointer text-[0.875rem] lg:text-[1rem] mb-2"
                            >
                                {cat?.name}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {
                minMaxPriceRange && <div className="flex flex-col items-center justify-center">
                    <PriceRangeSlider
                        min={minMax[0] ?? 0}
                        max={minMax[1] ?? 20000}
                        step={50}
                        defaultValues={priceRange}
                        onChange={handlePriceChange}
                    />
                </div>
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
