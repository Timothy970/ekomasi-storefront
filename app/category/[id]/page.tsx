"use client"
import Breadcrumb from '@/components/BreadCrumb'
import CategoryBanner from '@/components/CategoryBanner'
import CategoryProducts from '@/components/CategoryProducts'
import Navigation from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import { useFilter } from '@/app/ClientLayout';
import CategoryFilter from '@/components/CategoryFilter'
import { FilterSortBy } from '@/components/FilterSortBy'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { getCategoryAsync, selectCategory, selectMeta } from '@/lib/features/navigation/navigationSlice'
import { useParams } from 'next/navigation'
import { Pagination } from '@/components/Pagination'

export default function ProductCategory() {
    const { openFilterModal, setOpenFilterModal } = useFilter()
    const category = useAppSelector(selectCategory)
    const dispatch = useAppDispatch()
    const params = useParams<{ id: string }>()
    const meta = useAppSelector(selectMeta)

    useEffect(() => {
        if (params?.id) {
            dispatch(getCategoryAsync({ id: params.id, page: 1, size: 10 }));
        }
    }, [params?.id, dispatch]);

    const handlePrev = () => {
        if (meta?.has_prev) {
            dispatch(
                getCategoryAsync({ id: params.id, page: meta.page - 1, size: meta.size })
            );
        }
    };

    const handleNext = () => {
        if (meta?.has_next) {
            dispatch(
                getCategoryAsync({ id: params.id, page: meta.page + 1, size: meta.size })
            );
        }
    };

    return (
        <Navigation>
            {
                category?.image_url && <CategoryBanner imageUrl={category?.image_url} />
            }

            <div className='px-[1rem] lg:px-[4rem] max-w-[90rem] mx-auto w-full mb-[3rem] relative'>
                <div className='flex flex-row gap-x-[2rem]'>
                    <div className='w-0 lg:w-auto lg:min-w-[20%] overflow-y-scroll mt-[2rem] lg:mt-[2.5rem] max-h-screen' style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                        <CategoryFilter />
                    </div>

                    <div className='flex flex-col justify-between w-full items-start'>
                        <div className='w-full'>
                            <div className='mt-[2rem] lg:mt-[2.5rem] flex flex-row items-center justify-between lg:justify-end'>
                                <div className='block lg:hidden'>
                                    <FilterSortBy />
                                </div>

                                <Button onClick={() => setOpenFilterModal(!openFilterModal)} className='border bg-white text-black h-[2.5rem] lg:h-[3rem] min-w-[10rem] rounded-none flex gap-x-[1rem] lg:hidden'>
                                    <span className='text-base'>Filter</span>
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path
                                                d="M7.5 14.5C5.92 14.5 4.597 15.56 4.163 17H2V19H4.163C4.597 20.44 5.92 21.5 7.5 21.5C9.08 21.5 10.403 20.44 10.837 19H22V17H10.837C10.403 15.56 9.08 14.5 7.5 14.5ZM7.5 19.5C6.673 19.5 6 18.827 6 18C6 17.173 6.673 16.5 7.5 16.5C8.327 16.5 9 17.173 9 18C9 18.827 8.327 19.5 7.5 19.5ZM16.5 8.5C14.92 8.5 13.597 9.56 13.163 11H2V13H13.163C13.597 14.44 14.92 15.5 16.5 15.5C18.08 15.5 19.403 14.44 19.837 13H22V11H19.837C19.403 9.56 18.08 8.5 16.5 8.5ZM16.5 13.5C15.673 13.5 15 12.827 15 12C15 11.173 15.673 10.5 16.5 10.5C17.327 10.5 18 11.173 18 12C18 12.827 17.327 13.5 16.5 13.5Z"
                                                fill="black"
                                                fillOpacity="0.6"
                                            />
                                            <path
                                                d="M12.837 5C12.403 3.56 11.08 2.5 9.5 2.5C7.92 2.5 6.597 3.56 6.163 5H2V7H6.163C6.597 8.44 7.92 9.5 9.5 9.5C11.08 9.5 12.403 8.44 12.837 7H22.125V5H12.837ZM9.5 7.5C8.673 7.5 8 6.827 8 6C8 5.173 8.673 4.5 9.5 4.5C10.327 4.5 11 5.173 11 6C11 6.827 10.327 7.5 9.5 7.5Z"
                                                fill="black"
                                                fillOpacity="0.6"
                                            />
                                        </svg>
                                    </span>
                                </Button>
                            </div>

                            <div className='w-full flex flex-row justify-between items-center'>
                                <Breadcrumb />

                                <div className='hidden lg:block'>
                                    <FilterSortBy />
                                </div>
                            </div>

                            <div className='flex flex-col items-start justify-center lg:mt-[1rem]'>
                                <h2 className='text-[2.25rem] not-italic font-bold leading-[120%] text-black'>{category?.name}</h2>
                                <p className='mt-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>

                            <CategoryProducts />
                        </div>

                        {
                            meta && category?.products && <Pagination meta={meta} onPrev={handlePrev} onNext={handleNext} />
                        }
                    </div>
                </div>
            </div>
        </Navigation>
    )
}
