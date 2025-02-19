// frontend/src/services/api.js

import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_API_URL;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Adiciona o token de autenticação a cada requisição se estiver disponível
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
