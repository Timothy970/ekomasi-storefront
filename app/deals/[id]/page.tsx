"use client"
import Navigation from '@/components/Navigation'
import { selectPagination } from '@/lib/features/mall/mallSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import React, { useEffect, useState } from 'react'
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useFilterQuery } from '../../ClientLayout'
import { Crumb } from '@/lib/features/types'
import DealsProductListing from '@/components/DealsProductListing'
import { getDealByIdAsync, selectDeal, selectDealStatus } from '@/lib/features/navigation/navigationSlice'

export default function Deals() {
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const pagination = useAppSelector(selectPagination);
    const { query, setQuery } = useFilterQuery();
    const [breadCrumb, setBreadCrumb] = useState<Crumb[]>([]);
    const dealStatus = useAppSelector(selectDealStatus);
    const pathname = usePathname();
    const router = useRouter();
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
        const formattedQuery = query.startsWith("?") ? query : `?${query}`;
        if (params?.id) {
            dispatch(getDealByIdAsync(params?.id));
        }

        const newUrl = `${pathname}${formattedQuery}`
        router.replace(newUrl, { scroll: false })
    }, [query, dispatch]);

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
            {
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
            }
        </Navigation>
    )
}
