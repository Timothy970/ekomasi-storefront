"use client";

import { useSearchModal } from "@/app/ClientLayout";
import React, { useMemo } from "react";
import { useAppSelector } from "@/lib/hooks";
import { selectAutocomplete } from "@/lib/features/mall/mallSlice";
import { useRouter } from "next/navigation";
import { Suggestion } from "@/lib/features/types";

import { Button } from "@/components/ui/button";

export default function AutocompleteDropdown() {
    const { setOpenSearchModal } = useSearchModal();
    const autocomplete = useAppSelector(selectAutocomplete);
    const router = useRouter()

    // Remove duplicates, prioritizing products
    const uniqueAutocomplete = useMemo(() => {
        if (!autocomplete) return null;

        const seen = new Map<string, Suggestion>();

        autocomplete.forEach((item) => {
            const key = item.name.toLowerCase().trim();
            const existing = seen.get(key);

            // If no existing item or existing item is not a product but current is, replace it
            if (!existing || (existing.type !== "product" && item.type === "product")) {
                seen.set(key, item);
            }
        });

        return Array.from(seen.values());
    }, [autocomplete]);

    const handleAutocompleteClick = (item: Suggestion) => {
        let href;
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
            case "search": {
                const params = new URLSearchParams();
                params.set("q", item.name);
                href = `/search?${params.toString()}`;
                break;
            }
            default:
                href = `/search?q=${encodeURIComponent(item?.name.trim())}`;
                break;
        }

        setOpenSearchModal(false);
        router.push(href);
    };

    if (uniqueAutocomplete == null) return null;

    return (
        <div className="absolute top-full left-0 w-full max-h-[23rem] overflow-y-auto bg-white border border-gray-200 rounded-md">
            <ul role="listbox" aria-label="Autocomplete suggestions">
                {uniqueAutocomplete?.map((item, index) => {
                    return (
                        <li key={`${item.type}-${item.id}-${index}`} role="option" aria-selected={false}>
                            <Button
                                variant="ghost"
                                onClick={() => handleAutocompleteClick(item)}
                                onMouseDown={(e) => e.preventDefault()}
                                className="block w-full text-left px-4 my-1 py-2 text-sm text-gray-800 hover:bg-gray-100 transition cursor-pointer font-normal h-auto rounded-none justify-start"
                            >
                                {item.display_name}
                            </Button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
