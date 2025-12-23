
import React, { useState, useEffect } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { GlowingButton } from '../ui/GlowingButton';
import { CustomSelect } from '../ui/CustomSelect';
import { Plus, Trash2, Edit2, X, Upload, Eye, LayoutTemplate, FileText, Calendar } from 'lucide-react';
import api, { getImageUrl } from '../../services/api';

// --- CONSTANTS ---
const DIVISIONS = [
    "BPH",
    "Keagamaan",
    "Kesenian",
    "Olahraga",
    "Kebersihan",
    "TIK & Multimedia",
    "Kewirausahaan"
];

export default function ProgramManager() {
    const [programs, setPrograms] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({ title: '', description: '', status: 'PLANNED', division: 'BPH', pic: '', image: null });
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [programsData, membersData] = await Promise.all([
                api.get('/programs'),
                api.get('/members')
            ]);
            setPrograms(programsData);
            setMembers(membersData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPrograms = async () => {
        try {
            const data = await api.get('/programs');
            setPrograms(data);
        } catch (error) {
            console.error(error);
        }
    };

    const resetForm = () => {
        setFormData({ title: '', description: '', status: 'PLANNED', division: 'BPH', pic: '', image: null });
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
            form.append('description', formData.description);
            form.append('status', formData.status);
            form.append('division', formData.division);
            form.append('pic', formData.pic);
            if (formData.image) form.append('image', formData.image);

            if (isEditing) {
                await api.upload(`/programs/${editId}`, form, 'PUT');
            } else {
                await api.upload('/programs', form, 'POST');
            }

            resetForm();
            fetchPrograms();
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    const [previewMode, setPreviewMode] = useState('CARD'); // 'CARD' or 'DETAIL'

    const handleEdit = (program) => {
        setIsEditing(true);
        setEditId(program.id);
        setFormData({
            title: program.title,
            description: program.description,
            status: program.status,
            division: program.division || 'BPH',
            pic: program.pic || '',
            image: null
        });
        if (program.image) setPreview(getImageUrl(program.image));
    };

    const handlePreviewDetail = (program) => {
        handleEdit(program);
        setPreviewMode('DETAIL');
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this program?')) return;
        try {
            await api.delete(`/programs/${id}`);
            fetchPrograms();
        } catch (error) {
            alert('Error deleting: ' + error.message);
        }
    };

    const getStatusColor = (status) => {
        if (status === 'COMPLETED') return 'bg-green-500/20 text-green-400';
        if (status === 'ONGOING') return 'bg-yellow-500/20 text-yellow-400';
        return 'bg-blue-500/20 text-blue-400';
    };

    const getStatusLabel = (status) => {
        if (status === 'COMPLETED') return 'Selesai';
        if (status === 'ONGOING') return 'Sedang Berjalan';
        return 'Direncanakan';
    };

    // Helper to format division name for display if needed
    const getDivisionLabel = (div) => {
        if (div === 'BPH') return 'BPH (Inti)';
        if (typeof div === 'string' && div.startsWith('Seksi')) return div;
        // Check if it already has "Seksi" or "BPH" prefix, if not add "Seksi " unless it's BPH
        if (div === 'Keagamaan' || div === 'Kesenian' || div === 'Olahraga' || div === 'Kebersihan' || div === 'TIK & Multimedia' || div === 'Kewirausahaan') {
            return `Seksi ${div}`;
        }
        return div;
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Form Section - Takes up 4 columns */}
            <div className="xl:col-span-4">
                <div className="sticky top-24">
                    <h3 className="text-xl font-bold text-white mb-4">{isEditing ? 'Edit Program' : 'New Program'}</h3>
                    <GlassCard className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
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
                                <CustomSelect
                                    label="Division"
                                    value={formData.division}
                                    onChange={(val) => setFormData({ ...formData, division: val })}
                                    options={DIVISIONS.map(div => ({ value: div, label: getDivisionLabel(div) }))}
                                    placeholder="Select Division"
                                />
                            </div>
                            <div>
                                <CustomSelect
                                    label="Person In Charge (PJ)"
                                    value={formData.pic}
                                    onChange={(val) => setFormData({ ...formData, pic: val })}
                                    options={members.map(member => ({
                                        value: member.name,
                                        label: `${member.name} - ${getDivisionLabel(member.division)}`
                                    }))}
                                    placeholder="Select PJ"
                                />
                            </div>
                            <div>
                                <CustomSelect
                                    label="Status"
                                    value={formData.status}
                                    onChange={(val) => setFormData({ ...formData, status: val })}
                                    options={[
                                        { value: 'PLANNED', label: 'Direncanakan' },
                                        { value: 'ONGOING', label: 'Sedang Berjalan' },
                                        { value: 'COMPLETED', label: 'Selesai' }
                                    ]}
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-navy-lighter/50 border border-white/10 rounded p-2 text-white text-sm"
                                    rows="3"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">Cover Image</label>
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
                                    {isEditing ? 'Update Program' : 'Create Program'}
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
                                    src={preview || '/default-image.png'}
                                    className="w-full h-full object-cover bg-navy-light"
                                    onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder.svg'; }}
                                />
                                <div className="absolute top-2 right-2">
                                    <span className={`text-[10px] px-2 py-1 rounded font-bold backdrop-blur-md shadow-sm ${getStatusColor(formData.status)}`}>
                                        {getStatusLabel(formData.status)}
                                    </span>
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] font-bold text-neon-gold uppercase tracking-wider">{getDivisionLabel(formData.division) || 'BPH (Inti)'}</span>
                                    {formData.pic && <span className="text-[10px] text-slate-400">PJ: {formData.pic}</span>}
                                </div>
                                <h4 className="text-white font-bold text-lg mb-2">{formData.title || 'Program Title'}</h4>
                                <p className="text-slate-400 text-sm line-clamp-3">{formData.description || 'Description will appear here...'}</p>
                            </div>
                        </GlassCard>
                    ) : (
                        <GlassCard className="overflow-hidden bg-[#0a0f1c] border border-white/10 h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10" data-lenis-prevent>
                            {/* Header Image Section */}
                            <div className="relative h-64 w-full group">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-[#0a0f1c]/50 to-transparent z-10" />
                                <img
                                    src={preview || '/default-image.png'}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder.svg'; }}
                                />
                                <div className="absolute bottom-6 left-6 z-20">
                                    <h1 className="text-4xl font-bold text-white mb-3 font-heading tracking-tight drop-shadow-lg">
                                        {formData.title || 'LDKS'}
                                    </h1>
                                    <div className="flex gap-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border border-white/10 backdrop-blur-md ${getStatusColor(formData.status)}`}>
                                            {getStatusLabel(formData.status)}
                                        </span>
                                        <span className="px-3 py-1 rounded-full text-xs font-bold text-slate-300 border border-white/10 bg-white/5 backdrop-blur-md flex items-center gap-2">
                                            <Calendar className="w-3 h-3" /> Sep 2025
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Content Grid */}
                            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Left: Description (2 cols) */}
                                <div className="md:col-span-2 space-y-4">
                                    <h3 className="text-sm font-bold text-neon-gold uppercase tracking-wider border-l-2 border-neon-gold pl-3 mb-4">
                                        Deskripsi Kegiatan
                                    </h3>
                                    <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed font-light break-words break-all">
                                        {formData.description ? (
                                            formData.description.split('\n').map((para, i) => (
                                                <p key={i} className="mb-4">{para}</p>
                                            ))
                                        ) : (
                                            <p className="opacity-50 italic">Latihan Dasar Kepemimpinan Siswa untuk membentuk karakter pemimpin yang tangguh dan visioner bagi pengurus baru.</p>
                                        )}
                                    </div>
                                </div>

                                {/* Right: PIC Card (1 col) */}
                                <div>
                                    <div className="bg-[#111827]/50 border border-white/10 rounded-xl p-6 text-center sticky top-0">
                                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
                                            Penanggung Jawab (PIC)
                                        </h4>
                                        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center mb-4 text-3xl font-bold text-white border-2 border-white/10 shadow-lg">
                                            {formData.pic ? formData.pic.charAt(0) : 'M'}
                                        </div>
                                        <h5 className="text-white font-bold text-base mb-1">
                                            {formData.pic || 'Mustafa Raja U.'}
                                        </h5>
                                        <span className="text-xs text-neon-gold font-medium block">
                                            {formData.division ? getDivisionLabel(formData.division) : 'Ketua OSIS'}
                                        </span>
                                    </div>
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
                <h3 className="text-xl font-bold text-white mb-4">All Programs</h3>
                {loading ? <div className="text-white">Loading programs...</div> :
                    programs.length === 0 ? <div className="text-slate-500">No programs yet.</div> :
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {programs.map(item => (
                                <GlassCard key={item.id} className="p-4 flex gap-4 items-start group">
                                    <img
                                        src={getImageUrl(item.image)}
                                        className="w-24 h-24 rounded-lg object-cover bg-navy-light flex-shrink-0"
                                        onError={(e) => {
                                            e.target.onerror = null; // Prevent infinite loop
                                            e.target.src = '/placeholder.svg';
                                        }}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-neon-gold font-bold uppercase">{getDivisionLabel(item.division) || 'BPH (Inti)'}</span>
                                                {item.pic && <span className="text-[10px] text-slate-500">PJ: {item.pic}</span>}
                                            </div>
                                            <span className={`text-[10px] px-2 py-0.5 rounded font-bold whitespace-nowrap ml-2 ${getStatusColor(item.status)}`}>
                                                {getStatusLabel(item.status)}
                                            </span>
                                        </div>
                                        <h4 className="text-white font-bold text-sm mb-1 truncate">{item.title}</h4>
                                        <p className="text-slate-400 text-xs line-clamp-2">{item.description}</p>

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
