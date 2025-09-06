import Image from 'next/image'
import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import SocialLinksFooter from '../SocialLinksFooter'
import { useAppSelector } from '@/lib/hooks'
import { selectCategories, selectHomeData } from '@/lib/features/navigation/navigationSlice'

export default function Footer() {
  const homeData = useAppSelector(selectHomeData)
  const categories = useAppSelector(selectCategories)

  return (
    <div className="relative w-full flex flex-col justify-center items-center py-[3rem] lg:py-[5rem] px-[1.25rem] lg:px-[4rem] z-0 h-auto">
      <div className="absolute inset-0 z-0">
        <Image src="/images/footer-pattern.png" alt="Footer background" fill priority className="object-cover" />
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-black/90 z-10"></div>

      <div className="relative z-20 mx-auto w-full max-w-[90rem] text-white flex flex-col sm:gap-x-[2rem] gap-y-[2rem] md:flex-row lg:gap-x-[5rem] md:min-h-[18rem]">
        <div className='flex flex-col gap-y-[1.25rem] max-w-[20rem] md:max-w-full'>
          <Image
            src={"/images/company-logo.svg"}
            alt="Logo"
            width={150}
            height={25}
            priority={true}
            className='w-[6.625rem] lg:h-[3.125rem] lg:w-[9.75rem] h-[2.25rem] shrink-0 lg:hidden'
          />
          <div className='flex flex-col gap-y-[1.25rem]'>
            <h2 className='text-white font-poppins text-base not-italic font-normal leading-[1.95rem]'>Join our newsletter to stay up to date on features and releases.</h2>

            <div className='flex flex-col lg:flex-row w-full gap-y-[1.25rem] lg:gap-x-[1rem]'>
              <Input className='text-white h-[2.5rem] lg:h-[3rem] text-base not-italic font-normal leading-[1.95rem] lg:min-w-[25rem]' placeholder='Enter your email' />

              <Button className='bg-white text-black h-[2.5rem] lg:h-[3rem] lg:w-[8rem]'>
                Subscribe
              </Button>
            </div>

            <p className='text-white font-poppins text-xs font-normal not-italic leading-[1.125rem]'>By subscribing you agree to with our <span className='underline'>Privacy Policy</span> and provide consent to receive updates from our company.</p>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[2rem] gap-x-[2rem] w-full max-w-[60rem]'>
          <div className='w-full'>
            <h2 className='text-base not-italic font-semibold leading-6 mb-[1rem]'>Categories</h2>
            <ul className="flex flex-col list-none p-0 text-black font-sans text-base font-normal leading-[1.5rem]">
              {categories?.map((cat) => (
                <div key={cat.id} className='flex flex-col gap-y-[1rem] mb-[1rem]'>
                  <span className='text-white font-poppins text-sm font-normal not-italic leading-[1.3125rem]'>{cat.name}</span>
                </div>
              ))}
            </ul>
          </div>

          {
            homeData?.social_links && <div className='w-full'>
              <h2 className='text-base not-italic font-semibold leading-6 mb-[1rem]'>Follow Us</h2>
              <SocialLinksFooter social_links={homeData?.social_links} />
            </div>
          }

          <div className='flex flex-col gap-y-[1rem] lg:hidden'>
            <a className='text-white font-roboto text-sm font-normal not-italic leading-[1.3125rem] underline underline-offset-auto decoration-solid'>Privacy Policy</a>
            <a className='text-white font-roboto text-sm font-normal not-italic leading-[1.3125rem] underline underline-offset-auto decoration-solid'>Terms of Service</a>
            <a className='text-white font-roboto text-sm font-normal not-italic leading-[1.3125rem] underline underline-offset-auto decoration-solid'>Cookies Settings</a>
          </div>
        </div>
      </div>

      <div className='border-b border-[rgba(219,181,181,0.44)] w-screen z-10 hidden lg:block lg:mb-[3rem]'></div>

      <div className='z-10 hidden max-w-[90rem] lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[2rem] gap-x-[2rem] w-full md:min-h-[18rem] mb-[3rem]'>
        <div className='flex flex-row gap-x-[1rem]'>
          <div className='flex flex-row '>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12.0001 4C7.12106 4 3.00006 8.121 3.00006 13C3.00006 17.879 7.12106 22 12.0001 22C16.8791 22 21.0001 17.879 21.0001 13C21.0001 8.121 16.8791 4 12.0001 4ZM12.0001 20C8.20606 20 5.00006 16.794 5.00006 13C5.00006 9.206 8.20606 6 12.0001 6C15.7941 6 19.0001 9.206 19.0001 13C19.0001 16.794 15.7941 20 12.0001 20Z" fill="white" />
              <path d="M13 12V8.00002H11V14H17V12H13ZM17.284 3.70702L18.696 2.29102L21.706 5.29102L20.293 6.70802L17.284 3.70702ZM6.69804 3.70702L3.70804 6.70602L2.29004 5.29402L5.28004 2.29402L6.69804 3.70702Z" fill="white" />
            </svg>
          </div>

          <div className='flex flex-col gap-y-[1.5rem]'>
            <h2 className='text-white'>Open hours</h2>
            <p className='text-white text-sm'>Mon to Fri 9:00 am - 5:00 pm</p>
            <p className='text-white text-sm'>Saturday 9:00 am - 7:00 pm</p>
            <p className='text-white text-sm'>Sunday 11:00 am - 6:00 pm</p>
          </div>
        </div>

        <div className='flex flex-row gap-x-[1rem]'>
          <div className='flex flex-row '>
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
              <path d="M10.3335 15L11.3335 13V7.858C13.0545 7.411 14.3335 5.858 14.3335 4C14.3335 1.794 12.5395 0 10.3335 0C8.1275 0 6.3335 1.794 6.3335 4C6.3335 5.858 7.6125 7.411 9.3335 7.858V13L10.3335 15ZM8.3335 4C8.3335 2.897 9.2305 2 10.3335 2C11.4365 2 12.3335 2.897 12.3335 4C12.3335 5.103 11.4365 6 10.3335 6C9.2305 6 8.3335 5.103 8.3335 4Z" fill="white" />
              <path d="M14.6005 8.56301L14.0675 10.491C16.6585 11.207 18.3335 12.584 18.3335 14C18.3335 15.892 15.0485 18 10.3335 18C5.6185 18 2.3335 15.892 2.3335 14C2.3335 12.584 4.0085 11.207 6.6005 10.49L6.0675 8.56201C2.5305 9.54001 0.333496 11.623 0.333496 14C0.333496 17.364 4.7265 20 10.3335 20C15.9405 20 20.3335 17.364 20.3335 14C20.3335 11.623 18.1365 9.54001 14.6005 8.56301Z" fill="white" />
            </svg>
          </div>

          <div className='flex flex-col gap-y-[1.5rem]'>
            <h2 className='text-white'>Location</h2>
            <p className='text-white text-sm'>{homeData?.company_address}</p>
          </div>
        </div>

        <div className='flex flex-row gap-x-[1rem]'>
          <div className='flex flex-row'>
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
              <path d="M15.2366 20.0001C15.5022 20.0017 15.7654 19.9503 16.011 19.849C16.2565 19.7477 16.4794 19.5985 16.6666 19.4101L19.3766 16.7001C19.5628 16.5128 19.6674 16.2593 19.6674 15.9951C19.6674 15.731 19.5628 15.4775 19.3766 15.2901L15.3766 11.2901C15.1892 11.1039 14.9358 10.9993 14.6716 10.9993C14.4074 10.9993 14.154 11.1039 13.9666 11.2901L12.3666 12.8801C11.2588 12.5848 10.2329 12.041 9.3666 11.2901C8.61772 10.4224 8.07423 9.397 7.7766 8.29014L9.3666 6.69014C9.55285 6.50278 9.65739 6.24933 9.65739 5.98514C9.65739 5.72096 9.55285 5.4675 9.3666 5.28014L5.3666 1.28014C5.17924 1.09389 4.92578 0.989349 4.6616 0.989349C4.39741 0.989349 4.14396 1.09389 3.9566 1.28014L1.2566 4.00014C1.06823 4.18738 0.919044 4.41027 0.817745 4.65579C0.716446 4.90131 0.665064 5.16455 0.666598 5.43014C0.757321 9.27243 2.29267 12.9394 4.9666 15.7001C7.72732 18.3741 11.3943 19.9094 15.2366 20.0001ZM4.6666 3.41014L7.2566 6.00014L5.9666 7.29014C5.84442 7.40459 5.75293 7.54788 5.70051 7.70687C5.6481 7.86586 5.63644 8.03547 5.6666 8.20014C6.04037 9.87051 6.83171 11.4188 7.9666 12.7001C9.24696 13.8365 10.7956 14.628 12.4666 15.0001C12.6288 15.034 12.7968 15.0271 12.9557 14.98C13.1145 14.9329 13.2592 14.847 13.3766 14.7301L14.6666 13.4101L17.2566 16.0001L15.2566 18.0001C11.9403 17.9148 8.7761 16.5913 6.3866 14.2901C4.07951 11.8997 2.75221 8.73125 2.6666 5.41014L4.6666 3.41014ZM18.6666 9.00014H20.6666C20.6925 7.81114 20.4775 6.6292 20.0343 5.52555C19.5912 4.4219 18.9293 3.41939 18.0883 2.57844C17.2474 1.73749 16.2448 1.07551 15.1412 0.632394C14.0375 0.189282 12.8556 -0.0257898 11.6666 0.000141506V2.00014C12.5945 1.96804 13.5191 2.12715 14.3829 2.46758C15.2467 2.808 16.0312 3.32246 16.6878 3.97898C17.3443 4.6355 17.8587 5.42005 18.1992 6.28385C18.5396 7.14765 18.6987 8.07224 18.6666 9.00014Z" fill="white" />
              <path d="M11.6666 6.00012C13.7666 6.00012 14.6666 6.90012 14.6666 9.00012H16.6666C16.6666 5.78012 14.8866 4.00012 11.6666 4.00012V6.00012Z" fill="white" />
            </svg>
          </div>
          <div className='flex flex-col'>
            <div className='flex flex-col mb-[1.5rem] gap-y-[0.5rem]'>
              <h2 className='text-white'>Bookings & Enquiries</h2>

              <p className='text-white text-sm'>{homeData?.phone_number}</p>
            </div>

            <div className='flex flex-col gap-y-[1rem]'>
              <h2 className='text-white'>Email</h2>
              <p className='text-white text-sm'>{homeData?.contact_email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className='border-b border-[rgba(219,181,181,0.44)] w-screen z-10 hidden lg:block'></div>

      <div className='z-10 mt-[3rem] hidden w-full lg:flex justify-center items-center'>
        <Image
          src={"/images/adenzo-logo-footer.png"}
          alt="Logo"
          width={150}
          height={25}
          priority={true}
          className='w-auto h-[5rem] shrink-0'
        />
      </div>

      <div className='mt-[3rem] z-10 w-full flex justify-center items-center'>
        <h2 className='text-white font-poppins text-sm font-normal not-italic leading-[1.3125rem]'>{homeData?.copyright_text}</h2>
      </div>
      <div className='lg:flex flex-row gap-y-[1rem] z-10 hidden gap-x-[2rem] mt-[3rem]'>
        <a className='text-white font-roboto text-sm font-normal not-italic leading-[1.3125rem] underline underline-offset-auto decoration-solid'>Privacy Policy</a>
        <a className='text-white font-roboto text-sm font-normal not-italic leading-[1.3125rem] underline underline-offset-auto decoration-solid'>Terms of Service</a>
        <a className='text-white font-roboto text-sm font-normal not-italic leading-[1.3125rem] underline underline-offset-auto decoration-solid'>Cookies Settings</a>
      </div>
    </div>
  )
}
