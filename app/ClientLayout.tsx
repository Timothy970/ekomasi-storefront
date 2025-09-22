"use client";
import React, { createContext, useContext, useEffect, useState } from 'react'
import "@fontsource/league-spartan";
import "@fontsource/league-spartan/400.css";

type FilterContextType = {
    openFilterModal: boolean
    setOpenFilterModal: React.Dispatch<React.SetStateAction<boolean>>
}

type SearchContextType = {
    openSearchModal: boolean
    setOpenSearchModal: React.Dispatch<React.SetStateAction<boolean>>
}

type GuestCheckoutContextType = {
    openGuestCheckoutModal: boolean;
    setOpenGuestCheckoutModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined)
const GuestCheckoutContext = createContext<GuestCheckoutContextType | undefined>(undefined);
const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function useFilter() {
    const ctx = useContext(FilterContext)
    if (!ctx) throw new Error("useFilter must be used within FilterProvider")
    return ctx
}

export function useGuestCheckout() {
    const ctx = useContext(GuestCheckoutContext);
    if (!ctx) throw new Error("useGuestCheckout must be used within GuestCheckoutProvider");
    return ctx;
}

export function useSearchModal() {
    const ctx = useContext(SearchContext);
    if (!ctx) throw new Error("SearchContext must be used within SearchContext");
    return ctx;
}

export default function ClientLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const [mounted, setMounted] = useState(false);
    const [openFilterModal, setOpenFilterModal] = useState(false)
    const [openGuestCheckoutModal, setOpenGuestCheckoutModal] = useState(false);
    const [openSearchModal, setOpenSearchModal] = useState(false)

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div />;
    }

    return (
        <FilterContext.Provider value={{ openFilterModal, setOpenFilterModal }}>
            <GuestCheckoutContext.Provider value={{ openGuestCheckoutModal, setOpenGuestCheckoutModal }}>
                <SearchContext.Provider value={{ openSearchModal, setOpenSearchModal }}>
                    <main className={`bg-white h-screen w-screen flex justify-between flex-col items-center z-0 ${openSearchModal ? 'overflow-hidden' : ''}`}>
                        {children}
                    </main>
                </SearchContext.Provider>
            </GuestCheckoutContext.Provider>
        </FilterContext.Provider>
    )
}
