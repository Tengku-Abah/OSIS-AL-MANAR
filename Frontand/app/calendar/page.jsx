"use client";

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlowingButton } from '../../components/ui/GlowingButton';
import { Calendar as CalendarIcon, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const events = [
    // Past Events
    { title: 'Rapat Pleno OSIS', date: '2025-12-01', className: 'bg-slate-700 text-slate-300 border-none opacity-50' },
    { title: 'Persiapan Classmeet', date: '2025-12-10', className: 'bg-slate-700 text-slate-300 border-none opacity-50' },

    // Current Month
    { title: 'Class Meeting: Futsal', date: '2025-12-15', className: 'bg-holographic-teal text-deep-navy border-none' },
    { title: 'Class Meeting: E-Sport', date: '2025-12-16', className: 'bg-holographic-teal text-deep-navy border-none' },
    { title: 'Final Classmeeting', date: '2025-12-18', className: 'bg-neon-gold text-deep-navy border-none font-bold' },
    { title: 'Pembagian Raport', date: '2025-12-20', className: 'bg-red-500 text-white border-none' },

    // Holidays
    { title: 'Libur Semester Ganjil', start: '2025-12-22', end: '2026-01-05', className: 'bg-navy-light text-slate-300 border border-white/10' },

    // Next Year
    { title: 'LDKS Calon Pengurus', date: '2026-01-10', className: 'bg-blue-600 text-white border-none' },
    { title: 'Evaluasi Kinerja', date: '2026-01-15', className: 'bg-purple-600 text-white border-none' },
    { title: 'Pensi Sekolah', date: '2026-02-14', className: 'bg-pink-500 text-white border-none font-bold' },
];

export default function CalendarPage() {
    return (
        <div className="min-h-screen container mx-auto px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 flex flex-col md:flex-row justify-between items-end gap-4"
            >
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-4xl font-bold font-heading text-white">The Compass</h1>
                        <CalendarIcon className="w-8 h-8 text-neon-gold" />
                    </div>
                    <p className="text-slate-400">Jadwal kegiatan, agenda rapat, dan acara sekolah terpadu.</p>
                </div>
                <GlowingButton variant="outline" className="text-sm">
                    <Download className="w-4 h-4" /> Ekspor ke Google Calendar
                </GlowingButton>
            </motion.div>

            <GlassCard className="p-8 backdrop-blur-xl bg-navy-light/60">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek'
                    }}
                    events={events}
                    height="auto"
                    contentHeight="auto"
                />
            </GlassCard>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                    <div className="w-3 h-3 rounded-full bg-neon-gold"></div>
                    <span>Agenda Penting / Final</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                    <div className="w-3 h-3 rounded-full bg-holographic-teal"></div>
                    <span>Kegiatan Sekolah / Lomba</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span>Deadline / Akademik</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                    <span>Internal OSIS / LDKS</span>
                </div>
            </div>
        </div>
    );
}
