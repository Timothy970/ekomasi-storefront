"use client"

import { VariantGroup } from '@/lib/features/types'
import React, { useEffect, useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { useFilterQuery } from '@/app/ClientLayout'
import { usePathname, useRouter } from 'next/navigation'

export default function Variant({ variant }: { variant: VariantGroup }) {
    const { query, setQuery } = useFilterQuery()
    const [checkedValues, setCheckedValues] = useState<string[]>([])
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        const searchParams = new URLSearchParams(query.startsWith("?") ? query.slice(1) : query)

        const values: string[] = []
        const names = searchParams.getAll("variant_name")
        const vals = searchParams.getAll("variant_value")

        names.forEach((name, idx) => {
            if (name === variant.variant_type) {
                const splitValues = vals[idx].split("---")
                values.push(...splitValues)
            }
        })

        setCheckedValues(values)
    }, [query, variant.variant_type])

    const handleToggle = (value: string) => {
        const isChecked = checkedValues.includes(value)
        let newValues = [...checkedValues]

        if (isChecked) {
            newValues = newValues.filter(v => v !== value)
        } else {
            newValues.push(value)
        }

        setCheckedValues(newValues)

        const searchParams = new URLSearchParams(query.startsWith("?") ? query.slice(1) : query)

        const names = searchParams.getAll("variant_name")
        const vals = searchParams.getAll("variant_value")

        searchParams.delete("variant_name")
        searchParams.delete("variant_value")

        names.forEach((name, idx) => {
            if (name !== variant.variant_type) {
                searchParams.append("variant_name", name)
                searchParams.append("variant_value", vals[idx])
            }
        })

        if (newValues.length > 0) {
            searchParams.append("variant_name", variant.variant_type)
            searchParams.append("variant_value", newValues.join("---"))
        }

        const newQuery = "?" + searchParams.toString()
        setQuery(newQuery)

        const newUrl = `${pathname}${newQuery}`
        router.replace(newUrl, { scroll: false })
    }

    return (
        <div className='flex flex-col gap-y-[1rem] mb-[1rem]'>
            <div className='bg-[rgba(201,160,255,0.55)] w-full flex justify-between items-center py-[1rem] min-h-[3rem] px-[0.5rem]'>
                <h2 className='text-custom-black font-bold text-[0.875rem] lg:text-[1.125rem] leading-[1.6875rem] capitalize'>
                    {variant?.variant_type}
                </h2>
                
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </div>
            <div>
                {variant?.variants?.map((item, index) => {
                    const isChecked = checkedValues.includes(item.name)
                    return (
                        <div key={index} className='flex justify-start items-center gap-x-[0.5rem]'>
                            <Checkbox
                                checked={isChecked}
                                onCheckedChange={() => handleToggle(item.name)}
                                className='border border-black rounded-none h-[1rem] lg:h-[1.125rem] w-[1rem] lg:w-[1.125rem]'
                            />
                            <span className='text-custom-black font-normal text-[0.875rem] leading-[1.95rem] capitalize'>
                                {item?.name}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
