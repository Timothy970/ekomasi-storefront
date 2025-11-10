"use client"
import Navigation from '@/components/Navigation'
import ProductColors from '@/components/ProductColors'
import ProductQuantity from '@/components/ProductQuantity'
import ProductStars from '@/components/ProductStars'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import NowTrending from "@/components/NowTrending";
import ProductImages from '@/components/ProductImages'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { getProductAsync, selectProductStatus, selectProduct } from '@/lib/features/navigation/navigationSlice'
import { useParams, useRouter } from 'next/navigation'
import { addToBuyNowCartAsync, addToCartAsync, createBuyNowCartAsync, createCartAsync, getBuyNowCartAsync, getCartAsync, selectCart, selectCartId, } from '@/lib/features/cart/cartSlice'
import { triggerToast } from '@/app/utils/toastUtils'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Crumb } from '@/lib/features/types'
import LoadingIndicator from '@/components/LoadingIndicator'
import { customeParser } from '@/lib/utils'
import { selectUserToken } from '@/lib/features/user/userSlice'
import { useGuestCheckout, useIsBuyNow } from '@/app/ClientLayout'
import { ShoppingBag } from 'lucide-react'

export default function ProductDetail() {
  const product = useAppSelector(selectProduct)
  const dispatch = useAppDispatch()
  const params = useParams<{ product_id: string }>()
  const [quantity, setQuantity] = useState(1)
  const cartId = useAppSelector(selectCartId)
  const router = useRouter()
  const [breadCrumb, setBreadCrumb] = useState<Crumb[]>([])
  const status = useAppSelector(selectProductStatus)
  const cart = useAppSelector(selectCart)
  const isInCart = cart?.cart_items?.some(item => item?.product.product_id === product?.product_id);
  const [addToCartLoading, setAddToCartLoading] = useState(false)
  const token = useAppSelector(selectUserToken)
  const { setOpenGuestCheckoutModal } = useGuestCheckout()
  const { setIsBuyNow } = useIsBuyNow()

  useEffect(() => {
    if (product) {
      let crumbs = []

      crumbs?.push({
        link: `/products/${product?.product_id}`,
        name: product?.name
      })
      setBreadCrumb(crumbs)
    }
  }, [product])

  useEffect(() => {
    if (product && cart?.cart_items) {
      const cartItem = cart.cart_items.find(
        item => item?.product.product_id === product.product_id
      );
      if (cartItem) {
        setQuantity(cartItem.quantity);
      } else {
        setQuantity(product.stock_quantity > 0 ? 1 : 0);
      }
    }
  }, [product]);

  const createAndAdd = (cart_id: string) => {
    if (product?.product_id && cart_id) {
      dispatch(addToCartAsync({ product_id: product?.product_id, quantity, cart_id }))

      if (cart_id) {
        setTimeout(() => {
          triggerToast("Cart updated successfully!", "success");
          dispatch(getCartAsync({ cart_id }))
        }, 1000)
      }
    }
  }

  const createAndAddBuyNowCart = (cart_id: string) => {
    if (!product?.product_id || !cart_id) return;

    dispatch(addToBuyNowCartAsync({ product_id: product.product_id, quantity, cart_id }));

    setTimeout(() => {
      triggerToast("Cart updated successfully!", "success");
      dispatch(getBuyNowCartAsync({ cart_id }));

      if (token) {
        router.push("/checkout/member/buy-now");
      } else {
        setOpenGuestCheckoutModal(true)
      }
    }, 1000);
  };

  useEffect(() => {
    if (params?.product_id) {
      dispatch(getProductAsync(params?.product_id))
    }
  }, [dispatch, params?.product_id])

  const handleAddToCart = async (addedQuantity: number) => {
    setAddToCartLoading(true)

    if (!cartId && product?.product_id && addedQuantity > 0) {
      dispatch(
        createCartAsync(
          {
            product_id: product.product_id,
            quantity: addedQuantity,
            createAndAdd,
          }
        )
      )
    } else {
      if (product?.product_id && cartId) {
        dispatch(addToCartAsync({ product_id: product?.product_id, quantity: addedQuantity, cart_id: cartId }))
      }

      if (cartId) {
        setTimeout(() => {
          triggerToast("Cart updated successfully!", "success");
          dispatch(getCartAsync({ cart_id: cartId }))
        }, 1000)
      }
    }
    setTimeout(() => {
      setAddToCartLoading(false)
    }, 1000)
  }

  const handleAddToBuyNowCart = async () => {
    if (product?.product_id && quantity > 0) {
      dispatch(
        createBuyNowCartAsync(
          {
            product_id: product.product_id,
            quantity,
            createAndAddBuyNowCart,
          }
        )
      )
      setIsBuyNow(true)
    } else {
      setIsBuyNow(false)
      triggerToast("Please select a valid quantity", 'error');
    }
  }

  useEffect(() => {
    if (product) {
      if (product.stock_quantity > 0) {
        setQuantity(1);
      } else {
        setQuantity(0);
      }
    }
  }, [product]);

  if (status === "loading") {
    return (
      <Navigation>
        <div className="flex flex-col items-center justify-center h-[80vh] text-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#AF52DE]/30 border-t-[#AF52DE] rounded-full animate-spin"></div>
        </div>
      </Navigation>
    );
  }

  if (!product) {
    return (
      <Navigation>
        <div className="flex flex-col items-center justify-center h-[80vh] text-center space-y-4">
          <ShoppingBag className="w-16 h-16 text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-800">Product not found</h2>
          <p className="text-gray-500 max-w-sm">
            The product you’re looking for doesn’t exist or has been removed.
          </p>
          <a
            href="/"
            className="mt-4 px-5 py-2.5 rounded-full bg-[#AF52DE] text-white hover:bg-[#9c3fcb] transition-colors"
          >
            Continue Shopping
          </a>
        </div>
      </Navigation>
    );
  }

  return (
    <Navigation>
      <div className='max-w-[90rem] mx-auto w-full pt-[2rem] lg:pt-[2.5rem]'>
        <div className='my-4 px-[1rem] lg:px-[3rem]'>
          <CustomBreadcrumb crumbs={breadCrumb} />
        </div>

        <div className='mt-[1.5rem] px-[1rem] lg:px-[3rem]'>
          <div className='w-full flex flex-col md:flex-row items-stretch gap-x-[1rem]'>
            {
              product && <div className='w-full h-full flex-1'>
                <ProductImages />
              </div>
            }

            <div className='w-full flex flex-col justify-start pb-[1rem] flex-1'>
              <h2 className='capitalize text-lg lg:text-[2.25rem] font-medium mt-[0.75rem] md:mt-0'>{product?.name}</h2>

              <span className='mt-[0.5rem] text-lg lg:text-[1.5rem] font-bold'>KES {product?.price}</span>

              <div className='flex items-center text-[0.875rem] justify-start gap-x-[0.5rem] mt-[0.75rem]'>
                <ProductStars />
                <span>3.5 stars</span>
                <span className='bg-black rounded-full h-[0.5rem] w-[0.5rem]'></span>
                <span>10 Reviews</span>
              </div>
              {
                product?.description && <div className='text-[0.875rem] lg:text-[1rem] mt-[0.75rem] capitalize'>{customeParser(product?.description)}</div>
              }

              <div className='mt-[1.5rem] min-h-[2.5rem]'>
                {product && product?.stock_quantity && product?.stock_quantity > 0 ? (
                  <div className='flex items-center gap-x-[0.5rem]'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                      <circle cx="6.5" cy="7" r="6.5" fill="#34C759" />
                    </svg>
                    <span className='text-base'>In Stock</span>
                  </div>
                ) : (
                  <div className='flex flex-col items-center justify-center gap-x-[0.5rem] bg-[#EDEDF2] py-[2rem]'>
                    <span className='text-base'>Sold Out:</span>
                    <span className='text-base'>This product is currently unavailable</span>
                  </div>
                )
                }
              </div>

              <div className='flex items-center mt-[0.75rem]'>
                <span className='mr-2 font-semibold'>Brand:</span>
                <span className='font-bold underline'>Tommee Tipee</span>
              </div>

              <div className='mt-[0.75rem]'>
                <h3 className='text-[0.875rem] gap-y-[0.5rem]'>Color</h3>
                <ProductColors />
              </div>

              {
                product && product && product?.stock_quantity > 0 && <div className='mt-[1.5rem]'>
                  <h3 className='text-[0.875rem] lg:text-base mb-[1.5rem]'>Quantity</h3>
                  <ProductQuantity
                    setQuantity={setQuantity}
                    quantity={quantity}
                  />
                </div>
              }

              {
                product && <Button
                  disabled={product && product?.stock_quantity <= 0 || addToCartLoading}
                  onClick={() => handleAddToCart(quantity)}
                  className='w-full bg-[#AF52DE] mt-[1.5rem] h-[3rem]'
                >
                  {
                    addToCartLoading && <LoadingIndicator textColor="text-white" />
                  }
                  {isInCart ? "Update Cart Item" : "Add to Cart"}
                </Button>
              }

              <Button
                onClick={handleAddToBuyNowCart}
                className='w-full bg-white border border-black text-[#AF52DE] mt-[0.75rem] h-[3rem]'
              >
                Buy Now
              </Button>
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
