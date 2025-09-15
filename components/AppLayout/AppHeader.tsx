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

interface AppHeaderProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AppHeader({ isOpen, setIsOpen }: AppHeaderProps) {
  const homeData = useAppSelector(selectHomeData)
  const cart = useAppSelector(selectCart)
  const dispatch = useAppDispatch()
  const cartId = useAppSelector(selectCartId)
  const token = useAppSelector(selectUserToken)
  const router = useRouter()

  useEffect(() => {
    if (cartId) {
      dispatch(getCartAsync(cartId))
    }
  }, [cartId, dispatch])

  useEffect(() => {
    if (token) {
      dispatch(getUserProfileAsync(token))
    }
  }, [token, dispatch])

  const handleIcons = () => {
    if (!token) {
      router.push("/user/login")
    }
  }

  return (
    <div className='w-full flex flex-col items-center z-50 sticky top-0 bg-white'>
      <div className='h-[1.75rem] w-full bg-[#E8298A] hidden z-50 lg:flex justify-center items-center'>
        <div className='w-full max-w-[90rem] flex justify-between items-center h-full px-[1.5rem]'>
          <div className='font-poppins text-[0.875rem]  font-normal leading-[1.95rem] text-white'>
            Call Us: {homeData?.phone_number}
          </div>

          <div>
            <span className='font-poppins text-[0.875rem]  font-normal leading-[1.95rem] text-white'>Our Big Little Event is now on | <span className='underline'>Shop up to 40% off</span></span>
          </div>

          {
            homeData?.social_links && <SocialIcons social_links={homeData?.social_links} />
          }
        </div>
      </div>

      <div className='w-full flex justify-center items-center z-50 bg-white border-b lg:border-none'>
        <div className='bg- w-full h-[3.75rem] px-[1.25rem] lg:px-[3rem] flex flex-row items-center justify-between max-w-[90rem]'>
          <Link href={`/`}>
            <Image
              src={"/images/company-logo.svg"}
              alt="Logo"
              width={150}
              height={25}
              priority={true}
              className='w-[6.625rem] lg:h-[2.438rem] lg:w-[9.75rem] h-[1.676rem] shrink-0'
            />
          </Link>

          <div className='hidden lg:block'>
            <SearchInput placeHolderText="Search for products, brands and more" />
          </div>

          <div className='flex flex-row items-center justify-center gap-x-[1rem]'>
            {
              token ? <Link href={`/profile`}>
                <svg className='cursor-pointer flex-shrink-0' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <path d="M8 0C7.12097 0 6.26168 0.246943 5.5308 0.709602C4.79991 1.17226 4.23026 1.82985 3.89387 2.59923C3.55748 3.3686 3.46946 4.2152 3.64095 5.03196C3.81244 5.84872 4.23574 6.59897 4.8573 7.18782C5.47887 7.77667 6.27079 8.17768 7.13293 8.34015C7.99507 8.50261 8.8887 8.41923 9.70082 8.10055C10.5129 7.78186 11.2071 7.24219 11.6954 6.54977C12.1838 5.85735 12.4444 5.04329 12.4444 4.21053C12.4444 3.09383 11.9762 2.02286 11.1427 1.23323C10.3092 0.443608 9.17874 0 8 0ZM8 6.73684C7.47258 6.73684 6.95701 6.58868 6.51848 6.31108C6.07995 6.03349 5.73815 5.63893 5.53632 5.17731C5.33449 4.71568 5.28168 4.20772 5.38457 3.71767C5.48747 3.22761 5.74144 2.77746 6.11438 2.42415C6.48732 2.07084 6.96248 1.83023 7.47976 1.73275C7.99704 1.63527 8.53322 1.6853 9.02049 1.87651C9.50776 2.06773 9.92424 2.39153 10.2173 2.80698C10.5103 3.22243 10.6667 3.71087 10.6667 4.21053C10.6667 4.88055 10.3857 5.52313 9.88562 5.9969C9.38552 6.47068 8.70724 6.73684 8 6.73684ZM16 16V15.1579C16 13.5945 15.3444 12.0952 14.1776 10.9897C13.0107 9.88421 11.428 9.26316 9.77778 9.26316H6.22222C4.57199 9.26316 2.98934 9.88421 1.82245 10.9897C0.655554 12.0952 0 13.5945 0 15.1579V16H1.77778V15.1579C1.77778 14.0412 2.24603 12.9702 3.07953 12.1806C3.91302 11.391 5.04348 10.9474 6.22222 10.9474H9.77778C10.9565 10.9474 12.087 11.391 12.9205 12.1806C13.754 12.9702 14.2222 14.0412 14.2222 15.1579V16H16Z" fill="black" />
                </svg>
              </Link> : <svg onClick={handleIcons} className='flex-shrink-0' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="none">
                <path d="M8 0C7.12097 0 6.26168 0.246943 5.5308 0.709602C4.79991 1.17226 4.23026 1.82985 3.89387 2.59923C3.55748 3.3686 3.46946 4.2152 3.64095 5.03196C3.81244 5.84872 4.23574 6.59897 4.8573 7.18782C5.47887 7.77667 6.27079 8.17768 7.13293 8.34015C7.99507 8.50261 8.8887 8.41923 9.70082 8.10055C10.5129 7.78186 11.2071 7.24219 11.6954 6.54977C12.1838 5.85735 12.4444 5.04329 12.4444 4.21053C12.4444 3.09383 11.9762 2.02286 11.1427 1.23323C10.3092 0.443608 9.17874 0 8 0ZM8 6.73684C7.47258 6.73684 6.95701 6.58868 6.51848 6.31108C6.07995 6.03349 5.73815 5.63893 5.53632 5.17731C5.33449 4.71568 5.28168 4.20772 5.38457 3.71767C5.48747 3.22761 5.74144 2.77746 6.11438 2.42415C6.48732 2.07084 6.96248 1.83023 7.47976 1.73275C7.99704 1.63527 8.53322 1.6853 9.02049 1.87651C9.50776 2.06773 9.92424 2.39153 10.2173 2.80698C10.5103 3.22243 10.6667 3.71087 10.6667 4.21053C10.6667 4.88055 10.3857 5.52313 9.88562 5.9969C9.38552 6.47068 8.70724 6.73684 8 6.73684ZM16 16V15.1579C16 13.5945 15.3444 12.0952 14.1776 10.9897C13.0107 9.88421 11.428 9.26316 9.77778 9.26316H6.22222C4.57199 9.26316 2.98934 9.88421 1.82245 10.9897C0.655554 12.0952 0 13.5945 0 15.1579V16H1.77778V15.1579C1.77778 14.0412 2.24603 12.9702 3.07953 12.1806C3.91302 11.391 5.04348 10.9474 6.22222 10.9474H9.77778C10.9565 10.9474 12.087 11.391 12.9205 12.1806C13.754 12.9702 14.2222 14.0412 14.2222 15.1579V16H16Z" fill="black" />
              </svg>
            }

            {
              token ? <Link href={`/wishlists`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 34 31" fill="none">
                  <path d="M16.9998 2.65917C15.1838 0.98934 12.8068 0.0625776 10.3398 0.0625C9.03404 0.0638595 7.74143 0.323433 6.53637 0.826281C5.33131 1.32913 4.23758 2.06532 3.31814 2.9925C-0.603528 6.93083 -0.601862 13.0908 3.32147 17.0125L15.5415 29.2325C15.8248 29.7308 16.3715 30.0525 16.9998 30.0525C17.2578 30.05 17.5116 29.987 17.7409 29.8686C17.9701 29.7502 18.1684 29.5797 18.3198 29.3708L30.6781 17.0125C34.6015 13.0892 34.6015 6.93083 30.6748 2.98583C29.7558 2.06036 28.663 1.32566 27.4591 0.823972C26.2552 0.322283 24.964 0.0634993 23.6598 0.0625C21.1929 0.0629033 18.816 0.989621 16.9998 2.65917ZM28.3181 5.3425C30.9231 7.96083 30.9248 12.0508 28.3215 14.6558L16.9998 25.9775L5.67814 14.6558C3.0748 12.0508 3.07647 7.96083 5.6748 5.34917C6.94147 4.08917 8.59814 3.39583 10.3398 3.39583C12.0815 3.39583 13.7315 4.08917 14.9881 5.34583L15.8215 6.17917C15.9761 6.33408 16.1598 6.45697 16.362 6.54082C16.5642 6.62467 16.7809 6.66784 16.9998 6.66784C17.2187 6.66784 17.4354 6.62467 17.6376 6.54082C17.8398 6.45697 18.0235 6.33408 18.1781 6.17917L19.0115 5.34583C21.5315 2.83083 25.8015 2.8375 28.3181 5.3425Z" fill="black" />
                </svg>
              </Link> :
                <svg onClick={handleIcons} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 34 31" fill="none">
                  <path d="M16.9998 2.65917C15.1838 0.98934 12.8068 0.0625776 10.3398 0.0625C9.03404 0.0638595 7.74143 0.323433 6.53637 0.826281C5.33131 1.32913 4.23758 2.06532 3.31814 2.9925C-0.603528 6.93083 -0.601862 13.0908 3.32147 17.0125L15.5415 29.2325C15.8248 29.7308 16.3715 30.0525 16.9998 30.0525C17.2578 30.05 17.5116 29.987 17.7409 29.8686C17.9701 29.7502 18.1684 29.5797 18.3198 29.3708L30.6781 17.0125C34.6015 13.0892 34.6015 6.93083 30.6748 2.98583C29.7558 2.06036 28.663 1.32566 27.4591 0.823972C26.2552 0.322283 24.964 0.0634993 23.6598 0.0625C21.1929 0.0629033 18.816 0.989621 16.9998 2.65917ZM28.3181 5.3425C30.9231 7.96083 30.9248 12.0508 28.3215 14.6558L16.9998 25.9775L5.67814 14.6558C3.0748 12.0508 3.07647 7.96083 5.6748 5.34917C6.94147 4.08917 8.59814 3.39583 10.3398 3.39583C12.0815 3.39583 13.7315 4.08917 14.9881 5.34583L15.8215 6.17917C15.9761 6.33408 16.1598 6.45697 16.362 6.54082C16.5642 6.62467 16.7809 6.66784 16.9998 6.66784C17.2187 6.66784 17.4354 6.62467 17.6376 6.54082C17.8398 6.45697 18.0235 6.33408 18.1781 6.17917L19.0115 5.34583C21.5315 2.83083 25.8015 2.8375 28.3181 5.3425Z" fill="black" />
                </svg>
            }

            {
              cartId ? <Link href={`/cart/${cartId}`}>
                <div className='flex justify-center items-center mr-[0.5rem] relative'>
                  {
                    cart && cart?.cart_items && cart?.cart_items?.length > 0 && <div className='bg-[#C9A0FF] h-[1rem] w-[1rem] absolute -bottom-[5px] -right-[5px] flex justify-center items-center rounded-full'>
                      <span className='text-xs'>{cart?.cart_items?.length}</span>
                    </div>
                  }

                  <svg className='cursor-pointer flex-shrink-0' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M2.22222 20H17.7778C19.0033 20 20 19.103 20 18V7C20 6.73478 19.8829 6.48043 19.6746 6.29289C19.4662 6.10536 19.1836 6 18.8889 6H15.5556V5C15.5556 2.243 13.0633 0 10 0C6.93667 0 4.44444 2.243 4.44444 5V6H1.11111C0.816426 6 0.533811 6.10536 0.325437 6.29289C0.117063 6.48043 0 6.73478 0 7V18C0 19.103 0.996667 20 2.22222 20ZM6.66667 5C6.66667 3.346 8.16222 2 10 2C11.8378 2 13.3333 3.346 13.3333 5V6H6.66667V5ZM2.22222 8H4.44444V10H6.66667V8H13.3333V10H15.5556V8H17.7778L17.78 18H2.22222V8Z" fill="black" />
                  </svg>
                </div>
              </Link> : <div onClick={handleIcons} className='flex justify-center items-center mr-[0.5rem] relative'>
                {
                  <div className='bg-[#C9A0FF] h-[1rem] w-[1rem] absolute -bottom-[5px] -right-[5px] flex justify-center items-center rounded-full'>
                    <span className='text-xs'>0</span>
                  </div>
                }

                <svg className='cursor-pointer flex-shrink-0' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M2.22222 20H17.7778C19.0033 20 20 19.103 20 18V7C20 6.73478 19.8829 6.48043 19.6746 6.29289C19.4662 6.10536 19.1836 6 18.8889 6H15.5556V5C15.5556 2.243 13.0633 0 10 0C6.93667 0 4.44444 2.243 4.44444 5V6H1.11111C0.816426 6 0.533811 6.10536 0.325437 6.29289C0.117063 6.48043 0 6.73478 0 7V18C0 19.103 0.996667 20 2.22222 20ZM6.66667 5C6.66667 3.346 8.16222 2 10 2C11.8378 2 13.3333 3.346 13.3333 5V6H6.66667V5ZM2.22222 8H4.44444V10H6.66667V8H13.3333V10H15.5556V8H17.7778L17.78 18H2.22222V8Z" fill="black" />
                </svg>
              </div>
            }

            <div
              onClick={() => setIsOpen(!isOpen)}
              className='w-[1rem] h-[1rem] flex justify-center items-center lg:hidden'
            >
              <svg className='w-[1.5rem] h-[1.5rem] flex-shrink-0' xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
                <path d="M0 0H16V2H0V0ZM0 5H16V7H0V5ZM0 10H16V12H0V10Z" fill="black" />
              </svg>
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
