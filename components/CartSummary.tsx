import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/lib/hooks'
import { selectUserToken } from '@/lib/features/user/userSlice'
import { useGuestCheckout } from '@/app/ClientLayout'
import { selectCart } from '@/lib/features/cart/cartSlice'

export default function CartSummary({ }) {
    const { openGuestCheckoutModal, setOpenGuestCheckoutModal } = useGuestCheckout()
    const token = useAppSelector(selectUserToken)
    const router = useRouter()
    const cart = useAppSelector(selectCart)

    const handleContinueToCheckout = () => {
        if (token == null) {
            setOpenGuestCheckoutModal(true)
        } else {
            router.push("/checkout/member")
        }
    }

    return (
        <div className='w-full mt-[2.25rem] md:mt-0'>
            <h2 className='text-[2rem] font-[700]'>Cart Summary</h2>

            <p className="mt-[0.5rem] text-[1.5rem] uppercase font-[700]">
                {"KES " + new Intl.NumberFormat("en-KE", {
                    minimumFractionDigits: 0,
                }).format(cart?.total ?? 0)}
            </p>

            <div className='mt-[1.5rem] flex flex-col w-full'>
                <div className='flex flex-row justify-between items-center w-full'>
                    <span className='text-base font-[400]'>Do you have a Promo Code ?</span>
                </div>

                <div className='w-full flex items-center justify-start mt-[0.75rem] gap-x-[1rem]'>
                    <Input placeholder='Promo Code' className='h-[3rem] max-w-[15rem] border-black text-[0.875rem] ' />
                    <Button className='h-[3rem] border rounded-md bg-white text-custom-black'>
                        Apply
                    </Button>
                </div>

                <div className='mt-[1.5rem]'>
                    <div className='flex w-full flex-col justify-between mb-[0.5rem] gap-y-[1rem]'>
                        <div className='flex justify-between w-full'>
                            <span className='text-[0.875rem] text-[#444]'>Subtotal</span>
                            <span>
                                {"KES " + new Intl.NumberFormat("en-KE", {
                                    minimumFractionDigits: 0,
                                }).format(cart?.total ?? 0)}
                            </span>
                        </div>

                        <div className='flex justify-between w-full'>
                            <span className='text-[0.875rem] text-[#444]'>Estimated Shipping & Handling</span>
                            <span className='text-custom-black text-[0.875rem]'>0</span>
                        </div>

                        <div className='flex justify-between w-full'>
                            <span className='text-[0.875rem] text-[#444]'>Estimated Tax</span>
                            <span className='text-custom-black text-[0.875rem]'>{cart?.estimated_tax}</span>
                        </div>

                        <div className='flex justify-between w-full'>
                            <span className='text-[0.875rem] text-[#444]'>Discount Total</span>
                            <span className='text-custom-black text-[0.875rem]'>{cart?.discount?.toFixed()}</span>
                        </div>
                    </div>

                    <div className='w-full flex justify-between border-b border-black border-t py-[1rem]'>
                        <span>Total</span>
                        <span>
                            {"KES " + new Intl.NumberFormat("en-KE", {
                                minimumFractionDigits: 0,
                            }).format(cart?.final ?? 0)}
                        </span>
                    </div>

                    <div className='w-full flex flex-col justify-between gap-y-[1rem] mt-[1.5rem] mb-[3rem]'>
                        <Button onClick={handleContinueToCheckout} className='bg-[#AF52DE] h-[3rem] text-[0.875rem]'>
                            Checkout
                        </Button>

                        <Button onClick={() => router.push("/")} className='border border-black h-[3rem] text-[0.875rem] bg-white text-custom-black'>
                            Continue Shopping
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
