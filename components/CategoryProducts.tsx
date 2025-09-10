import React from 'react'
import Product from './Product'
import { useAppSelector } from '@/lib/hooks'
import { selectCategory } from '@/lib/features/navigation/navigationSlice'

export default function CategoryProducts() {
    const category = useAppSelector(selectCategory)

    return (
        <div className="mt-[2rem] lg:mt-[2.5rem]">
            {
                category?.products && <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {category?.products.map((product) => (
                        <Product key={product.id} product={product} />
                    ))}
                </div>
            }
        </div>
    )
}
