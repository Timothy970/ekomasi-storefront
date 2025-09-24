"use client"
import CategoryBanner from '@/components/CategoryBanner'
import Navigation from '@/components/Navigation'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { getCategoryAsync, selectCategory, selectPagination } from '@/lib/features/navigation/navigationSlice'
import { useParams } from 'next/navigation'
import ProductListingLayout from '@/components/ProductListingLayout'

export default function ProductCategory() {
    const category = useAppSelector(selectCategory)
    const dispatch = useAppDispatch()
    const params = useParams<{ id: string }>()
    const pagination = useAppSelector(selectPagination)

    useEffect(() => {
        if (params?.id) {
            dispatch(getCategoryAsync({ id: params.id, page: 1, size: 10 }));
        }
    }, [params?.id, dispatch]);

    const handlePrev = () => {
        if (pagination?.has_prev) {
            dispatch(
                getCategoryAsync({ id: params.id, page: pagination.page - 1, size: pagination.size })
            );
        }
    };

    const handleNext = () => {
        if (pagination?.has_next) {
            dispatch(
                getCategoryAsync({ id: params.id, page: pagination.page + 1, size: pagination.size })
            );
        }
    };

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
