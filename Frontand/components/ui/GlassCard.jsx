"use client";

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

export function GlassCard({ children, className, hoverEffect = false, ...props }) {
    return (
        <motion.div
            whileHover={hoverEffect ? { y: -5, scale: 1.02 } : {}}
            className={twMerge(
                clsx(
                    'relative overflow-hidden rounded-2xl border border-white/5 bg-navy-light/30 backdrop-blur-md p-8 shadow-xl transition-all duration-500',
                    'group', // Enable group hover for children
                    hoverEffect && 'hover:bg-navy-light/50 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] hover:border-neon-gold/20',
                    className
                )
            )}
            {...props}
        >
            {/* Gradient Overlay on Hover */}
            {hoverEffect && (
                <div className="absolute inset-0 bg-gradient-to-br from-neon-gold/5 via-transparent to-holographic-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            )}

            {/* Top Border Highlight */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-neon-gold/50 transition-all duration-500" />

            <div className="relative z-10 text-slate-100">{children}</div>
        </motion.div>
    );
}
