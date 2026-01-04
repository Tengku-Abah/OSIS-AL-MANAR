"use client";

import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const cursorRef = useRef(null);

    useEffect(() => {
        const moveCursor = (e) => {
            if (cursorRef.current) {
                // Use transform to position cursor - this bypasses zoom issues
                cursorRef.current.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
            }
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
    }, []);

    return (
        <div
            ref={cursorRef}
            className="pointer-events-none hidden md:block"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: 20,
                height: 20,
                zIndex: 99999,
                mixBlendMode: 'difference',
                // Reset zoom for this element
                zoom: 1 / 0.75,
            }}
        >
            <div
                className={`
                    w-full h-full border-2 transition-all duration-200
                    ${isHovered ? 'rotate-45 scale-150 bg-yellow-500/50 border-yellow-500' : 'rotate-0 scale-100 bg-white/20 border-white'}
                    ${isClicked ? 'scale-75' : ''}
                `}
                style={{ borderRadius: 0 }}
            />
        </div>
    );
};
