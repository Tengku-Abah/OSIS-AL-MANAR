"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Users, Calendar, Info, Menu, X, Image, Newspaper, MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
    { name: 'Beranda', href: '/', icon: Home },
    { name: 'Organisasi', href: '/organization', icon: Users },
    { name: 'Program', href: '/program', icon: Calendar },
    { name: 'Galeri', href: '/gallery', icon: Image },
    { name: 'Berita', href: '/news', icon: Newspaper },
    { name: 'Agenda', href: '/calendar', icon: Calendar },
    { name: 'Aspirasi', href: '/suggestion', icon: MessageSquare },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-6 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300 pointer-events-none`}
            >
                <div className={`
          pointer-events-auto
          flex items-center gap-2 p-2 rounded-full
          bg-navy-light/80 backdrop-blur-xl border border-white/10
          shadow-lg shadow-deep-navy/50
          transition-all duration-300
          ${scrolled ? 'scale-90 opacity-90 hover:scale-100 hover:opacity-100' : 'scale-100'}
        `}>
                    {/* Logo / Brand (Mobile Only or Compact) */}
                    <div className="md:hidden pl-4 pr-2">
                        <span className="font-heading font-bold text-neon-gold text-lg">OSIS</span>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link key={item.href} href={item.href} className="relative group">
                                    <div className={`
                    flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300
                    ${isActive
                                            ? 'bg-neon-gold/10 text-neon-gold shadow-[0_0_10px_rgba(255,215,0,0.2)]'
                                            : 'text-slate-400 hover:text-white hover:bg-white/5'}
                  `}>
                                        <item.icon className="w-4 h-4" />
                                        <span className="font-medium text-sm">{item.name}</span>
                                    </div>
                                    {isActive && (
                                        <motion.div
                                            layoutId="navParams"
                                            className="absolute inset-0 rounded-full border border-neon-gold/30"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-full text-slate-300 hover:bg-white/10 transition-colors"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, pointerEvents: 'none' }}
                        animate={{ opacity: 1, pointerEvents: 'auto' }}
                        exit={{ opacity: 0, pointerEvents: 'none' }}
                        className="fixed inset-0 z-40 bg-deep-navy/90 backdrop-blur-sm md:hidden flex items-center justify-center p-4"
                    >
                        <div className="flex flex-col gap-6 text-center w-full max-w-sm">
                            {navItems.map((item, idx) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 20, opacity: 0 }}
                                    transition={{ delay: 0.05 * idx }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`block w-full py-4 rounded-xl border border-white/5 text-xl font-heading font-bold transition-all
                      ${pathname === item.href
                                                ? 'bg-neon-gold/10 border-neon-gold/30 text-neon-gold'
                                                : 'bg-navy-light/50 text-white hover:bg-navy-lighter'}
                    `}
                                    >
                                        <div className="flex items-center justify-center gap-3">
                                            <item.icon className="w-5 h-5" />
                                            {item.name}
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                                className="mt-8 mx-auto p-3 rounded-full bg-white/10 text-slate-400 hover:bg-white/20 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
