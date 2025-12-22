"use client";

import React, { useState, useRef, useEffect } from 'react';
import { SectionWrapper } from '../../components/ui/SectionWrapper';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { Send, Lock, CheckCircle, User, MessageSquare, ThumbsUp, Filter, MousePointer2, Loader2 } from 'lucide-react';
import api from '../../services/api';
import { DUMMY_ASPIRATIONS } from '../../data/aspirationsData';

const TOPICS = ["Semua"];

export default function SuggestionPage() {
    const [submitted, setSubmitted] = useState(false);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [activeFilter, setActiveFilter] = useState("Semua");
    const [likedPosts, setLikedPosts] = useState([]);
    const [aspirations, setAspirations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form state
    const [formData, setFormData] = useState({ sender: '', message: '' });

    // DRAG & MARQUEE STATE
    const [isDragging, setIsDragging] = useState(false);
    const speed = 1.0;
    const x = useMotionValue(0);
    const containerRef = useRef(null);
    const [contentWidth, setContentWidth] = useState(0);

    // Fetch aspirations from API
    useEffect(() => {
        fetchAspirations();
    }, []);

    const fetchAspirations = async () => {
        try {
            const data = await api.get('/aspirations');
            // Only show public aspirations (not private)
            const publicAspirations = data.filter(a => !a.isPrivate);
            // Use dummy data if API returns empty
            setAspirations(publicAspirations.length > 0 ? publicAspirations : DUMMY_ASPIRATIONS);
        } catch (error) {
            console.error('Failed to fetch aspirations:', error);
            // Fallback to dummy data on error
            setAspirations(DUMMY_ASPIRATIONS);
        } finally {
            setLoading(false);
        }
    };

    const filteredAspirations = aspirations;

    // SMART RENDER LOGIC
    // If data is small (< 5), don't loop/marquee, just show grid to avoid redundancy.
    // If data is large (>= 5), enable marquee.
    const isMarqueeMode = filteredAspirations.length >= 5;

    // Duplication for loop (3 sets is usually safe for overflow)
    const marqueeContent = isMarqueeMode
        ? [...filteredAspirations, ...filteredAspirations, ...filteredAspirations]
        : filteredAspirations;

    useEffect(() => {
        if (isMarqueeMode && containerRef.current) {
            setContentWidth(containerRef.current.scrollWidth);
        }
    }, [filteredAspirations, isMarqueeMode]);

    useAnimationFrame(() => {
        if (isMarqueeMode && !isDragging && contentWidth > 0) {
            let newX = x.get() - speed;
            // Seamless Loop Logic: Reset after 1/3 width (1 set)
            const oneSetWidth = contentWidth / 3;
            if (newX <= -oneSetWidth) {
                newX += oneSetWidth;
            } else if (newX > 0) {
                newX -= oneSetWidth;
            }
            x.set(newX);
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await api.post('/aspirations', {
                sender: isAnonymous ? null : formData.sender,
                message: formData.message
            });
            setSubmitted(true);
            setFormData({ sender: '', message: '' });
            fetchAspirations(); // Refresh the list
        } catch (error) {
            alert('Gagal mengirim aspirasi: ' + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const toggleLike = (id) => {
        if (likedPosts.includes(id)) {
            setLikedPosts(likedPosts.filter(postId => postId !== id));
        } else {
            setLikedPosts([...likedPosts, id]);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 container mx-auto text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-navy-light/80 backdrop-blur-xl border border-neon-gold/20 p-12 rounded-[2rem] max-w-lg w-full shadow-[0_0_50px_rgba(255,215,0,0.1)]"
                >
                    <div className="w-24 h-24 bg-gradient-to-tr from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-500/20">
                        <CheckCircle size={48} className="text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Aspirasi Terkirim!</h2>
                    <p className="text-slate-300 mb-8 text-lg">
                        Terima kasih telah berkontribusi.
                    </p>
                    <button
                        onClick={() => setSubmitted(false)}
                        className="px-10 py-4 bg-gradient-to-r from-neon-gold to-orange-500 text-deep-navy font-bold rounded-xl hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all"
                    >
                        Kirim Lagi
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col pt-24 pb-12 overflow-x-hidden">

            {/* HERO & FORM SECTION */}
            <div className="container mx-auto px-4 content-center z-10 mb-8">
                <div className="max-w-3xl mx-auto">
                    <SectionWrapper>
                        <div className="text-center mb-6">
                            <h1 className="text-4xl md:text-5xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-4">
                                Kotak Aspirasi
                            </h1>
                            <p className="text-slate-400">
                                Sampaikan ide dan saran Anda. Suara Anda didengar.
                            </p>
                        </div>

                        <div className="bg-navy-light/40 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                            <form onSubmit={handleSubmit} className="relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                        <Send className="text-neon-gold" size={20} /> Form Aspirasi
                                    </h2>
                                    <div
                                        onClick={() => setIsAnonymous(!isAnonymous)}
                                        className={`cursor-pointer px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${isAnonymous ? 'bg-slate-700 border-slate-600 text-slate-300' : 'bg-blue-500/10 border-blue-500/30 text-blue-400'}`}
                                    >
                                        {isAnonymous ? <Lock size={12} /> : <User size={12} />}
                                        {isAnonymous ? 'Anonim' : 'Publik'}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <motion.div
                                        animate={{ opacity: isAnonymous ? 0.5 : 1 }}
                                        className="space-y-2"
                                    >
                                        <label className="text-xs font-bold text-slate-400 uppercase ml-1">Identitas</label>
                                        <input
                                            type="text"
                                            required={!isAnonymous}
                                            disabled={isAnonymous}
                                            value={isAnonymous ? '' : formData.sender}
                                            onChange={e => setFormData({ ...formData, sender: e.target.value })}
                                            placeholder={isAnonymous ? "Identitas Disembunyikan" : "Nama / Kelas"}
                                            className="w-full bg-deep-navy/80 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-gold transition-all"
                                        />
                                    </motion.div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase ml-1">Pesan Aspirasi</label>
                                        <textarea
                                            required
                                            rows={2}
                                            value={formData.message}
                                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                                            placeholder="Tulis aspirasi Anda di sini..."
                                            className="w-full bg-deep-navy/80 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-gold resize-none"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full py-3 bg-gradient-to-r from-neon-gold to-orange-500 rounded-xl text-deep-navy font-bold text-lg hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {submitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Mengirim...</> : 'Kirim'}
                                </button>
                            </form>
                        </div>
                    </SectionWrapper>
                </div>
            </div>

            {/* FEED SECTION */}
            <div className="relative w-full py-8 text-center px-4">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center justify-center gap-2">
                    <MessageSquare className="text-blue-400" /> Dinding Aspirasi
                </h2>

                <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {TOPICS.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => {
                                setActiveFilter(filter);
                                x.set(0);
                            }}
                            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all border ${activeFilter === filter
                                ? 'bg-white text-deep-navy border-white shadow-lg'
                                : 'bg-transparent text-slate-400 border-white/10 hover:border-white/30 hover:text-white'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {isMarqueeMode && (
                    <div className="flex items-center justify-center gap-2 text-slate-500 text-xs animate-pulse mb-6">
                        <MousePointer2 size={12} />
                        <span>Geser untuk mencari</span>
                    </div>
                )}

                {/* CONDITIONAL RENDERING: GRID vs MARQUEE */}
                {isMarqueeMode ? (
                    /* >= 5 Items: Infinite Draggable Marquee */
                    <div className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing border-y border-white/5 bg-navy-light/10">
                        <motion.div
                            ref={containerRef}
                            style={{ x }}
                            className="flex gap-6 px-6 py-8 w-max"
                            drag="x"
                            dragConstraints={{ left: -10000, right: 10000 }}
                            onDragStart={() => setIsDragging(true)}
                            onDragEnd={() => setIsDragging(false)}
                        >
                            {marqueeContent.map((item, index) => (
                                <AspirationCard key={`${item.id}-${index}`} item={item} toggleLike={toggleLike} likedPosts={likedPosts} />
                            ))}
                        </motion.div>
                    </div>
                ) : (
                    /* < 5 Items: Static Centered Layout */
                    <div className="container mx-auto max-w-7xl px-4">
                        {filteredAspirations.length > 0 ? (
                            <motion.div
                                className="flex flex-wrap justify-center gap-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                {filteredAspirations.map((item) => (
                                    <AspirationCard key={item.id} item={item} toggleLike={toggleLike} likedPosts={likedPosts} />
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="py-12 border border-dashed border-white/10 rounded-2xl bg-white/5"
                            >
                                <p className="text-slate-400 font-medium">Belum ada aspirasi di kategori ini.</p>
                            </motion.div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// Sub-component for Cleaner Code
function AspirationCard({ item, toggleLike, likedPosts }) {
    // Helper to format date
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        const now = new Date();
        const diff = now - date;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (hours < 1) return 'Baru saja';
        if (hours < 24) return `${hours} jam yang lalu`;
        if (days < 7) return `${days} hari yang lalu`;
        return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const senderName = item.sender || 'Anonim';
    const isAnon = !item.sender || item.sender === 'Anonymous';

    return (
        <div className="w-[350px] flex-shrink-0 bg-navy-light/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl hover:bg-navy-light/60 hover:border-white/20 transition-all group hover:scale-[1.02] select-none text-left h-full flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${isAnon
                            ? 'bg-slate-700 text-slate-400'
                            : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
                            }`}>
                            {isAnon ? <User size={18} /> : senderName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-sm truncate max-w-[150px]">
                                {senderName}
                            </h4>
                            <p className="text-slate-500 text-[10px]">{formatDate(item.createdAt)}</p>
                        </div>
                    </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3 min-h-[60px]">
                    "{item.message}"
                </p>
            </div>

            <div className="flex items-center justify-end pt-4 border-t border-white/5 mt-auto">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(item.id);
                    }}
                    className={`flex items-center gap-1 text-xs font-bold transition-colors z-10 ${likedPosts.includes(item.id) ? 'text-pink-500' : 'text-slate-500 hover:text-pink-400'
                        }`}
                >
                    <ThumbsUp size={12} className={likedPosts.includes(item.id) ? 'fill-current' : ''} />
                    {likedPosts.includes(item.id) ? 1 : 0}
                </button>
            </div>
        </div>
    );
}
