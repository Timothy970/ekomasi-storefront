"use client";

import { useSearchModal } from "@/app/ClientLayout";
import React from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectAutocomplete, setSearchTerm } from "@/lib/features/mall/mallSlice";
import { useRouter } from "next/navigation";
import { Suggestion } from "@/lib/features/types";

export default function AutocompleteDropdown() {
    const { openSearchModal, setOpenSearchModal } = useSearchModal();
    const autocomplete = useAppSelector(selectAutocomplete);
    const dispatch = useAppDispatch()
    const router = useRouter()

    const handleAutocompleteClick = (item: Suggestion) => {
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
                const params = new URLSearchParams();
                params.set("q", item.name);
                href = `/search?${params.toString()}`;
                // dispatch(setSearchTerm(item.name))
                break;
            default:
                href = `/search?q=${encodeURIComponent(item?.name.trim())}`;
                break;
        }
        setOpenSearchModal(false)
        router.push(href);
    }

    if (!openSearchModal || autocomplete == null) return null;

    return (
        <div className="absolute top-full left-0 w-full max-h-[23rem] overflow-y-auto bg-white border border-gray-200 rounded-md ">
            <ul>
                {autocomplete?.map((item, index) => {
                    return (
                        <li key={index?.toString()}>
                            <div
                                onClick={() => {
                                    handleAutocompleteClick(item);
                                }}
                                className="block px-4 my-1 py-2 text-sm text-gray-800 hover:bg-gray-100 transition"
                            >
                                {item.display_name}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
