"use client";

import { useSearchModal } from "@/app/ClientLayout";
import React from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectAutocomplete, setSearchTerm } from "@/lib/features/mall/mallSlice";
import { useRouter } from "next/navigation";

export default function AutocompleteDropdown() {
    const { openSearchModal, setOpenSearchModal } = useSearchModal();
    const autocomplete = useAppSelector(selectAutocomplete);
    const dispatch = useAppDispatch()
    const router = useRouter()

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
                            <div
                                onClick={() => {
                                    dispatch(setSearchTerm(item?.name));
                                    setOpenSearchModal(false)
                                    router.push(`/search?q=${item?.name}`)
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
