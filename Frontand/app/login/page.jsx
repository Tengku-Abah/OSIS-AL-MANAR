"use client";

import React, { useState } from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlowingButton } from '../../components/ui/GlowingButton';
import { ShieldCheck, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api, { API_BASE_URL } from '../../services/api';

export default function LoginPage() {
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Check if API is configured
            if (!API_BASE_URL) {
                throw new Error('API belum dikonfigurasi. Hubungi administrator.');
            }

            const res = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Use context login to update state
            login(data.user);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
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

                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded text-red-200 text-xs text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs font-mono text-neon-gold mb-2 uppercase">Identity Code</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full bg-navy-lighter/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-neon-gold transition-colors"
                            placeholder="Enter Username..."
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-mono text-neon-gold mb-2 uppercase">Passphrase</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-navy-lighter/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-neon-gold transition-colors"
                            placeholder="••••••••"
                            required
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
