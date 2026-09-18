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
import { getProductAsync, selectProductStatus, selectProduct, getProductReviewsAsync, selectProductReviews, selectReviewPagination } from '@/lib/features/navigation/navigationSlice'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { addToBuyNowCartAsync, addToCartAsync, createBuyNowCartAsync, createCartAsync, getBuyNowCartAsync, getCartAsync, selectCart, selectCartId, } from '@/lib/features/cart/cartSlice'
import { triggerToast } from '@/app/utils/toastUtils'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import LoadingIndicator from '@/components/LoadingIndicator'
import { customParser, getProductImageUrl } from '@/lib/utils'
import { selectUserToken } from '@/lib/features/user/userSlice'
import { useGuestCheckout, useIsBuyNow } from '@/app/ClientLayout'
import { ShoppingBag } from 'lucide-react'
import Accordion from '@/components/Accordion'
import { ProductDetailsReviews } from '@/components/ProductDetailsReviews'
import ProductFeatureSection from '@/components/ProductFeatureSection'
import Image from 'next/image'
import NoImage from '@/components/NoImage'
import { calculateDiscountedPrice, formatPrice } from '@/lib/utils/priceUtils'
import VariantSelectionModal from '@/components/VariantSelectionModal'
import { VariantSelection, Crumb } from '@/lib/features/types'

function formatGroupedVariants(variants?: Array<{ variant_type: string; name: string }>) {
  if (!variants) return {};

  return variants.reduce((acc, variant) => {
    let typeKey = variant.variant_type.replace(/_/g, " ");

    if (typeKey.toLowerCase() === "weight") {
      typeKey = "Weight (kg)";
    } else {
      typeKey = typeKey.charAt(0).toUpperCase() + typeKey.slice(1);
    }

    if (!acc[typeKey]) acc[typeKey] = [];
    acc[typeKey].push(variant.name);
    return acc;
  }, {} as Record<string, string[]>);
}

function getWarrantyText(warranty?: { warranty_type?: string; warranty_period?: string }) {
  if (!warranty) {
    return "No warranty information available.";
  }
  return `This product comes with a ${warranty.warranty_type} warranty valid for ${warranty.warranty_period}.`;
}

function ProductPriceDisplay({ product }: Readonly<{ product: any }>) {
  if (product?.variant_selection && product.variant_selection.length > 0) {
    return (
      <span className='text-lg lg:text-[1.5rem] font-bold'>
        {formatPrice(product.price)} - {formatPrice(product.price + Math.max(...product.variant_selection.map((v: any) => v.additional_price)))}
      </span>
    );
  }

  if (product?.discount_type && product?.discount) {
    return (
      <>
        <span className="text-lg lg:text-[1.5rem] font-bold text-[#D0021B]">
          {formatPrice(calculateDiscountedPrice(product.price, product.discount_type, product.discount))}
        </span>
        <span className="text-[1.125rem] text-gray-500 line-through">
          {formatPrice(product.price)}
        </span>
      </>
    );
  }

  return (
    <span className='text-lg lg:text-[1.5rem] font-bold'>KES {product?.price}</span>
  );
}

