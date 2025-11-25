import { selectSubCategory } from '@/lib/features/navigation/navigationSlice'
import { useAppSelector } from '@/lib/hooks'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { customParser } from '@/lib/utils'

export default function TopSliderProducts() {
  const subCategory = useAppSelector(selectSubCategory)

  return (
    <div className='w-full h-full max-w-[27rem] overflow-y-scroll pb-[1rem] mt-[1rem]'>
      <div className="flex flex-col gap-y-[1rem]">
        {subCategory?.products.slice(0, 2).map((product, index) => (
          <Link key={index?.toString()} href={`/products/${product?.product_id}`}>
            <div className='h-[8rem] w-full flex gap-x-[1rem] justify-between items-start'>
              <div className="relative h-full w-[40%] flex-none">
                {product.urls?.[0]?.url && (
                  <Image
                    src={product.urls[0].url}
                    alt=""
                    unoptimized
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              <div className="flex flex-col gap-y-[0.5rem] w-[60%] flex-none">
                <h3 className="truncate text-custom-black font-roboto text-[0.875rem] font-semibold leading-6 capitalize">
                  {product.name}
                </h3>

                <div className="to-custom-black font-poppins text-sm leading-[1.3rem] mt-1 line-clamp-2 capitalize">
                  {customParser(product.description)}
                </div>

                <span className='underline text-xs'>Read more</span>

              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
