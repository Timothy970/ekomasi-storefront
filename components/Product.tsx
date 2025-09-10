import React from 'react'
import Image from 'next/image'
import type { Product } from '@/lib/features/types'
import { useRouter } from 'next/navigation'

export default function Product({ product }: { product: Product }) {
    const router = useRouter()

    return (
        <div className="bg-white overflow-hidden cursor-pointer" onClick={() => router.push(`/products/${product.id}`)}>
            <div className="relative w-full h-[13.5rem] sm:h-[20rem] md:h-[20rem]">
                {product.urls && <>
                    {
                        product.urls[0]?.url && <Image
                            src={product.urls[0]?.url}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                    }
                </>
                }
            </div>

            <div className="pt-4">
                <h3 className="truncate text-black font-roboto text-base font-semibold leading-6">
                    {product.name}
                </h3>
                <p className="text-gray-600 font-poppins text-sm leading-[1.4rem] mt-1 line-clamp-2">
                    {product.description}
                </p>
                <p className="mt-2 text-sm font-bold text-black">{product.price}</p>
            </div>
        </div>
    )
}
