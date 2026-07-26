"use client"
import Navigation from '@/components/Navigation'
import React from 'react'
import NowTrending from '@/components/NowTrending';
import Link from 'next/link';
import { useAppSelector } from '@/lib/hooks';
import { selectCart } from '@/lib/features/cart/cartSlice';
import CartSummary from '@/components/CartSummary';
import CartItems from '@/components/CartItems';
import { selectUserToken } from '@/lib/features/user/userSlice';
import { ShoppingBag } from 'lucide-react';

export default function Cart() {
  const token = useAppSelector(selectUserToken)
  const cart = useAppSelector(selectCart)

  if (!cart || cart && !cart?.cart_items) {
    return (
      <Navigation>
        <div className="flex flex-col items-center justify-center h-[80vh] text-center space-y-4">
          <ShoppingBag className="w-16 h-16 text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-800">Your cart is empty</h2>
          <p className="text-gray-500 max-w-sm">
            It looks like you haven’t added anything to your cart yet. Browse products to get started.
          </p>
          <a
            href="/"
            className="mt-4 px-5 py-2.5 rounded-full bg-primary-tenant text-white hover:opacity-90 transition-colors"
          >
            Continue Shopping
          </a>
        </div>
      </Navigation>
    );
  }

  return (
    <Navigation>
      <div className='w-full mx-auto max-w-[90rem]'>
        <div className='mt-[2.25rem] mb-[2.5rem] w-full flex flex-col md:flex-row justify-center md:items-start items-center mx-auto px-[1rem] lg:px-[3rem] md:gap-x-[2rem]'>
          <CartItems />

          <div className='w-full md:w-[40%]'>
            <CartSummary cart={cart} />
          </div>
        </div>

        {
          !token && <div className='px-[1rem] lg:px-[3rem]'>
            <h2 className='text-[1.5rem] font-bold'>Wishlist</h2>
            <p className='text-xs'>Want to view your favourites? <Link className='underline' href={`/user/signup`}>Join us</Link> or <Link className='underline' href={`/user/login`}>Sign in</Link></p>
          </div>
        }

        <div className='px-[1rem] lg:px-[3rem] mb-[2rem] lg:mb-[2.5rem]'>
          <NowTrending title="You may also like" />
        </div>
      </div>
    </Navigation>
  )
}
