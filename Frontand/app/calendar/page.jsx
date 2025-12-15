"use client";

import React, { useState } from 'react';
import { SectionWrapper } from '../../components/ui/SectionWrapper';
import { GlassCard } from '../../components/ui/GlassCard';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { getWeeksInMonth } from '../../utils/calendarUtils';

const events = [
    { id: 1, title: 'Rapat Pleno OSIS', date: '2025-12-20', time: '13:00', loc: 'Ruang OSIS', type: 'internal' },
    { id: 2, title: 'Classmeeting Hari 1', date: '2025-12-15', time: '07:30', loc: 'Lapangan', type: 'public' },
    { id: 3, title: 'Classmeeting Hari 2', date: '2025-12-16', time: '07:30', loc: 'Lapangan', type: 'public' },
    { id: 4, title: 'Libur Semester', date: '2025-12-25', time: '-', loc: '-', type: 'holiday' },
];

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 1)); // Dec 2025

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // 0-11
    const weeks = getWeeksInMonth(year, month);
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

    const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    const checkEvent = (day) => {
        if (!day) return null;
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return events.filter(e => e.date === dateStr);
    };

    return (
        <div className="min-h-screen container mx-auto px-6 py-24">

            <SectionWrapper>
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">Agenda Kegiatan</h1>
                    <p className="text-slate-400">Jadwal resmi kegiatan akademik dan organisasi.</p>
                </div>
            </SectionWrapper>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* CALENDAR WIDGET */}
                <div className="lg:col-span-2">
                    <SectionWrapper delay={0.1}>
                        <GlassCard className="p-8">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                    <CalendarIcon className="text-neon-gold" />
                                    {monthNames[month]} {year}
                                </h2>
                                <div className="flex gap-2">
                                    <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-white/10 text-white transition-colors">
                                        <ChevronLeft />
                                    </button>
                                    <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-white/10 text-white transition-colors">
                                        <ChevronRight />
                                    </button>
                                </div>
                            </div>

                            {/* Grid */}
                            <div className="grid grid-cols-7 gap-2 mb-4 text-center">
                                {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(d => (
                                    <div key={d} className="text-slate-500 text-sm font-bold uppercase tracking-wider py-2">
                                        {d}
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 gap-2">
                                {weeks.map((week, wIdx) => (
                                    <React.Fragment key={wIdx}>
                                        {week.map((day, dIdx) => {
                                            const dayEvents = checkEvent(day);
                                            const hasEvent = dayEvents && dayEvents.length > 0;

                                            return (
                                                <div
                                                    key={dIdx}
                                                    className={`
                                                        aspect-square rounded-xl flex flex-col items-center justify-center relative border transition-all cursor-pointer
                                                        ${!day ? 'border-transparent opacity-0 pointer-events-none' : 'bg-navy-light/50 border-white/5 hover:border-neon-gold/50 hover:bg-white/5'}
                                                        ${hasEvent ? 'border-neon-gold/30 bg-neon-gold/5' : ''}
                                                    `}
                                                >
                                                    {day && (
                                                        <>
                                                            <span className={`text-lg font-bold ${hasEvent ? 'text-neon-gold' : 'text-slate-400'}`}>
                                                                {day}
                                                            </span>
                                                            {hasEvent && (
                                                                <div className="flex gap-1 mt-1">
                                                                    {dayEvents.map((ev, i) => (
                                                                        <div key={i} className={`w-1.5 h-1.5 rounded-full ${ev.type === 'internal' ? 'bg-blue-500' : 'bg-neon-gold'}`} />
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </React.Fragment>
                                ))}
                            </div>
                        </GlassCard>
                    </SectionWrapper>
                </div>

                {/* UPCOMING EVENTS LIST */}
                <div className="lg:col-span-1">
                    <SectionWrapper delay={0.2}>
                        <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest border-l-4 border-neon-gold pl-4">
                            Bulan Ini
                        </h3>
                        {events.length > 0 ? (
                            <div className="space-y-4">
                                {events.map((ev, idx) => (
                                    <div key={idx} className="bg-navy-light/30 border border-white/5 p-4 rounded-xl flex gap-4 hover:border-white/20 transition-all group">
                                        <div className="flex flex-col items-center justify-center p-3 bg-deep-navy rounded-lg border border-white/10 min-w-[70px]">
                                            <span className="text-xs text-slate-500 uppercase font-bold">{monthNames[new Date(ev.date).getMonth()].substring(0, 3)}</span>
                                            <span className="text-2xl font-bold text-white">{new Date(ev.date).getDate()}</span>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold mb-1 group-hover:text-neon-gold transition-colors">{ev.title}</h4>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                                    <Clock size={12} /> {ev.time}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                                    <MapPin size={12} /> {ev.loc}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center border border-dashed border-white/10 rounded-xl">
                                <p className="text-slate-500">Tidak ada agenda bulan ini.</p>
                            </div>
                        )}
                    </SectionWrapper>
                </div>

            </div>
        </div>
    );
}