function StockStatusDisplay({ stockQuantity }: Readonly<{ stockQuantity?: number }>) {
  if ((stockQuantity ?? 0) > 0) {
    return (
      <div className='flex items-center gap-x-[0.5rem]'>
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
          <circle cx="6.5" cy="7" r="6.5" fill="#34C759" />
        </svg>
        <span className='text-base'>In Stock</span>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center gap-x-[0.5rem] bg-[#EDEDF2] py-[2rem]'>
      <span className='text-base'>Sold Out:</span>
      <span className='text-base'>This product is currently unavailable</span>
    </div>
  );
}

function ProductReviewScore({ reviews, reviewPagination }: Readonly<{ reviews: any; reviewPagination: any }>) {
  if (reviews?.average_score === undefined) return null;

  const score = reviews.average_score;
  const totalItems = reviewPagination?.total_items;

  return (
    <div className='flex items-center text-[0.875rem] justify-start gap-x-[0.5rem] mt-[0.75rem]'>
      <ProductStars avarageScore={score} />
      <span>{score} {score > 1 ? "stars" : "star"}</span>
      {totalItems !== undefined && <span className='bg-black rounded-full h-[0.5rem] w-[0.5rem]'></span>}
      {totalItems !== undefined && (
        <span>{totalItems} {totalItems > 1 ? "Reviews" : "Review"}</span>
      )}
    </div>
  );
}

function BundleProductsAccordion({ products }: Readonly<{ products?: any[] }>) {
  if (!products || products.length === 0) return null;

  return (
    <Accordion title="Bundle Products">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
        {products.map((item) => (
          <Link
            key={item.product_id}
            href={`/products/${item.product_id}`}
            className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity"
          >
            {item.urls || item.images ? (
              <div className="w-full aspect-square relative rounded-md overflow-hidden bg-gray-100 border">
                <Image
                  src={getProductImageUrl(item.urls || item.images)}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (<NoImage />)}
            <span className="text-xs text-center mt-1 line-clamp-2 px-1 font-medium">{item.name}</span>
            {item.discount_type && item.discount ? (
              <>
                <span className="text-[1.25rem] font-bold text-[#D0021B]">
                  {formatPrice(calculateDiscountedPrice(item.price, item.discount_type, item.discount))}
                </span>
                <span className="text-[0.875rem] text-gray-500 line-through">
                  {formatPrice(item.price)}
                </span>
              </>
            ) : (
              <span className="text-xs text-center mt-1 line-clamp-2 px-1 font-medium">KES {item.price.toLocaleString()}</span>
            )}
            {item.bundle_quantity && item.bundle_quantity > 0 && (
              <span className="bg-[#D0021B] text-white text-xs text-center font-semibold px-2 py-1 rounded-full shadow-sm">
                x{item.bundle_quantity}
              </span>
            )}
          </Link>
        ))}
      </div>
    </Accordion>
  );
}

function SpecificationsAccordion({ hasVariants, groupedVariants }: Readonly<{ hasVariants: boolean; groupedVariants: Record<string, string[]> }>) {
  if (!hasVariants) return null;

  return (
    <Accordion title="Specifications">
      <ul className="list-disc list-inside ml-5 mt-1">
        {Object.entries(groupedVariants).map(([variantType, names]) => (
          <li key={variantType} className="mb-2">
            <strong>{variantType}:</strong> {names.join(", ")}
          </li>
        ))}
      </ul>
    </Accordion>
  );
}

export default function ProductDetail() {
  const product = useAppSelector(selectProduct)
  const dispatch = useAppDispatch()
  const params = useParams<{ product_id: string }>()
  const [quantity, setQuantity] = useState(1)
  const cartId = useAppSelector(selectCartId)
  const router = useRouter()
  const status = useAppSelector(selectProductStatus)
  const cart = useAppSelector(selectCart)
  const isInCart = cart?.cart_items?.some(item => item?.product.product_id === product?.product_id);
  const [addToCartLoading, setAddToCartLoading] = useState(false)
  const token = useAppSelector(selectUserToken)
  const { setOpenGuestCheckoutModal } = useGuestCheckout()
  const { setIsBuyNow } = useIsBuyNow()
  const reviews = useAppSelector(selectProductReviews)
  const reviewPagination = useAppSelector(selectReviewPagination)
  const brandVariant = product?.product_variants?.find(v => v.variant_type === "brand");
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
  const [isBuyNowFlow, setIsBuyNowFlow] = useState(false);

  const breadCrumb = React.useMemo<Crumb[]>(() => {
    if (!product) return [];
    return [{
      link: `/products/${product.product_id}`,
      name: product.name
    }];
  }, [product]);

  const warranty = getWarrantyText(product?.warranty);

  const groupedVariants = React.useMemo(
    () => formatGroupedVariants(product?.product_variants),
    [product?.product_variants]
  );

  useEffect(() => {
    if (!product) return;
    const cartItem = cart?.cart_items?.find(
      item => item?.product.product_id === product.product_id
    );

    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(product.stock_quantity > 0 ? 1 : 0);
    }
  }, [product, cart?.cart_items]);

  const createAndAdd = (cart_id: string) => {
    if (!product?.product_id || !cart_id) return;
    dispatch(addToCartAsync({ product_id: product.product_id, quantity, cart_id }));

    setTimeout(() => {
      triggerToast("Cart updated successfully!", "success");
      dispatch(getCartAsync({ cart_id }));
    }, 1000);
  };

  const createAndAddBuyNowCart = (cart_id: string) => {
    if (!product?.product_id || !cart_id) return;

    dispatch(addToBuyNowCartAsync({ product_id: product.product_id, quantity, cart_id }));

    setTimeout(() => {
      triggerToast("Cart updated successfully!", "success");
      dispatch(getBuyNowCartAsync({ cart_id }));

      if (token) {
        router.push("/checkout/member/buy-now");
      } else {
        setOpenGuestCheckoutModal(true);
      }
    }, 1000);
  };

  useEffect(() => {
    if (params?.product_id) {
      dispatch(getProductAsync(params.product_id));
      dispatch(getProductReviewsAsync(params.product_id));
    }
  }, [dispatch, params?.product_id]);

  const handleAddToCart = async (addedQuantity: number, variation_sku?: string) => {
    setAddToCartLoading(true);

    if (!cartId && product?.product_id && addedQuantity > 0) {
      dispatch(
        createCartAsync({
          product_id: product.product_id,
          quantity: addedQuantity,
          variation_sku,
          createAndAdd,
        })
      );
    } else {
      if (product?.product_id && cartId) {
        dispatch(addToCartAsync({ product_id: product.product_id, quantity: addedQuantity, cart_id: cartId, variation_sku }));
      }

      if (cartId) {
        setTimeout(() => {
          triggerToast("Cart updated successfully!", "success");
          dispatch(getCartAsync({ cart_id: cartId }));
        }, 1000);
      }
    }
    setTimeout(() => {
      setAddToCartLoading(false);
    }, 1000);
  };

  const handleBuyNowVariantSelection = (selected: { variant: VariantSelection; quantity: number }[]) => {
    const first = selected[0];
    if (first && product?.product_id) {
      dispatch(
        createBuyNowCartAsync({
          product_id: product.product_id,
          quantity: first.quantity,
          variation_sku: first.variant.sku,
          createAndAddBuyNowCart,
        })
      );
      setIsBuyNow(true);
    }
  };

  const handleRegularCartVariantSelection = async (selected: { variant: VariantSelection; quantity: number }[]) => {
    let currentCartId = cartId;

    for (const item of selected) {
      if (!currentCartId && product?.product_id) {
        const result = await dispatch(
          createCartAsync({
            product_id: product.product_id,
            quantity: item.quantity,
            variation_sku: item.variant.sku,
            createAndAdd: (id) => {
              currentCartId = id;
            },
          })
        ).unwrap();

        if (result.data?.cart_id) {
          currentCartId = result.data.cart_id;
        }
      } else if (product?.product_id && currentCartId) {
        await dispatch(
          addToCartAsync({
            product_id: product.product_id,
            quantity: item.quantity,
            cart_id: currentCartId,
            variation_sku: item.variant.sku,
          })
        ).unwrap();
      }
    }

    if (currentCartId) {
      triggerToast("Items added to cart", "success");
      dispatch(getCartAsync({ cart_id: currentCartId }));
    }
  };

  const handleVariantSelectionConfirm = async (selected: { variant: VariantSelection, quantity: number }[]) => {
    setIsVariantModalOpen(false);
    setAddToCartLoading(true);

    if (isBuyNowFlow) {
      handleBuyNowVariantSelection(selected);
    } else {
      await handleRegularCartVariantSelection(selected);
    }

    setAddToCartLoading(false);
  };

  const handleAddToBuyNowCart = async () => {
    if (product?.product_id && quantity > 0) {
      dispatch(
        createBuyNowCartAsync({
          product_id: product.product_id,
          quantity,
          createAndAddBuyNowCart,
        })
      );
      setIsBuyNow(true);
    } else {
      setIsBuyNow(false);
      triggerToast("Please select a valid quantity", 'error');
    }
  };

  const hasVariants = Boolean(product?.variant_selection && product.variant_selection.length > 0);

  const handleAddToCartButtonClick = () => {
    if (hasVariants) {
      setIsBuyNowFlow(false);
      setIsVariantModalOpen(true);
    } else {
      handleAddToCart(quantity);
    }
  };

  const handleBuyNowButtonClick = () => {
    if (hasVariants) {
      setIsBuyNowFlow(true);
      setIsVariantModalOpen(true);
    } else {
      handleAddToBuyNowCart();
    }
  };

  if (status === "loading") {
    return (
      <Navigation>
        <div className="flex flex-col items-center justify-center h-[80vh] text-center space-y-4">
          <LoadingIndicator size="lg" text="Loading product details..." />
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
            className="mt-4 px-5 py-2.5 rounded-full bg-secondary-tenant text-white hover:opacity-90 transition-colors"
          >
            Continue Shopping
          </a>
        </div>
      </Navigation>
    );
  }

  const showQuantitySelector = product.stock_quantity > 0 && (!product.variant_selection || product.variant_selection.length === 0);

  return (
    <Navigation>
      <div className='max-w-[90rem] mx-auto w-full pt-[2rem] lg:pt-[2.5rem]'>
        <div className='my-4 px-[1rem] lg:px-[3rem]'>
          <CustomBreadcrumb crumbs={breadCrumb} />
        </div>

        <div className='mt-[1.5rem] px-[1rem] lg:px-[3rem]'>
          <div className='w-full flex flex-col md:flex-row items-stretch gap-x-[1rem]'>
            <div className='w-full h-full flex-1'>
              <ProductImages />
            </div>

            <div className='w-full flex flex-col justify-start pb-[1rem] flex-1'>
              <h2 className='capitalize text-lg lg:text-[2.25rem] font-medium mt-[0.75rem] md:mt-0'>{product.name}</h2>

              <div className="mt-[0.5rem] flex items-baseline gap-2 flex-wrap">
                <ProductPriceDisplay product={product} />
              </div>

              <ProductReviewScore reviews={reviews} reviewPagination={reviewPagination} />

              {product.description && (
                <div className='text-[0.875rem] lg:text-[1rem] mt-[0.75rem] capitalize'>{customParser(product.description)}</div>
              )}

              <div className='mt-[1.5rem] min-h-[2.5rem]'>
                <StockStatusDisplay stockQuantity={product.stock_quantity} />
              </div>

              {brandVariant && (
                <div className="flex items-center mt-[0.75rem]">
                  <span className="mr-2 font-semibold">Brand:</span>
                  <span className="font-bold underline">{brandVariant.name}</span>
                </div>
              )}

              {product.product_variants?.some(v => v.variant_type.toLowerCase() === "color") && (
                <div className='mt-[0.75rem]'>
                  <h3 className='text-[0.875rem] gap-y-[0.5rem]'>Color</h3>
                  <ProductColors product={product} />
                </div>
              )}

              {hasVariants && (
                <div className='mt-[1rem]'>
                  <h3 className='text-[0.875rem] font-semibold mb-2'>Available Variations</h3>
                  <div className='flex flex-wrap gap-2'>
                    {product.variant_selection!.map((variant) => (
                      <div
                        key={variant.sku}
                        className={`px-3 py-2 border rounded text-sm ${variant.stock_quantity === 0
                          ? 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed'
                          : 'bg-secondary-tenant text-white border-secondary-tenant hover:opacity-90 cursor-pointer transition-colors'
                          }`}>
                        {variant.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {showQuantitySelector && (
                <div className='mt-[1.5rem]'>
                  <h3 className='text-[0.875rem] lg:text-base mb-[1.5rem]'>Quantity</h3>
                  <ProductQuantity
                    setQuantity={setQuantity}
                    quantity={quantity}
                  />
                </div>
              )}

              <Button
                disabled={product.stock_quantity <= 0 || addToCartLoading}
                onClick={handleAddToCartButtonClick}
                className='w-full bg-primary-tenant hover:opacity-90 mt-[1.5rem] h-[3rem]'
              >
                {addToCartLoading && <LoadingIndicator textColor="text-white" />}
                {isInCart ? "Update Cart Item" : "Add to Cart"}
              </Button>

              <Button
                disabled={product.stock_quantity <= 0}
                onClick={handleBuyNowButtonClick}
                className='w-full bg-white border border-primary-tenant text-primary-tenant hover:bg-gray-50 mt-[0.75rem] h-[3rem]'
              >
                Buy Now
              </Button>

              <div className='mt-[1.5rem] flex flex-col gap-y-[1.5rem]'>
                <BundleProductsAccordion products={product.products} />
                {warranty && (
                  <Accordion title="Warranty">
                    <span>{warranty}</span>
                  </Accordion>
                )}
                <SpecificationsAccordion
                  hasVariants={Boolean(product.product_variants && product.product_variants.length > 0)}
                  groupedVariants={groupedVariants}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='px-[1rem] lg:px-[3rem] mb-[2rem] lg:mb-[2.5rem]'>
          <ProductDetailsReviews />
        </div>

        <div className='px-[1rem] lg:px-[3rem] mb-[2rem] lg:mb-[2.5rem]'>
          <NowTrending title="You may also like" />
        </div>

        {Boolean(product.features?.length) && (
          <ProductFeatureSection features={product.features!} />
        )}
      </div>

      <VariantSelectionModal
        product={product}
        isOpen={isVariantModalOpen}
        onClose={() => setIsVariantModalOpen(false)}
        onConfirm={handleVariantSelectionConfirm}
        loading={addToCartLoading}
      />
    </Navigation>
  )
}
