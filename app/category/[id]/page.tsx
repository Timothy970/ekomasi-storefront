"use client"
import CategoryBanner from '@/components/CategoryBanner'
import Navigation from '@/components/Navigation'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { getCategoryAsync, selectCategory, selectPagination, selectStatus } from '@/lib/features/navigation/navigationSlice'
import { useParams, usePathname, useRouter } from 'next/navigation'
import ProductListingLayout from '@/components/ProductListingLayout'
import { useFilterQuery } from '@/app/ClientLayout'
import { Crumb } from '@/lib/features/types'
import { customeParser } from '@/lib/utils'
import { triggerToast } from '@/app/utils/toastUtils'

export default function ProductCategory() {
    const category = useAppSelector(selectCategory)
    const dispatch = useAppDispatch()
    const params = useParams<{ id: string }>()
    const pagination = useAppSelector(selectPagination)
    const { query, setQuery } = useFilterQuery()
    const [breadCrumb, setBreadCrumb] = useState<Crumb[]>([])
    const router = useRouter()
    const pathname = usePathname()
    const status = useAppSelector(selectStatus)

    useEffect(() => {
        if (category) {
            let crumbs = []

            crumbs?.push({
                link: '',
                name: category?.name
            })
            setBreadCrumb(crumbs)
        }

    }, [category])

    useEffect(() => {
        if (params?.id) {
            const formattedQuery = query.startsWith("?") ? query : `?${query}`
            dispatch(getCategoryAsync({ id: params.id, query: formattedQuery }))

            const newUrl = `${pathname}${formattedQuery}`
            router.replace(newUrl, { scroll: false })
        }
    }, [params?.id, query, dispatch])

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
                category?.image_url && <CategoryBanner title={category?.name} description={category?.description} imageUrl={category?.image_url} />
            }
            {
                category?.products && pagination && <ProductListingLayout
                    listingDescription={customeParser(category?.description)}
                    listingName={category?.name}
                    products={category?.products}
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
