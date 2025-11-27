import { Dot } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Returns } from '@/lib/features/types';
import moment from "moment";

interface DashboardReturnsProps {
    returns: Returns[];
}

export default function DashboardReturns({ returns }: DashboardReturnsProps) {
    if (!returns || returns.length === 0) {
        return <p className="text-sm text-gray-500">No returns to display.</p>;
    }

    return (
        <div className=" flex flex-col items-start justify-start">
            {returns.map((returnItem) => {
                const firstItem = returnItem?.products[0];

                return (
                    <div key={returnItem?.return_id} className="overflow-hidden cursor-pointer w-full py-[2rem] flex flex-row border-b border-[rgba(0,0,0,0.40)] gap-x-[0.5rem]">
                        {
                            firstItem?.urls && <div className="relative w-1/3 h-[13.5rem] min-w-[6rem] max-w-[6rem] max-h-[6rem] md:min-w-[9rem] md:max-w-[9rem] md:max-h-[9rem] flex-shrink-0">
                                <Image
                                    src={firstItem?.urls[0]?.url}
                                    alt={''}
                                    fill
                                    unoptimized
                                    className="object-cover h-full w-full"
                                />
                            </div>
                        }

                        <div className="flex w-full flex-col pl-4 lg:flex-row">
                            <div className="flex-1 flex flex-col gap-y-[0.88rem]">
                                <h3 className="truncate text-custom-black text-wrap font-roboto font-[700] text-base md:text-[1.125rem] leading-6 capitalize pt-[1rem]">
                                    {firstItem?.name}
                                </h3>

                                <p className="font-poppins text-[0.875rem] md:text-base font-[400] leading-[1.3rem] mt-1 line-clamp-2 capitalize">
                                    Return {returnItem?.return_id}
                                </p>

                                <div className="gap-x-[0.5rem] flex flex-col gap-y-[0.5rem] md:items-center md:flex-row justify-start">
                                    <p className="md:text-[0.875rem] text-[0.5rem] font-[400]">
                                        <span>On {moment(returnItem.created_at).format("YYYY-MM-DD")}</span>
                                    </p>

                                    <Dot className="hidden md:block" />

                                    <div className="px-[0.5rem] py-[0.5rem] bg-[#EEE] w-fit self-start md:self-auto">
                                        <span className="text-custom-black text-[0.5rem] md:text-[0.875rem] font-[400]">
                                            {returnItem.status.charAt(0).toUpperCase() + returnItem.status.slice(1)}
                                        </span>
                                    </div>
                                </div>

                                <Link href={`/dashboard/returns/${returnItem.return_id}`} className="flex items-center justify-start md:gap-x-[0.75rem] gap-x-[0.54rem] min-h-[2.5rem]">
                                    <span className="text-[#AF52DE] text-[0.5rem] md:text-[0.875rem] text-base">See details</span>

                                    <div className='h-[1.5rem] w-[1.5rem] flex items-center justify-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
                                            <path d="M1.70697 11.4492L7.41397 5.74216L1.70697 0.0351562L0.292969 1.44916L4.58597 5.74216L0.292969 10.0352L1.70697 11.4492Z" fill="black" />
                                        </svg>
                                    </div>
                                </Link>
                            </div>

                        </div>
                    </div>
                );
            })}
        </div>
    );
}
