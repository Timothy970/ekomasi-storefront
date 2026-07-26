import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { selectUserToken } from '@/lib/features/user/userSlice'
import { useGuestCheckout } from '@/app/ClientLayout'
import { getCartAsync, selectCartId } from '@/lib/features/cart/cartSlice'
import { CartData } from '@/lib/features/types'

export default function CartSummary({ cart }: { cart: CartData }) {
    const { setOpenGuestCheckoutModal } = useGuestCheckout()
    const token = useAppSelector(selectUserToken)
    const router = useRouter()
    const dispatch = useAppDispatch()
    const params = useParams<{ cart_id: string }>()
    const searchParams = useSearchParams();
    const cartId = useAppSelector(selectCartId)

    const handleContinueToCheckout = () => {
        if (token == null) {
            setOpenGuestCheckoutModal(true)
        } else {
            let url = '/checkout/member?';
            router.push(url);
        }
    }

    useEffect(() => {
        if (!params?.cart_id) return;

        const promoFromUrl = searchParams.get("promo_code");

        let data: { cart_id: string, location_id?: number, code?: string } = { cart_id: params.cart_id }

        if (promoFromUrl) {
            data = { ...data, code: promoFromUrl }
        }

        dispatch(getCartAsync({ ...data }));

    }, [params?.cart_id, searchParams]);

    return (
        <div className='w-full mt-[2.25rem] md:mt-0'>
            <h2 className='text-[2rem] font-[700]'>Cart Summary</h2>

            <p className="mt-[0.5rem] text-[1.5rem] uppercase font-[700]">
                {"KES " + new Intl.NumberFormat("en-KE", {
                    minimumFractionDigits: 0,
                }).format(cart?.total ?? 0)}
            </p>

            <div className='mt-[1.5rem] flex flex-col w-full'>

                <div className='mt-[1.5rem]'>
                    <div className='flex w-full flex-col justify-between mb-[0.5rem] gap-y-[1rem]'>
                        <div className='flex justify-between w-full'>
                            <span className='text-[0.875rem] text-[#444]'>Subtotal</span>
                            <span>
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
                            }).format(cart?.total ?? 0)}
                        </span>
                    </div>

                    <div className='w-full flex flex-col justify-between gap-y-[1rem] mt-[1.5rem] mb-[3rem]'>
                        <Button onClick={handleContinueToCheckout} className='bg-primary-tenant hover:opacity-90 h-[3rem] text-[0.875rem]'>
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
