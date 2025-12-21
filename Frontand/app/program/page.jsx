"use client";

import React, { useState } from 'react';
import { SectionWrapper } from '../../components/ui/SectionWrapper';
import { GlassCard } from '../../components/ui/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, CheckCircle2, Circle, ChevronLeft, User, ArrowRight, Target, Users, Heart, Crown } from 'lucide-react';

const allPrograms = [
    {
        id: "bph",
        division: "Inti / BPH",
        color: "text-purple-500",
        bg: "bg-purple-500",
        icon: <Crown size={40} />,
        description: "Badan Pengurus Harian yang bertanggung jawab atas koordinasi seluruh kegiatan dan arah kebijakan OSIS.",
        items: [
            {
                id: "ldks",
                name: "LDKS",
                status: "Terlaksana",
                date: "Sep 2025",
                description: "Latihan Dasar Kepemimpinan Siswa untuk membentuk karakter pemimpin yang tangguh dan visioner bagi pengurus baru.",
                image: null,
                pic: { name: "Mustafa Raja U.", role: "Ketua OSIS", image: null }
            },
            {
                id: "pleno",
                name: "Sidang Pleno",
                status: "Akan Datang",
                date: "Mar 2026",
                description: "Forum evaluasi kinerja tengah periode dan pembahasan ulang program kerja untuk semester berikutnya.",
                image: null,
                pic: { name: "Mabel Belincia", role: "Wakil Ketua OSIS", image: null }
            },
            {
                id: "rapat-rutin",
                name: "Rapat Koordinasi",
                status: "Berjalan",
                date: "Bulanan",
                description: "Pertemuan rutin seluruh pengurus OSIS untuk membahas progress setiap divisi dan memecahkan kendala bersama.",
                image: null,
                pic: { name: "Raditya Putra", role: "Sekretaris 1", image: null }
            }
        ]
    },
    {
        id: "olahraga",
        division: "Olahraga & Kesehatan",
        color: "text-orange-500",
        bg: "bg-orange-500",
        icon: <Target size={40} />,
        description: "Mengembangkan potensi fisik dan sportivitas siswa melalui berbagai kompetisi dan kegiatan rutin.",
        items: [
            {
                id: "futsal",
                name: "Liga Futsal Antar Kelas",
                status: "Terlaksana",
                date: "Nov 2025",
                description: "Turnamen futsal tahunan yang mempertemukan tim terbaik dari setiap kelas. Ajang ini bertujuan untuk mempererat tali persaudaraan antar siswa sekaligus mencari bibit-bibit unggul untuk tim sekolah.",
                image: null,
                pic: { name: "Rizky Pratama", role: "Koordinator Olahraga", image: null }
            },
            {
                id: "senam",
                name: "Senam Pagi Rutin",
                status: "Berjalan",
                date: "Setiap Jumat",
                description: "Kegiatan senam bersama yang diadakan setiap Jumat pagi sebelum memulai pelajaran. Wajib diikuti oleh seluruh siswa dan guru untuk menjaga kebugaran tubuh.",
                image: null,
                pic: { name: "Dimas Anggara", role: "Anggota Divisi", image: null }
            },
            {
                id: "basket",
                name: "Turnamen Basket",
                status: "Akan Datang",
                date: "Feb 2026",
                description: "Kompetisi bola basket 3on3 yang seru dan menantang. Terbuka untuk tim putra dan putri dengan sistem gugur.",
                image: null,
                pic: { name: "Bayu Saputra", role: "Anggota Divisi", image: null }
            }
        ]
    },
    {
        id: "kewirausahaan",
        division: "Kewirausahaan",
        color: "text-yellow-500",
        bg: "bg-yellow-500",
        icon: <BriefcaseIcon size={40} />,
        description: "Melatih kemandirian dan jiwa bisnis siswa melalui praktek langsung dalam mengelola usaha kecil.",
        items: [
            {
                id: "market-day",
                name: "Market Day Bulanan",
                status: "Berjalan",
                date: "Minggu ke-1",
                description: "Setiap minggu pertama bulan, siswa diberikan kesempatan untuk membuka stand makanan atau kerajinan tangan di area sekolah. Melatih kemampuan marketing dan manajemen uang.",
                image: null,
                pic: { name: "Siti Aminah", role: "Koordinator Kewirausahaan", image: null }
            },
            {
                id: "bazar",
                name: "Bazar Sekolah",
                status: "Terlaksana",
                date: "Okt 2025",
                description: "Acara besar tahunan yang mengundang wali murid dan masyarakat sekitar. Menampilkan produk unggulan siswa dan berbagai pertunjukan seni.",
                image: null,
                pic: { name: "Rina Wati", role: "Anggota Divisi", image: null }
            }
        ]
    },
    {
        id: "tik",
        division: "TIK & Literasi Digital",
        color: "text-blue-500",
        bg: "bg-blue-500",
        icon: <LaptopIcon size={40} />,
        description: "Memfasilitasi pengembangan kemampuan digital dan minat baca siswa di era teknologi.",
        items: [
            {
                id: "website",
                name: "Website Update",
                status: "Berjalan",
                date: "Mingguan",
                description: "Pemeliharaan dan pembaruan konten website sekolah secara berkala. Melibatkan tim jurnalis siswa untuk mengisi berita dan artikel terkini.",
                image: null,
                pic: { name: "Andi Wijaya", role: "Koordinator TIK", image: null }
            },
            {
                id: "poster",
                name: "Lomba Poster Digital",
                status: "Akan Datang",
                date: "Jan 2026",
                description: "Kompetisi desain grafis dengan tema lingkungan hidup. Bertujuan untuk mengasah kreativitas siswa dalam menggunakan software desain.",
                image: null,
                pic: { name: "Maya Sari", role: "Anggota Divisi", image: null }
            }
        ]
    },
    {
        id: "ketaqwaan",
        division: "Ketaqwaan",
        color: "text-green-500",
        bg: "bg-green-500",
        icon: <Heart size={40} />,
        description: "Memperkokoh iman dan taqwa warga sekolah melalui kegiatan keagamaan yang inklusif.",
        items: [
            {
                id: "kajian",
                name: "Kajian Jumat",
                status: "Berjalan",
                date: "Setiap Jumat",
                description: "Kegiatan siraman rohani rutin yang menghadirkan penceramah inspiratif. Dilaksanakan di masjid sekolah sebelum sholat Jumat.",
                image: null,
                pic: { name: "Abdullah", role: "Koordinator Ketaqwaan", image: null }
            },
            {
                id: "phbi",
                name: "Peringatan PHBI",
                status: "Akan Datang",
                date: "Sesuai Kalender",
                description: "Perayaan Hari Besar Islam seperti Maulid Nabi, Isra Miraj, dan Pesantren Kilat Ramadhan. Diisi dengan lomba, ceramah, dan santunan.",
                image: null,
                pic: { name: "Fatimah", role: "Anggota Divisi", image: null }
            }
        ]
    }
];

