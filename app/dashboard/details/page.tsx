"use client"
import DashboardLayout from '@/components/AppLayout/DashboardLayout'
import Navigation from '@/components/Navigation'
import UpdateUserForm from '@/components/UpdatUserForm'
import { selectUserProfile } from '@/lib/features/user/userSlice'
import { useAppSelector } from '@/lib/hooks'
import React from 'react'

export default function MyDetails() {
  const profile = useAppSelector(selectUserProfile)

  return (
    <Navigation>
      <DashboardLayout>
        <div className="space-y-4">
          <div className='bg-[#804A9D14] w-full p-[1rem] md:p-[2rem]'>
            <div className='flex flex-row gap-y-[1rem] gap-x-[1rem]'>
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="40" viewBox="0 0 36 40" fill="none">
                <path
                  d="M34 38V34C34 31.8783 33.1571 29.8434 31.6569 28.3431C30.1566 26.8429 28.1217 26 26 26H10C7.87827 26 5.84344 26.8429 4.34315 28.3431C2.84285 29.8434 2 31.8783 2 34V38M26 10C26 14.4183 22.4183 18 18 18C13.5817 18 10 14.4183 10 10C10 5.58172 13.5817 2 18 2C22.4183 2 26 5.58172 26 10Z"
                  stroke="#1E1E1E"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <p className='text-[1.5rem] font-bold'>My Details</p>
            </div>
          </div>

          <UpdateUserForm />
        </div>
      </DashboardLayout>
    </Navigation>)
}
