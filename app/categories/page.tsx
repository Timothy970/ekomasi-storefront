"use client"
import Navigation from '@/components/Navigation'
import { getSearchResultsAsync, selectPagination, selectSearchResults, selectStatus } from '@/lib/features/mall/mallSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProductListingLayout from '@/components/ProductListingLayout'
import { useFilterQuery } from '../ClientLayout'
import { Crumb } from '@/lib/features/types'

export default function categories() {
    const dispatch = useAppDispatch()
    const searchParams = useSearchParams();
    const products = useAppSelector(selectSearchResults)
    const pagination = useAppSelector(selectPagination)
    const { query, setQuery } = useFilterQuery()
    const [breadCrumb, setBreadCrumb] = useState<Crumb[]>([])
    const status = useAppSelector(selectStatus)
    const pathname = usePathname();
    const router = useRouter()

    useEffect(() => {
        let crumbs = []

        crumbs?.push({
            link: ``,
            name: "Categories"
        })
        
        setBreadCrumb(crumbs)
    }, [])

    useEffect(() => {
        const formattedQuery = query.startsWith("?") ? query : `?${query}`;
        dispatch(getSearchResultsAsync({ query: formattedQuery }));
        dispatch(getSearchResultsAsync({ query: formattedQuery }));

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
                <ProductListingLayout
                    listingDescription={""}
                    listingName={"Categories"}
                    products={products ?? []}
                    pagination={pagination}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    crumbs={breadCrumb}
                    status={status}
                />
            }
        </Navigation>
    )
}
