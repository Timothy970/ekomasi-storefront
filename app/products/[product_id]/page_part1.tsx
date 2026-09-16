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

import {
  formatGroupedVariants,
  getWarrantyText,
  ProductPriceDisplay,
  StockStatusDisplay,
  ProductReviewScore,
  BundleProductsAccordion,
  SpecificationsAccordion
} from '@/components/product/ProductPageComponents';
import { ProductLoadingView, ProductNotFoundView } from '@/components/product/ProductStateViews';

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
  if (status === "loading") {
    return <ProductLoadingView />;
  }

  if (!product) {
    return <ProductNotFoundView />;
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