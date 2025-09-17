"use client"
import CheckoutCartSummary from '@/components/CheckoutCartSummary'
import Navigation from '@/components/Navigation'
import PersonalInformation from '@/components/PersonalInformation'
import React from 'react'

export default function GuestCheckout() {

  return (
    <Navigation>
      <div className='w-full px-[1rem] lg:px-[3rem] mx-auto max-w-[90rem]'>
        <div className='w-full flex flex-col md:flex-row-reverse md:gap-x-[2rem] mt-[2] lg:mt-[2.5rem]'>
          <div className='w-full'>
            <CheckoutCartSummary />
          </div>

          <PersonalInformation page='guest' />
        </div>
      </div>
    </Navigation>
  )
}
