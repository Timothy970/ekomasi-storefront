"use client"
import Navigation from '@/components/Navigation'
import { getSearchResultsAsync, selectPagination, selectSearchResults } from '@/lib/features/mall/mallSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import React, { useEffect } from 'react'
import { useSearchParams } from "next/navigation";
import ProductListingLayout from '@/components/ProductListingLayout'
import { useFilterQuery } from '../ClientLayout'

export default function search() {
    const dispatch = useAppDispatch()
    const searchParams = useSearchParams();
    const products = useAppSelector(selectSearchResults)
    const pagination = useAppSelector(selectPagination)
    const { query, setQuery } = useFilterQuery()

    useEffect(() => {
        if (query) {
            dispatch(getSearchResultsAsync({ query }));
        }
    }, [query, dispatch]);

    useEffect(() => {
        const sp = searchParams.toString();
        if (sp !== query) {
            setQuery(sp);
        }
    }, [searchParams]);

    const handlePrev = () => {
        if (pagination?.has_prev) {
            const newQuery = new URLSearchParams(query);
            newQuery.set('page', String(pagination.page - 1));
            newQuery.set('size', String(pagination.size));
            setQuery(newQuery.toString());
        }
    };

    const handleNext = () => {
        if (pagination?.has_next) {
            const newQuery = new URLSearchParams(query);
            newQuery.set('page', String(pagination.page + 1));
            newQuery.set('size', String(pagination.size));
            setQuery(newQuery.toString());
        }
    };

    return (
        <Navigation>
            {
                products && pagination && <ProductListingLayout
                    listingDescription={""}
                    listingName={"Search"}
                    products={products}
                    pagination={pagination}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                />
            }
        </Navigation>
    )
}
