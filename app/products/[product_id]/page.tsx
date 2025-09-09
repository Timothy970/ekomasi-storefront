import Navigation from '@/components/Navigation'
import ProductBreadCrumb from '@/components/ProductBreadCrumb'
import ProductColors from '@/components/ProductColors'
import ProductQuantitySelect from '@/components/ProductQuantitySelect'
import ProductStars from '@/components/ProductStars'
import { Button } from '@/components/ui/button'
import React from 'react'
import NowTrending from "@/components/NowTrending";
import ProductImages from '@/components/ProductImages'

export default function ProductDetail() {
  return (
    <Navigation>
      <div className='max-w-[90rem] mx-auto w-full pt-[2rem] lg:pt-[2.5rem] bg-white'>
        <ProductBreadCrumb />

        <div className='mt-[1.5rem] px-[1rem] lg:px-[4rem]'>
          <div className='w-full flex flex-col lg:flex-row items-stretch'>
            <div className='w-full h-full flex-1'>
              <ProductImages />
            </div>

            <div className='w-full bg-white flex flex-col justify-start px-[1rem] pb-[1rem] flex-1'>
              <h2 className='text-lg lg:text-[2.25rem] font-bold mt-[1rem]'>Jogger Stroller - XCEL-R8</h2>

              <span className='mt-[0.5rem] text-[1.5rem]'>$55</span>

              <div className='flex items-center justify-start gap-x-[0.3rem] mt-[1rem]'>
                <ProductStars />
                <span>3.5 stars</span>
                <span className='bg-black rounded-full h-[0.5rem] w-[0.5rem]'></span>
              </div>

              <p className='text-base mt-[1rem]'>Get around in comfortable style with the Baby Trend XCEL R8 Jogging Stroller. Designed with safety features and ease-of-use functions, the stroller provides a smooth ride for you and your little one, no matter where the destination. The all-terrain jogger allows for hassle-free travel due to its lightweight frame and easy trigger fold.</p>

              <div className='flex items-center gap-x-[0.5rem] mt-[1rem]'>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                  <circle cx="6.5" cy="7" r="6.5" fill="#34C759" />
                </svg>
                <span>In Stock</span>
              </div>

              <div className='flex items-center mt-[1rem]'>
                <span className='mr-2 font-semibold'>Brand:</span>
                <span className='font-bold underline'>Tommee Tipee</span>
              </div>

              <div className='mt-[1rem]'>
                <h3 className='text-base gap-y-[0.5rem]'>Color</h3>
                <ProductColors />
              </div>

              <div className='mt-[1rem]'>
                <h3 className='text-base'>Quantity</h3>
                <ProductQuantitySelect />
              </div>

              <Button className='w-full bg-[#AF52DE] mt-[1.5rem] h-[2.5rem] lg:h-[3rem]'>Add to cart</Button>

              <Button className='w-full bg-white border border-black text-black mt-[1rem] h-[2.5rem] lg:h-[3rem]'>Buy Now</Button>
            </div>

          </div>
        </div>

        <NowTrending title="You may also like" />
      </div>
      
    </Navigation>
  )
}
