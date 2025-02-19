// frontend/src/services/taskService.js

import api from './api';

export const getTasks = async () => {
    try {
        const response = await api.get('/tarefas');
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Erro ao buscar tarefas';
    }
};

export const createTask = async (taskData) => {
    try {
        const response = await api.post('/tarefas', taskData);
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Erro ao criar tarefa';
    }
};

export const updateTask = async (taskId, updatedData) => {
    try {
        const response = await api.put(`/tarefas/${taskId}`, updatedData);
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Erro ao atualizar tarefa';
    }
};

export const deleteTask = async (taskId) => {
    try {
        await api.delete(`/tarefas/${taskId}`);
    } catch (error) {
        throw error.response?.data || 'Erro ao deletar tarefa';
    }
};
