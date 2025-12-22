"use client";

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { GlobalBackground } from './GlobalBackground';

export default function ClientLayoutWrapper({ children }) {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith('/dashboard');

    if (isDashboard) {
        return (
            <>
                <GlobalBackground />
                <main className="min-h-screen relative z-10">
                    {children}
                </main>
            </>
        );
    }

    return (
        <>
            <GlobalBackground />
            <Navbar />
            <main className="flex-grow pt-24 relative z-10">
                {children}
            </main>
            <Footer />
        </>
    );
}
