"use client";

import React, { useState, useEffect } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Eye, EyeOff, MessageSquare } from 'lucide-react';
import api from '../../services/api';

export default function AspirationManager() {
    const [aspirations, setAspirations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAspirations();
    }, []);

    const fetchAspirations = async () => {
        try {
            const data = await api.get('/aspirations');
            setAspirations(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const togglePrivacy = async (id) => {
        try {
            await api.put(`/aspirations/${id}/privacy`);
            fetchAspirations();
        } catch (error) {
            alert('Error toggling privacy: ' + error.message);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-white font-bold text-xl">Student Aspirations Box</h2>
            {loading ? <p className="text-white">Loading messages...</p> :
                aspirations.length === 0 ? <p className="text-slate-500">No aspirations received yet.</p> :
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {aspirations.map(item => (
                            <GlassCard key={item.id} className={`p-6 border ${item.isPrivate ? 'border-red-500/30 bg-red-500/5' : 'border-green-500/30 bg-green-500/5'}`}>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                            <MessageSquare className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-sm">{item.authorName || 'Anonymous Student'}</h4>
                                            <p className="text-xs text-slate-400">{new Date(item.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => togglePrivacy(item.id)}
                                        className={`flex items-center gap-1 text-xs px-2 py-1 rounded border ${item.isPrivate
                                                ? 'border-red-500 text-red-400 hover:bg-red-500/10'
                                                : 'border-green-500 text-green-400 hover:bg-green-500/10'
                                            }`}
                                    >
                                        {item.isPrivate ? <><EyeOff className="w-3 h-3" /> Hidden</> : <><Eye className="w-3 h-3" /> Public</>}
                                    </button>
                                </div>
                                <p className="text-slate-300 text-sm italic">"{item.message}"</p>
                            </GlassCard>
                        ))}
                    </div>
            }
        </div>
    );
}
