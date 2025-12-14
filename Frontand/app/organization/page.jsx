"use client";

import React, { useState } from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Twitter, Award, User } from 'lucide-react';

const bph = [
    { id: 1, name: 'Muhammad Rizki', role: 'Ketua OSIS', quote: 'Memimpin adalah melayani dengan hati.', img: 'bg-gradient-to-br from-yellow-500 to-orange-600' },
    { id: 2, name: 'Aisyah Putri', role: 'Wakil Ketua I', quote: 'Kolaborasi kunci inovasi.', img: 'bg-gradient-to-br from-blue-500 to-indigo-600' },
    { id: 3, name: 'Budi Santoso', role: 'Wakil Ketua II', quote: 'Disiplin pangkal kesuksesan.', img: 'bg-gradient-to-br from-blue-500 to-cyan-600' },
];

const secretaries = [
    { id: 4, name: 'Sarah Amalia', role: 'Sekretaris Umum', img: 'bg-slate-700' },
    { id: 5, name: 'Dina Lorenza', role: 'Wk. Sekretaris', img: 'bg-slate-700' },
];

const treasurers = [
    { id: 6, name: 'Fikri Haikal', role: 'Bendahara Umum', img: 'bg-slate-700' },
    { id: 7, name: 'Ratna Dewi', role: 'Wk. Bendahara', img: 'bg-slate-700' },
];

const divisions = [
    {
        name: 'Sekbid 1: Keimanan & Ketaqwaan',
        color: 'border-green-500',
        members: [
            { name: 'Ust. Muda Ahmad', role: 'Koordinator' },
            { name: 'Fatimah Az-Zahra', role: 'Anggota' },
            { name: 'Yusuf Ibrahim', role: 'Anggota' },
        ]
    },
    {
        name: 'Sekbid 3: Wawasan Kebangsaan',
        color: 'border-red-500',
        members: [
            { name: 'Bambang Pamungkas', role: 'Koordinator' },
            { name: 'Siti Nurbaya', role: 'Anggota' },
            { name: 'Kartini', role: 'Anggota' },
        ]
    },
    {
        name: 'Sekbid 8: Sastra & Budaya',
        color: 'border-pink-500',
        members: [
            { name: 'Rendra Bagus', role: 'Koordinator' },
            { name: 'Chairil Anwar Jr.', role: 'Anggota' },
            { name: 'Sapardi D.', role: 'Anggota' },
        ]
    },
    {
        name: 'Sekbid 9: TIK & Komunikasi',
        color: 'border-blue-500',
        members: [
            { name: 'Elon Muskbar', role: 'Koordinator' },
            { name: 'Mark Zukerberg', role: 'Anggota' },
            { name: 'Bill Gateson', role: 'Anggota' },
        ]
    },
    {
        name: 'Sekbid 6: Kewirausahaan',
        color: 'border-yellow-500',
        members: [
            { name: 'Sandiaga Uno Jr.', role: 'Koordinator' },
            { name: 'Bob Sadino KW', role: 'Anggota' },
            { name: 'Putri Tanjung', role: 'Anggota' },
        ]
    },
    {
        name: 'Sekbid 4: Prestasi Akademik',
        color: 'border-purple-500',
        members: [
            { name: 'Habibie Muda', role: 'Koordinator' },
            { name: 'Maudy Ayunda KW', role: 'Anggota' },
            { name: 'Jerome Polin Jr.', role: 'Anggota' },
        ]
    },
];

