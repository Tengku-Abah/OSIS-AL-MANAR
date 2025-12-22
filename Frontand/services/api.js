// API Configuration
// IMPORTANT: Set NEXT_PUBLIC_API_URL in Vercel Environment Variables
// Format: https://your-backend-url.ngrok-free.dev/api

// Get API Base URL - works in both SSR and Client
const getApiBaseUrl = () => {
    // First check if ENV is set (both server and client)
    if (process.env.NEXT_PUBLIC_API_URL) {
        return process.env.NEXT_PUBLIC_API_URL;
    }

    // Fallback for local development (client-side only)
    if (typeof window !== 'undefined') {
        if (window.location.hostname === 'localhost') {
            return 'http://localhost:5000/api';
        }
        // If on Vercel but ENV not set, show error
        console.error('❌ NEXT_PUBLIC_API_URL is not configured!');
        console.error('Please set it in Vercel Dashboard → Settings → Environment Variables');
    }

    // Return empty string to prevent crashes, but API calls will fail
    return '';
};

export const API_BASE_URL = getApiBaseUrl();
export const SERVER_URL = API_BASE_URL ? API_BASE_URL.replace('/api', '') : '';

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
    }
};

export default api;
