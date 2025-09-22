import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import ChekcoutCartItems from './CheckoutCartItems'
import { useAppSelector } from '@/lib/hooks'
import { selectCart } from '@/lib/features/cart/cartSlice'

export default function CheckoutCartSummary() {
    const cart = useAppSelector(selectCart)

    return (
        <div className='flex flex-col w-full items-center justify-center'>
            <h2 className='text-[2rem] font-bold self-start'>Cart Summary</h2>

            <p className='self-start font-bold text-[1.5rem] uppercase'>
                {new Intl.NumberFormat("en-KE", {
                    style: "currency",
                    currency: "KES",
                    minimumFractionDigits: 0,
                }).format(cart?.total ?? 0)}
            </p>

            <div className='flex flex-row justify-between items-center w-full mt-[1.5rem]'>
                <span>Do you have a Promo Code ?</span>
            </div>

            <div className='w-full flex items-center justify-start mt-[0.75rem] gap-x-[1rem]'>
                <Input placeholder='Promo Code' className='h-[3rem] max-w-[15rem] border-black text-[0.875rem] ' />
                <Button className='h-[3rem] border rounded-md bg-white text-custom-black border-black'>
                    Apply
                </Button>
            </div>

            <div className='flex w-full flex-col justify-between mb-[0.5rem] gap-y-[1rem] mt-[1.5rem]'>
                <div className='flex justify-between w-full'>
                    <span className='text-[0.875rem] text-[#444]'>Subtotal</span>
                    <span className='text-custom-black text-[0.875rem]'>0</span>
                </div>
                <div className='flex justify-between w-full'>
                    <span className='text-[0.875rem] text-[#444]'>Estimated Shipping & Handling</span>
                    <span className='text-custom-black text-[0.875rem]'>0</span>
                </div>
                <div className='flex justify-between w-full'>
                    <span className='text-[0.875rem] text-[#444]'>Estimated Tax</span>
                    <span className='text-custom-black text-[0.875rem]'>16%</span>
                </div>
                <div className='flex justify-between w-full'>
                    <span className='text-[0.875rem] text-[#444]'>Discount Total</span>
                    <span className='text-custom-black text-[0.875rem]'>{cart?.discount?.toFixed()}</span>
                </div>
            </div>

            <h2 className='text-[2rem] font-bold self-start mt-[1.5rem]'>Cart</h2>

            <ChekcoutCartItems />
        </div>
    )
}
