import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function GlassCard({ children, className, hoverEffect = false, ...props }) {
    return (
        <div
            className={twMerge(
                clsx(
                    'relative overflow-hidden rounded-xl border border-white/10 bg-navy-light/40 backdrop-blur-md p-6 shadow-xl transition-all duration-300',
                    hoverEffect && 'hover:bg-navy-light/60 hover:shadow-neon-gold/20 hover:border-gold/30',
                    className
                )
            )}
            {...props}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            <div className="relative z-10 text-slate-100">{children}</div>
        </div>
    );
}
