import React from 'react'
import { useAppSelector } from '@/lib/hooks'
import { selectCart } from '@/lib/features/cart/cartSlice'
import CartItemProducts from './CartItemProducts'

export default function CartItems() {
    const cart = useAppSelector(selectCart)

    return (
        <div className='flex flex-col w-full items-center justify-center md:w-[60%]'>
            <h2 className='text-[1.5rem] font-semibold self-center md:self-start'>Cart</h2>

            {cart && cart?.cart_items && cart?.cart_items?.length > 0 && (
                <div className='flex flex-row justify-center items-center py-[1rem] gap-x-[0.38rem] border-b border-[rgba(0,0,0,0.40)] md:border-b-0 w-full md:hidden text-[0.75rem]'>
                    <div className='flex items-center justify-start gap-x-[0.38rem] text-gray-600'>
                        <span>{cart?.cart_items.length}</span>
                        <span>
                            {cart?.cart_items?.length === 1 ? "Item" : "Items"}
                        </span>
                    </div>

                    <div className='flex items-center justify-start gap-x-[0.38rem]'>
                        <span>|</span>
                        <span className='font-semibold text-[1.25rem] uppercase'>
                            {"KES " + new Intl.NumberFormat("en-KE", {
                                minimumFractionDigits: 0,
                            }).format(cart?.total ?? 0)}
                        </span>
                    </div>
                </div>
            )}

            <div className='w-full flex flex-col gap-y-[0.5rem]'>
                {
                    cart?.cart_items?.map((item, index) => {
                        return <CartItemProducts
                            hideBtns={false}
                            key={index.toString()}
                            item={item}
                        />
                    })
                }
            </div>
        </div>
    )
}
