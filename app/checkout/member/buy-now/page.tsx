"use client"
import CheckoutCartSummary from '@/components/CheckoutCartSummary'
import Navigation from '@/components/Navigation'
import PersonalInformation from '@/components/PersonalInformation'
import { selectBuyNowCart } from '@/lib/features/cart/cartSlice'
import { useAppSelector } from '@/lib/hooks'
import React from 'react'

export default function buynow() {
  const buyNowCart = useAppSelector(selectBuyNowCart)

  if (!buyNowCart) {
    return <></>
  }

  return (
    <Navigation>
      <div className='w-full px-[1rem] lg:px-[3rem] mx-auto max-w-[90rem]'>
        <div className='w-full flex flex-col md:flex-row-reverse md:gap-x-[2rem] mt-[2] lg:mt-[2.5rem]'>
          <div className='w-full'>
            <CheckoutCartSummary cart={buyNowCart} />
          </div>

          {
            buyNowCart && <PersonalInformation cart={buyNowCart} page="member" isBuyNow={true} />
          }
        </div>
      </div>
    </Navigation>
  )
}
