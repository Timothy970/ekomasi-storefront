"use client"
import React, { useEffect, useState } from 'react'
import Footer from './AppLayout/Footer'
import AppHeader from './AppLayout/AppHeader'
import SideBar from './AppLayout/SideBar';
import { useAppDispatch } from '@/lib/hooks';
import { getCategoriesAsync, getHomeDataAsync } from '@/lib/features/navigation/navigationSlice';
import CategoryFilterModal from './CategoryFilterModal';
import { useFilter } from '@/app/ClientLayout';

export default function Navigation({ children }: Readonly<{ children: React.ReactNode; }>) {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch()
    const { openFilterModal, setOpenFilterModal } = useFilter()

    useEffect(() => {
        dispatch(getCategoriesAsync())
        dispatch(getHomeDataAsync())
    }, [])

    return (
        <div className={`w-full h-full z-0 flex flex-col justify-between ${openFilterModal ? 'overflow-hidden' : 'overscroll-auto'}`}>
            <div className='flex flex-col w-full z-0'>
                <AppHeader isOpen={isOpen} setIsOpen={setIsOpen} />

                <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

                {children}

                <Footer />

                <CategoryFilterModal
                    setOpenFilterModal={setOpenFilterModal}
                    openFilterModal={openFilterModal}
                />
            </div>
        </div>

    )
}
