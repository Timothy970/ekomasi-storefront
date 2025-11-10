"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import SocialLogins from '@/components/SocialLogins'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { useRouter, useSearchParams } from 'next/navigation'
import { resetMessage, resetSuccess, selectMessage, selectStatus, selectUserToken, signInUserAsync } from '@/lib/features/user/userSlice'
import Exclusive from '@/components/Exclusive'
import { triggerToast } from '@/app/utils/toastUtils'
import LoadingIndicator from '@/components/LoadingIndicator'
import Link from 'next/link'

export default function Login() {
    const [phoneOrEmail, setPhoneOrEmail] = useState<string>("")
    const [error, setError] = useState<string>("")
    const dispatch = useAppDispatch()
    const router = useRouter();
    const message = useAppSelector(selectMessage)
    const token = useAppSelector(selectUserToken)
    const searchParams = useSearchParams()
    const status = useAppSelector(selectStatus)

    function handlePhoneOrEmail(e: React.FormEvent) {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{12}$/;  // 254XXXXXXXXX (12 digits for Kenyan numbers)

        if (emailRegex.test(phoneOrEmail)) {
            setError("");
            dispatch(signInUserAsync({ email: phoneOrEmail }));
        } else if (phoneRegex.test(phoneOrEmail)) {
            setError("");
            dispatch(signInUserAsync({ phone_number: phoneOrEmail }));
        } else {
            setError("Please enter a valid email or a 12-digit phone number (e.g., 254XXXXXXXXX)");
        }
    }

    useEffect(() => {
        if (message === "OTP sent") {
            triggerToast(message, "success");
            const redirect = searchParams.get("redirect")

            const timer = setTimeout(() => {
                if (redirect) {
                    router.push(`/user/otp?redirect=${redirect}`);

                } else {
                    router.push(`/user/otp`);
                }
                dispatch(resetSuccess());
                dispatch(resetMessage());
            }, 2000);

            return () => clearTimeout(timer);
        } else {
            if (message) {
                triggerToast(message, "error");

                const timer = setTimeout(() => {
                    dispatch(resetSuccess());
                    dispatch(resetMessage());
                }, 2000);

                return () => clearTimeout(timer);
            }
        }
    }, [message, router]);

    useEffect(() => {
        if (token) {
            router.replace("/");
        }
    }, [token, router]);

    const handleSignUp = () => {
        const redirect = searchParams.get("redirect")

        if (redirect) {
            router.push(`/user/signup?redirect=${redirect}`);
        } else {
            router.push(`/user/signup`);
        }
    }

    return (
        <div className='h-screen w-screen flex flex-col lg:flex-row justify-center items-center px-[1.25rem]'>
            <div className='max-w-[90rem] w-full h-full max-h-[56.25rem] flex flex-row justify-center'>
                <div className='w-full max-w-[22rem] lg:max-w-[42rem] flex justify-start items-start flex-col h-full px-0 lg:px-[3rem]'>
                    <div className='w-full flex justify-center items-center lg:justify-start lg:h-auto'>
                        <Link href={`/`}>
                            <Image
                                src={"/images/company-logo.svg"}
                                alt="Logo"
                                width={150}
                                height={25}
                                unoptimized
                                priority={true}
                                className='w-[6.625rem] lg:h-[3.125rem] lg:w-[9.75rem] h-[2.25rem] shrink-0 mt-[1rem]'
                            />
                        </Link>
                    </div>

                    <div className='w-full flex flex-col justify-center items-center lg:h-[80%] lg:max-w-[28rem]'>
                        <h1 className='mt-[1rem] text-[2.2rem] text-center font-comfortaa font-bold leading-[120%] text-[var(--Color-Scheme-1-Text,#000)]'>Log In</h1>

                        <div className='flex flex-col mt-[1.25rem] text-center font-poppins text-[1.125rem] font-normal leading-[150%] text-[var(--Color-Scheme-1-Text,#000)]'>
                            <span>Peek-a-boo! </span>
                            <span>Welcome back to Adenzo 🤗!</span>
                        </div>

                        <Exclusive />

                        <form onSubmit={handlePhoneOrEmail} className='w-full'>
                            <Input
                                value={phoneOrEmail}
                                onChange={(e) => setPhoneOrEmail(e.target.value)}
                                onBlur={() => {
                                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                                    let value = phoneOrEmail.trim()

                                    if (!emailRegex.test(value)) {
                                        value = value.replace(/\D/g, '')

                                        if (value.startsWith('0')) {
                                            value = value.substring(1)
                                        }

                                        if (value && !value.startsWith('254')) {
                                            value = '254' + value
                                        }

                                        if (value.length > 12) {
                                            value = value.slice(0, 12)
                                        }

                                        setPhoneOrEmail(value)
                                    }
                                }}
                                type='text'
                                placeholder='Enter phone or email'
                                className={`mt-[2rem] p-[0.75rem] font-poppins text-[0.875rem] font-normal leading-[195%]
                                    text-[rgba(0,0,0,0.60)] rounded-md border h-[3.3rem] lg:h-[2.5rem]
                                    ${error ? "border-red-500 focus-visible:ring-red-500" : "border-[var(--Color-Neutral,#666)]"}
                                `}
                            />

                            {error && (
                                <p className="mt-2 text-sm text-red-500 font-poppins">{error}</p>
                            )}

                            <Button
                                disabled={status === "loading"}
                                type="submit"
                                variant="outline"
                                className='mt-[1rem] w-full bg-[#AF52DE] outline-none border-none text-white h-[3.3rem] lg:h-[2.5rem]'
                            >
                                {
                                    status == "loading" && <LoadingIndicator textColor="text-white" />
                                }
                                Continue
                            </Button>
                        </form>

                        <div className='mt-[1rem] flex flex-row justify-center items-center w-full'>
                            <div className='h-[0.0625rem] bg-black w-[30%]'></div>
                            <div className='mx-[1rem]'>
                                <h3 className='font-poppins text-nowrap text-[0.875rem] font-normal leading-[195%] text-[var(--Color-Neutral-Dark,#444)]'>or continue with</h3>
                            </div>
                            <div className='h-[0.0625rem] bg-black w-[30%]'></div>
                        </div>

                        {/* <SocialLogins /> */}

                        <div className='flex flex-row justify-center items-center gap-x-[0.31rem] mt-[0.75rem]'>
                            <span className='font-poppins text-[0.875rem] font-normal leading-[195%] text-center text-[var(--Color-Scheme-1-Text,#000)]'>Don't have an account?</span>

                            <div onClick={handleSignUp}>
                                <span className='font-roboto text-[0.875rem] font-normal leading-[150%] cursor-pointer text-center text-[var(--Colors-Blue,#007AFF)] underline decoration-solid underline-offset-auto'>Sign Up</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-[50%] lg:min-w-[50%] lg:min-h-full hidden lg:block relative">
                    <Image
                        src="/images/login.svg"
                        alt="Logo"
                        fill
                        unoptimized
                        priority
                        className="object-cover rounded-l-[3rem] rounded-r-none"
                    />
                </div>
            </div>
        </div>
    )
}