// Simple icons for props
function BriefcaseIcon({ size }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
    );
}

function LaptopIcon({ size }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" /></svg>
    );
}

export default function ProgramPage() {
    const [view, setView] = useState('divisions'); // 'divisions', 'list', 'detail'
    const [selectedDivision, setSelectedDivision] = useState(null);
    const [selectedProgram, setSelectedProgram] = useState(null);

    const handleDivisionClick = (div) => {
        setSelectedDivision(div);
        setView('list');
    };

    const handleProgramClick = (prog) => {
        setSelectedProgram(prog);
        setView('detail');
    };

    const handleBackToDivisions = () => {
        setSelectedDivision(null);
        setView('divisions');
    };

    const handleBackToList = () => {
        setSelectedProgram(null);
        setView('list');
    };

    return (
        <div className="min-h-screen container mx-auto px-6 py-24 pb-32">
            <SectionWrapper>
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold font-heading text-white mb-6">Program Kerja</h1>
                    <p className="text-slate-400 text-lg">Transparansi kegiatan dan agenda OSIS Al-Manar periode 2025/2026.</p>
                </div>
            </SectionWrapper>

            {/* BREADCRUMB NAVIGATION */}
            <div className="flex items-center gap-2 mb-8 text-sm md:text-base font-medium">
                <button
                    onClick={handleBackToDivisions}
                    className={`hover:text-neon-gold transition-colors ${view === 'divisions' ? 'text-neon-gold' : 'text-slate-400'}`}
                >
                    Divisi
                </button>

                {selectedDivision && (
                    <>
                        <span className="text-slate-600"><ChevronLeft size={16} className="rotate-180" /></span>
                        <button
                            onClick={handleBackToDivisions}
                            className={`hover:text-neon-gold transition-colors ${view === 'list' ? 'text-neon-gold' : 'text-slate-400'}`}
                        >
                            {selectedDivision.division}
                        </button>
                    </>
                )}

                {selectedProgram && (
                    <>
                        <span className="text-slate-600"><ChevronLeft size={16} className="rotate-180" /></span>
                        <span className="text-neon-gold truncate max-w-[150px] md:max-w-none">
                            {selectedProgram.name}
                        </span>
                    </>
                )}
            </div>

            <AnimatePresence mode="wait">
                {/* VIEW 1: DIVISION GRID */}
                {view === 'divisions' && (
                    <motion.div
                        key="divisions"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {allPrograms.map((div, i) => (
                            <SectionWrapper key={div.id} delay={i * 0.1}>
                                <div
                                    onClick={() => handleDivisionClick(div)}
                                    className="group cursor-pointer relative h-full bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.05] rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2"
                                >
                                    <div className={`mb-6 p-4 rounded-2xl inline-block bg-white/5 ${div.color} group-hover:scale-110 transition-transform duration-300`}>
                                        {div.icon}
                                    </div>
                                    <h2 className={`text-2xl font-bold mb-4 text-white group-hover:${div.color} transition-colors`}>{div.division}</h2>
                                    <p className="text-slate-400 mb-6 line-clamp-3">{div.description}</p>
                                    <div className="flex items-center gap-2 text-sm font-bold text-white/50 group-hover:text-white transition-colors">
                                        <span>Lihat {div.items.length} Program</span>
                                        <ArrowRight size={16} />
                                    </div>
                                </div>
                            </SectionWrapper>
                        ))}
                    </motion.div>
                )}

                {/* VIEW 2: PROGRAM LIST */}
                {view === 'list' && selectedDivision && (
                    <motion.div
                        key="list"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center gap-4 mb-12 mt-4">
                            <div className={`p-3 rounded-xl bg-white/5 ${selectedDivision.color}`}>
                                {selectedDivision.icon}
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-1">{selectedDivision.division}</h2>
                                <p className="text-slate-400">Daftar program kerja aktif</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {selectedDivision.items.map((prog, idx) => (
                                <SectionWrapper key={prog.id} delay={idx * 0.1}>
                                    <div
                                        onClick={() => handleProgramClick(prog)}
                                        className="group cursor-pointer bg-navy-light/40 border border-white/5 hover:border-white/20 hover:bg-navy-light/60 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-black/20"
                                    >
                                        {/* Program Image Placeholder in Card */}
                                        <div className="w-full h-40 mb-4 bg-black/20 rounded-xl overflow-hidden flex items-center justify-center border border-white/5 group-hover:border-white/10 transition-colors">
                                            {prog.image ? (
                                                <img src={prog.image} alt={prog.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="text-slate-600 flex flex-col items-center">
                                                    <Target size={32} className="mb-2 opacity-50" />
                                                    <span className="text-xs uppercase tracking-widest font-bold">No Image</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex justify-between items-start mb-4">
                                            <span className={`text-xs px-2 py-1 rounded border ${prog.status === 'Terlaksana' ? 'border-green-500/30 text-green-500 bg-green-500/10' :
                                                prog.status === 'Berjalan' ? 'border-blue-400/30 text-blue-400 bg-blue-400/10' :
                                                    'border-slate-500/30 text-slate-500 bg-slate-500/10'
                                                }`}>
                                                {prog.status}
                                            </span>
                                            <div className="text-xs text-slate-500 flex items-center gap-1 bg-black/20 px-2 py-1 rounded-full">
                                                <Calendar size={12} />
                                                {prog.date}
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-gold transition-colors">{prog.name}</h3>
                                        <p className="text-slate-400 text-sm line-clamp-2 mb-6">{prog.description}</p>

                                        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                                            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">
                                                {prog.pic.name.charAt(0)}
                                            </div>
                                            <div className="text-xs">
                                                <div className="text-white font-medium">{prog.pic.name}</div>
                                                <div className="text-slate-500">Penanggung Jawab</div>
                                            </div>
                                        </div>
                                    </div>
                                </SectionWrapper>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* VIEW 3: PROGRAM DETAIL */}
                {view === 'detail' && selectedProgram && (
                    <motion.div
                        key="detail"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-4xl mx-auto"
                    >
                        <GlassCard className="overflow-hidden relative mt-8">
                            {/* Decorative Header */}
                            <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${selectedProgram.status === 'Terlaksana' ? 'from-green-500 to-emerald-400' :
                                    selectedProgram.status === 'Berjalan' ? 'from-blue-500 to-indigo-400' :
                                        'from-slate-500 to-gray-400'
                                }`} />

                            {/* Large Program Image Banner */}
                            <div className="w-full h-64 md:h-80 bg-black/40 relative group overflow-hidden">
                                {selectedProgram.image ? (
                                    <img src={selectedProgram.image} alt={selectedProgram.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
                                        <Target size={64} className="mb-4 opacity-20" />
                                        <span className="text-sm uppercase tracking-widest font-bold opacity-50">Image Placeholder</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/50 to-transparent" />

                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">{selectedProgram.name}</h2>
                                    <div className="flex items-center gap-3">
                                        <span className={`text-sm px-3 py-1.5 rounded-full border font-medium bg-black/30 backdrop-blur-md ${selectedProgram.status === 'Terlaksana' ? 'border-green-500 text-green-400' :
                                                selectedProgram.status === 'Berjalan' ? 'border-blue-400 text-blue-400' :
                                                    'border-slate-500 text-slate-400'
                                            }`}>
                                            {selectedProgram.status}
                                        </span>
                                        <span className="text-sm px-3 py-1.5 rounded-full border border-white/20 text-slate-200 bg-black/30 backdrop-blur-md flex items-center gap-2">
                                            <Calendar size={14} />
                                            {selectedProgram.date}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                                    <div className="md:col-span-2 space-y-6">
                                        <div>
                                            <h3 className="text-lg font-bold text-neon-gold uppercase tracking-widest mb-4">Deskripsi Kegiatan</h3>

                                            <p className="text-slate-300 leading-relaxed text-lg">
                                                {selectedProgram.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="md:col-span-1">
                                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Penanggung Jawab (PIC)</h3>
                                            <div className="flex flex-col items-center text-center">
                                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border-4 border-white/10 shadow-xl mb-4 flex items-center justify-center text-3xl font-bold text-white">
                                                    {imageExists(selectedProgram.pic.image) ? (
                                                        <img src={selectedProgram.pic.image} alt={selectedProgram.pic.name} className="w-full h-full rounded-full object-cover" />
                                                    ) : (
                                                        selectedProgram.pic.name.charAt(0)
                                                    )}
                                                </div>
                                                <h4 className="text-xl font-bold text-white mb-1">{selectedProgram.pic.name}</h4>
                                                <p className="text-neon-gold text-sm font-medium">{selectedProgram.pic.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Helper to check if image is not null (mock)
function imageExists(img) {
    return img !== null && img !== undefined;
}
