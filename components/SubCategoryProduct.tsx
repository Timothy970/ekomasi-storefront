import React from 'react'
import Image from 'next/image'
import type { SubCategoryProduct } from '@/lib/features/types'
import { useRouter } from 'next/navigation'

export default function SubCategoryProduct({ product }: { product: SubCategoryProduct }) {
    const router = useRouter()

    return (
        <div className="bg-white overflow-hidden cursor-pointer" onClick={() => router.push(`/products/${product.product_id}`)}>
            <div className="relative w-full h-[13.5rem] sm:h-[20rem] md:h-[20rem]">
                {
                    product.urls[0]?.url && <Image
                        src={product.urls[0]?.url}
                        alt={product.name}
                        fill
                        unoptimized
                        className="object-cover"
                    />
                }

            </div>

            <div className="pt-4">
                <h3 className="truncate text-custom-black font-roboto text-[0.875rem] font-semibold leading-6">
                    {product.name}
                </h3>
                <p className="text-gray-600 font-poppins text-sm leading-[1.3rem] mt-1 line-clamp-2">
                    {product.description}
                </p>
                <p className="mt-2 text-sm font-bold text-custom-black">{product.price}</p>
            </div>
        </div>
    )
}
