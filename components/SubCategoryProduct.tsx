import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { SubCategoryProduct } from '@/lib/features/types'
import { customParser, getProductImageUrl } from '@/lib/utils'
import NoImage from './NoImage'

export default function SubCategoryProduct({ product }: Readonly<{ product: SubCategoryProduct }>) {
    const imageUrl = getProductImageUrl(product.urls);

    return (
        <Link href={`/products/${product.product_id}`} className="block bg-white overflow-hidden cursor-pointer">
            <div className="relative w-full h-[13.5rem] sm:h-[20rem] md:h-[20rem]">
                {
                    product.urls?.[0]?.url ? (<Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        unoptimized
                        className="object-cover"
                    />
                    ) : (<NoImage />)
                }

            </div>

            <div className="pt-4">
                <h3 className="truncate text-custom-black font-roboto text-[0.875rem] font-semibold leading-6">
                    {product.name}
                </h3>
                <div className="text-gray-600 font-poppins text-sm leading-[1.3rem] mt-1 line-clamp-2">
                    {customParser(product.description)}
                </div>
                <p className="mt-2 text-sm font-bold text-custom-black">{product.price}</p>
            </div>
        </Link>
    )
}
