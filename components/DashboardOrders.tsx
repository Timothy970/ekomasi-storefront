import { Dot } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const orders = [1, 2, 3]

export default function DashboardOrders() {
    const router = useRouter()
    
    return (
        <div className="w-full flex flex-col items-start justify-start space-y-4">
            {orders?.map((item, index) => {
                return (
                    <div key={index} className="overflow-hidden cursor-pointer w-full flex flex-row border-b border-[rgba(0,0,0,0.40)] gap-x-[0.5rem]">
                        <div className="relative w-1/3 h-[13.5rem] md:h-[20rem] max-h-[25rem] flex-shrink-0">
                            <Image
                                src={
                                    'https://images.unsplash.com/photo-1612722432474-b971cdcea546?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                                }
                                alt=""
                                fill
                                className="object-cover max-h-[70%] sm:max-h-[80%] md:max-h-[70%] lg:max-h-[80%]"
                            />
                        </div>

                        <div className="flex w-full flex-col pl-4 lg:flex-row">
                            <div className='flex-1 flex flex-col gap-y-[0.88rem]'>
                                <h3 className="truncate text-custom-black font-roboto text-[1.125rem] font-bold leading-6 capitalize pt-[1rem]">
                                    Jogger Stroller - XCEL-R8
                                </h3>

                                <p className="font-poppins text-sm leading-[1.3rem] mt-1 line-clamp-2 capitalize">
                                    Order 376517596
                                </p>

                                <div className='gap-x-[0.5rem] flex items-center justify-start'>
                                    <p className='text-[0.875rem] font-bold'>On 09-11-2024</p>
                                    <Dot />
                                    <span className='text-[#34C759]'>Delivered</span>
                                </div>

                                <Link href="" className='flex items-center justify-start gap-x-[1rem]'>
                                    <span className='text-[#AF52DE]'>See details</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
                                        <path d="M1.70697 11.4492L7.41397 5.74216L1.70697 0.0351562L0.292969 1.44916L4.58597 5.74216L0.292969 10.0352L1.70697 11.4492Z" fill="black" />
                                    </svg>
                                </Link>
                            </div>

                            <Button className='w-[6rem] h-[2rem] text-[0.875rem] my-[1rem]'>Reorder</Button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
