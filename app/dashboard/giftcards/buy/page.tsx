"use client"
import DashboardLayout from '@/components/AppLayout/DashboardLayout'
import Navigation from '@/components/Navigation'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { createVoucherAsync, getVoucherDesignsAsync, getVouchersAsync, selectDesigns } from '@/lib/voucher/voucherSlice'
import { triggerToast } from '@/app/utils/toastUtils'
import { CreateVoucherPayload } from '@/lib/features/types'
import NextImage from '@/components/NextImage'
export default function page() {
    const [voucherType, setSelectVoucherType] = useState('');
    const [discount, setDiscount] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [recipientEmail, setRecipientEmail] = useState('');
    const [senderName, setSenderName] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [expirationDateEnabled, setExpirationDateEnabled] = useState(false);
    const dispatch = useAppDispatch();
    const voucherDesigns = useAppSelector(selectDesigns);
    const router = useRouter();
    const [designImage, setDesignImage] = useState("")

    useEffect(() => {
        dispatch(getVoucherDesignsAsync(""));
    }, [dispatch]);

    useEffect(() => {
        if (voucherDesigns?.length > 0) {
            setDesignImage(voucherDesigns[0]?.url)
        }

    }, [voucherDesigns])

    const refetchAndRedirect = (isSuccess: boolean): void => {
        if (isSuccess) {
            dispatch(getVouchersAsync(""));
            triggerToast('Voucher created successfully!', 'success');
            router.push('/vouchers');
        } else {
            triggerToast('An error occurred while creating the voucher.', 'error');
        }
    }

    const handleCreate = async () => {
        const payload: CreateVoucherPayload = {
            design_id: voucherType,
            amount: Number.parseInt(discount, 10),
            to_name: recipientName,
            to_email: recipientEmail,
            from_name: senderName,
            delivery_time: deliveryDate,
            message: message,
            phone_number: phone,
        };

        if (payload) {
            await dispatch(createVoucherAsync({ payload, refetchAndRedirect }));
        } else {
            triggerToast('Please fill in the form!', 'error');
        }
    };

    return (
        <Navigation>
            <DashboardLayout>
                <div className='relative z-[12] w-full h-full my-[2rem] lg:my-[2.5rem] flex flex-col gap-y-[1.5rem] p-[2rem] shadow-md rounded-[1.25rem] mb-[1rem] md:mb-[2rem]'>
                    <svg className='absolute left-[7rem] top-[3rem] z-[9]' xmlns="http://www.w3.org/2000/svg" width="70" height="44" viewBox="0 0 70 44" fill="none">
                        <path d="M14.1428 41.3623C14.5382 41.3536 15.0227 41.3404 15.5865 41.3207C17.2985 41.2609 19.7401 41.1405 22.6451 40.8956C28.4674 40.4048 36.0973 39.4202 43.4293 37.4569C50.8081 35.4811 57.6454 32.5753 62.0948 28.387C64.2949 26.3161 65.8782 23.9631 66.6909 21.2741C67.5016 18.5915 67.5843 15.4474 66.5911 11.7263C65.3152 6.94596 62.9505 4.18069 60.2368 2.58181C57.4639 0.948069 54.1238 0.415593 50.7618 0.506712C47.4098 0.597592 44.1818 1.30429 41.7671 2.00391C40.5663 2.35183 39.5817 2.69351 38.9026 2.94589C38.5634 3.07193 38.3011 3.17539 38.1272 3.24587C38.0406 3.28097 37.976 3.30796 37.9348 3.32532C37.9141 3.334 37.8985 3.34078 37.8899 3.3445C37.886 3.34615 37.8835 3.34742 37.8822 3.34798L37.8814 3.34749L35.4006 4.42757L35.0972 1.74007L35.0977 1.73922C35.0976 1.73783 35.0971 1.73421 35.0965 1.72953L35.0628 1.47549C35.037 1.28961 34.9964 1.01054 34.9362 0.653673C34.8157 -0.0607892 34.6194 -1.08436 34.3211 -2.29843C33.7212 -4.73964 32.7219 -7.88854 31.1261 -10.8367C29.5253 -13.794 27.3942 -16.4201 24.5923 -18.0043C21.8501 -19.5547 18.2704 -20.2201 13.487 -18.9334C10.1931 -18.0474 7.81639 -16.5065 6.10617 -14.5401C4.38399 -12.5598 3.25128 -10.0465 2.61881 -7.09942C1.34183 -1.14859 2.16438 6.28737 3.95563 13.7297C5.736 21.1267 8.4183 28.3132 10.6674 33.669C11.7899 36.3421 12.8001 38.5487 13.5279 40.0837C13.7649 40.5837 13.9717 41.0123 14.1428 41.3623Z" stroke="#ADD1CB" strokeWidth="4" />
                    </svg>

                    <div className='relative z-[12]'>
                        <h3 className='text-[3rem] font-[700]'>Virtual Gift Card</h3>
                        <p className='mt-[1.5rem] font-[400] text-base'>Delivered by email, on a date of your choice</p>
                    </div>

                    <div className='relative z-[12] flex flex-col gap-y-[1rem] md:flex-row md:gap-x-[1rem]'>
                        <div className='w-[100%] md:w-[50%]'>
                            {
                                designImage && <div className=" w-full md:w-[70%] relative h-[15rem] mt-[2.5rem]">
                                    <NextImage
                                        src={designImage}
                                        width={40}
                                        height={40}
                                        unoptimized
                                        className="object-cover rounded w-full h-full"
                                        alt="Preview"
                                    />
                                </div>
                            }
                        </div>

                        <div className='w-full md:w-[50%] flex flex-col gap-y-[0.8rem]'>
                            <div className='w-full'>
                                <span className='font-[700] text-[1.25rem]'>Voucher Design</span>

                                <div className='w-full mt-[1rem] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                                    {voucherDesigns?.map((design) => (
                                        <div
                                            key={design.design_id}
                                            className={`cursor-pointer rounded-lg overflow-hidden transition-all ${voucherType === design.design_id
                                                ? 'border-[#E82989] ring-2 ring-[#E82989]'
                                                : 'border-gray-300'
                                                }`}
                                            onClick={() => {
                                                setSelectVoucherType(design.design_id);
                                                setDesignImage(design.url);
                                            }}
                                        >
                                            <NextImage
                                                src={design.url}
                                                width={300}
                                                height={180}
                                                className='object-cover w-full h-[5rem] rounded'
                                                unoptimized
                                                alt={design.name}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className='flex flex-col gap-y-[1rem] w-full'>
                                <span className='font-[700] text-[1.25rem]'>Amount:</span>

                                <div className='flex flex-col gap-y-[0.75rem] w-full'>
                                    <span className='font-[400] text-base'>Discount:</span>

                                    <Input
                                        type='number'
                                        placeholder='Discount'
                                        className='h-[2.5rem]'
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
                                            className='h-[2.5rem]'
                                            value={recipientName}
                                            onChange={e => setRecipientName(e.target.value)}
                                        />
                                    </div>

                                    <div className='flex flex-col gap-y-[0.75rem] w-full'>
                                        <span className='font-[400] text-base'>Recipient’s email address:</span>

                                        <div className='relative'>
                                            <Input
                                                placeholder='Email'
                                                className='pl-[2.5rem] h-[2.5rem]'
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
                                            className='h-[2.5rem]'
                                            value={senderName}
                                            onChange={e => setSenderName(e.target.value)}
                                        />
                                    </div>

                                    <div className='flex flex-col gap-y-[0.75rem] w-full'>
                                        <span className='font-[400] text-base'>Delivery date:</span>

                                        <Input
                                            type='date'
                                            placeholder='Email'
                                            className='pl-[2.5rem] h-[2.5rem]'
                                            value={deliveryDate}
                                            onChange={e => setDeliveryDate(e.target.value)}
                                        />
                                    </div>

                                </div>
                            </div>

                            <div className='flex flex-col gap-y-[1rem] w-full'>
                                <div className="flex justify-between flex-col md:grid gap-y-[1rem] grid-cols-2 items-center mb-[1.62rem] gap-x-[1.62rem] w-full">
                                    <div className='flex flex-col gap-y-[0.75rem] w-full'>
                                        <span className='font-[400]'>Enter your phone number:</span>

                                        <Input
                                            placeholder='Phone'
                                            className='h-[2.5rem]'
                                            value={phone}
                                            onChange={e => setPhone(e.target.value)}
                                        />
                                    </div>

                                    <div className='flex flex-col gap-y-[0.75rem] w-full'>
                                    </div>

                                </div>
                            </div>

                            <Textarea
                                placeholder='Message'
                                className='min-h-[10rem] w-full'
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                            />

                            <div className='flex flex-col gap-y-[0.75rem] w-full'>
                                <span className='font-[400]'>Set Expiration date:</span>
                                <Switch checked={expirationDateEnabled} onCheckedChange={setExpirationDateEnabled} />
                            </div>
                        </div>
                    </div>

                    <div className='w-full flex items-start gap-x-[2rem] mt-[2rem]'>
                        <Button
                            className='max-w-[10rem] bg-[#E82989] text-white w-full rounded-[0.75rem]'
                            onClick={handleCreate}
                        >
                            Create
                        </Button>

                        <Button className='max-w-[10rem] w-full rounded-[0.75rem] bg-white border border-black text-black'>
                            Cancel
                        </Button>
                    </div>
                </div>
            </DashboardLayout>
        </Navigation>
    )
}
