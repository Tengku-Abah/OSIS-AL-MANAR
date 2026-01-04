"use client";

import React, { useState } from 'react';
import { SectionWrapper } from '../../components/ui/SectionWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Target, Users, X, Briefcase, ChevronRight, Info, Shield, Flag, LayoutGrid, Zap, Hexagon, History, BookOpen, CheckCircle2, Star, Clock } from 'lucide-react';
import OptimizedImage from '../../components/ui/OptimizedImage';

import api, { getImageUrl, getInitials } from '../../services/api';

// --- HELPER CONSTANTS ---
const DIVISION_INFO = {
    'Olahraga & Kesehatan': { color: 'text-orange-500', desc: "Mengembangkan potensi atletik dan sportivitas siswa.", programs: ["Liga Futsal", "Senam Pagi"] },
    'Kewirausahaan': { color: 'text-yellow-500', desc: "Membangun jiwa entrepreneurship dan kemandirian dana.", programs: ["Market Day", "Koperasi Jujur"] },
    'TIK & Literasi Digital': { color: 'text-blue-500', desc: "Digitalisasi informasi dan peningkatan minat baca.", programs: ["Website Update", "Pelatihan Desain"] },
    'Ketaqwaan': { color: 'text-green-500', desc: "Memperkokoh iman dan taqwa warga sekolah.", programs: ["Kajian Jumat", "Peringatan PHBI"] },
};

const TIMELINE_DATA = [
    { year: '2010', title: 'Inisiasi Cahaya', desc: 'OSIS AL-Manar didirikan sebagai wadah aspirasi siswa.' },
    { year: '2015', title: 'Era Digitalisasi', desc: 'Peluncuran program kerja berbasis teknologi pertama.' },
    { year: '2020', title: 'Resiliensi Pandemi', desc: 'Memimpin adaptasi kegiatan siswa secara virtual penuh.' },
    { year: '2025', title: 'The Cyber-Lighthouse', desc: 'Transformasi menuju ekosistem digital futuristik.' },
];

const TeamCard = ({ member, onClick, isLarge = false }) => (
    <div
        onClick={() => onClick && onClick(member)}
        className={`
        group relative cursor-pointer
        bg-navy-light/40 border border-white/5 rounded-2xl overflow-hidden shadow-lg
        transition-all duration-300 hover:border-white/20 hover:bg-navy-light/60 hover:-translate-y-1 hover:shadow-neon-gold/10
        flex flex-col items-center text-center z-10
        ${isLarge ? 'p-8 pb-8 w-64' : 'p-4 w-full'}
    `}
    >
        <div className={`
        rounded-full border-2 flex items-center justify-center font-bold mb-4
        transition-transform duration-500 group-hover:scale-110 group-hover:text-white
        ${member.photo ? 'bg-deep-navy border-white/10 group-hover:border-white/30' : 'bg-slate-200 border-neon-gold/50 text-slate-800 group-hover:border-neon-gold'}
        ${isLarge ? 'w-24 h-24 text-3xl shadow-2xl' : 'w-16 h-16 text-lg shadow-lg'}
        relative overflow-hidden
    `}>
            {member.photo ? (
                <OptimizedImage
                    src={getImageUrl(member.photo)}
                    alt={member.name}
                    className="w-full h-full rounded-full"
                />
            ) : (
                <span className="font-heading tracking-wider">
                    {getInitials(member.name)}
                </span>
            )}
        </div>

        <div className="w-full">
            <h3 className={`font-bold text-white truncate ${isLarge ? 'text-lg mb-1' : 'text-xs mb-1'}`}>
                {member.name}
            </h3>
            <p className={`uppercase tracking-widest font-medium truncate ${isLarge ? 'text-neon-gold text-xs' : 'text-slate-500 text-[9px]'}`}>
                {member.position || member.role}
            </p>
        </div>
    </div>
);

