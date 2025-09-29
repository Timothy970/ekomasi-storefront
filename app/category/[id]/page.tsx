"use client"
import CategoryBanner from '@/components/CategoryBanner'
import Navigation from '@/components/Navigation'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { getCategoryAsync, selectCategory, selectPagination } from '@/lib/features/navigation/navigationSlice'
import { useParams } from 'next/navigation'
import ProductListingLayout from '@/components/ProductListingLayout'
import { useFilterQuery } from '@/app/ClientLayout'
import { Crumb } from '@/lib/features/types'
import { customeParser } from '@/lib/utils'

export default function ProductCategory() {
    const category = useAppSelector(selectCategory)
    const dispatch = useAppDispatch()
    const params = useParams<{ id: string }>()
    const pagination = useAppSelector(selectPagination)
    const { query, setQuery } = useFilterQuery()
    const [breadCrumb, setBreadCrumb] = useState<Crumb[]>([])

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
            const initialQuery = "?size=10&page=1"
            setQuery(initialQuery)
            dispatch(getCategoryAsync({ id: params.id, query: initialQuery }))
        }
    }, [params?.id, dispatch])

    useEffect(() => {
        if (params?.id) {
            dispatch(getCategoryAsync({ id: params.id, query }))
        }
    }, [query, params?.id, dispatch])

    const handlePrev = () => {
        if (pagination?.has_prev) {
            const newQuery = new URLSearchParams(query.startsWith("?") ? query.slice(1) : query)
            newQuery.set('page', String(pagination.page - 1))
            newQuery.set('size', String(pagination.size))
            setQuery("?" + newQuery.toString())
        }
    }

    const handleNext = () => {
        if (pagination?.has_next) {
            const newQuery = new URLSearchParams(query.startsWith("?") ? query.slice(1) : query)
            newQuery.set('page', String(pagination.page + 1))
            newQuery.set('size', String(pagination.size))
            setQuery("?" + newQuery.toString())
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
                />
            }
        </Navigation>
    )
}
