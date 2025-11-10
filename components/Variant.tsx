"use client"
import React, { useEffect, useRef, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import type { VariantGroup } from "@/lib/features/types"

export default function Variant({ variant }: { variant: VariantGroup }) {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const [checkedValues, setCheckedValues] = useState<string[]>([])
    const paramKey = "open"
    const variantName = variant?.variant_type?.toLowerCase() ?? ""
    const openParam = searchParams.get(paramKey)
    const [hasInteracted, setHasInteracted] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const currentParams = new URLSearchParams(searchParams.toString())
        const variants = currentParams.getAll("variant")
        const values: string[] = []

        variants.forEach(v => {
            const [name, value] = v.split("---")
            if (name === variant.variant_type && value) {
                values.push(value)
            }
        })
        setCheckedValues(values)
    }, [searchParams, variant.variant_type])

    const shouldBeOpen = openParam === variantName || checkedValues.length > 0
    const [isOpen, setIsOpen] = useState(shouldBeOpen)

    useEffect(() => {
        setIsOpen(openParam === variantName || checkedValues.length > 0)
    }, [openParam, variantName, checkedValues.length])

    const toggleDropdown = () => {
        setHasInteracted(true)
        const params = new URLSearchParams(searchParams.toString())
        if (isOpen) {
            params.delete(paramKey)
        } else {
            params.set(paramKey, variantName)
        }
        router.push(`?${params.toString()}`, { scroll: false })
    }

    const handleToggle = (value: string) => {
        const isChecked = checkedValues.includes(value)
        const newValues = isChecked
            ? checkedValues.filter(v => v !== value)
            : [...checkedValues, value]

        setCheckedValues(newValues)

        const updatedParams = new URLSearchParams(searchParams.toString())
        const remainingVariants = updatedParams
            .getAll("variant")
            .filter(v => !v.startsWith(`${variant.variant_type}---`))

        updatedParams.delete("variant")

        remainingVariants.forEach(v => updatedParams.append("variant", v))
        newValues.forEach(v => {
            updatedParams.append("variant", `${variant.variant_type}---${v}`)
        })

        const newQuery = updatedParams.toString()
        const newUrl = `${pathname}${newQuery ? `?${newQuery}` : ""}`
        router.replace(newUrl, { scroll: false })
    }

    const heightStyle = isOpen
        ? {
            height: contentRef.current?.scrollHeight || "auto",
            opacity: 1,
            transition: hasInteracted ? "height 0.4s ease, opacity 0.3s ease" : "none",
        }
        : {
            height: 0,
            opacity: 0,
            transition: "height 0.4s ease, opacity 0.3s ease",
        }

    return (
        <div className="flex flex-col mb-[1rem]">
            <div
                className="bg-[rgba(201,160,255,0.55)] w-full flex justify-between items-center py-[1rem] min-h-[2.5rem] px-[0.5rem] cursor-pointer select-none"
                onClick={toggleDropdown}
            >
                <h2 className="text-custom-black font-bold text-[0.875rem] lg:text-[1rem] leading-[1.6875rem] capitalize">
                    {variant?.variant_type?.replace(/_/g, " ")}
                </h2>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
                >
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </div>

            <div ref={contentRef} className="overflow-hidden" style={heightStyle}>
                <div className="flex flex-col gap-y-[1rem] p-[0.5rem]">
                    {variant?.variants?.map((item, index) => {
                        const isChecked = checkedValues.includes(item.name)
                        return (
                            <div
                                key={index}
                                className="flex justify-start items-center gap-x-[0.5rem]"
                            >
                                <Checkbox
                                    checked={isChecked}
                                    onCheckedChange={() => handleToggle(item.name)}
                                    className="border border-black rounded-none h-[1rem] lg:h-[1.125rem] w-[1rem] lg:w-[1.125rem]"
                                />
                                <span className="text-custom-black font-normal text-[0.875rem] leading-[1.95rem] capitalize">
                                    {item?.name}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
