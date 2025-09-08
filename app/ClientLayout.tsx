"use client";
import React, { createContext, useContext, useEffect, useState } from 'react'
import "@fontsource/league-spartan";
import "@fontsource/league-spartan/400.css";

type FilterContextType = {
    openFilterModal: boolean
    setOpenFilterModal: React.Dispatch<React.SetStateAction<boolean>>
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export function useFilter() {
    const ctx = useContext(FilterContext)
    if (!ctx) throw new Error("useFilter must be used within FilterProvider")
    return ctx
}

export default function ClientLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const [mounted, setMounted] = useState(false);
    const [openFilterModal, setOpenFilterModal] = useState(false)

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div />;
    }

    return (
        <FilterContext.Provider value={{ openFilterModal, setOpenFilterModal }}>
            <main className="bg-white h-screen w-screen flex justify-between flex-col items-center z-0">
                {children}
            </main>
        </FilterContext.Provider>
    )
}
