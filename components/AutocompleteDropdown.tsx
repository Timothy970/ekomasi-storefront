"use client";

import { useSearchModal } from "@/app/ClientLayout";
import React from "react";
import Link from "next/link";
import { useAppSelector } from "@/lib/hooks";
import { selectAutocomplete } from "@/lib/features/mall/mallSlice";

export default function AutocompleteDropdown() {
    const { openSearchModal } = useSearchModal();
    const autocomplete = useAppSelector(selectAutocomplete);
    console.log(autocomplete, 'autocomplete')

    if (!openSearchModal || autocomplete == null) return null;

    return (
        <div className="absolute top-full left-0 w-full max-h-[23rem] overflow-y-auto bg-white border border-gray-200 rounded-md ">
            <ul>
                {autocomplete?.map((item, index) => {
                    let href = item.link;

                    switch (item.type) {
                        case "product":
                            href = `/products/${item.id}`;
                            break;
                        case "subcategory":
                            href = `/subcategory/${item.id}`;
                            break;
                        case "category":
                            href = `/category/${item.id}`;
                            break;
                        case "search":
                            href = item.link;
                            break;
                    }

                    return (
                        <li key={index?.toString()}>
                            <Link
                                href={href}
                                className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition"
                            >
                                {item.display_name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
