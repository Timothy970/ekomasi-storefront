"use client"
import { triggerToast } from '@/app/utils/toastUtils'
import DashboardLayout from '@/components/AppLayout/DashboardLayout'
import Navigation from '@/components/Navigation'
import NextImage from '@/components/NextImage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ToastType } from '@/lib/features/toast/toastSlice'
import { RedeemVoucherPayload } from '@/lib/features/types'
import { useAppDispatch } from '@/lib/hooks'
import { redeemVoucherAsync } from '@/lib/voucher/voucherSlice'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Redeem() {
    const [code, setCode] = useState("");
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleVoucherRedeem = (message: string, type: ToastType): void => {
        if (type === "success") {
            setCode("")
            router.push("/dashboard/giftcards")
        } else {
            setCode("")
            triggerToast(message, type);
        }
    }

    const handleRedeemVoucher = async () => {
        if (!code) {
            triggerToast("Please enter a code.", "error")
            return
        }

        const payload: RedeemVoucherPayload = {
            code: code,
        };

        if (payload) {
            await dispatch(redeemVoucherAsync({ payload, handleVoucherRedeem }));
        } else {
            triggerToast('Please fill in the form!', 'error');
        }
    };

    return (
        <Navigation>
            <DashboardLayout>
                <div className="space-y-4">
                    <div className='bg-[#804A9D14] w-full flex flex-col gap-y-[1rem] p-[1rem] md:p-[2rem]'>
                        <div className='flex flex-col gap-y-[1rem] gap-x-[1rem]'>
                            <h3 className='text-[1.5rem] font-bold'>Add Gift Card​</h3>
                            <p className='font-[400] text-[0.875rem]'>Enter the long number and scratch off the panel on your card to reveal your PIN as shown below.</p>
                        </div>

                        <div className='w-[100%] md:w-[50%]'>
                            <div className=" w-full md:w-[70%] relative h-auto mt-[1rem]">
                                <NextImage
                                    src="/images/back of giftcard 1.svg"
                                    width={40}
                                    height={40}
                                    unoptimized
                                    className="object-cover rounded w-full h-full"
                                    alt="Preview"
                                />
                            </div>

                        </div>

                        <div className='flex flex-col gap-y-[1rem]'>
                            <span className='font-[400]'>Gift Card Code:</span>

                            <Input
                                className='h-[2.5rem] max-w-[26rem]'
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleRedeemVoucher();
                                }}
                                placeholder="Enter code"
                            />
                        </div>

                        <div className='mt-[1.5rem]'>
                            <Button className='bg-secondary-tenant h-[2.5rem]' onClick={handleRedeemVoucher}>
                                Save Gift Card
                            </Button>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </Navigation>
    )
}
