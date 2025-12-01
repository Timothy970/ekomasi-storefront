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
import { getProductAsync, selectProductStatus, selectProduct, getProductReviewsAsync, selectProductBundles, getProductBundlesAsync, selectProductReviews, selectReviewPagination } from '@/lib/features/navigation/navigationSlice'
import { useParams, useRouter } from 'next/navigation'
import { addToBuyNowCartAsync, addToCartAsync, createBuyNowCartAsync, createCartAsync, getBuyNowCartAsync, getCartAsync, selectCart, selectCartId, } from '@/lib/features/cart/cartSlice'
import { triggerToast } from '@/app/utils/toastUtils'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Crumb } from '@/lib/features/types'
import LoadingIndicator from '@/components/LoadingIndicator'
import { customParser } from '@/lib/utils'
import { selectUserToken } from '@/lib/features/user/userSlice'
import { useGuestCheckout, useIsBuyNow } from '@/app/ClientLayout'
import { ShoppingBag } from 'lucide-react'
import Accordion from '@/components/Accordion'
import { ProductDetailsReviews } from '@/components/ProductDetailsReviews'
import ProductFeatureSection from '@/components/ProductFeatureSection'
import BundleList from '@/components/BundleList'

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
  const url = typeof window !== "undefined" ? window.location.href : "";
  const [warranty, setWarranty] = useState("");
  const productBundles = useAppSelector(selectProductBundles);
  const reviews = useAppSelector(selectProductReviews)
  const reviewPagination = useAppSelector(selectReviewPagination)

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
      dispatch(getProductReviewsAsync(params?.product_id))
    }
    dispatch(getProductBundlesAsync())

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
    if (!product?.warranty) {
      setWarranty("No warranty information available.");
      return;
    }

    const { warranty_type, warranty_period, manufacturing_date, expiry_date } = product.warranty;

    const mfgDate = manufacturing_date ? new Date(manufacturing_date).toLocaleDateString() : "N/A";
    const expDate = expiry_date ? new Date(expiry_date).toLocaleDateString() : "N/A";

    const text = `This product comes with a ${warranty_type} warranty valid for ${warranty_period}. Manufactured on: ${mfgDate}. Warranty expiry date: ${expDate}.`;

    setWarranty(text);
  }, [product?.warranty]);

  useEffect(() => {
    if (product) {
      if (product.stock_quantity > 0) {
        setQuantity(1);
      } else {
        setQuantity(0);
      }
    }
  }, [product]);


  const shareTo = (target: string) => {
    switch (target) {
      case "whatsapp":
        window.open(`https://wa.me/?text=${encodeURIComponent(url)}`);
        break;

      case "twitter":
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(product?.name ?? "")}`);
        break;

      case "instagram":
        navigator.clipboard.writeText(url);
        triggerToast("Link copied! Open Instagram and paste it.", "success");
        break;

      case "tiktok":
        window.open(`https://www.tiktok.com/share?url=${encodeURIComponent(url)}`);
        break;

      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;

      case "copy":
        navigator.clipboard.writeText(url);
        triggerToast("Link copied!", "success");
        break;
    }
  };

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
                {
                  reviews?.average_score && <ProductStars avarageScore={reviews?.average_score} />
                }

                {
                  reviews?.average_score && <span>{reviews?.average_score} {reviews?.average_score > 1 ? "stars" : "star"} </span>
                }

                <span className='bg-black rounded-full h-[0.5rem] w-[0.5rem]'></span>
                {
                  reviewPagination?.total_items && <span>{reviewPagination?.total_items} {reviewPagination?.total_items > 1 ? "Reviews" : "Review"}</span>
                }
              </div>
              {
                product?.description && <div className='text-[0.875rem] lg:text-[1rem] mt-[0.75rem] capitalize'>{customParser(product?.description)}</div>
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
                <ProductColors product={product} />
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

              <div className='mt-[1.5rem] flex flex-col gap-y-[1.5rem]'>
                <div className='flex gap-x-[0.5rem] w-full border-b border-b-black py-[1.5rem]'>
                  <span className='text-base'>Share:</span>

                  <div className='flex gap-x-[0.44rem] items-center justify-center'>
                    <svg onClick={() => shareTo("facebook")} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M22 12.3033C22 6.7467 17.5229 2.24219 12 2.24219C6.47715 2.24219 2 6.7467 2 12.3033C2 17.325 5.65684 21.4874 10.4375 22.2422V15.2116H7.89844V12.3033H10.4375V10.0867C10.4375 7.56515 11.9305 6.17231 14.2146 6.17231C15.3088 6.17231 16.4531 6.36882 16.4531 6.36882V8.8448H15.1922C13.95 8.8448 13.5625 9.62041 13.5625 10.4161V12.3033H16.3359L15.8926 15.2116H13.5625V22.2422C18.3432 21.4874 22 17.3252 22 12.3033Z" fill="#1976D2" />
                    </svg>

                    <svg onClick={() => shareTo("instagram")} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M17.0085 20.9941L7.0085 21.0036C4.8085 21.0056 3.007 19.2076 3.0045 17.0076L2.995 7.00764C2.993 4.80764 4.791 3.00614 6.991 3.00364L16.991 2.99414C19.191 2.99214 20.9925 4.79014 20.995 6.99014L21.0045 16.9901C21.007 19.1906 19.2085 20.9921 17.0085 20.9941Z" fill="url(#paint0_radial_16349_2479)" />
                      <path d="M17.0085 20.9941L7.0085 21.0036C4.8085 21.0056 3.007 19.2076 3.0045 17.0076L2.995 7.00764C2.993 4.80764 4.791 3.00614 6.991 3.00364L16.991 2.99414C19.191 2.99214 20.9925 4.79014 20.995 6.99014L21.0045 16.9901C21.007 19.1906 19.2085 20.9921 17.0085 20.9941Z" fill="url(#paint1_radial_16349_2479)" />
                      <path d="M12 15.5C10.0705 15.5 8.5 13.93 8.5 12C8.5 10.07 10.0705 8.5 12 8.5C13.9295 8.5 15.5 10.07 15.5 12C15.5 13.93 13.9295 15.5 12 15.5ZM12 9.5C10.6215 9.5 9.5 10.6215 9.5 12C9.5 13.3785 10.6215 14.5 12 14.5C13.3785 14.5 14.5 13.3785 14.5 12C14.5 10.6215 13.3785 9.5 12 9.5Z" fill="white" />
                      <path d="M15.75 9C16.1642 9 16.5 8.66421 16.5 8.25C16.5 7.83579 16.1642 7.5 15.75 7.5C15.3358 7.5 15 7.83579 15 8.25C15 8.66421 15.3358 9 15.75 9Z" fill="white" />
                      <path d="M15 18.5H9C7.0705 18.5 5.5 16.93 5.5 15V9C5.5 7.07 7.0705 5.5 9 5.5H15C16.9295 5.5 18.5 7.07 18.5 9V15C18.5 16.93 16.9295 18.5 15 18.5ZM9 6.5C7.6215 6.5 6.5 7.6215 6.5 9V15C6.5 16.3785 7.6215 17.5 9 17.5H15C16.3785 17.5 17.5 16.3785 17.5 15V9C17.5 7.6215 16.3785 6.5 15 6.5H9Z" fill="white" />
                      <defs>
                        <radialGradient id="paint0_radial_16349_2479" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(9.69 21.0166) scale(22.4495)">
                          <stop stopColor="#FFDD55" />
                          <stop offset="0.328" stopColor="#FF543F" />
                          <stop offset="0.348" stopColor="#FC5245" />
                          <stop offset="0.504" stopColor="#E64771" />
                          <stop offset="0.643" stopColor="#D53E91" />
                          <stop offset="0.761" stopColor="#CC39A4" />
                          <stop offset="0.841" stopColor="#C837AB" />
                        </radialGradient>

                        <radialGradient id="paint1_radial_16349_2479" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(5.893 2.76929) scale(14.9065 9.9322)">
                          <stop stopColor="#4168C9" />
                          <stop offset="0.999" stopColor="#4168C9" stopOpacity="0" />
                        </radialGradient>
                      </defs>
                    </svg>

                    <svg onClick={() => shareTo("tiktok")} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M16 0H1.6C0.716 0 0 0.716 0 1.6V16C0 16.884 0.716 17.6 1.6 17.6H16C16.884 17.6 17.6 16.884 17.6 16V1.6C17.6 0.716 16.8832 0 16 0ZM14.9512 7.5792C14.8472 7.5888 14.7424 7.5952 14.6368 7.5952C13.4408 7.5952 12.3896 6.9808 11.7776 6.0504C11.7776 8.4896 11.7776 11.2656 11.7776 11.312C11.7776 13.46 10.036 15.2008 7.8888 15.2008C5.7416 15.2 4 13.4584 4 11.3112C4 9.1632 5.7416 7.4224 7.8888 7.4224C7.9704 7.4224 8.0496 7.4296 8.1288 7.4344V9.3512C8.0488 9.3416 7.9712 9.3272 7.8888 9.3272C6.7928 9.3272 5.904 10.216 5.904 11.312C5.904 12.408 6.792 13.2968 7.8888 13.2968C8.9856 13.2968 9.9536 12.4328 9.9536 11.3368C9.9536 11.2928 9.9728 2.4008 9.9728 2.4008H11.804C11.976 4.0384 13.2984 5.3312 14.9512 5.4496V7.5792Z" fill="black" />
                    </svg>

                    <svg onClick={() => shareTo("twitter")} xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                      <path d="M14.1761 0H16.9362L10.9061 6.7774L18 16H12.4456L8.0951 10.4066L3.11723 16H0.35544L6.80517 8.7508L0 0H5.69545L9.6279 5.11262L14.1761 0ZM13.2073 14.3754H14.7368L4.86441 1.53928H3.2232L13.2073 14.3754Z" fill="black" />
                    </svg>

                    <svg onClick={() => shareTo("whatsapp")} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M9.6 0C4.2984 0 0 4.2984 0 9.6C0 11.401 0.505873 13.0801 1.36875 14.5203L0.0859375 19.2L4.86562 17.9453C6.26348 18.74 7.87719 19.2 9.6 19.2C14.9016 19.2 19.2 14.9016 19.2 9.6C19.2 4.2984 14.9016 0 9.6 0ZM6.31406 5.12188C6.47006 5.12188 6.63035 5.12092 6.76875 5.12813C6.93995 5.13213 7.12629 5.14466 7.30469 5.53906C7.51669 6.00786 7.9783 7.18393 8.0375 7.30312C8.0967 7.42233 8.13865 7.56275 8.05625 7.71875C7.97785 7.87875 7.93708 7.97559 7.82188 8.11719C7.70268 8.25479 7.57206 8.42569 7.46406 8.52969C7.34486 8.64889 7.22178 8.77959 7.35938 9.01719C7.49697 9.25479 7.97485 10.0337 8.68125 10.6625C9.58925 11.4737 10.3554 11.723 10.5938 11.8422C10.8321 11.9614 10.9702 11.9428 11.1078 11.7828C11.2494 11.6268 11.7025 11.0915 11.8625 10.8531C12.0185 10.6147 12.1778 10.656 12.3938 10.7344C12.613 10.8128 13.7819 11.3886 14.0203 11.5078C14.2587 11.627 14.415 11.686 14.475 11.7828C14.5366 11.8828 14.5367 12.3589 14.3391 12.9141C14.1415 13.4685 13.1711 14.0046 12.7359 14.0422C12.2967 14.083 11.8868 14.2396 9.88125 13.45C7.46205 12.4972 5.93639 10.0194 5.81719 9.85938C5.69799 9.70337 4.84844 8.57113 4.84844 7.40313C4.84844 6.23112 5.46293 5.65715 5.67812 5.41875C5.89733 5.18035 6.15406 5.12188 6.31406 5.12188Z" fill="#62CE40" />
                    </svg>
                  </div>
                </div>

                {
                  warranty && <Accordion title="Warranty">
                    <span>{warranty}</span>
                  </Accordion>
                }
              </div>
            </div>
          </div>
        </div>

        <div className='px-[1rem] lg:px-[3rem] mb-[2rem] lg:mb-[2.5rem]'>
          <ProductDetailsReviews />
        </div>
        {/* 
        <div className='w-full mt-[2rem] md:mt-[2.5rem] px-[1rem] md:px-[3rem]'>
          {
            productBundles?.bundles && productBundles?.bundles?.length > 0 && <BundleList bundles={productBundles?.bundles} />
          }
        </div> */}

        <div className='px-[1rem] lg:px-[3rem] mb-[2rem] lg:mb-[2.5rem]'>
          <NowTrending title="You may also like" />
        </div>

        {
          product?.features?.length > 0 && <ProductFeatureSection
            features={product?.features}
          />
        }
      </div>
    </Navigation >
  )
}
