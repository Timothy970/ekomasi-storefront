import React from 'react'
import { useAppSelector } from '@/lib/hooks';
import { selectWishLists } from '@/lib/features/wishlist/wishlistSlice';
import { Product, WishList } from '@/lib/features/types';
import WishListProductCard from './WishListProductCard';

export default function WishLists() {
    const wishLists = useAppSelector(selectWishLists)

    return (

        <div className='mt-[2rem] pb-[2rem]'>
            <div>
                {wishLists?.map((wishlist: WishList, index: number) => {
                    return <div key={index.toString()} className="">
                        <h2 className='font-bold text-lg'>{wishlist?.name}</h2>

                        <div className='mt-[1.5rem] grid grid-cols-2 gap-x-[0.5rem] gap-y-9 md:gap-x-6 lg:gap-x-[2rem] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                            {
                                wishlist?.products.map((product: Product, index: number) => {
                                    return <WishListProductCard
                                        key={index?.toString()}
                                        product={product}
                                    />
                                })
                            }
                        </div>
                    </div>
                })}
            </div>
        </div>
    )

}
