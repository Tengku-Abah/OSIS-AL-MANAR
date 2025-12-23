"use client";

import React, { useState, useEffect } from 'react';
import { SectionWrapper } from '../../components/ui/SectionWrapper';
import { Image, Loader2 } from 'lucide-react';
import api, { getImageUrl } from '../../services/api';
import { DUMMY_GALLERY } from '../../data/galleryData';

export default function GalleryPage() {
    const [galleryItems, setGalleryItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const data = await api.get('/gallery');
                // Only show active items
                const activeItems = data.filter(item => item.isActive);
                // Use dummy data if API returns empty
                setGalleryItems(activeItems.length > 0 ? activeItems : DUMMY_GALLERY);
            } catch (error) {
                console.error('Failed to fetch gallery:', error);
                // Fallback to dummy data on error
                setGalleryItems(DUMMY_GALLERY);
            } finally {
                setLoading(false);
            }
        };
        fetchGallery();
    }, []);

    // Assign size based on index for visual variety
    const getSize = (index) => {
        const pattern = ['large', 'small', 'normal', 'normal', 'large', 'small'];
        return pattern[index % pattern.length];
    };

    return (
        <div className="min-h-screen container mx-auto px-6 py-24">
            <SectionWrapper>
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold font-heading text-white mb-6">Galeri Kegiatan</h1>
                    <p className="text-slate-400 text-lg">Momen-momen berharga dalam perjalanan kami.</p>
                </div>
            </SectionWrapper>

            {loading ? (
                <div className="flex items-center justify-center py-24">
                    <Loader2 className="w-12 h-12 text-neon-gold animate-spin" />
                </div>
            ) : galleryItems.length === 0 ? (
                <div className="text-center py-24 border border-dashed border-white/10 rounded-xl">
                    <Image className="w-16 h-16 mx-auto mb-4 text-slate-600" />
                    <p className="text-slate-500">Belum ada galeri yang tersedia.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[200px] gap-4">
                    {galleryItems.map((item, i) => {
                        const size = getSize(i);
                        return (
                            <div
                                key={item.id}
                                className={`relative group rounded-xl overflow-hidden border border-white/5 bg-slate-800
                                ${size === 'large' ? 'md:col-span-2 md:row-span-2' : ''}
                                ${size === 'normal' ? 'md:row-span-2' : ''}
                            `}
                            >
                                {/* Real Image from API */}
                                <img
                                    src={getImageUrl(item.image)}
                                    alt={item.title}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />

                                {/* Overlay Info */}
                                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                                <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform">
                                    <span className="text-neon-gold text-xs font-bold uppercase tracking-widest mb-1 block">
                                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
                                    </span>
                                    <h3 className="text-white font-bold text-lg leading-tight">{item.title}</h3>
                                </div>

                                {/* Type Badge */}
                                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-2 py-1 rounded text-[10px] text-white uppercase font-bold border border-white/10">
                                    IMAGE
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
