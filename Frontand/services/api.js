// API Configuration
// IMPORTANT: Set NEXT_PUBLIC_API_URL in Vercel Environment Variables
// Format: https://your-backend-url.ngrok-free.dev/api

const getApiBaseUrl = () => {
    const envUrl = process.env.NEXT_PUBLIC_API_URL;

    // If ENV is set, use it
    if (envUrl) return envUrl;

    // Fallback for development
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        return 'http://localhost:5000/api';
    }

    // If no ENV and not localhost, log error
    console.error('NEXT_PUBLIC_API_URL is not set! API calls will fail.');
    return '';
};

export const API_BASE_URL = getApiBaseUrl();
export const SERVER_URL = API_BASE_URL ? API_BASE_URL.replace('/api', '') : '';

const api = {
    // Helper for GET requests
    get: async (endpoint) => {
        if (!API_BASE_URL) {
            console.error('API_BASE_URL is not configured');
            throw new Error('API not configured. Please set NEXT_PUBLIC_API_URL.');
        }
        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        if (!res.ok) throw new Error(await res.text() || 'API Error');
        return res.json();
    },

    // Helper for POST requests (JSON)
    post: async (endpoint, data) => {
        if (!API_BASE_URL) {
            console.error('API_BASE_URL is not configured');
            throw new Error('API not configured. Please set NEXT_PUBLIC_API_URL.');
        }
        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include',
        });
        if (!res.ok) throw new Error(await res.text() || 'API Error');
        return res.json();
    },

    // Helper for Multipart requests (File Uploads)
    upload: async (endpoint, formData, method = 'POST') => {
        if (!API_BASE_URL) {
            throw new Error('API not configured. Please set NEXT_PUBLIC_API_URL.');
        }
        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: method,
            body: formData,
            credentials: 'include',
        });
        if (!res.ok) throw new Error(await res.text() || 'API Error');
        return res.json();
    },

    // Helper for DELETE requests
    delete: async (endpoint) => {
        if (!API_BASE_URL) {
            throw new Error('API not configured. Please set NEXT_PUBLIC_API_URL.');
        }
        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        if (!res.ok) throw new Error(await res.text() || 'API Error');
        return res.json();
    },

    // Helper for PUT requests
    put: async (endpoint, data) => {
        if (!API_BASE_URL) {
            throw new Error('API not configured. Please set NEXT_PUBLIC_API_URL.');
        }
        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include',
        });
        if (!res.ok) throw new Error(await res.text() || 'API Error');
        return res.json();
    }
};

export default api;
