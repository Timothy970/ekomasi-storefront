"use client";
import React, { useEffect, useState } from 'react'
import "@fontsource/league-spartan";
import "@fontsource/league-spartan/400.css";

export default function ClientLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div />;
    }

    return (
        <main className="bg-white h-screen w-screen flex justify-between flex-col items-center z-0">
            {children}
        </main>
    )
}
