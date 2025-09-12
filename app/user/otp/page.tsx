"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import OtpForm from '@/components/OtpForm'
import { useAppSelector } from '@/lib/hooks'
import { selectPhoneOrEmailValue, selectUserToken } from '@/lib/features/user/userSlice'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Otp() {
    const emailOrPhone = useAppSelector(selectPhoneOrEmailValue)
    const router = useRouter()
    const token = useAppSelector(selectUserToken)
    const searchParams = useSearchParams()

    useEffect(() => {
        const redirect = searchParams.get("redirect")

        if (token) {
            if (redirect) {
                router.push(`/checkout/member`);
            }
            else {
                router.replace("/");
            }
        }
    }, [token, router]);

    return (
        <div className='h-screen w-screen flex justify-center items-center relative z-0 flex-col'>
            <Image
                src="/images/otp-bg.jpg"
                alt="otp"
                fill
                priority
                className="object-cover h-full w-full z-10 mx-auto"
            />

            <div className='max-w-[52rem] px-[1.25rem] h-full flex flex-col items-start w-full justify-start z-20'>
                <div className='w-full max-w-[22rem] flex justify-start items-center lg:justify-start lg:h-auto'>
                    <Image
                        src={"/images/company-logo.svg"}
                        alt="Logo"
                        width={150}
                        height={25}
                        priority={true}
                        className='w-[6.625rem] lg:h-[3.125rem] lg:w-[9.75rem] h-[2.25rem] shrink-0 mt-[1rem]'
                    />
                </div>

                <div className='flex justify-center items-center flex-col h-[80%] w-full'>
                    <h2 className='text-[color:var(--Color-Scheme-1-Foreground,#FFF)] text-center font-comfortaa text-[3rem] font-bold leading-[126%]'>Enter Code</h2>

                    {
                        emailOrPhone && <div className='mt-[1.5rem]'>
                            <p className='text-[color:var(--Color-Scheme-1-Foreground,#FFF)] text-center font-poppins text-[1.125rem] font-normal leading-[150%]'>
                                Just one more step! Please enter the verification code sent to: <span className='underline'>{emailOrPhone}</span>
                            </p>
                        </div>
                    }

                    <OtpForm />
                </div>
            </div>

            <div className='w-full z-20 text-[color:var(--Color-Scheme-1-Foreground,#FFF)] text-center font-poppins text-sm font-normal leading-[150%] mb-[1rem]'>© {new Date().getFullYear()} Adenzo. All rights reserved.</div>
        </div>
    )
}
