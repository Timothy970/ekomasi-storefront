"use client"
import Navigation from '@/components/Navigation'
import ProductBreadCrumb from '@/components/ProductBreadCrumb'
import ProductColors from '@/components/ProductColors'
import ProductQuantitySelect from '@/components/ProductQuantitySelect'
import ProductStars from '@/components/ProductStars'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import NowTrending from "@/components/NowTrending";
import ProductImages from '@/components/ProductImages'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { getProductAsync, selectProduct } from '@/lib/features/navigation/navigationSlice'
import { useParams, useRouter } from 'next/navigation'
import { addToCartAsync, createCartAsync, getCartAsync, selectCartId } from '@/lib/features/cart/cartSlice'
import { triggerToast } from '@/app/utils/toastUtils'

export default function ProductDetail() {
  const product = useAppSelector(selectProduct)
  const dispatch = useAppDispatch()
  const params = useParams<{ product_id: string }>()
  const [quantity, setQuantity] = useState(product && product?.stock_quantity > 0 ? 1 : 0)
  const cartId = useAppSelector(selectCartId)
  const router = useRouter()

  const createAndAdd = (cart_id: string) => {
    if (product?.product_id && cart_id) {
      dispatch(addToCartAsync({ product_id: product?.product_id, quantity, cart_id }))

      if (cart_id) {
        setTimeout(() => {
          triggerToast("Cart updated successfully!", "success");
          dispatch(getCartAsync(cart_id))
        }, 1000)
      }
    }
  }

  useEffect(() => {
    if (params?.product_id) {
      dispatch(getProductAsync(params?.product_id))
    }
  }, [dispatch, params?.product_id])

  const handleAddToCart = async () => {
    if (!cartId && product?.product_id && quantity > 0) {
      dispatch(
        createCartAsync(
          {
            product_id: product.product_id,
            quantity,
            createAndAdd,
          }
        )
      )
    } else {
      if (product?.product_id && cartId) {
        dispatch(addToCartAsync({ product_id: product?.product_id, quantity, cart_id: cartId }))
      }

      if (cartId) {
        setTimeout(() => {
          triggerToast("Cart updated successfully!", "success");
          dispatch(getCartAsync(cartId))
        }, 1000)
      }
    }
  }

  const handleBuyNow = async () => {
    handleAddToCart().then(() => {
      if (cartId) {
        router.push(`/cart/${cartId}`)
      }
    })
  }

  return (
    <Navigation>
      <div className='max-w-[90rem] mx-auto w-full pt-[2rem] lg:pt-[2.5rem]'>
        <ProductBreadCrumb />

        <div className='mt-[1.5rem] px-[1rem] lg:px-[3rem]'>
          <div className='w-full flex flex-col md:flex-row items-stretch gap-x-[1rem]'>
            {
              product && <div className='w-full h-full flex-1'>
                <ProductImages />
              </div>
            }

            <div className='w-full flex flex-col justify-start pb-[1rem] flex-1'>
              <h2 className='capitalize text-lg font-medium mt-[0.75rem] md:mt-0'>{product?.name}</h2>

              <span className='mt-[0.5rem] text-lg font-bold'>KES {product?.price}</span>

              {/* <div className='flex items-center text-[0.875rem] justify-start gap-x-[0.5rem] mt-[0.75rem]'>
                <ProductStars />
                <span>3.5 stars</span>
                <span className='bg-black rounded-full h-[0.5rem] w-[0.5rem]'></span>
                <span>10 Reviews</span>
              </div> */}

              <p className='text-[0.875rem] mt-[0.75rem] capitalize'>{product?.description}</p>

              {
                product && product?.stock_quantity && product?.stock_quantity > 0 ? <div className='flex items-center gap-x-[0.5rem] mt-[0.75rem]'>
                  <svg xmlns="http://www.w3.org/1000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                    <circle cx="6.5" cy="7" r="6.5" fill="#34C759" />
                  </svg>
                  <span>In Stock</span>
                </div> : <div className='flex flex-col items-center justify-center gap-x-[0.5rem] mt-[0.75rem] bg-[#EDEDF2] py-[2rem]'>
                  <span>Sold Out:</span>
                  <span>This product is currently unavailable</span>
                </div>
              }

              {/* <div className='flex items-center mt-[0.75rem]'>
                <span className='mr-2 font-semibold'>Brand:</span>
                <span className='font-bold underline'>Tommee Tipee</span>
              </div> */}

              {/* <div className='mt-[0.75rem]'>
                <h3 className='text-[0.875rem] gap-y-[0.5rem]'>Color</h3>
                <ProductColors />
              </div> */}

              {
                product && product && product?.stock_quantity > 0 && <div className='mt-[0.75rem]'>
                  <h3 className='text-[0.875rem]'>Quantity</h3>
                  <ProductQuantitySelect
                    setQuantity={setQuantity}
                    quantity={quantity}
                  />
                </div>
              }

              {
                product && <Button disabled={product && product?.stock_quantity <= 0} onClick={handleAddToCart} className='w-full bg-[#AF52DE] mt-[1.5rem] h-[3rem]'>Add to cart</Button>
              }

              <Button disabled={cartId ? false : true} onClick={handleBuyNow} className='w-full bg-white border border-black text-[#AF52DE] mt-[0.75rem] h-[3rem]'>Buy Now</Button>
            </div>

          </div>
        </div>

        <div className='px-[1rem] lg:px-[3rem] mb-[2rem] lg:mb-[2.5rem]'>
          <NowTrending title="You may also like" />
        </div>
      </div>
    </Navigation >
  )
}
