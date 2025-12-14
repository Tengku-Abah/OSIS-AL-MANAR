"use client";

import React from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { motion } from 'framer-motion';
import { Image, Play, Film } from 'lucide-react';

const galleryItems = [
    { id: 1, type: 'video', title: 'Aftermovie MPLS 2025', size: 'large', color: 'bg-red-900', date: 'Juli 2025' },
    { id: 2, type: 'photo', title: 'Rapat Kerja I', size: 'small', color: 'bg-blue-900', date: 'Agustus 2025' },
    { id: 3, type: 'photo', title: 'Juara Lomba Basket', size: 'medium', color: 'bg-green-900', date: 'September 2025' },
    { id: 4, type: 'photo', title: 'Kunjungan Industri', size: 'small', color: 'bg-purple-900', date: 'Oktober 2025' },
    { id: 5, type: 'video', title: 'Teaser Pensi', size: 'medium', color: 'bg-yellow-900', date: 'November 2025' },
    { id: 6, type: 'photo', title: 'Upacara Hari Pahlawan', size: 'large', color: 'bg-gray-800', date: 'November 2025' },
    { id: 7, type: 'photo', title: 'LDKS Angkatan 26', size: 'small', color: 'bg-indigo-900', date: 'Desember 2025' },
    { id: 8, type: 'photo', title: 'Bakti Sosial Panti Asuhan', size: 'small', color: 'bg-pink-900', date: 'Desember 2025' },
    { id: 9, type: 'video', title: 'Vlog: Sehari Jadi Ketos', size: 'medium', color: 'bg-orange-900', date: 'Januari 2026' },
    { id: 10, type: 'photo', title: 'Classmeeting E-Sport', size: 'small', color: 'bg-teal-900', date: 'Desember 2025' },
    { id: 11, type: 'photo', title: 'Perayaan Maulid Nabi', size: 'medium', color: 'bg-emerald-900', date: 'Oktober 2025' },
];

export default function GalleryPage() {
    return (
        <div className="min-h-screen container mx-auto px-6 py-12">
            <div className="mb-12 flex flex-col md:flex-row justify-between items-end">
                <div>
                    <h1 className="text-4xl font-bold font-heading text-white mb-2">Action Log</h1>
                    <p className="text-slate-400">Arsip digital jejak langkah dan pencapaian OSIS AL-Manar.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-full bg-neon-gold text-deep-navy font-bold text-sm">Semua</button>
                    <button className="px-4 py-2 rounded-full bg-navy-light text-slate-300 hover:text-white border border-white/10 text-sm">Foto</button>
                    <button className="px-4 py-2 rounded-full bg-navy-light text-slate-300 hover:text-white border border-white/10 text-sm">Video</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-4">
                {galleryItems.map((item, i) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        viewport={{ once: true }}
                        className={`rounded-xl overflow-hidden relative group cursor-pointer border border-white/5 hover:border-neon-gold/50 transition-colors ${item.size === 'large' ? 'md:col-span-2 md:row-span-2' :
                                item.size === 'medium' ? 'md:col-span-2 md:row-span-1' : 'md:col-span-1 md:row-span-1'
                            }`}
                    >
                        <div className={`w-full h-full ${item.color} opacity-60 group-hover:opacity-80 transition-all duration-500 scale-100 group-hover:scale-105`}>
                            {/* Placeholder for real image */}
                            <div className="w-full h-full flex items-center justify-center text-white/10">
                                {item.type === 'video' ? <Play size={48} className="fill-white/20" /> : <Image size={48} />}
                            </div>
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-transparent to-transparent opacity-90"></div>

                        <div className="absolute top-4 right-4">
                            {item.type === 'video' ?
                                <div className="bg-red-600 p-1.5 rounded-full"><Film size={14} className="text-white" /></div> :
                                <div className="bg-blue-600 p-1.5 rounded-full"><Image size={14} className="text-white" /></div>
                            }
                        </div>

                        <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 w-full">
                            <div className="flex justify-between items-end">
                                <div>
                                    <span className="text-neon-gold text-[10px] font-bold uppercase tracking-wider mb-1 block">{item.date}</span>
                                    <h3 className="text-white font-bold text-lg leading-tight">{item.title}</h3>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
