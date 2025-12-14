"use client";

import React from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Rocket, Heart, Globe, Cpu, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

const pillars = [
    {
        id: 1,
        title: 'Inovasi & Teknologi (TIK)',
        icon: <Cpu className="w-8 h-8 text-holographic-teal" />,
        desc: 'Mengintegrasikan digitalisasi dalam kegiatan sekolah dan mengembangkan potensi siswa di bidang teknologi.',
        programs: ['Workshop Desain Grafis', 'E-Voting OSIS', 'Kompetisi E-Sport']
    },
    {
        id: 2,
        title: 'Kreativitas & Seni (Sekbid 8)',
        icon: <Palette className="w-8 h-8 text-pink-500" />,
        desc: 'Menjadi wadah ekspresi seni siswa melalui pameran dan pertunjukan modern.',
        programs: ['Pentas Seni Tahunan', 'Mading Digital', 'Kelas Film Pendek']
    },
    {
        id: 3,
        title: 'Budi Pekerti (Agama)',
        icon: <Heart className="w-8 h-8 text-red-500" />,
        desc: 'Membangun karakter siswa yang religius dan toleran melalui kegiatan keagamaan yang inklusif.',
        programs: ['Kajian Rutin', 'Bakso (Bakti Sosial)', 'Perayaan Hari Besar']
    },
    {
        id: 4,
        title: 'Wirausaha (Entrepreneur)',
        icon: <Rocket className="w-8 h-8 text-neon-gold" />,
        desc: 'Melatih jiwa kemandirian dan kewirausahaan siswa dengan praktik bisnis nyata.',
        programs: ['Market Day', 'OSIS Merchandise Store', 'Seminar Bisnis Muda']
    },
];

export default function PillarsPage() {
    return (
        <div className="min-h-screen container mx-auto px-6 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-6">Pillars of <span className="text-neon-gold">Impact</span></h1>
                <p className="text-slate-300 max-w-2xl mx-auto">
                    Divisi-divisi yang bekerja tak kenal lelah sebagai tiang penyangga visi AL-Manar.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {pillars.map((pillar, i) => (
                    <motion.div
                        key={pillar.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <GlassCard hoverEffect className="h-full group">
                            <div className="flex items-start gap-6">
                                <div className="p-4 rounded-xl bg-navy-lighter border border-white/5 group-hover:border-neon-gold/30 transition-colors">
                                    {pillar.icon}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{pillar.title}</h3>
                                    <p className="text-slate-400 mb-6">{pillar.desc}</p>
                                    <div>
                                        <h4 className="text-neon-gold text-sm font-bold uppercase tracking-wider mb-3">Program Unggulan:</h4>
                                        <ul className="space-y-2">
                                            {pillar.programs.map((prog, idx) => (
                                                <li key={idx} className="text-slate-300 text-sm flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-holographic-teal"></span>
                                                    {prog}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
