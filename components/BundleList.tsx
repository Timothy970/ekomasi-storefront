"use client";

import Image from "next/image";
import { Bundle } from "@/lib/features/types";
import React from "react";

interface Props {
    bundles: Bundle[];
}

export default function BundleList({ bundles }:Readonly< Props>) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bundles.map((bundle) => (
                <div
                    key={bundle.id || bundle.product_id || bundle.name}
                    className="border rounded-2xl shadow-sm bg-white p-5"
                >
                    <h2 className="text-lg font-semibold">{bundle.name}</h2>

                    <p
                        className="text-sm text-gray-600 mt-2 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: bundle.description }}
                    />

                    {/* <div className="mt-3 flex items-center gap-3">
                        <span className="text-xl font-bold">${bundle.price}</span>

                        {bundle.compare_at_price > bundle.bundle_price && (
                            <span className="line-through text-gray-400">
                                ${bundle.compare_at_price}
                            </span>
                        )}
                    </div> */}

                    {/* Add first product image */}
                    {bundle.products?.[0]?.urls?.[0]?.url && (
                        <div className="mt-4 w-full h-48 rounded-lg overflow-hidden relative">
                            <Image
                                src={bundle.products[0].urls[0].url}
                                alt={bundle.products[0].name}
                                fill
                                unoptimized
                                className="object-cover"
                            />
                        </div>
                    )}

                    <div className="mt-4 space-y-2">
                        {(bundle.products ?? []).map((product) => (
                            <div key={product.product_id} className="p-2 rounded-md bg-gray-50 border">
                                <p className="text-sm font-medium">{product.name}</p>
                                <p className="text-xs text-gray-500">
                                    SKU: {product.sku} • ${product.price}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
