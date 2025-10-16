"use client"
import Navigation from '@/components/Navigation'
import { getSearchResultsAsync, selectPagination, selectSearchResults, selectStatus } from '@/lib/features/mall/mallSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProductListingLayout from '@/components/ProductListingLayout'
import { useFilterQuery } from '../ClientLayout'
import { Crumb } from '@/lib/features/types'
import { triggerToast } from '../utils/toastUtils'

export default function search() {
    const dispatch = useAppDispatch()
    const searchParams = useSearchParams();
    const products = useAppSelector(selectSearchResults)
    const pagination = useAppSelector(selectPagination)
    const { query, setQuery } = useFilterQuery()
    const [breadCrumb, setBreadCrumb] = useState<Crumb[]>([])
    const status = useAppSelector(selectStatus)
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        let crumbs = []

        crumbs?.push({
            link: ``,
            name: "Search"
        })
        setBreadCrumb(crumbs)

    }, [])

    useEffect(() => {
        const formattedQuery = query.startsWith("?") ? query : `?${query}`
        dispatch(getSearchResultsAsync({ query: formattedQuery }));

        const newUrl = `${pathname}${formattedQuery}`
        router.replace(newUrl, { scroll: false })

    }, [query, dispatch])

    useEffect(() => {
        const sp = searchParams.toString();
        if (sp !== query) {
            setQuery(sp);
        }
    }, [searchParams]);

    const updateQueryParam = (param: string, value: string | number) => {
        const searchParams = new URLSearchParams(query.startsWith("?") ? query.slice(1) : query)
        searchParams.set(param, value.toString())
        return `?${searchParams.toString()}`
    }

    const handlePrev = () => {
        if (pagination?.has_prev) {
            const newPage = pagination.page - 1
            const updatedQuery = updateQueryParam("page", newPage)
            setQuery(updatedQuery)
        } else {
            triggerToast("You are already on the first page.", "info");
        }
    }

    const handleNext = () => {
        if (pagination?.has_next) {
            const newPage = pagination.page + 1
            const updatedQuery = updateQueryParam("page", newPage)
            setQuery(updatedQuery)
        } else {
            triggerToast("No more products to display.", "info");
        }
    }

    return (
        <Navigation>
            {
                <ProductListingLayout
                    listingDescription={""}
                    listingName={"Search"}
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