export default function OrganizationPage() {
    const [selectedMember, setSelectedMember] = useState(null);
    const [activeTab, setActiveTab] = useState('about');
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const fetchMembers = async () => {
            try {
                const data = await api.get('/members');
                setMembers(data);
            } catch (error) {
                console.error("Failed to fetch members:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMembers();
    }, []);

    // Filter Data
    const ketua = members.find(m => m.position.toLowerCase().includes('ketua') && !m.position.toLowerCase().includes('wakil'));
    const wakil = members.find(m => m.position.toLowerCase().includes('wakil'));

    // Fallbacks if not found (prevent crash)
    const bph1 = ketua || { name: 'Vacant', position: 'Ketua OSIS', division: 'BPH' };
    const bph2 = wakil || { name: 'Vacant', position: 'Wakil Ketua', division: 'BPH' };

    const secretaries = members.filter(m => m.position.toLowerCase().includes('sekretaris'));
    const treasurers = members.filter(m => m.position.toLowerCase().includes('bendahara'));

    // Group Divisions
    const divisionGroups = members
        .filter(m => m.division !== 'BPH')
        .reduce((acc, curr) => {
            if (!acc[curr.division]) acc[curr.division] = [];
            acc[curr.division].push(curr);
            return acc;
        }, {});

    const divisions = Object.keys(divisionGroups).map(divName => ({
        name: divName,
        members: divisionGroups[divName],
        ...DIVISION_INFO[divName] || { color: 'text-white', desc: 'Divisi OSIS', programs: [] }
    }));

    return (
        <div className="min-h-screen container mx-auto px-4 md:px-6 py-24 pb-32">

            {/* HEADER */}
            <SectionWrapper>
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold font-heading text-white mb-2 tracking-tight">
                        PROFIL ORGANISASI
                    </h1>
                    <div className="h-1 w-24 bg-neon-gold mx-auto rounded-full mt-6" />
                </div>
            </SectionWrapper>

            {/* TABS NAVIGATION */}
            <div className="flex justify-center mb-20 overflow-x-auto">
                <div className="bg-navy-light/30 p-1.5 rounded-full border border-white/5 flex gap-2 backdrop-blur-md min-w-max shadow-2xl">
                    {[
                        { id: 'about', label: 'Tentang OSIS' },
                        { id: 'vision', label: 'Visi & Misi' },
                        { id: 'struktur', label: 'Struktur Organisasi' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                px-6 md:px-8 py-3 rounded-full text-xs md:text-sm font-bold uppercase tracking-[0.1em] transition-all whitespace-nowrap relative overflow-hidden
                                ${activeTab === tab.id
                                    ? 'text-deep-navy bg-neon-gold shadow-[0_0_20px_rgba(255,215,0,0.4)]'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'}
                            `}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* CONTENT AREA */}
            <div className="min-h-[600px]">
                <AnimatePresence mode="wait">

                    {/* SECTION 1: ABOUT (TENTANG OSIS) */}
                    {activeTab === 'about' && (
                        <motion.div
                            key="about"
                            initial={{ opacity: 0, scale: 0.98, filter: 'blur(5px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, scale: 0.98, filter: 'blur(5px)' }}
                            transition={{ duration: 0.4 }}
                        >
                            <SectionWrapper>
                                <div className="max-w-7xl mx-auto space-y-8">

                                    {/* ROW 1: PHILOSOPHY & TIMELINE (Uniform Cards) */}
                                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">

                                        {/* Philosophy (3/5) */}
                                        <div className="lg:col-span-3 bg-navy-light/20 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 md:p-12 relative overflow-hidden group hover:border-white/10 transition-all duration-500">
                                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                                <BookOpen className="text-neon-gold w-32 h-32 rotate-12" />
                                            </div>

                                            <div className="relative z-10 flex flex-col justify-center h-full">
                                                <div className="flex items-center gap-3 mb-6">
                                                    <div className="h-px w-8 bg-neon-gold" />
                                                    <span className="text-neon-gold text-xs font-bold tracking-[0.3em] uppercase">Filosofi Kami</span>
                                                </div>

                                                <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-6 leading-tight">
                                                    The Story of <span className="text-neon-gold">Light</span>
                                                </h2>

                                                <p className="text-slate-300 leading-relaxed mb-6 font-light text-lg">
                                                    "<strong className="text-white">AL-Manar</strong>" berarti <strong>Menara Cahaya</strong>. Kami percaya bahwa pemimpin bukanlah penguasa, melainkan pemandu yang berdiri tegak di tengah badai.
                                                </p>

                                                <div className="mt-auto pt-6 border-t border-white/5">
                                                    <p className="text-white leading-relaxed font-medium">
                                                        Nilai luhur kami: <span className="text-neon-gold">Integritas</span>, <span className="text-white">Inovasi</span>, & <span className="text-white">Inklusivitas</span>.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Timeline (2/5) */}
                                        <div className="lg:col-span-2 bg-navy-light/20 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 md:p-12 relative overflow-hidden hover:border-white/10 transition-all duration-500 flex flex-col">
                                            <div className="mb-8 flex items-center gap-3">
                                                <Clock className="text-neon-gold" size={24} />
                                                <h3 className="text-xl font-bold text-white uppercase tracking-widest">Milestone</h3>
                                            </div>

                                            <div className="space-y-8 relative pl-2">
                                                {/* Line */}
                                                <div className="absolute left-[11px] top-2 bottom-2 w-px bg-white/10"></div>

                                                {TIMELINE_DATA.map((item, index) => (
                                                    <div key={index} className="relative pl-10 group">
                                                        <div className="absolute left-[5px] top-1.5 w-3 h-3 rounded-full bg-deep-navy border-2 border-neon-gold group-hover:scale-125 group-hover:bg-neon-gold transition-all duration-300 shadow-[0_0_10px_rgba(255,215,0,0.2)]"></div>
                                                        <span className="text-neon-gold font-mono font-bold text-xs tracking-wider mb-0.5 block">{item.year}</span>
                                                        <h4 className="text-lg font-bold text-white group-hover:text-neon-gold transition-colors">{item.title}</h4>
                                                        <p className="text-slate-500 text-xs mt-1 leading-relaxed">{item.desc}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* ROW 2: DEFINITION & FUNCTIONS (Uniform Cards) */}
                                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">

                                        {/* Definition & Goals (3/5) */}
                                        <div className="lg:col-span-3 bg-navy-light/20 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 md:p-12 relative overflow-hidden group hover:border-white/10 transition-colors duration-500">
                                            {/* Tech Pattern */}
                                            <div className="absolute -top-24 -right-24 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                                                <Hexagon size={400} strokeWidth={0.5} />
                                            </div>

                                            <div className="relative z-10">
                                                <div className="mb-8">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="h-px w-8 bg-neon-gold" />
                                                        <span className="text-neon-gold text-xs font-bold tracking-[0.3em] uppercase">Organisasi Resmi</span>
                                                    </div>
                                                    <h2 className="text-4xl md:text-6xl font-bold font-heading text-white tracking-tighter mb-4">
                                                        Apa itu <span className="text-transparent bg-clip-text bg-gradient-to-tr from-neon-gold to-white">OSIS?</span>
                                                    </h2>
                                                    <p className="text-xl text-slate-300 font-light leading-relaxed">
                                                        <strong className="text-white">Organisasi Siswa Intra Sekolah</strong>. Satu-satunya wadah resmi di sekolah yang diakui secara nasional.
                                                    </p>
                                                </div>

                                                <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                                    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                                                        <Star size={16} className="text-neon-gold" />
                                                        Tujuan Utama
                                                    </h3>
                                                    <div className="space-y-3">
                                                        {[
                                                            "Membentuk siswa yang bertanggung jawab dan disiplin.",
                                                            "Melatih kemampuan kerja sama dan komunikasi.",
                                                            "Menjadi penghubung harmonis antara siswa dan sekolah."
                                                        ].map((goal, idx) => (
                                                            <div key={idx} className="flex items-start gap-3">
                                                                <CheckCircle2 className="text-neon-gold/80 mt-0.5 shrink-0" size={18} />
                                                                <span className="text-slate-300 text-sm leading-relaxed">{goal}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Functions (2/5) */}
                                        <div className="lg:col-span-2 bg-navy-light/20 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors duration-500 flex flex-col justify-center">
                                            <div className="relative z-10 h-full flex flex-col">
                                                <div className="mb-6">
                                                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                                                        <Target className="text-neon-gold" size={28} />
                                                        Fungsi & Wadah
                                                    </h3>
                                                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Platform Untuk Siswa:</p>
                                                </div>

                                                <div className="space-y-3 flex-grow justify-center flex flex-col">
                                                    {[
                                                        { icon: Users, text: "Belajar Organisasi", sub: "Kepemimpinan & Manajemen" },
                                                        { icon: Zap, text: "Salurkan Aspirasi", sub: "Kreativitas & Ide" },
                                                        { icon: Briefcase, text: "Eksekusi Kegiatan", sub: "Event & Kompetisi" }
                                                    ].map((item, i) => (
                                                        <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-navy-light/40 hover:border-neon-gold/30 transition-all group/item">
                                                            <div className="p-3 rounded-lg bg-deep-navy border border-white/10 text-white group-hover/item:text-neon-gold group-hover/item:border-neon-gold/50 transition-colors shrink-0 shadow-lg">
                                                                <item.icon size={20} />
                                                            </div>
                                                            <div>
                                                                <p className="text-white font-bold text-sm">{item.text}</p>
                                                                <p className="text-slate-500 text-xs">{item.sub}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </SectionWrapper>
                        </motion.div>
                    )}

                    {/* SECTION 2: VISION & MISSION (VISI MISI) */}
                    {activeTab === 'vision' && (
                        <motion.div
                            key="vision"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.4 }}
                        >
                            <SectionWrapper>
                                <div className="max-w-7xl mx-auto space-y-20">

                                    {/* VISI SECTION */}
                                    <div className='relative'>
                                        {/* Decorative Header */}
                                        <div className="flex flex-col items-center mb-10">
                                            <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full border border-neon-gold/30 bg-neon-gold/5 mb-6">
                                                <div className='w-2 h-2 rounded-full bg-neon-gold animate-pulse' />
                                                <span className="text-neon-gold text-xs font-bold tracking-[0.4em] uppercase">Visi Utama</span>
                                                <div className='w-2 h-2 rounded-full bg-neon-gold animate-pulse' />
                                            </div>
                                        </div>

                                        <div className="relative overflow-hidden rounded-[3rem] bg-navy-light/10 border border-white/10 p-12 md:p-24 text-center group">
                                            {/* Holographic BG */}
                                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
                                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50 pointer-events-none"></div>

                                            {/* Corner Accents */}
                                            <div className="absolute top-10 left-10 w-8 h-8 border-l-2 border-t-2 border-neon-gold/50"></div>
                                            <div className="absolute top-10 right-10 w-8 h-8 border-r-2 border-t-2 border-neon-gold/50"></div>
                                            <div className="absolute bottom-10 left-10 w-8 h-8 border-l-2 border-b-2 border-neon-gold/50"></div>
                                            <div className="absolute bottom-10 right-10 w-8 h-8 border-r-2 border-b-2 border-neon-gold/50"></div>

                                            <div className="relative z-10">
                                                <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-white leading-tight max-w-5xl mx-auto font-heading tracking-tight drop-shadow-2xl">
                                                    "Menjadikan OSIS sebagai pusat inspirasi yang <span className="text-white border-b border-neon-gold/50 pb-1">Inklusif</span>, <span className="text-white border-b border-neon-gold/50 pb-1">Kreatif</span>, berlandaskan <span className="text-white font-bold">IMTAQ & IPTEK</span>."
                                                </h2>
                                            </div>
                                        </div>
                                    </div>

                                    {/* MISI SECTION */}
                                    <div className="space-y-12">
                                        <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-4">
                                            <LayoutGrid className="text-neon-gold" size={24} />
                                            <h2 className="text-2xl font-bold text-white uppercase tracking-[0.2em] font-heading">Misi Strategis</h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {[
                                                { title: "Keimanan & Ketaqwaan", desc: "Meningkatkan kualitas keimanan dan ketaqwaan kepada Tuhan YME.", icon: Shield },
                                                { title: "Minat & Bakat", desc: "Memfasilitasi pengembangan potensi siswa melalui kegiatan yang positif.", icon: Target },
                                                { title: "Sinergi Solid", desc: "Membangun kolaborasi harmonis antara siswa, guru, dan sekolah.", icon: Users },
                                                { title: "Lingkungan Kondusif", desc: "Mewujudkan sekolah yang disiplin, bersih, aman, dan nyaman.", icon: Briefcase }
                                            ].map((item, i) => (
                                                <div key={i} className="group relative p-10 rounded-[2rem] bg-navy-light/10 border border-white/5 hover:border-neon-gold/30 hover:bg-navy-light/30 transition-all duration-500 overflow-hidden">
                                                    {/* Hover Glow */}
                                                    <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-neon-gold/5 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                                    <div className="flex flex-col items-start h-full relative z-10">
                                                        <div className="flex justify-between w-full items-start mb-8">
                                                            <div className="p-4 rounded-2xl bg-deep-navy border border-white/10 text-neon-gold group-hover:scale-110 group-hover:border-neon-gold/50 transition-all duration-500 shadow-lg">
                                                                <item.icon size={28} />
                                                            </div>
                                                            <span className="text-5xl font-bold text-white/5 font-heading group-hover:text-neon-gold/10 transition-colors">0{i + 1}</span>
                                                        </div>

                                                        <h3 className="text-2xl font-bold text-white mb-4 tracking-wide">{item.title}</h3>
                                                        <p className="text-slate-400 text-base leading-relaxed mb-6 font-light">{item.desc}</p>

                                                        <div className="mt-auto w-full">
                                                            <div className="h-px w-full bg-white/5 group-hover:bg-neon-gold/30 transition-colors" />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </SectionWrapper>
                        </motion.div>
                    )}

                    {/* SECTION 3: STRUKTUR */}
                    {activeTab === 'struktur' && (
                        <motion.div
                            key="struktur"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* BPH TREE CHART */}
                            <div className="mb-32 relative">
                                <SectionWrapper>
                                    <div className="text-center mb-16">
                                        <h2 className="text-3xl font-bold text-white uppercase tracking-widest">Badan Pengurus Harian</h2>
                                    </div>
                                </SectionWrapper>

                                {/* CENTER LINE (Main Trunk) */}
                                <div className="absolute left-1/2 top-24 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />

                                {/* LEVEL 1: KETUA */}
                                <div className="flex justify-center mb-8 relative z-10">
                                    <SectionWrapper delay={0.1}>
                                        <div className="flex flex-col items-center">
                                            <div className="text-xs font-bold text-neon-gold uppercase tracking-widest mb-2 bg-deep-navy px-3 py-1 rounded-full border border-white/10">Ketua Umum</div>
                                            <TeamCard member={bph1} isLarge onClick={setSelectedMember} />
                                        </div>
                                    </SectionWrapper>
                                </div>

                                {/* Connector Line 1 */}
                                <div className="h-12 w-px bg-white/10 mx-auto hidden md:block" />

                                {/* LEVEL 2: WAKIL */}
                                <div className="flex justify-center mb-12 relative z-10">
                                    <SectionWrapper delay={0.2}>
                                        <div className="flex flex-col items-center">
                                            <div className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2 bg-deep-navy px-3 py-1 rounded-full border border-white/10">Wakil Ketua</div>
                                            <TeamCard member={bph2} isLarge onClick={setSelectedMember} />
                                        </div>
                                    </SectionWrapper>
                                </div>

                                {/* Horizontal Branching Line for Sek/Ben */}
                                <div className="max-w-3xl mx-auto h-px bg-white/10 mb-12 hidden md:block relative">
                                    <div className="absolute left-0 top-0 w-px h-12 bg-white/10" />
                                    <div className="absolute right-0 top-0 w-px h-12 bg-white/10" />
                                </div>

                                {/* LEVEL 3: SEKRETARIS & BENDAHARA */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto relative z-10">
                                    {/* SEKRETARIS GROUP */}
                                    <div className="bg-navy-light/10 border border-white/5 rounded-3xl p-6 relative group hover:border-white/10 transition-colors">
                                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 bg-deep-navy text-center border border-white/10 rounded-full py-1 hidden md:block z-20">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sekretaris</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 pt-4">
                                            {secretaries.map((m, idx) => (
                                                <SectionWrapper key={m.id} delay={0.3 + idx * 0.1}>
                                                    <TeamCard member={m} onClick={setSelectedMember} />
                                                </SectionWrapper>
                                            ))}
                                        </div>
                                    </div>

                                    {/* BENDAHARA GROUP */}
                                    <div className="bg-navy-light/10 border border-white/5 rounded-3xl p-6 relative group hover:border-white/10 transition-colors">
                                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 bg-deep-navy text-center border border-white/10 rounded-full py-1 hidden md:block z-20">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Bendahara</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 pt-4">
                                            {treasurers.map((m, idx) => (
                                                <SectionWrapper key={m.id} delay={0.3 + idx * 0.1}>
                                                    <TeamCard member={m} onClick={setSelectedMember} />
                                                </SectionWrapper>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* DIVISIONS SECTIONS */}
                            <div className="space-y-20 max-w-6xl mx-auto">
                                <SectionWrapper>
                                    <div className="flex items-center justify-center gap-4 mb-8">
                                        <div className="w-16 h-1 bg-gradient-to-r from-transparent to-white/20" />
                                        <h2 className="text-2xl font-bold text-white uppercase tracking-widest">Daftar Divisi</h2>
                                        <div className="w-16 h-1 bg-gradient-to-l from-transparent to-white/20" />
                                    </div>
                                </SectionWrapper>

                                {divisions.map((div, idx) => (
                                    <SectionWrapper key={idx} delay={0.1}>
                                        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-navy-light/20 transition-colors">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-white/5 pb-6">
                                                <div>
                                                    <h3 className={`text-2xl font-bold ${div.color} mb-2`}>{div.name}</h3>
                                                    <p className="text-slate-400 text-sm max-w-xl">{div.desc}</p>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {div.programs.map((prog, p) => (
                                                        <span key={p} className="px-3 py-1 bg-deep-navy rounded-full text-[10px] uppercase font-bold text-slate-300 border border-white/10 shadow-sm">
                                                            {prog}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                                {div.members.map((m, mIdx) => (
                                                    <TeamCard key={mIdx} member={m} onClick={setSelectedMember} />
                                                ))}
                                            </div>
                                        </div>
                                    </SectionWrapper>
                                ))}
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>

            {/* MEMBER MODAL */}
            <AnimatePresence>
                {selectedMember && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedMember(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-deep-navy/90 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-navy-light border border-white/10 rounded-2xl p-8 max-w-sm w-full relative shadow-2xl"
                        >
                            <button
                                onClick={() => setSelectedMember(null)}
                                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="text-center">
                                <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold shadow-lg overflow-hidden
                                    ${selectedMember.photo ? 'bg-deep-navy border-2 border-white/10' : 'bg-slate-200 border-2 border-neon-gold/50 text-slate-800'}
                                `}>
                                    {selectedMember.photo ? (
                                        <OptimizedImage
                                            src={getImageUrl(selectedMember.photo)}
                                            alt={selectedMember.name}
                                            className="w-full h-full rounded-full"
                                        />
                                    ) : (
                                        <span className="font-heading tracking-wider">{getInitials(selectedMember.name)}</span>
                                    )}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-1">{selectedMember.name}</h3>
                                <p className="text-neon-gold text-sm font-bold uppercase tracking-widest mb-8">{selectedMember.position}</p>

                                {selectedMember.quote && (
                                    <p className="text-slate-300 italic mb-6">"{selectedMember.quote}"</p>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
