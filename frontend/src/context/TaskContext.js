// frontend/src/context/TaskContext.js

import React, { createContext, useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchTasks();
        }
    }, []);

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.warn("Tentativa de buscar tarefas sem token. Abortando requisição.");
                return;
            }
            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            console.error('Erro ao carregar tarefas:', error);
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (taskData) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token não fornecido.");
            }
            const response = await createTask(taskData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            await fetchTasks();
        } catch (error) {
            console.error("Erro ao adicionar tarefa:", error);
        }
    };

    const editTask = async (taskId, updatedData) => {
        const updatedTask = await updateTask(taskId, updatedData);
        setTasks(tasks.map(task => (task.id === taskId ? updatedTask : task)));
    };

    const removeTask = async (taskId) => {
        await deleteTask(taskId);
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    return (
        <TaskContext.Provider value={{ tasks, loading, fetchTasks, addTask, editTask, removeTask }}>
            {children}
        </TaskContext.Provider>
    );
};
