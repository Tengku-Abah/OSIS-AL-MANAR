import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

export function GlowingButton({ children, variant = 'primary', className, ...props }) {
    const baseStyles = "relative px-6 py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden group";

    const variants = {
        primary: "bg-gradient-to-r from-neon-gold to-orange-500 text-deep-navy shadow-[0_0_15px_rgba(255,215,0,0.5)] hover:shadow-[0_0_25px_rgba(255,215,0,0.8)] border border-transparent",
        secondary: "bg-navy-light border border-holographic-teal/50 text-holographic-teal hover:bg-holographic-teal/10 hover:shadow-[0_0_15px_rgba(100,255,218,0.3)]",
        outline: "bg-transparent border border-slate-light/30 text-slate-200 hover:border-white hover:text-white"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={twMerge(baseStyles, variants[variant], className)}
            {...props}
        >
            <span className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-all duration-700 group-hover:left-[100%]" />
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
}
