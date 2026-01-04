"use client";

import React from 'react';
import { Rocket, Instagram, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Custom TikTok Icon Component
const TikTokIcon = ({ size = 20 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.298.003.595.04.88.11V9.4a6.33 6.33 0 00-1-.08A6.34 6.34 0 003 15.64a6.34 6.34 0 0010.66 4.65 6.3 6.3 0 001.71-4.33v-7.1a8.16 8.16 0 004.22 1.17V6.69h-.01z" />
    </svg>
);

export function Footer() {
    const currentYear = new Date().getFullYear();

    // Social media links
    const socialLinks = [
        {
            icon: Instagram,
            href: "https://www.instagram.com/osis.spinar_?igsh=NjFxOXZzZnc2Zncy",
            label: "Instagram"
        },
        {
            icon: TikTokIcon,
            href: "https://www.tiktok.com/@osisspinar_offici?_r=1&_t=ZS-92l7NaiWirA",
            label: "TikTok"
        }
    ];

    return (
        <footer className="relative pt-24 pb-12 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-deep-navy to-black pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-gradient-radial from-navy-light/20 to-transparent opacity-50 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20 border-b border-white/5 pb-12">
                    {/* Brand Column */}
                    <div className="md:col-span-5">
                        <div className="flex items-center gap-2 mb-6">
                            <Rocket className="w-8 h-8 text-neon-gold" />
                            <span className="text-3xl font-bold font-heading text-white">
                                AL-<span className="text-neon-gold">MANAR</span>
                            </span>
                        </div>
                        <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
                            Organisasi Siswa Intra Sekolah (OSIS) yang berdedikasi menjadi suar pemandu bagi siswa untuk berinovasi, berprestasi, dan berakhlak mulia.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    whileHover={{ y: -5, color: '#FFD700' }}
                                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 transition-colors"
                                >
                                    <social.icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="md:col-span-3">
                        <h4 className="text-white font-bold mb-8 text-lg">Platform</h4>
                        <ul className="space-y-4">
                            {[
                                { label: 'Beranda', href: '/' },
                                { label: 'Tentang Kami', href: '/organization' },
                                { label: 'Program', href: '/program' },
                                { label: 'Agenda', href: '/agenda' },
                                { label: 'Aspirasi', href: '/aspirasi' }
                            ].map((item, i) => (
                                <li key={i}>
                                    <a href={item.href} className="group flex items-center gap-2 text-slate-400 hover:text-neon-gold transition-colors">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-neon-gold transition-colors" />
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-4">
                        <h4 className="text-white font-bold mb-8 text-lg">Hubungi Kami</h4>
                        <ul className="space-y-4 text-slate-400">
                            <li className="flex items-start gap-3">
                                <span className="block w-6 h-[1px] bg-slate-600 mt-2.5" />
                                <span>SMPIT AL-MANAR PANGKALANBUN<br />Madurejo, South Arut, West Kotawaringin Regency, Central Kalimantan 74181</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="block w-6 h-[1px] bg-slate-600" />
                                <a href="mailto:osisspinar@gmail.com" className="hover:text-white transition-colors">osisspinar@gmail.com</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="block w-6 h-[1px] bg-slate-600" />
                                <span>+62 812-3456-7890</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm">
                    <p>© {currentYear} OSIS AL-Manar. All rights reserved.</p>
                    <div className="flex items-center gap-6 mt-4 md:mt-0">                        <span className="flex items-center gap-1">
                        Made with by Tengku Afif
                    </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
