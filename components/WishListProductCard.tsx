import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Trash } from 'lucide-react'
import { Product } from '@/lib/features/types'
import { customParser, getProductImageUrl } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { selectUserToken } from '@/lib/features/user/userSlice'
import { deleteProductFromWishListAsync, getWishListsAsync, selectDeleteStatus } from '@/lib/features/wishlist/wishlistSlice'
import LoadingIndicator from './LoadingIndicator'
import { triggerToast } from '@/app/utils/toastUtils'
import { addToCartAsync, createCartAsync, getCartAsync, selectCartId } from '@/lib/features/cart/cartSlice'
import NoImage from './NoImage'

export default function WishListProductCard({ product, pageType }: { product: Product; pageType: "wishlist" | "shared" }) {
    const router = useRouter()
    const token = useAppSelector(selectUserToken)
    const dispatch = useAppDispatch()
    const status = useAppSelector(selectDeleteStatus)
    const cartId = useAppSelector(selectCartId)
    const [loading, setLoading] = useState(false)

    const refetchWishList = () => {
        if (token) {
            dispatch(getWishListsAsync(token))
        }
    }

    const createAndAdd = (cart_id: string) => {
        if (product?.product_id && cart_id) {
            dispatch(addToCartAsync({ product_id: product?.product_id, quantity: 1, cart_id }))

            if (cart_id) {
                setTimeout(() => {
                    triggerToast("Cart updated successfully!", "success");
                    dispatch(getCartAsync({ cart_id: cart_id }))
                }, 1000)
            }
        }
    }

    const handleAddTocart = (product: Product) => {
        try {
            if (!cartId && product?.product_id && product?.stock_quantity > 0) {
                dispatch(
                    createCartAsync(
                        {
                            product_id: product.product_id,
                            quantity: 1,
                            createAndAdd,
                        }
                    )
                )
            } else {
                if (product?.product_id && cartId) {
                    dispatch(addToCartAsync({ product_id: product?.product_id, quantity: 1, cart_id: cartId }))
                }

                if (cartId) {
                    setTimeout(() => {
                        triggerToast("Cart updated successfully!", "success");
                        dispatch(getCartAsync({ cart_id: cartId }))
                    }, 1000)
                }
            }
        } catch (err) {
            triggerToast("Failed to add to cart", "error");
        } finally {
            setLoading(false);
        }
    }

    const handleRemoveWishlist = (id: string) => {
        dispatch(
            deleteProductFromWishListAsync({
                product_id: id,
                refetchWishList,
                triggerToast,
            })
        )
    }

    const imageUrl = getProductImageUrl(product.urls);

    return (
        <div className='cursor-pointer' onClick={() => router.push(`/products/${product?.product_id}`)}>
            <div className="overflow-hidden flex flex-col justify-center items-center">
                {
                    imageUrl ? (<div className="relative w-full h-[15rem] sm:h-[20rem] md:h-[20rem]">
                        <Image
                            src={imageUrl}
                            alt={product?.name}
                            fill
                            style={{ objectFit: "cover" }}
                            className="h-full w-full"
                            priority
                            unoptimized
                        />
                        {
                            product?.tag && <div className="bg-[#A75B5B] w-[4.8rem] h-[1.93rem] absolute z-10 flex justify-center items-center rounded-tr-[0.5rem] rounded-br-[0.5rem] mt-[1rem]">
                                <span className="text-[0.75rem] text-white font-bold">{product?.tag}</span>
                            </div>
                        }
                    </div>
                    ) : (<NoImage />)
                }

                <div className=" pb-3 flex flex-col gap-y-1 mt-[0.75rem] w-full justify-center">
                    <h3 className="text-[0.875rem] text-custom-black capitalize">{product.name}</h3>
                    <div className="text-[0.875rem] font-normal capitalize">{customParser(product.description)}</div>
                    <p className="text-[0.875rem] font-semibold">KES {product.price}</p>

                    <div className='flex justify-between items-center mt-1'>
                        <Button
                            onClick={(e) => {
                                setLoading(true);
                                product?.product_id ? handleAddTocart(product) : null
                                e.stopPropagation();
                            }}
                            className="items-center rounded-[0.125rem] bg-[#AF52DE] h-[2.5rem] font-semibold flex gap-x-[0.25] md:gap-[0.75rem]">
                            {
                                loading && <LoadingIndicator textColor="text-white" />
                            }
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="19" viewBox="0 0 21 19" fill="none">
                                <path d="M9.1665 18.3008C9.99493 18.3008 10.6665 17.6292 10.6665 16.8008C10.6665 15.9724 9.99493 15.3008 9.1665 15.3008C8.33808 15.3008 7.6665 15.9724 7.6665 16.8008C7.6665 17.6292 8.33808 18.3008 9.1665 18.3008Z" fill="white" />
                                <path d="M16.1665 18.3008C16.9949 18.3008 17.6665 17.6292 17.6665 16.8008C17.6665 15.9724 16.9949 15.3008 16.1665 15.3008C15.3381 15.3008 14.6665 15.9724 14.6665 16.8008C14.6665 17.6292 15.3381 18.3008 16.1665 18.3008Z" fill="white" />
                                <path d="M11.6665 10.3008H13.6665V7.31081H16.6565V5.31081H13.6665V2.33081H11.6665V5.31081H8.67651V7.31081H11.6665V10.3008Z" fill="white" />
                                <path d="M8.6665 14.3008H16.6665C16.8679 14.3002 17.0645 14.2388 17.2305 14.1246C17.3964 14.0104 17.524 13.8487 17.5965 13.6608L20.4265 6.30079H18.2865L15.9765 12.3008H9.3365L4.8465 1.53079C4.69427 1.16585 4.43727 0.854225 4.10799 0.635297C3.77871 0.416369 3.39192 0.299962 2.9965 0.300786H0.666504V2.30079H2.9965L7.7465 13.6808C7.82152 13.8634 7.94892 14.0197 8.11264 14.1301C8.27636 14.2404 8.46908 14.2998 8.6665 14.3008Z" fill="white" />
                            </svg>

                            <span className='text-[0.875rem] md:hidden'>Cart</span>

                            <span className='text-[0.875rem] hidden md:block'>Add to cart</span>
                        </Button>
                        {pageType === "wishlist" && (
                            <Button
                                onClick={(e) => {
                                    product?.product_id ? handleRemoveWishlist(product?.product_id) : null
                                    e.stopPropagation();
                                }}
                                className='bg-white border border-[#7A4597] h-[2.5rem] md:min-w-[5rem] text-[#7A4597] text-[0.875rem] hidden md:flex items-center justify-center'>
                                {
                                    status == "loading" && <LoadingIndicator textColor="text-[#7A4597]" />
                                }
                                Remove
                            </Button>
                        )}
                        {pageType === "wishlist" && (
                            <Trash className='text-red-400 mr-[1.25rem] md:hidden' />)}
                    </div>
                </div>
            </div>
        </div>
    )
}
