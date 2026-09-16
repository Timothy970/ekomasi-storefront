"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import SearchInput from '../SearchInput'
import Category from '../CategoryLinks'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { selectHomeData } from '@/lib/features/navigation/navigationSlice'
import SocialIcons from '../SocialIcons'
import Link from 'next/link'
import { getCartAsync, selectCart, selectCartId } from '@/lib/features/cart/cartSlice'
import { getUserProfileAsync, selectUserToken } from '@/lib/features/user/userSlice'
import { useRouter } from 'next/navigation'
import { getWishListsAsync, selectWishLists } from '@/lib/features/wishlist/wishlistSlice'
import Icons from '../ui/custom-icons'
import { useTenant } from '@/app/ClientLayout'

import { Button } from '@/components/ui/button'

interface AppHeaderProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AppHeader({ isOpen, setIsOpen }: Readonly<AppHeaderProps>) {
  const { tenant } = useTenant()
  const homeData = useAppSelector(selectHomeData)
  const cart = useAppSelector(selectCart)
  const dispatch = useAppDispatch()
  const cartId = useAppSelector(selectCartId)
  const token = useAppSelector(selectUserToken)
  const router = useRouter()
  const wishlist = useAppSelector(selectWishLists)

  useEffect(() => {
    if (cartId) {
      dispatch(getCartAsync({ cart_id: cartId }))
    }
  }, [cartId, dispatch])

  useEffect(() => {
    if (token) {
      dispatch(getWishListsAsync(token))
    }
  }, [token, router])

  useEffect(() => {
    if (token) {
      dispatch(getUserProfileAsync())
    }
  }, [token, dispatch])

  const handleIcons = () => {
    if (!token) {
      router.push("/user/login")
    }
  }

  const logoSrc = tenant?.app_logo || tenant?.logo || "/images/ekomasi-logo.png"
  const logoAlt = tenant?.name || "Logo"

