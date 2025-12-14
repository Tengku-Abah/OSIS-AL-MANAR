"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Rocket } from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang', href: '/about' },
    { name: 'Kabinet', href: '/organization' },
    { name: 'Berita', href: '/news' },
    { name: 'Galeri', href: '/gallery' },
    { name: 'Kalender', href: '/calendar' },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={clsx(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
                scrolled ? 'bg-deep-navy/80 backdrop-blur-lg shadow-neon-gold/10 border-white/5 py-3' : 'bg-transparent py-5'
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="p-2 bg-navy-light rounded-lg border border-neon-gold/30 group-hover:shadow-[0_0_15px_rgba(255,215,0,0.5)] transition-all">
                        <Rocket className="w-6 h-6 text-neon-gold" />
                    </div>
                    <span className="text-2xl font-bold font-heading text-white tracking-wider">
                        AL-<span className="text-neon-gold">MANAR</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex gap-8 items-center">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "relative text-sm font-medium transition-colors duration-300 hover:text-neon-gold",
                                pathname === item.href ? "text-neon-gold" : "text-slate-300"
                            )}
                        >
                            {item.name}
                            {pathname === item.href && (
                                <motion.div
                                    layoutId="underline"
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-neon-gold shadow-[0_0_10px_#ffd700]"
                                />
                            )}
                        </Link>
                    ))}
                    <Link
                        href="/login"
                        className="px-5 py-2 rounded-full border border-holographic-teal/50 text-holographic-teal text-sm font-bold hover:bg-holographic-teal/10 hover:shadow-[0_0_15px_rgba(100,255,218,0.3)] transition-all"
                    >
                        Portal
                    </Link>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-deep-navy/95 backdrop-blur-xl border-t border-white/10"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg text-slate-200 hover:text-neon-gold"
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className="mt-4 text-center py-3 rounded-lg bg-navy-light text-holographic-teal border border-holographic-teal/30"
                            >
                                Akses Anggota
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
