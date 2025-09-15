"use client"
import Navigation from '@/components/Navigation'
import React, { useEffect } from 'react'
import NowTrending from '@/components/NowTrending';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useParams, useRouter } from 'next/navigation';
import { getCartAsync, selectCart } from '@/lib/features/cart/cartSlice';
import CartSummary from '@/components/CartSummary';
import CartItems from '@/components/CartItems';
import { selectUserToken } from '@/lib/features/user/userSlice';

export default function Cart() {
  const params = useParams<{ cart_id: string }>()
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectUserToken)
  const cart = useAppSelector(selectCart)
  const router = useRouter()
  console.log(token)

  useEffect(() => {
    if (params?.cart_id) {
      dispatch(getCartAsync(params?.cart_id))
    }
  }, [params?.cart_id])


  useEffect(() => {
    if (!cart || cart && !cart?.cart_items) {
      router.replace("/")
    }
  }, [cart])

  return (
    <Navigation>
      <div className='w-full mx-auto max-w-[90rem]'>
        <div className='mt-[2.25rem] mb-[2.5rem] w-full flex flex-col md:flex-row justify-center md:items-start items-center mx-auto px-[1rem] lg:px-[3rem] md:gap-x-[2rem]'>
          <CartItems />

          <div className='w-full md:w-[40%]'>
            <CartSummary />
          </div>
        </div>

        {
          !token && <div className='px-[1rem] lg:px-[3rem]'>
            <h2 className='text-[1.5rem] font-bold'>Wishlist</h2>
            <p className='text-xs'>Want to view your favourites? <Link className='underline' href={`/user/signup`}>Join us</Link> or <Link className='underline' href={`/user/login`}>Sign in</Link></p>
          </div>
        }

        <NowTrending title="You may also like" />
      </div>
    </Navigation>
  )
}
