"use client";

import React, { useState } from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlowingButton } from '../../components/ui/GlowingButton';
import { MessageSquare, Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SuggestionPage() {
    const [isAnonymous, setIsAnonymous] = useState(true);

    return (
        <div className="min-h-screen container mx-auto px-6 py-12 flex items-center justify-center">
            <div className="w-full max-w-2xl">
                <div className="text-center mb-10">
                    <div className="w-20 h-20 rounded-full bg-holographic-teal/10 flex items-center justify-center mx-auto mb-6 border border-holographic-teal/30">
                        <MessageSquare className="w-10 h-10 text-holographic-teal" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">The Whisper Box</h1>
                    <p className="text-slate-400">
                        Suara Anda sangat berarti. Sampaikan aspirasi, kritik, atau saran membangun untuk OSIS AL-Manar yang lebih baik.
                    </p>
                </div>

                <GlassCard className="p-8 border-holographic-teal/20">
                    <div className="flex items-center justify-between mb-8 p-4 bg-navy-lighter rounded-lg border border-white/5">
                        <div className="flex items-center gap-3">
                            {isAnonymous ? <EyeOff className="text-slate-400" /> : <Eye className="text-neon-gold" />}
                            <div>
                                <h4 className="text-white font-bold text-sm">Mode Anonim</h4>
                                <p className="text-xs text-slate-500">{isAnonymous ? 'Identitas Anda disembunyikan.' : 'Identitas akan dicatat.'}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsAnonymous(!isAnonymous)}
                            className={`relative w-12 h-6 rounded-full transition-colors ${isAnonymous ? 'bg-holographic-teal' : 'bg-slate-600'}`}
                        >
                            <motion.div
                                layout
                                className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                                animate={{ x: isAnonymous ? 24 : 0 }}
                            />
                        </button>
                    </div>

                    <form className="space-y-6">
                        {!isAnonymous && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                                <input type="text" placeholder="Nama Lengkap" className="w-full bg-navy-lighter border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-holographic-teal transition-colors" />
                                <input type="text" placeholder="Kelas / Jabatan" className="w-full bg-navy-lighter border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-holographic-teal transition-colors" />
                            </motion.div>
                        )}

                        <div>
                            <label className="block text-xs font-mono text-slate-400 mb-2 uppercase">Kategori Aspirasi</label>
                            <select className="w-full bg-navy-lighter border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-holographic-teal transition-colors appearance-none cursor-pointer">
                                <option>Saran Program Kerja</option>
                                <option>Kritik Membangun</option>
                                <option>Laporan Fasilitas</option>
                                <option>Lainnya</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-mono text-slate-400 mb-2 uppercase">Isi Pesan</label>
                            <textarea
                                rows="6"
                                className="w-full bg-navy-lighter border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-holographic-teal transition-colors"
                                placeholder="Tuliskan aspirasi Anda dengan bahasa yang sopan..."
                            ></textarea>
                        </div>

                        <GlowingButton variant="secondary" className="w-full flex items-center justify-center gap-2">
                            <Lock className="w-4 h-4" /> Kirim Aspirasi {isAnonymous && 'Secara Rahasia'}
                        </GlowingButton>
                    </form>

                    <p className="mt-6 text-center text-xs text-slate-500">
                        *Setiap pesan yang masuk akan direview oleh MPK (Majelis Perwakilan Kelas) sebelum diteruskan ke Pengurus OSIS.
                    </p>
                </GlassCard>
            </div>
        </div>
    );
}
