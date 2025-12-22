"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GlassCard } from '../../components/ui/GlassCard';
import { useAuth } from '../../context/AuthContext';
import {
    LayoutDashboard,
    Image as ImageIcon,
    Users,
    Calendar,
    FileText,
    MessageSquare,
    Newspaper,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import { GlowingButton } from '../../components/ui/GlowingButton';
import HeroManager from '../../components/dashboard/HeroManager';
import OrgManager from '../../components/dashboard/OrgManager';
import ProgramManager from '../../components/dashboard/ProgramManager';
import GalleryManager from '../../components/dashboard/GalleryManager';
import NewsManager from '../../components/dashboard/NewsManager';
import CalendarManager from '../../components/dashboard/CalendarManager';
import AspirationManager from '../../components/dashboard/AspirationManager';

// Placeholder Components (We will create these next)
const Overview = ({ user }) => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Welcome back, {user?.username}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard className="p-6">
                <h3 className="text-slate-400 text-sm">System Status</h3>
                <p className="text-2xl font-bold text-green-400">ONLINE</p>
            </GlassCard>
            <GlassCard className="p-6">
                <h3 className="text-slate-400 text-sm">Clearance Level</h3>
                <p className="text-2xl font-bold text-neon-gold">LEVEL 5</p>
            </GlassCard>
            <GlassCard className="p-6">
                <h3 className="text-slate-400 text-sm">Active Session</h3>
                <p className="text-2xl font-bold text-white">SECURE</p>
            </GlassCard>
        </div>
    </div>
);



export default function DashboardPage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('overview');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) return <div className="fixed inset-0 z-50 bg-black flex items-center justify-center text-neon-gold animate-pulse">LOADING DASHBOARD...</div>;
    if (!user) return null;

    const tabs = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard, component: <Overview user={user} /> },
        { id: 'hero', label: 'Hero Section', icon: ImageIcon, component: <HeroManager /> },
        { id: 'org', label: 'Organization', icon: Users, component: <OrgManager /> },
        { id: 'program', label: 'Work Programs', icon: FileText, component: <ProgramManager /> },
        { id: 'gallery', label: 'Gallery', icon: ImageIcon, component: <GalleryManager /> },
        { id: 'news', label: 'News & Mading', icon: Newspaper, component: <NewsManager /> },
        { id: 'calendar', label: 'Calendar', icon: Calendar, component: <CalendarManager /> },
        { id: 'aspirations', label: 'Aspirations', icon: MessageSquare, component: <AspirationManager /> },
    ];

    const ActiveComponent = tabs.find(t => t.id === activeTab)?.component || <Overview />;

    return (
        <div className="min-h-[125vh] flex">
            {/* Sidebar Desktop */}
            <aside className="hidden lg:flex flex-col w-64 bg-deep-navy border-r border-white/5 fixed left-0 top-0 bottom-0 pt-24 z-20">
                <div className="px-6 mb-8">
                    <h1 className="font-heading font-bold text-xl text-white">ADMIN<span className="text-neon-gold">PANEL</span></h1>
                    <p className="text-xs text-slate-400">v2.0.1 Stable</p>
                </div>

                <nav className="flex-1 overflow-y-auto px-4 space-y-2 custom-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id
                                ? 'bg-neon-gold/20 text-neon-gold border border-neon-gold/30'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <tab.icon className="w-5 h-5" />
                            <span className="font-medium text-sm">{tab.label}</span>
                        </button>
                    ))}

                </nav>

                <div className="p-4 bg-deep-navy border-t border-white/5">
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors hover:text-red-300"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium text-sm">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Header & Content */}
            <main className="flex-1 lg:ml-64 min-h-screen">
                {/* Mobile Toggle */}
                <div className="lg:hidden flex items-center justify-between p-4 bg-navy-light/50 backdrop-blur border-b border-white/5 sticky top-0 z-30">
                    <span className="font-heading font-bold text-white">ADMIN PANEL</span>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden fixed inset-0 z-20 bg-deep-navy pt-20 px-4 pb-4 overflow-y-auto">
                        <nav className="space-y-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                                    className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl transition-all ${activeTab === tab.id
                                        ? 'bg-neon-gold/20 text-neon-gold border border-neon-gold/30'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <tab.icon className="w-5 h-5" />
                                    <span className="font-medium">{tab.label}</span>
                                </button>
                            ))}
                            <button
                                onClick={logout}
                                className="w-full flex items-center gap-3 px-4 py-4 text-red-400 hover:bg-red-500/10 rounded-xl mt-4"
                            >
                                <LogOut className="w-5 h-5" />
                                <span className="font-medium">Logout</span>
                            </button>
                        </nav>
                    </div>
                )}

                <div className="p-6 lg:p-10 max-w-7xl mx-auto">
                    {/* Header Content */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-heading font-bold text-white">{tabs.find(t => t.id === activeTab)?.label}</h2>
                        <p className="text-slate-400 text-sm">Manage your {tabs.find(t => t.id === activeTab)?.label.toLowerCase()} content here.</p>
                    </div>

                    {/* Main Content Area */}
                    <div className="animate-fade-in">
                        {ActiveComponent}
                    </div>
                </div>
            </main>
        </div>
    );
}
