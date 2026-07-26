"use client"
import React from 'react'
import type { Crumb, Pagination, Product } from '@/lib/features/types'
import { PaginationBtns } from './PaginationBtns'
import CustomBreadcrumb from './CustomBreadcrumb'
import LoadingIndicator from './LoadingIndicator'
import { scrollToTop } from '@/lib/utils'
import DealsProducts from './DealsProducts'

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

export default function DealsProductListing({
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

    return (
        <div className='px-[1rem] lg:px-[3rem] max-w-[90rem] mx-auto w-full mb-[3rem]'>
            <div className='flex flex-row lg:gap-x-[2rem]'>

                <div className='flex flex-col justify-between w-full items-start'>
                    <div className='w-full'>
                        <div className='w-full flex flex-row justify-between items-center mt-[2rem]'>
                            <CustomBreadcrumb crumbs={crumbs} />
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
                                <LoadingIndicator textColor="text-secondary-tenant" />
                            </div>
                        }

                        {
                            !products || products?.length <= 0 ? <div className='w-full h-full mt-[2.5rem] font-[700] text-[2rem] flex items-center justify-center'>
                                <p>No Products Found!</p>
                            </div> : <></>
                        }

                        {
                            products && status !== "loading" && <DealsProducts
                                products={products}
                            />
                        }
                    </div>

                    {
                        pagination && products?.length > 0 && status !== "loading" && <PaginationBtns meta={pagination} onPrev={handlePrev} onNext={handleNext} />
                    }

                    <div onClick={scrollToTop} className='bg-secondary-tenant rounded-full h-[2.5rem] w-[2.5rem] self-end mt-[2rem]'>
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
