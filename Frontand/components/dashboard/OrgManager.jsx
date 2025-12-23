"use client";

import React, { useState, useEffect } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { GlowingButton } from '../ui/GlowingButton';
import { CustomSelect } from '../ui/CustomSelect';
import { Plus, Trash2, Edit2, X, Upload } from 'lucide-react';
import api, { getImageUrl, fetchImageAsBlob, getInitials } from '../../services/api';
import OptimizedImage from '../ui/OptimizedImage';

export default function OrgManager() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({ name: '', position: '', division: '', photo: null });
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const data = await api.get('/members');
            setMembers(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({ name: '', position: '', division: '', photo: null });
        setPreview(null);
        setIsEditing(false);
        setEditId(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, photo: file });
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const form = new FormData();
            form.append('name', formData.name);
            form.append('position', formData.position);
            form.append('division', formData.division);
            if (formData.photo) form.append('photo', formData.photo);

            if (isEditing) {
                await api.upload(`/members/${editId}`, form, 'PUT');
            } else {
                await api.upload('/members', form, 'POST');
            }

            resetForm();
            fetchMembers();
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    const handleEdit = async (member) => {
        setIsEditing(true);
        setEditId(member.id);
        setFormData({
            name: member.name,
            position: member.position,
            division: member.division,
            photo: null
        });
        if (member.photo) {
            const blobUrl = await fetchImageAsBlob(member.photo);
            if (blobUrl) setPreview(blobUrl);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure?')) return;
        try {
            await api.delete(`/members/${id}`);
            fetchMembers();
        } catch (error) {
            alert('Error deleting: ' + error.message);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-1">
                <GlassCard className="p-6 sticky top-24">
                    <h3 className="text-xl font-bold text-white mb-4">{isEditing ? 'Edit Member' : 'Add New Member'}</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs text-slate-400 mb-1">Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-navy-lighter/50 border border-white/10 rounded p-2 text-white text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-slate-400 mb-1">Position</label>
                            <input
                                type="text"
                                value={formData.position}
                                onChange={e => setFormData({ ...formData, position: e.target.value })}
                                className="w-full bg-navy-lighter/50 border border-white/10 rounded p-2 text-white text-sm"
                                required
                            />
                        </div>
                        <div>
                            <CustomSelect
                                label="Division"
                                value={formData.division}
                                onChange={(val) => setFormData({ ...formData, division: val })}
                                options={[
                                    { value: 'BPH', label: 'BPH (Inti)' },
                                    { value: 'Keagamaan', label: 'Seksi Keagamaan' },
                                    { value: 'Kesenian', label: 'Seksi Kesenian' },
                                    { value: 'Olahraga', label: 'Seksi Olahraga' },
                                    { value: 'Kebersihan', label: 'Seksi Kebersihan' },
                                    { value: 'TIK & Multimedia', label: 'Seksi TIK & Multimedia' },
                                    { value: 'Kewirausahaan', label: 'Seksi Kewirausahaan' }
                                ]}
                                placeholder="Select Division"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-slate-400 mb-1">Photo</label>
                            <div className="flex items-center gap-4">
                                {preview && <img src={preview} className="w-12 h-12 rounded-full object-cover border border-white/20" />}
                                <label className="flex-1 cursor-pointer bg-navy-lighter/50 border border-white/10 rounded p-2 flex items-center justify-center gap-2 hover:bg-white/5 transition">
                                    <Upload className="w-4 h-4 text-slate-400" />
                                    <span className="text-xs text-slate-400">Choose File</span>
                                    <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
                                </label>
                            </div>
                        </div>

                        {/* Live Preview Card */}
                        <div className="pt-4 border-t border-white/5">
                            <label className="block text-xs text-slate-400 mb-2">Live Preview</label>
                            <div className="p-4 rounded-xl bg-navy-light/40 border border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    {preview ? (
                                        <img
                                            src={preview}
                                            className="w-12 h-12 rounded-full object-cover border border-white/10"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold font-heading border border-white/10">
                                            {getInitials(formData.name)}
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="text-white font-bold">{formData.name || 'Member Name'}</h4>
                                        <p className="text-neon-gold text-xs">{formData.position || 'Position'} • {formData.division || 'Division'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                            {isEditing && (
                                <button type="button" onClick={resetForm} className="px-4 py-2 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20">
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                            <GlowingButton type="submit" className="flex-1 text-sm py-2">
                                {isEditing ? 'Update Member' : 'Add Member'}
                            </GlowingButton>
                        </div>
                    </form>
                </GlassCard>
            </div>

            {/* List Section */}
            <div className="lg:col-span-2 space-y-4">
                {loading ? <div className="text-white">Loading members...</div> : (
                    members.length === 0 ? <div className="text-slate-500">No members found.</div> :
                        members.map(member => (
                            <GlassCard key={member.id} className="p-4 flex items-center justify-between group">
                                <div className="flex items-center gap-4">
                                    <OptimizedImage
                                        src={getImageUrl(member.photo)}
                                        className="w-12 h-12 rounded-full border border-white/10"
                                    />
                                    <div>
                                        <h4 className="text-white font-bold">{member.name}</h4>
                                        <p className="text-neon-gold text-xs">{member.position} • {member.division}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleEdit(member)} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleDelete(member.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </GlassCard>
                        ))
                )}
            </div>
        </div>
    );
}
