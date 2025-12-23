"use client";

import React, { useState, useEffect } from 'react';
import { SectionWrapper } from '../../components/ui/SectionWrapper';
import { GlassCard } from '../../components/ui/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronLeft, ArrowRight, Target, Users, Heart, Crown, Loader2, Briefcase, BookOpen } from 'lucide-react';
import api, { getImageUrl } from '../../services/api';
import OptimizedImage from '../../components/ui/OptimizedImage';
import { DUMMY_PROGRAMS } from '../../data/programsData';

// Division icon and color mapping
const DIVISION_CONFIG = {
    'BPH (Inti)': { color: 'text-purple-500', icon: <Crown size={40} /> },
    'Olahraga & Kesehatan': { color: 'text-orange-500', icon: <Target size={40} /> },
    'Kewirausahaan': { color: 'text-yellow-500', icon: <Briefcase size={40} /> },
    'TIK & Literasi Digital': { color: 'text-blue-500', icon: <BookOpen size={40} /> },
    'Ketaqwaan': { color: 'text-green-500', icon: <Heart size={40} /> },
    'Sekbid Umum': { color: 'text-slate-400', icon: <Users size={40} /> },
};

export default function ProgramPage() {
    const [view, setView] = useState('divisions');
    const [selectedDivision, setSelectedDivision] = useState(null);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const data = await api.get('/programs');
                // Use dummy data if API returns empty
                setPrograms(data && data.length > 0 ? data : DUMMY_PROGRAMS);
            } catch (error) {
                console.error('Failed to fetch programs:', error);
                // Fallback to dummy data on error
                setPrograms(DUMMY_PROGRAMS);
            } finally {
                setLoading(false);
            }
        };
        fetchPrograms();
    }, []);

    // Group programs by division
    const groupedPrograms = programs.reduce((acc, prog) => {
        const div = prog.division || 'Sekbid Umum';
        if (!acc[div]) {
            acc[div] = {
                id: div.toLowerCase().replace(/\s+/g, '-'),
                division: div,
                items: [],
                ...DIVISION_CONFIG[div] || DIVISION_CONFIG['Sekbid Umum']
            };
        }
        acc[div].items.push(prog);
        return acc;
    }, {});

    const allDivisions = Object.values(groupedPrograms);

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

    // Status mapping
    const getStatusStyle = (status) => {
        switch (status?.toUpperCase()) {
            case 'DONE':
            case 'TERLAKSANA':
                return 'border-green-500/30 text-green-500 bg-green-500/10';
            case 'IN_PROGRESS':
            case 'BERJALAN':
                return 'border-blue-400/30 text-blue-400 bg-blue-400/10';
            default:
                return 'border-slate-500/30 text-slate-500 bg-slate-500/10';
        }
    };

    const getStatusLabel = (status) => {
        switch (status?.toUpperCase()) {
            case 'DONE': return 'Terlaksana';
            case 'IN_PROGRESS': return 'Berjalan';
            case 'PLANNED': return 'Direncanakan';
            default: return status || 'Direncanakan';
        }
    };

    return (
        <div className="min-h-screen container mx-auto px-6 py-24 pb-32">
            <SectionWrapper>
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold font-heading text-white mb-6">Program Kerja</h1>
                    <p className="text-slate-400 text-lg">Transparansi kegiatan dan agenda OSIS Al-Manar.</p>
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
                            onClick={view === 'detail' ? handleBackToList : handleBackToDivisions}
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
                            {selectedProgram.title}
                        </span>
                    </>
                )}
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-24">
                    <Loader2 className="w-12 h-12 text-neon-gold animate-spin" />
                </div>
            ) : programs.length === 0 ? (
                <div className="text-center py-24 border border-dashed border-white/10 rounded-xl">
                    <Target className="w-16 h-16 mx-auto mb-4 text-slate-600" />
                    <p className="text-slate-500">Belum ada program kerja yang tersedia.</p>
                </div>
            ) : (
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
                            {allDivisions.map((div, i) => (
                                <SectionWrapper key={div.id} delay={i * 0.1}>
                                    <div
                                        onClick={() => handleDivisionClick(div)}
                                        className="group cursor-pointer relative h-full bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.05] rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2"
                                    >
                                        <div className={`mb-6 p-4 rounded-2xl inline-block bg-white/5 ${div.color} group-hover:scale-110 transition-transform duration-300`}>
                                            {div.icon}
                                        </div>
                                        <h2 className={`text-2xl font-bold mb-4 text-white group-hover:${div.color} transition-colors`}>{div.division}</h2>
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
                                            {/* Program Image */}
                                            <div className="w-full h-40 mb-4 bg-black/20 rounded-xl overflow-hidden flex items-center justify-center border border-white/5 group-hover:border-white/10 transition-colors">
                                                {prog.image ? (
                                                    <OptimizedImage src={getImageUrl(prog.image)} alt={prog.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="text-slate-600 flex flex-col items-center">
                                                        <Target size={32} className="mb-2 opacity-50" />
                                                        <span className="text-xs uppercase tracking-widest font-bold">No Image</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex justify-between items-start mb-4">
                                                <span className={`text-xs px-2 py-1 rounded border ${getStatusStyle(prog.status)}`}>
                                                    {getStatusLabel(prog.status)}
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-gold transition-colors">{prog.title}</h3>
                                            <p className="text-slate-400 text-sm line-clamp-2 mb-6">{prog.description}</p>

                                            {prog.pic && (
                                                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                                                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">
                                                        {prog.pic.charAt(0)}
                                                    </div>
                                                    <div className="text-xs">
                                                        <div className="text-white font-medium">{prog.pic}</div>
                                                        <div className="text-slate-500">Penanggung Jawab</div>
                                                    </div>
                                                </div>
                                            )}
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
                                <div className={`absolute top-0 left-0 right-0 h-2 ${getStatusStyle(selectedProgram.status).includes('green') ? 'bg-gradient-to-r from-green-500 to-emerald-400' : getStatusStyle(selectedProgram.status).includes('blue') ? 'bg-gradient-to-r from-blue-500 to-indigo-400' : 'bg-gradient-to-r from-slate-500 to-gray-400'}`} />

                                {/* Large Program Image Banner */}
                                <div className="w-full h-64 md:h-80 bg-black/40 relative group overflow-hidden">
                                    {selectedProgram.image ? (
                                        <OptimizedImage src={getImageUrl(selectedProgram.image)} alt={selectedProgram.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
                                            <Target size={64} className="mb-4 opacity-20" />
                                            <span className="text-sm uppercase tracking-widest font-bold opacity-50">Image Placeholder</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/50 to-transparent" />

                                    <div className="absolute bottom-0 left-0 p-8 w-full">
                                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">{selectedProgram.title}</h2>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-sm px-3 py-1.5 rounded-full border font-medium bg-black/30 backdrop-blur-md ${getStatusStyle(selectedProgram.status)}`}>
                                                {getStatusLabel(selectedProgram.status)}
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
                                                    {selectedProgram.description || 'Tidak ada deskripsi.'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="md:col-span-1">
                                            {selectedProgram.pic && (
                                                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Penanggung Jawab (PIC)</h3>
                                                    <div className="flex flex-col items-center text-center">
                                                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border-4 border-white/10 shadow-xl mb-4 flex items-center justify-center text-3xl font-bold text-white">
                                                            {selectedProgram.pic.charAt(0).toUpperCase()}
                                                        </div>
                                                        <h4 className="text-xl font-bold text-white mb-1">{selectedProgram.pic}</h4>
                                                        <p className="text-neon-gold text-sm font-medium">Koordinator</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </div>
    );
}
