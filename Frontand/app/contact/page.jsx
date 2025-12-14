"use client";

import React from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlowingButton } from '../../components/ui/GlowingButton';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                {/* Contact Info */}
                <div>
                    <h1 className="text-4xl font-bold font-heading text-white mb-6">Connect with <span className="text-neon-gold">Light</span></h1>
                    <p className="text-slate-300 mb-8 text-lg">
                        Punya pertanyaan tentang program kami atau ingin berkolaborasi? Jangan ragu untuk menghubungi kami.
                    </p>

                    <div className="space-y-6">
                        <GlassCard className="flex items-center gap-6 p-6">
                            <div className="w-12 h-12 rounded-full bg-navy-lighter flex items-center justify-center border border-white/10">
                                <MapPin className="text-neon-gold w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold">Sekretariat OSIS</h3>
                                <p className="text-slate-400">SMA ...<br />Jl. Pendidikan No. 1, ...</p>
                            </div>
                        </GlassCard>

                        <GlassCard className="flex items-center gap-6 p-6">
                            <div className="w-12 h-12 rounded-full bg-navy-lighter flex items-center justify-center border border-white/10">
                                <Mail className="text-holographic-teal w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold">Email Resmi</h3>
                                <p className="text-slate-400">osis@sekolah.sch.id</p>
                            </div>
                        </GlassCard>

                        <GlassCard className="flex items-center gap-6 p-6">
                            <div className="w-12 h-12 rounded-full bg-navy-lighter flex items-center justify-center border border-white/10">
                                <Phone className="text-blue-400 w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold">WhatsApp Admin</h3>
                                <p className="text-slate-400">+62 812-3456-7890</p>
                            </div>
                        </GlassCard>
                    </div>
                </div>

                {/* Map / Form Overlay */}
                <GlassCard className="h-full min-h-[500px] relative overflow-hidden bg-navy-light/20 p-0">
                    {/* Map Placeholder */}
                    <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                        <span className="text-slate-500 font-mono">GOOGLE MAPS EMBED HERE</span>
                    </div>

                    {/* Simple Message Form Overlay */}
                    <div className="absolute bottom-6 left-6 right-6 bg-deep-navy/90 backdrop-blur-md p-6 rounded-xl border border-white/10">
                        <h3 className="text-white font-bold mb-4">Kirim Pesan Cepat</h3>
                        <form className="space-y-4">
                            <input type="email" placeholder="Email Anda" className="w-full bg-navy-lighter rounded border border-white/10 p-3 text-white text-sm focus:border-neon-gold outline-none" />
                            <textarea placeholder="Pesan Anda..." rows="3" className="w-full bg-navy-lighter rounded border border-white/10 p-3 text-white text-sm focus:border-neon-gold outline-none"></textarea>
                            <GlowingButton className="w-full text-sm py-2">
                                Kirim Pesan <Send className="w-4 h-4" />
                            </GlowingButton>
                        </form>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
