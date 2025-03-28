// src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000, // optional, for request timeouts
});

// Optional: add interceptors for auth if needed later

export default api;
