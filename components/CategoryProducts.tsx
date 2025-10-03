import React from 'react'
import type { Product } from '@/lib/features/types'
import CategoryProductCard from './CategoryProductCard'

export default function CategoryProducts({ products }: { products: Product[] }) {
    return (
        <div className="mt-[2rem] lg:mt-[2.5rem]">
            {
                products && <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
                    {products.map((product, index) => (
                        <CategoryProductCard key={index?.toString()} product={product} />
                    ))}
                </div>
            }
        </div>
    )
}
