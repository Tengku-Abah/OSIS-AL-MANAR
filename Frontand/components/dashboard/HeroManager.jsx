"use client";

import React, { useState, useEffect } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { GlowingButton } from '../ui/GlowingButton';
import { Upload, Save, Loader } from 'lucide-react';
import api, { fetchImageAsBlob } from '../../services/api';

export default function HeroManager() {
    const [heroData, setHeroData] = useState({ eventName: '', eventImage: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [newImage, setNewImage] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        fetchHero();
    }, []);

    const fetchHero = async () => {
        try {
            const response = await api.get('/hero');
            // Handle both wrapped and unwrapped response
            const heroInfo = response.data || response;
            console.log('Hero data loaded:', heroInfo);

            setHeroData({
                eventName: heroInfo.eventName || '',
                eventImage: heroInfo.eventImage || ''
            });

            if (heroInfo.eventImage) {
                // Fetch image dengan header yang benar menggunakan shared helper
                const blobUrl = await fetchImageAsBlob(heroInfo.eventImage);
                if (blobUrl) {
                    setPreview(blobUrl);
                }
            }
        } catch (error) {
            console.error('Error fetching hero:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const formData = new FormData();
            formData.append('eventName', heroData.eventName);
            if (newImage) {
                formData.append('eventImage', newImage);
            }

            const updated = await api.upload('/hero', formData, 'PUT');
            setHeroData(updated);
            alert('Hero settings updated successfully!');
        } catch (error) {
            alert('Failed to update: ' + error.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div className="space-y-6">
            <GlassCard className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-white mb-2">Event Name / Headline</label>
                        <input
                            type="text"
                            value={heroData.eventName}
                            onChange={(e) => setHeroData({ ...heroData, eventName: e.target.value })}
                            className="w-full bg-navy-lighter/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-neon-gold"
                            placeholder="e.g. CLASSMEETING 2024"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-white mb-2">Event Banner / Hero Image</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border-2 border-dashed border-white/20 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors relative overflow-hidden">
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    accept="image/*"
                                />
                                <Upload className="w-10 h-10 text-slate-400 mb-2" />
                                <p className="text-sm text-slate-300">Click to upload new image</p>
                                <p className="text-xs text-slate-500 mt-1">Recommend: 1920x1080px</p>
                            </div>

                            {preview && (
                                <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-video">
                                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <GlowingButton type="submit" disabled={saving}>
                            {saving ? <Loader className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
                            {saving ? 'Saving...' : 'Save Changes'}
                        </GlowingButton>
                    </div>
                </form>
            </GlassCard>
        </div>
    );
}
