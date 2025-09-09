import { getVariantsAsync, selectVariants } from '@/lib/features/mall/mallSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import Variant from './Variant'

export default function CategoryFilter() {
    const dispatch = useAppDispatch()
    const variants = useAppSelector(selectVariants)
    const router = useRouter()

    useEffect(() => {
        dispatch(getVariantsAsync())
    }, [router, dispatch])

    return (
        <div className='mt-4 lg:mt-0 w-full h-auto'>
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
