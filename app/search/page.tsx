"use client"
import Navigation from '@/components/Navigation'
import { getSearchResultsAsync, selectPagination, selectSearchResults } from '@/lib/features/mall/mallSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import React, { useEffect } from 'react'
import { useSearchParams } from "next/navigation";
import ProductListingLayout from '@/components/ProductListingLayout'

export default function search() {
    const dispatch = useAppDispatch()
    const searchParams = useSearchParams();
    const products = useAppSelector(selectSearchResults)
    const pagination = useAppSelector(selectPagination)

    useEffect(() => {
        const query = searchParams.toString();
        if (query) {
            dispatch(getSearchResultsAsync({ query }));
        }
    }, [searchParams, dispatch]);

    const handlePrev = () => {
        if (pagination?.has_prev) {
            const query = new URLSearchParams(searchParams);
            query.set("page", String(pagination.page - 1));
            query.set("size", String(pagination.size));

            dispatch(getSearchResultsAsync({ query: query.toString() }));
        }
    };

    const handleNext = () => {
        if (pagination?.has_next) {
            const query = new URLSearchParams(searchParams);
            query.set("page", String(pagination.page + 1));
            query.set("size", String(pagination.size));
            dispatch(getSearchResultsAsync({ query: query.toString() }));
        }
    };

    return (
        <Navigation>
            {
                products && pagination && <ProductListingLayout
                    listingDescription={""}
                    listingName={""}
                    products={products}
                    pagination={pagination}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                />
            }
        </Navigation>
    )
}
