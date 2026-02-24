"use client"
import Navigation from '@/components/Navigation'
import { selectPagination } from '@/lib/features/mall/mallSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from "next/navigation";
import { useFilterQuery } from '../../ClientLayout'
import { Crumb } from '@/lib/features/types'
import DealsProductListing from '@/components/DealsProductListing'
import { getDealByIdAsync, selectDeal, selectDealStatus } from '@/lib/features/navigation/navigationSlice'
import CountdownTimer from '@/components/CountdownTimer'
import Image from 'next/image'
import NoImage from '@/components/NoImage'

export default function Deals() {
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const pagination = useAppSelector(selectPagination);
    const { query, setQuery } = useFilterQuery();
    const [breadCrumb, setBreadCrumb] = useState<Crumb[]>([]);
    const dealStatus = useAppSelector(selectDealStatus);
    const params = useParams<{ id: string }>();
    const deal = useAppSelector(selectDeal)

    useEffect(() => {
        let crumbs = []

        crumbs?.push({
            link: ``,
            name: "Flash Deals"
        })

        setBreadCrumb(crumbs)
    }, [])

    useEffect(() => {
        if (params?.id) {
            dispatch(getDealByIdAsync(params?.id));
        }
    }, [dispatch]);

    useEffect(() => {
        const sp = searchParams.toString();

        if (sp !== query) {
            setQuery(sp);
        }
    }, [searchParams]);

    const handlePrev = () => {
        if (pagination?.has_prev) {
            const newQuery = new URLSearchParams(query.startsWith("?") ? query.slice(1) : query);
            newQuery.set('page', String(pagination.page - 1));
            newQuery.set('size', String(pagination.size));
            setQuery(`?${newQuery.toString()}`);
        }
    };

    const handleNext = () => {
        if (pagination?.has_next) {
            const newQuery = new URLSearchParams(query.startsWith("?") ? query.slice(1) : query);
            newQuery.set('page', String(pagination.page + 1));
            newQuery.set('size', String(pagination.size));
            setQuery(`?${newQuery.toString()}`);
        }
    };

    return (
        <Navigation>
            <div className='w-full'>
                {deal?.deals?.end_date && (
                    <div className="relative w-full mx-auto overflow-hidden h-[12rem] md:h-[10rem] z-0">
                        {deal.deals.image ? (
                            <Image
                                src={deal.deals.image}
                                alt={deal.deals.name || "Deal image"}
                                fill
                                priority
                                unoptimized
                                className="object-cover z-0"
                                style={{ objectFit: 'cover' }}
                            />
                        ) : (
                            <NoImage />
                        )}
                        {/* Overlay for better contrast */}
                        <div className="absolute inset-0 bg-black/60 z-10" />
                        {/* Centered content */}
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4">
                            <p className='text-sm uppercase tracking-widest font-medium opacity-80 text-[#e8298a] text-center'>Offer ends in:</p>
                            <CountdownTimer endDate={deal.deals.end_date} />
                        </div>
                    </div>
                )}
                <DealsProductListing
                    listingDescription={""}
                    listingName={deal?.deals?.name ?? ""}
                    products={deal?.deals?.products ?? []}
                    pagination={deal?.pagination ?? null}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    crumbs={breadCrumb}
                    status={dealStatus}
                    page="deals"
                />
            </div>
        </Navigation>
    )
}
