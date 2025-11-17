"use client"
import Navigation from '@/components/Navigation'
import NowTrending from '@/components/NowTrending'
import WishLists from '@/components/WishLists'
import { getSharedWishListsAsync, selectSharedWishLists } from '@/lib/features/wishlist/wishlistSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

export default function WishList() {
    const sharedWishList = useAppSelector(selectSharedWishLists)
    const dispatch = useAppDispatch()
    const params = useParams<{ id: string }>();

    useEffect(() => {
        dispatch(getSharedWishListsAsync(params.id));
    }, [dispatch, params.id]);

    return (
        <Navigation>
            <div className='w-full flex flex-col justify-center items-center'>
                <div className='w-full bg-[rgba(232,41,138,0.25)] h-[2.5rem] text-center flex justify-center items-center'>
                    <p className='text-[0.875rem]'>Our Big Little Event is now on | Shop up to 40% off</p>
                </div>

                <div className='mt-[2rem] w-full max-w-[90rem]'>
                    <div className='w-full flex items-center justify-between flex-col md:flex-row'>
                        <h2 className='text-[3rem]'> Wishlist</h2>

                        <div className='flex gap-x-[1rem] w-full justify-center md:justify-end items-center mx-auto mt-[1rem] md:mt-[1rem]'>
                        </div>
                    </div>

                    <div className='mt-[2rem]'>
                        <p className='text-[0.875rem] md:text-[1.125rem]'>It's super simple to create a wishlist! When you're browsing and see something you love, click the heart icon to add that item to your list. You can even login and drop a little hint by sharing your wish list with your nearest and dearest!</p>

                        {
                            !sharedWishList ? <div className='mt-[2rem] md:mt-[2.5rem] w-full flex items-center justify-center'>
                                <p className='text-[1.125rem]'>There are no items in the shared Wishlist</p>
                            </div> : <WishLists pageType="shared" wishLists={[sharedWishList]} />
                        }

                    </div>
                </div>

                {
                    !sharedWishList && <NowTrending title="Now Trending" />
                }
            </div>
        </Navigation>
    )
}
