"use client";
import { Input } from "@/components/ui/input";
import { useRef, useState, useEffect } from "react";
import SearchBackground from "./SearchBackground";
import { useSearchModal } from "@/app/ClientLayout";
import AutocompleteDropdown from "./AutocompleteDropdown";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getSearchAutocompleteAsync, selectSearchTerm, setSearchTerm } from "@/lib/features/mall/mallSlice";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar({ placeHolderText }: { placeHolderText: string }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const { openSearchModal, setOpenSearchModal } = useSearchModal();
    const dispatch = useAppDispatch();
    const [query, setQuery] = useState<string>("");
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const searchTerm = useAppSelector(selectSearchTerm)
    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter()
    const searchParams = useSearchParams();

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 400);

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    useEffect(() => {
        const q = searchParams.get("q");
        if (q) {
            setQuery(q);
            dispatch(setSearchTerm(q));
        }
    }, [searchParams, dispatch]);

    useEffect(() => {
        if (searchTerm) {
            setQuery(searchTerm)
        }
    }, [searchTerm])

    useEffect(() => {
        const handleFocus = () => setIsFocused(true);
        const handleBlur = () => setIsFocused(false);

        const input = inputRef.current;
        if (!input) return;

        input.addEventListener('focus', handleFocus);
        input.addEventListener('blur', handleBlur);

        return () => {
            input.removeEventListener('focus', handleFocus);
            input.removeEventListener('blur', handleBlur);
        };
    }, []);

    const handleClear = () => {
        setQuery("");
        dispatch(setSearchTerm(""));
        inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && query.trim().length > 0) {
            e.preventDefault();
            setOpenSearchModal(false);
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    useEffect(() => {
        if (debouncedQuery.trim().length > 0) {
            dispatch(getSearchAutocompleteAsync({ query: debouncedQuery }));
        }
    }, [debouncedQuery, dispatch]);

    return (
        <div className="">
            <div className="h-[2rem] flex items-center w-full md:w-[30rem] lg:w-[42rem] relative z-[2000]">
                <Input
                    ref={inputRef}
                    placeholder={placeHolderText}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setOpenSearchModal(true)}
                    onKeyDown={handleKeyDown}
                    className="w-full h-full pl-4 pr-10 text-[0.875rem] rounded-lg border border-[#AAA] bg-white"
                />

                {query ? (
                    <div className="absolute right-2 h-full flex items-center cursor-pointer border-l border-[#AAA] w-[2.25rem] justify-center">
                        <button
                            type="button"
                            onMouseDown={(e) => {
                                e.preventDefault();
                                handleClear();
                            }}
                            className="flex items-center justify-center text-gray-500 hover:text-black"
                        >
                            <X />
                        </button>
                    </div>
                ) : <div
                    className="absolute right-2 h-full flex items-center cursor-pointer border-l border-[#AAA] w-[2.25rem] justify-center"
                    onClick={() => !isFocused ? inputRef.current?.focus() : null}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 19"
                        fill="none"
                    >
                        <path
                            d="M8.5 16C10.275 15.9996 11.9988 15.4054 13.397 14.312L17.793 18.708L19.207 17.294L14.811 12.898C15.905 11.4997 16.4996 9.77544 16.5 8C16.5 3.589 12.911 0 8.5 0C4.089 0 0.5 3.589 0.5 8C0.5 12.411 4.089 16 8.5 16ZM8.5 2C11.809 2 14.5 4.691 14.5 8C14.5 11.309 11.809 14 8.5 14C5.191 14 2.5 11.309 2.5 8C2.5 4.691 5.191 2 8.5 2Z"
                            fill="#444444"
                        />
                        <path
                            d="M9.91201 6.58609C10.291 6.96609 10.5 7.46809 10.5 8.00009H12.5C12.5009 7.47451 12.3976 6.95398 12.1961 6.46857C11.9946 5.98316 11.6989 5.54251 11.326 5.17209C9.81201 3.66009 7.18701 3.66009 5.67401 5.17209L7.08601 6.58809C7.84601 5.83009 9.15601 5.83209 9.91201 6.58609Z"
                            fill="#444444"
                        />
                    </svg>
                </div>
                }

                {openSearchModal && query?.length > 0 && <AutocompleteDropdown />}
            </div>



            {
                query?.length > 0 && <SearchBackground />
            }
        </div>
    );
}
