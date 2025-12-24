"use client";

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    // Mouse position state (with Spring smoothing)
    const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
    const cursorX = useSpring(-100, smoothOptions);
    const cursorY = useSpring(-100, smoothOptions);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX - 10); // Center the 20px cursor
            cursorY.set(e.clientY - 10);
        };

        const handleMouseDown = () => setIsClicked(true);
        const handleMouseUp = () => setIsClicked(false);

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' ||
                e.target.tagName === 'BUTTON' ||
                e.target.closest('a') ||
                e.target.closest('button') ||
                e.target.style.cursor === 'pointer'
            ) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block mix-blend-difference">
            <motion.div
                className="absolute top-0 left-0 border-2 border-white bg-white/20"
                style={{
                    x: cursorX,
                    y: cursorY,
                    width: 20,
                    height: 20,
                    borderRadius: 0, // Sharp square
                }}
                animate={{
                    rotate: isHovered ? 45 : 0, // Rotate to diamond on hover
                    scale: isHovered ? 1.5 : (isClicked ? 0.8 : 1),
                    backgroundColor: isHovered ? 'rgba(255, 215, 0, 0.5)' : 'rgba(255, 255, 255, 0)',
                    borderColor: isHovered ? '#ffd700' : '#ffffff',
                }}
                transition={{
                    rotate: { duration: 0.2 },
                    scale: { duration: 0.1 },
                    backgroundColor: { duration: 0.2 }
                }}
            />
        </div>
    );
};
