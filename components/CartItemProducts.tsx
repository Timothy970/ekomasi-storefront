import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { CartItem } from '@/lib/features/types'
import { useAppDispatch } from '@/lib/hooks'
import { useParams, useRouter } from 'next/navigation'
import { getCartAsync, updateCartAsync } from '@/lib/features/cart/cartSlice'

export default function CartItemProducts({ item }: { item: CartItem }) {
    const dispatch = useAppDispatch()
    const params = useParams<{ cart_id: string }>()
    const router = useRouter()
    const [productQuantity, setProductQuantity] = useState(item?.quantity)

    const refetchCart = () => {
        if (params?.cart_id) {
            dispatch(getCartAsync(params?.cart_id))
        } else {
            router.push("/")
        }
    }
    const handlePlusBtn = () => {
        const newQuantity = (item?.quantity ?? 0) + 1
        dispatch(
            updateCartAsync({
                product_id: item?.product_id,
                quantity: newQuantity,
                refetchCart,
            })
        )
    }

    const handleMinusBtn = () => {
        if ((item?.quantity ?? 0) > 1) {
            const newQuantity = item.quantity - 1
            dispatch(
                updateCartAsync({
                    product_id: item.product_id,
                    quantity: newQuantity,
                    refetchCart,
                })
            )
        }
    }

    const handleDeleteBtn = () => {
        // if ((item?.quantity ?? 0) > 1) {
        //     const newQuantity = item.quantity - 1
        //     dispatch(
        //         updateCartAsync({
        //             product_id: item.product_id,
        //             quantity: newQuantity,
        //             refetchCart,
        //         })
        //     )
        // }
    }

    console.log(item, 'items')

    return (
        <div className='gap-x-[0.75rem] w-full flex justify-between items-start py-[0.75rem] border-b border-[rgba(0,0,0,0.40)]'>
            <div className="relative w-[40%]  h-[10rem] md:h-[15rem]">
                <Image
                    // src={item?.image}
                    src={"https://images.unsplash.com/photo-1612722432474-b971cdcea546?q=80&w=927&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                    alt="Example"
                    fill
                    className="object-cover"
                />
            </div>

            <div className='w-[60%] flex flex-col gap-y-[0.5rem]'>
                <span className='text-[1rem] font-semibold'>KES 13,000</span>
                <span className='text-[0.875rem] font-medium capitalize'>{item?.product?.name}</span>
                <span className='text-[0.875rem] font-medium'>{item?.product?.description}</span>

                <div className='flex flex-row w-full gap-x-[0.5rem]'>
                    <span className='text-[0.875rem]'>Price:</span>
                    <span className='text-[0.875rem] font-light'>{item?.product?.price}</span>
                </div>

                <div className='flex flex-row justify-between items-center w-full mt-[1rem] pr-[1rem]'>
                    <div className='flex justify-center items-center gap-x-[1rem] md:gap-x-[1.5rem]'>
                        <Button onClick={handleMinusBtn} className='h-[2.5rem] w-[2.5rem] border rounded-sm bg-white text-custom-black'>-</Button>
                        <span>{item?.quantity}</span>
                        <Button onClick={handlePlusBtn} className='h-[2.5rem] w-[2.5rem]'>+</Button>
                    </div>

                    <Button onClick={handleDeleteBtn} className='lg:border border-red-500 bg-white gap-x-[0.5rem] lg:text-red-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                            <path d="M2 18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H14C14.5304 20 15.0391 19.7893 15.4142 19.4142C15.7893 19.0391 16 18.5304 16 18V6H18V4H14V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0H6C5.46957 0 4.96086 0.210714 4.58579 0.585786C4.21071 0.960859 4 1.46957 4 2V4H0V6H2V18ZM6 2H12V4H6V2ZM14 6V18H4V6H14Z" fill="#EF4444" />
                            <path d="M6 8H8V16H6V8ZM10 8H12V16H10V8Z" fill="#EF4444" />
                        </svg>
                        <span className='hidden lg:block'>Delete</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}
