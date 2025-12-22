"use client";

import React, { useState, useEffect } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { GlowingButton } from '../ui/GlowingButton';
import { Trash2, Calendar as CalIcon } from 'lucide-react';
import api from '../../services/api';

export default function CalendarManager() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ title: '', date: '', description: '' });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const data = await api.get('/calendar');
            // Sort by date
            const sorted = data.sort((a, b) => new Date(a.date) - new Date(b.date));
            setEvents(sorted);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/calendar', formData);
            setFormData({ title: '', date: '', description: '' });
            fetchEvents();
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this event?')) return;
        try {
            await api.delete(`/calendar/${id}`);
            fetchEvents();
        } catch (error) {
            alert('Error deleting: ' + error.message);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <GlassCard className="p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Add Schedule</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs text-slate-400 mb-1">Event Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full bg-navy-lighter/50 border border-white/10 rounded p-2 text-white"
                                placeholder="e.g. Rapat Bulanan OSIS"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-slate-400 mb-1">Date</label>
                            <input
                                type="date"
                                value={formData.date}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                                className="w-full bg-navy-lighter/50 border border-white/10 rounded p-2 text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-slate-400 mb-1">Description (optional)</label>
                            <textarea
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-navy-lighter/50 border border-white/10 rounded p-2 text-white resize-none h-20"
                                placeholder="Brief description of the event..."
                            />
                        </div>
                        <GlowingButton type="submit" className="w-full">
                            Add to Timeline
                        </GlowingButton>
                    </form>

                    {/* Live Preview Card */}
                    <div className="pt-6 border-t border-white/5 mt-6">
                        <label className="block text-xs text-slate-400 mb-2">Live Preview</label>
                        <div className="flex gap-4 items-center opacity-75">
                            <div className="flex flex-col items-center">
                                <div className="w-2 h-2 rounded-full bg-neon-gold"></div>
                            </div>
                            <div className="flex-1 p-4 flex justify-between items-center group bg-navy-light/40 border border-white/10 rounded-xl">
                                <div>
                                    <h4 className="text-white font-medium">{formData.title || 'Event Title'}</h4>
                                    <p className="text-sm text-slate-400 flex items-center gap-2">
                                        <CalIcon className="w-3 h-3" />
                                        {formData.date ? new Date(formData.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : 'Date will appear here'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">Upcoming Events</h3>
                {loading ? <p className="text-white">Loading...</p> :
                    events.length === 0 ? <p className="text-slate-500">No events scheduled.</p> :
                        events.map((event, index) => (
                            <div key={event.id} className="flex gap-4 items-center">
                                <div className="flex flex-col items-center">
                                    <div className="w-2 h-2 rounded-full bg-neon-gold"></div>
                                    {index !== events.length - 1 && <div className="w-0.5 h-full bg-white/10 my-1"></div>}
                                </div>
                                <GlassCard className="flex-1 p-4 flex justify-between items-center group">
                                    <div>
                                        <h4 className="text-white font-medium">{event.title}</h4>
                                        <p className="text-sm text-slate-400 flex items-center gap-2">
                                            <CalIcon className="w-3 h-3" />
                                            {new Date(event.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(event.id)}
                                        className="p-2 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </GlassCard>
                            </div>
                        ))}
            </div>
        </div>
    );
}
