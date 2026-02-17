import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/features/types";
import { customParser, getProductImageUrl } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
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
      className="block bg-white overflow-hidden cursor-pointer"
    >
      <div className="relative w-full h-[18rem] sm:h-[20rem] md:h-[20rem] lg:h-[22rem]">
        {<Image
          src={imageUrl}
          alt={product.name}
          unoptimized
          fill
          className="product-card object-cover z-0"
        />
        }

        {
          product?.tag && <div className="bg-[#A75B5B] w-[4.8rem] h-[1.93rem] absolute z-10 flex justify-center items-center rounded-tr-[0.5rem] rounded-br-[0.5rem] mt-[1rem]">
            <span className="text-[0.75rem] text-white font-bold">{product?.tag}</span>
          </div>
        }
      </div>

      <div className="pt-4">
        <h3 className="truncate text-[#666] font-roboto text-[0.875rem] font-semibold leading-6 capitalize">
          {product.name}
        </h3>
        <div className="text-custom-black font-poppins text-sm lg:text-[1.125rem] leading-[1.3rem] mt-1 line-clamp-2 capitalize">
          {customParser(product.description)}
        </div>
        <p className="mt-2 text-[1.25rem] font-bold text-custom-black">
          KES {product.price}
        </p>
      </div>
    </Link>
  );
}
