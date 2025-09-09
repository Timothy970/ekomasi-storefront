import { VariantGroup } from '@/lib/features/types'
import React from 'react'
import { Checkbox } from "@/components/ui/checkbox"

export default function Variant({ variant }: { variant: VariantGroup }) {
    return (
        <div className='flex flex-col gap-y-[1rem] mb-[1rem]'>
            <div className='bg-[rgba(201,160,255,0.55)] w-full flex justify-between items-center h-[4rem] px-[0.5rem]'>
                <h2 className='text-black font-semibold text-lg leading-[1.6875rem]'>{variant?.variant_type}</h2>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-down-icon lucide-chevron-down"
                >
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </div>
            <div>
                {
                    variant?.variants?.map((item, index) => {
                        return <div key={index?.toString()}>
                            <div className='flex justify-start items-center gap-x-[0.5rem]'>
                                <Checkbox className='border border-black h-[1rem] lg:h-[1.125rem] w-[1rem] lg:w-[1.125rem]' />
                                <span className='text-black font-normal text-base leading-[1.95rem]'>
                                    {item?.name}
                                </span>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
