"use client";

import React, { useState, useEffect } from 'react';
import { SectionWrapper } from '../../components/ui/SectionWrapper';
import { Calendar, User, ArrowRight, Loader2, Newspaper } from 'lucide-react';
import Link from 'next/link';
import api, { getImageUrl } from '../../services/api';
import OptimizedImage from '../../components/ui/OptimizedImage';
import { DUMMY_NEWS } from '../../data/newsData';

export default function NewsPage() {
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await api.get('/news');
                // Use dummy data if API returns empty
                setNewsItems(data && data.length > 0 ? data : DUMMY_NEWS);
            } catch (error) {
                console.error('Failed to fetch news:', error);
                // Fallback to dummy data on error
                setNewsItems(DUMMY_NEWS);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    // Helper to format date
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    // Get featured (first) and rest
    const featuredNews = newsItems[0];
    const restNews = newsItems.slice(1);

    return (
        <div className="min-h-screen container mx-auto px-6 py-24">
            <SectionWrapper>
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-bold font-heading text-white mb-4">Berita Terkini</h1>
                        <p className="text-slate-400">Update informasi resmi seputar sekolah dan kegiatan siswa.</p>
                    </div>
                </div>
            </SectionWrapper>

            {loading ? (
                <div className="flex items-center justify-center py-24">
                    <Loader2 className="w-12 h-12 text-neon-gold animate-spin" />
                </div>
            ) : newsItems.length === 0 ? (
                <div className="text-center py-24 border border-dashed border-white/10 rounded-xl">
                    <Newspaper className="w-16 h-16 mx-auto mb-4 text-slate-600" />
                    <p className="text-slate-500">Belum ada berita yang tersedia.</p>
                </div>
            ) : (
                <>
                    {/* Featured News */}
                    {featuredNews && (
                        <SectionWrapper delay={0.1}>
                            <Link href={`/news/${featuredNews.id}`}>
                                <div className="relative rounded-3xl overflow-hidden bg-navy-light border border-white/5 aspect-[16/7] mb-12 group cursor-pointer">
                                    {/* Background Image */}
                                    {featuredNews.image && (
                                        <div className="absolute inset-0 z-0">
                                            <OptimizedImage
                                                src={getImageUrl(featuredNews.image)}
                                                alt={featuredNews.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/70 to-transparent z-10" />

                                    <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20 max-w-3xl">
                                        <span className="bg-neon-gold text-deep-navy px-3 py-1 rounded text-xs font-bold uppercase mb-4 inline-block">Featured</span>
                                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                                            {featuredNews.title}
                                        </h2>
                                        <div className="flex items-center gap-6 text-slate-300 text-sm">
                                            <span className="flex items-center gap-2"><Calendar size={14} /> {formatDate(featuredNews.createdAt)}</span>
                                            <span className="flex items-center gap-2"><User size={14} /> Admin OSIS</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </SectionWrapper>
                    )}

                    {/* News Grid */}
                    {restNews.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {restNews.map((item, idx) => (
                                <SectionWrapper key={item.id} delay={0.2 + idx * 0.1}>
                                    <Link href={`/news/${item.id}`}>
                                        <div className="group bg-navy-light/30 border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all hover:-translate-y-1 cursor-pointer">
                                            {/* Image */}
                                            {item.image && (
                                                <div className="aspect-video overflow-hidden">
                                                    <OptimizedImage
                                                        src={getImageUrl(item.image)}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                            )}
                                            <div className="p-6">
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="text-xs font-bold text-neon-gold uppercase tracking-wider">Berita</span>
                                                    <span className="text-xs text-slate-500">{formatDate(item.createdAt)}</span>
                                                </div>
                                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                                                    {item.title}
                                                </h3>
                                                <p className="text-slate-400 text-sm mb-6 line-clamp-3">
                                                    {item.content}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </SectionWrapper>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
