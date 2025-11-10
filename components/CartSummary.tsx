import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { selectUserToken } from '@/lib/features/user/userSlice'
import { useGuestCheckout } from '@/app/ClientLayout'
import { getCartAsync, selectCartId } from '@/lib/features/cart/cartSlice'
import CartSummaryLocationDropdown from './CartSummaryLocationDropdown'
import { triggerToast } from '@/app/utils/toastUtils'
import { CartData } from '@/lib/features/types'
import PromocodeInput from './PromocodeInput'

export default function CartSummary({ cart }: { cart: CartData }) {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const { setOpenGuestCheckoutModal } = useGuestCheckout()
    const token = useAppSelector(selectUserToken)
    const router = useRouter()
    const dispatch = useAppDispatch()
    const params = useParams<{ cart_id: string }>()
    const searchParams = useSearchParams();
    const cartId = useAppSelector(selectCartId)
    const promoFromUrl = searchParams.get("promo_code");

    const handleContinueToCheckout = () => {
        if (!selectedId) {
            triggerToast("Please select shipping location to order from.", "error")
            return
        }

        if (token == null) {
            setOpenGuestCheckoutModal(true)
        } else {
            let url = '/checkout/member?';
            let queryAdded = false;

            if (selectedId) {
                url += `location_id=${selectedId}`;
                queryAdded = true;
            }

            if (promoFromUrl) {
                if (queryAdded) {
                    url += `&promo_code=${promoFromUrl}`;
                } else {
                    url += `promo_code=${promoFromUrl}`;
                }
            }

            router.push(url);
        }
    }

    useEffect(() => {
        if (params?.cart_id && selectedId) {
            dispatch(getCartAsync({ cart_id: params?.cart_id, location_id: selectedId }))
        }
    }, [selectedId, params?.cart_id])

    useEffect(() => {
        const locationIdFromUrl = searchParams.get("location_id");

        if (locationIdFromUrl) {
            const idNum = Number(locationIdFromUrl);
            setSelectedId(idNum);

            if (params?.cart_id) {
                dispatch(getCartAsync({ cart_id: params.cart_id, location_id: idNum }));
            }
        } else if (params?.cart_id) {
            dispatch(getCartAsync({ cart_id: params.cart_id }));
        }
    }, [params?.cart_id]);

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

                <PromocodeInput
                    cartId={cartId}
                    isBuyNow={false}
                />

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

                        <CartSummaryLocationDropdown
                            selectedId={selectedId}
                            setSelectedId={setSelectedId}
                        />

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
