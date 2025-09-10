import React from 'react'
import Product from './Product'
import { useAppSelector } from '@/lib/hooks'
import { selectSubCategory } from '@/lib/features/navigation/navigationSlice'
import SubCategoryProduct from './SubCategoryProduct'

export default function SubCategoryProducts() {
    const subCategory = useAppSelector(selectSubCategory)

    return (
        <div className="mt-[2rem] lg:mt-[2.5rem]">
            {
                subCategory?.products && <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {subCategory?.products.map((product, index) => (
                        <SubCategoryProduct key={index.toString()} product={product} />
                    ))}
                </div>
            }
        </div>
    )
}