  return (
    <div className='w-full flex flex-col items-center z-50 sticky top-0 bg-white'>
      <div className='h-[1.75rem] w-full bg-primary-tenant hidden z-50 lg:flex justify-center items-center' style={{ backgroundColor: 'var(--primary, var(--primary))' }}>
        <div className='w-full max-w-[90rem] flex justify-between items-center h-full px-[1.5rem]'>
          <div className='font-poppins text-[0.875rem]  font-normal leading-[1.95rem] text-white'>
            Call Us: {homeData?.phone_number}
          </div>

          <div>
            <span className='font-poppins text-[0.875rem]  font-normal leading-[1.95rem] text-white'>{tenant?.slogan || "Our Big Little Event is now on"} | <span className='underline'>Shop up to 40% off</span></span>
          </div>

          {
            homeData?.social_links && <SocialIcons social_links={homeData?.social_links} />
          }
        </div>
      </div>

      <div className='w-full flex justify-center items-center z-[60] border-b lg:border-none'>
        <div className='w-full h-[3.75rem] px-[1.25rem] lg:px-[3rem] flex flex-row items-center justify-between max-w-[90rem]'>

          <div className='w-[15rem] flex items-center'>
            <Link href={`/`}>
              <Image
                src={logoSrc}
                alt={logoAlt}
                width={180}
                height={45}
                priority={true}
                unoptimized
                className='h-8 sm:h-10 lg:h-12 w-auto max-w-[140px] sm:max-w-[170px] lg:max-w-[210px] cursor-pointer shrink-0 object-contain hover:opacity-95 transition-opacity'
              />
            </Link>
          </div>

          <div className='hidden lg:block mx-[1rem]'>
            <SearchInput placeHolderText="Search for products, brands and more" />
          </div>

          <div className='w-[15rem]'>
            <div className='flex flex-row items-center justify-end gap-x-[1rem]'>
              {
                token ? <Link href={`/dashboard/details`}>
                  <svg className='cursor-pointer flex-shrink-0' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="none">
                    <path d="M8 0C7.12097 0 6.26168 0.246943 5.5308 0.709602C4.79991 1.17226 4.23026 1.82985 3.89387 2.59923C3.55748 3.3686 3.46946 4.2152 3.64095 5.03196C3.81244 5.84872 4.23574 6.59897 4.8573 7.18782C5.47887 7.77667 6.27079 8.17768 7.13293 8.34015C7.99507 8.50261 8.8887 8.41923 9.70082 8.10055C10.5129 7.78186 11.2071 7.24219 11.6954 6.54977C12.1838 5.85735 12.4444 5.04329 12.4444 4.21053C12.4444 3.09383 11.9762 2.02286 11.1427 1.23323C10.3092 0.443608 9.17874 0 8 0ZM8 6.73684C7.47258 6.73684 6.95701 6.58868 6.51848 6.31108C6.07995 6.03349 5.73815 5.63893 5.53632 5.17731C5.33449 4.71568 5.28168 4.20772 5.38457 3.71767C5.48747 3.22761 5.74144 2.77746 6.11438 2.42415C6.48732 2.07084 6.96248 1.83023 7.47976 1.73275C7.99704 1.63527 8.53322 1.6853 9.02049 1.87651C9.50776 2.06773 9.92424 2.39153 10.2173 2.80698C10.5103 3.22243 10.6667 3.71087 10.6667 4.21053C10.6667 4.88055 10.3857 5.52313 9.88562 5.9969C9.38552 6.47068 8.70724 6.73684 8 6.73684ZM16 16V15.1579C16 13.5945 15.3444 12.0952 14.1776 10.9897C13.0107 9.88421 11.428 9.26316 9.77778 9.26316H6.22222C4.57199 9.26316 2.98934 9.88421 1.82245 10.9897C0.655554 12.0952 0 13.5945 0 15.1579V16H1.77778V15.1579C1.77778 14.0412 2.24603 12.9702 3.07953 12.1806C3.91302 11.391 5.04348 10.9474 6.22222 10.9474H9.77778C10.9565 10.9474 12.087 11.391 12.9205 12.1806C13.754 12.9702 14.2222 14.0412 14.2222 15.1579V16H16Z" fill="black" />
                  </svg>
                </Link> : <Button variant="ghost" onClick={handleIcons} aria-label="Account login" className="p-0 h-auto hover:bg-transparent cursor-pointer flex-shrink-0">
                  <svg className='flex-shrink-0 cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="none">
                    <path d="M8 0C7.12097 0 6.26168 0.246943 5.5308 0.709602C4.79991 1.17226 4.23026 1.82985 3.89387 2.59923C3.55748 3.3686 3.46946 4.2152 3.64095 5.03196C3.81244 5.84872 4.23574 6.59897 4.8573 7.18782C5.47887 7.77667 6.27079 8.17768 7.13293 8.34015C7.99507 8.50261 8.8887 8.41923 9.70082 8.10055C10.5129 7.78186 11.2071 7.24219 11.6954 6.54977C12.1838 5.85735 12.4444 5.04329 12.4444 4.21053C12.4444 3.09383 11.9762 2.02286 11.1427 1.23323C10.3092 0.443608 9.17874 0 8 0ZM8 6.73684C7.47258 6.73684 6.95701 6.58868 6.51848 6.31108C6.07995 6.03349 5.73815 5.63893 5.53632 5.17731C5.33449 4.71568 5.28168 4.20772 5.38457 3.71767C5.48747 3.22761 5.74144 2.77746 6.11438 2.42415C6.48732 2.07084 6.96248 1.83023 7.47976 1.73275C7.99704 1.63527 8.53322 1.6853 9.02049 1.87651C9.50776 2.06773 9.92424 2.39153 10.2173 2.80698C10.5103 3.22243 10.6667 3.71087 10.6667 4.21053C10.6667 4.88055 10.3857 5.52313 9.88562 5.9969C9.38552 6.47068 8.70724 6.73684 8 6.73684ZM16 16V15.1579C16 13.5945 15.3444 12.0952 14.1776 10.9897C13.0107 9.88421 11.428 9.26316 9.77778 9.26316H6.22222C4.57199 9.26316 2.98934 9.88421 1.82245 10.9897C0.655554 12.0952 0 13.5945 0 15.1579V16H1.77778V15.1579C1.77778 14.0412 2.24603 12.9702 3.07953 12.1806C3.91302 11.391 5.04348 10.9474 6.22222 10.9474H9.77778C10.9565 10.9474 12.087 11.391 12.9205 12.1806C13.754 12.9702 14.2222 14.0412 14.2222 15.1579V16H16Z" fill="black" />
                  </svg>
                </Button>
              }

              {
                token ? <Link href={`/dashboard/wishlist`}>
                  <div className='flex justify-center items-center relative'>
                    <Icons.HeartIcon />
                    {
                      wishlist?.[0]?.products?.length ? <div className='bg-secondary-tenant h-[1rem] w-[1rem] absolute -bottom-[5px] -right-[5px] flex justify-center items-center rounded-full'>
                        <span className='text-xs'>{wishlist[0]?.products?.length}</span>
                      </div> : <></>
                    }
                  </div>
                </Link> : <Button variant="ghost" onClick={handleIcons} aria-label="Wishlist" className='p-0 h-auto hover:bg-transparent flex cursor-pointer justify-center items-center'>
                  <Icons.HeartIcon />
                </Button>
              }

              {
                cartId ? <Link href={`/cart/${cartId}`}>
                  <div className='flex justify-center items-center relative'>
                    {cart?.cart_items?.length ? (
                      <div className='bg-secondary-tenant h-[1rem] w-[1rem] absolute -bottom-[5px] -right-[5px] flex justify-center items-center rounded-full'>
                        <span className='text-xs'>
                          {cart?.cart_items?.reduce((sum, item) => sum + (item.quantity || 0), 0)}
                        </span>
                      </div>
                    ) : null}

                    <Icons.CartIcon />
                  </div>
                </Link> : <Button variant="ghost" onClick={handleIcons} aria-label="Shopping Cart" className='p-0 h-auto hover:bg-transparent flex cursor-pointer justify-center items-center'>
                  <Icons.CartIcon />
                </Button>
              }

              <Button
                variant="ghost"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle navigation menu"
                className='w-[1.5rem] h-[1.5rem] p-0 flex justify-center items-center md:hidden hover:bg-transparent'
              >
                <svg className='w-[1.5rem] h-[1.5rem] flex-shrink-0' xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
                  <path d="M0 0H16V2H0V0ZM0 5H16V7H0V5ZM0 10H16V12H0V10Z" fill="black" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Category />

      <div className='w-[80%] sm:max-w-[25rem] md:max-w-[30rem] block lg:hidden mb-[1rem] pt-4'>
        <SearchInput placeHolderText="Search" />
      </div>
    </div>
  )
}
