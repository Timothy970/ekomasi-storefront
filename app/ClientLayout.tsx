"use client";
import React, { createContext, useContext, useEffect, useState } from 'react'
import "@fontsource/league-spartan";
import "@fontsource/league-spartan/400.css";
import { useSearchParams } from "next/navigation";
import axios from 'axios';

export type Tenant = {
    id: number;
    name: string;
    domain: string;
    app_domain?: string;
    admin_domain?: string;
    slogan: string;
    logo: string;
    color: string;
    app_logo?: string;
    app_color?: string;
    app_primary_color?: string;
    app_secondary_color?: string;
    app_tertiary_color?: string;
    admin_logo?: string;
    admin_color?: string;
    admin_primary_color?: string;
    admin_secondary_color?: string;
    admin_tertiary_color?: string;
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
        const fetchTenant = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8009/api/';
                const res = await axios.get(`${baseUrl}tenant/active`);
                if (res.data && res.data.data) {
                    const t = res.data.data;
                    setTenant(t);
                    const primaryColor = t.app_primary_color || t.app_color || t.color || 'var(--primary)';
                    const secondaryColor = t.app_secondary_color || 'var(--secondary)';
                    const tertiaryColor = t.app_tertiary_color || '#EEF2FF';

                    document.documentElement.style.setProperty('--primary', primaryColor);
                    document.documentElement.style.setProperty('--color-primary', primaryColor);
                    document.documentElement.style.setProperty('--secondary', secondaryColor);
                    document.documentElement.style.setProperty('--color-secondary', secondaryColor);
                    document.documentElement.style.setProperty('--minor', tertiaryColor);
                    document.documentElement.style.setProperty('--tertiary', tertiaryColor);
                    document.documentElement.style.setProperty('--color-tertiary', tertiaryColor);
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

    if (!mounted || tenantLoading) {
        return <div className="min-h-screen flex justify-center items-center font-sans">Loading store...</div>;
    }

    return (
        <TenantContext.Provider value={{ tenant, loading: tenantLoading }}>
            <PaymentContext.Provider value={{ openPaymentModal, setOpenPaymentModal }}>
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
            </PaymentContext.Provider>
        </TenantContext.Provider>
    )
}
