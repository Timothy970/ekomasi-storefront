import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { CartItem } from '@/lib/features/types'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { useParams, useRouter } from 'next/navigation'
import { deleteProductFromCartAsync, getCartAsync, selectCartId, updateCartAsync } from '@/lib/features/cart/cartSlice'
import { customParser } from '@/lib/utils'
import NoImage from './NoImage'
import { calculateDiscountedPrice } from '@/lib/utils/priceUtils'

export default function CartItemProducts({ item, hideBtns }: Readonly<{ item: CartItem, hideBtns: boolean }>) {
    const dispatch = useAppDispatch()
    const params = useParams<{ cart_id: string }>()
    const router = useRouter()
    const cartId = useAppSelector(selectCartId)

    const refetchCart = (cart_id: string) => {
        if (params?.cart_id) {
            dispatch(getCartAsync({ cart_id }))
        } else {
            router.push("/")
        }
    }
    const handlePlusBtn = () => {
        const newQuantity = (item?.quantity ?? 0) + 1

        if (cartId) {
            dispatch(
                updateCartAsync({
                    product_id: item?.product.product_id,
                    quantity: newQuantity,
                    refetchCart,
                    cart_id: cartId,
                })
            )
        }
    }

    const handleMinusBtn = () => {
        if ((item?.quantity ?? 0) > 1) {
            const newQuantity = item.quantity - 1

            if (cartId) {
                dispatch(
                    updateCartAsync({
                        product_id: item?.product.product_id,
                        quantity: newQuantity,
                        refetchCart,
                        cart_id: cartId,
                    })
                )
            }
        }
    }

    const handleDeleteBtn = () => {
        if (cartId) {
            dispatch(
                deleteProductFromCartAsync({
                    product_id: item?.product.product_id,
                    refetchCart,
                    cart_id: cartId,
                })
            )
        }
    }

    return (
        <div className='gap-x-[0.75rem] w-full flex justify-between items-start py-[0.75rem] border-b border-[rgba(0,0,0,0.40)]'>
            {
                item?.product?.urls?.length ? (<div className="relative w-[40%]  h-[10rem] sm:h-[15rem] md:h-[15rem]">
                    <Image
                        src={item?.product?.urls[0]?.url}
                        alt={item?.product?.name}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>
                ) : (<NoImage />)
            }

            <div className='w-[60%] flex flex-col gap-y-[0.5rem]'>
                <div className='flex justify-between items-center'>
                    <span className='font-[600] text-[1rem]'>{item?.product?.category_name}</span>
                    <div className="mt-2 flex items-baseline gap-2 flex-wrap">
                        {item?.product?.discount_type && item?.product?.discount ? (
                            <>
                                <span className="text-[1.25rem] font-bold text-destructive">
                                    {"KES " +
                                        new Intl.NumberFormat("en-KE", {
                                            minimumFractionDigits: 0,
                                        }).format(calculateDiscountedPrice(item?.product?.price, item?.product?.discount_type, item?.product?.discount))}
                                </span>
                                <span className="text-[0.875rem] text-muted-foreground line-through">
                                    {"KES " +
                                        new Intl.NumberFormat("en-KE", {
                                            minimumFractionDigits: 0,
                                        }).format(item?.product?.price ?? 0)}
                                </span>
                            </>
                        ) : (
                            <span className='font-semibold text-[1rem] uppercase gold-text'>
                                {"KES " + new Intl.NumberFormat("en-KE", {
                                    minimumFractionDigits: 0,
                                }).format(item?.product?.price ?? 0)}
                            </span>
                        )}
                    </div>
                </div>

                <span className='text-[0.875rem] md:text-[1.125rem] capitalize font-[700]'>{item?.product?.name}</span>

                <div className='text-[0.875rem] md:text-[1.125rem] font-medium'>{customParser(item?.product?.description)}</div>

                {
                    (item?.product?.stock_quantity ?? 0) > 0 ? <div className='flex items-center gap-x-[0.5rem]'>
                        <span className='text-base text-emerald-600 font-semibold'>In Stock</span>
                    </div> : <div className='flex flex-col items-center justify-center gap-x-[0.5rem] bg-muted py-[2rem] rounded-md'>
                        <span className='text-base font-semibold'>Sold Out:</span>
                        <span className='text-base text-muted-foreground'>This product is currently unavailable</span>
                    </div>
                }

                {
                    !hideBtns &&
                    <div className='flex flex-row justify-between items-center w-full mt-[1rem]'>
                        <div className='flex items-center'>
                            <span className='text-[1.125rem] mr-[0.69rem] hidden lg:block'>Quantity:</span>
                            <div className='flex justify-center items-center gap-x-[1rem] md:gap-x-[0.69rem]'>
                                <Button onClick={handleMinusBtn} className='h-[2.5rem] w-[2.5rem] md:hidden border rounded-sm bg-white text-custom-black'>-</Button>
                                <Button onClick={handleMinusBtn} className='h-[2.5rem] w-[2.5rem] hidden md:block border-none bg-transparent shadow-none rounded-sm text-custom-black'>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" stroke="#0B0B0B" strokeOpacity="0.37" />
                                        <path d="M10.5425 6.83V7.908H4.95653V6.83H10.5425Z" fill="#444444" />
                                    </svg>
                                </Button>

                                <span>{item?.quantity}</span>
                                <Button onClick={handlePlusBtn} className='h-[2.5rem] w-[2.5rem] border md:hidden rounded-sm bg-white text-custom-black'>+</Button>
                                <Button onClick={handlePlusBtn} className='h-[2.5rem] w-[2.5rem] hidden md:block border-none bg-transparent shadow-none rounded-sm text-custom-black'>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" stroke="black" strokeOpacity="0.21" />
                                        <path d="M11.5797 7.922H8.59768V10.946H7.40768V7.922H4.43968V6.844H7.40768V3.806H8.59768V6.844H11.5797V7.922Z" fill="#444444" />
                                    </svg>
                                </Button>
                            </div>
                        </div>

                        <Button onClick={handleDeleteBtn} className='lg:border border-red-500 bg-white gap-x-[0.5rem] lg:text-red-500 h-[2.5rem]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                                <path d="M2 18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H14C14.5304 20 15.0391 19.7893 15.4142 19.4142C15.7893 19.0391 16 18.5304 16 18V6H18V4H14V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0H6C5.46957 0 4.96086 0.210714 4.58579 0.585786C4.21071 0.960859 4 1.46957 4 2V4H0V6H2V18ZM6 2H12V4H6V2ZM14 6V18H4V6H14Z" fill="#EF4444" />
                                <path d="M6 8H8V16H6V8ZM10 8H12V16H10V8Z" fill="#EF4444" />
                            </svg>
                            <span className='hidden lg:block'>Delete</span>
                        </Button>
                    </div>
                }
            </div>
        </div >
    )
}
