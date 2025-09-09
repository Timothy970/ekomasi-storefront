import Image from 'next/image'
import React from 'react'
import SearchInput from '../SearchInput'
import Category from '../Category'
import { useAppSelector } from '@/lib/hooks'
import { selectHomeData } from '@/lib/features/navigation/navigationSlice'
import SocialIcons from '../SocialIcons'
import Link from 'next/link'

interface AppHeaderProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AppHeader({ isOpen, setIsOpen }: AppHeaderProps) {
  const homeData = useAppSelector(selectHomeData)

  return (
    <div className='w-full flex flex-col items-center z-50 sticky top-0 bg-white'>
      <div className='h-[3.18rem] w-full bg-[#E8298A] hidden z-50 lg:flex justify-center items-center'>
        <div className='w-full max-w-[90rem] flex justify-between items-center h-full px-[1.5rem]'>
          <div className='font-poppins text-base font-normal leading-[1.95rem] text-white'>
            Call Us: {homeData?.phone_number}
          </div>

          <div>
            <span className='font-poppins text-base font-normal leading-[1.95rem] text-white'>Our Big Little Event is now on | <span className='underline'>Shop up to 40% off</span></span>
          </div>

          {
            homeData?.social_links && <SocialIcons social_links={homeData?.social_links} />
          }
        </div>
      </div>

      <div className='w-full flex justify-center items-center z-50 bg-white'>
        <div className='bg-white w-full h-[4rem] px-[1.25rem] lg:px-[4rem] flex flex-row items-center justify-between max-w-[90rem]'>
          <Link href={`/`}>
            <Image
              src={"/images/company-logo.svg"}
              alt="Logo"
              width={150}
              height={25}
              priority={true}
              className='w-[6.625rem] lg:h-[3.125rem] lg:w-[9.75rem] h-[2.25rem] shrink-0'
            />
          </Link>

          <div className='w-[50%] hidden lg:block'>
            <SearchInput placeHolderText="Search for products, brands and more" />
          </div>

          <div className='flex flex-row items-center justify-center gap-x-[1rem]'>
            <svg className='w-[1.2rem] h-[1.2rem] cursor-pointer flex-shrink-0' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 0C7.12097 0 6.26168 0.246943 5.5308 0.709602C4.79991 1.17226 4.23026 1.82985 3.89387 2.59923C3.55748 3.3686 3.46946 4.2152 3.64095 5.03196C3.81244 5.84872 4.23574 6.59897 4.8573 7.18782C5.47887 7.77667 6.27079 8.17768 7.13293 8.34015C7.99507 8.50261 8.8887 8.41923 9.70082 8.10055C10.5129 7.78186 11.2071 7.24219 11.6954 6.54977C12.1838 5.85735 12.4444 5.04329 12.4444 4.21053C12.4444 3.09383 11.9762 2.02286 11.1427 1.23323C10.3092 0.443608 9.17874 0 8 0ZM8 6.73684C7.47258 6.73684 6.95701 6.58868 6.51848 6.31108C6.07995 6.03349 5.73815 5.63893 5.53632 5.17731C5.33449 4.71568 5.28168 4.20772 5.38457 3.71767C5.48747 3.22761 5.74144 2.77746 6.11438 2.42415C6.48732 2.07084 6.96248 1.83023 7.47976 1.73275C7.99704 1.63527 8.53322 1.6853 9.02049 1.87651C9.50776 2.06773 9.92424 2.39153 10.2173 2.80698C10.5103 3.22243 10.6667 3.71087 10.6667 4.21053C10.6667 4.88055 10.3857 5.52313 9.88562 5.9969C9.38552 6.47068 8.70724 6.73684 8 6.73684ZM16 16V15.1579C16 13.5945 15.3444 12.0952 14.1776 10.9897C13.0107 9.88421 11.428 9.26316 9.77778 9.26316H6.22222C4.57199 9.26316 2.98934 9.88421 1.82245 10.9897C0.655554 12.0952 0 13.5945 0 15.1579V16H1.77778V15.1579C1.77778 14.0412 2.24603 12.9702 3.07953 12.1806C3.91302 11.391 5.04348 10.9474 6.22222 10.9474H9.77778C10.9565 10.9474 12.087 11.391 12.9205 12.1806C13.754 12.9702 14.2222 14.0412 14.2222 15.1579V16H16Z" fill="black" />
            </svg>

            <svg className='w-[1.5rem] h-[1.5rem] cursor-pointer hidden lg:block' xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M20 7.65831C18.184 5.98849 15.807 5.06172 13.34 5.06165C12.0342 5.06301 10.7416 5.32258 9.53653 5.82543C8.33147 6.32827 7.23775 7.06447 6.31831 7.99165C2.39664 11.93 2.39831 18.09 6.32164 22.0116L18.5416 34.2316C18.825 34.73 19.3716 35.0516 20 35.0516C20.258 35.0491 20.5118 34.9862 20.741 34.8678C20.9703 34.7494 21.1686 34.5789 21.32 34.37L33.6783 22.0116C37.6016 18.0883 37.6016 11.93 33.675 7.98498C32.756 7.05951 31.6631 6.32481 30.4593 5.82312C29.2554 5.32143 27.9642 5.06264 26.66 5.06165C24.193 5.06205 21.8161 5.98877 20 7.65831ZM31.3183 10.3416C33.9233 12.96 33.925 17.05 31.3216 19.655L20 30.9766L8.67831 19.655C6.07497 17.05 6.07664 12.96 8.67497 10.3483C9.94164 9.08831 11.5983 8.39498 13.34 8.39498C15.0816 8.39498 16.7316 9.08831 17.9883 10.345L18.8216 11.1783C18.9763 11.3332 19.16 11.4561 19.3622 11.54C19.5643 11.6238 19.7811 11.667 20 11.667C20.2189 11.667 20.4356 11.6238 20.6378 11.54C20.84 11.4561 21.0237 11.3332 21.1783 11.1783L22.0116 10.345C24.5316 7.82998 28.8016 7.83665 31.3183 10.3416Z" fill="black" />
            </svg>

            <svg className='w-[1.2rem] h-[1.2rem] cursor-pointer mr-[0.5rem] flex-shrink-0' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2.22222 20H17.7778C19.0033 20 20 19.103 20 18V7C20 6.73478 19.8829 6.48043 19.6746 6.29289C19.4662 6.10536 19.1836 6 18.8889 6H15.5556V5C15.5556 2.243 13.0633 0 10 0C6.93667 0 4.44444 2.243 4.44444 5V6H1.11111C0.816426 6 0.533811 6.10536 0.325437 6.29289C0.117063 6.48043 0 6.73478 0 7V18C0 19.103 0.996667 20 2.22222 20ZM6.66667 5C6.66667 3.346 8.16222 2 10 2C11.8378 2 13.3333 3.346 13.3333 5V6H6.66667V5ZM2.22222 8H4.44444V10H6.66667V8H13.3333V10H15.5556V8H17.7778L17.78 18H2.22222V8Z" fill="black" />
            </svg>

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

      <div className='w-[80%] sm:max-w-[25rem] md:max-w-[30rem] block lg:hidden mb-[1rem] pt-2'>
        <SearchInput placeHolderText="Search" />
      </div>
    </div>
  )
}
