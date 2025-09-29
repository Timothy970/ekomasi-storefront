"use client"
import Navigation from '@/components/Navigation'
import React, { useEffect, useState } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation'
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
    const router = useRouter()
    const pathname = usePathname()

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

            const formattedQuery = query.startsWith("?") ? query : `?${query}`

            const newUrl = `${pathname}${formattedQuery}`
            router.replace(newUrl, { scroll: false })
        }
    }, [params?.id, query, dispatch])

    const handlePrev = () => {
        if (pagination?.has_prev) {
            const newPage = pagination.page - 1
            setQuery(`?size=${pagination.size}&page=${newPage}`)
        }
    }

    const handleNext = () => {
        if (pagination?.has_next) {
            const newPage = pagination.page + 1
            setQuery(`?size=${pagination.size}&page=${newPage}`)
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
