"use client";
import React, { createContext, useContext, useEffect, useState } from 'react'
import "@fontsource/league-spartan";
import "@fontsource/league-spartan/400.css";
import { useSearchParams } from "next/navigation";

type FilterContextType = {
    openFilterModal: boolean
    setOpenFilterModal: React.Dispatch<React.SetStateAction<boolean>>
}

type ReviewContextType = {
    openReviewModal: boolean
    setOpenReviewModal: React.Dispatch<React.SetStateAction<boolean>>
}

type SearchContextType = {
    openSearchModal: boolean
    setOpenSearchModal: React.Dispatch<React.SetStateAction<boolean>>
}

type GuestCheckoutContextType = {
    openGuestCheckoutModal: boolean;
    setOpenGuestCheckoutModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type isBuyNowContextType = {
    isBuyNow: boolean;
    setIsBuyNow: React.Dispatch<React.SetStateAction<boolean>>;
};

type isEditingAdressContextType = {
    isEditingAddress: boolean;
    setIsEditingAddress: React.Dispatch<React.SetStateAction<boolean>>;
};

type QueryContextType = {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
};

type ShareWishlistModalContextType = {
    isShareWishlistModalOpen: boolean;
    setShareWishlistModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type VoucherSuccessModalContextType = {
    voucherSuccessModalOpen: boolean;
    setVoucherSuccessModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined)
const ReviewContext = createContext<ReviewContextType | undefined>(undefined)
const GuestCheckoutContext = createContext<GuestCheckoutContextType | undefined>(undefined);
const IsBuyNowContext = createContext<isBuyNowContextType | undefined>(undefined);
const IsEditingAdressContext = createContext<isEditingAdressContextType | undefined>(undefined);
const SearchContext = createContext<SearchContextType | undefined>(undefined);
const QueryContext = createContext<QueryContextType | undefined>(undefined);
const ShareWishlistModalContext = createContext<ShareWishlistModalContextType | undefined>(undefined);
const VoucherSuccessModalContext = createContext<VoucherSuccessModalContextType | undefined>(undefined);

export function useFilter() {
    const ctx = useContext(FilterContext)
    if (!ctx) throw new Error("useFilter must be used within FilterProvider")
    return ctx
}

export function useVoucher() {
    const ctx = useContext(VoucherSuccessModalContext)
    if (!ctx) throw new Error("useVoucher must be used within VoucherProvider")
    return ctx
}

export function useReview() {
    const ctx = useContext(ReviewContext)
    if (!ctx) throw new Error("useReview must be used within ReviewProvider")
    return ctx
}

export function useGuestCheckout() {
    const ctx = useContext(GuestCheckoutContext);
    if (!ctx) throw new Error("useGuestCheckout must be used within GuestCheckoutProvider");
    return ctx;
}

export function useIsBuyNow() {
    const ctx = useContext(IsBuyNowContext);
    if (!ctx) throw new Error("useIsBuyNow must be used within IsBuyNowProvider");
    return ctx;
}

export function useIsEditingAdress() {
    const ctx = useContext(IsEditingAdressContext);
    if (!ctx) throw new Error("useIsBuyNow must be used within IsBuyNowProvider");
    return ctx;
}

export function useSearchModal() {
    const ctx = useContext(SearchContext);
    if (!ctx) throw new Error("SearchContext must be used within SearchContext");
    return ctx;
}

export function useFilterQuery() {
    const ctx = useContext(QueryContext);
    if (!ctx) throw new Error("SearchContext must be used within SearchContext");
    return ctx;
}

export function useShareWishlistModal() {
    const ctx = useContext(ShareWishlistModalContext);
    if (!ctx) throw new Error("useShareWishlistModal must be used within ShareWishlistModalProvider");
    return ctx;
}

export default function ClientLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const [mounted, setMounted] = useState(false);
    const [openFilterModal, setOpenFilterModal] = useState(false)
    const [openReviewModal, setOpenReviewModal] = useState(false)
    const [openGuestCheckoutModal, setOpenGuestCheckoutModal] = useState(false);
    const [isBuyNow, setIsBuyNow] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [openSearchModal, setOpenSearchModal] = useState(false)
    const searchParams = useSearchParams();
    const [query, setQuery] = useState<string>(searchParams.toString());
    const [isShareWishlistModalOpen, setShareWishlistModalOpen] = useState(false);
    const [voucherSuccessModalOpen, setVoucherSuccessModalOpen] = useState(true);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div />;
    }

    return (
        <VoucherSuccessModalContext.Provider value={{ voucherSuccessModalOpen, setVoucherSuccessModalOpen }}>
            <ReviewContext.Provider value={{ openReviewModal, setOpenReviewModal }}>
                <ShareWishlistModalContext.Provider value={{ isShareWishlistModalOpen, setShareWishlistModalOpen }}>
                    <FilterContext.Provider value={{ openFilterModal, setOpenFilterModal }}>
                        <IsBuyNowContext.Provider value={{ isBuyNow, setIsBuyNow }}>
                            <IsEditingAdressContext.Provider value={{ isEditingAddress, setIsEditingAddress }}>
                                <GuestCheckoutContext.Provider value={{ openGuestCheckoutModal, setOpenGuestCheckoutModal }}>
                                    <SearchContext.Provider value={{ openSearchModal, setOpenSearchModal }}>
                                        <QueryContext.Provider value={{ query, setQuery }}>
                                            <main className={`bg-white h-screen w-screen flex justify-between flex-col items-center z-0 ${openSearchModal ? 'overflow-hidden' : ''}`}>
                                                {children}
                                            </main>
                                        </QueryContext.Provider>
                                    </SearchContext.Provider>
                                </GuestCheckoutContext.Provider>
                            </IsEditingAdressContext.Provider>
                        </IsBuyNowContext.Provider>
                    </FilterContext.Provider>
                </ShareWishlistModalContext.Provider>
            </ReviewContext.Provider>
        </VoucherSuccessModalContext.Provider>
    )
}
