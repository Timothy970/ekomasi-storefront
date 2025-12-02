"use client"
import DashboardLayout from '@/components/AppLayout/DashboardLayout'
import Navigation from '@/components/Navigation'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { useRouter } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
export default function page() {
    const [voucherType, setSelectVoucherType] = useState('');
    const [discount, setDiscount] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [recipientEmail, setRecipientEmail] = useState('');
    const [senderName, setSenderName] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [message, setMessage] = useState('');
    const [expirationDateEnabled, setExpirationDateEnabled] = useState(false);
    const [internalNotes, setInternalNotes] = useState('');
    const dispatch = useAppDispatch();
    // const voucherDesigns = useAppSelector(selectDesigns);
    const router = useRouter();

    // useEffect(() => {
    //     dispatch(getVoucherDesignsAsync(""));
    // }, []);

    // const refetchAndRedirect = (isSuccess: boolean): void => {
    //     if (isSuccess) {
    //         dispatch(getVouchersAsync(""));
    //         triggerToast('Voucher created successfully!', 'success');
    //         router.push('/vouchers');
    //     } else {
    //         triggerToast('An error occurred while creating the voucher.', 'error');
    //     }
    // }

    // const handleCreate = async () => {
    //     const payload: CreateVoucherPayload = {
    //         design_id: voucherType,
    //         amount: Number.parseInt(discount, 10),
    //         is_to_expire: expirationDateEnabled,
    //         to_name: recipientName,
    //         to_email: recipientEmail,
    //         from_name: senderName,
    //         delivery_time: deliveryDate,
    //         message: message,
    //         internal_notes: internalNotes,
    //     };

    //     if (payload) {
    //         await dispatch(createVoucherAsync({ payload, refetchAndRedirect }));
    //     } else {
    //         triggerToast('Please fill in the form!', 'error');
    //     }
    // };

    return (
        <Navigation>
            <DashboardLayout>
                <div className="space-y-4">


                    <div className='w-full my-[2rem] lg:my-[2.5rem] flex flex-col gap-y-[1.5rem] p-[2rem] shadow-md rounded-[1.25rem]'>
                        <div className='w-full'>
                            <span className='font-[700] text-[1.25rem]'>Voucher Design</span>
                            <div className='w-full mt-[0.75rem]'>
                                <Select value={voucherType} onValueChange={setSelectVoucherType}>
                                    <SelectTrigger className="w-full border-black">
                                        <SelectValue placeholder="Choose Voucher Design..." />
                                    </SelectTrigger>

                                    {/* <SelectContent>
                                        {voucherDesigns?.map((design) => (
                                            <SelectItem key={design.design_id} value={design.design_id}>
                                                {design.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent> */}
                                </Select>
                            </div>
                        </div>

                        <div className='flex flex-col gap-y-[1rem] w-full'>
                            <span className='font-[700] text-[1.25rem]'>Amount:</span>

                            <div className='flex flex-col gap-y-[0.75rem] w-full'>
                                <span className='font-[400] text-base'>Discount:</span>

                                <Input
                                    type='number'
                                    placeholder='Discount'
                                    className='border-black'
                                    value={discount}
                                    onChange={e => setDiscount(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className='flex flex-col gap-y-[1rem]'>
                            <span className='font-[700] text-[1.25rem]'>To:</span>

                            <div className="flex justify-between flex-col md:grid gap-y-[1rem] grid-cols-2 items-center mb-[1.62rem] gap-x-[1.62rem] w-full">
                                <div className='flex flex-col gap-y-[0.75rem] w-full'>
                                    <span className='font-[400]'>Recipient’s name:</span>

                                    <Input
                                        placeholder='Name'
                                        className='border-black'
                                        value={recipientName}
                                        onChange={e => setRecipientName(e.target.value)}
                                    />
                                </div>

                                <div className='flex flex-col gap-y-[0.75rem] w-full'>
                                    <span className='font-[400] text-base'>Recipient’s email address:</span>

                                    <div className='relative'>
                                        <Input
                                            placeholder='Email'
                                            className='pl-[2.5rem] border-black'
                                            value={recipientEmail}
                                            onChange={e => setRecipientEmail(e.target.value)}
                                        />

                                        <svg className='absolute left-[0.75rem] top-1/2 -translate-y-1/2' xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
                                            <path d="M18 0H2C0.897 0 0 0.897 0 2V14C0 15.103 0.897 16 2 16H18C19.103 16 20 15.103 20 14V2C20 0.897 19.103 0 18 0ZM18 2V2.511L10 8.734L2 2.512V2H18ZM2 14V5.044L9.386 10.789C9.56111 10.9265 9.77733 11.0013 10 11.0013C10.2227 11.0013 10.4389 10.9265 10.614 10.789L18 5.044L18.002 14H2Z" fill="black" />
                                        </svg>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className='flex flex-col gap-y-[1rem] w-full'>
                            <span className='font-[700] text-[1.25rem]'>From:</span>

                            <div className="flex justify-between flex-col md:grid gap-y-[1rem] grid-cols-2 items-center mb-[1.62rem] gap-x-[1.62rem] w-full">
                                <div className='flex flex-col gap-y-[0.75rem] w-full'>
                                    <span className='font-[400]'>Enter your name:</span>

                                    <Input
                                        placeholder='Name'
                                        className='border-black'
                                        value={senderName}
                                        onChange={e => setSenderName(e.target.value)}
                                    />
                                </div>

                                <div className='flex flex-col gap-y-[0.75rem] w-full'>
                                    <span className='font-[400] text-base'>Delivery date:</span>

                                    <Input
                                        type='date'
                                        placeholder='Email'
                                        className='pl-[2.5rem] border-black'
                                        value={deliveryDate}
                                        onChange={e => setDeliveryDate(e.target.value)}
                                    />
                                </div>

                            </div>
                        </div>

                        <Textarea
                            placeholder='Message'
                            className='border-black h-full min-h-[10rem] w-full'
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                        />

                        <div className='flex flex-col gap-y-[0.75rem] w-full'>
                            <span className='font-[400]'>Set Expiration date:</span>
                            <Switch checked={expirationDateEnabled} onCheckedChange={setExpirationDateEnabled} />
                        </div>

                        <div className='flex flex-col gap-y-[0.38rem]'>
                            <Textarea
                                placeholder='Internal Notes'
                                className='border-black h-full min-h-[10rem] w-full'
                                value={internalNotes}
                                onChange={e => setInternalNotes(e.target.value)}
                            />
                            <p className='text-sm'>Enter your notes here. This will only be visible to the admin</p>
                        </div>

                        <div className='w-full flex items-start gap-x-[2rem] mt-[2rem]'>
                            <Button
                                className='max-w-[10rem] bg-[#E82989] text-white w-full rounded-[0.75rem]'
                                // onClick={handleCreate}
                            >
                                Create
                            </Button>

                            <Button className='max-w-[10rem] w-full rounded-[0.75rem] bg-white border border-black text-black'>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </Navigation>
    )
}
