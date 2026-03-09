import React from 'react'
import ChekcoutCartItems from './CheckoutCartItems'
import { CartData } from '@/lib/features/types'
import { useAppSelector } from '@/lib/hooks'
import { selectUserToken } from '@/lib/features/user/userSlice'
import PromocodeInput from './PromocodeInput'

type CheckoutCartSummaryProps = {
    cartId: string | null;
    cart: CartData;
    isBuyNow: boolean;
    locationId?: number | null;
};

export default function CheckoutCartSummary({ cart, cartId, isBuyNow, locationId }: CheckoutCartSummaryProps) {
    const token = useAppSelector(selectUserToken)

    return (
        <div className='flex flex-col w-full items-center justify-center'>
            <h2 className='text-[2rem] font-bold self-start'>Cart Summary</h2>

            <p className='self-start font-bold text-[1.5rem] uppercase'>
                {"KES " + new Intl.NumberFormat("en-KE", {
                    minimumFractionDigits: 0,
                }).format(cart?.total ?? 0)}
            </p>

            {
                token && <>
                    <div className='flex flex-row justify-between items-center w-full mt-[1.5rem]'>
                        <span>Do you have a Promo Code ?</span>
                    </div>

                    <PromocodeInput
                        cartId={cartId}
                        isBuyNow={isBuyNow}
                        locationId={locationId ?? null}
                    />
                </>
            }

            <div className='flex w-full flex-col justify-between mb-[0.5rem] gap-y-[1rem] mt-[1.5rem]'>
                <div className='flex justify-between w-full'>
                    <span className='text-[0.875rem] text-[#444]'>Subtotal</span>
                    <span className='text-custom-black text-[0.875rem]'>
                        {"KES " + new Intl.NumberFormat("en-KE", {
                            minimumFractionDigits: 0,
                        }).format(cart?.sub_total ?? 0)}
                    </span>
                </div>

                <div className='flex justify-between w-full'>
                    <span className='text-[0.875rem] text-[#444]'>Estimated Shipping & Handling</span>
                    <span className='text-custom-black text-[0.875rem]'>{cart?.delivery_charge}</span>
                </div>

                <div className='flex justify-between w-full'>
                    <span className='text-[0.875rem] text-[#444]'>Estimated Tax</span>
                    <span className='text-custom-black text-[0.875rem]'>
                        {cart?.estimated_tax}
                    </span>
                </div>

                <div className='flex justify-between w-full'>
                    <span className='text-[0.875rem] text-[#444]'>Discount Total</span>
                    <span className='text-custom-black text-[0.875rem]'>{cart?.discount?.toFixed()}</span>
                </div>
            </div>

            <div className='w-full flex justify-between border-b border-black py-[1rem]'>
                <span className='font-[700]'>Total</span>
                <span>
                    {"KES " + new Intl.NumberFormat("en-KE", {
                        minimumFractionDigits: 0,
                    }).format(cart?.total ?? 0)}
                </span>
            </div>

            <h2 className='text-[2rem] font-bold self-start mt-[1.5rem]'>Cart</h2>

            <ChekcoutCartItems cart={cart} />
        </div>
    )
}
