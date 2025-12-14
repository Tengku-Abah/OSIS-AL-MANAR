import React from 'react';
import { Rocket, Instagram, Youtube, Facebook } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-deep-navy border-t border-white/5 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <Rocket className="w-6 h-6 text-neon-gold" />
                            <span className="text-2xl font-bold font-heading text-white">
                                AL-<span className="text-neon-gold">MANAR</span>
                            </span>
                        </div>
                        <p className="text-slate-400 max-w-sm mb-6">
                            Organisasi Siswa Intra Sekolah (OSIS) yang berdedikasi menjadi suar pemandu bagi siswa untuk berinovasi, berprestasi, dan berakhlak mulia.
                        </p>
                        <div className="flex gap-4">
                            {[Instagram, Youtube, Facebook].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="p-2 rounded-full bg-navy-light text-slate-300 hover:text-neon-gold hover:bg-navy-lighter transition-colors"
                                >
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Navigasi</h4>
                        <ul className="space-y-3 text-slate-400">
                            <li><a href="/about" className="hover:text-neon-gold transition-colors">Tentang Kami</a></li>
                            <li><a href="/organization" className="hover:text-neon-gold transition-colors">Struktur Organisasi</a></li>
                            <li><a href="/news" className="hover:text-neon-gold transition-colors">Berita Terkini</a></li>
                            <li><a href="/calendar" className="hover:text-neon-gold transition-colors">Kalender Kegiatan</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Hubungi Kami</h4>
                        <ul className="space-y-3 text-slate-400">
                            <li>Sekolah Menengah Atas ...</li>
                            <li>Jl. Pendidikan No. 1, ...</li>
                            <li>osis@sekolah.sch.id</li>
                            <li>+62 812-3456-7890</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 text-center text-slate-500 text-sm">
                    <p>© {new Date().getFullYear()} OSIS AL-Manar. All rights reserved.</p>
                    <p className="mt-2 text-xs">Designed with ❤️ by Antigravity</p>
                </div>
            </div>
        </footer>
    );
}