const CardProfile = ({ member, size = 'normal' }) => (
    <GlassCard
        hoverEffect
        className={`relative group overflow-hidden ${size === 'large' ? 'p-8 min-h-[300px]' : 'p-6'}`}
    >
        <div className={`rounded-full mx-auto mb-4 border-2 border-white/20 shadow-lg flex items-center justify-center text-white font-bold
      ${size === 'large' ? 'w-32 h-32 text-4xl' : 'w-20 h-20 text-2xl'}
      ${member.img || 'bg-slate-800'}
    `}>
            {member.name.charAt(0)}
        </div>
        <div className="text-center relative z-10">
            <h3 className={`font-bold text-white ${size === 'large' ? 'text-2xl' : 'text-lg'}`}>{member.name}</h3>
            <p className="text-neon-gold font-mono uppercase text-xs tracking-wider mb-2">{member.role}</p>
            {member.quote && (
                <p className="text-slate-400 italic text-sm mt-4">"{member.quote}"</p>
            )}
        </div>

        {/* Social Overlay */}
        <div className="absolute inset-0 bg-deep-navy/90 backdrop-blur flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-neon-gold hover:text-deep-navy transition-colors"><Instagram size={20} /></a>
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-neon-gold hover:text-deep-navy transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-neon-gold hover:text-deep-navy transition-colors"><Twitter size={20} /></a>
        </div>
    </GlassCard>
);

const Connector = ({ height = 'h-8' }) => (
    <div className={`w-0.5 ${height} bg-gradient-to-b from-neon-gold to-white/20 mx-auto`}></div>
);

export default function OrganizationPage() {
    return (
        <div className="min-h-screen container mx-auto px-6 py-12">
            <div className="text-center mb-16">
                <div className="inline-block p-2 rounded-full bg-neon-gold/10 border border-neon-gold/50 mb-4">
                    <Award className="w-8 h-8 text-neon-gold" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">Struktur Organisasi</h1>
                <p className="text-slate-400">Hierarki kepemimpinan OSIS AL-Manar Periode 2025/2026</p>
            </div>

            {/* TREE VISUALIZATION */}
            <div className="max-w-6xl mx-auto mb-20">

                {/* Tier 1: KETUA */}
                <div className="flex justify-center mb-4">
                    <div className="w-full max-w-md">
                        <CardProfile member={bph[0]} size="large" />
                    </div>
                </div>

                <Connector height="h-12" />

                {/* Horizontal Line for Wakils */}
                <div className="w-1/2 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-4 relative">
                    <div className="absolute left-0 top-0 w-0.5 h-4 bg-white/20"></div>
                    <div className="absolute right-0 top-0 w-0.5 h-4 bg-white/20"></div>
                </div>

                {/* Tier 2: WAKILS */}
                <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-32 mb-12">
                    <div className="w-64 mx-auto md:mx-0"><CardProfile member={bph[1]} /></div>
                    <div className="w-64 mx-auto md:mx-0"><CardProfile member={bph[2]} /></div>
                </div>

                {/* Middleware: Sekretaris & Bendahara */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 relative">
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2 hidden md:block"></div>

                    <div className="space-y-4">
                        <h3 className="text-center text-holographic-teal font-bold mb-4 uppercase tracking-widest">Sekretariat</h3>
                        <div className="flex flex-col gap-4 items-center">
                            {secretaries.map(m => <div key={m.id} className="w-64"><CardProfile member={m} /></div>)}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-center text-blue-400 font-bold mb-4 uppercase tracking-widest">Kebendaharaan</h3>
                        <div className="flex flex-col gap-4 items-center">
                            {treasurers.map(m => <div key={m.id} className="w-64"><CardProfile member={m} /></div>)}
                        </div>
                    </div>
                </div>
            </div>

            {/* DIVISIONS GRID */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Jajaran Seksi Bidang</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {divisions.map((div, i) => (
                        <GlassCard key={i} className={`border-t-4 ${div.color} hover:shadow-lg transition-all`}>
                            <h3 className="text-xl font-bold text-white mb-4">{div.name}</h3>
                            <div className="space-y-3">
                                {div.members.map((m, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-2 rounded hover:bg-white/5">
                                        <div className="w-8 h-8 rounded-full bg-navy-lighter flex items-center justify-center border border-white/10">
                                            <User size={14} className="text-slate-400" />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium text-sm">{m.name}</p>
                                            <p className="text-xs text-slate-500">{m.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>

        </div>
    );
}
