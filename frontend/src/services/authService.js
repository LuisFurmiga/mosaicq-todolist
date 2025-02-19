// frontend/src/services/authService.js

import api from './api';

export const login = async (email, senha) => {
  try {
    const response = await api.post("/login", { email, senha });
    return response.data; // Retorna o token JWT
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
};

export const register = async (userData) => {
    try {
        const response = await api.post('/register', userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Erro ao registrar usuário';
    }
};
