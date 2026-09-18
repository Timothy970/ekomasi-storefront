"use client";
import React, { createContext, useContext, useEffect, useState } from 'react'
import "@fontsource/league-spartan";
import "@fontsource/league-spartan/400.css";
import { useSearchParams } from "next/navigation";
import axios from 'axios';

import { activeTheme } from '@/lib/config/theme';

export type Tenant = {
    id: number;
    name: string;
    domain: string;
    slogan: string;
    logo: string;
    app_logo?: string;
    admin_logo?: string;
}

type TenantContextType = {
    tenant: Tenant | null;
    loading: boolean;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function useTenant() {
    const ctx = useContext(TenantContext);
    if (!ctx) throw new Error("useTenant must be used within TenantProvider");
    return ctx;
}

type FilterContextType = {
    openFilterModal: boolean
    setOpenFilterModal: React.Dispatch<React.SetStateAction<boolean>>
}

type ReviewContextType = {
    openReviewModal: boolean
    setOpenReviewModal: React.Dispatch<React.SetStateAction<boolean>>
}

type PaymentContextType = {
    openPaymentModal: boolean
    setOpenPaymentModal: React.Dispatch<React.SetStateAction<boolean>>
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
const PaymentContext = createContext<PaymentContextType | undefined>(undefined)
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

export function usePayment() {
    const ctx = useContext(PaymentContext)
    if (!ctx) throw new Error("usePayment must be used within PaymentProvider")
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
    const [voucherSuccessModalOpen, setVoucherSuccessModalOpen] = useState(false);
    const [openPaymentModal, setOpenPaymentModal] = useState(false);
    
    const [tenant, setTenant] = useState<Tenant | null>(null);
    const [tenantLoading, setTenantLoading] = useState(true);

    useEffect(() => {
        setMounted(true);
        if (typeof document !== 'undefined') {
            const root = document.documentElement;
            root.style.setProperty('--primary', activeTheme.primary);
            root.style.setProperty('--primary-foreground', activeTheme.primaryForeground);
            root.style.setProperty('--secondary', activeTheme.secondary);
            root.style.setProperty('--secondary-foreground', activeTheme.secondaryForeground);
            root.style.setProperty('--minor', activeTheme.minor);
            root.style.setProperty('--ebony', activeTheme.ebony);
            root.style.setProperty('--background', activeTheme.background);
            root.style.setProperty('--foreground', activeTheme.foreground);
            root.style.setProperty('--card', activeTheme.card);
            root.style.setProperty('--card-foreground', activeTheme.cardForeground);
            root.style.setProperty('--muted', activeTheme.muted);
            root.style.setProperty('--muted-foreground', activeTheme.mutedForeground);
            root.style.setProperty('--accent', activeTheme.accent);
            root.style.setProperty('--accent-foreground', activeTheme.accentForeground);
            root.style.setProperty('--border', activeTheme.border);
            root.style.setProperty('--ring', activeTheme.ring);
        }
        const fetchTenant = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8009/api/';
                const res = await axios.get(`${baseUrl}tenant/active`);
                if (res.data?.data) {
                    const t = res.data.data;
                    setTenant(t);
                    if (t.name) {
                        document.title = t.name + (t.slogan ? ` - ${t.slogan}` : "");
                    }
                }
            } catch (e) {
                console.error("Failed to fetch active tenant:", e);
            } finally {
                setTenantLoading(false);
            }
        };
        fetchTenant();
    }, []);

    const tenantVal = React.useMemo(() => ({ tenant, loading: tenantLoading }), [tenant, tenantLoading]);
    const paymentVal = React.useMemo(() => ({ openPaymentModal, setOpenPaymentModal }), [openPaymentModal]);
    const voucherVal = React.useMemo(() => ({ voucherSuccessModalOpen, setVoucherSuccessModalOpen }), [voucherSuccessModalOpen]);
    const reviewVal = React.useMemo(() => ({ openReviewModal, setOpenReviewModal }), [openReviewModal]);
    const shareWishlistVal = React.useMemo(() => ({ isShareWishlistModalOpen, setShareWishlistModalOpen }), [isShareWishlistModalOpen]);
    const filterVal = React.useMemo(() => ({ openFilterModal, setOpenFilterModal }), [openFilterModal]);
    const isBuyNowVal = React.useMemo(() => ({ isBuyNow, setIsBuyNow }), [isBuyNow]);
    const isEditingAddressVal = React.useMemo(() => ({ isEditingAddress, setIsEditingAddress }), [isEditingAddress]);
    const guestCheckoutVal = React.useMemo(() => ({ openGuestCheckoutModal, setOpenGuestCheckoutModal }), [openGuestCheckoutModal]);
    const searchVal = React.useMemo(() => ({ openSearchModal, setOpenSearchModal }), [openSearchModal]);
    const queryVal = React.useMemo(() => ({ query, setQuery }), [query]);

    if (!mounted || tenantLoading) {
        return <div className="min-h-screen flex justify-center items-center font-sans">Loading store...</div>;
    }

    return (
        <TenantContext.Provider value={tenantVal}>
            <PaymentContext.Provider value={paymentVal}>
                <VoucherSuccessModalContext.Provider value={voucherVal}>
                    <ReviewContext.Provider value={reviewVal}>
                        <ShareWishlistModalContext.Provider value={shareWishlistVal}>
                            <FilterContext.Provider value={filterVal}>
                                <IsBuyNowContext.Provider value={isBuyNowVal}>
                                    <IsEditingAdressContext.Provider value={isEditingAddressVal}>
                                        <GuestCheckoutContext.Provider value={guestCheckoutVal}>
                                            <SearchContext.Provider value={searchVal}>
                                                <QueryContext.Provider value={queryVal}>
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
            </PaymentContext.Provider>
        </TenantContext.Provider>
    )
}
