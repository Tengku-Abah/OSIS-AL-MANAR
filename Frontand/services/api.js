export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const SERVER_URL = API_BASE_URL ? API_BASE_URL.replace('/api', '') : '';

const api = {
    // Helper for GET requests
    get: async (endpoint) => {
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
        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        if (!res.ok) throw new Error(await res.text() || 'API Error');
        return res.json();
    },

    // Helper for PUT requests
    put: async (endpoint, data) => {
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
