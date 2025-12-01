"use client"
import React from 'react'
import CategoryFilter from './CategoryFilter'
import { useFilter } from '@/app/ClientLayout'
import { FilterSortBy } from './FilterSortBy'
import { Button } from './ui/button'
import CategoryProducts from './CategoryProducts'
import type { Crumb, Pagination, Product } from '@/lib/features/types'
import { PaginationBtns } from './PaginationBtns'
import CustomBreadcrumb from './CustomBreadcrumb'
import LoadingIndicator from './LoadingIndicator'
import { scrollToTop } from '@/lib/utils'

type ProductListingLayoutProps = {
    products: Product[];
    listingDescription: | React.ReactNode;
    listingName: string;
    pagination: Pagination | null;
    handlePrev: () => void;
    handleNext: () => void;
    crumbs: Crumb[];
    status: string,
    page?: string,
};

export default function ProductListingLayout({
    products,
    listingDescription,
    listingName,
    pagination,
    handleNext,
    handlePrev,
    crumbs,
    status,
    page,
}: ProductListingLayoutProps) {
    const { openFilterModal, setOpenFilterModal } = useFilter()

    return (
        <div className='px-[1rem] lg:px-[3rem] max-w-[90rem] mx-auto w-full mb-[3rem]'>
            <div className='flex flex-row lg:gap-x-[2rem]'>
                <div className='sticky lg:top-[10rem] hidden pt-[1rem] lg:block lg:min-w-[20%] overflow-y-scroll mt-[2rem] lg:mt-[2.5rem] pb-[12rem] max-h-screen' style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                    <CategoryFilter
                        setOpenFilterModal={setOpenFilterModal}
                        page={page}
                    />
                </div>

                <div className='flex flex-col justify-between w-full items-start'>
                    <div className='w-full'>
                        <div className='mt-[2rem] lg:mt-[2.5rem] flex flex-row items-center justify-between lg:justify-end'>
                            <div className='block lg:hidden'>
                                <FilterSortBy />
                            </div>

                            <Button onClick={() => setOpenFilterModal(!openFilterModal)} className='border bg-white text-custom-black h-[2.5rem] min-w-[10rem] flex gap-x-[1rem] lg:hidden rounded-none border-black'>
                                <span className='text-[0.875rem] '>Filter</span>
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

                        <div className='w-full flex flex-row justify-between items-center mt-[2rem]'>
                            <CustomBreadcrumb crumbs={crumbs} />

                            <div className='hidden lg:block'>
                                <FilterSortBy />
                            </div>
                        </div>

                        <div className='flex flex-col items-start justify-center mt-[2rem]'>
                            {
                                listingName && <h2 className='text-[1.25rem] lg:text-[3rem] not-italic font-bold leading-[120%] text-custom-black'>{listingName}</h2>
                            }

                            {
                                listingDescription && <div className='mt-4'>{listingDescription}</div>
                            }
                        </div>

                        {
                            status === "loading" && <div className='mt-[2.5rem]'>
                                <LoadingIndicator textColor="text-[#AF52DE]" />
                            </div>
                        }

                        {
                            !products || products?.length <= 0 ? <div className='w-full h-full mt-[2.5rem] font-[700] text-[2rem] flex items-center justify-center'>
                                <p>No Products Found!</p>
                            </div> : <></>
                        }

                        {
                            products && status !== "loading" && <CategoryProducts
                                products={products}
                            />
                        }
                    </div>

                    {
                        pagination && products?.length > 0 && status !== "loading" && <PaginationBtns meta={pagination} onPrev={handlePrev} onNext={handleNext} />
                    }

                    <div onClick={scrollToTop} className='bg-[#804A9D] rounded-full h-[2.5rem] w-[2.5rem] self-end mt-[2rem]'>
                        <svg
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect width="40" height="40" fill="url(#pattern0_14122_18188)" />
                            <defs>
                                <pattern
                                    id="pattern0_14122_18188"
                                    patternContentUnits="objectBoundingBox"
                                    width="1"
                                    height="1"
                                >
                                    <use href="#image0_14122_18188" transform="scale(0.0111111)" />
                                </pattern>
                                <image
                                    id="image0_14122_18188"
                                    width="90"
                                    height="90"
                                    preserveAspectRatio="none"
                                    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAByklEQVR4nO2ZO07DQBRFhxSYgoVDRST6sAeKKCuCBSCU8iCjuAIhJ2Teb+4po8i+92j8Gb/WhBBCCCGEEEIIIYQQQmQAmIBH4B14Ax7m37xzlQK4BV75yQG4885XXfKCZBtIXpBsA8kLkm0gWbINJS9oZa98hdvzN/uV/9Gr3z9W8vdqPee/v55sVLhAnGQbSF6Q7JVwhVuAZBtIXpBsQzHoAWknRLINRQwvG8NLe1jZOBQfTrZnYUaRHaEoATJ0JVJBAmXx+go3WQ1ne2QaaTNyGHJT47TjOwwl23FbPY5sZ8ljyA4iubbsYJJryu74CrdfcUyv805DfU9mhO/Zzit5ipajG8BzlHL4yd62ngAb4DOCZGfZH8BN6yz6GEWyo+zZwab1BHiJJNnpmLvWG+D+JPt4uoSevIUYyN6eus6dd7ODZsUl9ygMnuq9zjH37XpfvhZoOFtLctgNSG80nDUgwqoiQIauRCpIoCzlixEwU9lCBM5WrggJMpYpQKKs6YOTLXO6wBmzpwmauUP4gBW6hA1WqVOoAWblbtcezkaj5HA2KqWGs9EpMZzNQurhbDZSDmczk2Y4K4QQQgghhBBCCCGEEEKI1p0veedw/5C01UgAAAAASUVORK5CYII="
                                />
                            </defs>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}
