import { Product, WishList } from '@/lib/features/types';
import WishListProductCard from './WishListProductCard';
export default function WishLists({ pageType, wishLists }: Readonly<{ pageType: "wishlist" | "shared", wishLists: WishList[] | null }>) {
    return (
        <div className='mt-[2rem] pb-[2rem]'>
            <div>
                {wishLists?.map((wishlist: WishList, index: number) => {
                    return <div key={wishlist.wishlist_id || `wishlist-${index}`} className="">
                        <h2 className='font-bold text-lg'>{pageType === "wishlist" ? wishlist?.name : "Shared Wishlist"}</h2>

                        {
                            wishlist?.products ? <div className='mt-[1.5rem] grid grid-cols-2 gap-x-[0.5rem] gap-y-9 md:gap-x-6 lg:gap-x-[2rem] sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
                                {
                                    wishlist?.products?.map((product: Product, index: number) => {
                                        return <WishListProductCard
                                            key={product.product_id || product.id || product.sku || `product-${index}`}
                                            product={product}
                                            pageType={pageType}
                                        />
                                    })
                                }
                            </div> : <div className='flex w-full items-center justify-center mt-[1.5rem]'>
                                <p className='text-lg'>No products found.</p>
                            </div>
                        }
                    </div>
                })}
            </div>
        </div>
    )

}
