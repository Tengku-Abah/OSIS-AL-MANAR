"use client";

import React, { useState, useEffect } from 'react';
import { SectionWrapper } from '../../components/ui/SectionWrapper';
import { GlassCard } from '../../components/ui/GlassCard';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, Loader2 } from 'lucide-react';
import { getWeeksInMonth } from '../../utils/calendarUtils';
import api from '../../services/api';
import { DUMMY_EVENTS } from '../../data/calendarData';

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await api.get('/calendar');
                // Use dummy data if API returns empty
                setEvents(data && data.length > 0 ? data : DUMMY_EVENTS);
            } catch (error) {
                console.error('Failed to fetch events:', error);
                // Fallback to dummy data on error
                setEvents(DUMMY_EVENTS);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // 0-11
    const weeks = getWeeksInMonth(year, month);
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

    const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    const checkEvent = (day) => {
        if (!day) return null;
        return events.filter(e => {
            const eventDate = new Date(e.date);
            return eventDate.getFullYear() === year &&
                eventDate.getMonth() === month &&
                eventDate.getDate() === day;
        });
    };

    // Filter events for current month
    const currentMonthEvents = events.filter(e => {
        const eventDate = new Date(e.date);
        return eventDate.getFullYear() === year && eventDate.getMonth() === month;
    });

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
                        {loading ? (
                            <div className="p-8 text-center border border-dashed border-white/10 rounded-xl">
                                <Loader2 className="w-6 h-6 mx-auto text-neon-gold animate-spin mb-2" />
                                <p className="text-slate-500">Memuat agenda...</p>
                            </div>
                        ) : currentMonthEvents.length > 0 ? (
                            <div className="space-y-4">
                                {currentMonthEvents.map((ev, idx) => (
                                    <div key={ev.id || idx} className="bg-navy-light/30 border border-white/5 p-4 rounded-xl flex gap-4 hover:border-white/20 transition-all group">
                                        <div className="flex flex-col items-center justify-center p-3 bg-deep-navy rounded-lg border border-white/10 min-w-[70px]">
                                            <span className="text-xs text-slate-500 uppercase font-bold">{monthNames[new Date(ev.date).getMonth()].substring(0, 3)}</span>
                                            <span className="text-2xl font-bold text-white">{new Date(ev.date).getDate()}</span>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold mb-1 group-hover:text-neon-gold transition-colors">{ev.title}</h4>
                                            {ev.description && (
                                                <p className="text-xs text-slate-400 line-clamp-2">{ev.description}</p>
                                            )}
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
