import { getVariantsAsync, selectVariants } from '@/lib/features/mall/mallSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import React, { useEffect } from 'react'
import Variant from './Variant'
import { selectCategory } from '@/lib/features/navigation/navigationSlice'
import { useRouter } from 'next/navigation'

interface CategoryFilterParam {
    setOpenFilterModal: React.Dispatch<React.SetStateAction<boolean>>
    page: string
}

export default function CategoryFilter({ page, setOpenFilterModal }: CategoryFilterParam) {
    const dispatch = useAppDispatch()
    const variants = useAppSelector(selectVariants)
    const router = useRouter()
    const category = useAppSelector(selectCategory)

    useEffect(() => {
        dispatch(getVariantsAsync())
    }, [])

    const handleCategoryClick = (id: string) => {
        if (id) {
            setOpenFilterModal(false)
            router.push(`/subcategory/${id}`)
        }
    }

    return (
        <div className='mt-4 lg:mt-0 w-full h-auto'>
            {
                category?.subcategories && page === "category" && <div className='w-full mb-[1.5rem]'>
                    {
                        category?.subcategories && <>
                            {
                                category?.subcategories.map((cat, index) => {
                                    return <div key={index?.toString()}>
                                        <div onClick={() => handleCategoryClick(cat?.id)} className='w-full text-custom-black font-semibold cursor-pointer text-[0.875rem] mb-2'>
                                            {cat?.name}
                                        </div>
                                    </div>
                                })
                            }
                        </>
                    }
                </div>
            }
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
