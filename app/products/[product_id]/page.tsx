"use client"
import Navigation from '@/components/Navigation'
import ProductBreadCrumb from '@/components/ProductBreadCrumb'
import ProductColors from '@/components/ProductColors'
import ProductQuantitySelect from '@/components/ProductQuantitySelect'
import ProductStars from '@/components/ProductStars'
import { Button } from '@/components/ui/button'
import React, { useEffect, useRef, useState } from 'react'
import NowTrending from "@/components/NowTrending";
import ProductImages from '@/components/ProductImages'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { getProductAsync, selectProduct } from '@/lib/features/navigation/navigationSlice'
import { useParams, useRouter } from 'next/navigation'
import { addToCartAsync, createCartAsync, getCartAsync, selectCartId } from '@/lib/features/cart/cartSlice'
import { selectUserToken } from '@/lib/features/user/userSlice'

export default function ProductDetail() {
  const product = useAppSelector(selectProduct)
  const dispatch = useAppDispatch()
  const params = useParams<{ product_id: string }>()
  const [quantity, setQuantity] = useState(0)
  const cartId = useAppSelector(selectCartId)
  const quantityRef = useRef<HTMLButtonElement>(null)
  const [hasError, setHasError] = useState(false)
  const router = useRouter()
  const token = useAppSelector(selectUserToken)

  const createAndAdd = (cart_id: string) => {
    if (product?.product_id && cart_id) {
      dispatch(addToCartAsync({ product_id: product?.product_id, quantity, cart_id }))
    }
  }

  useEffect(() => {
    if (params?.product_id) {
      dispatch(getProductAsync(params?.product_id))
    }
  }, [dispatch, params?.product_id])

  const handleAddToCart = async () => {
    if (quantity <= 0) {
      setHasError(true)

      quantityRef.current?.focus()
      return
    }
    setHasError(false)

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
          dispatch(getCartAsync(cartId))
        }, 2000)
      }
    }
  }

  const handleBuyNow = async () => {
    handleAddToCart().then(() => {
      if (quantity <= 0) {
        setHasError(true)

        quantityRef.current?.focus()
        return
      }

      if(token) {
        router.push("/checkout/member")
      } else {
        router.push("/checkout/guest")
      }
    })
  }

  return (
    <Navigation>
      <div className='max-w-[90rem] mx-auto w-full pt-[2rem] lg:pt-[2.5rem] bg-white'>
        <ProductBreadCrumb />

        <div className='mt-[1.5rem] px-[1rem] lg:px-[4rem]'>
          <div className='w-full flex flex-col lg:flex-row items-stretch'>
            {
              product && <div className='w-full h-full flex-1'>
                <ProductImages />
              </div>
            }

            <div className='w-full bg-white flex flex-col justify-start px-[1rem] pb-[1rem] flex-1'>
              <h2 className='text-lg lg:text-[2.25rem] font-bold mt-[1rem]'>{product?.name}</h2>

              <span className='mt-[0.5rem] text-[1.5rem]'>KES {product?.price}</span>

              <div className='flex items-center justify-start gap-x-[0.3rem] mt-[1rem]'>
                <ProductStars />
                <span>3.5 stars</span>
                <span className='bg-black rounded-full h-[0.5rem] w-[0.5rem]'></span>
              </div>

              <p className='text-base mt-[1rem]'>{product?.description}</p>

              {
                product && product?.stock_quantity && product?.stock_quantity > 0 ? <div className='flex items-center gap-x-[0.5rem] mt-[1rem]'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                    <circle cx="6.5" cy="7" r="6.5" fill="#34C759" />
                  </svg>
                  <span>In Stock</span>
                </div> : <div className='flex flex-col items-center justify-center gap-x-[0.5rem] mt-[1rem] bg-[#EDEDF2] py-[2rem]'>
                  <span>Sold Out:</span>
                  <span>This product is currently unavailable</span>
                </div>
              }

              <div className='flex items-center mt-[1rem]'>
                <span className='mr-2 font-semibold'>Brand:</span>
                <span className='font-bold underline'>Tommee Tipee</span>
              </div>

              <div className='mt-[1rem]'>
                <h3 className='text-base gap-y-[0.5rem]'>Color</h3>
                <ProductColors />
              </div>

              <div className='mt-[1rem]'>
                <h3 className='text-base'>Quantity</h3>
                <ProductQuantitySelect
                  setQuantity={setQuantity}
                  quantity={quantity}
                  ref={quantityRef}
                  hasError={hasError}
                  setHasError={setHasError}
                />
              </div>

              <Button onClick={handleAddToCart} className='w-full bg-[#AF52DE] mt-[1.5rem] h-[2.5rem] lg:h-[3rem]'>Add to cart</Button>

              <Button onClick={handleBuyNow} className='w-full bg-white border border-black text-[#AF52DE] mt-[1rem] h-[2.5rem] lg:h-[3rem]'>Buy Now</Button>
            </div>

          </div>
        </div>

        <NowTrending title="You may also like" />
      </div>

    </Navigation>
  )
}
