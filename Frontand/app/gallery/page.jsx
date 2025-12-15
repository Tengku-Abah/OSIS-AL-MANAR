"use client";

import React from 'react';
import { SectionWrapper } from '../../components/ui/SectionWrapper';
import { GlassCard } from '../../components/ui/GlassCard';
import { Image, PlayCircle } from 'lucide-react';

const galleryItems = [
    { type: 'image', size: 'large', title: 'Upacara HUT RI ke-80', date: '17 Aug 2025' },
    { type: 'image', size: 'small', title: 'Rapat Kerja OSIS', date: '20 Aug 2025' },
    { type: 'video', size: 'normal', title: 'Aftermovie Classmeeting', date: '15 Dec 2025' },
    { type: 'image', size: 'normal', title: 'Kunjungan Industri', date: '10 Sep 2025' },
    { type: 'image', size: 'large', title: 'Festival Budaya', date: '01 Oct 2025' },
    { type: 'image', size: 'small', title: 'Latihan Dasar Kepemimpinan', date: '05 Nov 2025' },
];

export default function GalleryPage() {
    return (
        <div className="min-h-screen container mx-auto px-6 py-24">
            <SectionWrapper>
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold font-heading text-white mb-6">Galeri Kegiatan</h1>
                    <p className="text-slate-400 text-lg">Momen-momen berharga dalam perjalanan kami.</p>
                </div>
            </SectionWrapper>

            <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[200px] gap-4">
                {galleryItems.map((item, i) => (
                    <div
                        key={i}
                        className={`relative group rounded-xl overflow-hidden border border-white/5 bg-slate-800
                        ${item.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''}
                        ${item.size === 'normal' ? 'md:row-span-2' : ''}
                    `}
                    >
                        {/* Placeholder Background (in real app, use next/image) */}
                        <div className="absolute inset-0 bg-navy-light/50 group-hover:scale-110 transition-transform duration-700 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-700 to-deep-navy" />

                        {/* Icon Placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-10 transition-opacity">
                            {item.type === 'video' ? <PlayCircle size={48} className="text-white" /> : <Image size={48} className="text-white" />}
                        </div>

                        {/* Overlay Info */}
                        <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                        <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform">
                            <span className="text-neon-gold text-xs font-bold uppercase tracking-widest mb-1 block">{item.date}</span>
                            <h3 className="text-white font-bold text-lg leading-tight">{item.title}</h3>
                        </div>

                        {/* Type Badge */}
                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-2 py-1 rounded text-[10px] text-white uppercase font-bold border border-white/10">
                            {item.type}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
