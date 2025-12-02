"use client"
import Accordion from '@/components/Accordion'
import DashboardLayout from '@/components/AppLayout/DashboardLayout'
import Navigation from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function GiftCards() {
  const [vouchers, setVouchers] = useState([])
  const router = useRouter();

  return (
    <Navigation>
      <DashboardLayout>
        <div className="space-y-4">
          <div className='bg-[#804A9D14] w-full p-[1rem] md:p-[2rem]'>
            <div className='flex flex-col items-start justify-center gap-y-[1rem] gap-x-[1rem]'>
              {
                vouchers?.length <= 0 && <div className='flex flex-col gap-y-[0.5rem]'>
                  <p className='text-[1.125rem] font-bold'>
                    YOU HAVE NO VOUCHERS YET
                  </p>

                  <p className='text-[0.875rem]'>
                    You currently have no vouchers linked to your account. Get started by redeeming or buying one now.
                  </p>
                </div>
              }

              <div className='w-full mt-[1rem] md:mt-[2rem] flex gap-x-[1.5rem]'>
                <Button onClick={() => router?.push("/dashboard/giftcards/buy")} className='text-base text-white bg-[#AF52DE]'>
                  Buy Gift Card
                </Button>

                <Button onClick={() => router?.push("/dashboard/giftcards/redeem")} className='text-base border text-black border-black bg-[#804A9D14]'>
                  Redeem Gift Card
                </Button>
              </div>
            </div>
          </div>

          <div className='bg-[#804A9D14] flex flex-col gap-y-[1rem] w-full p-[1rem] md:p-[2rem]'>
            <p className='text-[1.125rem] font-bold'>
              NEED HELP WITH THESE OPTIONS?
            </p>

            <div className='border-t border-black'>
              <Accordion title="🎁 What is a gift card?">
                A gift card is a prepaid card that contains a set amount of money and can be used as a payment method at specific stores, websites, or brands.
              </Accordion>
              <Accordion title="💌 What is a gift voucher?">
                A gift voucher is a prepaid certificate or code that lets someone purchase products or services up to a certain value at a specific store, brand, or platform.
              </Accordion>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </Navigation>
  )
}
