"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlowingButton } from '../../components/ui/GlowingButton';
import { ShieldCheck, Lock } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate login delay
        setTimeout(() => {
            router.push('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-navy-light via-deep-navy to-black">
            <GlassCard className="w-full max-w-md p-8 border-neon-gold/20">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-neon-gold/10 flex items-center justify-center mx-auto mb-4 border border-neon-gold/30">
                        <ShieldCheck className="w-8 h-8 text-neon-gold" />
                    </div>
                    <h1 className="text-2xl font-bold font-heading text-white">ACCESS PORTAL</h1>
                    <p className="text-slate-400 text-sm">OSIS Internal Command Center</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs font-mono text-neon-gold mb-2 uppercase">Identity Code</label>
                        <input
                            type="text"
                            className="w-full bg-navy-lighter/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-neon-gold transition-colors"
                            placeholder="Enter ID..."
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-mono text-neon-gold mb-2 uppercase">Passphrase</label>
                        <input
                            type="password"
                            className="w-full bg-navy-lighter/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-neon-gold transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <GlowingButton
                        type="submit"
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? 'Authenticating...' : 'Establish Connection'} <Lock className="w-4 h-4" />
                    </GlowingButton>
                </form>
            </GlassCard>
        </div>
    );
}
