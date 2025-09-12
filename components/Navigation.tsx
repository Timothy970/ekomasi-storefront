"use client"
import React, { useEffect, useState } from 'react'
import Footer from './AppLayout/Footer'
import AppHeader from './AppLayout/AppHeader'
import SideBar from './AppLayout/SideBar';
import { useAppDispatch } from '@/lib/hooks';
import { getCategoriesAsync, getHomeDataAsync } from '@/lib/features/navigation/navigationSlice';
import CategoryFilterModal from './CategoryFilterModal';
import { useFilter, useGuestCheckout } from '@/app/ClientLayout';
import GuestCheckoutModal from './GuestCheckoutModal';

export default function Navigation({ children }: Readonly<{ children: React.ReactNode; }>) {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch()
    const { openFilterModal, setOpenFilterModal } = useFilter()
    const { openGuestCheckoutModal, setOpenGuestCheckoutModal } = useGuestCheckout()

    useEffect(() => {
        dispatch(getCategoriesAsync())
        dispatch(getHomeDataAsync())
    }, [])

    return (
        <div className={`w-full h-full relative z-0 flex flex-col justify-between ${openFilterModal || openGuestCheckoutModal ? 'overflow-hidden' : 'overscroll-auto'}`}>
            <div className='flex flex-col w-full z-0'>
                <AppHeader isOpen={isOpen} setIsOpen={setIsOpen} />

                <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

                {children}

                <Footer />

                <CategoryFilterModal
                    setOpenFilterModal={setOpenFilterModal}
                    openFilterModal={openFilterModal}
                />

                <GuestCheckoutModal
                    openGuestCheckoutModal={openGuestCheckoutModal}
                    setOpenGuestCheckoutModal={setOpenGuestCheckoutModal}
                />
            </div>
        </div>

    )
}
