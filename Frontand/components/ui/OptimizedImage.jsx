'use client';
import { useState, useRef, useEffect } from 'react';

/**
 * Komponen gambar yang dioptimasi dengan:
 * - Fetch dengan headers (bypass ngrok warning)
 * - Lazy loading (Intersection Observer)
 * - Placeholder blur effect
 * - Error handling dengan fallback
 * - Smooth fade-in animation
 */
export default function OptimizedImage({
    src,
    alt = '',
    className = '',
    placeholderColor = '#1a1a2e',
    ...props
}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [blobUrl, setBlobUrl] = useState(null);
    const imgRef = useRef(null);

    // Intersection Observer untuk lazy loading
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: '100px',
                threshold: 0.01
            }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Fetch image dengan headers saat in view
    useEffect(() => {
        if (!isInView || !src) return;

        const fetchImage = async () => {
            try {
                const response = await fetch(src, {
                    headers: {
                        'ngrok-skip-browser-warning': 'true'
                    }
                });

                if (!response.ok) throw new Error('Failed to load image');

                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setBlobUrl(url);
                setIsLoaded(true);
            } catch (error) {
                console.error('Error loading image:', error);
                setIsError(true);
                setIsLoaded(true);
            }
        };

        fetchImage();

        // Cleanup blob URL saat unmount
        return () => {
            if (blobUrl) {
                URL.revokeObjectURL(blobUrl);
            }
        };
    }, [isInView, src]);

    return (
        <div
            ref={imgRef}
            className={`optimized-image-container ${className}`}
            style={{
                backgroundColor: placeholderColor,
                position: 'relative',
                overflow: 'hidden'
            }}
            {...props}
        >
            {/* Placeholder skeleton */}
            {!isLoaded && (
                <div
                    className="skeleton-pulse"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(90deg, ${placeholderColor} 0%, #2a2a3e 50%, ${placeholderColor} 100%)`,
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 1.5s infinite'
                    }}
                />
            )}

            {/* Actual image from blob URL */}
            {blobUrl && !isError && (
                <img
                    src={blobUrl}
                    alt={alt}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: isLoaded ? 1 : 0,
                        transition: 'opacity 0.3s ease-in-out'
                    }}
                />
            )}

            {/* Error fallback */}
            {isError && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#1a1a2e',
                        color: '#666'
                    }}
                >
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21,15 16,10 5,21" />
                    </svg>
                </div>
            )}

            <style jsx>{`
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
            `}</style>
        </div>
    );
}

