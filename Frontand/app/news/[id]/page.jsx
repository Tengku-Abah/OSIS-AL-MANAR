'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import api, { getImageUrl } from '../../../services/api';
import { SectionWrapper } from '../../../components/ui/SectionWrapper';

export default function NewsDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNewsDetail();
    }, [params.id]);

    const fetchNewsDetail = async () => {
        try {
            setLoading(true);
            const data = await api.get(`/news/${params.id}`);
            setNews(data);
        } catch (err) {
            console.error('Error fetching news:', err);
            setError('Berita tidak ditemukan');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <SectionWrapper>
                <div className="min-h-screen flex items-center justify-center">
                    <Loader2 className="w-12 h-12 text-neon-gold animate-spin" />
                </div>
            </SectionWrapper>
        );
    }

    if (error || !news) {
        return (
            <SectionWrapper>
                <div className="min-h-screen flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold text-white mb-4">{error || 'Berita tidak ditemukan'}</h1>
                    <Link href="/news" className="text-neon-gold hover:underline flex items-center gap-2">
                        <ArrowLeft size={20} />
                        Kembali ke Berita
                    </Link>
                </div>
            </SectionWrapper>
        );
    }

    return (
        <SectionWrapper>
            <div className="max-w-4xl mx-auto py-8 px-4">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-6"
                >
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-slate-400 hover:text-neon-gold transition-colors group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Kembali</span>
                    </button>
                </motion.div>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 border border-white/10"
                >
                    {news.image ? (
                        <img
                            src={getImageUrl(news.image)}
                            alt={news.title}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder.svg'; }}
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-navy-light to-deep-navy flex items-center justify-center">
                            <span className="text-slate-500">No Image</span>
                        </div>
                    )}

                    {/* Category Badge */}
                    {news.category && (
                        <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-neon-gold text-deep-navy text-sm font-bold rounded-full uppercase">
                                {news.category}
                            </span>
                        </div>
                    )}
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-heading">
                        {news.title}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 text-slate-400 mb-8 pb-8 border-b border-white/10">
                        <div className="flex items-center gap-2">
                            <Calendar size={18} className="text-neon-gold" />
                            <span>{formatDate(news.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User size={18} className="text-neon-gold" />
                            <span>{news.author || 'Admin OSIS'}</span>
                        </div>
                    </div>

                    {/* Content Body */}
                    <div className="prose prose-invert prose-lg max-w-none">
                        <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                            {news.content || news.description || 'Tidak ada konten.'}
                        </div>
                    </div>
                </motion.div>

                {/* Back to News */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-12 pt-8 border-t border-white/10"
                >
                    <Link
                        href="/news"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-neon-gold/20 border border-white/10 hover:border-neon-gold/50 rounded-xl text-white transition-all group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Lihat Berita Lainnya
                    </Link>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
