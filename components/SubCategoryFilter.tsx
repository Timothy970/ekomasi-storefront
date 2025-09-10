import { getVariantsAsync, selectVariants } from '@/lib/features/mall/mallSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import React, { useEffect } from 'react'
import Variant from './Variant'

export default function SubCategoryFilter() {
    const dispatch = useAppDispatch()
    const variants = useAppSelector(selectVariants)

    useEffect(() => {
        dispatch(getVariantsAsync())
    }, [])

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
