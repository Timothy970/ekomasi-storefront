import React from 'react';
import { Button } from './ui/button';
import Image from 'next/image';

export default function TalkToUs() {
    return (
        <div className='w-full mx-auto flex justify-center items-center mt-[2rem] lg:mt-[2.5rem] py-14 bg-secondary-tenant text-amber-50/90'>
            <div className='max-w-[90rem] px-4 lg:px-[3rem] w-full md:flex md:flex-row-reverse gap-[3rem] items-center'>
                <div className='md:w-1/2'>
                    <div className="flex items-start justify-between gap-4 mb-6 w-full">
                        <div className='w-full'>
                            <h2 className="text-primary-tenant font-sans text-[0.8125rem] font-semibold tracking-[0.25rem] uppercase">
                                HAUTE PARFUMERIE CONCIERGE
                            </h2>
                            <p className="pt-2 text-white font-serif text-2xl lg:text-3xl font-bold leading-snug">
                                Find Your Signature Scent. Consult Our Master Perfumers.
                            </p>
                        </div>
                    </div>

                    <div className='mt-4'>
                        <div className="relative w-full h-[20rem] md:h-[24rem] lg:h-[28rem] rounded-xl overflow-hidden border border-primary-tenant/30 shadow-xl">
                            <Image
                                src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop"
                                alt="Artisanal Fragrance Flacon"
                                fill
                                unoptimized
                                style={{ objectFit: 'cover' }}
                                priority
                            />
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-5 mt-6 md:w-1/2'>
                    <div className="relative w-full h-[20rem] md:h-[24rem] lg:h-[28rem] rounded-xl overflow-hidden border border-primary-tenant/30 shadow-xl">
                        <Image
                            src="https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=1200&auto=format&fit=crop"
                            alt="Fragrance Blending Botanical Ingredients"
                            fill
                            style={{ objectFit: 'cover' }}
                            priority
                            unoptimized
                        />
                    </div>
                    <p className='text-secondary-foreground/80 font-sans text-[0.9375rem] font-normal leading-relaxed'>
                        Fragrance is the most intimate form of self-expression. Unsure which accords harmonise with your body chemistry? Connect with our master sommeliers for a private olfactory consultation and curated discovery set tailored exclusively to your taste.
                    </p>
                    <Button className='max-w-[14rem] w-full text-primary-foreground font-sans text-[0.875rem] font-bold tracking-wider uppercase bg-primary-tenant hover:opacity-90 h-[2.75rem] rounded-full shadow-lg'>
                        Book Scent Session
                    </Button>
                </div>
            </div>
        </div>
    );
}
