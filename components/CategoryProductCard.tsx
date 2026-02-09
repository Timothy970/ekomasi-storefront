import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product, ReactPlayerProps } from "@/lib/features/types";
import { customParser, COVER_VIDEO_CONFIG } from "@/lib/utils";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false
}) as React.ComponentType<ReactPlayerProps>;

export default function CategoryProductCard({ product }: { product: Product }) {
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
      const imageMedia = product.urls.find(
        (media) => media.type === "gallery" || media.type === "thumbnail"
      );

      if (imageMedia) {
        setMediaUrl(imageMedia.url);
        setMediaType("image");
      } else {
        const videoMedia = product.urls.find((media) => media.type === "video");

        if (videoMedia) {
          setMediaUrl(videoMedia.url);
          setMediaType("video");
        } else {
          setMediaUrl(product.urls[0]?.url || null);
          setMediaType("image");
        }
      }
    }
  }, [product?.urls]);

  if (!productId) {
    return null;
  }

  return (
    <Link
      href={`/products/${productId}`}
      className="block bg-white overflow-hidden cursor-pointer"
    >
      <div className="relative w-full h-[18rem] sm:h-[20rem] md:h-[20rem] lg:h-[22rem]">
        {mediaType === "video" && mediaUrl ? (
          <ReactPlayer
            url={mediaUrl}
            playing={true}
            loop={true}
            muted={true}
            playsInline={true}
            width="100%"
            height="100%"
            config={COVER_VIDEO_CONFIG}
            className="product-card object-cover z-0 w-full h-full"
          />
        ) : (
          mediaUrl && (
            <Image
              src={mediaUrl}
              alt=""
              unoptimized
              fill
              className="product-card object-cover z-0"
            />
          )
        )}

        {
          product?.tag && <div className="bg-[#A75B5B] w-[4.8rem] h-[1.93rem] absolute z-10 flex justify-center items-center rounded-tr-[0.5rem] rounded-br-[0.5rem] mt-[1rem]">
            <span className="text-[0.75rem] text-white font-bold">{product?.tag}</span>
          </div>
        }
      </div>

      <div className="pt-4">
        {/* <h3 className="truncate text-[#666] font-roboto text-[0.875rem] font-semibold leading-6 capitalize">
          {product?.brand}
        </h3> */}
        <div className="text-custom-black font-poppins text-sm lg:text-[1.125rem] leading-[1.3rem] mt-1 line-clamp-2 capitalize">
          {customParser(product.name)}
        </div>
        <p className="mt-2 text-[1.25rem] font-bold text-custom-black">
          KES {product.price}
        </p>
      </div>
    </Link>
  );
}
