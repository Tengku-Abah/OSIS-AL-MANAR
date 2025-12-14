"use client";

import React from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlowingButton } from '../../components/ui/GlowingButton';
import { ArrowRight, Clock, User, Tag } from 'lucide-react';

const news = [
    { id: 1, title: 'Menyalakan Harapan Baru: Langkah Perdana Kabinet AL-Manar', date: '14 Des 2025', author: 'Ketua OSIS', excerpt: 'Seperti layaknya fajar yang menyingsing, kepengurusan OSIS AL-Manar tahun ini hadir membawa semangat pembaharuan.', category: 'Editorial' },
    { id: 2, title: 'Recap: Keseruan Class Meeting Semester Ganjil', date: '12 Des 2025', author: 'Sekbid Olahraga', excerpt: 'Pertandingan futsal antar kelas berlangsung sengit! Simak daftar juara dan momen terbaik di sini.', category: 'Event' },
    { id: 3, title: 'Penggalangan Dana untuk Korban Banjir', date: '10 Des 2025', author: 'Sekbid Sosial', excerpt: 'OSIS AL-Manar mengajak seluruh warga sekolah untuk berdonasi bagi saudara kita yang terdampak bencana.', category: 'Sosial' },
    { id: 4, title: 'Workshop Public Speaking: Bicara Tanpa Ragu', date: '05 Des 2025', author: 'Sekbid Pendidikan', excerpt: 'Tips dan trik meningkatkan kepercayaan diri saat berbicara di depan umum bersama narasumber ahli.', category: 'Edukasi' },
    { id: 5, title: 'Penting! Jadwal Ujian Akhir Semester Genap', date: '01 Des 2025', author: 'Kurikulum', excerpt: 'Persiapkan dirimu! Berikut adalah jadwal lengkap UAS untuk kelas X, XI, dan XII beserta tata tertib ujian.', category: 'Akademik' },
    { id: 6, title: 'Profil Ekskul: Robotik Meraih Emas', date: '28 Nov 2025', author: 'Sekbid TIK', excerpt: 'Tim Robotik sekolah kita berhasil menyabet medali emas di ajang Nasional. Bagaimana perjuangan mereka?', category: 'Prestasi' },
    { id: 7, title: 'Tips Menjaga Kesehatan Mental saat Ujian', date: '25 Nov 2025', author: 'Konselor', excerpt: 'Jangan stress! Simak 5 cara ampuh menjaga kewarasan dan fokus belajar di masa-masa sibuk ini.', category: 'Tips' },
    { id: 8, title: 'Launch Website Resmi OSIS: The New Era', date: '20 Nov 2025', author: 'Tim Web Dev', excerpt: 'Kami bangga mempersembahkan wajah baru digital OSIS AL-Manar. Apa saja fiturnya?', category: 'Teknologi' },
    { id: 9, title: 'Laporan Keuangan Bulan November Transparan', date: '15 Nov 2025', author: 'Bendahara', excerpt: 'Transparansi adalah kunci. Berikut adalah laporan pemasukan dan pengeluaran kas OSIS bulan ini.', category: 'Laporan' },
    { id: 10, title: 'Opini: Pentingnya Literasi Digital', date: '10 Nov 2025', author: 'Fulanah', excerpt: 'Di era informasi yang deras, kemampuan memilah berita hoax menjadi skill wajib bagi pelajar.', category: 'Opini' },
    { id: 11, title: 'Jadwal Piket Perpustakaan Baru', date: '05 Nov 2025', author: 'Pustakawan', excerpt: 'Bagi siswa yang ingin menjadi relawan perpustakaan, simak jadwal rotasi terbaru berikut ini.', category: 'Info' },
    { id: 12, title: 'Galeri: Upacara Hari Pahlawan 2025', date: '10 Nov 2025', author: 'Dokumentasi', excerpt: 'Khidmat dan penuh semangat. Kumpulan foto terbaik dari upacara peringatan Hari Pahlawan kemarin.', category: 'Galeri' },
];

export default function NewsPage() {
    return (
        <div className="min-h-screen container mx-auto px-6 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold font-heading text-white">Guidance Post</h1>
                <p className="text-slate-400">Berita terkini, inspirasi, dan pengumuman resmi dari OSIS AL-Manar.</p>
            </div>

            {/* Featured News */}
            <div className="mb-12">
                <GlassCard hoverEffect className="relative overflow-hidden group min-h-[400px] flex flex-col md:flex-row">
                    <div className="md:w-1/2 bg-slate-800 relative min-h-[200px]">
                        <div className="absolute inset-0 flex items-center justify-center text-white/10 text-6xl font-bold">HOT NEWS</div>
                        <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded shadow-lg uppercase tracking-wider animate-pulse">Headline</div>
                    </div>
                    <div className="md:w-1/2 p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-2 text-neon-gold text-sm font-bold mb-4 uppercase tracking-wider">
                            <Tag className="w-4 h-4" /> Editorial
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 group-hover:text-neon-gold transition-colors">
                            Menyalakan Harapan Baru: Langkah Perdana Kabinet AL-Manar
                        </h2>
                        <p className="text-slate-300 mb-6 text-lg leading-relaxed">
                            Seperti layaknya fajar yang menyingsing, kepengurusan OSIS AL-Manar tahun ini hadir membawa semangat pembaharuan. Kami berkomitmen untuk...
                        </p>
                        <GlowingButton className="self-start">Baca Artikel Utama <ArrowRight className="w-4 h-4" /></GlowingButton>
                    </div>
                </GlassCard>
            </div>

            {/* Grid News */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.slice(1).map((item) => (
                    <GlassCard key={item.id} hoverEffect className="flex flex-col h-full group">
                        <div className="h-48 mb-6 bg-navy-lighter rounded-lg overflow-hidden relative border border-white/5">
                            <div className="absolute inset-0 bg-gradient-to-t from-deep-navy to-transparent opacity-60"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform">
                                <span className="text-xs font-bold text-white bg-white/10 backdrop-blur px-2 py-1 rounded">{item.category}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {item.date}</span>
                            <span className="flex items-center gap-1"><User className="w-3 h-3" /> {item.author}</span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-neon-gold transition-colors line-clamp-2">{item.title}</h3>
                        <p className="text-slate-400 mb-6 flex-grow text-sm line-clamp-3">{item.excerpt}</p>

                        <button className="text-neon-gold text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all self-start mt-auto">
                            Baca Selengkapnya <ArrowRight className="w-4 h-4" />
                        </button>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
}
