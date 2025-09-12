"use client"
import CartSummary from '@/components/CartSummary'
import Navigation from '@/components/Navigation'
import PersonalInformation from '@/components/PersonalInformation'
import { getLocationsAsync } from '@/lib/features/mall/mallSlice'
import { useAppDispatch } from '@/lib/hooks'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function GuestCheckout() {
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    dispatch(getLocationsAsync())
  }, [dispatch, router])

  return (
    <Navigation>
      <div className='w-full px-[1rem] lg:px-[4rem] mx-auto max-w-[90rem]'>
        <div className='w-full flex flex-col md:flex-row-reverse md:gap-x-[2rem] mt-[2] lg:mt-[2.5rem]'>
          <div className='w-full'>
            <CartSummary />
          </div>

          <PersonalInformation />
        </div>
      </div>
    </Navigation>
  )
}
