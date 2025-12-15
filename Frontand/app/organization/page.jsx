"use client";

import React, { useState } from 'react';
import { SectionWrapper } from '../../components/ui/SectionWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Target, Users, X, Briefcase, ChevronRight, Info, Shield } from 'lucide-react';

// --- DATA ---
const bph = [
    { id: 1, name: 'Mustafa Raja Ungguli', role: 'Ketua OSIS', quote: 'Memimpin adalah melayani dengan hati.', img: 'bg-gradient-to-br from-yellow-500 to-orange-600' },
    { id: 2, name: 'Mabel Belincia', role: 'Wakil Ketua OSIS', quote: 'Kolaborasi kunci inovasi.', img: 'bg-gradient-to-br from-blue-500 to-indigo-600' },
];

const secretaries = [
    { id: 4, name: 'Raditya Putra M.', role: 'Sekretaris 1', img: 'bg-slate-700' },
    { id: 5, name: 'Anindita Hadinasa', role: 'Sekretaris 2', img: 'bg-slate-700' },
];

const treasurers = [
    { id: 6, name: 'M. Pandu Hidayatullah', role: 'Bendahara 1', img: 'bg-slate-700' },
    { id: 7, name: 'Ivian', role: 'Bendahara 2', img: 'bg-slate-700' },
];

const divisions = [
    {
        name: 'Olahraga & Kesehatan',
        color: 'text-orange-500',
        desc: "Mengembangkan potensi atletik dan sportivitas siswa.",
        programs: ["Liga Futsal", "Senam Pagi"],
        members: [
            { name: 'Rizky Pratama', role: 'Koordinator' },
            { name: 'Dimas Anggara', role: 'Anggota' },
            { name: 'Bayu Saputra', role: 'Anggota' },
        ]
    },
    {
        name: 'Kewirausahaan',
        color: 'text-yellow-500',
        desc: "Membangun jiwa entrepreneurship dan kemandirian dana.",
        programs: ["Market Day", "Koperasi Jujur"],
        members: [
            { name: 'Siti Aminah', role: 'Koordinator' },
            { name: 'Rina Wati', role: 'Anggota' },
            { name: 'Budi Santoso', role: 'Anggota' },
        ]
    },
    {
        name: 'TIK & Literasi Digital',
        color: 'text-blue-500',
        desc: "Digitalisasi informasi dan peningkatan minat baca.",
        programs: ["Website Update", "Pelatihan Desain"],
        members: [
            { name: 'Andi Wijaya', role: 'Koordinator' },
            { name: 'Maya Sari', role: 'Anggota' },
            { name: 'Doni Tata', role: 'Anggota' },
        ]
    },
    {
        name: 'Ketaqwaan',
        color: 'text-green-500',
        desc: "Memperkokoh iman dan taqwa warga sekolah.",
        programs: ["Kajian Jumat", "Peringatan PHBI"],
        members: [
            { name: 'Abdullah', role: 'Koordinator' },
            { name: 'Fatimah', role: 'Anggota' },
        ]
    },
];

// --- COMPONENTS ---

const TeamCard = ({ member, onClick, isLarge = false }) => (
    <div
        onClick={() => onClick && onClick(member)}
        className={`
            group relative cursor-pointer
            bg-navy-light/40 border border-white/5 rounded-2xl overflow-hidden shadow-lg
            transition-all duration-300 hover:border-white/20 hover:bg-navy-light/60 hover:-translate-y-1 hover:shadow-neon-gold/10
            flex flex-col items-center text-center z-10
            ${isLarge ? 'p-8 pb-8 w-64' : 'p-4 w-full'}
        `}
    >
        <div className={`
            rounded-full bg-deep-navy border-2 border-white/10 flex items-center justify-center text-slate-300 font-bold mb-4
            transition-transform duration-500 group-hover:scale-110 group-hover:border-white/30 group-hover:text-white
            ${isLarge ? 'w-24 h-24 text-3xl shadow-2xl' : 'w-16 h-16 text-lg shadow-lg'}
            ${member.img || 'bg-gradient-to-br from-slate-700 to-slate-800'}
        `}>
            {member.name ? member.name.charAt(0) : '?'}
        </div>

        <div className="w-full">
            <h3 className={`font-bold text-white truncate ${isLarge ? 'text-lg mb-1' : 'text-xs mb-1'}`}>
                {member.name}
            </h3>
            <p className={`uppercase tracking-widest font-medium truncate ${isLarge ? 'text-neon-gold text-xs' : 'text-slate-500 text-[9px]'}`}>
                {member.role}
            </p>
        </div>
    </div>
);

