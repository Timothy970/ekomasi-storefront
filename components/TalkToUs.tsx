import React from 'react';
import { Button } from './ui/button';
import Image from 'next/image';

export default function TalkToUs() {
    return (
        <div className='w-full max-w-[90rem] mx-auto flex justify-center items-center mt-[2rem] lg:mt-[2.5rem] py-12 bg-[rgba(148,35,117,0.08)]'>
            <div className='max-w-[90rem] px-4 lg:px-[3rem] w-full md:flex md:flex-row-reverse gap-[3rem]'>
                <div className='md:w-1/2'>
                    <div className="flex items-start justify-between gap-4 mb-8 w-full">
                        <div className='w-full'>
                            <h2 className="text-[#444] font-roboto text-[0.875rem] font-semibold leading-[1.5rem] tracking-[0.16rem]">
                                NURSERY
                            </h2>
                            <p className="pt-3 text-[#682B89] font-comfortaa text-2xl font-bold leading-[2.1rem]">
                                Need Help Designing Your Dream Nursery? Talk to Our Experts
                            </p>
                        </div>
                    </div>

                    <div className='mt-4'>
                        <div className="relative w-full h-[20rem] md:h-[25rem] lg:h-[30rem]">
                            <Image
                                src="/images/nursery-right.jpg"
                                alt="Nursery Right"
                                fill
                                style={{ objectFit: 'cover' }}
                                priority
                            />
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-6 mt-6 md:w-1/2'>
                    <div className="relative w-full h-[20rem] md:h-[25rem] lg:h-[30rem]">
                        <Image
                            src="/images/nursery-left.png"
                            alt="Nursery Left"
                            fill
                            style={{ objectFit: 'cover' }}
                            priority
                        />
                    </div>
                    <p className='text-custom-black font-poppins text-[0.875rem] font-normal leading-[1.95rem]'>
                        Feeling overwhelmed by nursery design? Let us help you create the perfect space for your baby with expert guidance tailored to your needs. Enjoy a free consultation, redeemable with any purchase, and transform your dream nursery into a reality!
                    </p>
                    <Button className='max-w-[8rem] w-full text-white font-poppins text-[0.875rem] font-bold leading-[1.5rem] bg-[#9333EA] h-[2rem]'>
                        Talk to us
                    </Button>
                </div>
            </div>
        </div>
    );
}
