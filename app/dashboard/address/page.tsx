"use client"
import { useIsEditingAdress } from '@/app/ClientLayout'
import AddNewAdress from '@/components/AddNewAdress'
import DashboardLayout from '@/components/AppLayout/DashboardLayout'
import EditAdress from '@/components/EditAdress'
import Navigation from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import { deleteUserAddressAsync, getUserAddressAsync, selectAddress } from '@/lib/features/address/addressSlice'
import { MyAddress } from '@/lib/features/types'
import { selectUserProfile, selectUserToken } from '@/lib/features/user/userSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { ArrowUpRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Address() {
  const [editAdress, setEditAdress] = useState(false)
  const [editAdressDetails, setEditAdressDetails] = useState<MyAddress | null>(null)
  const [addNewAdress, setAddNewAdress] = useState(false)
  const address = useAppSelector(selectAddress)
  const profile = useAppSelector(selectUserProfile)
  const token = useAppSelector(selectUserToken)
  const dispatch = useAppDispatch()
  const { isEditingAddress, setIsEditingAddress } = useIsEditingAdress()
  const router = useRouter()

  useEffect(() => {
    if (token) {
      dispatch(getUserAddressAsync())
    }
  }, [token])

  const refetchAddress = () => {
    dispatch(getUserAddressAsync())
  }

  const handleDeleteAddress = (addressId: string) => {
    if (addressId) {
      dispatch(deleteUserAddressAsync({ refetchAddress, address_id: addressId }))
    }
  }

  return (
    <Navigation>
      <DashboardLayout>
        <div className="space-y-4">
          <div className='bg-[#804A9D14] w-full p-[1rem] md:p-[2rem] flex flex-row justify-between'>
            <div className='w-full flex flex-col '>
              <div className='flex flex-col gap-y-[1rem] gap-x-[1rem]'>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M1.99994 22.0004H3.99994V36.0004C3.99994 38.2064 5.79394 40.0004 7.99994 40.0004H31.9999C34.2059 40.0004 35.9999 38.2064 35.9999 36.0004V22.0004H37.9999C38.3954 22.0003 38.782 21.883 39.1109 21.6632C39.4397 21.4434 39.696 21.1311 39.8473 20.7657C39.9986 20.4003 40.0382 19.9982 39.9611 19.6103C39.884 19.2224 39.6936 18.8661 39.4139 18.5864L21.4139 0.586402C21.2284 0.400511 21.008 0.253035 20.7653 0.152414C20.5227 0.0517922 20.2626 0 19.9999 0C19.7373 0 19.4772 0.0517922 19.2346 0.152414C18.9919 0.253035 18.7715 0.400511 18.5859 0.586402L0.58594 18.5864C0.306321 18.8661 0.115908 19.2224 0.0387732 19.6103C-0.0383619 19.9982 0.00124411 20.4003 0.152584 20.7657C0.303924 21.1311 0.560203 21.4434 0.889023 21.6632C1.21784 21.883 1.60444 22.0003 1.99994 22.0004ZM19.9999 4.8284L31.9999 16.8284L32.0019 36.0004H7.99994V16.8284L19.9999 4.8284Z" fill="black" />
                  <path d="M20 32.0004C27.406 32.0004 29.802 24.9224 29.9 24.6224L26.1 23.3804C26.084 23.4264 24.538 28.0004 20 28.0004C15.524 28.0004 13.96 23.5584 13.898 23.3684L10.1 24.6224C10.198 24.9224 12.594 32.0004 20 32.0004Z" fill="black" />
                </svg>

                <p className='text-[1.5rem] font-bold'>Address Book</p>
              </div>

              <div>
                <Button onClick={() => setAddNewAdress(!addNewAdress)} className='mt-[1.19rem] bg-transparent text-[0.875rem] border border-black text-black'>
                  {!addNewAdress ? "Add New Address" : "Close address form"}
                </Button>
              </div>
            </div>

            {
              isEditingAddress && <Button
                onClick={() => {
                  setIsEditingAddress(false)
                  router.back()
                }}
                className="bg-[#AF52DE] text-[0.75rem] h-[2.5rem] hover:bg-[#AF52DE]"
              >
                <ArrowUpRight />
                <span>Go back</span>
              </Button>
            }
          </div>

          <div className='w-full h-full'>
            {
              addNewAdress && <AddNewAdress
                setAddNewAdress={setAddNewAdress}
              />
            }
          </div>

          <div className='w-full h-full'>
            {
              editAdress && editAdressDetails && <EditAdress
                setEditAdress={setEditAdress}
                editAdressDetails={editAdressDetails}
              />
            }
          </div>

          <div className='mt-[1.5rem] w-full'>
            {
              address ? <div className='w-full flex flex-col gap-y-[1rem]'>
                {address?.map((address, index) => {
                  return <div key={index?.toString()} className='flex flex-col md:flex-row justify-between bg-[#804A9D14] p-[1rem]'>
                    <div className='flex flex-col items-start justify-start gap-y-[1rem]'>
                      <span>{profile?.first_name} {profile?.last_name}</span>
                      <span>{address?.apartment}</span>
                      <span>{address?.city}</span>
                      <span>{address?.zip_code}</span>
                      <span>{address?.country}</span>
                      <span>{profile?.phone_number}</span>
                    </div>

                    <div className='flex flex-row md:flex-col items-center w-auto mt-[1rem] md:mt-0'>
                      <Button
                        className='uppercase bg-transparent text-black space-x-1 border-none shadow-none'
                        onClick={() => {
                          setEditAdressDetails(address)
                          setEditAdress(true)
                        }}
                      >
                        <span>EDIT</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                          <path d="M19.545 7.89844C19.923 7.52044 20.131 7.01844 20.131 6.48444C20.131 5.95044 19.923 5.44844 19.545 5.07044L17.959 3.48444C17.581 3.10644 17.079 2.89844 16.545 2.89844C16.011 2.89844 15.509 3.10644 15.132 3.48344L4.5 14.0824V18.4974H8.913L19.545 7.89844ZM16.545 4.89844L18.132 6.48344L16.542 8.06744L14.956 6.48244L16.545 4.89844ZM6.5 16.4974V14.9124L13.54 7.89444L15.126 9.48044L8.087 16.4974H6.5ZM4.5 20.4974H20.5V22.4974H4.5V20.4974Z" fill="black" />
                        </svg>
                      </Button>

                      <Button onClick={() => handleDeleteAddress(address?.address_id)} className='md:mt-[1rem] bg-transparent text-black space-x-1 border-none shadow-none'>
                        <span className='text-[#666]'>DELETE</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="21" viewBox="0 0 19 21" fill="none">
                          <path d="M2.5 18.5C2.5 19.0304 2.71071 19.5391 3.08579 19.9142C3.46086 20.2893 3.96957 20.5 4.5 20.5H14.5C15.0304 20.5 15.5391 20.2893 15.9142 19.9142C16.2893 19.5391 16.5 19.0304 16.5 18.5V6.5H18.5V4.5H14.5V2.5C14.5 1.96957 14.2893 1.46086 13.9142 1.08579C13.5391 0.710714 13.0304 0.5 12.5 0.5H6.5C5.96957 0.5 5.46086 0.710714 5.08579 1.08579C4.71071 1.46086 4.5 1.96957 4.5 2.5V4.5H0.5V6.5H2.5V18.5ZM6.5 2.5H12.5V4.5H6.5V2.5ZM14.5 6.5V18.5H4.5V6.5H14.5Z" fill="#666666" />
                          <path d="M6.5 8.5H8.5V16.5H6.5V8.5ZM10.5 8.5H12.5V16.5H10.5V8.5Z" fill="#666666" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                })}
              </div> : <div className='w-full flex items-center justify-center mt-[2rem] md:mt-[2.5rem]'>
                <h3 className='text-[0.875rem]'>No user address found!</h3>
              </div>
            }
          </div>
        </div>
      </DashboardLayout>
    </Navigation>
  )
}
