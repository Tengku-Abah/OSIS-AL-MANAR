"use client";

import React from 'react';
import { SectionWrapper } from '../../components/ui/SectionWrapper';
import { GlassCard } from '../../components/ui/GlassCard';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, Circle } from 'lucide-react';

const allPrograms = [
    {
        division: "Olahraga",
        color: "text-orange-500",
        items: [
            { name: "Liga Futsal Antar Kelas", status: "Terlaksana", date: "Nov 2025" },
            { name: "Senam Pagi Rutin", status: "Berjalan", date: "Setiap Jumat" },
            { name: "Turnamen Basket", status: "Akan Datang", date: "Feb 2026" }
        ]
    },
    {
        division: "Kewirausahaan",
        color: "text-yellow-500",
        items: [
            { name: "Market Day Bulanan", status: "Berjalan", date: "Minggu ke-1" },
            { name: "Bazar Sekolah", status: "Terlaksana", date: "Okt 2025" }
        ]
    },
    {
        division: "TIK & Literasi",
        color: "text-blue-500",
        items: [
            { name: "Website Update", status: "Berjalan", date: "Mingguan" },
            { name: "Lomba Poster Digital", status: "Akan Datang", date: "Jan 2026" }
        ]
    }
];

export default function ProgramPage() {
    return (
        <div className="min-h-screen container mx-auto px-6 py-24">
            <SectionWrapper>
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold font-heading text-white mb-6">Program Kerja</h1>
                    <p className="text-slate-400 text-lg">Transparansi kegiatan dan agenda OSIS Al-Manar periode 2025/2026.</p>
                </div>
            </SectionWrapper>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {allPrograms.map((div, i) => (
                    <SectionWrapper key={i} delay={i * 0.1}>
                        <GlassCard className="h-full">
                            <h2 className={`text-2xl font-bold mb-6 ${div.color}`}>{div.division}</h2>
                            <div className="space-y-4">
                                {div.items.map((prog, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                        <div className="flex items-start gap-4">
                                            <div className={`mt-1 ${prog.status === 'Terlaksana' ? 'text-green-500' : prog.status === 'Berjalan' ? 'text-blue-400' : 'text-slate-500'}`}>
                                                {prog.status === 'Terlaksana' ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold">{prog.name}</h4>
                                                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                                                    <Calendar size={12} />
                                                    {prog.date}
                                                </div>
                                            </div>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded border ${prog.status === 'Terlaksana' ? 'border-green-500/30 text-green-500 bg-green-500/10' :
                                                prog.status === 'Berjalan' ? 'border-blue-400/30 text-blue-400 bg-blue-400/10' :
                                                    'border-slate-500/30 text-slate-500 bg-slate-500/10'
                                            }`}>
                                            {prog.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    </SectionWrapper>
                ))}
            </div>
        </div>
    );
}
