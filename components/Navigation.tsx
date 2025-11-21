"use client"
import React, { useEffect, useState } from 'react'
import Footer from './AppLayout/Footer'
import AppHeader from './AppLayout/AppHeader'
import SideBar from './AppLayout/SideBar';
import { useAppDispatch } from '@/lib/hooks';
import { getCategoriesAsync, getHomeDataAsync } from '@/lib/features/navigation/navigationSlice';
import CategoryFilterModal from './CategoryFilterModal';
import { useFilter, useGuestCheckout, useIsBuyNow, useReview, useShareWishlistModal } from '@/app/ClientLayout';
import GuestCheckoutModal from './GuestCheckoutModal';
import ReviewModal from './ReviewModal';

export default function Navigation({ children }: Readonly<{ children: React.ReactNode; }>) {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch()
    const { openFilterModal, setOpenFilterModal } = useFilter()
    const { openGuestCheckoutModal, setOpenGuestCheckoutModal } = useGuestCheckout()
    const { openReviewModal } = useReview()
    const { isBuyNow } = useIsBuyNow()
    const { isShareWishlistModalOpen } = useShareWishlistModal();

    useEffect(() => {
        dispatch(getCategoriesAsync())
        dispatch(getHomeDataAsync())
    }, [])

    return (
        <div className={`w-full h-full relative z-0 flex flex-col justify-between ${openFilterModal || openReviewModal || isShareWishlistModalOpen || openGuestCheckoutModal ? 'overflow-hidden' : ''}`}>
            <div className='flex flex-col w-full z-0 justify-between h-full'>
                <div className='w-full flex flex-col'>
                    <AppHeader isOpen={isOpen} setIsOpen={setIsOpen} />

                    <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

                    {children}
                </div>

                <Footer />

                {
                    <CategoryFilterModal
                        setOpenFilterModal={setOpenFilterModal}
                        openFilterModal={openFilterModal}
                    />

                }

                {
                    openGuestCheckoutModal && <GuestCheckoutModal
                        openGuestCheckoutModal={openGuestCheckoutModal}
                        setOpenGuestCheckoutModal={setOpenGuestCheckoutModal}
                        isBuyNow={isBuyNow}
                    />
                }
            </div>
        </div>
    )
}
