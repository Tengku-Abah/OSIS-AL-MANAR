"use client";

import React, { useState } from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
    { q: 'Bagaimana cara mendaftar menjadi pengurus OSIS?', a: 'Pendaftaran dibuka setiap akhir semester ganjil melalui formulir online di website ini. Pantau terus halaman Berita untuk pengumuman jadwal seleksi.' },
    { q: 'Apa saja syarat untuk menjadi Ketua OSIS?', a: 'Syarat utama adalah siswa kelas X atau XI, memiliki rata-rata nilai akademik minimal 80, dan lulus seleksi wawancara serta tes kepemimpinan.' },
    { q: 'Bagaimana cara mengajukan proposal kegiatan ekskul?', a: 'Proposal dapat diajukan melalui portal anggota (Login) atau diserahkan langsung ke Sekbid terkait minimal 2 minggu sebelum kegiatan.' },
    { q: 'Apakah aspirasi di "Share Your Voice" benar-benar anonim?', a: 'Ya, sistem kami tidak mencatat identitas pengirim (seperti nama atau email) kecuali Anda mencantumkannya sendiri di dalam pesan.' },
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className="min-h-screen container mx-auto px-6 py-12">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold font-heading text-white">Quick Guide</h1>
                <p className="text-slate-400">Pertanyaan yang sering diajukan seputar OSIS AL-Manar.</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                    <GlassCard
                        key={index}
                        className="p-0 overflow-hidden cursor-pointer"
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    >
                        <div className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-4">
                                <HelpCircle className="text-neon-gold w-5 h-5" />
                                <h3 className="font-bold text-white text-lg">{faq.q}</h3>
                            </div>
                            {openIndex === index ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
                        </div>
                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="bg-navy-light/30 px-6 pb-6 pt-2"
                                >
                                    <p className="text-slate-300 ml-9">{faq.a}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
}
