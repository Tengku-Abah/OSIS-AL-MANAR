"use client";

import { motion } from "framer-motion";

export function HolographicShape() {
    return (
        <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center perspective-[1000px]">
            {/* Core Core */}
            <motion.div
                animate={{ rotateX: 360, rotateY: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-neon-gold/30 rounded-full border-dashed"
                style={{ transformStyle: "preserve-3d" }}
            />

            {/* Outer Ring 1 */}
            <motion.div
                animate={{ rotateY: -360, rotateZ: 180 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border border-holographic-teal/20 rounded-full"
                style={{ transformStyle: "preserve-3d", transform: "rotateX(45deg)" }}
            />

            {/* Outer Ring 2 */}
            <motion.div
                animate={{ rotateX: -360, rotateZ: -180 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 border border-holographic-teal/20 rounded-full"
                style={{ transformStyle: "preserve-3d", transform: "rotateY(45deg)" }}
            />

            {/* Growing Glow Pulse */}
            <motion.div
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-32 h-32 bg-neon-gold/10 rounded-full blur-[50px]"
            />

            {/* Floating Particles/Nodes */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"
                    animate={{
                        x: [0, Math.cos(i) * 50, 0],
                        y: [0, Math.sin(i) * 50, 0],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
}
