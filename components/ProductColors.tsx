"use client";
import { Product } from "@/lib/features/types";
import React from "react";

export default function ProductColors({ product }: Readonly<{ product: Product }>) {
    const colorVariants = product.product_variants?.filter((v) => v.variant_type.toLowerCase() === "color") || [];

    if (!colorVariants) {
        return <></>
    }

    return (
        <div className="flex gap-2 mt-[1rem]">
            {colorVariants.map((variant) => (
                <div
                    key={variant.variant_id}
                    className="w-10 h-10 rounded-full border"
                    style={{ backgroundColor: variant.name }}
                />
            ))}
        </div>
    );
}
