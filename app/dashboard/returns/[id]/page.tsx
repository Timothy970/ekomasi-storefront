"use client";
import Navigation from '@/components/Navigation';
import { getReturnAsync, selectReturn } from '@/lib/features/returns/returnSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Return() {
    const params = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const returnData = useAppSelector(selectReturn);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (params?.id) {
            dispatch(getReturnAsync(params.id))
                .unwrap()
                .catch(() => setError(true))
                .finally(() => setLoading(false));
        } else {
            setError(true);
            setLoading(false);
        }
    }, [params?.id, dispatch]);

    if (loading) {
        return (
            <Navigation>
                <div className="w-full flex justify-center items-center min-h-[50vh]">
                    <p className="text-base">Loading your return details...</p>
                </div>
            </Navigation>
        );
    }

    if (error || !returnData) {
        return (
            <Navigation>
                <div className="w-full flex flex-col justify-center items-center min-h-[50vh] text-center px-4">
                    <h2 className="text-xl font-semibold">Return Not Found</h2>
                    <p className="text-gray-600 mt-2">
                        We couldn't find your return. Please check your link or contact support.
                    </p>
                </div>
            </Navigation>
        );
    }

    const renderStatusBanner = () => {
        if (returnData.status === "Rejected") {
            return (
                <div className="w-full flex items-center justify-center bg-[#FF3B308F]">
                    <div className="flex justify-center items-center gap-x-[1rem] font-medium py-[0.75rem]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="12" viewBox="0 0 15 12" fill="none">
                            <path
                                d="M4.99997 8.58597L1.70697 5.29297L0.292969 6.70697L4.99997 11.414L14.707 1.70697L13.293 0.292969L4.99997 8.58597Z"
                                fill="black"
                            />
                        </svg>
                        <p className="text-[0.875rem]">Your Return Request Was Rejected.</p>
                    </div>
                </div>
            );
        }

        if (returnData.status === "Pending") {
            return (
                <div className="w-full flex items-center justify-center bg-[#FFA5008F]">
                    <div className="flex justify-center items-center gap-x-[1rem] font-medium py-[0.75rem]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="12" viewBox="0 0 15 12" fill="none">
                            <path
                                d="M4.99997 8.58597L1.70697 5.29297L0.292969 6.70697L4.99997 11.414L14.707 1.70697L13.293 0.292969L4.99997 8.58597Z"
                                fill="black"
                            />
                        </svg>
                        <p className="text-[0.875rem]">Your Return Request Is Pending Review.</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="w-full flex items-center justify-center bg-[rgba(52,199,89,0.58)]">
                <div className="flex justify-center items-center gap-x-[1rem] font-medium py-[0.75rem]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="12" viewBox="0 0 15 12" fill="none">
                        <path
                            d="M4.99997 8.58597L1.70697 5.29297L0.292969 6.70697L4.99997 11.414L14.707 1.70697L13.293 0.292969L4.99997 8.58597Z"
                            fill="black"
                        />
                    </svg>
                    <p className="text-[0.875rem]">Your Return Request Was Successfully Approved.</p>
                </div>
            </div>
        );
    };

    return (
        <Navigation>
            <div className="max-w-[90rem] w-full mx-auto flex flex-col items-center justify-center mb-[2rem] md:mb-[2.5rem] mt-[2rem]">
                {renderStatusBanner()}

                <div className="w-full flex items-center flex-col mt-[1rem] lg:mt-[2.5rem]">

                    <h2 className="text-[1.125rem] lg:text-[1.5rem] font-bold mt-[1rem]">Return Details</h2>

                    <div className="flex flex-col items-center mt-[0.5rem] gap-y-[0.5rem]">
                        <div className="flex text-custom-black gap-x-[0.5rem]">
                            <span className="font-medium text-base lg:text-[1.125rem]">Your return:</span>
                            <span className="font-medium text-[1.125rem]">{returnData.return_id}</span>
                        </div>

                        <div className="flex text-custom-black items-center justify-center gap-x-[0.5rem] text-[1.125rem]">
                            <span className="font-medium text-[0.875rem]">Return Date:</span>
                            <span>{new Date(returnData.created_at).toLocaleDateString()}</span>
                        </div>

                        <div className="flex text-custom-black gap-x-[0.5rem]">
                            <span className="font-medium">Total Refund:</span>
                            <p className="uppercase font-medium">
                                {"KES " + new Intl.NumberFormat("en-KE", { minimumFractionDigits: 0 }).format(returnData.total_refund ?? 0)}
                            </p>
                        </div>
                    </div>
                </div>
                <div className='mt-[2rem] md:mt-[2.5rem] w-full px-[1rem] lg:px-[3rem] flex flex-col md:flex-row md:justify-between'>
                    <div className='w-full md:w-[50%]'>
                        <h2 className='font-bold text-[1.5rem] mt-[1rem]'>Return Items</h2>
                        <div className='w-full flex flex-col gap-y-[0.5rem] mt-[1.5rem]'>
                            {
                                returnData?.products?.map((item, index) => {

                                    return <div key={index?.toString()} className='gap-x-[0.75rem] w-full flex pb-[1.5rem] md:gap-x-[2rem] justify-start items-start border-b border-[rgba(0,0,0,0.40)]'>
                                        {
                                            item?.urls &&
                                            <div className="relative w-1/3 h-[13.5rem] min-w-[9rem] max-w-[6rem] max-h-[9rem] md:min-w-[12rem] md:max-w-[12rem] md:max-h-[12rem] flex-shrink-0">
                                                <Image
                                                    src={item?.urls[0]?.url}
                                                    alt={''}
                                                    fill
                                                    unoptimized
                                                    className="object-cover h-full w-full"
                                                />
                                            </div>
                                        }

                                        <div className='w-[60%] flex flex-col gap-y-[0.5rem]'>
                                            <div className='flex text-custom-black gap-x-[0.5rem]'>
                                                <span className='uppercase font-medium'>
                                                    {"KES " + new Intl.NumberFormat("en-KE", {
                                                        minimumFractionDigits: 0,
                                                    }).format(item?.price ?? 0)}
                                                </span>
                                            </div>

                                            <span className='text-[1.125rem] font-semibold capitalize'>{item?.name}</span>

                                            <div className='flex flex-row w-full gap-x-[0.5rem]'>
                                                <span className='text-[1.125rem]'>Qty:</span>
                                                <span className='text-[1.125rem] font-light'>{item?.stock_quantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }

                        </div>
                    </div>
                </div>
            </div>
        </Navigation>
    );
}
