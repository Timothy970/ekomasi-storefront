"use client"
import CategoryBanner from '@/components/CategoryBanner'
import Navigation from '@/components/Navigation'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { getCategoryAsync, selectCategory, selectPagination } from '@/lib/features/navigation/navigationSlice'
import { useParams } from 'next/navigation'
import ProductListingLayout from '@/components/ProductListingLayout'
import { useFilterQuery } from '@/app/ClientLayout'

export default function ProductCategory() {
    const category = useAppSelector(selectCategory)
    const dispatch = useAppDispatch()
    const params = useParams<{ id: string }>()
    const pagination = useAppSelector(selectPagination)
    const { query, setQuery } = useFilterQuery()

    useEffect(() => {
        if (params?.id) {
            dispatch(getCategoryAsync({ id: params.id, query }))
        }
    }, [params?.id, query, dispatch])
    console.log(query, 'queryyy')

    const handlePrev = () => {
        if (pagination?.has_prev) {
            const newQuery = new URLSearchParams(query)
            newQuery.set('page', String(pagination.page - 1))
            newQuery.set('size', String(pagination.size))
            setQuery(newQuery.toString())
        }
    }

    const handleNext = () => {
        if (pagination?.has_next) {
            const newQuery = new URLSearchParams(query)
            newQuery.set('page', String(pagination.page + 1))
            newQuery.set('size', String(pagination.size))
            setQuery(newQuery.toString())
        }
    }

    return (
        <Navigation>
            {
                category?.image_url && <CategoryBanner imageUrl={category?.image_url} />
            }
            {
                category?.products && pagination && <ProductListingLayout
                    listingDescription={category?.description}
                    listingName={category?.name}
                    products={category?.products}
                    pagination={pagination}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                />
            }
        </Navigation>
    )
}
