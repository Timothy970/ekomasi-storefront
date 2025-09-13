"use client"
import Navigation from '@/components/Navigation'
import React, { useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import NowTrending from '@/components/NowTrending';
import Link from 'next/link';
import { useGuestCheckout } from '../../ClientLayout';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { selectUserToken } from '@/lib/features/user/userSlice';
import { useParams, useRouter } from 'next/navigation';
import { getCartAsync } from '@/lib/features/cart/cartSlice';

const cart_items = [
  {
    "product_id": "p1",
    "name": "Cozy Sofa",
    "description": "A comfortable 3-seater fabric sofa.",
    "sku": "SOFA-001",
    "price": 499.99,
    "category_id": "furniture",
    "stock_quantity": 12,
    "created_at": "2025-09-10T12:00:00Z",
    'image': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFnfGVufDB8fDB8fHww'
  },
  {
    "product_id": "p2",
    "name": "Wireless Headphones",
    "description": "Noise-cancelling over-ear headphones.",
    "sku": "HEAD-123",
    "price": 199.99,
    "category_id": "electronics",
    "stock_quantity": 35,
    "created_at": "2025-09-10T12:05:00Z",
    'image': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFnfGVufDB8fDB8fHww'
  },
  {
    "product_id": "p3",
    "name": "Standing Desk",
    "description": "Adjustable height standing desk.",
    "sku": "DESK-789",
    "price": 299.99,
    "category_id": "office",
    "stock_quantity": 20,
    "created_at": "2025-09-10T12:10:00Z",
    'image': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFnfGVufDB8fDB8fHww'
  },
  {
    "product_id": "p4",
    "name": "Running Shoes",
    "description": "Lightweight and comfortable running shoes.",
    "sku": "SHOE-456",
    "price": 89.99,
    "category_id": "sports",
    "stock_quantity": 50,
    "created_at": "2025-09-10T12:15:00Z",
    'image': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFnfGVufDB8fDB8fHww'
  },
  {
    "product_id": "p5",
    "name": "Smartwatch",
    "description": "Fitness tracking smartwatch with heart rate monitor.",
    "sku": "WATCH-101",
    "price": 149.99,
    "category_id": "wearables",
    "stock_quantity": 40,
    "created_at": "2025-09-10T12:20:00Z",
    'image': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFnfGVufDB8fDB8fHww'
  }
]

export default function Cart() {
  const { openGuestCheckoutModal, setOpenGuestCheckoutModal } = useGuestCheckout()
  const token = useAppSelector(selectUserToken)
  const router = useRouter()
  const params = useParams<{ cart_id: string }>()
  const dispatch = useAppDispatch()


  const handleContinueToCheckout = () => {
    if (token == null) {
      setOpenGuestCheckoutModal(true)
    }
  }

  useEffect(() => {
    if (params?.cart_id) {
      dispatch(getCartAsync(params?.cart_id))
    }
  }, [params?.cart_id])

  return (
    <Navigation>
      <div className='w-full mx-auto max-w-[90rem]'>
        <div className='mt-[2.25rem] mb-[2.5rem] w-full flex flex-col md:flex-row justify-center md:items-start items-center mx-auto px-[1rem] lg:px-[3rem] md:gap-x-[2rem]'>
          <div className='flex flex-col w-full items-center justify-center md:w-[60%]'>
            <h2 className='text-[2.25rem] font-bold self-start'>Cart</h2>

            <div className='flex flex-row justify-center items-center py-[1.12rem] gap-x-[0.38rem] border-b border-[rgba(0,0,0,0.40)] md:border-b-0 w-full md:hidden'>
              <div className='flex items-center justify-start gap-x-[0.38rem] text-gray-600'>
                <span>3</span>
                <span>Items</span>
              </div>

              <div className='flex items-center justify-start gap-x-[0.38rem]'>
                <span>KES | </span>
                <span className='font-semibold'>140, 000</span>
              </div>
            </div>

            <div className='w-full mt-[2rem] flex flex-col gap-y-[1.5rem]'>
              {
                cart_items?.map((item, index) => {
                  return <div key={index?.toString()} className='gap-x-[1.5rem] w-full flex justify-between items-start py-[1.5rem] border-b border-[rgba(0,0,0,0.40)]'>
                    <div className="w-[40%] h-full">
                      <div className="relative w-full h-[10rem] md:h-[15rem]">
                        <Image
                          src={item?.image}
                          alt="Example"
                          fill
                          className="w-full h-auto"
                        />
                      </div>
                    </div>

                    <div className='w-[50%] flex flex-col gap-y-[0.5rem] font-semibold'>
                      <span className='text-[1.25rem]'>KES 13,000</span>
                      <span className='text-base'>Flip 4-in-1 Convertible Carrier - Leopard</span>

                      <div className='flex flex-row w-full gap-x-[0.5rem]'>
                        <span className='text-base font-light'>Brand:</span>
                        <span className='text-base font-light'>Infantino</span>
                      </div>

                      <div className='flex flex-row w-full gap-x-[0.5rem]'>
                        <span className='text-base font-light'>Color:</span>
                        <span className='text-base font-light'>Grey</span>
                      </div>

                      <div className='flex flex-row w-full gap-x-[0.5rem]'>
                        <span className='text-base font-light'>Size:</span>
                        <span className='text-base font-light'>One Size</span>
                      </div>

                      <div className='flex flex-row justify-between items-center w-full mt-[1rem] pr-[1rem]'>
                        <div className='flex justify-center items-center gap-x-[1rem] md:gap-x-[1.5rem]'>
                          <Button className='h-[2.5rem] w-[2.5rem] border rounded-sm bg-white text-custom-black'>-</Button>
                          <span>1</span>
                          <Button className='h-[2.5rem] w-[2.5rem]'>+</Button>
                        </div>

                        <Button className='lg:border border-red-500 bg-white gap-x-[0.5rem] lg:text-red-500'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                            <path d="M2 18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H14C14.5304 20 15.0391 19.7893 15.4142 19.4142C15.7893 19.0391 16 18.5304 16 18V6H18V4H14V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0H6C5.46957 0 4.96086 0.210714 4.58579 0.585786C4.21071 0.960859 4 1.46957 4 2V4H0V6H2V18ZM6 2H12V4H6V2ZM14 6V18H4V6H14Z" fill="#EF4444" />
                            <path d="M6 8H8V16H6V8ZM10 8H12V16H10V8Z" fill="#EF4444" />
                          </svg>
                          <span className='hidden lg:block'>Delete</span>
                        </Button>

                      </div>
                    </div>
                  </div>
                })
              }
            </div>
          </div>

          <div className='w-full mt-[2.25rem] md:mt-0 md:w-[40%]'>
            <h2 className='text-[2rem] font-bold'>Cart Summary</h2>
            <p className='mt-[0.5rem] text-[1.5rem]'>KES 140, 000</p>

            <div className='mt-[1.5rem] flex flex-col'>
              <div className='flex flex-row justify-between items-center w-full'>
                <span>Do you have a Promo Code ?</span>
              </div>

              <div className='w-full flex items-center justify-start mt-[0.75rem] gap-x-[1rem]'>
                <Input placeholder='Promo Code' className='h-[2rem] max-w-[15rem] border-black text-[0.75rem]' />
                <Button className='h-[2rem] border rounded-md bg-white text-custom-black'>
                  Apply
                </Button>
              </div>

              <div className='mt-[1.5rem]'>
                <div className='flex w-full flex-col justify-between mb-[0.5rem] gap-y-[1rem]'>
                  <div className='flex justify-between w-full'>
                    <span className='text-base text-[#444]'>Subtotal</span>
                    <span className='text-custom-black text-base'>0</span>
                  </div>
                  <div className='flex justify-between w-full'>
                    <span className='text-base text-[#444]'>Estimated Shipping & Handling</span>
                    <span className='text-custom-black text-base'>0</span>
                  </div>
                  <div className='flex justify-between w-full'>
                    <span className='text-base text-[#444]'>Estimated Tax</span>
                    <span className='text-custom-black text-base'>0</span>
                  </div>
                  <div className='flex justify-between w-full'>
                    <span className='text-base text-[#444]'>Discount Total</span>
                    <span className='text-custom-black text-base'>0</span>
                  </div>
                </div>

                <div className='w-full flex justify-between border-b border-black border-t py-[1rem]'>
                  <span>Total</span>
                  <span>KES 140,000</span>
                </div>

                <div className='w-full flex flex-col justify-between gap-y-[1rem] mt-[1.5rem] mb-[3rem]'>
                  <Button onClick={handleContinueToCheckout} className='bg-[#AF52DE] h-[2rem] text-base'>
                    Checkout
                  </Button>

                  <Button onClick={() => router.push("/")} className='border border-black h-[2rem] text-base bg-white text-custom-black'>
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='px-[1rem] lg:px-[3rem]'>
          <h2 className='text-[1.5rem] font-bold'>Wishlist</h2>
          <p className='text-xs'>Want to view your favourites? <Link className='underline' href={`/user/signup`}>Join us</Link> or <Link className='underline' href={`/user/login`}>Sign in</Link></p>
        </div>

        <NowTrending title="You may also like" />
      </div>
    </Navigation>
  )
}
