"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export function CustomSelect({ label, value, onChange, options, placeholder = "Select Option", required = false }) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (optionValue) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    const selectedOption = options.find(opt => opt.value === value);

    return (
        <div className="relative" ref={containerRef}>
            {label && <label className="block text-xs text-slate-400 mb-1">{label}</label>}

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    w-full flex items-center justify-between
                    bg-navy-lighter/50 border border-white/10 rounded p-2 
                    text-sm text-left transition-all duration-200
                    hover:bg-white/5 focus:outline-none focus:border-neon-gold/50
                    ${isOpen ? 'border-neon-gold ring-1 ring-neon-gold/20' : ''}
                `}
            >
                <span className={selectedOption ? 'text-white' : 'text-slate-500'}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-[#0a0f1c] border border-white/10 rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                    <div
                        className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
                        data-lenis-prevent
                    >
                        {options.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleSelect(option.value)}
                                className={`
                                    w-full flex items-center justify-between px-3 py-2 text-sm text-left
                                    transition-colors duration-150
                                    ${value === option.value
                                        ? 'bg-neon-gold/10 text-neon-gold font-medium'
                                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                                    }
                                `}
                            >
                                <span>{option.label}</span>
                                {value === option.value && <Check className="w-3 h-3 text-neon-gold" />}
                            </button>
                        ))}
                        {options.length === 0 && (
                            <div className="px-3 py-2 text-sm text-slate-500 text-center italic">
                                No options available
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
