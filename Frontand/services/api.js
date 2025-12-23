// API Configuration
// IMPORTANT: Set NEXT_PUBLIC_API_URL in .env file
// Format: https://your-backend-url.ngrok-free.dev/api

// Get API Base URL - ALWAYS from environment variable
const getApiBaseUrl = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
        console.error('❌ NEXT_PUBLIC_API_URL is not configured in .env file!');
        return '';
    }

    return apiUrl;
};

export const API_BASE_URL = getApiBaseUrl();
export const SERVER_URL = API_BASE_URL ? API_BASE_URL.replace('/api', '') : '';

// Helper function untuk handle URL gambar (support Google Drive dan local uploads)
export const getImageUrl = (imagePath) => {
    if (!imagePath) return '/default-image.png';
    // Jika URL sudah lengkap (Google Drive atau URL eksternal), gunakan langsung
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }
    // Jika relative path, tambahkan SERVER_URL
    return `${SERVER_URL}${imagePath}`;
};

// Helper function untuk fetch gambar dengan ngrok header dan return blob URL
// Gunakan ini untuk preview gambar di dashboard managers
export const fetchImageAsBlob = async (imagePath) => {
    try {
        const imageUrl = getImageUrl(imagePath);
        const response = await fetch(imageUrl, {
            headers: { 'ngrok-skip-browser-warning': 'true' }
        });
        if (!response.ok) throw new Error('Failed to fetch image');
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error('Error fetching image as blob:', error);
        return null;
    }
};

// Helper untuk generate inisial dari nama
export const getInitials = (name) => {
    if (!name) return '?';
    const words = name.split(' ').filter(w => w.length > 0);
    if (words.length >= 2) {
        return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
    }
    return words[0].charAt(0).toUpperCase();
};

// Common headers for all requests (includes ngrok-skip-browser-warning)
const getHeaders = (includeContentType = true) => {
    const headers = {
        'ngrok-skip-browser-warning': 'true'  // Skip ngrok warning page
    };
    if (includeContentType) {
        headers['Content-Type'] = 'application/json';
    }
    return headers;
};

// Debug log (only in development)
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    console.log('🔌 API_BASE_URL:', API_BASE_URL);
    console.log('🖼️ SERVER_URL:', SERVER_URL);
}

const api = {
    // Helper for GET requests
    get: async (endpoint) => {
        const baseUrl = getApiBaseUrl();
        if (!baseUrl) {
            throw new Error('API not configured. Set NEXT_PUBLIC_API_URL in Vercel.');
        }
        const res = await fetch(`${baseUrl}${endpoint}`, {
            method: 'GET',
            headers: getHeaders(),
            credentials: 'include',
        });
        if (!res.ok) throw new Error(await res.text() || 'API Error');
        return res.json();
    },

    // Helper for POST requests (JSON)
    post: async (endpoint, data) => {
        const baseUrl = getApiBaseUrl();
        if (!baseUrl) {
            throw new Error('API not configured. Set NEXT_PUBLIC_API_URL in Vercel.');
        }
        const res = await fetch(`${baseUrl}${endpoint}`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data),
            credentials: 'include',
        });
        if (!res.ok) throw new Error(await res.text() || 'API Error');
        return res.json();
    },

    // Helper for Multipart requests (File Uploads)
    upload: async (endpoint, formData, method = 'POST') => {
        const baseUrl = getApiBaseUrl();
        if (!baseUrl) {
            throw new Error('API not configured. Set NEXT_PUBLIC_API_URL in Vercel.');
        }
        const res = await fetch(`${baseUrl}${endpoint}`, {
            method: method,
            headers: getHeaders(false),  // No Content-Type for FormData
            body: formData,
            credentials: 'include',
        });
        if (!res.ok) throw new Error(await res.text() || 'API Error');
        return res.json();
    },

    // Helper for DELETE requests
    delete: async (endpoint) => {
        const baseUrl = getApiBaseUrl();
        if (!baseUrl) {
            throw new Error('API not configured. Set NEXT_PUBLIC_API_URL in Vercel.');
        }
        const res = await fetch(`${baseUrl}${endpoint}`, {
            method: 'DELETE',
            headers: getHeaders(false),
            credentials: 'include',
        });
        if (!res.ok) throw new Error(await res.text() || 'API Error');
        return res.json();
    },

    // Helper for PUT requests
    put: async (endpoint, data) => {
        const baseUrl = getApiBaseUrl();
        if (!baseUrl) {
            throw new Error('API not configured. Set NEXT_PUBLIC_API_URL in Vercel.');
        }
        const res = await fetch(`${baseUrl}${endpoint}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data),
            credentials: 'include',
        });
        if (!res.ok) throw new Error(await res.text() || 'API Error');
        return res.json();
    },

    // Helper for PATCH requests
    patch: async (endpoint, data = {}) => {
        const baseUrl = getApiBaseUrl();
        if (!baseUrl) {
            throw new Error('API not configured. Set NEXT_PUBLIC_API_URL in Vercel.');
        }
        const res = await fetch(`${baseUrl}${endpoint}`, {
            method: 'PATCH',
            headers: getHeaders(),
            body: JSON.stringify(data),
            credentials: 'include',
        });
        if (!res.ok) throw new Error(await res.text() || 'API Error');
        return res.json();
    }
};

export default api;
