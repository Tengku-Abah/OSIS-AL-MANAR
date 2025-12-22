"use client";

import React, { useState, useEffect } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { GlowingButton } from '../ui/GlowingButton';
import { CustomSelect } from '../ui/CustomSelect';
import { Plus, Trash2, Edit2, X, Upload, Eye, LayoutTemplate, FileText } from 'lucide-react';
import api from '../../services/api';

export default function NewsManager() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({ title: '', content: '', category: 'BERITA', image: null });
    const [preview, setPreview] = useState(null);

    const [previewMode, setPreviewMode] = useState('CARD'); // 'CARD' or 'DETAIL'

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const data = await api.get('/news');
            setNews(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({ title: '', content: '', category: 'BERITA', image: null });
        setPreview(null);
        setIsEditing(false);
        setEditId(null);
        setPreviewMode('CARD');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const form = new FormData();
            form.append('title', formData.title);
            form.append('content', formData.content);
            form.append('category', formData.category);
            if (formData.image) form.append('image', formData.image);

            if (isEditing) {
                await api.upload(`/news/${editId}`, form, 'PUT');
            } else {
                await api.upload('/news', form, 'POST');
            }

            resetForm();
            fetchNews();
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    const handleEdit = (item) => {
        setIsEditing(true);
        setEditId(item.id);
        setFormData({
            title: item.title,
            content: item.content,
            category: item.category,
            image: null
        });
        if (item.image) setPreview(`${SERVER_URL}${item.image}`);
    };

    const handlePreviewDetail = (item) => {
        handleEdit(item);
        setPreviewMode('DETAIL');
    }

    const handleDelete = async (id) => {
        if (!confirm('Delete this news?')) return;
        try {
            await api.delete(`/news/${id}`);
            fetchNews();
        } catch (error) {
            alert('Error deleting: ' + error.message);
        }
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Form Section - Takes up 4 columns */}
            <div className="xl:col-span-4">
                <div className="sticky top-24">
                    <h3 className="text-xl font-bold text-white mb-4">{isEditing ? 'Edit News' : 'Add News'}</h3>
                    <GlassCard className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <CustomSelect
                                    label="Category"
                                    value={formData.category}
                                    onChange={(val) => setFormData({ ...formData, category: val })}
                                    options={[
                                        { value: 'BERITA', label: 'Berita' },
                                        { value: 'MADING', label: 'Mading' },
                                        { value: 'PRESTASI', label: 'Prestasi' }
                                    ]}
                                    placeholder="Select Category"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-navy-lighter/50 border border-white/10 rounded p-2 text-white text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">Content</label>
                                <textarea
                                    value={formData.content}
                                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full bg-navy-lighter/50 border border-white/10 rounded p-2 text-white text-sm h-32"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">Thumbnail</label>
                                <div className="flex flex-col gap-4">
                                    <label className="cursor-pointer bg-navy-lighter/50 border border-white/10 rounded p-2 flex items-center justify-center gap-2 hover:bg-white/5 transition">
                                        <Upload className="w-4 h-4 text-slate-400" />
                                        <span className="text-xs text-slate-400">Choose File</span>
                                        <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
                                    </label>
                                </div>
                            </div>

                            <div className="flex gap-2 pt-2">
                                {isEditing && (
                                    <button type="button" onClick={resetForm} className="px-4 py-2 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20">
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                                <GlowingButton type="submit" className="flex-1 text-sm py-2">
                                    {isEditing ? 'Update News' : 'Publish News'}
                                </GlowingButton>
                            </div>
                        </form>
                    </GlassCard>
                </div>
            </div>

            {/* Preview Section - Takes up 8 columns */}
            <div className="xl:col-span-8">
                <div className="sticky top-24">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-white">Live Preview</h3>
                        <div className="flex bg-navy-light/50 rounded-lg p-1 border border-white/5">
                            <button
                                onClick={() => setPreviewMode('CARD')}
                                className={`p-1.5 rounded transition-all ${previewMode === 'CARD' ? 'bg-neon-gold text-deep-navy shadow-sm' : 'text-slate-400 hover:text-white'}`}
                                title="Card View"
                            >
                                <LayoutTemplate size={14} />
                            </button>
                            <button
                                onClick={() => setPreviewMode('DETAIL')}
                                className={`p-1.5 rounded transition-all ${previewMode === 'DETAIL' ? 'bg-neon-gold text-deep-navy shadow-sm' : 'text-slate-400 hover:text-white'}`}
                                title="Detail View"
                            >
                                <FileText size={14} />
                            </button>
                        </div>
                    </div>

                    {previewMode === 'CARD' ? (
                        <GlassCard className="p-0 overflow-hidden group">
                            <div className="relative h-48">
                                <img
                                    src={preview || '/default-news.png'}
                                    className="w-full h-full object-cover bg-navy-light"
                                    onError={(e) => e.target.src = 'https://via.placeholder.com/300x200'}
                                />
                                <div className="absolute top-2 right-2 flex gap-1">
                                    <span className={`text-[10px] px-2 py-1 rounded font-bold backdrop-blur-md shadow-sm bg-neon-gold text-deep-navy border border-white/20`}>
                                        {formData.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-5">
                                <span className="text-[10px] text-slate-500 mb-2 block">Just Now</span>
                                <h4 className="text-white font-bold text-lg mb-2 line-clamp-2">{formData.title || 'News Title'}</h4>
                                <p className="text-slate-400 text-sm line-clamp-3">{formData.content || 'Content preview...'}</p>
                            </div>
                        </GlassCard>
                    ) : (
                        <GlassCard className="overflow-hidden bg-[#0f172a] border border-white/10 h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10" data-lenis-prevent>
                            <div className="h-48 w-full relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent z-10" />
                                <img
                                    src={preview || '/default-news.png'}
                                    className="w-full h-full object-cover"
                                    onError={(e) => e.target.src = 'https://via.placeholder.com/300x200'}
                                />
                                <div className="absolute bottom-4 left-4 z-20">
                                    <span className="text-[10px] font-bold text-deep-navy bg-neon-gold px-2 py-0.5 rounded uppercase mb-2 inline-block">
                                        {formData.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-5">
                                <h1 className="text-xl font-bold text-white mb-3 leading-tight font-heading">
                                    {formData.title || 'Judul Berita Lengkap'}
                                </h1>
                                <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 pb-4 border-b border-white/5">
                                    <span>Admin OSIS</span>
                                    <span>•</span>
                                    <span>Just Now</span>
                                </div>
                                <div className="prose prose-invert prose-sm max-w-none text-slate-300 space-y-4 break-words break-all">
                                    {formData.content ? (
                                        formData.content.split('\n').map((para, i) => (
                                            <p key={i}>{para}</p>
                                        ))
                                    ) : (
                                        <>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </GlassCard>
                    )}
                </div>
            </div>

            {/* Divider */}
            <div className="xl:col-span-12">
                <hr className="border-white/10" />
            </div>

            {/* List Section - Takes up 12 columns (Full Width) */}
            <div className="xl:col-span-12 space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">All News</h3>
                {loading ? <div className="text-white">Loading news...</div> :
                    news.length === 0 ? <div className="text-slate-500">No news yet.</div> :
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {news.map(item => (
                                <GlassCard key={item.id} className="p-4 flex gap-4 items-start group">
                                    <img
                                        src={item.image ? `${SERVER_URL}${item.image}` : '/default-news.png'}
                                        className="w-24 h-24 rounded-lg object-cover bg-navy-light flex-shrink-0"
                                        onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-[10px] font-bold text-neon-gold border border-neon-gold/30 px-2 py-0.5 rounded uppercase">{item.category}</span>
                                            <span className="text-[10px] text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <h4 className="text-white font-bold text-sm mb-1 truncate">{item.title}</h4>
                                        <p className="text-slate-400 text-xs line-clamp-2">{item.content}</p>

                                        <div className="flex gap-3 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handlePreviewDetail(item)} className="text-xs text-neon-gold hover:underline flex items-center gap-1">
                                                <Eye className="w-3 h-3" /> View
                                            </button>
                                            <button onClick={() => handleEdit(item)} className="text-xs text-blue-400 hover:underline flex items-center gap-1">
                                                <Edit2 className="w-3 h-3" /> Edit
                                            </button>
                                            <button onClick={() => handleDelete(item.id)} className="text-xs text-red-400 hover:underline flex items-center gap-1">
                                                <Trash2 className="w-3 h-3" /> Delete
                                            </button>
                                        </div>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                }
            </div>
        </div>
    );
}
