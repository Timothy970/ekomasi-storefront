"use client"
import Navigation from '@/components/Navigation'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { getSubCategoryAsync, selectPagination, selectSubCategory } from '@/lib/features/navigation/navigationSlice'
import CategoryBanner from '@/components/CategoryBanner'
import ProductListingLayout from '@/components/ProductListingLayout'
import { useFilterQuery } from '@/app/ClientLayout'
import { Crumb } from '@/lib/features/types'
import { customeParser } from '@/lib/utils'

export default function SubCategory() {
    const params = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const pagination = useAppSelector(selectPagination)
    const subCategory = useAppSelector(selectSubCategory)
    const { query, setQuery } = useFilterQuery()
    const [breadCrumb, setBreadCrumb] = useState<Crumb[]>([])

    useEffect(() => {
        if (subCategory) {
            let crumbs = [
                {
                    link: `/category/${subCategory?.parent_id}`,
                    name: 'Category'
                }
            ]
            crumbs?.push({
                link: '',
                name: subCategory?.name
            })
            setBreadCrumb(crumbs)
        }

    }, [subCategory])

    useEffect(() => {
        if (params?.id) {
            const initialQuery = "?size=10&page=1"
            setQuery(initialQuery)
            dispatch(getSubCategoryAsync({ id: params.id, query: initialQuery }))
        }
    }, [params?.id, dispatch])

    useEffect(() => {
        if (params?.id) {
            dispatch(getSubCategoryAsync({ id: params.id, query }))
        }
    }, [params?.id, query, dispatch])

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
                subCategory?.image_url && <CategoryBanner
                    title={subCategory?.name}
                    description={subCategory?.description}
                    imageUrl={subCategory?.parent_category_image_url}
                />
            }

            {
                subCategory?.products && pagination && <ProductListingLayout
                    listingDescription={customeParser(subCategory?.description)}
                    listingName={subCategory?.name}
                    products={subCategory?.products}
                    pagination={pagination}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    crumbs={breadCrumb}
                />
            }
        </Navigation>
    )
}