export default function OrganizationPage() {
    const [selectedMember, setSelectedMember] = useState(null);
    const [activeTab, setActiveTab] = useState('about'); // merged about+visi

    return (
        <div className="min-h-screen container mx-auto px-6 py-24 pb-32">

            {/* HEADER */}
            <SectionWrapper>
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-6">
                        Profil Organisasi
                    </h1>
                </div>
            </SectionWrapper>

            {/* TABS NAVIGATION */}
            <div className="flex justify-center mb-16">
                <div className="bg-navy-light/50 p-1 rounded-full border border-white/10 flex gap-1 backdrop-blur-md">
                    <button
                        onClick={() => setActiveTab('about')}
                        className={`
                            px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all
                            ${activeTab === 'about' ? 'bg-neon-gold text-deep-navy shadow-[0_0_15px_rgba(255,215,0,0.3)]' : 'text-slate-400 hover:text-white'}
                        `}
                    >
                        Tentang & Visi Misi
                    </button>
                    <button
                        onClick={() => setActiveTab('struktur')}
                        className={`
                            px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all
                            ${activeTab === 'struktur' ? 'bg-neon-gold text-deep-navy shadow-[0_0_15px_rgba(255,215,0,0.3)]' : 'text-slate-400 hover:text-white'}
                        `}
                    >
                        Struktur Organisasi
                    </button>
                </div>
            </div>

            {/* CONTENT AREA */}
            <div className="min-h-[500px]">
                <AnimatePresence mode="wait">

                    {/* SECTION 1: ABOUT & VISI MISI */}
                    {activeTab === 'about' && (
                        <motion.div
                            key="about"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <SectionWrapper>
                                <div className="max-w-4xl mx-auto space-y-12">

                                    {/* ABOUT BLOCK */}
                                    <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden group hover:border-white/10 transition-colors">
                                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none transform translate-x-12 -translate-y-12">
                                            <Shield size={200} />
                                        </div>
                                        <div className="relative z-10">
                                            <div className="inline-flex items-center gap-2 mb-6 text-neon-gold">
                                                <Info size={20} />
                                                <h2 className="text-xl font-bold uppercase tracking-widest">Tentang OSIS</h2>
                                            </div>
                                            <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
                                                <strong className="text-white font-bold">OSIS SMA Al-Manar</strong> adalah organisasi intra sekolah yang berdedikasi untuk menjadi jembatan aspirasi siswa dan penggerak kegiatan positif di lingkungan sekolah. Kami berkomitmen untuk melahirkan pemimpin-pemimpin muda yang berkarakter, inovatif, dan berakhlak mulia.
                                            </p>
                                        </div>
                                    </div>

                                    {/* VISI BLOCK */}
                                    <div className="text-center p-12 bg-navy-light/10 border border-white/5 rounded-3xl relative overflow-hidden">
                                        <div className="inline-flex items-center justify-center p-4 bg-neon-gold/10 rounded-full text-neon-gold mb-6">
                                            <Target size={32} />
                                        </div>
                                        <h2 className="text-3xl font-bold text-white uppercase tracking-widest mb-4">Visi</h2>
                                        <p className="text-xl md:text-3xl text-slate-200 font-serif italic leading-relaxed">
                                            "Menjadikan OSIS SMA Al-Manar sebagai wadah aspirasi yang inklusif, kreatif, dan berlandaskan IMTAQ serta IPTEK."
                                        </p>
                                    </div>

                                    {/* MISI BLOCK */}
                                    <div className="p-12 bg-navy-light/10 border border-white/5 rounded-3xl relative overflow-hidden">
                                        <div className="flex flex-col md:flex-row gap-12">
                                            <div className="md:w-1/3 text-center md:text-left">
                                                <div className="inline-flex items-center justify-center p-4 bg-blue-500/10 rounded-full text-blue-500 mb-6">
                                                    <Briefcase size={32} />
                                                </div>
                                                <h2 className="text-3xl font-bold text-white uppercase tracking-widest mb-2">Misi</h2>
                                                <p className="text-slate-400 text-sm">Langkah nyata kami.</p>
                                            </div>
                                            <div className="md:w-2/3">
                                                <ul className="space-y-4">
                                                    {[
                                                        "Meningkatkan kualitas keimanan dan ketaqwaan siswa.",
                                                        "Memfasilitasi pengembangan minat dan bakat melalui kegiatan positif.",
                                                        "Membangun sinergi solid antara siswa, guru, dan sekolah.",
                                                        "Mewujudkan lingkungan sekolah yang disiplin, bersih, dan nyaman."
                                                    ].map((item, i) => (
                                                        <li key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors">
                                                            <span className="font-heading font-bold text-blue-500 text-xl">0{i + 1}</span>
                                                            <span className="text-slate-300 mt-1">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SectionWrapper>
                        </motion.div>
                    )}

                    {/* SECTION 2: STRUKTUR */}
                    {activeTab === 'struktur' && (
                        <motion.div
                            key="struktur"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* BPH TREE CHART */}
                            <div className="mb-32 relative">
                                <SectionWrapper>
                                    <div className="text-center mb-16">
                                        <h2 className="text-3xl font-bold text-white uppercase tracking-widest">Badan Pengurus Harian</h2>
                                    </div>
                                </SectionWrapper>

                                {/* CENTER LINE (Main Trunk) */}
                                <div className="absolute left-1/2 top-24 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />

                                {/* LEVEL 1: KETUA */}
                                <div className="flex justify-center mb-8 relative z-10">
                                    <SectionWrapper delay={0.1}>
                                        <div className="flex flex-col items-center">
                                            <div className="text-xs font-bold text-neon-gold uppercase tracking-widest mb-2 bg-deep-navy px-3 py-1 rounded-full border border-white/10">Ketua Umum</div>
                                            <TeamCard member={bph[0]} isLarge onClick={setSelectedMember} />
                                        </div>
                                    </SectionWrapper>
                                </div>

                                {/* Connector Line 1 */}
                                <div className="h-12 w-px bg-white/10 mx-auto hidden md:block" />

                                {/* LEVEL 2: WAKIL */}
                                <div className="flex justify-center mb-12 relative z-10">
                                    <SectionWrapper delay={0.2}>
                                        <div className="flex flex-col items-center">
                                            <div className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2 bg-deep-navy px-3 py-1 rounded-full border border-white/10">Wakil Ketua</div>
                                            <TeamCard member={bph[1]} isLarge onClick={setSelectedMember} />
                                        </div>
                                    </SectionWrapper>
                                </div>

                                {/* Horizontal Branching Line for Sek/Ben */}
                                <div className="max-w-3xl mx-auto h-px bg-white/10 mb-12 hidden md:block relative">
                                    <div className="absolute left-0 top-0 w-px h-12 bg-white/10" />
                                    <div className="absolute right-0 top-0 w-px h-12 bg-white/10" />
                                </div>

                                {/* LEVEL 3: SEKRETARIS & BENDAHARA */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto relative z-10">
                                    {/* SEKRETARIS GROUP */}
                                    <div className="bg-navy-light/10 border border-white/5 rounded-3xl p-6 relative group hover:border-white/10 transition-colors">
                                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 bg-deep-navy text-center border border-white/10 rounded-full py-1 hidden md:block z-20">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sekretaris</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 pt-4">
                                            {secretaries.map((m, idx) => (
                                                <SectionWrapper key={m.id} delay={0.3 + idx * 0.1}>
                                                    <TeamCard member={m} onClick={setSelectedMember} />
                                                </SectionWrapper>
                                            ))}
                                        </div>
                                    </div>

                                    {/* BENDAHARA GROUP */}
                                    <div className="bg-navy-light/10 border border-white/5 rounded-3xl p-6 relative group hover:border-white/10 transition-colors">
                                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 bg-deep-navy text-center border border-white/10 rounded-full py-1 hidden md:block z-20">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Bendahara</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 pt-4">
                                            {treasurers.map((m, idx) => (
                                                <SectionWrapper key={m.id} delay={0.3 + idx * 0.1}>
                                                    <TeamCard member={m} onClick={setSelectedMember} />
                                                </SectionWrapper>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* DIVISIONS SECTIONS */}
                            <div className="space-y-20 max-w-6xl mx-auto">
                                <SectionWrapper>
                                    <div className="flex items-center justify-center gap-4 mb-8">
                                        <div className="w-16 h-1 bg-gradient-to-r from-transparent to-white/20" />
                                        <h2 className="text-2xl font-bold text-white uppercase tracking-widest">Daftar Divisi</h2>
                                        <div className="w-16 h-1 bg-gradient-to-l from-transparent to-white/20" />
                                    </div>
                                </SectionWrapper>

                                {divisions.map((div, idx) => (
                                    <SectionWrapper key={idx} delay={0.1}>
                                        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-navy-light/20 transition-colors">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-white/5 pb-6">
                                                <div>
                                                    <h3 className={`text-2xl font-bold ${div.color} mb-2`}>{div.name}</h3>
                                                    <p className="text-slate-400 text-sm max-w-xl">{div.desc}</p>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {div.programs.map((prog, p) => (
                                                        <span key={p} className="px-3 py-1 bg-deep-navy rounded-full text-[10px] uppercase font-bold text-slate-300 border border-white/10 shadow-sm">
                                                            {prog}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                                {div.members.map((m, mIdx) => (
                                                    <TeamCard key={mIdx} member={m} onClick={setSelectedMember} />
                                                ))}
                                            </div>
                                        </div>
                                    </SectionWrapper>
                                ))}
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>

            {/* MEMBER MODAL */}
            <AnimatePresence>
                {selectedMember && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedMember(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-deep-navy/90 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-navy-light border border-white/10 rounded-2xl p-8 max-w-sm w-full relative shadow-2xl"
                        >
                            <button
                                onClick={() => setSelectedMember(null)}
                                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="text-center">
                                <div className="w-24 h-24 rounded-full bg-deep-navy border-2 border-white/10 mx-auto mb-6 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                                    {selectedMember.name.charAt(0)}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-1">{selectedMember.name}</h3>
                                <p className="text-neon-gold text-sm font-bold uppercase tracking-widest mb-8">{selectedMember.role}</p>

                                {selectedMember.quote && (
                                    <p className="text-slate-300 italic mb-6">"{selectedMember.quote}"</p>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
