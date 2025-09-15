import { selectCart } from '@/lib/features/cart/cartSlice'
import { useAppSelector } from '@/lib/hooks'
import React from 'react'
import CartItemProducts from './CartItemProducts'

export default function GuestCartItems() {
    const cart = useAppSelector(selectCart)

    return (
        <div className='flex flex-col w-full items-center justify-center'>

            {cart && cart.cart_items && cart.cart_items.length > 0 && (
                <div className='flex flex-row justify-center items-center py-[1rem] gap-x-[0.38rem] border-b border-[rgba(0,0,0,0.40)] md:border-b-0 w-full md:hidden text-[0.75rem]'>
                    <div className='flex items-center justify-start gap-x-[0.38rem] text-gray-600'>
                        <span>{cart.cart_items.length}</span>
                        <span>
                            {cart.cart_items.length === 1 ? "Item" : "Items"}
                        </span>
                    </div>

                    <div className='flex items-center justify-start gap-x-[0.38rem]'>
                        <span>KES | </span>
                        <span className='font-semibold text-[1.25rem]'>
                            {new Intl.NumberFormat("en-KE", {
                                style: "currency",
                                currency: "KES",
                                minimumFractionDigits: 0, // or 2 if you want decimals
                            }).format(cart?.total ?? 0)}
                        </span>
                    </div>
                </div>
            )}

            <div className='w-full flex flex-col gap-y-[0.5rem]'>
                {
                    cart?.cart_items?.map((item, index) => {
                        return <CartItemProducts hideBtns={true} key={index.toString()} item={item} />
                    })
                }
            </div>
        </div>
    )
}
