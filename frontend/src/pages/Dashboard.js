// frontend/src/pages/Dashboard.js

import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { AuthContext } from "../context/AuthContext";
import { TaskContext } from '../context/TaskContext';

import TaskCard from '../components/TaskCard';
import AddTaskModal from "../components/AddTaskModal";
import EditTaskModal from "../components/EditTaskModal";

import './Dashboard.css';
import emptyIllustration from '../assets/illustrations/empty.svg';

function Dashboard() {

    const { tasks, loading, fetchTasks, addTask, editTask, removeTask } = useContext(TaskContext);

    const { handleLogout } = useContext(AuthContext);
    
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleAddTask = (taskData) => {
        addTask(taskData);
    };

   const handleEditTask = (task) => {
        setTaskToEdit(task);
        setIsEditModalOpen(true);
    };
    
    const handleUpdateTask = (updatedTask) => {
        editTask(updatedTask.id, updatedTask);
        fetchTasks();
    };

    const logoutAndRedirect = () => {
        handleLogout();
        navigate("/");
    };

    return (
        <div className="dashboard-container">
            <h2>Minhas Tarefas</h2>

            <button className="add-task-btn" onClick={() => setIsModalOpen(true)}>
                Adicionar Nova Tarefa
            </button>

            {loading ? (
                <p>Carregando tarefas...</p>
            ) : (
                <div className="task-list">
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <TaskCard key={task.id} task={task} onDelete={removeTask} onEdit={handleEditTask} />
                        ))
                    ) : (
                        <div className="empty-container">
                            <img src={emptyIllustration} alt="Nenhuma tarefa encontrada" className="empty-image" />
                            {/*<p>Nenhuma tarefa encontrada.</p>*/}
                        </div>
                    )}
                </div>
            )}

            <button onClick={logoutAndRedirect}>Logout</button>

            <AddTaskModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onAddTask={handleAddTask} 
            />
            <EditTaskModal 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)} 
                task={taskToEdit} 
                onUpdateTask={handleUpdateTask} 
            />
        </div>
    );
}

export default Dashboard;
