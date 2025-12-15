"use client";

import React from 'react';
import { SectionWrapper } from '../../components/ui/SectionWrapper';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const newsItems = [
    { title: "Pemilihan Ketua OSIS Periode 2026/2027 Segera Dimulai", date: "16 Dec 2025", author: "Humas", category: "Pengumuman", excerpt: "Panitia Pemilihan OSIS (PPO) resmi dibentuk. Simak jadwal lengkap rangakaian kampanye dan debat kandidat." },
    { title: "Al-Manar Raih Juara 1 Lomba Robotik Nasional", date: "10 Dec 2025", author: "Redaksi", category: "Prestasi", excerpt: "Tim Robotik sekolah kembali mengharumkan nama almamater dengan inovasi 'Smart farming' mereka." },
    { title: "Recap: Kemeriahan Classmeeting Semester Ganjil", date: "05 Dec 2025", author: "Div. Olahraga", category: "Kegiatan", excerpt: "Sorotan momen terbaik dari pertandingan futsal, basket, dan supporter terheboh minggu ini." },
];

export default function NewsPage() {
    return (
        <div className="min-h-screen container mx-auto px-6 py-24">
            <SectionWrapper>
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-bold font-heading text-white mb-4">Berita Terkini</h1>
                        <p className="text-slate-400">Update informasi resmi seputar sekolah dan kegiatan siswa.</p>
                    </div>

                    <div className="flex gap-2">
                        {['Semua', 'Pengumuman', 'Prestasi', 'Kegiatan'].map(filter => (
                            <button key={filter} className="px-4 py-2 rounded-full border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 text-sm transition-colors first:bg-neon-gold first:text-deep-navy first:border-neon-gold">
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </SectionWrapper>

            {/* Featured News */}
            <SectionWrapper delay={0.1}>
                <div className="relative rounded-3xl overflow-hidden bg-navy-light border border-white/5 aspect-[16/7] mb-12 group cursor-pointer">
                    {/* Background Image Placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-transparent to-transparent z-10" />
                    <div className="absolute inset-0 bg-slate-800 z-0" />

                    <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20 max-w-3xl">
                        <span className="bg-neon-gold text-deep-navy px-3 py-1 rounded text-xs font-bold uppercase mb-4 inline-block">Featured</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                            Malam Puncak Pentas Seni "Al-Manar Art Fest 2025"
                        </h2>
                        <div className="flex items-center gap-6 text-slate-300 text-sm">
                            <span className="flex items-center gap-2"><Calendar size={14} /> 20 Dec 2025</span>
                            <span className="flex items-center gap-2"><User size={14} /> Panitia Art Fest</span>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {newsItems.map((item, idx) => (
                    <SectionWrapper key={idx} delay={0.2 + idx * 0.1}>
                        <div className="group bg-navy-light/30 border border-white/5 rounded-2xl p-6 hover:border-white/20 transition-all hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold text-neon-gold uppercase tracking-wider">{item.category}</span>
                                <span className="text-xs text-slate-500">{item.date}</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                                {item.title}
                            </h3>
                            <p className="text-slate-400 text-sm mb-6 line-clamp-3">
                                {item.excerpt}
                            </p>
                            <Link href="#" className="inline-flex items-center gap-2 text-sm text-white font-medium hover:gap-3 transition-all">
                                Baca Selengkapnya <ArrowRight size={14} />
                            </Link>
                        </div>
                    </SectionWrapper>
                ))}
            </div>
        </div>
    );
}
