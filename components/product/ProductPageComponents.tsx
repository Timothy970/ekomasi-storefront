import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProductStars from '@/components/ProductStars';
import Accordion from '@/components/Accordion';
import NoImage from '@/components/NoImage';
import { formatPrice, calculateDiscountedPrice } from '@/lib/utils/priceUtils';
import { getProductImageUrl } from '@/lib/utils';

export function formatGroupedVariants(variants?: Array<{ variant_type: string; name: string }>) {
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

export function getWarrantyText(warranty?: { warranty_type?: string; warranty_period?: string }) {
  if (!warranty) {
    return "No warranty information available.";
  }
  return `This product comes with a ${warranty.warranty_type} warranty valid for ${warranty.warranty_period}.`;
}

export function ProductPriceDisplay({ product }: Readonly<{ product: any }>) {
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

export function StockStatusDisplay({ stockQuantity }: Readonly<{ stockQuantity?: number }>) {
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

export function ProductReviewScore({ reviews, reviewPagination }: Readonly<{ reviews: any; reviewPagination: any }>) {
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

export function BundleProductsAccordion({ products }: Readonly<{ products?: any[] }>) {
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
              <span className="text-xs text-gray-600 font-semibold">{formatPrice(item.price)}</span>
            )}
          </Link>
        ))}
      </div>
export function SpecificationsAccordion({ hasVariants, groupedVariants }: Readonly<{ hasVariants: boolean; groupedVariants: Record<string, string[]> }>) {
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

