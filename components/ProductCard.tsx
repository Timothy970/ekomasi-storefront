import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import type { Product } from '@/lib/features/types'
import { useRouter } from 'next/navigation'

export default function ProductCard({ product }: { product: Product }) {
    const router = useRouter()
    const [productId, setProductId] = useState<string | null>(null);

    useEffect(() => {
        if (product?.id) {
            setProductId(product?.id)
        } else if (product?.product_id) {
            setProductId(product?.product_id)
        } else {
            setProductId(null)
        }

    }, [product?.id, product?.product_id])

    if (!productId) {
        return <></>
    }

    return (
        <div className="bg-white overflow-hidden cursor-pointer" onClick={() => router.push(`/products/${productId}`)}>
            <div className="relative w-full h-[13.5rem] md:h-[20rem]">
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
                <h3 className="truncate text-custom-black font-roboto text-[0.875rem] font-semibold leading-6 capitalize">
                    {product.name}
                </h3>
                <p className="text-gray-600 font-poppins text-sm leading-[1.3rem] mt-1 line-clamp-2 capitalize">
                    {product.description}
                </p>
                <p className="mt-2 text-sm font-bold text-custom-black">KES {product.price}</p>
            </div>
        </div>
    )
}
