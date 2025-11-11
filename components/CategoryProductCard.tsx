import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/features/types";
import { customeParser } from "@/lib/utils";

export default function CategoryProductCard({ product, listingName }: { product: Product, listingName: string }) {
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
  console.log(product)

  return (
    <Link
      href={`/products/${productId}`}
      className="block bg-white overflow-hidden cursor-pointer"
    >
      <div className="relative w-full h-[18rem] sm:h-[20rem] md:h-[20rem] lg:h-[22rem]">
        {product.urls?.[0]?.url && (
          <Image
            src={product.urls[0].url}
            alt=""
            unoptimized
            fill
            className="product-card object-cover z-0"
          />
        )}

<<<<<<< Updated upstream
        {
          product?.tag && <div className="bg-[#A75B5B] w-[4.8rem] h-[1.93rem] absolute z-10 flex justify-center items-center rounded-tr-[0.5rem] rounded-br-[0.5rem] mt-[1rem]">
            <span className="text-[0.75rem] text-white font-bold">{product?.tag}</span>
=======
        {isNewIn && (
          <div className="bg-[#A75B5B] w-[4.8rem] h-[1.93rem] absolute z-10 flex justify-center items-center rounded-tr-[0.5rem] rounded-br-[0.5rem] mt-[1rem]">
            <span className="text-[0.75rem] text-white font-bold">{listingName}</span>
>>>>>>> Stashed changes
          </div>
        }
      </div>

      <div className="pt-4">
        {/* <h3 className="truncate text-[#666] font-roboto text-[0.875rem] font-semibold leading-6 capitalize">
          {product?.brand}
        </h3> */}
        <div className="text-custom-black font-poppins text-sm lg:text-[1.125rem] leading-[1.3rem] mt-1 line-clamp-2 capitalize">
          {customeParser(product.name)}
        </div>
        <p className="mt-2 text-[1.25rem] font-bold text-custom-black">
          KES {product.price}
        </p>
      </div>
    </Link>
  );
}
