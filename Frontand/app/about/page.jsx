"use client";

import React from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { motion } from 'framer-motion';

const timeline = [
    { year: '2010', title: 'Inisiasi Cahaya', desc: 'OSIS AL-Manar didirikan sebagai wadah aspirasi siswa.' },
    { year: '2015', title: 'Era Digitalisasi', desc: 'Peluncuran program kerja berbasis teknologi pertama.' },
    { year: '2020', title: 'Resiliensi Pandemi', desc: 'Memimpin adaptasi kegiatan siswa secara virtual penuh.' },
    { year: '2025', title: 'The Cyber-Lighthouse', desc: 'Transformasi menuju ekosistem digital futuristik.' },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen container mx-auto px-6 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold font-heading text-white mb-6">The Story of <span className="text-neon-gold">Light</span></h1>
                <p className="text-slate-300 max-w-2xl mx-auto text-lg">
                    Sebuah perjalanan panjang dari sekadar organisasi menjadi pergerakan yang menerangi jalan bagi ribuan siswa.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                <GlassCard className="p-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Filosofi AL-Manar</h2>
                    <p className="text-slate-400 leading-relaxed mb-4">
                        "AL-Manar" berarti Menara Cahaya atau Mercusuar. Kami percaya bahwa setiap pemimpin bukanlah penguasa, melainkan pemandu yang berdiri tegak di tengah badai, memberikan arah yang benar, dan memastikan tidak ada kapal (siswa) yang karam dalam kegelapan ketidaktahuan.
                    </p>
                    <p className="text-slate-400 leading-relaxed">
                        Cahaya kami bersumber dari nilai-nilai luhur: <span className="text-neon-gold font-bold">Integritas</span>, <span className="text-holographic-teal font-bold">Inovasi</span>, dan <span className="text-blue-400 font-bold">Inklusivitas</span>.
                    </p>
                </GlassCard>
                <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-gold via-holographic-teal to-transparent opacity-50"></div>
                    <div className="space-y-8 pl-12">
                        {timeline.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="relative"
                            >
                                <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-deep-navy border-2 border-neon-gold z-10"></div>
                                <span className="text-neon-gold font-mono font-bold">{item.year}</span>
                                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                <p className="text-slate-500 text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
