import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/features/types";
import { customParser, COVER_VIDEO_CONFIG, getProductImageUrl, extractVideoId } from "@/lib/utils";
import VideoPlayer from "./VideoPlayer";
import NoImage from "./NoImage";
import { calculateDiscountedPrice, formatPrice } from "@/lib/utils/priceUtils";

interface CategoryProductCardProps {
  product: Product;
  discountType?: 'percentage' | 'fixed' | (string & {}) | null;
  discountValue?: number | string | null;
}

export default function CategoryProductCard({
  product,
  discountType,
  discountValue
}: Readonly<CategoryProductCardProps>) {
  const [productId, setProductId] = useState<string | null>(null);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video">("image");

  useEffect(() => {
    if (product?.id) {
      setProductId(product.id);
    } else if (product?.product_id) {
      setProductId(product.product_id);
    } else {
      setProductId(null);
    }
  }, [product?.id, product?.product_id]);

  useEffect(() => {
    if (product?.urls && product.urls.length > 0) {
      // 1. Check for video first to ensure it's displayed if available
      const videoMedia = product.urls.find((media) => media.type === "video" && extractVideoId(media.url));

      if (videoMedia) {
        setMediaUrl(videoMedia.url);
        setMediaType("video");
      } else {
        const imageUrl = getProductImageUrl(product.urls);
        setMediaUrl(imageUrl);
        setMediaType("image");
      }
    } else {
      setMediaUrl(null);
    }
  }, [product?.urls]);

  if (!productId) {
    return null;
  }

  let mediaContent;
  if (mediaType === "video" && mediaUrl) {
    mediaContent = (
      <VideoPlayer
        url={mediaUrl}
        config={COVER_VIDEO_CONFIG}
        className="product-card object-cover z-0 w-full h-full"
      />
    );
  } else if (mediaUrl) {
    mediaContent = (
      <Image
        src={mediaUrl}
        alt=""
        unoptimized
        fill
        className="product-card object-cover z-0"
      />
    );
  } else {
    mediaContent = <NoImage />;
  }

  return (
    <Link
      href={`/products/${productId}`}
      className="block bg-card hover:bg-accent/20 rounded-lg border border-border/50 p-3 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary-tenant/50 group"
    >
      <div className="relative w-full h-[18rem] sm:h-[20rem] md:h-[20rem] lg:h-[22rem] rounded-md overflow-hidden">
        {mediaContent}

        {
          product?.tag && <div className="bg-primary-tenant text-primary-foreground w-[4.8rem] h-[1.93rem] absolute top-2 left-0 z-10 flex justify-center items-center rounded-tr-[0.5rem] rounded-br-[0.5rem] shadow-sm">
            <span className="text-[0.75rem] font-bold">{product?.tag}</span>
          </div>
        }

      </div>

      <div className="pt-3">
        <div className="text-foreground font-poppins text-sm lg:text-[1rem] font-semibold leading-[1.3rem] mt-1 line-clamp-2 capitalize group-hover:text-primary-tenant transition-colors">
          {customParser(product.name)}
        </div>
        <div className="mt-2 flex items-baseline gap-2 flex-wrap">
          {discountType && discountValue ? (
            <>
              <p className="text-[1.125rem] font-bold text-destructive">
                {formatPrice(calculateDiscountedPrice(product.price, discountType, discountValue))}
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
