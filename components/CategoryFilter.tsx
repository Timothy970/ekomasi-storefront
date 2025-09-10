import { getVariantsAsync, selectVariants } from '@/lib/features/mall/mallSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import Variant from './Variant'
import { selectCategory } from '@/lib/features/navigation/navigationSlice'
import Link from 'next/link'

export default function CategoryFilter() {
    const dispatch = useAppDispatch()
    const variants = useAppSelector(selectVariants)
    const router = useRouter()
    const category = useAppSelector(selectCategory)

    useEffect(() => {
        dispatch(getVariantsAsync())
    }, [])

    return (
        <div className='mt-4 lg:mt-0 w-full h-auto'>
            <div className='w-full mb-[1.5rem]'>
                {
                    category?.subcategories && <>
                        {
                            category?.subcategories.map((cat, index) => {
                                return <div key={index?.toString()}>
                                    <Link href={`/subcategory/${cat?.id}`} className='w-full font-bold text-base'>
                                        {cat?.name}
                                    </Link>
                                </div>
                            })
                        }
                    </>
                }
            </div>

            <div>
                {
                    variants?.map((variant, index) => {
                        return <Variant key={index?.toString()} variant={variant} />
                    })
                }
            </div>
        </div>
    )
}
