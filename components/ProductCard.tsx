import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/features/types";
import { customParser, getProductImageUrl } from "@/lib/utils";
import NoImage from "./NoImage";
import { calculateDiscountedPrice, formatPrice } from "@/lib/utils/priceUtils";

export default function ProductCard({ product }: Readonly<{ product: Product }>) {
  const [productId, setProductId] = useState<string | null>(null);

  useEffect(() => {
    if (product?.id) {
      setProductId(product.id);
    } else if (product?.product_id) {
      setProductId(product.product_id);
    } else {
      setProductId(null);
    }
  }, [product?.id, product?.product_id]);

  if (!productId) {
    return null;
  }

  const imageUrl = getProductImageUrl(product.urls);

  return (
    <Link
      href={`/products/${productId}`}
      className="block bg-card hover:bg-accent/20 rounded-lg border border-border/50 p-3 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary-tenant/50 group"
    >
      <div className="relative w-full h-[18rem] sm:h-[20rem] md:h-[20rem] lg:h-[22rem] rounded-md overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            unoptimized
            fill
            className="product-card object-cover z-0 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <NoImage />
        )}

        {
          product?.tag && <div className="bg-primary-tenant text-primary-foreground w-[4.8rem] h-[1.93rem] absolute top-2 left-0 z-10 flex justify-center items-center rounded-tr-[0.5rem] rounded-br-[0.5rem] shadow-sm">
            <span className="text-[0.75rem] font-bold">{product?.tag}</span>
          </div>
        }

      </div>

      <div className="pt-3">
        <h3 className="truncate text-muted-foreground font-roboto text-[0.875rem] font-medium leading-6 capitalize group-hover:text-primary-tenant transition-colors">
          {product.name}
        </h3>
        <div className="text-foreground font-poppins text-sm lg:text-[1rem] font-semibold leading-[1.3rem] mt-1 line-clamp-2 capitalize">
          {customParser(product.description)}
        </div>
        <div className="mt-2 flex items-baseline gap-2 flex-wrap">
          {product?.discount_type && product?.discount ? (
            <>
              <p className="text-[1.125rem] font-bold text-destructive">
                {formatPrice(calculateDiscountedPrice(product.price, product.discount_type, product.discount))}
              </p>
              <p className="text-[0.875rem] text-muted-foreground line-through">
                {formatPrice(product.price)}
              </p>
            </>
          ) : (
            <p className="text-[1.125rem] font-bold gold-text">
              {formatPrice(product.price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
