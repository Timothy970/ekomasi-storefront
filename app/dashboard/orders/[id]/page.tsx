"use client"
import Navigation from '@/components/Navigation'
import OrderDetails from '@/components/OrderDetails'
import OrderDetailsFlow from '@/components/OrderDetailsFlow'
import { getOrderAsync, selectUserOrder } from '@/lib/features/cart/cartSlice'
import { selectUserProfile } from '@/lib/features/user/userSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

export default function Order() {
    const params = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const order = useAppSelector(selectUserOrder)
    const profile = useAppSelector(selectUserProfile)

    useEffect(() => {
        if (params?.id) {
            dispatch(getOrderAsync(params?.id));
        }
    }, [params?.id, dispatch]);

    return (
        <Navigation>
            <div className='max-w-[90rem] w-full mx-auto flex flex-col items-center justify-center mb-[2rem] md:mb-[2.5rem]'>
                {/* <div className='w-full flex items-center justify-center bg-[#FF3B308F]'>
                    <div className='flex justify-center items-center gap-x-[1rem] font-medium py-[0.75rem]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M10.192 0.34375L5.94897 4.58575L1.70697 0.34375L0.292969 1.75775L4.53497 5.99975L0.292969 10.2418L1.70697 11.6558L5.94897 7.41375L10.192 11.6558L11.606 10.2418L7.36397 5.99975L11.606 1.75775L10.192 0.34375Z" fill="black" />
                        </svg>

                        <p className='text-[0.875rem]'>Your Order Was Cancelled.</p>
                    </div>
                </div> */}

                <div className='w-full flex items-center justify-center bg-[#34C75994]'>
                    <div className='flex justify-center items-center gap-x-[1rem] font-medium py-[0.75rem]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="12" viewBox="0 0 15 12" fill="none">
                            <path d="M4.99997 8.58597L1.70697 5.29297L0.292969 6.70697L4.99997 11.414L14.707 1.70697L13.293 0.292969L4.99997 8.58597Z" fill="black" />
                        </svg>

                        <p className='text-[0.875rem]'>Your Order Was Successfully Placed.</p>
                    </div>
                </div>

                <div className='w-full flex items-center flex-col mt-[1rem]'>
                    <p className='text-[0.875rem]'>Thank You!</p>

                    <h2 className='text-[1.5rem] font-bold mt-[1rem]'>Order Details</h2>

                    <p className='font-medium text-[1.125rem] mt-[1rem]'>Check your email for your order confirmation.</p>

                    <div className='flex flex-col items-center mt-[1.5rem] gap-y-[0.5rem]'>
                        <div className='flex text-custom-black gap-x-[0.5rem]'>
                            <span className='font-medium'>Your order: </span>
                            <span>{order?.order_id}</span>
                        </div>

                        {
                            order && <div className='flex text-custom-black gap-x-[0.5rem]'>
                                <span className='font-medium'>Order Date: </span>
                                <span>{new Date(order.created_at).toLocaleDateString()}</span>
                            </div>
                        }

                        <div className='flex text-custom-black gap-x-[0.5rem]'>
                            <span className='font-medium'>Total: </span>
                            <span className='uppercase font-medium'>
                                {new Intl.NumberFormat("en-KE", {
                                    style: "currency",
                                    currency: "KES",
                                    minimumFractionDigits: 0,
                                }).format(order?.total_amount ?? 0)}
                            </span>
                        </div>

                        {
                            profile && <p className='font-medium mt-[1rem] text-base'>We have sent the order confirmation details to <span className='font-bold'>{profile?.email}</span></p>
                        }
                    </div>
                </div>

                <OrderDetailsFlow />
                <OrderDetails />
            </div>
        </Navigation>
    )
}
