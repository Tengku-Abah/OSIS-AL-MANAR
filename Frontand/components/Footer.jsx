"use client";

import React from 'react';
import { Rocket, Instagram, Youtube, Facebook, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
    const currentYear = new Date().getFullYear();

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
                            {[
                                { icon: Instagram, href: "#" },
                                { icon: Youtube, href: "#" },
                                { icon: Facebook, href: "#" }
                            ].map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
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
                            {['Beranda', 'Tentang Kami', 'Struktur Organisasi', 'Agenda'].map((item, i) => (
                                <li key={i}>
                                    <a href="#" className="group flex items-center gap-2 text-slate-400 hover:text-neon-gold transition-colors">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-neon-gold transition-colors" />
                                        {item}
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
                                <span>Sekolah Menengah Atas ...<br />Jl. Pendidikan No. 1, ...</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="block w-6 h-[1px] bg-slate-600" />
                                <a href="mailto:osis@sekolah.sch.id" className="hover:text-white transition-colors">osis@sekolah.sch.id</a>
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
                    <div className="flex items-center gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <span className="flex items-center gap-1">
                            Made with <span className="text-red-500 animate-pulse">❤️</span> by Antigravity
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
