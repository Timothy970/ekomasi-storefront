"use client"
import Navigation from '@/components/Navigation'
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { getSubCategoryAsync, selectPagination, selectSubCategory } from '@/lib/features/navigation/navigationSlice'
import CategoryBanner from '@/components/CategoryBanner'
import ProductListingLayout from '@/components/ProductListingLayout'

export default function SubCategory() {
    const params = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const pagination = useAppSelector(selectPagination)
    const subCategory = useAppSelector(selectSubCategory)

    useEffect(() => {
        if (params?.id) {
            dispatch(getSubCategoryAsync({ id: params.id, page: 1, size: 10 }));
        }
    }, [params?.id, dispatch]);

    const handlePrev = () => {
        if (pagination?.has_prev) {
            dispatch(
                getSubCategoryAsync({ id: params.id, page: pagination.page - 1, size: pagination.size })
            );
        }
    };

    const handleNext = () => {
        if (pagination?.has_next) {
            dispatch(
                getSubCategoryAsync({ id: params.id, page: pagination.page + 1, size: pagination.size })
            );
        }
    };

    return (
        <Navigation>
            {
                subCategory?.image_url && <CategoryBanner imageUrl={subCategory?.parent_category_image_url} />
            }

            {
                subCategory?.products  && pagination && <ProductListingLayout
                    listingDescription={subCategory?.description}
                    listingName={subCategory?.name}
                    products={subCategory?.products }
                    pagination={pagination}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                />
            }
        </Navigation>
    )
}
