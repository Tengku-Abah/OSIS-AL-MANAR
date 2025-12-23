"use client";

import React, { useState, useEffect } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { GlowingButton } from '../ui/GlowingButton';
import { Trash2, Eye, EyeOff, Upload, Plus } from 'lucide-react';
import api, { getImageUrl } from '../../services/api';

export default function GalleryManager() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    const [preview, setPreview] = useState(null);
    const [titleInput, setTitleInput] = useState('');

    useEffect(() => {
        fetchGallery();
    }, []);

    const fetchGallery = async () => {
        try {
            const data = await api.get('/gallery');
            setImages(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const form = e.target;
        const file = form.image.files[0];

        if (!file) return;

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('title', titleInput);

            await api.upload('/gallery', formData, 'POST');
            form.reset();
            setTitleInput('');
            setPreview(null);
            fetchGallery();
        } catch (error) {
            alert('Upload failed: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const toggleStatus = async (id) => {
        try {
            await api.put(`/gallery/${id}/status`);
            fetchGallery();
        } catch (error) {
            alert('Error toggling status: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this image permanently?')) return;
        try {
            await api.delete(`/gallery/${id}`);
            fetchGallery();
        } catch (error) {
            alert('Error deleting: ' + error.message);
        }
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Form Section - Takes up 4 columns */}
            <div className="xl:col-span-4">
                <div className="sticky top-24">
                    <h3 className="text-xl font-bold text-white mb-4">Upload Image</h3>
                    <GlassCard className="p-6">
                        <form onSubmit={handleUpload} className="space-y-4">
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">Activity Title (Nama Kegiatan)</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={titleInput}
                                    onChange={(e) => setTitleInput(e.target.value)}
                                    placeholder="e.g., Class Meeting 2024"
                                    className="w-full bg-navy-lighter/50 border border-white/10 rounded p-2 text-white text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-slate-400 mb-1">Image File</label>
                                <div className="flex flex-col gap-4">
                                    <label className="cursor-pointer bg-navy-lighter/50 border border-white/10 rounded p-2 flex items-center justify-center gap-2 hover:bg-white/5 transition">
                                        <Upload className="w-4 h-4 text-slate-400" />
                                        <span className="text-xs text-slate-400">Choose File</span>
                                        <input
                                            type="file"
                                            name="image"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            required
                                        />
                                    </label>
                                </div>
                            </div>

                            <GlowingButton type="submit" disabled={uploading}>
                                {uploading ? 'Uploading...' : 'Upload to Gallery'}
                            </GlowingButton>
                        </form>
                    </GlassCard>
                </div>
            </div>

            {/* Preview Section - Takes up 8 columns */}
            <div className="xl:col-span-8">
                <div className="sticky top-24">
                    <h3 className="text-xl font-bold text-white mb-4">Live Preview</h3>
                    <GlassCard className="overflow-hidden bg-[#0f172a] border border-white/10 h-[400px] relative group p-0 [&>div]:h-full [&>div]:w-full">

                        {preview ? (
                            <>
                                <img
                                    src={preview}
                                    className="w-full h-full object-cover"
                                    alt="Preview"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-transparent to-transparent opacity-90" />

                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 p-6 w-full">
                                    <span className="text-neon-gold font-bold text-xs mb-1 block uppercase tracking-wider">
                                        {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </span>
                                    <h2 className="text-2xl font-bold text-white font-heading leading-tight">
                                        {titleInput || 'Activity Title Preview'}
                                    </h2>
                                </div>
                            </>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 bg-navy-light/30">
                                <Upload className="w-16 h-16 mb-4 opacity-20" />
                                <p>Select an image to see preview</p>
                            </div>
                        )}

                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-white border border-white/10">
                            IMAGE
                        </div>
                    </GlassCard>
                </div>
            </div>

            {/* Divider */}
            <div className="xl:col-span-12">
                <hr className="border-white/10" />
            </div>

            {/* List Section - Takes up 12 columns (Full Width) */}
            <div className="xl:col-span-12 space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">Gallery Items</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {loading ? <p className="text-white">Loading gallery...</p> :
                        images.map(img => (
                            <div key={img.id} className="group relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-navy-light">
                                <img
                                    src={getImageUrl(img.image)}
                                    alt="Gallery"
                                    className={`w-full h-full object-cover transition-transform group-hover:scale-110 ${!img.isActive && 'grayscale opacity-50'}`}
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-4 text-center">
                                    <h4 className="text-white font-bold text-sm line-clamp-2">{img.title}</h4>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => toggleStatus(img.id)}
                                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
                                            title={img.isActive ? "Hide Image" : "Show Image"}
                                        >
                                            {img.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4 text-red-400" />}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(img.id)}
                                            className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400"
                                            title="Delete Image"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <div className={`absolute top-2 right-2 px-2 py-1 rounded text-[10px] font-bold ${img.isActive ? 'bg-green-500 text-white' : 'bg-slate-500 text-white'}`}>
                                    {img.isActive ? 'ACTIVE' : 'HIDDEN'}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
