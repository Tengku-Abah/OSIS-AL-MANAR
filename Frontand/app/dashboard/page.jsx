"use client";

import React from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlowingButton } from '../../components/ui/GlowingButton';
import { FileText, Users, Bell, Download, Upload } from 'lucide-react';

export default function DashboardPage() {
    return (
        <div className="min-h-screen container mx-auto px-6 py-12">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold font-heading text-white">COMMAND CENTER</h1>
                    <p className="text-slate-400 font-mono text-sm">System Status: <span className="text-green-400">OPTIMAL</span></p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                        <p className="text-white font-bold">Admin OSIS</p>
                        <p className="text-xs text-neon-gold">Level 5 Clearance</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-600 border border-white/20"></div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <GlassCard className="p-4 flex items-center justify-between">
                    <div>
                        <p className="text-slate-400 text-xs uppercase">Pending Proposals</p>
                        <h3 className="text-2xl font-bold text-white">3</h3>
                    </div>
                    <FileText className="text-neon-gold" />
                </GlassCard>
                <GlassCard className="p-4 flex items-center justify-between">
                    <div>
                        <p className="text-slate-400 text-xs uppercase">Active Members</p>
                        <h3 className="text-2xl font-bold text-white">42</h3>
                    </div>
                    <Users className="text-holographic-teal" />
                </GlassCard>
                <GlassCard className="p-4 flex items-center justify-between">
                    <div>
                        <p className="text-slate-400 text-xs uppercase">New Aspirations</p>
                        <h3 className="text-2xl font-bold text-white">12</h3>
                    </div>
                    <Bell className="text-red-400" />
                </GlassCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-white mb-4">Internal Documents</h2>
                    {[1, 2, 3].map((i) => (
                        <GlassCard key={i} className="p-4 flex items-center justify-between hover:bg-white/5 cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-navy-lighter rounded">
                                    <FileText className="w-5 h-5 text-slate-300" />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium">Laporan_Pertanggungjawaban_Desember.pdf</h4>
                                    <p className="text-xs text-slate-500">Uploaded 2 hours ago by Sekretaris</p>
                                </div>
                            </div>
                            <GlowingButton variant="outline" className="text-xs py-1 px-3">
                                <Download className="w-3 h-3" />
                            </GlowingButton>
                        </GlassCard>
                    ))}
                </div>

                <div>
                    <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                    <div className="space-y-4">
                        <GlassCard className="p-4">
                            <h3 className="text-white font-bold mb-2">Upload File</h3>
                            <div className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center hover:border-neon-gold/50 transition-colors cursor-pointer">
                                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                                <p className="text-xs text-slate-400">Drag files here or click to browse</p>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </div>
    );
}
